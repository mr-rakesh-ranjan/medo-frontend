import React, { useEffect, useState } from 'react'
import { CardBody, CardTitle, CardSubtitle, CardText, Container, Card, Row, Col } from 'reactstrap'
import baseURL from '../../apis/apiCon'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { isLoggedIn } from '../../auth'
const Medicines = () => {
    const [medicine, setMedicine] = useState([]);

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

    const addToCartHandler = (i) => {
        // alert(JSON.stringify(medicine[i])); //for debugging purpose
        let localCart = localStorage.getItem("cart");
        let cart = [];
        if(localCart.length === 0){
            cart.push(medicine[i]);
            localStorage.setItem("cart", JSON.stringify(cart) );
        } else {
            let temp = JSON.parse(localCart);
            temp.forEach(element => {
                cart.push(element)
            });
            cart.push(medicine[i]);
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart); //for debugging purpose
        }
        toast("Item is added");
    }

    return (
        <>
            <Container className="text-center">
                <Row>
                    {
                        Object.keys(medicine).map((key, i) => (
                            <Col sm={3} >
                                <Card className="m-3"
                                    color="danger"
                                    outline
                                    style={{
                                        width: '18rem'
                                    }}
                                >
                                    <CardBody key={i}>
                                        <CardTitle>
                                            {medicine[key].medicineName}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            {medicine[key].medicineCompany}
                                        </CardSubtitle>
                                        <CardText>
                                            <strong>Price : ₹ {medicine[key].price}</strong><br />
                                            Medicine Type : {medicine[key].medicineType}<br />
                                            Manufacturing Date : {medicine[key].manufacturingDate}<br />
                                            Expiry Date : {medicine[key].expiryDate}
                                        </CardText>
                                        {
                                            isLoggedIn() ? (
                                                <button type='button' className="btn btn-primary" onClick={() => addToCartHandler(key)}>
                                            Add to Cart
                                        </button>
                                            ) : (
                                                <>

                                                </>
                                            )
                                        }

                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
}

export default Medicines