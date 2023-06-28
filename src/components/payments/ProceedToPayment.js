import React, { useState } from 'react'
import QRCode from 'react-qr-code';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const ProceedToPayment = () => {

    // let totalPrice = 200;

    const location = useLocation();
    // console.log(location.state); //for debugging purpose
    let totalPrice = location.state.sTotalPrice;
    let selectedAddress = location.state.sSelectAddress
    // console.log(totalPrice); //for debugging purpose
    // console.log(selectedAddress); //for debugging purpose

    const [rSelected, setRSelected] = useState(null);

    //generating QR for QR payment
    const generateQr = () => {
        toast.success("Generating QR. Please Wait!")
    }

    const [value, setValue] = useState(totalPrice);
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);

    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("")

    const paymentMethodState = {
        pTotalPrice: totalPrice,
        pSelectedAddress: selectedAddress,
        pPaymentMethod: paymentMethod
    };

    //cash payment system
    const cashPaymentHandler = () => {
        let method = "cash";
        setPaymentMethod(...method);
        console.log(paymentMethod); //for debugging purpose
        navigate("/customer/payment-success", { state: paymentMethodState })
    }

    //change address handler

    const chnageAddressHandler = () => {
        navigate("/customer/delivery-address", totalPrice)
    }



    return (
        <>
            <div className="container p-3">
                <h2 style={{ color: '#01286b', fontWeight: 'bold' }} className="text-center">Proceeding to payment</h2>
                <Row>
                    <Col md={6}>
                        <div className="mt-3">
                            <h5 style={{ color: '#01286b', fontWeight: 'bold' }}>Select Payment Methods</h5>
                            <ButtonGroup>
                                <Button
                                    color="primary"
                                    outline
                                    onClick={() => { setRSelected(1); setPaymentMethod("Cash") }}
                                    active={rSelected === 1}
                                >
                                    Cash
                                </Button>
                                <Button
                                    color="primary"
                                    outline
                                    onClick={() => {setRSelected(2); setPaymentMethod("Card")}}
                                    active={rSelected === 2}
                                >
                                    Credit/Debit Card
                                </Button>
                                <Button
                                    color="primary"
                                    outline
                                    onClick={() => { setRSelected(3); generateQr(); setPaymentMethod("QrCode") }}
                                    active={rSelected === 3}
                                >
                                    QR Code
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className='mt-3'>
                            {
                                rSelected === 1 ? (
                                    <>
                                        <div>
                                            <h5>
                                                Your total amount for pay : {totalPrice}
                                            </h5>
                                        </div>
                                        <Link className='btn btn-primary' state={paymentMethodState} to={"/customer/payment-success"} onClick={() => cashPaymentHandler()}>Confirm</Link>
                                    </>
                                ) : rSelected === 2 ? (
                                    <>
                                        <h5>Enter card Details</h5>
                                        <Card className="m-3"
                                            color="dark"
                                            outline
                                            style={{
                                                width: '18rem'
                                            }}>
                                            <CardBody>
                                                <Form>
                                                    <Row>
                                                        <FormGroup>
                                                            <Label for="cardNumber"
                                                            >
                                                                Card Number
                                                            </Label>
                                                            <Input
                                                                placeholder="9876 8765 7654 6543" />
                                                        </FormGroup>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label for="monthYear"
                                                                >
                                                                    Month/Year
                                                                </Label>
                                                                <Input
                                                                    placeholder='09/26'
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label for="cvv"
                                                                >
                                                                    CVV
                                                                </Label>
                                                                <Input
                                                                    placeholder="898" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <FormGroup>
                                                            <Label for="nameOnCard"
                                                            >
                                                                Name on card
                                                            </Label>
                                                            <Input
                                                                placeholder="Mark Talos"
                                                            />
                                                        </FormGroup>
                                                    </Row>
                                                    <FormGroup check>
                                                        <Input
                                                            name="check"
                                                            type="checkbox"
                                                        />
                                                        <Label
                                                            check
                                                            for="termsAndConditions"
                                                        >
                                                            Agree with terms & conditions.
                                                        </Label>
                                                    </FormGroup>
                                                    <Button className="mt-3">
                                                        Pay Now
                                                    </Button>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </>
                                ) : (
                                    <>
                                        <h5>Pay now for {totalPrice}</h5>
                                        {
                                            value && (
                                                <QRCode
                                                    title="Payment QR code "
                                                    value={value}
                                                    bgColor={back}
                                                    fgColor={fore}
                                                    size={size === '' ? 0 : size}
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card className="m-3"
                            color="dark"
                            outline
                            style={{
                                width: '18rem'
                            }}
                        >
                            <CardHeader>Your Delivery Address</CardHeader>
                            <CardBody>
                                <CardText>
                                    <p><strong>Flat number:</strong> {selectedAddress.flatNo}, <strong>Street Name : </strong> {selectedAddress.streetName} <strong> Locality : </strong> {selectedAddress.locality} <strong>City : </strong> {selectedAddress.city}, <strong>Pincode : </strong> {selectedAddress.pincode} <strong> State : </strong> {selectedAddress.state}</p>
                                </CardText>
                            </CardBody>
                            <CardFooter>
                                <Link type='btn' className='btn btn-warning' state={totalPrice} to={"/customer/delivery-address"} onClick={() => chnageAddressHandler()}>Change address</Link>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </>
    )
}

export default ProceedToPayment