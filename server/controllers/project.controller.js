import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// POST /api/projects - add a new project
const create = async (req, res) => {
  const project = new Project(req.body)
  try {
    await project.save()
    return res.status(200).json({ message: 'Project successfully created!', project })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/projects - get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find().select('title firstname lastname email completion description')
    res.json(projects)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// router.param handler: loads the project for any route containing :projectId
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    req.project = project
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve project' })
  }
}

// GET /api/projects/:id - get project by id
const read = (req, res) => {
  return res.json(req.project)
}

// PUT /api/projects/:id - update project by id
const update = async (req, res) => {
  try {
    let project = req.project
    project = extend(project, req.body)
    await project.save()
    res.json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/projects/:id - remove project by id
const remove = async (req, res) => {
  try {
    const project = req.project
    await project.deleteOne()
    res.json({ message: 'Project successfully deleted!', project })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/projects - remove all projects
const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({})
    res.json({ message: 'All projects deleted!', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, projectByID, read, update, remove, removeAll }
