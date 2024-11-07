import React, { useState } from 'react';
import { useTicketOrderContext } from '../context/TicketOrderContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import { showConfirmAlert, showErrorAlert, showSuccesAlert } from '../components/Dialog';
import Spinner from '../components/Spinner';
import { FaRegTrashAlt } from 'react-icons/fa';

const TicketCheckout = () => {
    const { ticketOrders, removeTicketOrder } = useTicketOrderContext();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user'));

    const handleRemoveTicket = async (ticket_id) => {
        showConfirmAlert({
            text: "Deseja mesmo remover o ingresso?",
            confirmButtonText: "Sim",
            cancelButtonText: "Cancelar",
            onConfirm: () => {
                removeTicketOrder(ticket_id)
            }
        })
    }
    const handleConfirmPurchase = async () => {
        setIsLoading(true)
        try {
            console.log("chegou 1")
            for (let ticket of ticketOrders) {
                await api.post('/api/pedidos-ingressos', {
                    user_id: userId.id,
                    ticket_id: ticket.ticket_id,
                    quantity: ticket.quantity
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                removeTicketOrder(ticket.ticket_id)
                setIsLoading(false)
                navigate('/eventos')
                showSuccesAlert("COMPRA CONFIRMADA");
                //TODO: FAZER CONSUMO DO PAGAMENTO 
            }
        } catch (error) {
            showErrorAlert("Erro ao processar a compra");
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className='max-w-screen-lg mx-auto p-4 mt-36'>
            <h2 className='text-2xl font-bold mb-4'>Resumo da Compra</h2>

            {ticketOrders.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        {ticketOrders.map((ticket, index) => (
                            <div key={index} className="ticket-item flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-4">
                                <div>
                                    <p className='text-lg font-semibold'>Ingresso: {ticket.ticket_type}</p>
                                    <p className='text-sm text-gray-500'>Quantidade: {ticket.quantity}</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-md'>Preço Unitário: R${ticket.price.toFixed(2)}</p>
                                    <p className='text-md'>Preço Total: R${(ticket.price * ticket.quantity).toFixed(2)}</p>
                                    <button
                                        className='ml-4 bg-primary text-white py-1 px-3 rounded-lg hover:bg-red-500 transition-colors duration-300'
                                        onClick={() => handleRemoveTicket(ticket.ticket_id)}
                                    >
                                        <FaRegTrashAlt />

                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-white shadow-lg rounded-lg h-fit">
                        <h3 className='text-xl font-bold mb-4'>Resumo do Pedido</h3>
                        {ticketOrders.map((ticket, index) => (
                            <div key={index} className='flex justify-between items-center mb-2'>
                                <p className='text-sm text-gray-500'>Quantidade: {ticket.quantity}</p>
                                <p className='font-semibold'>R${(ticket.price * ticket.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <button
                            className='w-full bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-500 transition-colors duration-300'
                            onClick={handleConfirmPurchase}
                        >
                            Confirmar Compra
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Nenhum ingresso adicionado ao carrinho.</p>
            )}
        </div>

    );
}

export default TicketCheckout;
