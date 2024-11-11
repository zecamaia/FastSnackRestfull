import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { useTicketOrderContext } from '../context/TicketOrderContext';
import { showSuccesAlert, showErrorAlert, showValidationAlert } from '../components/Dialog';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';

const TicketCheckout = () => {
    const { ticketOrders, productOrders, removeProductFromCart, removeTicketOrder } = useTicketOrderContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isOrderEmpty, setIsOrderEmpty] = useState(false);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user'));

    const ticketSubtotal = ticketOrders.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0);
    const productSubtotal = productOrders.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalAmount = ticketSubtotal + productSubtotal;

    useEffect(() => {
        if (ticketOrders.length === 0 || productOrders.length === 0) {
            setIsOrderEmpty(true)
        } else {
            setIsOrderEmpty(false)
        }
    }, [ticketOrders, productOrders])

    const handleConfirmOrder = async () => {
        setIsProcessing(true);

        try {

            const orderData = {
                user_id: userId.id,
                tickets: ticketOrders.map(ticket => ({
                    ticket_id: ticket.ticket_id,
                    quantity: ticket.quantity,
                    price: ticket.price,
                })),
                products: productOrders.map(product => ({
                    product_id: product.product_id,
                    quantity: product.quantity,
                    price: product.price,
                }))
            };
            if (orderData.tickets.length === 0 && orderData.products.length === 0) {
                showValidationAlert("Selecione pelo menos 1 produto ou ingresso para continuar a compra.")
                return;
            }

            await api.post('/api/pedidos', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            ticketOrders.forEach(ticket => removeTicketOrder(ticket.ticket_id));
            productOrders.forEach(product => removeProductFromCart(product.product_id));

            showSuccesAlert("Pedido realizado com sucesso, finalize o pagamento");
            navigate('/pagamento');

        } catch (error) {
            console.error("Erro ao processar a compra:", error);
            showErrorAlert("Erro ao processar a compra");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 mt-24">
            <h2 className="text-2xl font-bold text-center mb-6">Confirmar Pedido</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h3 className="text-xl font-semibold mb-2">Ingressos</h3>
                        <ul>
                            {ticketOrders.length > 0 ? (
                                ticketOrders.map((order, index) => (
                                    <li key={index} className="flex justify-between items-center py-2 border-b">
                                        <div>
                                            <span>{order.ticket_type}</span>
                                            <div className="text-sm text-gray-600">Qtd: {order.quantity}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold text-gray-600 mr-4">R$ {(order.price).toFixed(2)}</span>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeTicketOrder(order.ticket_id)}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </li>
                                ))

                            ) : (
                                <p>Nenhum ingresso adicionado ao carrinho</p>
                            )}

                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h3 className="text-xl font-semibold mb-2">Produtos</h3>
                        <ul>
                            {productOrders.length > 0 ? (
                                productOrders.map((order, index) => (
                                    <li key={index} className="flex justify-between items-center py-2 border-b">
                                        <div>
                                            <span>{order.product_name}</span>
                                            <div className="text-sm text-gray-600">Qtd: {order.quantity}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold text-gray-600 mr-4">R$ {order.price}</span>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeProductFromCart(order.product_id)}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>Nenhum produto adicionado ao carrinho</p>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>

                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal de Ingressos:</span>
                            <span className="font-medium">R$ {ticketSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal de Produtos:</span>
                            <span className="font-medium">R$ {productSubtotal.toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between text-lg font-medium">
                            <span>Total:</span>
                            <span className="text-primary">R$ {totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors duration-300"
                        onClick={handleConfirmOrder}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processando...' : 'Confirmar Compra'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketCheckout;
