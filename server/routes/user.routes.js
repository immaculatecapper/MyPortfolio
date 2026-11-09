import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/users')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list)       // admin only
  .post(userCtrl.create)                                              // public (sign up)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.removeAll) // admin only

// A user can read / update / delete their own account; an admin can do it for anyone
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router
