import React from 'react'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import { Col, Row } from 'react-bootstrap'
import BorderLessInput from '../../forms/shared/BorderLessInput'

const LawyerCertificate = ({ formData, fillFormData }) => {
    return (
        <>

            <div className='row mt-40px'>
                <p className='sub-heading'>LAWYER'S CERTIFICATE</p>
                <div className='data-input'>
                    <label className='label'>My name is:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={formData?.lawyersCertificate?.sig1?.name}
                        onChange={fillFormData('lawyersCertificate.sig1.name')}
                    />
                </div>
                <BoldandThinText thin={`and I am the applicant's lawyer in this case. I certify that I have
                    complied with the requirements of section 7.7 of the Divorce Act and
                    section 33.2 of the Children's Law Reform Act regarding reconciliation
                    and the duty to discuss and inform.`} />


                <Row>
                    <Col xs={6}>



                        <BorderLessInput
                            label={"Date of signature"}
                            type={"date"}
                            fileno
                            onChange={fillFormData}
                            update={'lawyersCertificate.sig1.date'}
                            value={formData?.lawyersCertificate?.sig1?.date}
                            style={{ padding: "6px 0" }}

                        />

                    </Col>
                    <Col xs={6}>


                        <BorderLessInput
                            label={"Lawer's applicant"}
                            type={"text"}
                            fileno
                            onChange={fillFormData}
                            update={'lawyersCertificate.sig1.signature'}
                            value={formData?.lawyersCertificate?.sig1?.signature}
                            style={{ padding: "6px 0" }}

                        />



                    </Col>

                </Row>
                <div className='data-input'>
                    <label className='label'>My name is:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={formData?.lawyersCertificate?.sig2?.name}
                        onChange={fillFormData('lawyersCertificate.sig2.name')}
                    />
                </div>
                <BoldandThinText thin={` and I am the applicant's lawyer in this case. I certify that I have
                    complied with the requirements of section 7.7 of the Divorce Act and
                    section 33.2 of the Children's Law Reform Act regarding reconciliation
                    and the duty to discuss and inform.`} />



                <Row>
                    <Col xs={6}>



                        <BorderLessInput
                            label={"Date of signature"}
                            type={"date"}
                            fileno
                            onChange={fillFormData}
                            update={'lawyersCertificate.sig2.date'}
                            value={formData?.lawyersCertificate?.sig2?.date}
                            style={{ padding: "6px 0" }}

                        />

                    </Col>
                    <Col xs={6}>


                        <BorderLessInput
                            label={"Lawer's applicant"}
                            type={"text"}
                            fileno
                            onChange={fillFormData}
                            update={'lawyersCertificate.sig2.signature'}
                            value={formData?.lawyersCertificate?.sig2?.signature}
                            style={{ padding: "6px 0" }}

                        />



                    </Col>

                </Row>
            </div>
        </>
    )
}

export default LawyerCertificate