const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

router
    .get('/', UsersController().getAllUsers)
    .get('/:userId', UsersController().getUserById)
    .post('/', UsersController().createNewUser)
    .delete('/:userId', UsersController().deleteUserById)
    .put('/:userId', UsersController().updateUserById)

module.exports = router;