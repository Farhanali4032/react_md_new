import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Seal from './Seal'
import BorderLessInput from './BorderLessInput'
import RadioChecks from './RadioChecks'
import FormInfo from './FormInfo'
import ApplicationTable from './ApplicationTable'

const FormsHeader = ({ fillFormData, formData, formID, formName }) => {
    return (
        <>
            <Row className='pb-3'>
                <Col xs={9}>
                    <BorderLessInput
                        label={"(Name of Court)"}
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'courtName'}
                        value={formData?.courtName || formData?.court_info?.courtName}
                        style={{ padding: "6px 0" }}

                    />
                    <textarea 
                    className='form-control  border-black shadow-none border-0 border-bottom small pt-0 form-control form-control-sm'
                    type='textarea' 
                    onChange={fillFormData('courtOfficeAddress')}
                    value={formData?.courtOfficeAddress || formData?.court_info?.courtOfficeAddress}
                    />
                </Col>
                <Col xs={3}>
                    <BorderLessInput
                        value={formData?.courtFileNumber || formData?.court_info?.courtFileNumber}
                        label={"Court File Number"}
                        type={"text"}
                        onChange={fillFormData}
                        update={"courtFileNumber"}
                        topheading
                        style={{ marginTop: "-25px", border: "1px solid black" }}
                        name="court-number"
                    />
                    <FormInfo
                        number={formID}
                        format={formName}
                    />
                </Col>
            </Row>
        </>
    )
}

export default FormsHeader