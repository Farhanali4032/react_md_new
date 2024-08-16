import React from 'react';
import CurrencyFormat from 'react-currency-format';
import NumberFormat from 'react-number-format';
import BoldandThinText from '../../forms/shared/BoldandThinText';
import { Col } from 'react-bootstrap';

const RelationshipDates = ({ formData, changeAmount, heading, info, assetType, fillFormData, totalTitle }) => {
    

    return (
        <>
            <Col xs={6}>
                <BoldandThinText bold={"RELATIONSHIP DATES:"} />
                <div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            id='married_on'
                            checked={formData?.relationshipDates?.marriedOn?.checked}
                            onChange={(e) => {
                                const { checked } = e.target;
                                fillFormData('relationshipDates.marriedOn.checked', checked);
                            }}
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>Married on (date)</span>
                            <input
                                type='text'
                                className='custom-input-control'
                                value={formData?.relationshipDates?.marriedOn?.date || ''}
                                onChange={fillFormData}
                            />

                        </div>
                    </div>
                </div>
                <div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            id='married_on'
                            checked={formData?.relationshipDates?.separatedOn?.checked}
                            onChange={(e) => {
                                const { checked } = e.target;
                                fillFormData('relationshipDates.separatedOn.checked', checked);
                            }}
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>Separated on (date)</span>
                            <input
                                type='text'
                                className='custom-input-control'
                                onChange={fillFormData}
                                value={formData?.relationshipDates?.separatedOn?.date || ''}

                            />

                        </div>
                    </div>
                </div>
                <div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            id='married_on'
                            checked={formData?.relationshipDates?.startedLivingTogetherOn?.checked}
                            onChange={(e) => {
                                const { checked } = e.target;
                                fillFormData('relationshipDates.startedLivingTogetherOn.checked', checked);
                            }}
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>Started living together on (date)</span>
                            <input
                                type='text'
                                className='custom-input-control'
                                onChange={fillFormData}
                                value={formData?.relationshipDates?.startedLivingTogetherOn?.date || ''}
                            />

                        </div>
                    </div>
                </div>
                <div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='checked'
                            id='married_on'
                            checked={formData?.relationshipDates?.isNeverLivedTogether?.checked}
                            onChange={(e) => {
                                const { checked } = e.target;
                                fillFormData('relationshipDates.isNeverLivedTogether.checked', checked);
                            }}
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>Never lived together</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            name='other'
                            id='married_on'
                            checked={formData?.relationshipDates?.other?.checked}
                            onChange={(e) => {
                                const { checked } = e.target;
                                fillFormData('relationshipDates.other.checked', checked);
                            }}
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>Other (Explain.)</span>
                            <input
                                type='text'
                                className='custom-input-control'
                                onChange={fillFormData('relationshipDates.other.details')}
                                value={formData?.relationshipDates?.other?.details || ''}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )

}



export default RelationshipDates;