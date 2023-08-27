import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Authprovider/Authprovider';

const Footer = () => {

    const { user } = useContext(AuthContext);

    let items = [
        { "id": 1, "name": "Publish Your First Blog", "path": "/write" }
    ]


    return (
        <div className='bg-theme-accent py-16 z-40'>
            <div className='max-w-7xl mx-auto px-2'>
                <div className='  grid md:grid-cols-6 grid-col-1  gap-6'>
                    <div className='col-span-2 pr-6 pl-12 md:pl-0'>
                        <img src="/logo-1.svg" className='md:h-12 h-12' alt="" />
                        <p className='text-slate-500 my-6'>"Welcome to a culinary haven where flavors collide, techniques inspire, and creativity flourishes!"</p>
                        <div className='flex gap-4'>
                            <div className='bg-white rounded-full w-10 h-10 p-2'>
                                <button><img className=' ' src="/social1.png" alt="" /></button>
                            </div>
                            <div className='bg-white rounded-full w-10 h-10 p-2'>
                                <button><img className=' ' src="/social2.png" alt="" /></button>
                            </div>
                            <div className='bg-white rounded-full w-10 h-10 p-2'>
                                <button><img className=' ' src="/social3.png" alt="" /></button>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-1 pl-12 md:pl-0'>
                        <h2 className='text-slate-600 text-lg font-semibold'>Menu</h2>
                        <ul className='flex flex-col items-start gap-3 mt-6 w-full md:w-auto'>
                            {
                                items.map(item => <NavLink className={'text-sm font-semibold text-slate-500'} key={item.id} to={item.path}>{item.name}</NavLink>)
                            }
                        </ul>

                    </div>
                    <div className='col-span-1 pl-12 md:pl-0'>
                        <h2 className='text-slate-600 text-lg font-semibold'>Category</h2>
                        <div className='flex flex-col items-start gap-3 mt-6'>
                            <button className='text-slate-500 font-semibold  text-sm'>Technology</button>
                            <button className='text-slate-500 font-semibold text-sm'>Life Style</button>
                            <button className='text-slate-500 font-semibold text-sm'>Science</button>
                            <button className='text-slate-500 font-semibold text-sm'>Arts</button>
                            

                        </div>

                    </div><div className='col-span-1 pl-12 md:pl-0'>
                        <h2 className='text-slate-600 text-lg font-semibold'>Info</h2>
                        <div className='flex flex-col items-start gap-3 mt-6'>
                            <button className='text-slate-500 font-semibold  text-sm'>About</button>
                            <button className='text-slate-500 font-semibold text-sm'>Team</button>
                            <button className='text-slate-500 font-semibold text-sm'>Career</button>
                            <button className='text-slate-500 font-semibold text-sm text-start'>Membership</button>
                        </div>

                    </div><div className='col-span-1 pl-12 md:pl-0'>
                        <h2 className='text-slate-600 text-lg font-semibold'>Contact Us</h2>
                        <div className='flex flex-col items-start gap-3 mt-6'>
                            <button className='text-slate-500 font-semibold  text-sm'>Phone: +12345678</button>
                            <button className='text-slate-500 font-semibold text-start text-sm whitespace-normal'>Location: Rocky Beach, Santa Monica</button>
                            <button className='text-slate-500 font-semibold text-start text-sm'>Email: mindwave@domain.com</button>

                        </div>

                    </div>


                </div>
                <p className='text-center text-slate-400 text-sm pt-8 mt-6 border-t border-slate-300'>@2023 Emon Arefin. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;