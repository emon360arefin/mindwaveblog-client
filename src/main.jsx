import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    RouterProvider,
} from "react-router-dom";

import router from './Routes/Routes.jsx';
import AuthProvider from './Components/Authprovider/Authprovider';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <AuthProvider>
            <Toaster />
            <RouterProvider router={router} />
        </AuthProvider>

    </React.StrictMode>,
)
