import React from 'react'
import RadioChecks from '../../forms/shared/RadioChecks'
import BorderLessInput from '../../forms/shared/BorderLessInput'
import { Col, Row } from 'react-bootstrap'
import { calculateAge } from '../../../../utils/matterValidations/matterValidation'
import CheckBox from '../../forms/shared/CheckBox'

const FamilyHistory = ({ formData, fillFormData, changeFormCheck }) => {
    return (
        <>


            <div className='row pb-20px '>
                <p className='sub-heading'>FAMILY HISTORY</p>
                <div>
                    <div className='data-input small'>
                        <span className='fw-bold small'>APPLICANT: </span>
                        <span className='label small'>Age: </span>
                        <input
                            type='text'
                            className='form-control small'
                            style={{ width: '300px' }}
                            value={calculateAge(formData?.applicant?.dateOfBirth)}
                            onChange={fillFormData('familyHistory.applicant.age')}
                        />
                        <span className='label small'> Birthdate: </span>
                        <input
                            type='date'
                            className='form-control small'
                            value={formData?.applicant?.dateOfBirth}
                            onChange={fillFormData('familyHistory.applicant.dateOfBirth')}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label small'>
                            Resident in (municipality & province){' '}
                        </span>
                        <input
                            type='text'
                            className='form-control small'

                            value={formData?.applicant?.municipality}
                            onChange={fillFormData(
                                'applicant.municipality'
                            )}
                        />
                        <span className='label small'> Since (date) </span>
                        <input
                            type='date'
                            className='form-control small'
                            value={formData?.applicant?.since}
                            onChange={fillFormData('familyHistory.applicant.since')}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label'>
                            First name on the day before the marriage date:{' '}
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            value={formData?.applicant?.firstNameBeforeMarriage}
                            onChange={fillFormData(
                                'applicant.firstNameBeforeMarriage'
                            )}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label'>
                            Last name on the day before the marriage date:{' '}
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            value={formData?.applicant?.lastNameBeforeMarriage}
                            onChange={fillFormData(
                                'applicant.lastNameBeforeMarriage'
                            )}
                        />
                    </div>

                    <div className='label small'>Gender on the day before the marriage: </div>

                    <div className="d-flex py-2">
                        <div>
                            <CheckBox
                                label={"Male"}
                                type={"radio"}
                                value={'male'}
                                checked={formData?.applicant?.genderBeforeMarriage === "male"}
                                fillFormData={fillFormData}
                                labelinput={"applicant.genderBeforeMarriage"}
                                checkbox={true}
                            />
                        </div>
                        <div>
                            <CheckBox
                                label={"Female"}
                                type={"radio"}
                                value={'female'}
                                checked={formData?.applicant.genderBeforeMarriage === "female"}
                                fillFormData={fillFormData}
                                labelinput={"applicant.genderBeforeMarriage"}
                                checkbox={true}
                            />
                        </div>
                        <div>
                            <CheckBox
                                label={"Another gender"}
                                type={"radio"}
                                value={'another_gender'}
                                checked={formData?.applicant.genderBeforeMarriage === "another_gender"}
                                fillFormData={fillFormData}
                                labelinput={"applicant.genderBeforeMarriage"}
                                checkbox={true}
                            />
                        </div>
                        <div>
                            <CheckBox
                                label={"Gender information not available"}
                                type={"radio"}
                                value={'no_gender'}
                                checked={formData?.applicant.genderBeforeMarriage === "no_gender"}
                                fillFormData={fillFormData}
                                labelinput={"applicant.genderBeforeMarriage"}
                                checkbox={true}
                            />
                        </div>
                    </div>



                    <div className='row pb-10px'>
                        <div className='d-flex flex-row gap-4'>
                            <div className='label small'>Divorced before? </div>


                            <div className="d-flex ">
                                <div>
                                    <CheckBox
                                        label={"No"}
                                        type={"radio"}
                                        value={'no'}
                                        checked={formData?.applicant?.isDivorcedBefore === "no"}
                                        fillFormData={fillFormData}
                                        labelinput={"applicant.isDivorcedBefore"}
                                        checkbox={true}
                                    />
                                </div>
                                <div>
                                    <CheckBox
                                        label={"Yes (Place and date of previous divorce)"}
                                        type={"radio"}
                                        value={'yes'}
                                        checked={formData?.applicant?.isDivorcedBefore === "yes"}
                                        fillFormData={fillFormData}
                                        labelinput={"applicant.isDivorcedBefore"}
                                        checkbox={true}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className='data-input small'>
                            <div style={{ width: "100%" }}>
                                <BorderLessInput
                                    fileno
                                    onChange={fillFormData}
                                    update={'familyHistory.applicant.divorcedBeforePlace'}
                                    value={formData?.applicant?.divorcedBeforePlace}
                                    style={{ padding: "6px 0" }}
                                    type={"text"}
                                />
                            </div>

                            <div className='row pb-10px ml-10px mt-30px border-top border-2 border-dark' />
                        </div>


                    </div>
                </div>

                {/* Respondent */}
                <div>
                    <div className='data-input small'>
                        <span className='fw-bold text-nowrap small'>
                            RESPONDENT/JOINT APPLICATION:{' '}
                        </span>
                        <span className='label small'>Age: </span>
                        <input
                            type='text'
                            className='form-control small'
                            style={{ width: '300px' }}
                            value={calculateAge(formData?.respondent.dateOfBirth)}
                            onChange={fillFormData('familyHistory.respondent.age')}
                        />
                        <span className='label small'> Birthdate: </span>
                        <input
                            type='date'
                            className='form-control small'
                            value={formData?.respondent?.dateOfBirth}
                            onChange={fillFormData('familyHistory.respondent.birthdate')}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label small'>
                            Resident in (municipality & province){' '}
                        </span>
                        <input
                            type='text'
                            className='form-control small'
                            value={formData?.respondent?.municipality}
                            onChange={fillFormData(
                                'respondent.municipality'
                            )}
                        />
                        <span className='label small'> Since (date) </span>
                        <input
                            type='date'
                            className='form-control small'
                            value={formData?.respondent?.since}
                            onChange={fillFormData('familyHistory.respondent.since')}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label small'>
                            First name on the day before the marriage date:{' '}
                        </span>
                        <input
                            type='text'
                            className='form-control small'
                            value={formData?.respondent?.firstNameBeforeMarriage}
                            onChange={fillFormData(
                                'respondent.firstNameBeforeMarriage'
                            )}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label small'>
                            Last name on the day before the marriage date:{' '}
                        </span>
                        <input
                            type='text'
                            className='form-control small'
                            value={formData?.respondent?.lastNameBeforeMarriage}
                            onChange={fillFormData(
                                'respondent.lastNameBeforeMarriage'
                            )}
                        />
                    </div>

                    <div className='label small'>Gender on the day before the marriage: </div>



                    <div className="d-flex ">
                        <div>
                            <RadioChecks
                                name={"respondent_gender2"}
                                id={"male2"}
                                label={"Male"}
                                value={"male"}
                                checked={formData?.respondent?.genderBeforeMarriage}
                                fillFormData={fillFormData}
                                type="radio"

                                labelinput={'respondent.genderBeforeMarriage'}
                            />
                        </div>
                        <div>

                            <RadioChecks
                                name="respondent_gender2"
                                id="female2"
                                label="Female"
                                value="female"
                                checked={formData?.respondent?.genderBeforeMarriage}
                                fillFormData={fillFormData}
                                type="radio"
                                labelinput="respondent.genderBeforeMarriage"
                            />

                        </div>

                        <div>

                            <RadioChecks
                                name="respondent_gender2"
                                id="another2"
                                label="Another gender"
                                value="another"
                                checked={formData?.respondent?.genderBeforeMarriage}
                                fillFormData={fillFormData}
                                type="radio"
                                labelinput="respondent.genderBeforeMarriage"
                            />

                        </div>

                        <div>
                            <RadioChecks
                                name="respondent_gender2"
                                id="not_available2"
                                label="Gender information not available"
                                value="not available"
                                checked={formData?.respondent?.genderBeforeMarriage}
                                fillFormData={fillFormData}
                                type="radio"
                                labelinput="respondent.genderBeforeMarriage"
                            />

                        </div>

                    </div>













                    <div className='row pb-10px'>
                        <div className='d-flex flex-row gap-4'>
                            <div className='label small'>Divorced before? </div>


                            <div className="d-flex">
                                <div>
                                    <RadioChecks
                                        name="divorced_before2"
                                        id="no2"
                                        label="No"
                                        value="no"
                                        checked={formData?.respondent?.isDivorcedBefore}
                                        fillFormData={fillFormData}
                                        type="radio"
                                        labelinput="respondent.isDivorcedBefore"
                                    />
                                </div>
                                <div>
                                    <RadioChecks
                                        name="divorced_before2"
                                        id="yes2"
                                        label="Yes (Place and date of previous divorce)"
                                        value="yes"
                                        checked={formData?.respondent?.isDivorcedBefore}
                                        fillFormData={fillFormData}
                                        type="radio"
                                        labelinput="respondent.isDivorcedBefore"
                                    />
                                </div>
                            </div>



                        </div>
                        <div className='data-input small'>

                            <div style={{ width: "100%" }}>
                                <BorderLessInput
                                    fileno
                                    onChange={fillFormData}
                                    update={'familyHistory.respondent.divorcedBeforePlace'}
                                    value={formData?.respondent?.divorcedBeforePlace}
                                    style={{ padding: "6px 0" }}
                                    type={"text"}


                                />
                            </div>

                        </div>
                        {/* Separator */}
                        <div className='row pb-10px mt-30px border-top border-2 border-dark' />
                    </div>
                </div>

                {/* Relationship Dates */}
                <div>
                    <p className='paragraph fw-bold small'>RELATIONSHIP DATES: </p>

                    <div className='row'>
                        <div className='col-6 d-flex flex-row'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    name='relationship_status'
                                    id='married_on'
                                    checked={
                                        formData?.relationshipDates?.marriedOn
                                            ?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'relationshipDates.marriedOn.checked'
                                    )}
                                />
                            </div>
                            <div className='data-input small w-100'>
                                <label className='label small' htmlFor='married_on'>
                                    Married on (date){' '}
                                </label>
                                <input
                                    type='date'
                                    className='form-control small'
                                    value={
                                        formData?.relationshipDates?.marriedOn.date
                                    }
                                    onChange={fillFormData(
                                        'relationshipDates.marriedOn.date'
                                    )}
                                />
                            </div>
                        </div>
                        <div className='col-6 d-flex flex-row'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input small'
                                    type='checkbox'
                                    name='relationship_status'
                                    id='started_living_together'
                                    checked={
                                        formData?.relationshipDates?.startedLivingTogetherOn?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'relationshipDates.startedLivingTogetherOn.checked'
                                    )}
                                />
                            </div>
                            <div className='data-input small w-100'>
                                <label className='label small' htmlFor='started_living_together'>
                                    Started living together on (date){' '}
                                </label>
                                <input
                                    type='date'
                                    className='form-control small'
                                    value={
                                        formData?.relationshipDates?.startedLivingTogetherOn?.date
                                    }
                                    onChange={fillFormData('relationshipDates.startedLivingTogetherOn.date')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6 d-flex flex-row'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    name='relationship_status'
                                    id='separated_on'
                                    checked={
                                        formData?.relationshipDates?.separatedOn
                                            ?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'relationshipDates.separatedOn.checked'
                                    )}
                                />
                            </div>
                            <div className='data-input small w-100'>
                                <label className='label small' htmlFor='separated_on'>
                                    Separated on (date){' '}
                                </label>
                                <input
                                    type='date'
                                    className='form-control small'
                                    value={
                                        formData?.relationshipDates?.separatedOn?.date
                                    }
                                    onChange={fillFormData(
                                        'relationshipDates.separatedOn.date'
                                    )}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input small'
                                    type='checkbox'
                                    name='relationship_status'
                                    id='never_lived_together'
                                    checked={
                                        formData?.relationshipDates
                                            ?.isNeverLivedTogether?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'relationshipDates.isNeverLivedTogether.checked'
                                    )}
                                />
                                <label
                                    className='form-check-label small'
                                    htmlFor='never_lived_together'
                                >
                                    Never Lived Together
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className='row pb-10px ml-10px mt-30px border-top border-2 border-dark' />
                </div>

            </div>
        </>
    )
}

export default FamilyHistory