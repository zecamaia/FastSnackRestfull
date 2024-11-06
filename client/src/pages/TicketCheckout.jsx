import React, { useState } from 'react';
import { useTicketOrderContext } from '../context/TicketOrderContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import { showErrorAlert, showSuccesAlert } from '../components/Dialog';
import Spinner from '../components/Spinner';

const TicketCheckout = () => {
    const { ticketOrders, removeTicketOrder } = useTicketOrderContext();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user'));

    console.log(userId.id)
    const handleConfirmPurchase = async () => {
        setIsLoading(true)
        try {
            console.log("chegou 1")
            for (let ticket of ticketOrders) {
                console.log("Ticket:", ticket); // Mostra cada item do ticketOrders
                console.log("Ticket ID:", ticket.ticket_id); // Verifica o ID do ticket
                console.log("Quantity:", ticket.quantity); // Verifica a quantidade do ticket
                console.log("Price:", ticket.price);
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
                showSuccesAlert("COMPRA CONFIRMADA");

            }
        } catch (error) {
            console.log("Erro ao confirmar a compra", error)
            showErrorAlert("Erro ao processar a compra");
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className='max-w-screen-lg mx-auto p-4 mt-20 mb-16 md:mt-16'>
            <h2>Resumo da Compra</h2>
            <p>Ingresso: {ticketOrders.ticket_type}</p>
            <p>Quantidade: {ticketOrders.quantity}</p>
            <p>Preço total: R${(ticketOrders.price * ticketOrders.quantity).toFixed(2)}</p>
            <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
        </div>
    );
}

export default TicketCheckout;
