import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from "react-router-dom";

const Home = () => {
    return <Hero>
        <Banner title="Luxurious rooms" subtitle="delux rooms starting at R2000">
            <Link to='/rooms' className="btn-primary">
                our rooms
            </Link>
        </Banner>
    </Hero>;

};

export default Home;