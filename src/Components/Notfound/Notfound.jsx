import React from 'react';

import { Link } from 'react-router-dom';
import Button from '../Shared/Button/Button';

const NotFound = () => {
    return (
        <div className='h-screen flex flex-col gap-12 justify-center items-center'>
            <img className='w-full md:w-1/2' src="/notfound.svg" alt="" />

            <Link to='/'>
                <Button width='w-44'>Back To Home</Button>
            </Link>

        </div>
    );
};

export default NotFound;