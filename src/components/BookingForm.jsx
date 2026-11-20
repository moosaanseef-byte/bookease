import { useState, useContext } from "react";
import { BookingContext } from "../../context/BookingContextValue";
import { useEffect } from "react";
import { toast } from "react-toastify";

function BookingForm(){
    const{
      selectedService,
      handleConfirmBooking
    } = useContext(BookingContext);

    useEffect(() => {
      if (selectedService) {
        document.getElementById("booking")?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, [selectedService]);

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        date:"",
        time:""
    });

    function handleChange(event){
        const { name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        if(!selectedService){
          toast.warning ("please select a service before bookings!");
          return;
        }
        const booking={
            id:Date.now(),
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            service:selectedService
        };
        handleConfirmBooking(booking);
        toast.success("Your appointment has been booked successfully!");

        setFormData({
            name:"",
            email:"",
            phone:"",
            date:"",
            time:""
        });
    }
    // if(!selectedService){
    //     return null;
    // }

return (

    <section className="booking-section" id="booking">

      <div className="booking-container">

        <div className="booking-intro">

          <p>BOOK YOUR APPOINTMENT</p>

          <h2>Let's Get You Booked</h2>

          <span>

            Fill in your details to confirm your appointment.

          </span>

        </div>

        <form

          className="booking-form"

          onSubmit={handleSubmit}

        >

          <div className="selected-service">

            <h3>Selected Service</h3>

            {selectedService ? (
              <>
              <p>Service: {selectedService.name}</p>

            <p>Price: ₹{selectedService.price}</p>

            <p>Duration: {selectedService.duration}</p>

              </>
            ) : (
              <p>please select a service first.</p>
            )}

          </div>

          <h3>Your Details</h3>

          <div className="form-group">

            <label>Your Name</label>

            <input

              type="text"

              name="name"

              placeholder="Enter your name"

              value={formData.name}

              onChange={handleChange}

              required

            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Email Address</label>

              <input

                type="email"

                name="email"

                placeholder="Enter your email"

                value={formData.email}

                onChange={handleChange}

                required

              />

            </div>

            <div className="form-group">

              <label>Phone Number</label>

              <input

                type="tel"

                name="phone"

                placeholder="Enter your phone number"

                value={formData.phone}

                onChange={handleChange}

                required

              />

            </div>

          </div>

          <h3>Appointment Details</h3>

          <div className="form-row">

            <div className="form-group">

              <label>Choose Date</label>

              <input

                type="date"

                name="date"

                value={formData.date}

                onChange={handleChange}

                min={new Date().toISOString().split("T")[0]}

                required

              />

            </div>

            <div className="form-group">

              <label>Choose Time</label>

              <select

                name="time"

                value={formData.time}

                onChange={handleChange}

                required

              >

                <option value="">Select a time</option>

                <option value="10:00 AM">10:00 AM</option>

                <option value="11:00 AM">11:00 AM</option>

                <option value="12:00 PM">12:00 PM</option>

                <option value="02:00 PM">02:00 PM</option>

                <option value="03:00 PM">03:00 PM</option>

                <option value="04:00 PM">04:00 PM</option>

              </select>

            </div>

          </div>

          <button

            type="submit"

            className="confirm-button"
            disabled={!selectedService}

          >

            Confirm Booking

          </button>

        </form>

      </div>

    </section>

  );

}

export default BookingForm;