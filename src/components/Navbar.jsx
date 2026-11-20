import { useState } from "react";
function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return(
        <nav className="navbar">
       <a href="#home" className="logo">
    <img 
        src="/bookease-logo.svg" 
        alt="BookEase Logo" 
        className="logo-image"
    />
</a>

        {/*hamburger button */}
        <button className="hamburger"
        onClick={()=> setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded = {menuOpen}>{menuOpen ? "×" : "☰"}</button>


        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#services" onClick={closeMenu}> Services</a>
            <a href="#booking" onClick={closeMenu}>Book Appointment</a>
            <a href="#appointments" onClick={closeMenu}>My Booking</a>
            <a href="#booking" className="mobile-book-button" onClick={closeMenu}>Book Now</a>
        </div>

        <a href="#booking" className="nav-button">Book Now</a>
        </nav>
    );
}
export default Navbar;