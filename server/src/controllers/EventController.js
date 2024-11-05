const { Event, Ticket } = require('../../models');

class EventController {
    async createEvent(req, res) {
        try {
            const newEvent = req.body;
            const { name, user_id, start_date, end_date, image, description, location, status, event_category_id } = newEvent;
            console.log(newEvent)
            const event = await Event.create({
                name,
                user_id,
                start_date,
                end_date,
                image,
                description,
                location,
                status,
                event_category_id
            });
            return res.status(201).json({ status: 200, event });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ erro: "Erro ao criar evento. Tente novamente" });
        }
    }
    async getAllEvents(req, res) {
        try {
            const events = await Event.findAll({
                order: [
                    ['id', 'DESC']
                ]
            });
            res.status(200).json(events)
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar listar eventos. Tente novamente" });
        }
    }
    async getEventById(req, res) {
        try {
            const event = await Event.findByPk(req.params.id, {
                include: { model: Ticket, as: 'ticket' }
            });
            if (!event) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            res.status(200).json({ event });

        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar mostrar evento. Tente novamente" });
        }
    }
    async updateEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            const newData = await event.update(req.body);
            const { name, user_id, start_date, end_date, image, status, event_category_id } = newData;
            res.status(200).json({ name, user_id, start_date, end_date, image, status, event_category_id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar editar evento. Tente novamente" });
        }
    }
    async deleteEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            await event.destroy();
            res.json({ message: "Evento deletado com sucesso." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao tentar editar evento. Tente novamente" });
        }

    }
}

module.exports = new EventController();