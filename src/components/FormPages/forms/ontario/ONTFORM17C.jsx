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
import { Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import { calculateAge } from '../../../../utils/matterValidations/matterValidation'
import RelationshipDates from '../../Components/Form17A/RelationshipDates'
import BasicChildren from '../../Components/Form17A/BasicChildren'
import Subheading from '../shared/Subheading'
import CheckBox from '../shared/CheckBox'
import { CalculateIncome, CalculateAnnualIncome } from '../../../../utils/Apis/matters/CustomHook/Calculations'

const ONTFORM17C = ({ targetRef, matterId, onFormDataSave, savedData,setCourtNumber }) => {

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

  function formatDate(dateString) {
    // Parse the date string
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    // Return the formatted date
    return `${day}, ${month}, ${year}`;
  }

  function handleCheckBox(key, defaultVal = null) {
    return e => {
      const updatedFormData = { ...formData }; // Create a shallow copy of formData


      // Traverse the nested structure and update the value
      let nestedObj = updatedFormData;
      const keys = key.split('.'); // Split the key into an array using dot (.) separator

      // Handle checkbox specific behavior
      const value = e.target.checked ? true : false; // Use 'true' or 'false' based on checkbox state
      if(e.target.name==="court-number")
        {
          setCourtNumber(formData?.court_info?.courtFileNumber)
        }
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
      form_id: 'FORM17C',
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
                name={"court-number"}
              />
              <FormInfo
                number="17C"
                format={"Settlement Conference Brief - General"}
              />
            </Col>
          </Row>

          <div>
            <Row>
              <Col xs={6}>
                <div>
                  <BoldandThinText

                    bold={"Name of party filing this brief"}
                  />
                  <textarea className='w-100' rows={4}
                    value={formData?.party_filling?.details}
                    fillFormData={fillFormData('party_filling.details')}
                  />
                </div>

              </Col>
              <Col xs={6}>
                <div>
                  <BoldandThinText

                    bold={"Date of settlement conference"}
                  />
                  <textarea className='w-100' rows={4}
                    value={formData?.settlement_conference?.details}
                    fillFormData={fillFormData('settlement_conference.details')}
                  />
                </div>

              </Col>

            </Row>
          </div>

          <div>
            <Row className='py-2'>
              <ApplicationTable data={formData} type="two-rows" heading={'Applicant(s)'} applicant />
            </Row>
            <Row className='py-2'>
              <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Respondents(s)'} respondent />
            </Row>

            <Row>
              <div className=''>

                <div style={{ border: "1px solid black" }} className='px-0'>

                  <div className='px-3' style={{ borderBottom: "1px solid black" }}>
                    <BoldandThinText thin={"Name & address of Children’s Lawyer’s agent (street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)) and name of person represented."}
                    />
                  </div>

                  <textarea className='w-100' rows={4}
                    value={formData?.childrens_lawyer?.details}
                    fillFormData={fillFormData('childrens_lawyer.details')}
                  />
                </div>
              </div>
            </Row>

            {/* Family Facts */}
            <div>

              <Subheading heading={"PART 1: FAMILY FACTS"} />

              <ol>
                <li className='my-2'>
                  <div className="d-flex">

                    <div>
                      <BoldandThinText bold={"APPLICANT:"} centered />

                    </div>
                    <div className="d-flex mx-4">
                      <div className='form-check'>

                        <div className='data-input small m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>Age</span>
                          <input
                            type='text'
                            className='form-control small'
                            onChange={fillFormData}
                            value={calculateAge(formData?.applicant?.dateOfBirth)}
                          />

                        </div>
                      </div>
                      <div className='form-check'>

                        <div className='data-input small m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>Birthdate: (d, m, y)</span>
                          <input
                            type='text'
                            className='form-control small'
                            value={formatDate(formData?.applicant?.dateOfBirth)}
                            onChange={fillFormData}

                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>

                  </div>
                </li>
                <li className='my-2'>
                  <div className="d-flex">

                    <div>
                      <BoldandThinText bold={"RESPONDENT:"} centered />

                    </div>
                    <div className="d-flex mx-2">
                      <div className='form-check'>

                        <div className='data-input small m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>Age</span>
                          <input
                            type='text'
                            className='form-control small'
                            onChange={fillFormData}
                            value={calculateAge(formData?.respondent?.dateOfBirth)}
                          />
                        </div>
                      </div>
                      <div className='form-check'>

                        <div className='data-input small m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>Birthdate: (d, m, y)</span>
                          <input
                            type='text'
                            className='form-control small'
                            value={formatDate(formData?.respondent?.dateOfBirth)}
                            onChange={fillFormData}

                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>

                  </div>
                </li>

                <li className={"my-2"}>
                  <RelationshipDates formData={formData} fillFormData={fillFormData} />
                </li>

                <li className={"my-2"}>
                  <BasicChildren formData={formData} />
                </li>

                <Subheading heading={"PART 2: ISSUES"} />

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"What are the issues in this case that HAVE been settled:"} />

                    <Col xs={4}>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.decision_making?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.decision_making.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>decision-making responsibility</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.parenting_time?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.parenting_time.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>parenting time</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.contact?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.contact.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>contact</span>

                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={4}>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.spousal_support?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.spousal_support.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>spousal support</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.child_support?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.child_support.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>child support</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.restraining_order?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.restraining_order.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>restraining order</span>

                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={4}>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.possesion_home?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.possesion_home.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>possession of home</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.ownership_property?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.ownership_property.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>ownership of property</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item5?.net_family_property?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item5.net_family_property.isChecked')} // Pass 'true' as defaultVal
                            id='item5'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>equalization of net family property</span>

                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={12}>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name=''
                          checked={formData?.item5?.other?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item5.other.isChecked')} // Pass 'true' as defaultVal
                          id='item5'
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>other (Specify.)</span>
                          <input
                            type='text'
                            className='form-control small'
                            checked={formData?.item5?.other?.details} // Check against string 'true'
                            onChange={fillFormData('item5.other.details')} // Pass 'true' as defaultVal
                          />

                        </div>
                      </div>
                    </Col>
                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"What are the issues in this case that NOT been settled:"} />

                    <Col xs={4}>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.decision_making?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.decision_making.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>decision-making responsibility</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.parenting_time?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.parenting_time.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>parenting time</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.contact?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.contact.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>contact</span>

                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={4}>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.spousal_support?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.spousal_support.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>spousal support</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.child_support?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.child_support.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>child support</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.restraining_order?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.restraining_order.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>restraining order</span>

                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={4}>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.possesion_home?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.possesion_home.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>possession of home</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.ownership_property?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.ownership_property.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>ownership of property</span>

                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item6?.net_family_property?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item6.net_family_property.isChecked')} // Pass 'true' as defaultVal
                            id='item6'
                          />
                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'>equalization of net family property</span>

                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={12}>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name=''
                          checked={formData?.item6?.other?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item6.other.isChecked')} // Pass 'true' as defaultVal
                          id='item6'
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>other (Explain.)</span>
                          <input
                            type='text'
                            className='form-control small'
                            checked={formData?.item6?.other?.details} // Check against string 'true'
                            onChange={fillFormData('item6.other.details')} // Pass 'true' as defaultVal
                          />

                        </div>
                      </div>
                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"If child or spousal support is an issue, give the income of the parties:"} />

                    <div className="d-flex">
                      <div className='me-3'>
                        <div>
                          <div className='form-check px-0'>
                            <div className='data-input small' style={{ justifyContent: "start" }}>
                              <span className='label'>Applicant:</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className='form-check'>

                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'><b>$</b></span>
                            <input
                              type='text'
                              className='form-control small'
                              onChange={fillFormData}
                              value={CalculateAnnualIncome(formData, 'client')}
                            />
                            <span className="label"> per year for the year</span>
                            <input
                              type='text'
                              className='form-control small'
                              value={formData?.matter_data?.financial_year_income_benefits}
                              onChange={fillFormData('matter_data.financial_year_income_benefits')}
                            />

                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="d-flex">

                      <div>

                        <div>
                          <div className='form-check px-0'>

                            <div className='data-input small' style={{ justifyContent: "start" }}>
                              <span className='label'>Respondent:</span>

                            </div>
                          </div>
                        </div>

                      </div>

                      <div >
                        <div className='form-check'>

                          <div className='data-input small' style={{ justifyContent: "start" }}>
                            <span className='label'><b>$</b></span>
                            <input
                              type='text'
                              className='form-control small'
                              onChange={fillFormData}
                              value={CalculateAnnualIncome(formData, 'opposingParty')}

                            />
                            <span className="label"> per year for the year</span>
                            <input
                              type='text'
                              className='form-control small'
                              value={formData?.matter_data?.financial_year_income_benefits}
                              onChange={fillFormData('matter_data.financial_year_income_benefits')}
                            />

                          </div>
                        </div>

                      </div>
                    </div>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Have you explored any ways to settle the issues that are still in dispute in this case?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item8?.no?.isChecked || false}
                        labelinput={'item8.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item8?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes. (Give details.)`}
                        type='checkbox'
                        value={formData?.item8?.yes?.isChecked || false}
                        labelinput={'item8.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item8?.yes?.isChecked || false}
                      />

                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-0'
                        value={formData?.item8?.details}
                        fillFormData={fillFormData('item8.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Have you explored any ways to settle the issues that are still in dispute in this case?"} />

                    <Col xs={4}>

                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formData?.item9?.yes?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item9.yes.isChecked')} // Pass 'true' as defaultVal
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>Yes</span>

                        </div>
                      </div>

                    </Col>
                    <Col xs={4}>

                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formData?.item9?.order_dated?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item9.order_dated.isChecked')} // Pass 'true' as defaultVal
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>an order dated</span>
                          <input
                            type='text'
                            className='form-control small'
                            value={formData?.item9?.order_dated?.details}
                            onChange={fillFormData('item9.order_dated.details')}

                          />

                        </div>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formData?.item9?.written_agreement?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item9.written_agreement.isChecked')} // Pass 'true' as defaultVal
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>a written agreement that is attached.</span>

                        </div>
                      </div>

                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Have the parents attended a family law or parenting education session?"} />

                    <Col xs={6}>

                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formData?.item10?.no?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item10.no.isChecked')} // Pass 'true' as defaultVal
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>No. (Should they attend one?</span>
                          <input
                            type='text'
                            className='form-control small'
                            value={formData?.item10?.no?.details || false}
                            fillFormData={fillFormData('item10.no.details')}
                            onChange={fillFormData}

                          />
                          )

                        </div>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={formData?.item10?.yes?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item10.yes.isChecked')} // Pass 'true' as defaultVal
                        />
                        <div className='data-input small' style={{ justifyContent: "start" }}>
                          <span className='label'>Yes. <i>(Give details.)</i></span>
                        </div>
                      </div>


                    </Col>
                    <Col xs={12}>
                      <textarea className='form-control border-0 w-100'
                        value={formData?.item10?.yes?.details}
                        fillFormData={fillFormData('item10.yes.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <Subheading heading={'PART 3: ISSUES FOR THIS CASE CONFERENCE'} />

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"What are the issues for this case conference? What are the important facts for this case conference?"} />

                    <textarea
                      className='form-control border-0'
                      value={formData?.item11?.details}
                      fillFormData={fillFormData('item11.details')}
                      rows={4}
                    />

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"What is your proposal to resolve these issues?"} />

                    <textarea
                      className='form-control border-0'
                      value={formData?.item12?.details}
                      fillFormData={fillFormData('item12.details')}
                      rows={4}
                    />

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Do you want the court to make a temporary or final order at the case conference about any of these issues?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item13?.no?.isChecked || false}
                        labelinput={'item13.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item13?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes(Give Details)`}
                        type='checkbox'
                        value={formData?.item13?.yes?.isChecked || false}
                        labelinput={'item13.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item13?.yes?.isChecked || false}
                      />
                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-0'
                        value={formData?.item13?.details}
                        fillFormData={fillFormData('item13.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <Subheading heading={'PART 4: FINANCIAL INFORMATION'} />

                <div>

                  <small><b>NOTE: </b>If a claim for support has been made in this case, you must serve and file a new financial statement (Form 13 or 13.1), if it is different from the one filed in the continuing record or if the one in the continuing record is more than 30 days old. If there are minor changes but no major changes in your financial statement, you can serve and file an affidavit with details of the changes instead of a new financial statement. If you have not yet filed a financial statement in the continuing record, you must do it now. The page/tab number of the financial statement in the continuing record is

                  </small>
                </div>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"If a claim is being made for child support and a claim is made for special expenses under the child support guidelines, give details of those expenses or attach additional information."} />

                    <textarea
                      className='form-control border-0'
                      value={formData?.item14?.details}
                      fillFormData={fillFormData('item14.details')}
                      rows={4}
                    />

                  </Row>

                </li>
                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"If a claim is made for child support and you claim that the Child Support Guidelines table amount should not be ordered, briefly outline the reasons here or attach an additional page."} />

                    <textarea
                      className='form-control border-0'
                      value={formData?.item15?.details}
                      fillFormData={fillFormData('item15.details')}
                      rows={4}
                    />

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"If parenting issues are not yet settled:"} />
                    <BoldandThinText thin={"(a) Is a parenting assessment needed?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item16?.a?.no?.isChecked || false}
                        labelinput={'item16.a.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item16?.a?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes. (Give Details)`}
                        type='checkbox'
                        value={formData?.item16?.a?.yes?.isChecked || false}
                        labelinput={'item16.a.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item16?.a?.yes?.isChecked || false}
                      />

                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item16?.a?.details}
                        fillFormData={fillFormData('item16.a.details')}
                        rows={4}
                      />
                    </Col>

                    <BoldandThinText thin={`(b) Does a child or a parent under 18 years of age need legal representation from the Office of the
Children’s Lawyer?`} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item16?.b?.no?.isChecked || false}
                        labelinput={'item16.b.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item16?.b?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes. (Give Details)`}
                        type='checkbox'
                        value={formData?.item16?.b?.yes?.isChecked || false}
                        labelinput={'item16.yes.b.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item16?.b?.yes?.isChecked || false}
                      />

                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item16?.b?.details}
                        fillFormData={fillFormData('item16.b.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Does any party need an order for the disclosure of documents, the questioning of witnesses, a property valuation or any other matter in this case?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item17?.no?.isChecked || false}
                        labelinput={'item17.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item17?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes. (Give Details)`}
                        type='checkbox'
                        value={formData?.item17?.yes?.isChecked || false}
                        labelinput={'item17.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item17?.yes?.isChecked || false}
                      />

                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item17?.details}
                        fillFormData={fillFormData('item17.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Are any other procedural orders needed?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item18?.no?.isChecked || false}
                        labelinput={'item18.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item18?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes (give Details)`}
                        type='checkbox'
                        value={formData?.item18?.yes?.isChecked || false}
                        labelinput={'item18.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item18?.yes?.isChecked || false}
                      />



                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item18?.details}
                        fillFormData={fillFormData('item18.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Have all the persons who should be parties in this case been added as parties?"} />
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={`Yes.`}
                        type='checkbox'
                        value={formData?.item19?.yes?.isChecked || false}
                        labelinput={'item19.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item19?.yes?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No(Who needs to be added?)'}
                        type='checkbox'
                        value={formData?.item19?.no?.isChecked || false}
                        labelinput={'item19.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item19?.no?.isChecked || false}
                      />


                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item19?.details}
                        fillFormData={fillFormData('item19.details')}
                        rows={4}
                      />
                    </Col>


                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Are there issues that may require expert evidence or a report?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item20?.no?.isChecked || false}
                        labelinput={'item20.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item20?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={8}>
                      <CheckBox
                        id="special_service"
                        label={`Yes(If yes, provide details such as: the type of expert evidence; whether the parties will be retaining a joint expert; who the expert will be; who will be paying the expert; how long it will take to obtain a report, etc.)`}
                        type='checkbox'
                        value={formData?.item20?.yes?.isChecked || false}
                        labelinput={'item20.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item20?.yes?.isChecked || false}
                      />



                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item20?.details}
                        fillFormData={fillFormData('item20.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

                <li className={"my-2"}>
                  <Row>
                    <BoldandThinText thin={"Are there any other issues that should be reviewed at the case conference?"} />

                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'No.'}
                        type='checkbox'
                        value={formData?.item21?.no?.isChecked || false}
                        labelinput={'item21.no.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item21?.no?.isChecked || false}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        id="special_service"
                        label={'Yes(Give Details)'}
                        type='checkbox'
                        value={formData?.item21?.yes?.isChecked || false}
                        labelinput={'item21.yes.isChecked'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item21?.yes?.isChecked || false}
                      />



                    </Col>
                    <Col className='mt-2' xs={12}>
                      <textarea
                        className='form-control border-1'
                        value={formData?.item21?.details}
                        fillFormData={fillFormData('item21.details')}
                        rows={4}
                      />
                    </Col>

                  </Row>

                </li>

              </ol>
            </div>

          </div>

          <Row>
            <Col xs={6}>
              <BorderLessInput
                label={"Date of party’s signature"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'signature.party.date'}
                value={formData?.signature?.party?.date}
                style={{ padding: "6px 0" }}
              />
            </Col>
            <Col xs={6}>
              <BorderLessInput
                label={"Signature of party"}
                type={"text"}
                fileno
                onChange={fillFormData}
                style={{ padding: "6px 0" }}
              />
            </Col>
            <Col xs={6}>
              <BorderLessInput
                label={"Date of lawyer’s signature"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'signature.lawyer.date'}
                value={formData?.signature?.lawyer?.date}
                style={{ padding: "6px 0" }}
              />
            </Col>
            <Col xs={6}>
              <BorderLessInput
                label={"Signature of party’s lawyer"}
                type={"text"}
                fileno
                onChange={fillFormData}
                style={{ padding: "6px 0" }}
              />
            </Col>
          </Row>

        </div>
      )}
    </>
  )
}

export default ONTFORM17C