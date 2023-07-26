const { Roles } = require('../models/index')

function RolesController() {
    return {
        
        async getAllRoles(req, res) {
            const roles = await Roles.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })

            if(!roles) return res.status(404).json({
                status: 404,
                message: 'Nenhuma regra encontrada!'
            })

            return res.status(200).json({
                status: 200,
                produtos: roles                    
            })
        },

        async getRoleById(req, res) {
            const { roleId: id } = req.params;

            const role = await Roles.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } })

            if(!role) return res.status(404).json({ status: 404, message: 'Regra não encontrada na base de dados'})
        
            return res.status(200).json({
                status: 200,
                produto: role,
                path: req.originalUrl
            })
        },

        async createNewRole(req, res) {
            const { name, description } = req.body;

            const [ role, created ] = await Roles.findOrCreate({
                where: { name },
                defaults: { name, description },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
            })

            if(!created) return res.status(400).json({ 
                status: 400, 
                message: "A regra já existe na base de dados!", 
                path:`/regras/${role.id}`,
                data: role
            })

            return res.status(201).json({ status: 201, message: 'Regra cadastrada com sucesso!' })
        },

        async deleteRoleById(req, res) {
            const { roleId: id } = req.params;

            try {
                
                const role = await Roles.findByPk(id)
                
                if(role) {
                    await Roles.destroy({ where: { id }}) 
                    
                    return res.status(200).json({ 
                        status: 200,
                        message: "Regra deletada com sucesso!",
                        data: role
                    })
                } 

                return res.status(404).json({ 
                    status: 404,
                    message: "Regra não encontrada na base de dados!"
                })
                

            } catch(err) {
                return res.status(400).json({
                    status: 400, 
                    error:'Bad Request', 
                    message: err,
                })
            }
        },

        async updateRoleById(req, res){
            const { roleId: id } = req.params;
            const { name, description } = req.body;

            const payload = { id: uuid.v4(), name, description } 

            const role = await Roles.findByPk(id)

            if(!role) {
                return res.status(404).json({
                    status: 404,
                    message: 'Regra não encontrada na base de dados',
                })
            }

            await Roles.update(payload, { where: { id }})

            return res.status(200).json({
                status: 200,
                message: 'Regra atualizada com sucesso',
                data: role
            })
        }
    }
}

module.exports = RolesController;