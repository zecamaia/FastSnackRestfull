import { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import ListEvents from "../../components/ListEvents";
import Slider from "../../components/Slider";
import api from "../../../services/axios";
import { showErrorAlert } from "../../components/Dialog";


const Evento = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('api/eventos')
                setEvents(response.data);
                console.log(events);
            } catch (error) {
                showErrorAlert(error.message)
            }
        }
        fetchEvents();
    }, []);
    return (
        <div className="max-w-screen-lg mx-auto p-4 mt-36">
            <h2 className="text-3xl text-primary font-bold text-center sm:text-3xl md:text-3xl">Os melhores eventos você encontra aqui!</h2>            <Categories />
            <Slider />
            <ListEvents events={events} />
        </div>


    )

}

export default Evento;