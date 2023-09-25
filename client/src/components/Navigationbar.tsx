// src/components/Navbar.tsx
import React from 'react';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import logo from '../assets/brand.png';

const Navigationbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };
    return (
        <nav className="navbar navbar-expand-md container-fluid bg-secondary bg-opacity-50 p-0 m-0 h5">
            <div className="container-fluid p-0">
                <a className="navbar-brand p-0 m-0" href="/"><img src={logo} className="img-responsive p-0 m-0" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link px-2 navbar-height" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-2 navbar-height" href="/">Product</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-2 navbar-height" href="/">Research</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-2 navbar-height" href="/">Career</a>
                        </li>
                        
                    </ul>
                    <form className="navbar-height" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    {user.loggedIn ? (
                        <li className="nav-item dropdown navbar-height">
                            <a className="nav-link dropdown-toggle justify-content-center profile-dropdown navbar-height ps-2 pe-1" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.userName}
                            </a>
                            <ul className="dropdown-menu p-0 bg-secondary bg-opacity-50 py-0">
                                <li><a className="dropdown-item" href="/">Profile</a></li>
                                <li><a className="dropdown-item" href="/">Notifications</a></li>
                                <li><a className="dropdown-item" href="/">Cart</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" onClick={handleLogout}>Sign Out</a></li>
                            </ul>
                        </li>) :
                        (
                            <li className="nav-item dropdown navbar-height">
                                <a className="nav-link justify-content-center profile-dropdown navbar-height ps-2 pe-1"
                                    href="RegistrationSignIn" aria-expanded="false">Register/Sign In</a>
                            </li>
                        )}

                </div>
            </div>
        </nav>
    );
}
export default Navigationbar;