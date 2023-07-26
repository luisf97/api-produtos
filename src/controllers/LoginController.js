const { Users } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = 'luisf'

function LoginController() {
    return {
        async login(req, res) {

            const { email, password } = req.body;

            const user = await Users.findOne({ where: { email }})
            
            if(!user) return res.status(401).json({ status: 401, message: 'Usuário com email não cadastrado!'})
            else {
                const correctPassword = bcrypt.compareSync(password, user.password)

                if(correctPassword) {
                    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: 86400 })
                    
                    req.session.user = user;
                    
                    return res.status(200).json({usuario: { name: user.name, email: user.email }, auth: true, token})
                }
                else {
                    return res.status(401).json({ status: 401, message: 'Os dados inseridos estão incorretos'})
                }
            }

        }
    }
}

module.exports = LoginController;