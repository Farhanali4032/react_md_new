import React, { useState } from "react";

const FormDetails = ({
    formTitle,
    courtName,
    courtFileNumber,
    courtOfficeAddress,
    applicationType,
    selectOptions,
}) => {
    // 
    // 
    // 
    // 
    return (
        <div className='row '>
            <div className='col-9'>
                <div className='row justify-content-end'>
                    <div className='col-11'>
                        <div className='form-group align-items-center'>
                            <input
                                type='text'
                                className='form-control'
                                id='at'
                                name='at'
                                value={courtName}
                            //   onChange={fillFormData('courtName')}
                            />
                            <div className='fst-italic'>(Name of Court)</div>
                        </div>
                    </div>
                </div>
                <div className='row  justify-content-end'>
                    <div className='col-1 fw-bold mt-2' style={{ paddingLeft: '40px' }}>
                        at
                    </div>
                    <div className='col-11'>
                        <div className='form-group align-items-center'>
                            <input
                                type='text'
                                className='form-control'
                                id='at'
                                name='at'
                                value={courtOfficeAddress}
                            //   onChange={fillFormData('courtOfficeAddress')}
                            />
                            <div className='fst-italic'>Court Office Address</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='form-group' style={{ marginTop: '-25px' }}>
                            <span className='text-nowrap'>Court File Number</span>
                            <input
                                type='text'
                                className='form-control'
                                id='at'
                                name='at'
                                value={courtFileNumber}
                            //   onChange={fillFormData('courtFileNumber')}
                            />
                        </div>
                        <div
                            className='fw-bolder text-end'
                            style={{ marginTop: '-15px' }}
                        >
                            {formTitle}
                        </div>
                        {selectOptions === true && (
                        <div className='row pb-10px ml-30px'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    name='divorce_type'
                                    value='simple'
                                    id='simple'
                                    // onChange={fillFormData('applicationType')}
                                    checked={applicationType === 'simple'}
                                />
                                <label className='form-check-label' htmlFor='simple'>
                                    Simple (divorce only)
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    name='divorce_type'
                                    value='joint'
                                    id='joint'
                                    // onChange={fillFormData('applicationType')}
                                    checked={applicationType === 'joint'}
                                />
                                <label className='form-check-label' htmlFor='joint'>
                                    Joint
                                </label>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;
