import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../services/axios';
import { showErrorAlert } from '../../components/Dialog';
import { format } from 'date-fns';

const EventInfo = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchEventById = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`/api/eventos/${id}`);
                setEvent(response.data.event)
                setTickets(response.data.event.ticket)
                const initialQuantities = {};
                response.data.event.ticket.forEach(ticket => {
                    initialQuantities[ticket.id] = 0;
                });
                setQuantities(initialQuantities);

            } catch (error) {
                showErrorAlert("Erro ao buscar o evento")
            } finally {
                setIsLoading(false)
            }
        }
        fetchEventById();
    }, [id])

    const handleQuantityChange = (ticketId, change) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [ticketId]: Math.max(0, prevQuantities[ticketId] + change),
        }));
    };


    return (
        <div>
            <div className="relative w-full bg-cover bg-center h-[400px] md:h-[600px]"
                style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="max-w-screen-lg mx-auto p-4 mt-8 mb-16 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                    <p className="mt-4 text-lg">{event.description}</p>
                    <p className="mt-4 text-gray-600">
                        Data: {event.start_date ? format(new Date(event.start_date), 'dd/MMM/yy') : 'Data inválida'}
                    </p>
                    <p className="text-gray-600">Local: {event.location}</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4 w-full">
                    <h3 className="text-lg font-bold mb-2">Escolha seus ingressos:</h3>
                    <div className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="flex items-center justify-between border-b py-2">
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold">{ticket.ticket_type}</p>
                                    <p className="text-sm text-red-600">R${ticket.price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-600">Disponível: {ticket.available_quantity}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l"
                                        onClick={() => handleQuantityChange(ticket.id, -1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantities[ticket.id]}
                                        className="w-12 text-center border rounded"
                                        readOnly
                                    />
                                    <button
                                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r"
                                        onClick={() => handleQuantityChange(ticket.id, 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="ml-4 px-2 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
                                        onClick={() => handleBuyTickets(ticket.id)}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
}

export default EventInfo;
