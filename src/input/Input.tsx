import React from 'react';
import './Input.css';

interface Props {
    searchValue: string;
    onValueChange: (value: string) => void
}

export default function Input({searchValue, onValueChange}: Props) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // might be addded throttling
        onValueChange(value);
    }

    return (
        <div className='inputWrapper'>
            <input
                className='input'
                type="text"
                placeholder='Search for your favorite drink'
                value={searchValue}
                onChange={onChange}
            />
        </div>
    )
}