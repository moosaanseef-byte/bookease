import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import services from "./data/services";
import ServiceList from "./components/ServiceListe";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import Footer from "./components/Footer";

function App(){
  
  return(
    
  <div> 
     <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    <Navbar />
    <Hero />
    <ServiceList services={services} />
    <BookingForm />
    <BookingList />
    <Footer />
  
  </div>
  );
}

export default App;

// function App(){
//   return(
//     <div>Hello</div>
//   )
// }
// export default App;