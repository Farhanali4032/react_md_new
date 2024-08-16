import React from 'react'
import { Form } from 'react-bootstrap'

const BorderLessInput = ({ value, label, id, name, onChange, update, topheading, style, type, noBorder }) => {
    return (
        <>
            {type === 'textarea' ? (
                <>
                    <div className='text-center py-0'>
                        <textarea
                            className='custom-input-control border-0 input-border-bottom'
                            onChange={onChange(update)} 
                            size="sm" 
                            type={type} 
                            value={value} 
                            id={id} 
                            name={name}
                            />
                        <div className='fst-italic text-black mb-0 small'>
                            {label}
                        </div>
                    </div>
                </>
            ) : (
                <Form.Group controlId="exampleForm.ControlTextarea1" className='text-center py-0' style={style}>
                    {topheading ?
                        <div className='text-start'>
                            <Form.Label className='fst-italic text-black text-start px-2 small mb-0'>{label}</Form.Label>
                        </div> : null}
                    <Form.Control className={topheading || noBorder ? 'form-control  border-black shadow-none border-0 small pt-0' : 'form-control  border-black shadow-none border-0 border-bottom small pt-0'} onChange={onChange(update)} size="sm" type={type} value={value} id={id} name={name} style={{ textAlign: "left", direction: "ltr" }} />
                    {label && !topheading ? <Form.Label className='fst-italic text-black mb-0 small'>{label}</Form.Label> : null}
                </Form.Group>
            )}
        </>
    )
}

export default BorderLessInput
