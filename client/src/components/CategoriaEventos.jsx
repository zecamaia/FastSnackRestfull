function CategoryCircles() {
    const categories = [
        { name: 'Música', imageUrl: 'https://via.placeholder.com/50' },
        { name: 'Esportes', imageUrl: 'https://via.placeholder.com/50' },
        { name: 'Teatro', imageUrl: 'https://via.placeholder.com/50' },
    ];

    return (
        <div className="flex justify-center gap-6 my-6">
            {categories.map((category) => (
                <div key={category.name} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center overflow-hidden mb-2">
                        <img src={category.imageUrl} alt={category.name} className="w-12 h-12" />
                    </div>
                    <span className="text-center text-sm font-semibold">{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default CategoryCircles;
