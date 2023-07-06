import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap';
import baseURL from '../../apis/apiCon';
import { getCurrentCustomerDetails, getCurrentToken } from '../../auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const SelectAddress = () => {

    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [flag, setFlag] = useState(false);
    // console.log(userId); //for debugging purpose
    // console.log(token); //for debugging purpose

    const auth_Token = 'Bearer ' + getCurrentToken();
    // console.log(auth_Token); //for debugging purpose

    const customerId = getCurrentCustomerDetails().customerId;
    // console.log(customerId); //for debugging purpose


    const config = {
        headers: {
            'Authorization': `${auth_Token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    };

    const fetchAddress = async (customerId) => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/auth/${customerId}/all-address`, { config });
            if (response) {
                if (response.data) {
                    setAddresses(response.data);
                    setFlag(true);
                    console.log(addresses);
                } else {
                    alert("No addresses are found!")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAddress(customerId); //for getting address from backend
        // let tempCustomer = getCurrentCustomerDetails();
        // console.log(tempCustomer); //for debugging purpose
        // setAddresses(tempCustomer.addresses);
    }, [flag])

    const addNewAddress = () => {
        navigate('/customer/add-address')
    }

    //getting data from state
    const location = useLocation();
    // console.log(location.state); //for debuuging purpose

    const totalPrice = location.state;

    //previous function
    const previous = () => {
        navigate('/customer/cart')
    }

    //select Address handler
    const [selectedAddress, setselectedAddress] = useState([])
    const selectAddressHandler = (index) => {
        setselectedAddress(addresses[index]);
        toast.success("Your address is selected")
        // console.log(selectedAddress); //for debuggng purpose
    }

    //proceed to payment method
    const selectAddressState = {
        sTotalPrice: totalPrice,
        sSelectAddress: selectedAddress
    };

    // console.log(selectAddressState); //for debigging purpose
    const proceedToPayment = () => {
        navigate("/customer/payments", { state: selectAddressState })
    }

    const updateAddress = (address) => {
        navigate("/customer/update-address", {state : address} )
    }

    return (
        <>
            <div className="conatiner mt-3">
                <h4 style={{ color: '#01286b', fontWeight: 'bold' }}>
                    Please select your address for delivery.
                </h4>
                <h5>Total purchase amount : {totalPrice}</h5>
                <hr />
                <div>
                    <Card className="m-3"
                        color="dark"
                        outline
                        style={{
                            width: '25rem'
                        }}>
                        <CardHeader className='text-center'>My Addresses</CardHeader>
                        {
                            Object.keys(addresses).map((key, i) => (
                                <Card className="m-3" key={i}>
                                    <CardHeader>Address {i + 1}</CardHeader>
                                    <CardBody>
                                        <CardText>
                                            <p><strong>Flat number:</strong> {addresses[key].flatNo}, <strong>Street Name : </strong> {addresses[key].streetName} <strong> Locality : </strong> {addresses[key].locality} <strong>City : </strong> {addresses[key].city}, <strong>Pincode : </strong> {addresses[key].pincode} <strong> State : </strong> {addresses[key].state}</p>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className='text-center'>
                                        <button type="button" class="btn mx-3"
                                            style={{
                                                backgroundColor: '#20c997'
                                            }}
                                            onClick={() => selectAddressHandler(key)}
                                        >
                                            Select Address
                                        </button>
                                        <button type="button" class="btn btn-warning" onClick={() => updateAddress(addresses[key])}>Update Address</button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                        <CardFooter className='text-center'>
                            <button type="button" class="btn btn-warning" onClick={addNewAddress}>Add New Address</button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="float-right">
                    <a type="btn" className="btn btn-danger mx-1" onClick={() => previous()} >Previous</a>
                    <Link type="btn" className="btn btn-primary mx-1" state={selectAddressState} to={"/customer/payments"} onClick={proceedToPayment} >Procceed to Payment</Link>
                </div>
                <p><strong>Note:</strong></p>
                <ul>
                    <li>You can add more than one addresses.</li>
                </ul>
            </div>
            <ToastContainer />
        </>
    )
}

export default SelectAddress