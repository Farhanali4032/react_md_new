import React from 'react';

const ApplicantForm = ({ formData, fillFormData }) => {
  return (
    <div>
      <div className='data-input'>
        <span className='fw-bold'>APPLICANT: </span>
        <span className='label'>Age: </span>
        <input
          type='text'
          className='form-control'
          style={{ width: '300px' }}
          value={formData?.familyHistory.applicant.age}
          onChange={fillFormData('familyHistory.applicant.age')}
        />
        <span className='label'> Birthdate: </span>
        <input
          type='date'
          className='form-control'
          value={formData?.familyHistory.applicant.birthdate}
          onChange={fillFormData('familyHistory.applicant.birthdate')}
        />
      </div>

      <div className='data-input'>
        <span className='label'>
          Resident in (municipality & province){' '}
        </span>
        <input
          type='text'
          className='form-control'
          style={{ width: '300px' }}
          value={formData?.familyHistory.applicant.muncipilityAndProvince}
          onChange={fillFormData(
            'familyHistory.applicant.muncipilityAndProvince'
          )}
        />
        <span className='label'> Since (date) </span>
        <input
          type='date'
          className='form-control'
          value={formData?.familyHistory.applicant.since}
          onChange={fillFormData('familyHistory.applicant.since')}
        />
      </div>

      <div className='data-input'>
        <span className='label'>
          First name on the day before the marriage date:{' '}
        </span>
        <input
          type='text'
          className='form-control'
          value={formData?.familyHistory.applicant.firstNameBeforeMarriage}
          onChange={fillFormData(
            'familyHistory.applicant.firstNameBeforeMarriage'
          )}
        />
      </div>

      <div className='data-input'>
        <span className='label'>
          Last name on the day before the marriage date:{' '}
        </span>
        <input
          type='text'
          className='form-control'
          value={formData?.familyHistory.applicant.lastNameBeforeMarriage}
          onChange={fillFormData(
            'familyHistory.applicant.lastNameBeforeMarriage'
          )}
        />
      </div>

      <div className='label'>Gender on the day before the marriage: </div>

      <div className='d-flex flex-row gap-4 pb-10px'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='applicant_gender'
            value='male'
            id='male1'
            checked={
              formData?.familyHistory.applicant.genderBeforeMarriage === 'male'
            }
            onChange={fillFormData(
              'familyHistory.applicant.genderBeforeMarriage'
            )}
          />
          <label className='form-check-label ms-1' htmlFor='male1'>
            Male
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='applicant_gender'
            value='female'
            id='female1'
            checked={
              formData?.familyHistory.applicant.genderBeforeMarriage === 'female'
            }
            onChange={fillFormData(
              'familyHistory.applicant.genderBeforeMarriage'
            )}
          />
          <label className='form-check-label ms-1' htmlFor='female1'>
            Female
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='applicant_gender'
            value='another'
            id='another1'
            checked={
              formData?.familyHistory.applicant.genderBeforeMarriage === 'another'
            }
            onChange={fillFormData(
              'familyHistory.applicant.genderBeforeMarriage'
            )}
          />
          <label className='form-check-label ms-1' htmlFor='another1'>
            Another gender
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='applicant_gender'
            value='not available'
            id='not_available1'
            checked={
              formData?.familyHistory.applicant.genderBeforeMarriage === 'not available'
            }
            onChange={fillFormData(
              'familyHistory.applicant.genderBeforeMarriage'
            )}
          />
          <label className='form-check-label ms-1' htmlFor='not_available1'>
            Gender information not available
          </label>
        </div>
      </div>

      <div className='row pb-10px'>
        <div className='d-flex flex-row gap-4'>
          <div className='label'>Divorced before? </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='divorced_before'
              value='no'
              id='no1'
              checked={
                formData?.familyHistory.applicant.isDivorcedBefore === 'no'
              }
              onChange={fillFormData(
                'familyHistory.applicant.isDivorcedBefore'
              )}
            />
            <label className='form-check-label ms-1' htmlFor='no1'>
              No
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='divorced_before'
              value='yes'
              id='yes1'
              checked={
                formData?.familyHistory.applicant.isDivorcedBefore === 'yes'
              }
              onChange={fillFormData(
                'familyHistory.applicant.isDivorcedBefore'
              )}
            />
            <label className='form-check-label ms-1' htmlFor='yes1'>
              Yes (Place and date of previous divorce)
            </label>
          </div>
        </div>
        <div className='data-input'>
          <input
            type='text'
            className='form-control'
            value={formData?.familyHistory.applicant.divorcedBeforePlace}
            onChange={fillFormData(
              'familyHistory.applicant.divorcedBeforePlace'
            )}
          />
        </div>
        {/* Separator */}
        <div className='row pb-10px ml-10px mt-30px border-top border-2 border-dark' />
      </div>
    </div>
  );
};

export default ApplicantForm;
