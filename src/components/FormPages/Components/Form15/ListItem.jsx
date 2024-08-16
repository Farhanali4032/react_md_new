import React from 'react';

const ListItem15 = ({ text, showInput, fillFormData,labelinput,bold,value, type = 'text' }) => (

    <div className={`d-flex flex-column flex-md-row gap-3 ps-3 ${bold ? 'fw-bold' : ''}`}>
        {showInput ? (
            <>
                <div className='data-input flex-grow-1'>
                    <span className='label'>{text}</span>
                </div>
                <div className='w-100'>
                    <div className='data-input mt-2'>
                        <input
                            type={type}
                            value={value}
                            className='form-control small'
                            onChange={fillFormData(labelinput)}
                        />
                    </div>
                </div>
            </>
        ) : (
            <div>
                <span className='label '> {text}{' '}</span>
            </div>
        )}
    </div>
);

export default ListItem15;
