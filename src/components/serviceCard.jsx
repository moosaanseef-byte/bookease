import { BookingContext } from "../../context/BookingContextValue";
import { useContext } from "react";


function ServiceCard({ service}){
    const { handleBook } = useContext(BookingContext);

    function bookService(){
        handleBook(service);
    }
    return(
        <div className="service-card">
            <img src={service.Image} alt={service.name}
            className="service-image" />

<div className="service-details">
    <span className="service-category">
        {service.category}
    </span>
    <h3>{service.name}</h3>
    <p>{service.description}</p>
    
    <div className="service-info">
        <strong>{service.price}</strong>
        <span>{service.duration}</span> 
        </div>
        <button className="book-button" onClick={ bookService}>Book This Service</button>
        </div>
        </div>
    );
}

export default ServiceCard;