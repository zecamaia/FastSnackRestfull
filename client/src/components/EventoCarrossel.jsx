import Slider from 'react-slick';


function EventCarousel() {
    const banners = [
        { imageUrl: 'https://via.placeholder.com/600x200' },
        { imageUrl: 'https://via.placeholder.com/600x200' },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} className="mb-6">
            {banners.map((banner, index) => (
                <div key={index}>
                    <img src={banner.imageUrl} alt={`Banner ${index + 1}`} className="w-full h-64 object-cover" />
                </div>
            ))}
        </Slider>
    );
}

export default EventCarousel;
