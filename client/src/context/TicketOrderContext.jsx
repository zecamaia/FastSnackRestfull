import { createContext, useContext, useEffect, useState } from "react";

const TicketOrderContext = createContext();
export const TicketOrderProvider = ({ children }) => {
    const [ticketOrders, setTicketOrders] = useState(() => {
        const savedOrders = JSON.parse(localStorage.getItem("ticketOrders"));
        return savedOrders || [];
    });
    useEffect(() => {
        if (ticketOrders.length > 0) {
            localStorage.setItem("ticketOrders", JSON.stringify(ticketOrders));
        } else {
            localStorage.removeItem("ticketOrders");
        }
    }, [ticketOrders]);
    const addTicketOrder = (newTicket) => {
        setTicketOrders((prevOrders) => {
            const existingTicket = prevOrders.find(
                (order) => order.ticket_id === newTicket.ticket_id
            );

            if (existingTicket) {
                // Se o ingresso já existir, atualiza a quantidade
                return prevOrders.map((order) =>
                    order.ticket_id === newTicket.ticket_id
                        ? { ...order, quantity: order.quantity + newTicket.quantity }
                        : order
                );
            } else {
                // Se for um novo ingresso, adiciona ao estado
                return [...prevOrders, newTicket];
            }
        });
    };
    const removeTicketOrder = (ticketId) => {
        setTicketOrders((prevOrders) =>
            prevOrders.filter((order) => order.ticket_id !== ticketId)
        );
    };
    return (
        <TicketOrderContext.Provider value={{ ticketOrders, addTicketOrder, removeTicketOrder }}>
            {children}
        </TicketOrderContext.Provider>
    )
}
export const useTicketOrderContext = () => {
    return useContext(TicketOrderContext);
};