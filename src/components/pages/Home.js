import React from 'react'
import Medicines from '../medicine/Medicines'
import CarouselLoader from '../layout/Carousel'

const Home = () => {
    return (
        <>
            <CarouselLoader className="mt-3" />
            <Medicines/>

            {/* <div>this is home page</div> */}
        </>
    )
}

export default Home