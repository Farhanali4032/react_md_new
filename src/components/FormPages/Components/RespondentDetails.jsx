import React, { useState } from "react";

const RespondentDetails = ({
    respondent,
    lawyer
}) => {

    return (
        <div className='row pb-20px pl-40px'>
        <div className='col-6'>
          <div className='fw-bolder'>Respondent(s)</div>
          <div className='data-group inputs'>
            <div className='data-input'>
              <div className='label'>Full legal name:</div>
              <input
                type='text'
                className='form-control'
                value={respondent?.fullLegalName}
                // onChange={fillFormData('respondent.fullLegalName')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Address:</div>
              <input
                type='text'
                className='form-control'
                value={respondent?.address}
                // onChange={fillFormData('respondent.address')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Phone & fax:</div>
              <input
                type='text'
                className='form-control'
                value={respondent?.phoneAndFax}
                // onChange={fillFormData('respondent.phoneAndFax')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Email:</div>
              <input
                type='text'
                className='form-control'
                value={respondent?.email}
                // onChange={fillFormData('respondent.email')}
              />
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='fw-bolder'>Respondent(s) Lawyer</div>
          <div className='data-group inputs'>
            <div className='data-input'>
              <div className='label'>Full legal name:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.fullLegalName}
                // onChange={fillFormData('respondentsLawyer.fullLegalName')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Address:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.address}
                // onChange={fillFormData('respondentsLawyer.address')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Phone & fax:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.phoneAndFax}
                // onChange={fillFormData('respondentsLawyer.phoneAndFax')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Email:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.email}
                // onChange={fillFormData('respondentsLawyer.email')}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default RespondentDetails;
