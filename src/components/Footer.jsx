function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h2>Book<span>Ease</span></h2>

                <p>
                    Making self-care simple, one appointment at a time.
                </p>

                <p>
                   &copy; {new Date().getFullYear()} BookEase. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;