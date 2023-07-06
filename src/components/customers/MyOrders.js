import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import baseURL from '../../apis/apiCon';
import { getCurrentCustomerDetails, getCurrentToken } from '../../auth';
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap';

const MyOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([
        {
            "orderId": 552,
            "createdDate": "29/06/2023",
            "status": "PAID",
            "paymentMethod": "CASH",
            "totalPrice": 230.0,
            "address": {
                "addressId": 952,
                "flatNo": "P-27",
                "streetName": "Gali number 2",
                "locality": "Karolbagh",
                "pincode": "110078",
                "city": "new Delhi",
                "state": "New Delhi"
            },
            "medicines": [
                {
                    "medId": 452,
                    "medicineName": "Paracetamole",
                    "medicineCompany": "Paracetamole",
                    "price": 300.0,
                    "medicineType": "tablet",
                    "manufacturingDate": "2023-04-23",
                    "expiryDate": "2025-04-02"
                },
                {
                    "medId": 502,
                    "medicineName": "PAN-D",
                    "medicineCompany": "PAN-D",
                    "price": 120.0,
                    "medicineType": "Capsul",
                    "manufacturingDate": "2023-04-25",
                    "expiryDate": "2025-04-01"
                },
                {
                    "medId": 550,
                    "medicineName": "Alkof Junior",
                    "medicineCompany": "Alkem Laboratories Ltd.",
                    "price": 110.0,
                    "medicineType": "Syrup",
                    "manufacturingDate": "2023-12-11",
                    "expiryDate": "2023-10-11"
                }
            ]
        }
    ]);
    const [flag, setFlag] = useState(false);
    // console.log(userId); //for debugging purpose
    // console.log(token); //for debugging purpose

    const auth_Token = 'Bearer ' + getCurrentToken();
    // console.log(auth_Token); //for debugging purpose

    const customerId = getCurrentCustomerDetails().customerId;
    // console.log(customerId); //for debugging purpose

    const address = getCurrentCustomerDetails().address;

    const config = {
        headers: {
            'Authorization': `${auth_Token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    };

    console.log(orders);

    const fetchOrder = () => {
        try {
            const response = axios.get(`${baseURL}/api/v1/auth/all-order/${customerId}`, { config });
            if (response) {
                if (response.data) {
                    setOrders(...response.data)
                    setFlag(true)
                } else {
                    alert('No order found')
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // fetchOrder();
    }, [flag])

    const reOrders = () => {
        alert("your re order");
    }

    return (
        <>
            <div className="container" >
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <h1>My Orders</h1>
                        {
                            !orders && address && (
                                <h2 className='text-center'>No purchase found</h2>
                            )
                        }
                        {
                            orders && (Object.keys(orders).map((key, i) => (
                                <Card className="m-3" key={i}>
                                    <CardHeader>Order {i + 1}</CardHeader>
                                    <CardBody>
                                        <CardText>
                                            <p><b>Ordered Date: {orders[key].createdDate}</b><br />
                                                Payment Method: {orders[key].paymentMethod}<br />
                                                Total Amount: {orders[key].totalPrice}</p>
                                            <Card>
                                                <CardHeader>{`Delivered Address:`}</CardHeader>
                                                <CardBody>
                                                    <p><strong>Flat number:</strong> {orders[key].address.flatNo}, <strong>Street Name : </strong> {orders[key].address.streetName} <strong> Locality : </strong> {orders[key].address.locality} <strong>City : </strong> {orders[key].address.city}, <strong> State : </strong> {orders[key].address.state}, <strong>Pincode : </strong> {orders[key].address.pincode}</p>
                                                </CardBody>
                                            </Card>
                                            <Card className='mt-3'>
                                                <CardHeader>{`Items Ordered:`}</CardHeader>
                                                <CardBody>
                                                    
                                                    
                                                </CardBody>
                                            </Card>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter className='text-center'>
                                        <button type="button" class="btn btn-warning" onClick={() => reOrders(orders[key])}>Re-orders</button>
                                    </CardFooter>
                                </Card>
                            )))
                        }

                        {/* {orders.map((order) => (
                            <div key={order.orderId}>
                                <h3>Order ID: {order.orderId}</h3>
                                <p>Created Date: {order.createdDate}</p>
                                <p>Status: {order.status}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                <p>Total Price: {order.totalPrice}</p>
                                <h4>Address:</h4>
                                <p>Flat No: {order.address.flatNo}</p>
                                <p>Street Name: {order.address.streetName}</p>
                                <p>Locality: {order.address.locality}</p>
                                <p>Pincode: {order.address.pincode}</p>
                                <p>City: {order.address.city}</p>
                                <p>State: {order.address.state}</p>
                                <h4>Medicines:</h4>
                                {order.medicines.map((medicine) => (
                                    <div key={medicine.medId}>
                                        <p>Medicine ID: {medicine.medId}</p>
                                        <p>Medicine Name: {medicine.medicineName}</p>
                                        <p>Medicine Company: {medicine.medicineCompany}</p>
                                        <p>Price: {medicine.price}</p>
                                        <p>Medicine Type: {medicine.medicineType}</p>
                                        <p>Manufacturing Date: {medicine.manufacturingDate}</p>
                                        <p>Expiry Date: {medicine.expiryDate}</p>
                                    </div>
                                ))}
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyOrders