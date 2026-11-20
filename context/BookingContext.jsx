import { useEffect, useState } from "react";
import { BookingContext } from "./BookingContextValue";

//create provider
export function BookingProvider({children}) {
  const [bookings, setBookings]= useState(()=>{
    //load previously saved bookings
    const savedBookings = localStorage.getItem("bookease-bookings");

    if(savedBookings){
      try{
        return JSON.parse(savedBookings);
      } catch(error){
        console.error("unable to load saved bookings:",error);
      }
    }
    return [];
  });

  const [selectedService,setSelectedService] = useState(null);

  //save bookings
  useEffect(()=>{
    localStorage.setItem(
      "bookease-bookings",
      JSON.stringify(bookings)
    );
  },[bookings]);






  function handleBook(service) {
    setSelectedService(service);
  }

  function handleConfirmBooking(booking) {
    setBookings((previousBookings) => [...previousBookings, booking]);
    setSelectedService(null);
  }

  function handleCancelBooking(id) {
    setBookings((previousBookings) =>
      previousBookings.filter((booking) => booking.id !== id)
    );
  }

  function handleUpdateBooking(updateBooking){
    setBookings((prevBookings)=>
      prevBookings.map((booking)=>
      booking.id === updateBooking.id
  ? updateBooking : booking
));
  }

  return (
    <BookingContext.Provider
      value={{
        selectedService,
        bookings,
        handleBook,
        handleConfirmBooking,
        handleCancelBooking,
        handleUpdateBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
