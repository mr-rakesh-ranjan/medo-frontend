import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { doLogout, getCurrentCustomerDetails, isLoggedIn } from '../../auth';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import baseURL from '../../apis/apiCon';


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
        doLogout(() => {
            //logged out
            setLogin(false)
            navigate("/")
        })
    }

    //Search bar implementation
    const [medicine, setMedicine] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    const searchHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setSearchInput(value);
    }

    const filterData = medicine.filter((el) => {
        if(searchInput === ''){
            return el;
        }  else {
            return el.medicine.medicineName.toLowerCase().includes(searchInput)
        }
    })

    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
        };

        const fetchMedicines = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/v1/public/medicine/all`, { headers });
                if (response) {
                    // console.log(Object.keys(response.data).length); //for debugging purpose
                    if (response.data) {
                        setMedicine(response.data)
                        // console.log(response.data); //for debugging purpose
                    } else {
                        console.log("No medicines found");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchMedicines();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
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
                        {/* <li>
                            <Input type='text' placeholder='Search Medicine' onChange={searchHandler} value={searchInput} />
                        </li>
                        <li>
                            <button type='btn' className='mx-3 btn btn-info'>Search</button>
                        </li> */}
                        
                            {
                                filterData.map((item) => {
                                    <li key={item.medicineId} >
                                        {medicine.medicineName}
                                    </li>
                                })
                            }
                        

                    </ul>
                </div>


                {
                    login && (
                        <>
                            <Link className="btn btn-outline-light" exact to={"/customer/cart"}>Cart</Link>
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
        </nav>
    )
}

NavBar.propTypes = {
    direction: PropTypes.string,
};

export default NavBar