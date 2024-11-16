import React, { useEffect, useState } from 'react';
import { IoTicketOutline } from "react-icons/io5";
import { IoPizzaSharp } from 'react-icons/io5';
import api from '../../../services/axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUserOrders = async () => {
            const response = await api.get(`/api/pedidos/user/${userId.id}`);
            console.log(response.data)
            setOrders(response.data)
        }
        fetchUserOrders()
    }, [])

    return (
        <div className='max-w-screen-lg mx-auto p-4 mt-36'>
            <div className='flex sm:justify-center md:justify-center lg:justify-start'>
                <h1 className='text-3xl text-primary font-bold sm:text-3xl md:text-3xl'>Meus pedidos</h1>
            </div>
            {orders.length > 0 ? (
                <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                    {orders.map((order) => (
                        <div key={order.id} className='flex flex-col p-4 bg-gray-50 shadow-lg rounded-md mb-6 border-l-4 border-primary'>
                            <div>
                                <h1 className='text-lg font-medium text-gray-900 mb-1'>Pedido #{order.id}</h1>
                                <p className='text-sm text-gray-600'>Status:
                                    <span className={
                                        `px-2 py-1 rounded-md text-sm font-semibold
                                        ${order.status === 'pendente' ? 'text-yellow-700 bg-yellow-100' :
                                            order.status === 'cancelado' ? 'text-red-600 bg-red-100' :
                                                order.status === 'pago' ? 'text-green-600 bg-green-100' : ''}`
                                    }>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </p>
                            </div>

                            <div className='my-4'>
                                <p className='text-sm text-gray-600'>Total: <span className='font-semibold text-gray-800'>R$ {order.total}</span></p>
                            </div>

                            {/* Renderizar orderItems */}
                            {order.orderItems && order.orderItems.length > 0 && (
                                <div>
                                    {order.orderItems.map((item) => (
                                        <div key={item.id} className='flex flex-col p-4 bg-white shadow-sm rounded-md mb-4'>
                                            {item.product ? (
                                                <div className='flex items-center'>
                                                    <IoPizzaSharp className='text-primary text-3xl mr-4' />
                                                    <div>
                                                        <h2 className='text-sm font-medium text-gray-900'>{item.product.name}</h2>
                                                        <p className='text-sm text-gray-600'>Quantidade: {item.quantity}</p>
                                                        <p className='text-sm text-gray-600'>Preço: R$ {item.unit_price}</p>
                                                    </div>
                                                </div>
                                            ) : item.ticket ? (
                                                <div className='flex items-center'>
                                                    <IoTicketOutline className='text-primary text-3xl mr-4' />
                                                    <div>
                                                        <h2 className='text-sm font-medium text-gray-900'>{item.ticket.event.name}</h2>
                                                        <p className='text-sm text-gray-600'>Quantidade: {item.quantity}</p>
                                                        <p className='text-sm text-gray-600'>Tipo: {item.ticket.ticket_type}</p>
                                                        <p className='text-sm text-gray-600'>Preço: R$ {item.unit_price}</p>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {order.qrCodeBase64 && (
                                <div className="mt-4 text-center">
                                    <h3 className="text-lg font-medium text-gray-900">QR Code do Pedido</h3>
                                    <img src={order.qrCodeBase64} alt="QR Code do Pedido" className="mx-auto mt-2 w-32 h-32" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex justify-center my-10'>
                    <p className='text-center text-xl'>Não há ingressos ou produtos disponíveis</p>
                </div>
            )}
        </div>
    );
}

export default Orders;
