import { createContext, useContext, useEffect, useState } from "react";

const TicketOrderContext = createContext();
export const TicketOrderProvider = ({ children }) => {
    const savedOrders = JSON.parse(localStorage.getItem("ticketOrders")) || [];
    const [ticketOrders, setOrderTickets] = useState([]);

    const addTicketOrder = (ticket) => {
        setOrderTickets((prevOrders) => [...prevOrders, ticket]);
    };
    const removeTicketOrder = (ticketId) => {
        setOrderTickets((prevOrders) =>
            prevOrders.filter((order) => order.ticket_id !== ticketId)
        );
    }
    return (
        <TicketOrderContext.Provider value={{ ticketOrders, addTicketOrder, removeTicketOrder }}>
            {children}
        </TicketOrderContext.Provider>
    )
}
export const useTicketOrderContext = () => {
    return useContext(TicketOrderContext);
};