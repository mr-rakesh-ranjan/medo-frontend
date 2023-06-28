// import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardText, Col, Container, Row, Table } from 'reactstrap'
// import baseURL from '../../apis/apiCon';
import { getCurrentCustomerDetails } from '../../auth';
import AllAddress from '../address/AllAddress';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {

    const navigate = useNavigate()
    const [customer, setCustomer] = useState(getCurrentCustomerDetails());



    return (
        <>
            <Container className="text-left">
                <h1 className='text-center'>Welcome to DashBoard, {customer.name} !!!</h1>
                <Row xs={2}>
                    <Col>
                        <Card className="my-2">
                            <CardImg
                                alt="Card image cap"
                                src="https://picsum.photos/900/180"
                                style={{
                                    height: 180
                                }}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardText>
                                    <Table>
                                        <tbody>
                                            <tr key={1}>
                                                <td>User Name</td>
                                                <td>{customer.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email Address</td>
                                                <td>{customer.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{customer.phoneNumber}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardText>
                            </CardBody>
                            <CardFooter className='text-center'>
                                <button type='btn' className='btn btn-info' onClick={() => {navigate("/customer/order")}} >Your Order history</button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col>
                        <AllAddress />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CustomerDashboard