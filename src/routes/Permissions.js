const router = require('express').Router()
const PermissionsController = require('../controllers/PermissionsController')

router
    .get('/', PermissionsController().getAllPermissions)
    .get('/:permissionId', PermissionsController().getPermissionById)
    .post('/', PermissionsController().createNewPermission)
    .delete('/:permissionId', PermissionsController().deletePermissionById)
    .put('/:permissionId', PermissionsController().updatePermissionById)

module.exports = router;