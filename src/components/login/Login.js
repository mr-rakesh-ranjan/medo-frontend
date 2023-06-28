import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import baseURL from '../../apis/apiCon'
import axios from 'axios'
import { toast } from 'react-toastify'
import { doLogin } from '../../auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    })

    const addlogin = (event) => {
        setLoginData({...loginData, [event.target.name] : event.target.value})
    }

    const navigate = useNavigate();

    const subLogin = (e) => {
        e.preventDefault();

        //handle validation
        if(loginData.email.trim() === '' || loginData.password.trim() === ''){
            toast.error("Email or password is required !!")
            console.log("Email or password is required !!");
            return;
        }

        //send data to server to generate token
        axios.post(`${baseURL}/api/v1/auth/authenticate`, {
            email : loginData.email,
            password : loginData.password
        }).then(res => {
            console.log(res.data);

            //saved token to the localstorage
            doLogin(res.data, () => {
                // console.log("login detail is saved to the localstorage"); //for debugging purpose
                //redirect the customer to dashboard page
                navigate("/customer/dashboard")

            })

        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <Container className="text-center m-3 pe-365 ps-300">
                <Row>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card>
                            <CardHeader>
                                <h3>Login Here !!</h3>
                            </CardHeader>
                            <CardBody>
                                <Form className="mt-3" method='post' onSubmit={subLogin}>
                                    <FormGroup>
                                        <Label
                                            for="email"
                                            hidden
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            type="email"
                                            onChange={(e) => addlogin(e)}
                                            value={loginData.email}
                                        />
                                    </FormGroup>
                                    {' '}
                                    <FormGroup>
                                        <Label
                                            for="password"
                                            hidden
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            type="password"
                                            onChange={(e) => addlogin(e)}
                                            value={loginData.password}
                                        />
                                    </FormGroup>
                                    <Button>
                                        Submit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login