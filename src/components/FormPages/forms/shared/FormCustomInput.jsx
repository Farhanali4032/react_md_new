import React from 'react';
import { Form } from 'react-bootstrap';

function FormCustomInput({ name, id, label, value, checked, fillFormData, isBold, type, defaultPadding, update, checkbox, col, marginRight, small }) {


    return (

        <>
            <input
                id={id}
                type={type}
                className={`custom-input-control ${small ? 'input-small' : ''}` }
                onChange={fillFormData(update)}
                value={value}
            />
        </>

    );
}

export default FormCustomInput;
