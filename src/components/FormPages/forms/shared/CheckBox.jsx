import React from 'react';
import { Form } from 'react-bootstrap';

function CheckBox({ name, id, label, value, checked, fillFormData, isBold, type, defaultPadding, labelinput, checkbox, inline }) {
    
    const inlineCheck = () => {
        return (
            <input
                    className='form-check-input'
                    type={type}
                    id={id}
                    value={value}
                    onChange={fillFormData(labelinput)}
                    checked={checked}
                />
        )
    }
    return (
        <>
        {inline ? (
            <>
            {inlineCheck()}
            </>
        ): (
            <div className='mx-3'>
            <div class="px-6 form-check">
                <input
                    className='form-check-input'
                    name={name}
                    type={type}
                    id={id}
                    value={value}
                    onChange={fillFormData(labelinput)}
                    checked={checked}
                />
                {label && (
                    <span className={`mx-1 ${isBold ? 'fw-bold mx-0' : ''}`}>{label}</span>
                )}
            </div>
        </div>
        )}
        
        </>
        
    );
}

export default CheckBox;
