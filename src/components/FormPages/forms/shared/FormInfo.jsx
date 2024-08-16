import React from 'react'

const FormInfo = ({ number, format, type,formcheck }) => {
    return (
        <>
            <div className='text-end'>
                <h6 className='mt-2 small mb-0' style={{ fontWeight: 800 }}>{formcheck?"":"Form"} {number}: {format} {type && `(${type})`}</h6>
            </div>
        </>
    )
}

export default FormInfo