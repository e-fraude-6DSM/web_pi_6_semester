import React from 'react';
import './Input.css';

const Input = ({ label, type, placeholder, value, onChange}) => {
    return (
        <div>
        <label className="label" >{label}</label>
        <input
            type={type}
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        </div>
    );
}

export default Input;
