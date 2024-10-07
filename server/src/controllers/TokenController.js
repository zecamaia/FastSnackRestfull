const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


class TokenController {
    async store(req, res) {
        const {email = "", password = ""} = req.body;

        if (email === "" || password === "") {
            return res.status(400).json({
                status: 400,
                error: "Preencha os campos.",
            });
        }
        if (!email || !password) {
            return res.status(401).json({
                status: 401,
                error: "Credenciais inválidas.",
            });
        }

        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({
                status: 404,
                error: "Usuario não encontrado.",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'secreta', { expiresIn: '1h' });
        res.json({
            status: 200,
            msg: "Logado com sucesso",
            token,
            user: { nome: user.username, id: user.id, email, role: user.role} });
    }
}


module.exports = new TokenController();