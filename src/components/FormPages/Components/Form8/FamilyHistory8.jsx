import React from 'react'
import RadioChecks from '../../forms/shared/RadioChecks'
import BorderLessInput from '../../forms/shared/BorderLessInput'
import { Col, Row } from 'react-bootstrap'

const FamilyHistory8 = ({ formData, fillFormData, changeFormCheck }) => {
    return (
        <>


            <div className='row pb-20px '>
                <p className='sub-heading'>FAMILY HISTORY</p>


                <div>
                    <div className='data-input small'>
                        <span className='fw-bold '>APPLICANT: </span>
                        <span className='label small'>Age: </span>
                        <input
                            type='text'
                            className='form-control small'
                            style={{ width: '300px' }}
                            value={""}
                            onChange={fillFormData('familyHistory.applicant.age')}
                        />
                        <span className='label small'> Birthdate: </span>
                        <input
                            type='date'
                            className='form-control small'
                            value={""}
                            onChange={fillFormData('familyHistory.applicant.birthdate')}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label small'>
                            Resident in (municipality & province){' '}
                        </span>
                        <input
                            type='text'
                            className='form-control small w-100'
                          
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.muncipilityAndProvince'
                            )}
                        />
                       
                    </div>


                    <div className='data-input small'>
                        <span className='label small'>
                        since (date)
                        </span>
                        <input
                            type='text'
                            className='form-control small w-100'
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.muncipilityAndProvince'
                            )}
                        />
                       
                    </div>







                    <div className='data-input small'>
                        <span className='label small'>
                        Surname at birth:
                        </span>
                        <input
                            type='text'
                            className='form-control small'
                            style={{ width: '300px' }}
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.muncipilityAndProvince'
                            )}
                        />
                        <span className='label small'> Surname just before marriage:</span>
                        <input
                            type='date'
                            className='form-control small'
                            value={formData?.familyHistory?.applicant?.since}
                            onChange={fillFormData('familyHistory.applicant.since')}
                        />
                    </div>











                    <div className='data-input small'>
                        <span className='label'>
                            Last name on the day before the marriage date:{' '}
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.lastNameBeforeMarriage'
                            )}
                        />
                    </div>

                   


                    <div className='row pb-10px'>
                        <div className='d-flex flex-row gap-4'>
                            <div className='label small'>Divorced before? </div>


                            <div className="d-flex ">
                                <div>
                                    <RadioChecks
                                        name={"divorced_before"}
                                        id={"no1"}
                                        label={"No"}
                                        value={"no"}
                                        checked={""}
                                        fillFormData={fillFormData}
                                        type="radio"

                                        labelinput={'familyHistory.applicant.isDivorcedBefore'}
                                    />
                                </div>
                                <div>
                                    <RadioChecks
                                        name={"divorced_before"}
                                        id={"yes1"}
                                        label={" Yes (Place and date of previous divorce)"}
                                        value={"yes"}
                                        checked={""}
                                        fillFormData={fillFormData}
                                        type="radio"

                                        labelinput={'familyHistory.applicant.isDivorcedBefore'}
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
                                    value={""}
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
                        <span className='fw-bold '>RESPONDENT: </span>
                        <span className='label small'>Age: </span>
                        <input
                            type='text'
                            className='form-control small'
                            style={{ width: '300px' }}
                            value={""}
                            onChange={fillFormData('familyHistory.applicant.age')}
                        />
                        <span className='label small'> Birthdate: </span>
                        <input
                            type='date'
                            className='form-control small'
                            value={""}
                            onChange={fillFormData('familyHistory.applicant.birthdate')}
                        />
                    </div>

                    <div className='data-input small'>
                        <span className='label small'>
                            Resident in (municipality & province){' '}
                        </span>
                        <input
                            type='text'
                            className='form-control small w-100'
                          
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.muncipilityAndProvince'
                            )}
                        />
                       
                    </div>


                    <div className='data-input small'>
                        <span className='label small'>
                        since (date)
                        </span>
                        <input
                            type='text'
                            className='form-control small w-100'
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.muncipilityAndProvince'
                            )}
                        />
                       
                    </div>







                    <div className='data-input small'>
                        <span className='label small'>
                        Surname at birth:
                        </span>
                        <input
                            type='text'
                            className='form-control small'
                            style={{ width: '300px' }}
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.muncipilityAndProvince'
                            )}
                        />
                        <span className='label small'> Surname just before marriage:</span>
                        <input
                            type='date'
                            className='form-control small'
                            value={formData?.familyHistory?.applicant?.since}
                            onChange={fillFormData('familyHistory.applicant.since')}
                        />
                    </div>











                    <div className='data-input small'>
                        <span className='label'>
                            Last name on the day before the marriage date:{' '}
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            value={""}
                            onChange={fillFormData(
                                'familyHistory.applicant.lastNameBeforeMarriage'
                            )}
                        />
                    </div>

                   


                    <div className='row pb-10px'>
                        <div className='d-flex flex-row gap-4'>
                            <div className='label small'>Divorced before? </div>


                            <div className="d-flex ">
                                <div>
                                    <RadioChecks
                                        name={"divorced_before"}
                                        id={"no1"}
                                        label={"No"}
                                        value={"no"}
                                        checked={""}
                                        fillFormData={fillFormData}
                                        type="radio"

                                        labelinput={'familyHistory.applicant.isDivorcedBefore'}
                                    />
                                </div>
                                <div>
                                    <RadioChecks
                                        name={"divorced_before"}
                                        id={"yes1"}
                                        label={" Yes (Place and date of previous divorce)"}
                                        value={"yes"}
                                        checked={""}
                                        fillFormData={fillFormData}
                                        type="radio"

                                        labelinput={'familyHistory.applicant.isDivorcedBefore'}
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
                                    value={""}
                                    style={{ padding: "6px 0" }}
                                    type={"text"}


                                />
                            </div>

                            <div className='row pb-10px ml-10px mt-30px border-top border-2 border-dark' />
                        </div>


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
                                        formData?.familyHistory?.relationshipDates?.marriedOn
                                            ?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'familyHistory.relationshipDates.marriedOn.checked'
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
                                        formData?.familyHistory?.relationshipDates?.marriedOn?.date
                                    }
                                    onChange={fillFormData(
                                        'familyHistory.relationshipDates.marriedOn.date'
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
                                        formData?.familyHistory?.relationshipDates
                                            ?.startedLivingTogetherOn?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'familyHistory.relationshipDates.startedLivingTogetherOn.checked'
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
                                        formData?.familyHistory?.relationshipDates
                                            ?.startedLivingTogetherOn?.date
                                    }
                                    onChange={fillFormData(
                                        'familyHistory.relationshipDates.startedLivingTogetherOn.date'
                                    )}
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
                                        formData?.familyHistory?.relationshipDates?.separatedOn
                                            ?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'familyHistory.relationshipDates.separatedOn.checked'
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
                                        formData?.familyHistory?.relationshipDates?.separatedOn?.date
                                    }
                                    onChange={fillFormData(
                                        'familyHistory.relationshipDates.separatedOn.date'
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
                                        formData?.familyHistory?.relationshipDates
                                            ?.isNeverLivedTogether?.checked === true
                                    }
                                    onChange={changeFormCheck(
                                        'familyHistory.relationshipDates.isNeverLivedTogether.checked'
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

export default FamilyHistory8