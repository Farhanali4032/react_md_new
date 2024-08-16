

import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BoldandThinText from './BoldandThinText';
import ListItem15 from '../../Components/Form15/ListItem';
import BorderLessInput from './BorderLessInput';

function LawyersCertificate({ formData, fillFormData }) {


    return (
        <>
            <div className='pY-2'>
                <p className='sub-heading pb-1'>
                    LAWYER'S CERTIFICATE
                </p>
                <ListItem15
                    text='My name is:'
                    showInput={true}
                    onChange={fillFormData}
                    labelinput={'applicantsLawyer.fullLegalName'}
                    value={formData?.applicantsLawyer?.fullLegalName}
                    fillFormData={fillFormData}
                />
                <ListItem15
                    text="and I am the requesting party's lawyer in this case. I certify that I have complied with the requirements of section 7.7 of the Divorce Act and section 33.2 of the Children's Law Reform Act regarding reconciliation and the duty to discuss and inform."
                    showInput={false}
                />
            </div>
            <div className='py-4'>
                <Row className='pt-2'>
                    <Col xs={6}>
                        <BorderLessInput
                            label={"Date"}
                            type={"date"}
                            fileno
                            onChange={fillFormData}
                            update={'lawyer_certificate.signature.date'}
                            value={formData?.lawyer_certificate?.signature?.date}
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                    <Col xs={6}>
                        <BorderLessInput
                            label={"Lawyer's signature"}
                            type={"text"}
                            fileno
                            onChange={fillFormData}
                            value={''}
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default LawyersCertificate;