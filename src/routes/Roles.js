const router = require('express').Router()
const RolesController = require('../controllers/RolesController');

router
    .get('/', RolesController().getAllRoles)
    .get('/:roleId', RolesController().getRoleById)
    .post('/', RolesController().createNewRole)
    .delete('/:roleId', RolesController().deleteRoleById)
    .put('/:roleId', RolesController().updateRoleById)
    

module.exports = router;