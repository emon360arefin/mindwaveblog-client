import React from 'react';
import Header2 from '../Shared/Header/Header2';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';

const Layout = () => {
    return (
        <div>
            <Header2></Header2>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;