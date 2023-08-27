import React from 'react';

const Button = (props) => {

    const height = props.height || "h-8"

    return (
        <button className={`flex justify-center items-center rounded-full bg-theme-primary text-white text-sm ${props.width} ${height}`}>
            {props.children}
        </button>
    );
};

export default Button;