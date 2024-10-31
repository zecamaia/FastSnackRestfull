import React from 'react';

const Categories = ({ image, name }) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-6 mt-10'>
            <div className='flex flex-col items-center'>
                <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                    <img className="w-16 h-16 rounded-full" src={image} alt="imagem-categoria" />
                </div>
                <span className='text-center text-sm font-semibold'>{name}</span>
            </div>
            <div className='flex flex-col items-center'>
                <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                    <img className="w-16 h-16 rounded-full" src={image} alt="imagem-categoria" />
                </div>
                <span className='text-center text-sm font-semibold'>{name}</span>
            </div>
            <div className='flex flex-col items-center'>
                <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                    <img className="w-16 h-16 rounded-full" src={image} alt="imagem-categoria" />
                </div>
                <span className='text-center text-sm font-semibold'>{name}</span>
            </div>
            <div className='flex flex-col items-center'>
                <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                    <img className="w-16 h-16 rounded-full" src={image} alt="imagem-categoria" />
                </div>
                <span className='text-center text-sm font-semibold'>{name}</span>
            </div>
            <div className='flex flex-col items-center'>
                <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                    <img className="w-16 h-16 rounded-full" src={image} alt="imagem-categoria" />
                </div>
                <span className='text-center text-sm font-semibold'>{name}</span>
            </div>
            <div className='flex flex-col items-center'>
                <div className="w-16 h-16 rounded-full  flex items-center justify-center overflow-hidden mb-2">
                    <img className="w-16 h-16 rounded-full" src={image} alt="imagem-categoria" />
                </div>
                <span className='text-center text-sm font-semibold'>{name}</span>
            </div>
        </div>
    );
}

export default Categories;
