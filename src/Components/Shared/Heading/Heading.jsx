import React from 'react';

const Heading = (props) => {
    const { heading, subheading } = props
    return (
        <div>
            <h2 className='text-4xl text-center md:text-4xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary'>{heading}</h2>

            <h2 className='text-xl text-center text-slate-600 my-6 leading-snug'>{subheading}</h2>
        </div>
    );
};

export default Heading;