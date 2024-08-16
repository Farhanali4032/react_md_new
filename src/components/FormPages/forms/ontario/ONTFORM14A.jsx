import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Form, Row } from 'react-bootstrap'
import Seal from '../shared/Seal'
import BorderLessInput from '../shared/BorderLessInput'
import FormInfo from '../shared/FormInfo'
import BorderedInput from '../shared/BorderedInput'
import RadioChecks from '../shared/RadioChecks'
import ApplicationTable from '../shared/ApplicationTable'
import Listings from '../shared/FormListings'
import ClaimText from '../../Components/Form8A/ClaimText'
import FamilyForm from '../shared/FamilyForm'
import ChildTable from '../../Components/Form8A/ChildTable'
import BoldandThinText from '../shared/BoldandThinText'
import PreviousCasesOrAgreements from '../../Components/Form8A/PreviousCases'
import TextArea from '../shared/TextArea'
import DynamicTextArea from '../shared/TextArea'
import { Form14A, Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'

import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'

const ONTFORM14A = ({ targetRef, matterId, onFormDataSave, savedData,setCourtNumber }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    let data = {
      matterId: matterId,
      file_id: savedData.file_id,
      folder_id: savedData.folder_id,
    }
    dispatch(getFileData(data))
  }, [])

  const selectFileData = useSelector(selectGetFileData);

  const { documentInfo, loading } = FormInformation(matterId);

  useEffect(() => {
    if (selectFileData && selectFileData[0]) {
      setFormData(JSON.parse(selectFileData[0].file_data))
    }
    else if (documentInfo) {
      setCourtNumber(documentInfo.court_info.courtFileNumber)
      setFormData(documentInfo);
    }
  }, [loading, formData, selectFileData])

  const [formData, setFormData] = useState()


  function fillFormData(key, defaultVal = null) {
    return e => {
      const updatedFormData = { ...formData } // Create a shallow copy of formData

      // Split the key into an array using dot (.) separator
      const keys = key.split('.') // ['familyHistory', 'applicant', 'age']
      const value = e.target.value
      if(e.target.name==="court-number")
        {
          setCourtNumber(formData?.court_info?.courtFileNumber)
        }

      // Traverse the nested structure and update the value
      let nestedObj = updatedFormData
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (i === keys.length - 1) {
          // nestedObj[k] = value; // Update the value at the last key
          nestedObj[k] = defaultVal ? defaultVal : value
        } else {
          nestedObj[k] = { ...nestedObj[k] } // Create a shallow copy of the nested object
          nestedObj = nestedObj[k] // Move to the next level of nested object
        }
      }

      setFormData(updatedFormData) // Update the state with the new formData
    }
  }

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className='pdf-form pdf-form-8A mt-20px px-3' ref={targetRef}>
          <FormHeading heading={"ONTARIO"} />
          <Row className='pb-1'>
            <Col xs={9}>
              <BorderLessInput
                label={"(Name of Court)"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'courtName'}
                value={formData?.court_info.courtName}
                style={{ padding: "6px 0" }}

              />
              <BorderLessInput
                label={"Court Office Address"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'courtOfficeAddress'}
                value={formData?.court_info.courtOfficeAddress}
                style={{ padding: "6px 0" }}

              />
            </Col>
            <Col xs={3}>
              <BorderLessInput
                value={formData?.court_info.courtFileNumber}
                label={"Court File Number"}
                type={"text"}
                onChange={fillFormData}
                update={"courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
                name="court-number"
              />
              <FormInfo
                number="14A"
                format={"Affidavit (general) dated"}
              />
              <BorderLessInput
                value={formData?.applicationType}
                type={"text"}
                onChange={fillFormData}
                update={"applicationType"}
                topheading
                style={{ marginTop: "-25px" }}
              />
            </Col>
          </Row>

          <Row className='pb-3'>
            <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Applicant(s)'} applicant />
          </Row>
          <Row className='pb-3'>
            <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Respondents(s)'} respondent />
          </Row>

          <Row>

            <div className='form-check px-3'>

              <div className='data-input small' style={{ justifyContent: "start" }}>
                <span className='label'> <b>My name is </b> (full legal name)</span>
                <input
                  type='text'
                  className='form-control small'
                  value={formData?.applicant?.fullLegalName}
                  onChange={fillFormData('applicant.fullLegalName')}

                />

              </div>
              <div className='data-input small' style={{ justifyContent: "start" }}>
                <span className='label'> <b>I live in </b>(municipality & province)</span>
                <input
                  type='text'
                  className='form-control small'
                  value={formData?.applicant?.municipality}
                  onChange={fillFormData('applicant.municipality')}
                />

              </div>




            </div>
            <BoldandThinText
              bold={`and I swear/affirm that the following is true:`}
            />

            <BoldandThinText
              italic
              thin={`Set out the statements of fact in consecutively numbered paragraphs. Where possible, each numbered paragraph should consist of one complete sentence and be limited to a particular statement of fact. If you learned a fact from someone else, you must give that person’s name and state that you believe that fact to be true.`}
            />
          </Row>

          <Row className='ms-2'>
            <ol>
              <li>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" className='border-0' rows={8} value={formData?.item1?.details}
                      onChange={fillFormData('item1.details')} />
                  </Form.Group>
                </Form>
              </li>
            </ol>
          </Row>


          <Row className='border-top  border-dark border-4'>
            <Col className='border-end  border-dark border-4' xs={8}>
              <div className='d-flex align-items-center gap-2'>
                <div className='data-input flex-grow-1'>
                  <span className='label word-wrap'> Sworn/Affirmed before me at</span>
                </div>
                <div style={{ width: "100%" }}>
                  <BorderLessInput
                    label={"municipality"}
                    type={"text"}
                    fileno
                    onChange={fillFormData}
                    update={'signature.municipality'}
                    value={formData?.signature?.municipality}
                    style={{ padding: "6px 0" }}
                  />
                </div>
              </div>
              <div className='d-flex align-items-center gap-2'>
                <div className='data-input flex-grow-1'>
                  <span className='label word-wrap'>in</span>
                </div>
                <div style={{ width: "100%" }}>
                  <BorderLessInput
                    label={"province, state or country"}
                    type={"text"}
                    fileno
                    onChange={fillFormData}
                    update={'signature.province'}
                    value={formData?.signature?.province}
                    style={{ padding: "6px 0" }}
                  />
                </div>
              </div>
              <div className='d-flex align-items-center gap-2'>
                <div className='data-input '>
                  <span className='label word-wrap'>on</span>
                </div>
                <div style={{ width: "100%" }}>
                  <Row>
                    <Col xs={6}>
                      <BorderLessInput
                        label={"date"}
                        type={"date"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.date'}
                        value={formData?.signature?.date}
                        style={{ padding: "6px 0" }}
                      />
                    </Col>


                    <Col xs={6}>
                      <BorderLessInput
                        label={"Commissioner for taking affidavits (type or print name below if signature is illegible.)"}
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.commissioner'}
                        value={formData?.signature?.commissioner}
                        style={{ padding: "6px 0" }}
                      />
                    </Col>
                  </Row>

                </div>
              </div>

            </Col>
            <Col xs={4}>
              <div className='mt-5'>
                <BorderLessInput
                  label={"signature"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  style={{ padding: "6px 0" }}
                />
                <div className='text-center'>
                  <span className=' small'> (This form is to be signed in front of a lawyer, justice of the peace, notary public or commissioner for taking affidavits.)</span>
                </div>
              </div>

            </Col>
          </Row>

        </div>
      )}
    </>
  )
}

export default ONTFORM14A