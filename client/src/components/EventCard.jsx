function EventCard({ event }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 text-center">
            <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.date}</p>
        </div>
    );
}

export default EventCard;
