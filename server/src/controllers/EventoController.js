const Evento = require('../models/Evento');


class EventoController {
    async store(req, res) {
        try {
            console.log(req.user.id)
            const novoEvento = req.body
            const { nome, data_inicio, data_fim, imagem, status } = novoEvento;
            const evento = await Evento.create({
                nome,
                data_inicio,
                data_fim,
                imagem,
                status,
                organizador_id: req.userId
            });
            return res.status(201).json({ status: 200, evento });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ erro: "Erro ao criar evento. Tente novamente" });
        }
    }
    async index(req, res) { }
    async show(req, res) { }
    async update(req, res) { }
    async delete(req, res) { }
}

module.exports = new EventoController();