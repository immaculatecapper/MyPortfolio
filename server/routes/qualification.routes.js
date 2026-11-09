import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Anyone can read qualifications; only a signed-in ADMIN can add / change / delete them
router.route('/api/qualifications')
  .get(qualificationCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.removeAll)

router.route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, qualificationCtrl.remove)

router.param('qualificationId', qualificationCtrl.qualificationByID)

export default router
