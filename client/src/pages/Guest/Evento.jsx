import CategoryCircles from "../../components/CategoriaEventos";
import EventCarousel from "../../components/EventoCarrossel";
import EventList from "../../components/ListaEventos";
import SearchBar from "../../components/SearchBar"

const Evento = () => {
    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <EventCarousel />
            <SearchBar />
            <CategoryCircles />
            <EventList />
        </div>
    )

}

export default Evento;