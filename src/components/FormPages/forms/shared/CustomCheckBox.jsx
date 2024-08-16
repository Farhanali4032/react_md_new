import React from 'react';
import { Form } from 'react-bootstrap';

function CustomCheckBox({ name, id, label, value, checked, fillFormData, isBold, type, defaultPadding, labelinput, checkbox, col, marginRight, noWrap }) {


    const withCol = () => {
        return (
            <>
                <div className='col-md-6'>
                    <div class="px-6 form-check">
                        <input
                            className='form-check-input'
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
            </>
        )
    }

    return (
        <>
            {noWrap && (
                <>
                    <input
                        className='form-check-input'
                        type={type}
                        id={id}
                        value={value}
                        onChange={fillFormData(labelinput)}
                        checked={checked}
                    />
                </>
            )}
            {col ? (
                <div class={`px-6 form-check ${marginRight ? 'mx-3' : ''}`}>
                    <input
                        className='form-check-input'
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
            ) : noWrap && !col ? (
                <input
                    className='form-check-input'
                    type={type}
                    id={id}
                    value={value}
                    onChange={fillFormData(labelinput)}
                    checked={checked}
                />
            ) : (
                <>
                    {withCol()}
                </>
            )}

        </>

    );
}

export default CustomCheckBox;
