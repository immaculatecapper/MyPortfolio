import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Anyone can send a contact message (public contact form).
// Signed-in users can read the messages they sent; only an ADMIN can read all,
// update or delete them.
router.route('/api/contacts')
  .get(authCtrl.requireSignin, contactCtrl.list)
  .post(contactCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.removeAll)

router.route('/api/contacts/:contactId')
  .get(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, contactCtrl.remove)

router.param('contactId', contactCtrl.contactByID)

export default router
