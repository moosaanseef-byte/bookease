import { useContext, useState } from "react";
import { BookingContext } from "../../context/BookingContextValue";
import { toast } from "react-toastify";

function BookingList() {
    const{
        bookings,
        handleCancelBooking,
        handleUpdateBooking
    } = useContext(BookingContext);

    // store the search text
    const [searchTerm, setSearchTerm] = useState("");

    // store the selected date
    const [selectedDate, setSelectedDate] =useState("");

    const [editingId, setEditingId] = useState(null);

    // store the edit form detail
    const [editFormData, setEditFormData] = useState({
      customerName:"",
      email:"",
      phone:"",
      date:"",
      time:""
    });

    // filter appointments based on search and date
    const filteredBookings = bookings.filter((booking)=>{
      const search = searchTerm.toLocaleLowerCase();

      const matchesSearch = 
      booking.customerName.toLocaleLowerCase().includes(search) ||
      booking.service.name.toLocaleLowerCase().includes(search) ||
      booking.email.toLocaleLowerCase().includes(search) ||
      booking.phone.includes(search);

      const matchesDate = 
      selectedDate === "" || booking.date === selectedDate;

      return matchesSearch && matchesDate;
    });

    // clear all filters
    function clearFilters(){
      setSearchTerm("");
      setSelectedDate("");
    }

    // edit
    function handleEditClick(booking){
      setEditingId(booking.id);

      setEditFormData({
        customerName: booking.customerName,
        email: booking.email,
        phone: booking.phone,
        date: booking.date,
        time: booking.time
      });
    }

    // update
    function handleEditChange(event){
      const { name, value } = event.target;
      setEditFormData((prevData)=>({
        ...prevData,
        [name]:value
      }));
    }

    // save the updated appointment
    function handleEditSubmit(event, booking){
      event.preventDefault();

      const updatedBooking ={
        ...booking,
        ...editFormData
      };
      handleUpdateBooking(updatedBooking);
      setEditingId(null);
      toast.success("Appointment updated successfully!");
    }

    // close the edit form without saving
    function handleEditCancel(){
      setEditingId(null);
    }

  return (
    <section className="appointments-section" id="appointments">

      <div className="section-heading">
        <p>APPOINTMENT DASHBOARD</p>
        <h2>Manage Your Bookings</h2>
        <span>
          View and manage all your appointments.
        </span>
      </div>

      {/* Booking Summary */}

      <div className="booking-summary">

        <div className="summary-card">
          <span>Total Appointments</span>
          <h3>{bookings.length}</h3>
        </div>

        <div className="summary-card">
          <span>Total Booking Value</span>
          <h3>
            ₹
            {bookings.reduce(
              (total, booking) => total + booking.service.price,
              0
            )}
          </h3>
        </div>

      </div>

      {/* search and date filter */}
      <div className="service-controls">
        <div className="controls-inner">
          <input
          type="text"
          placeholder="Search by cusotmer,service,email or phone..."
          value={searchTerm}
          onChange={(event)=> setSearchTerm(event.target.value)}
          />

          <input 
          type="date"
          value={selectedDate}
          onChange={(event)=> setSelectedDate(event.target.value)}
          />

          <button
          type="button"
          onClick={clearFilters} className="clear-filter-button">Clear Filters</button>
        </div>
      </div>

      {/* Booking Details */}

      <div className="booking-list">

        {filteredBookings.length === 0 ? (

          <div className="empty-bookings">
            <h3>No Appointments Yet</h3>
            <p>
              No bookings match your current search or filter.
            </p>
          </div>

        ) : (

          filteredBookings.map((booking) => (

            <div className="booking-card" key={booking.id}>

              <span className="booking-label">
                BOOKING CONFIRMED
              </span>

              <h3>{booking.service.name}</h3>
              {editingId === booking.id ? (
                // edit form
                <form
                className="booking-form"
                onSubmit={(event)=>
                  handleEditSubmit(event, booking)
                }
                >
                  <div className="form-group">
                    <label>Cusotmer Name</label>
                    <input
                    type="text"
                    name="customerName"
                    value={editFormData.customerName}
                    onChange={handleEditChange}
                    required/>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    required/>
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    required/>
                  </div>

                  <div className="form-row">
                  <div className="form-group">
                    <label>Appointment Date</label>
                    <input
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                    required/>
                  </div>
                  

                  <div className="form-group">
                    <label>Appointment Time</label>
                    <input
                    type="time"
                    name="time"
                    value={editFormData.time}
                    onChange={handleEditChange}
                    required/>
                  </div>
                  </div>

                  <button type="submit"
                  className="books-button">Save Changes</button>

                  <button type="button"
                  className="cancel-button"
                  onClick={handleEditCancel}>Cancel Editing</button>
                </form>
              ) : (
                // booking details
                <>
               
                <p>
                Customer: {booking.customerName}
              </p>

              <p>
                Email: {booking.email}
              </p>

              <p>
                Phone: {booking.phone}
              </p>

              <p>
                Date: {booking.date}
              </p>

              <p>
                Time: {booking.time}
              </p>

              <strong>
                ₹{booking.service.price}
              </strong>

              <button className="books-button"
              onClick={()=> handleEditClick(booking)}>Edit Appointment</button>

              <button
                className="cancel-button"
                onClick={()=> handleCancelBooking(booking.id)}
              >
                Cancel Booking
              </button>
               </>
              )
              }

              

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default BookingList;