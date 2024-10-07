const User = require('../models/User')

class UserController {
    async store(req, res) {
        try {
            const { username, email, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const novoUsuario = await User.create({
                username,
                email,
                password: hashedPassword
            });
            return res.json({ id, username, email, role });

        } catch (error) {
            console.error(error)
            return res.status(500).json({ erro: "Erro ao criar usuario" });
        }
    }

    async index(req, res) {
        try {
            const usuarios = await User.findAll({
                attributes: ["id", "username", "email", "role"],
            });
            return res.json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar usuarios" })
        }
    }

    async show(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuario nao encontrdo." });
            }
            const { id, username, email, role } = usuario;
            return res.json({ id, username, email, role });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao listar usuario" })
        }
    }

    async update(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuario nao encontrdo." });
            }
            const novosDados = await User.update(req.body)
            const { id, username, email, role } = novosDados;
            return res.json({ id, username, email, role });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao editar usuario" })
        }
    }

    async delete(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: "Usuario nao encontrdo." });
            }
            await usuario.destroy();
            return res.json({
                status: 200,
                msg: "Deletado com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro ao deletar usuario" });
        }
    }
}

module.exports = new UserController();