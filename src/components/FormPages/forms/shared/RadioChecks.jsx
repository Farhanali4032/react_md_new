import React from 'react';
import { Form } from 'react-bootstrap';

function RadioChecks({ name, id, label, value, checked, fillFormData, isBold, type, defaultPadding, labelinput, checkbox }) {
  console.log("🚀 ~ RadioChecks ~ labelinput:", labelinput)
  return (
    <Form className='mx-3'>
      <Form.Check
        type={type}
        name={name}
        id={id}
        label={<span className={`mx-1 ${isBold ? 'fw-bold small mx-0' : 'small'}`}>{label}</span>}
        value={value}
        onChange={()=>fillFormData(labelinput)}
        checked={checkbox ? checked === true : checked === value}
        className={defaultPadding ? "px-0" : "px-6"}

      />
    </Form>
  );
}

export default RadioChecks;
