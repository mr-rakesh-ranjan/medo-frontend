import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../css/Thankyou.css'

const PaymentSuccess = () => {

    const location = useLocation();
    console.log(location.state.pPaymentMethod);

    //go Home
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/")
    }
    return (
        <>
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        
                        <h1>Thank you !</h1>
                        <p>Your Order is placed!!</p>
                        {
                            location.state.pPaymentMethod === "Cash" ? (
                                <>
                                    <p><strong>Your payment method is Cash.</strong></p>
                                    <p><strong>Total payable amount : </strong> {location.state.pTotalPrice}</p>
                                </>
                            ) : (
                                <p> this is not cash</p>
                            )
                        }
                        <p>Your medicine is deliverd with in 2 hours.</p>
                        <button className="go-home" onClick={() => goHome()}>
                            go home
                        </button>
                    </div>
                    <div className="footer-like">
                        <p>
                            
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess