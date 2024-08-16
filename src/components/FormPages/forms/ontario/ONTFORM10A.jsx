import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Row } from 'react-bootstrap'
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
import { Form10A, Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import FinancialInstructions from '../../Components/FORM10A/FinancialInstructions'
import ListItem from '../shared/ListItems'
import CheckBox from '../shared/CheckBox'

const ONTFORM10A = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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

  // const { pdfData, loading, ChildrensLawyer } = Form10A(matterId);

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
      if (e.target.name === "court-number") {
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

  function handleCheckBox(key, defaultVal = null) {
    return e => {
      const updatedFormData = { ...formData }; // Create a shallow copy of formData
      // Traverse the nested structure and update the value
      let nestedObj = updatedFormData;
      const keys = key.split('.'); // Split the key into an array using dot (.) separator
      // Handle checkbox specific behavior
      const value = e.target.checked ? true : false; // Use 'true' or 'false' based on checkbox state
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          nestedObj[k] = defaultVal !== null ? defaultVal : value; // Update the value at the last key
        } else {
          nestedObj[k] = { ...nestedObj[k] }; // Create a shallow copy of the nested object
          nestedObj = nestedObj[k]; // Move to the next level of nested object
        }
      }

      setFormData(updatedFormData); // Update the state with the new formData
    };
  }

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM10A',
      data: formData,
    })
  }, [formData])

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className='pdf-form pdf-form-8A mt-20px px-3' ref={targetRef}>
          <FormHeading heading={"ONTARIO"} />
          <Row className='pb-3'>
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
                type={"textarea"}
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
                number="10A"
                format={"Reply By"}
              />
              <div className='text-start py-2'>
              <CheckBox
                    label={`applicant`}
                    type='checkbox'
                    value={formData?.document_reply?.applicant?.isChecked}
                    labelinput={'document_reply.applicant.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.document_reply?.applicant?.isChecked || false}
                  />
              <CheckBox
                    label={`added respondent`}
                    type='checkbox'
                    value={formData?.document_reply?.added_respondent?.isChecked}
                    labelinput={'document_reply.added_respondent.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.document_reply?.added_respondent?.isChecked || false}
                  />
                    </div>
            </Col>
          </Row>

          <Row className='pb-3'>
            <ApplicationTable data={formData} type="two-rows" heading={'Applicant(s)'} applicant />
          </Row>
          <Row className='pb-3'>
            <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Respondents(s)'} respondent />
          </Row>

          <Row className='pb-3'>
            <div className="pb-20px">
              <div className="fw-bolder">Children's Lawyer</div>
              <div className="col-12">
                <div className="data-group">
                  <label>
                    Name & address of Children’s Lawyer’s agent for service (street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)) and name of person represented.
                  </label>
                  <textarea rows="2" value={formData?.childrensLawyer?.lawyer1 || ''}
                    onChange={fillFormData('childrensLawyer.lawyer1')}></textarea>
                  <textarea rows="2" value={formData?.childrensLawyer?.lawyer2 || ''}
                    onChange={fillFormData('childrensLawyer.lawyer2')}></textarea>
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <FinancialInstructions />
          </Row>

          <Row>
            <p className='paragraph fw-bold small'>TO ALL PARTIES: </p>
            <div>
              <ol type="number">
                <li className='pb-2'>
                  <div className='d-flex flex-column flex-md-row gap-3 ps-3'>
                    <div className='data-input flex-grow-1'>
                      <span className='label'>My name is (full legal name)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='form-control small'
                          value={formData?.applicant?.fullLegalName}
                          onChange={fillFormData('applicant.fullLegalName')}
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <ListItem
                    text={"I agree with the following claim(s) made by the respondent in his/her answer: (Refer to the numbers alongside the boxes on page 3 of the answer form.)"}
                    showInput={false}
                  />
                  <Col md={12} className='mb-3'>
                    <div className='w-100 ps-4'>
                      <div className='data-input mt-0 pt-0'>
                        <textarea
                          type='text'
                          className='form-control small'
                          value={formData?.item2}
                          onChange={fillFormData('item2')}
                        ></textarea>
                      </div>
                    </div>
                  </Col>
                </li>
                <li>
                  <ListItem
                    text={"I do not agree with the following claim(s) made by the respondent: (Again, refer to the numbers alongside the boxes on page 3 of the answer form.)"}
                    showInput={false}
                  />
                  <Col md={12} className='mb-3'>
                    <div className='w-100 ps-4'>
                      <div className='data-input mt-0 pt-0'>
                        <textarea
                          type='text'
                          className='form-control small'
                          value={formData?.item3}
                          onChange={fillFormData('item3')}
                        ></textarea>
                      </div>
                    </div>
                  </Col>
                </li>
                <li>
                  <CheckBox
                    id='order'
                    name='order'
                    label={`I am asking that the respondent's claim (except for the parts with which I agree) be dismissed with costs.`}
                    type='checkbox'
                    value={formData?.item4?.isChecked}
                    labelinput={'item4.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item4?.isChecked || false}
                  />
                </li>
                <li>
                  <ListItem
                    text={"The important facts supporting my position in paragraph 3 are as follows: (In numbered paragraphs, set out the reasons for your position. Attach an additional sheet and number it if you need more space.)"}
                    showInput={false}
                  />
                  <Col md={12} className='mb-3'>
                    <div className='w-100 ps-4'>
                      <div className='data-input mt-0 pt-0'>
                        <textarea
                          type='text'
                          className='form-control small border-0'
                          value={formData?.item5}
                          onChange={fillFormData('item5')}
                          rows={20}
                        ></textarea>
                      </div>
                    </div>
                  </Col>
                </li>
              </ol>
            </div>
            <p class="text-9 text-italic mt-0">Put a line through any blank space left on this page. If additional space is needed, extra sheets may be attached.</p>
            <hr />

            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of signature"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'signature.date'}
                  value={formData?.signature?.date}
                  style={{ padding: "6px 0" }}

                />
              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Respondent's signature"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={''}
                  value={""}
                  style={{ padding: "6px 0" }}

                />
              </Col>
            </Row>
          </Row>

        </div>

      )}
    </>
  )
}

export default ONTFORM10A