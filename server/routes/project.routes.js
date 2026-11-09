import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Anyone can read projects; only a signed-in ADMIN can add / change / delete them
router.route('/api/projects')
  .get(projectCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.removeAll)

router.route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.remove)

router.param('projectId', projectCtrl.projectByID)

export default router
