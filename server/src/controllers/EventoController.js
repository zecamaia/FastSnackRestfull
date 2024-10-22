const Evento = require('../models/Evento');


class EventoController {
    async store(req, res) {
        try {
            const novoEvento = req.body
            const { nome, data_inicio, data_fim, imagem, status, organizador_id } = novoEvento;
            const evento = await Evento.create({
                nome,
                data_inicio,
                data_fim,
                imagem,
                status,
                organizador_id
            });
            return res.status(201).json({ status: 200, evento });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ erro: "Erro ao criar evento. Tente novamente" });
        }
    }
    async index(req, res) {
        try {
            const eventos = await Evento.findAll();
            res.status(200).json(eventos)
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar listar eventos. Tente novamente" });
        }
    }
    async show(req, res) {
        try {
            const evento = await Evento.findByPk(req.params.id);
            if (!evento) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            res.status(200).json({ evento });

        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar mostrar evento. Tente novamente" });
        }
    }
    async update(req, res) {
        try {
            const evento = await Evento.findByPk(req.params.id);
            if (!evento) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            const novosDados = await evento.update(req.body);
            const { nome, data_inicio, data_fim, imagem, status } = novosDados;
            res.status(200).json({ nome, data_inicio, data_fim, imagem, status });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar editar evento. Tente novamente" });
        }
    }
    async delete(req, res) {
        try {
            const evento = await Evento.findByPk(req.params.id);
            if (!evento) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            await evento.destroy();
            res.json({ message: "Evento deletado com sucesso." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar editar evento. Tente novamente" });
        }

    }
}

module.exports = new EventoController();