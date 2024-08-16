import React from 'react'
import { Form } from 'react-bootstrap'

const BorderedInput = ({ value, label, id, name, onChange, update, topheading, style }) => {
    return (
        <>
            <Form.Group controlId="exampleForm.ControlTextarea1" className='text-center' style={style}>
                {topheading ?
                    <div className='text-start'>
                        <Form.Label className='fst-italic text-black text-start'>{label}</Form.Label>
                    </div> : null}
                <Form.Control className='form-control  border-black shadow-none' onChange={onChange(update)} size="sm" type="text" value={value} id={id} name={name} />
                {label && !topheading ? <Form.Label className='fst-italic text-black'>{label}</Form.Label> : null}
            </Form.Group>

        </>
    )
}

export default BorderedInput