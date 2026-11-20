function Hero(){
    return(
        <section className="hero" id="home">
            <div className="hero-content">
                <p className="hero-small">Welcome to BookEase</p>

                <h1>Beauty begin With
                    <br/>
                    <span> a little self-care</span>
                </h1>
                <p className="hero-description">
                    take a moment yourself.
                    Explore our services and book your next appointment with ease
                </p>
                <a href="#services" className="primary-button">
                    Explore Our Services
                </a>
            </div>

            <div className="hero-image">
                <img src="/images/salon.jpg" alt="studio"/>
            </div>
        </section>
    )
}

export default Hero;