import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import NotFound from "../Components/Notfound/Notfound";
import Blogpost from "../Pages/Home/Homeblog/Blogpost";
import Blog from "../Pages/Blog/Blog";
import PrivateRoute from "./PrivateRoute";
import Write from "../Pages/Write/Write";
import About from "../Pages/About/About";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blogpost/:id',
                element: <Blogpost></Blogpost>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/write',
                element: <PrivateRoute><Write></Write></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
]);



export default router