// import axios from 'axios'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
// import baseURL from '../../apis/apiCon'

const NavLogin = () => {

    const logout = () => {
        // axios.post(`${baseURL}/api/v1/auth/logout`, {
        //     token : localStorage.getItem.token
        // })
        // .then(res => {
        //     if(res.status === "OK"){
        //         localStorage.clear
        //     } 
        // }).catch(err => {
        //     console.log(err);
        // })
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container">
                    <Link className="navbar-brand" to="/customer/home">
                        Medo
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/customer/dashboard">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/customer/profile-info">
                                    Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/customer/order">
                                    My Order
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <Link className="btn btn-outline-danger " onClick={logout}>Logout</Link>

                </div>
            </nav>
        </>
    )
}

export default NavLogin