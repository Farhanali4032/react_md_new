import React from 'react';
import { Form } from 'react-bootstrap';

function DynamicTextArea({ heading, rows, fillFormData, updates, value }) {
  return (
    <div>
      <Form.Group controlId="adultryDetails" style={{ width: "100%" }}>
        <Form.Label>{heading}</Form.Label>
        <Form.Control
          as="textarea"
          className="form-control"
          rows={rows}
          value={value}
          onChange={fillFormData(updates)}
        />
      </Form.Group>
    </div>

  );
}

export default DynamicTextArea;
