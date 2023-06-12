import React from 'react'

const Contact = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="card p-3 m-2 w-50">
                            <h2 className="text-center">Contact Us</h2>
                            <div className="form-group pb-3">
                                <label htmlFor="name" hidden>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" />
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="email" hidden>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email" />
                            </div>
                            <div className="form-group pb-3">
                                <label htmlFor="message" hidden>Message</label>
                                <textarea className="form-control" id="message" rows="3" placeholder="Enter Message"></textarea>
                            </div>
                            <div className="form-group ">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact