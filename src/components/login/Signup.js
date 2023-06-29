import axios from 'axios';
import React, { useState } from 'react'
import { Form, Col, Row, FormGroup, Label, Input, Button, Container, Card, CardHeader, CardBody } from "reactstrap";
import { doLogin } from '../../auth';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../apis/apiCon';


const Signup = () => {

    const navigate = useNavigate();

    const [custData, setCustData] = useState({
        customerName: "",
        customerEmail: "",
        phoneNumber: "",
        password: "",
    });

    const resetCustomer = () => {
        setCustData({
            customerName: '',
            customerEmail: '',
            phoneNumber: '',
            password: ''
        })
    }

    const handleChange = (event) => {
        setCustData({...custData, [event.target.name] : event.target.value})
    }
    const submitCustomer = (e) => {
        e.preventDefault()

        //handle validation
        if (custData.customerName.length < 2 || custData.customerEmail.length < 2 || custData.phoneNumber.length < 2 || custData.password.length < 2) {
            alert('Please enter 2 or more characters in the fields')
            return;
        }

        //send data client to server
        axios.post(`${baseURL}/api/v1/auth/register`, {
            name: custData.customerName,
            email: custData.customerEmail,
            phoneNumber: custData.phoneNumber,
            password: custData.password
        }).then(res => {
            console.log(res.data); //for debugging
            //saved token to the localstorage
            doLogin(res.data, () => {
                console.log("login detail is saved to the localstorage");
                //redirect the customer to dashboard page
                navigate("/customer/dashboard")
                window.location.reload(false);
            })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col sm={{ size: 6, offset: 3 }}>
                        {/* {JSON.stringify(custData)} for debugging */}
                        <Card>
                            <CardHeader>
                                <div className="my-3">
                                    <h3 className="text-center"> Signup as Customer</h3>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Form method="post" onSubmit={submitCustomer}>
                                    <FormGroup>
                                        <Label for="email" hidden>
                                            Email
                                        </Label>
                                        <Input
                                            name="customerEmail"
                                            placeholder="Enter your email"
                                            type="email"
                                            onChange={(e) => handleChange(e)}
                                            value={custData.customerEmail}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">
                                            Name
                                        </Label>
                                        <Input
                                            name="customerName"
                                            placeholder="Enter your name"
                                            type="text"
                                            onChange={(e) => handleChange(e)}
                                            value={custData.customerName}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phoneNumber">
                                            Phone Number
                                        </Label>
                                        <Input
                                            name="phoneNumber"
                                            placeholder="Enter your Phone Number"
                                            type="tel"
                                            onChange={(e) => handleChange(e)}
                                            value={custData.phoneNumber}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='passwrod'>
                                            Password
                                        </Label>
                                        <Input
                                            name="password"
                                            placeholder="Enter your password"
                                            type="password"
                                            onChange={(e) => handleChange(e)}
                                            value={custData.password}
                                        />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button type="submit" >Submit</Button>
                                        <Button className="ms-2" type="reset" onClick={resetCustomer} >Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Signup