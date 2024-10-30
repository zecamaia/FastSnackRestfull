import EventCard from './EventCard';

function EventList() {
    const events = [
        { title: 'Evento 1', date: '01/12/2023', imageUrl: 'https://via.placeholder.com/200' },
        { title: 'Evento 2', date: '02/12/2023', imageUrl: 'https://via.placeholder.com/200' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </div>
    );
}

export default EventList;
