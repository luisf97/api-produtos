const { Users, Roles, Permissions } = require('../models/index')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

function UsersController() {
    return {

        async getAllUsers(req, res) {

            try {
                const users = await Users.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] } })

                if(!users.length) return res.status(404).json({ status: 404, message: 'Nenhum usuário encontrado!' })

                return res.status(200).json({ status: 200, usuários: users })

            } catch(err) {
                return res.status(400).json({status: 400, error: "Bad Request", message: err })
            }
        },

        async getUserById(req, res) {
            const { userId: id } = req.params;

            const user = await Users.findOne({ where: { id } })

            if(!user) return res.status(404).json({ status: 404, message: 'Usuário não encontrado na base de dados'})

            return res.status(200).json({ status: 200, produto: user, path: req.originalUrl })
        },

        async getUserWithPermissions(req, res) {
            const { id } = req.params

            
            const usuario = await Users.findOne({
                include: [
                    {
                        model: Roles,
                        as: 'users_roles',
                        attributes: ['id', 'name', 'description']
                    },
                    {
                        model: Permissions,
                        as: 'users_permissions',
                        attributes: ['id', 'name', 'description']
                    }
                ],
                where: { id }
            })

            return res.json(usuario)
        },

        async createNewUser(req, res) {
            const { name, email, password } = req.body;

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            try {
                const [ user, created ] = await Users.findOrCreate({
                    where: { email },
                    defaults: { id: uuid.v4(), name, email, password: hash },
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
                })
    
                if(!created) return res.status(202).json({ status: 202, message: "O usuário já existe na base de dados!", path:`/usuario/${user.id}` }) 
    
                return res.status(201).json({ 
                    status:201, 
                    message: "Usuário criado com sucesso!",
                    data: user,
                })

            } catch(err) {
                return res.status(400).json({
                    status: 400, 
                    error:'Bad Request', 
                    message: err,
                })
            }

        },

        async deleteUserById(req, res) {
            const { userId: id } = req.params;

            try {
                
                const user = await Users.findByPk(id)
                
                if(user) {
                    await Users.destroy({ where: { id }}) 
                    
                    return res.status(200).json({ 
                        status: 200,
                        message: "Usuário deletado com sucesso!",
                        data: user
                    })
                } 

                return res.status(404).json({ 
                    status: 404,
                    message: "Usuário não encontrado na base de dados!"
                })
                

            } catch(err) {
                return res.status(400).json({
                    status: 400, 
                    error:'Bad Request', 
                    message: err,
                })
            }
        },

        async updateUserById(req, res) {
            const { userId: id } = req.params;
            const { name, email, password } = req.body;

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const user = await Users.findByPk(id)

            try {
                await Users.update({ name, email, password: hash }, { where: { id }})

                return res.status(200).json({ status: 200, message: "Usuário atualizado com sucesso!", path:`/usuario/${user.id}` }) 

            } catch(err) {
                return res.status(400).json({
                    status: 400, 
                    error:'Bad Request', 
                    message: err,
                })
            }

        }
    }
}

module.exports = UsersController;