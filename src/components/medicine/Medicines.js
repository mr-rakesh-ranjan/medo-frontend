import React, { useEffect, useState } from 'react'
import { CardBody, CardTitle, CardSubtitle, CardText, Button, Container, Card, Row, Col } from 'reactstrap'
import baseURL from '../../apis/apiCon'
import axios from 'axios'
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

    return (
        <>
            <Container className="text-center">
                <Row>
                    {
                        Object.keys(medicine).map((key, i) => (
                            <Col sm={3} key={i}>
                                <Card className="m-3"
                                    color="danger"
                                    outline
                                    style={{
                                        width: '18rem'
                                    }}
                                >
                                    <CardBody>
                                        <CardTitle>
                                            {medicine[key].medicineName}
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                {medicine[key].medicineCompany}
                                            </CardSubtitle>
                                            <CardText>
                                                <strong>Price : {medicine[key].price}</strong><br />
                                                Medicine Type : {medicine[key].medicineType}<br />
                                                Manufacturing Date : {medicine[key].manufacturingDate}<br />
                                                Expiry Date : {medicine[key].expiryDate}
                                            </CardText>
                                            <Button>
                                                Add to Cart
                                            </Button>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Medicines