import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap';
import baseURL from '../../apis/apiCon';
import { getCurrentCustomerDetails, getCurrentToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllAddress = () => {

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
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    };

    const fetchAddress = async (customerId) => {
        try {
            const response = await axios.get(`${baseURL}/api/v1/auth/${customerId}/all-address`, { config });
            if (response) {
                if (response.data) {
                    setAddresses(response.data);
                    setFlag(true);
                    // console.log(addresses);
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
    }, [flag])

    const addNewAddress = () => {
        navigate('/customer/add-address')
    }

    //delete address
    const deleteAddress = (addressId) => {
        console.log(addressId);
        try {
            axios.delete(`${baseURL}/api/v1/auth/${customerId}/delete/${addressId}`,)
                .then(res => {
                    console.log(res);
                    toast("Address is deleted.");
                    window.location.reload(false);
                })
        } catch (e) {
            alert("Something went wrong");
        };
    }

    const updateAddress = (address) => {
        navigate("/customer/update-address", {state : address} )
    }

    return (
        <>
            <Card>
                <CardHeader className='text-center'>My Addresses</CardHeader>
                {
                    Object.keys(addresses).map((key, i) => (
                        <Card className="m-3" key={i}>
                            <CardHeader>Address {i + 1}</CardHeader>
                            <CardBody>
                                <CardText>
                                    <p><strong>Flat number:</strong> {addresses[key].flatNo}, <strong>Street Name : </strong> {addresses[key].streetName} <strong> Locality : </strong> {addresses[key].locality} <strong>City : </strong> {addresses[key].city}, <strong> State : </strong> {addresses[key].state}, <strong>Pincode : </strong> {addresses[key].pincode}</p>
                                </CardText>
                            </CardBody>
                            <CardFooter className='text-center'>
                                <button type="button" class="btn btn-warning" onClick={() => updateAddress(addresses[key])}>Update Address</button>
                                <button type="button" class="btn btn-danger mx-3" onClick={() => deleteAddress(addresses[key].addressId)}>Delete Address</button>
                            </CardFooter>
                        </Card>
                    ))
                }
                <CardFooter className='text-center'>
                    <button type="button" class="btn btn-warning" onClick={addNewAddress}>Add New Address</button>
                </CardFooter>
            </Card>
        </>
    )
}

export default AllAddress