import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Seal from './Seal'
import BorderLessInput from './BorderLessInput'
import RadioChecks from './RadioChecks'
import FormInfo from './FormInfo'
import ApplicationTable from './ApplicationTable'
import CheckBox from './CheckBox'

const FormHeader = ({ topheading, SealText, labelname, onChange, updatename, valuename, typename, valueaddress, updateaddress, labeladdress, typeaddress, labelcourt, typecourt, valuecourt, updatecourt, formnumber, formformat, formtype, divorcechecked, divorcetype, divorcevalue, divorcelabel, divorcename, divorceid, radioinput, labeljoint, jointchecked, jointid, jointvalue, ApplicantData, ApplicantLawyerData, RespondentData, RespondentLawyerData, divorce, name }) => {
    return (
        <>
            <div className='text-center mb-4'>
                <div className='fw-bold fst-italic'>{topheading}</div>
            </div>

            <Row className=''>
                <Col xs={3}>
                    <Seal text={SealText} />
                </Col>
                <Col xs={6}>
                    <BorderLessInput
                        label={labelname}
                        type={typename}
                        fileno
                        onChange={onChange}
                        update={updatename}
                        value={valuename}
                        style={{ padding: "6px 0" }}

                    />
                    <BorderLessInput
                        label={labeladdress}
                        type={typeaddress}
                        fileno
                        onChange={onChange}
                        update={updateaddress}
                        value={valueaddress}
                        style={{ padding: "6px 0" }}

                    />
                </Col>

                <Col xs={3}>

                    <BorderLessInput
                        value={valuecourt}
                        label={labelcourt}
                        type={typecourt}
                        onChange={onChange}
                        update={updatecourt}
                        topheading
                        style={{ marginTop: "-25px", border: "1px solid black" }}
                        name={name}
                    />
                    <FormInfo
                        number={formnumber}
                        format={formformat}
                        type={formtype}

                    />

                    {divorce ?


                        <div className='text-start py-2'>
                            <CheckBox
                                name={divorcename}
                                id={divorceid}
                                label={divorcelabel}
                                value={divorcevalue}
                                checked={divorcechecked}
                                fillFormData={onChange}
                                type={divorcetype}

                                labelinput={radioinput}
                                checkbox={true}
                            />
                            <CheckBox
                                name={divorcename}
                                id={jointid}
                                label={labeljoint}
                                value={jointvalue}
                                checked={jointchecked}
                                fillFormData={onChange}
                                labelinput={radioinput}
                                type={divorcetype}
                                checkbox={true}
                            />
                        </div>
                        : ""
                    }
                </Col>

            </Row>
            <Row className='py-1'>
                <Col xs={6} className='ps-0'>
                    <ApplicationTable heading="Applicant(s)" data={ApplicantData} onChange={onChange} />
                </Col>
                <Col xs={6} className='pe-0'>
                    <ApplicationTable heading="Applicant(s) Lawyer" data={ApplicantLawyerData} onChange={onChange} />
                </Col>
                <Col xs={6} className='ps-0'>
                    <ApplicationTable heading="Respondent(s)" data={RespondentData} onChange={onChange} />
                </Col>
                <Col xs={6} className='pe-0'>
                    <ApplicationTable heading="Respondent(s) Lawyer" data={RespondentLawyerData} onChange={onChange} />
                </Col>
            </Row>
        </>
    )
}

export default FormHeader