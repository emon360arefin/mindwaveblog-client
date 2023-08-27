import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { TbFidgetSpinner } from 'react-icons/tb';
import toast from 'react-hot-toast'
import { saveUser } from '../../api/auth';
import { useEffect } from 'react';
import { AuthContext } from '../../Components/Authprovider/Authprovider';

const Register = () => {

    const {
        createUser,
        updateUser,
        googleSignIn,
        gitSignIn,
        loading,
        setLoading, } = useContext(AuthContext)

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [hidden, setHidden] = useState(true)
    const [proimg, setProimg] = useState(null)


    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    // Image Upload
    const imgUpload = (event) => {

        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // Creating user
                const imgURL = imgData.data.display_url;
                console.log(imgURL);
                setProimg(imgURL)

            })
            .catch(error => {
                toast.error(err.message)
            })
    }


    // Handle Form

    const handleSubmitForm = (event) => {
        event.preventDefault()
        setError(null)
        setSuccess(null)


        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Image Upload
        const image = event.target.image.files[0];
        const formData = new FormData();
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // Creating user
                const imgURL = imgData.data.display_url;

                createUser(email, password)
                    .then(result => {
                        console.log(result.user);
                        event.target.reset()

                        // Update user
                        updateUser(name, imgURL)
                            .then(() => {
                                setSuccess("User account has been created successfully")
                                toast.success("Resigter successful")

                                // Save user 
                                saveUser(result.user)
                                navigate(from, { replace: true })
                            })
                            .catch(error => {
                                setError(error.message)
                                toast.error(error.message)
                                setLoading(false)
                            })

                    })
                    .catch(error => {

                        setError(error.message)
                        toast.error(error.message)
                        setLoading(false)
                    })

            })


        if (password.length < 6) {
            setError("Password has to be at least 6 characters");
            return
        }


    }

    const handleGooglSignIn = () => {
        googleSignIn()
            .then(result => {
                setSuccess('User account has been created successfully');
                toast.success("You've signed up successfully")
                saveUser(result.user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message)
                toast.error(error.message)
                setLoading(false)
            })
    }




    return (
        <div className='bg-theme-accent py-6 md:py-16'>
            <div className='px-2 max-w-7xl mx-auto'>
                <div className=" flex flex-col md:flex-row gap-8 md:gap-28 justify-center items-center">

                    <div >
                        <img src="/signup-1.svg" alt="" />
                    </div>



                    <div className="w-full md:w-7/12 rounded-md flex-shrink-0 pb-6 h-min  max-w-lg shadow-md bg-white ml-auto">

                        <form onSubmit={handleSubmitForm} className="p-6 flex flex-col gap-4">


                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="Enter your name"
                                    className="border px-4 py-2 rounded-full focus:outline-none bg-blue-white"
                                    required />
                            </div>

                            {/* File Upload  */}
                            <div className='flex gap-4 mt-2'>

                                <label htmlFor='image' className=' flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-50 cursor-pointer'>
                                    Select Your Profile Picture
                                </label>
                                <input
                                    required
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                    className='sr-only'
                                    onChange={imgUpload}
                                />

                                {
                                    proimg && proimg ? <div className='h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 overflow-hidden'>
                                        <img className='w-auto h-full' src={proimg} alt="" />
                                    </div> :

                                        <div className='w-10 h-10'> <FaUserCircle className='text-[40px] text-slate-500'></FaUserCircle> </div>
                                }

                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    className="border px-4 py-2 rounded-full focus:outline-none bg-blue-white"
                                    required />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center gap-4 border rounded-full pr-2'>
                                    <input
                                        type={hidden ? 'password' : 'text'}
                                        name='password'
                                        placeholder="Enter password"
                                        className=" px-4 py-2 rounded-full w-full focus:outline-none bg-blue-white"
                                        required />

                                    <div onClick={() => setHidden(!hidden)}>
                                        {
                                            hidden ? <AiFillEyeInvisible className='cursor-pointer text-2xl hover:text-theme-secondary'></AiFillEyeInvisible> :
                                                <AiFillEye className='cursor-pointer text-2xl hover:text-theme-secondary'></AiFillEye>
                                        }
                                    </div>
                                </div>

                            </div>




                            {/* Button */}
                            <div className=" mt-2">
                                <button className="bg-theme-primary hover:bg-theme-secondary text-white text-xl py-2 px-auto rounded-full w-full transition-all duration-150 ease-in-out flex justify-center items-center h-10">
                                    {
                                        loading ? <TbFidgetSpinner className=' animate-spin' /> : "Register"
                                    }

                                </button>
                            </div>



                            {/* Already */}

                            <label className="label">
                                <h2>Already have an account? Please <span className='text-theme-secondary'> <Link to='/login'>Login</Link>  </span></h2>
                            </label>

                        </form>
                        <div className=' px-6 '>
                            <p className='text-red-400 text-center'>{error}</p>
                            <p className='text-green-400 text-center'>{success}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;