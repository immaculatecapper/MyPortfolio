import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// POST /api/users - add a new user (sign up)
const create = async (req, res) => {
  // Never let a sign-up choose its own role - everyone who signs up is a "user"
  const { role, ...fields } = req.body
  const user = new User({ ...fields, role: 'user' })
  try {
    await user.save()
    return res.status(200).json({ message: 'Successfully signed up!' })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// GET /api/users - get all users (password fields never returned)
const list = async (req, res) => {
  try {
    const users = await User.find().select('name email role updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// router.param handler: loads the user for any route containing :userId
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' })
  }
}

// GET /api/users/:id
const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

// PUT /api/users/:id
const update = async (req, res) => {
  try {
    let user = req.profile
    const changes = { ...req.body }
    // Only an admin may change someone's role
    if (!req.auth || req.auth.role !== 'admin') delete changes.role
    user = extend(user, changes)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/users/:id
const remove = async (req, res) => {
  try {
    const user = req.profile
    await user.deleteOne()
    user.hashed_password = undefined
    user.salt = undefined
    res.json({ message: 'User successfully deleted!', user })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

// DELETE /api/users - remove all regular users (admin accounts are kept)
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({ role: { $ne: 'admin' } })
    res.json({ message: 'All non-admin users deleted!', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, userByID, read, update, remove, removeAll }
