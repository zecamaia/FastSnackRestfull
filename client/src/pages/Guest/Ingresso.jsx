import React, { useEffect, useState } from 'react';
import { IoTicketOutline } from "react-icons/io5";
import api from '../../../services/axios';

const Ingresso = () => {
    const [tickets, setTickets] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchUserTickets = async () => {
            const response = await api.get(`/api/pedidos-ingressos/user/${userId.id}`);
            setTickets(response.data)
        }
        fetchUserTickets()
    }, [])

    return (
        <div className='max-w-screen-lg mx-auto p-4 mt-36'>
            <div className='flex sm:justify-center md:justify-center lg:justify-start'>
                <h1 className='text-3xl text-primary font-bold sm:text-3xl md:text-3xl '>Meus ingressos</h1>
            </div>
            {tickets.length > 0 ? (
                <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className='flex flex-col p-4 bg-gray-50 shadow-sm rounded-md mb-4 border-l-4 border-primary'>
                            <div>
                                <h1 className='text-lg font-medium text-gray-900 mb-1'>{ticket.ticket.event.name}</h1>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <p className='text-sm text-gray-600'>Quantidade: <span className='font-semibold text-gray-800'>{ticket.quantity}</span></p>
                                <span className={
                                    `px-2 py-1 rounded-md text-sm font-semibold
                                    ${ticket.status === 'pendente' ? 'text-yellow-700 bg-yellow-100' :
                                        ticket.status === 'cancelado' ? 'text-red-600 bg-red-100' :
                                            ticket.status === 'confirmado' ? 'text-green-600 bg-green-100' : ''}`
                                }>
                                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                </span>
                            </div>
                            <p className='text-sm text-gray-600'>Tipo do ingresso: <span className='font-medium text-gray-800'>{ticket.ticket.ticket_type}</span></p>

                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex justify-center my-10'>
                    <p className='text-center text-xl'>Não há ingressos disponíveis</p>
                </div>
            )}



        </div>
    );
}

export default Ingresso;
