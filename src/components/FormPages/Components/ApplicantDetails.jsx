import React, { useState } from "react";

const ApplicantDetails = ({
    applicant,
    lawyer
}) => {

    return (
        <div className='row pb-20px pl-40px'>
        <div className='col-6'>
          <div className='fw-bolder'>Applicant(s)</div>
          <div className='data-group inputs'>
            <div className='data-input'>
              <div className='label'>Full legal name:</div>
              <input
                type='text'
                className='form-control'
                value={applicant?.fullLegalName}
                // onChange={fillFormData('applicant?.fullLegalName')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Address:</div>
              <input
                type='text'
                className='form-control'
                value={applicant?.address}
                // onChange={fillFormData('applicant?.address')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Phone & fax:</div>
              <input
                type='text'
                className='form-control'
                value={applicant?.phoneAndFax}
                // onChange={fillFormData('applicant?.phoneAndFax')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Email:</div>
              <input
                type='text'
                className='form-control'
                value={applicant?.email}
                // onChange={fillFormData('applicant?.email')}
              />
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='fw-bolder'>Applicant(s) Lawyer</div>
          <div className='data-group inputs'>
            <div className='data-input'>
              <div className='label'>Full legal name:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.fullLegalName}
                // onChange={fillFormData('applicantsLawyer.fullLegalName')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Address:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.address}
                // onChange={fillFormData('applicantsLawyer.address')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Phone & fax:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.phoneAndFax}
                // onChange={fillFormData('applicantsLawyer.phoneAndFax')}
              />
            </div>
            <div className='data-input'>
              <div className='label'>Email:</div>
              <input
                type='text'
                className='form-control'
                value={lawyer?.email}
                // onChange={fillFormData('applicantsLawyer.email')}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default ApplicantDetails;
