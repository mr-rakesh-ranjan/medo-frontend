import React, { useState } from 'react'
import { Form, Col, Row, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { getCurrentCustomerDetails, getCurrentToken } from '../../auth';
import axios from 'axios';
import baseURL from '../../apis/apiCon';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {

    const navigate = useNavigate();

    const [address, setAddress] = useState({
        "flatNo": "",
        "streetName": "",
        "locality": "",
        "pincode": "",
        "city": "",
        "state": ""
    })

    //add address handler 
    const addAddress = (e) => {
        const tempAddress = { ...address };
        tempAddress[e.target.name] = e.target.value;
        setAddress(tempAddress);
        // console.log(tempAddress); //for debugging purpose
        console.log(address); //for debugging purpose
    }

    const auth_Token = 'Bearer ' + getCurrentToken(); 
    // console.log(auth_Token); //for debugging purpose

    const customerId = getCurrentCustomerDetails().customerId;
    // console.log(customerId); //for debugging purpose

    const config = {
        headers : {
            'Authorization' : `${auth_Token}`,
            'Content-Type' : "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }

    //submit address handler
    const submitAddress = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/api/v1/auth/add-address/${customerId}`, {
            "flatNo" : address.flatNo,
            "streetName" : address.streetName,
            "locality" : address.locality,
            "pincode" : address.pincode,
            "city" : address.city,
            "state" : address.state
        }, ).then( res => {
            // console.log(res.data);
            navigate("/customer/dashboard")

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
                <Form method="post" onSubmit={submitAddress}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="flatNo">
                                    Flat Number
                                </Label>
                                <Input
                                    name="flatNo"
                                    placeholder="7A"
                                    type="text"
                                    onChange={addAddress}
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
                                    placeholder="Jagdeo Path"
                                    type="text"
                                    onChange={addAddress}
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
                            placeholder="Near St. Babel School"
                            onChange={addAddress}
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
                                    placeholder="Dispur"
                                    onChange={addAddress}
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
                                    placeholder="Assam"
                                    onChange={addAddress}
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
                                    placeholder="999999"
                                    onChange={addAddress}
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

export default AddAddress