import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { doLogout, getCurrentCustomerDetails, isLoggedIn } from '../../auth';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';


const NavBar = ({ direction, ...args }) => {

    const navigate = useNavigate();

    //handling dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);


    //handling logout
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined)

    useEffect(() => {

        setLogin(isLoggedIn())
        setUser(getCurrentCustomerDetails())

    }, [login])

    //logout function
    const logout = () => {
        doLogout( () =>{
            //logged out
            setLogin(false)
            navigate("/")
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                <Link className="navbar-brand" to="/">
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
                            <NavLink className="nav-link" exact to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {
                    login && (
                        <>
                            <Link className="btn btn-outline-light ">Cart</Link>
                            <Dropdown className="px-1" isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                                <DropdownToggle caret>User</DropdownToggle>
                                <DropdownMenu {...args}>
                                    <DropdownItem tag={Link} exact to="/customer/dashboard">
                                    {user.email}
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} exact to="/customer/order">
                                        My Order
                                    </DropdownItem>
                                    <DropdownItem tag={Link} exact to="/customer/profile-info" >
                                    Profile
                                    </DropdownItem>
                                    <DropdownItem onClick={logout}>
                                    Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>

                    )
                }

                {
                    !login && (
                        <>
                            <Link className="btn btn-outline-light " to="/login">Login</Link>
                            <Link className="btn btn-outline-light m-3" to="/signup">Sign up</Link>
                        </>
                    )
                }


            </div>
        </nav >
    )
}

NavBar.propTypes = {
    direction: PropTypes.string,
};

export default NavBar