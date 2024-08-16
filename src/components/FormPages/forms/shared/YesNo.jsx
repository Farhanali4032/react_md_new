import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BoldandThinText from './BoldandThinText';

function YesNo({ heading, rows, fillFormData, updates, value }) {
    return (
        <Row>
            <BoldandThinText thin={"Have the parties signed a statement of agreed facts?"} />
            <Col xs={4}>
                <div className='form-check'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        name='relationship_status'
                        id='married_on'
                    />
                    <div className='data-input small' style={{ justifyContent: "start" }}>
                        <span className='label'>Yes.<i> (Attach a copy.)</i></span>
                    </div>
                </div>
            </Col>
            <Col xs={4}>
                <div className='form-check'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        name='relationship_status'
                        id='married_on'
                    />
                    <div className='data-input small' style={{ justifyContent: "start" }}>
                        <span className='label'>No.<i>(Explain why not.)</i> </span>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default YesNo;
