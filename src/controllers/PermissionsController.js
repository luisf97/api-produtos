const { Permissions } = require('../models/index')
const uuid = require('uuid')
function PermissionsController() {
    return {

        async getAllPermissions(req, res) {
            const permissions = await Permissions.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })

            if(!permissions) return res.status(404).json({
                status: 404,
                message: 'Nenhuma permissão encontrada!'
            })

            return res.status(200).json({
                status: 200,
                permissoes: permissions                    
            })
        },

        async getPermissionById(req, res) {
            const { permissionId: id } = req.params;

            const permission = await Permissions.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })

            if(!permission) return res.status(404).json({ status: 404, message: 'Produto não encontrado na base de dados'})
        
            return res.status(200).json({
                status: 200,
                produto: permission,
                path: req.originalUrl
            })
        },

        async createNewPermission(req, res) {
            const { name, description } = req.body;

            const [ permission, created ] = await Permissions.findOrCreate({
                where: { name },
                defaults: { id: uuid.v4(), name, description },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
            })

            if(!created) return res.status(400).json({ 
                status: 400, 
                message: "A permissão já existe na base de dados!", 
                path:`/regras/${permission.id}`,
                data: permission
            })

            return res.status(201).json({ status: 201, message: 'Permissão cadastrada com sucesso!' })
        },

        async deletePermissionById(req, res) {
            const { permissionId: id } = req.params;

            try {
                
                const permission = await Permissions.findByPk(id)
                
                if(permission) {
                    await Permissions.destroy({ where: { id }}) 
                    
                    return res.status(200).json({ 
                        status: 200,
                        message: "Permissão deletada com sucesso!",
                        data: permission
                    })
                } 

                return res.status(404).json({ 
                    status: 404,
                    message: "Permissão não encontrada na base de dados!"
                })
                

            } catch(err) {
                return res.status(400).json({
                    status: 400, 
                    error:'Bad Request', 
                    message: err,
                })
            }
        },

        async updatePermissionById(req, res) {
            const { permissionId: id } = req.params;
            const { name, description } = req.body;

            const payload = { id: uuid.v4(), name, description } 

            const permission = await Permissions.findByPk(id)

            if(!permission) {
                return res.status(404).json({
                    status: 404,
                    message: 'Permissão não encontrada na base de dados',
                })
            }

            await Permissions.update(payload, { where: { id }})

            return res.status(200).json({
                status: 200,
                message: 'Permissão atualizada com sucesso',
                data: permission
            })
        }
        
    }
}

module.exports = PermissionsController