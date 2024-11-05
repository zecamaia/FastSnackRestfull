import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../services/axios';
import { showErrorAlert } from '../../components/Dialog';
import { format } from 'date-fns';

const EventInfo = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEventById = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`/api/eventos/${id}`);
                setEvent(response.data.event)
                console.log(response.data)
            } catch (error) {
                showErrorAlert("Erro ao buscar o evento")
            } finally {
                setIsLoading(false)
            }
        }
        fetchEventById();
    }, [id])


    return (
        <div className="relative w-full h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative max-w-screen-lg mx-auto p-4 mt-36">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h1>
                        <p className="text-gray-600 mb-6">{event.description}</p>
                        <div className="flex justify-center space-x-8 text-gray-700">
                            <div>
                                <p className="font-medium">Início:</p>
                                <p>{event.start_date ? format(new Date(event.start_date), 'dd/MM/yyyy HH:mm') : 'Data de início não disponível'}</p>
                            </div>
                            <div>
                                <p className="font-medium">Fim:</p>
                                <p>{event.end_date ? format(new Date(event.end_date), 'dd/MM/yyyy HH:mm') : 'Data de fim não disponível'}</p>
                            </div>
                            <div>
                                <p className="font-medium">Local:</p>
                                <p>{event.location}</p>
                            </div>
                        </div>

                        {/* Formulário para seleção do tipo de ingresso e botão de compra */}


                        {/* Botão para ver ingressos */}
                        <button className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors duration-300">
                            <Link to='/ingressos'>
                                Ver Detalhes e comprar
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventInfo;
