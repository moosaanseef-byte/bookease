import ServiceCard from "./serviceCard";

function ServiceList({services}){
    return(
        <section className="services-section" id="services">
            <div className="section-heading">
                <p>What We Offer</p>
                <h2>Our Signature Services</h2>
                <span>Discover our range of Proffessionl beauty services</span>
            </div>
            <div className="service-grid">
                {services.map((service)=>(
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </section>
    );
}

export default ServiceList;