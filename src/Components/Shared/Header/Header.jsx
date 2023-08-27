import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { SlMagnifier } from 'react-icons/sl';
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => {

    const items = [
        { "id": 1, "name": "Writer", "path": "/writer" },
        { "id": 2, "name": "Category", "path": "/category" },
        { "id": 3, "name": "Become A Seller", "path": "/become-a-seller" }
    ];

    const [onFocus, setOnFocus] = useState(false)




    return (
        <div className='bg-red-200 py-2 '>
            <div className='max-w-7xl mx-auto px-2 bg-white flex justify-between'>

                {/* Left Column */}

                <div className=' w-1/6  md:w-6/12 flex justify-start items-center gap-8 '>


                    <div className='flex items-center gap-2 w-full md:w-[15%] '>
                        {/* Hamburger */}
                        <div className='md:hidden'>
                            <FiMenu className='text-2xl text-theme-primary '></FiMenu>
                        </div>

                        <Link to='/'>
                            <img className='w-full hidden md:block' src="/logo-1.svg" alt="" /></Link>

                        <img className='w-2/3 block md:hidden' src="/favicon-1.svg" alt="" />



                    </div>

                    <div className='hidden md:block '>
                        <ul className='flex gap-4'>
                            {
                                items && items.map(item => <NavLink className="text-lg">{item.name}</NavLink>)
                            }
                        </ul>
                    </div>



                </div>



                {/* Right Column */}

                <div className='w-5/6 md:w-6/12 flex justify-end items-center pl-8'>
                    <div className='flex  justify-end items-center gap-5   w-full h-full'>


                        {/* Form For Desktop */}
                        {/* <form className={`hidden md:flex justify-center items-center  border bg-white overflow-hidden rounded-md cursor-pointer absolute md:static left-0 transition-all ease-in-out  duration-700 `}>

                            <input
                                type="text"
                                placeholder="Type here"
                                onFocus={() => setOnFocus(true)}
                                onBlur={() => setOnFocus(false)}
                                className={` h-[45px] pl-6 max-w-md border-r  font-normal rounded-l-md transition-all ease-in-out  duration-700  ${onFocus ? "outline-0 w-full md:w-[400px]  " : "w-[150px]"}`} />

                            
                            <button

                                className='w-12 h-[45px] flex justify-center hover:bg-theme-primary'>
                                <SlMagnifier className='h-full w-full hover:text-white text-xl px-1 md:px-3 '></SlMagnifier>
                            </button>
                        </form> */}

                        {/* Form For Mobile */}
                        {/* <div className='relative  w-full h-full md:hidden flex items-center'>


                            <form className={`flex justify-start items-center border overflow-hidden rounded-md cursor-pointer absolute md:static left-0 transition-all ease-in-out duration-700 md:hidden bg-red-300 w-full`}>

                                <input
                                    type="text"
                                    placeholder="Type here"
                                    onFocus={() => setOnFocus(true)}
                                    onBlur={() => setOnFocus(false)}
                                    className={` h-[45px] pl-6 max-w-xs border-r  font-normal rounded-l-md transition-all ease-in-out  duration-700 w-5/6 ${onFocus ? "outline-0 " : "outline-0 "}`} />

                                
                                <button

                                    className='w-1/6 h-[45px] flex justify-center items-center hover:bg-theme-primary hover:text-white'>
                                    <SlMagnifier className=' w-full  text-xl px-3 '></SlMagnifier>
                                </button>
                            </form>

                        </div> */}

                        <div className='text-4xl text-theme-primary flex gap-4'>


                            <Button width='w-32'>Get Started</Button>

                        </div>

                    </div>


                </div>

            </div>
        </div >
    );
};

export default Header;