import React from 'react'
import { Form } from 'react-bootstrap'
import BorderLessInput from './BorderLessInput'

const InputLoop = ({ fillFormData, noBorder, inputBorderless, loopAmount }) => {



    const borderlessinputs = () => {
        return (
            <>
                {
                    Array.from({ length: loopAmount }).map((_, index) => (
                        <BorderLessInput
                            key={index}
                            type="text"
                            fileno
                            onChange={fillFormData}
                            update={`item10.carried_out_details.line${index + 1}`}
                            value={""}
                            style={{ padding: "6px 0" }}
                        />
                    ))}
            </>)
    }


    return (
        <>
            {inputBorderless && (
                { borderlessinputs }
            )}
        </>
        // <>
        //     <Form.Group controlId="exampleForm.ControlTextarea1" className='text-center py-0' style={style}>
        //         {topheading ?
        //             <div className='text-start'>
        //                 <Form.Label className='fst-italic text-black text-start px-2 small mb-0'>{label}</Form.Label>
        //             </div> : null}
        //         <Form.Control className={topheading || noBorder ? 'form-control  border-black shadow-none border-0 small pt-0' : 'form-control  border-black shadow-none border-0 border-bottom small pt-0'} onChange={onChange(update)} size="sm" type={type} value={value} id={id} name={name} style={{ textAlign: "left", direction: "ltr" }} />
        //         {label && !topheading ? <Form.Label className='fst-italic text-black mb-0 small'>{label}</Form.Label> : null}
        //     </Form.Group>

        // </>
    )
}

export default InputLoop
