import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Table } from 'reactstrap'
import ProceedToPayment from '../payments/ProceedToPayment';

const Cart = () => {

    let navigate = useNavigate();
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart); //for debigging purpose
    } catch (err) {
        console.log(err);
        toast.warning("Your cart is empty")
        navigate("/")
    }

    const removeOneItemAtTime = (index) => {
        if (index > -1) {
            cart.splice(index, 1);
        }
        return cart
    }

    const removeItemFromCart = (index) => {
        removeOneItemAtTime(index);
        // console.log(cart); // for debugging purpose
        localStorage.setItem("cart", []);
        localStorage.setItem("cart", JSON.stringify(cart))
        setTotalPrice(calculateTotalPrice());
        toast.warning("Item is removed!")
        navigate("/customer/cart")
    }

    const repeatItemFromCart = (index) => {
        cart.push(cart[index])
        // console.log(cart); //for debugging 
        localStorage.setItem("cart", []);
        localStorage.setItem("cart", JSON.stringify(cart))
        navigate("/customer/cart")
        toast.success("Item is added")
        setTotalPrice(calculateTotalPrice());
    }

    //remove all items
    const removeAllItems = () => {
        toast.warning("Items is removed!");
        localStorage.setItem("cart", []);
        navigate("/")
    }

    //calculate Total
    // let totalPrice = 200; //for debugging purpose

    const [totalPrice, setTotalPrice] = useState(0);


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach(items => {
            let price = parseInt(items.price);
            totalPrice += price;
        })
        return totalPrice;
    }

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [])

    const selectAddress = () => {
        navigate("/customer/delivery-address", { state: totalPrice })
    }

    return (
        <>
            <Container>
                {
                    cart.length === 0 ? (
                        <>
                            <h2 className='text-center'>Opps! Your cart is empty.</h2>
                        </>
                    ) : (
                        <>
                            <h1 className="text-center">Cart</h1>
                            <Table responsive bordered hover striped className='text-center'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Medicine Name</th>
                                        <th scope="col">Medicine's Company Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart && (
                                            Object.keys(cart).map((key, i) => (
                                                <tr key={i}>
                                                    <th scope="row">{++i}</th>
                                                    <td>{cart[key].medicineName}</td>
                                                    <td>{cart[key].medicineCompany}</td>
                                                    <td>₹{cart[key].price}</td>
                                                    <td><button className='btn btn-info' onClick={() => removeItemFromCart(key)}>Remove Item</button>
                                                        <button className='btn btn-info mx-3' onClick={() => repeatItemFromCart(key)}>Repeat Item</button></td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </Table>
                            <div className="float-right" >
                                <h5>
                                    Total Price : {totalPrice}
                                </h5>
                            </div>
                            <div className="float-right">
                                <a type="btn" className="btn btn-danger mx-1" onClick={() => removeAllItems()} >Remove all medicine</a>
                                {/* <Link type="btn" className="btn btn-primary mx-1" state={totalPrice} to={"/customer/payments"} onClick={proceedToPayment} >Procceed to Payment</Link> */}
                                <Link type="btn" className="btn btn-primary mx-1" state={totalPrice} to={"/customer/delivery-address"} onClick={selectAddress} >Select Address to Delivery</Link>
                            </div>
                        </>
                    )
                }
            </Container>
            <ToastContainer />
        </>
    )
}

export default Cart