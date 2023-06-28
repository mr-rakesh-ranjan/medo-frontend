import React from 'react'
import Medicines from '../medicine/Medicines'
import CarouselLoader from '../layout/Carousel'

const Home = () => {
    return (
        <>
            <CarouselLoader className="mt-3 text-center" />
            <Medicines/>
        </>
    )
}

export default Home