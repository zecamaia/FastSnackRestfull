const { Ticket } = require("../../models");

class TicketController {
    async createTicket(req, res) {
        try {
            const newTicket = req.body;
            const { user_id, event_id, ticket_type, price, status } = newTicket;
            const ticket = await Ticket.create({
                user_id,
                event_id,
                ticket_type,
                price,
                status
            });
            res.status(201).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao criar ingresso" });
        }
    }
    async getAllTickets(req, res) {
        try {
            const ticket = await Ticket.findAll();
            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ errro: "Erro ao listar os ingressos" });
        }
    }
    async getTicketById(req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            if (!ticket) {
                return res.status(404).json({ erro: "Ingresso nao encontrado." });
            }
            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao mostrar o ingresso" });
        }
    }
    async updateTicket(req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            if (!ticket) {
                return res.status(404).json({ erro: "Ingresso não encontrado" });
            }
            const editedTicket = await ingresso.update(req.body);
            const { user_id, event_id, ticket_type, price, status } = editedTicket;
            res.status(200).json({
                user_id,
                event_id,
                ticket_type,
                price,
                status
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao editar ingresso" });
        }

    }
    async deleteTicket(req, res) {
        try {
            const ticket = await Ticket.findByPk(req.params.id);
            if (!ticket) {
                return res.status(404).json({ erro: "Ingresso não encontrado" });
            }
            await ticket.destroy();
            res.status(200).json({ message: "Ingresso Deletado com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao deletar ingresso" });
        }
    }
}

module.exports = new TicketController();