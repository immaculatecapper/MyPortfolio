import aiPipelineImage from '../assets/projects/ai-vulnerability-pipeline.svg';
import qaAutomationImage from '../assets/projects/qa-regression-automation.svg';
import asteroidsImage from '../assets/projects/asteroids-game.svg';
import missingSemesterImage from '../assets/projects/missing-semester-shell.svg';

// Highlighted projects: each has an image, my role, the outcome and the tech used
export const featuredProjects = [
  {
    title: 'Agentic AI Vulnerability Prioritization Pipeline',
    context: 'SoftServe R&D · 2026',
    image: aiPipelineImage,
    role: 'Designed and built an agentic AI pipeline on SoftServe’s in-house orchestration framework that ranks security findings by severity and likelihood of exploitation, then recommends remediation.',
    outcome: 'Delivered a working client-pitch demo that integrates CVSS, EPSS and CISA KEV data via APIs and MCP servers, produces template-compliant reports, and is cloud- and LLM-agnostic with a roadmap to scale to hundreds of thousands of findings.',
    technologies: ['LLMs', 'MCP', 'Python', 'REST APIs', 'AWS', 'Prompt Engineering'],
  },
  {
    title: 'Mobile Banking Regression Automation',
    context: 'KOHO Financial · 2021',
    image: qaAutomationImage,
    role: 'Quality Engineer responsible for automating regression test cases in JavaScript and running biweekly regression and smoke tests on release-candidate builds.',
    outcome: 'Caught defects before launch by expanding automated coverage with Cypress and Playwright, validating APIs in Postman and managing PostgreSQL test data across app scenarios.',
    technologies: ['JavaScript', 'Cypress', 'Playwright', 'Postman', 'PostgreSQL'],
  },
  {
    title: 'Asteroids Arcade Game',
    context: 'Personal project · 2025',
    image: asteroidsImage,
    role: 'Built a playable clone of the classic arcade game in Python using Pygame, structuring the code with object-oriented classes for the player, asteroids, shots and spawning field.',
    outcome: 'A working 60 FPS game with collision detection, asteroid splitting and sprite groups – a solid exercise in OOP design and game-loop fundamentals.',
    technologies: ['Python', 'Pygame', 'OOP'],
    repositoryUrl: 'https://github.com/immaculatecapper/asteroids',
  },
  {
    title: 'MIT Missing Semester – Shell Exercises',
    context: 'Self-directed learning · 2023',
    image: missingSemesterImage,
    role: 'Worked through MIT’s “Missing Semester of Your CS Education” course and documented my solutions, writing Bash scripts and explaining each command, permission and pipeline I used.',
    outcome: 'A public, well-explained solutions repo covering Unix shell fundamentals: file permissions and shebangs, custom Bash functions (marco/polo) and a script that reruns a flaky command until it fails while capturing stdout/stderr and counting attempts – skills I rely on for debugging and test automation.',
    technologies: ['Bash', 'Shell Scripting', 'Linux', 'Git'],
    repositoryUrl: 'https://github.com/immaculatecapper/MIT-Missing-Semester',
  },
];
