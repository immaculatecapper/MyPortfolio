// Seed script: run with "npm run seed" from the MyPortfolio folder.
//  1. Creates (or resets) the hardcoded ADMIN account in MongoDB.
//  2. If the projects / qualifications collections are empty, adds my portfolio
//     entries so the Projects and Education pages have content straight away.
// The admin credentials can be overridden in .env (ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD).
import mongoose from 'mongoose'
import config from '../../config/config.js'
import User from '../models/user.model.js'
import Project from '../models/project.model.js'
import Qualification from '../models/qualification.model.js'

const ADMIN = {
  name: process.env.ADMIN_NAME || 'Portfolio Admin',
  email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
  password: process.env.ADMIN_PASSWORD || 'Admin@123',
}

const owner = { firstname: 'Mark', lastname: 'Perez', email: 'markkokhan@gmail.com' }

const projects = [
  {
    title: 'Agentic AI Vulnerability Prioritization Pipeline',
    completion: '2026-09-30',
    description: 'SoftServe R&D – agentic AI pipeline that ranks security findings by severity and exploit likelihood using CVSS, EPSS and CISA KEV data via APIs and MCP servers.',
  },
  {
    title: 'Mobile Banking Regression Automation',
    completion: '2021-08-31',
    description: 'KOHO Financial – automated regression and smoke tests with Cypress and Playwright, API validation in Postman and PostgreSQL test data.',
  },
  {
    title: 'Asteroids Arcade Game',
    completion: '2025-06-30',
    description: 'Python / Pygame clone of the classic arcade game with OOP classes, collision detection and asteroid splitting at 60 FPS.',
  },
  {
    title: 'MIT Missing Semester – Shell Exercises',
    completion: '2023-12-31',
    description: 'Documented Bash solutions for MIT’s Missing Semester course: permissions, shell functions and a flaky-command rerun script.',
  },
]

const qualifications = [
  {
    title: 'Advanced Diploma, Software Engineering Technology – AI (Co-op), Centennial College',
    completion: '2028-04-30',
    description: 'In progress. GPA 4.43 / 4.5. Courses: Intro to AI, AI Systems Design, Java, Programming 1 & 2, Database Concepts, Unix/Linux.',
  },
  {
    title: 'Bachelor of Science, Honours Kinesiology (Co-op), University of Waterloo',
    completion: '2022-12-31',
    description: 'GPA 3.7. Dean’s Honour List every year (2017 – 2022).',
  },
]

const run = async () => {
  await mongoose.connect(config.mongoUri)
  console.log('Connected to', mongoose.connection.name)

  let admin = await User.findOne({ email: ADMIN.email })
  if (!admin) admin = new User({ name: ADMIN.name, email: ADMIN.email })
  admin.name = ADMIN.name
  admin.password = ADMIN.password // hashed by the model's virtual setter
  admin.role = 'admin'
  admin.updated = Date.now()
  await admin.save()
  console.log(`Admin account ready: ${ADMIN.email}`)

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany(projects.map((p) => ({ ...owner, ...p })))
    console.log(`Added ${projects.length} projects`)
  }
  if ((await Qualification.countDocuments()) === 0) {
    await Qualification.insertMany(qualifications.map((q) => ({ ...owner, ...q })))
    console.log(`Added ${qualifications.length} qualifications`)
  }

  await mongoose.disconnect()
}

run().catch(async (err) => {
  console.error('Seeding failed:', err.message)
  await mongoose.disconnect()
  process.exit(1)
})
