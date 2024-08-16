import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BoldandThinText from './BoldandThinText';

function Subheading({ heading, seperator }) {
    return (
        <Row className='mt-4'>
            <p class="paragraph small text-center">
                <span class="sub-heading">
                    {heading}
                </span>
            </p>
            {seperator && (
                <div className='row pb-10px border-top border-2 border-dark' />
            )}
        </Row>

    );
}

export default Subheading;
