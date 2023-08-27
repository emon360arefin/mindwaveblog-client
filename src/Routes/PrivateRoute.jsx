import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Shared/Loader/Loader';
import { AuthContext } from '../Components/Authprovider/Authprovider';

const PrivateRoute = ({ children }) => {

    const location = useLocation()

    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <Loader></Loader>
    }

    if (user) {
        return children
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};

export default PrivateRoute;