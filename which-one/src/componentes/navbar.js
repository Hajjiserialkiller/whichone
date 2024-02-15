import { useLocation } from 'react-router-dom';


export default function Navbar() {
    const location = useLocation();

    const isActive = (pathname) => {
        return location.pathname === pathname ? 'active' : '';
    };
    return (
        <header className="">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="index.html"><h2>WhichOne<em>?</em></h2></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <a href="/" className={`nav-link ${isActive('/')}`}>
                                Home
                            </a>
                            </li>
                            <li className="nav-item">
                            <a href="/compare" className={`nav-link ${isActive('/compare')}`}>
                                Compare
                            </a>
                            </li>
                            <li className="nav-item">
                            <a href="/how-to" className={`nav-link ${isActive('/how-to')}`}>
                                How To
                            </a>
                            </li>
                            <li className="nav-item">
                            <a href="/deals" className={`nav-link ${isActive('/deals')}`}>
                                Deals
                            </a>
                            </li>
                            <li className="nav-item">
                            <a href="/contact" className={`nav-link ${isActive('/contact')}`}>
                                Contact Us
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}