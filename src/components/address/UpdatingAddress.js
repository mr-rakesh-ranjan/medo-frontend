import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { getCurrentCustomerDetails, getCurrentToken } from '../../auth';
import axios from 'axios';
import baseURL from '../../apis/apiCon';

const UpdatingAddress = () => {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location); //for debugging purpose 

    const [address, setAddress] = useState({
        "flatNo": location.state.flatNo,
        "streetName": location.state.streetName,
        "locality": location.state.locality,
        "pincode": location.state.pincode,
        "city": location.state.city,
        "state": location.state.state
    })

    //add address handler 
    const updateAddressHandler = (e) => {
        const tempAddress = { ...address };
        tempAddress[e.target.name] = e.target.value;
        setAddress(tempAddress);
        console.log(address); //for debugging purpose
    }

    const auth_Token = 'Bearer ' + getCurrentToken();
    // console.log(auth_Token); //for debugging purpose

    const customerId = getCurrentCustomerDetails().customerId;
    // console.log(customerId); //for debugging purpose

    const config = {
        headers: {
            'Authorization': `${auth_Token}`,
            'Content-Type': "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const addressId = location.state.addressId;
    const submitAddress = (e) => {
        e.preventDefault();
        axios.put(`${baseURL}/api/v1/auth/${customerId}/update-address/${addressId}`, address, { config })
        .then(res => {
            console.log(res.data);
            navigate("/customer/dashboard");
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <>
            <Container className="mt-3">
                <div className="my-3">
                    <h2 className="text-center"> Add New Address</h2>
                </div>
                <Form method="put" onSubmit={submitAddress}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="flatNo">
                                    Flat Number
                                </Label>
                                <Input
                                    name="flatNo"
                                    // placeholder="7A"
                                    value={address.flatNo}
                                    type="text"
                                    onChange={updateAddressHandler}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="streetName">
                                    Street Name
                                </Label>
                                <Input
                                    name="streetName"
                                    value={address.streetName}
                                    type="text"
                                    onChange={updateAddressHandler}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="locality">
                            Locality
                        </Label>
                        <Input
                            type="text"
                            name="locality"
                            value={address.locality}
                            onChange={updateAddressHandler}
                        />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="city">
                                    City
                                </Label>
                                <Input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={updateAddressHandler}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="state">
                                    State
                                </Label>
                                <Input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={updateAddressHandler}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="pincode">
                                    Zip
                                </Label>
                                <Input
                                    type="text"
                                    name="pincode"
                                    value={address.pincode}
                                    onChange={updateAddressHandler}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="text-center pb-3">
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default UpdatingAddress