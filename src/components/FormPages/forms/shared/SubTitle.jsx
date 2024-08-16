import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BoldandThinText from './BoldandThinText';

function SubTitleHeading({ heading, seperator, underline, note,smallLabel,centered }) {
    return (
        <>
            <Row className={`mt-4 ${centered ? 'text-center' : ''}`}>
                <p className={`sub-heading ${underline ? 'text-decoration-underline' : ''} ${smallLabel ? '' : 'pb-1'}`}>
                    {heading}
                </p>
                {note && smallLabel && (
                    <>{note}</>
                )}
                {seperator && (
                    <div className='row pb-10px border-top border-2 border-dark' />
                )}
            </Row>
            {/* <Row>
                {note && (
                    <div className='pt-1'>
                        <span className='fw-bold'>
                           {note}
                            {' '}
                        </span>
                    </div>
                )}
               
            </Row> */}
        </>

    );
}

export default SubTitleHeading;
