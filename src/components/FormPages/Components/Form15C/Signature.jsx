import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BorderLessInput from '../../forms/shared/BorderLessInput'
import BoldandThinText from '../../forms/shared/BoldandThinText';
import DynamicTextArea from '../../forms/shared/TextArea';

const Signature = ({ fillFormData, formData }) => {
    const inputs = [
        {
            label: "Applicant's signature",
            type: "text",
            dateUpdate: 'applicantsCertificate.applicant.sig',
            value: 'applicantsCertificate?.applicant?.sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Respondent's signature",
            type: "text",
            dateUpdate: 'applicantsCertificate.respondent.sig',
            value: 'applicantsCertificate?.respondent?.sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Date of applicant's signature",
            type: "date",
            dateUpdate: 'applicantsCertificate.applicant.sig.date',
            value: 'applicantsCertificate?.applicant?.sig?.date',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Date of respondent's signature",
            type: "date",
            dateUpdate: 'applicantsCertificate.respondent.sig.date',
            value: 'applicantsCertificate?.respondent?.sig?.date',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Signature of witness",
            type: "text",
            dateUpdate: 'applicantsCertificate.applicant.witness.sig',
            value: 'applicantsCertificate?.applicant?.witness?.sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Signature of witness",
            type: "text",
            dateUpdate: 'applicantsCertificate.respondent.witness.sig',
            value: 'applicantsCertificate?.respondent?.witness?.sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Type or print name of witness to applicant’s signature",
            type: "text",
            dateUpdate: 'applicantsCertificate.applicant.witness.name',
            value: 'applicantsCertificate?.applicant?.witness?.name',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Type or print name of witness to respondent’s signature",
            type: "text",
            dateUpdate: 'applicantsCertificate.respondent.witness.sig',
            value: 'applicantsCertificate?.respondent?.witness?.sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Address of witness",
            type: "text",
            dateUpdate: 'applicantsCertificate.applicant.witness.address',
            value: 'applicantsCertificate?.applicant?.witness?.address',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Address of witness",
            type: "text",
            dateUpdate: 'applicantsCertificate.respondent.witness.address',
            value: 'applicantsCertificate?.respondent?.witness?.address',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Telephone number of witness",
            type: "text",
            dateUpdate: 'applicantsCertificate.applicant.witness.telephone',
            value: 'applicantsCertificate?.applicant?.witness?.telephone',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
        {
            label: "Telephone number of witness",
            type: "text",
            dateUpdate: 'applicantsCertificate.respondent.witness.telephone',
            value: 'applicantsCertificate?.respondent?.witness?.telephone',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },
    ];



    const assignee = [
        {
            label: "Signature of person authorized to sign on behalf of assignee",
            type: "text",
            dateUpdate: 'applicantsCertificate.assignee.sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Date of signature",
            type: "text",
            dateUpdate: 'applicantsCertificate.assignee.date',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },

        {
            label: "Print name and title of person signing the consent",
            type: "text",
            dateUpdate: 'applicantsCertificate.assignee.name',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },

    ];

    const assigneeunder = [
        {
            label: "Witness’s signature",
            type: "text",
            dateUpdate: 'applicantsCertificate.assignee.witness_sig',
            value: 'applicantsCertificate?.assignee?.witness_sig',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Name of witness (type or print legibly)",
            type: "text",
            dateUpdate: 'applicantsCertificate.assignee.witness_name',
            value: 'applicantsCertificate?.assignee?.witness_name',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },



    ];

    const lawyerfirst = [
        {
            label: "Date",
            type: "date",
            dateUpdate: 'lawyersCertificate.sig1.date',
            value: 'lawyersCertificate?.sig1?.date',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Lawyer’s signature",
            type: "date",
            dateUpdate: 'lawyersCertificate.sig1.name',
            value: 'lawyersCertificate?.sig1?.name',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },



    ];
    const lawyersecond = [
        {
            label: "Date",
            type: "date",
            dateUpdate: 'lawyersCertificate.sig2.date',
            value: 'lawyersCertificate?.sig2?.date',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig1.signature',
        },
        {
            label: "Lawyer’s signature",
            type: "text",
            dateUpdate: 'lawyersCertificate.sig2.name',
            value: 'lawyersCertificate?.sig2?.name',
            signatureUpdate: 'applicantsCertificate.jointDivorce.sig2.signature',
        },



    ];

    return (
        <>
            <div className='sub-heading mt-20px'>
                PARTIES’ CERTIFICATE
            </div>
            <BoldandThinText thin={`(Your lawyer(s), if you are represented, must complete the Lawyer’s Certificate below.)`} />
            <BoldandThinText thin={`We certify that we are aware of our duties under sections 7.1 to 7.5 of the Divorce Act and section 33.1 of the Children’s Law Reform Act regarding the best interests of any children, protection of any children from conflict, family dispute resolution processes, complete, accurate, and up-to-date information, and compliance with orders.`} />
            <BoldandThinText bold={`NOTE: The parties do not need to sign this consent at the same time. Each party must sign in the presence of his or her witness who shall sign immediately after that party. The witness cannot be one of the parties. If the witness does not know the party, the witness should see identification that proves that the party to the consent is the same person signing the consent.`} />
            <div style={{ borderBottom: "3px solid black" }}></div>
            <Row >
                {inputs.map((input, index) => (
                    <Col xs={6} key={index} className='py-3'>
                        <BorderLessInput
                            label={input.label}
                            type={input.type}
                            fileno
                            onChange={fillFormData}
                            update={input.dateUpdate}
                            value={formData?.[input.value]}
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                ))}
            </Row>
            <div style={{ borderBottom: "3px solid black" }}></div>
            <div className='sub-heading mt-20px'>
                ASSIGNEE’S CONSENT
            </div>


            <Row className='justify-content-center'>
                {assignee.map((input, index) => (
                    <Col xs={6} key={index} className='py-3'>
                        <BorderLessInput
                            label={input.label}
                            type={input.type}
                            fileno
                            onChange={fillFormData}
                            update={input.dateUpdate}
                            value=""
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                ))}
            </Row>
            <Row className='justify-content-center'>
                {assigneeunder.map((input, index) => (
                    <Col xs={6} key={index} className='py-3'>
                        <BorderLessInput
                            label={input.label}
                            type={input.type}
                            fileno
                            onChange={fillFormData}
                            update={input.dateUpdate}
                            value=""
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                ))}
            </Row>
            <div style={{ borderBottom: "3px solid black" }}></div>
            <div className='sub-heading mt-20px'>
                LAWYER’S CERTIFICATE
            </div>

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



            <Row className='justify-content-center'>
                {lawyerfirst.map((input, index) => (
                    <Col xs={6} key={index} className='py-3'>
                        <BorderLessInput
                            label={input.label}
                            type={input.type}
                            fileno
                            onChange={fillFormData}
                            update={input.dateUpdate}
                            value=""
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                ))}
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
            <BoldandThinText thin={`and I am the applicant's lawyer in this case. I certify that I have
                    complied with the requirements of section 7.7 of the Divorce Act and
                    section 33.2 of the Children's Law Reform Act regarding reconciliation
                    and the duty to discuss and inform.`} />



            <Row className='justify-content-center'>
                {lawyersecond.map((input, index) => (
                    <Col xs={6} key={index} className='py-3'>
                        <BorderLessInput
                            label={input.label}
                            type={input.type}
                            fileno
                            onChange={fillFormData}
                            update={input.dateUpdate}
                            value=""
                            style={{ padding: "6px 0" }}
                        />
                    </Col>
                ))}
            </Row>

            <div>
                <div className='sub-heading mt-20px'>
                    SCHEDULE OF PROPOSED CHANGES
                </div>

                <DynamicTextArea
                    rows={20}
                    updates={'proposed_changes.details'}
                    fillFormData={fillFormData}
                    value={formData?.proposed_changes?.details}
                />
            </div>
        </>
    );
}

export default Signature;

