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
import CheckBox from '../shared/CheckBox'
import { emptyExpert, emptyWitness } from '../../../../utils/matterData/emptyDataArray'
import FormCustomInput from '../shared/FormCustomInput'

const ONTFORM17E = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
      form_id: 'FORM17E',
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
                number="17E"
                format={"Trial Management Conference Brief"}
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
                  <textarea className='w-100' rows={4} />
                </div>

              </Col>
              <Col xs={6}>
                <div>
                  <BoldandThinText

                    bold={"Date of trial management conference"}
                  />
                  <textarea className='w-100' rows={4} />
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
                    <BoldandThinText

                      thin={"Name & address of Children’s Lawyer’s agent (street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)) and name of person represented."}
                    />
                  </div>

                  <textarea rows={4} className='border-0 w-100' />
                </div>
              </div>
            </Row>

            <div className={"my-2"}>
              <Row>
                <BoldandThinText thin={"Are any of the parties First Nations, Inuit, or Métis?"} />

                <Col xs={3}>
                  <CheckBox
                    label={`No`}
                    type='checkbox'
                    value={'no'}
                    labelinput={'procedural_matters.checked'}
                    fillFormData={fillFormData}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.procedural_matters?.checked === 'no'}
                  />

                </Col>
                <Col xs={9}>
                  <CheckBox
                    id="procedural_matters"
                    type='checkbox'
                    value={'yes'}
                    labelinput={'procedural_matters.checked'}
                    fillFormData={fillFormData}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.procedural_matters?.checked === 'yes'}
                    inline
                  />
                  <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                    <span className='label'>Yes (Who?)</span>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.affirm?.item3?.leave_copy_other?.name} // Check against string 'true'
                      onChange={fillFormData('affirm.item3.leave_copy_other.name')} // Pass 'true' as defaultVal
                    />
                  </div>
                </Col>

              </Row>

            </div>

            <ol>

              <BoldandThinText centered bold={"PART 1: THE ISSUES"} />

              <li >
                <BoldandThinText thin={"What are the issues in this case that HAVE been settled or about which an order has been made:"} />

                <Row>
                  <Col xs={2}>
                    <BoldandThinText italic thin={"Child protection cases"} />
                  </Col>
                  <Col xs={10}>
                    <Row>
                      <Col xs={4} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='access'
                            checked={formData?.childProtectionCases?.access} // Check against string 'true'
                            onChange={handleCheckBox('childProtectionCases.access')} // Pass 'true' as defaultVal
                            id='childProtectionCases'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>access</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={8} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='need_protection'
                            checked={formData?.childProtectionCases?.need_protection} // Check against string 'true'
                            onChange={handleCheckBox('childProtectionCases.need_protection')} // Pass 'true' as defaultVal
                            id='childProtectionCases'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>finding in need of protection</span>

                          </div>
                        </div>
                      </Col>

                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='placing'
                          checked={formData?.childProtectionCases?.placing?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('childProtectionCases.placing.isChecked')} // Pass 'true' as defaultVal
                          id='childProtectionCases'
                        />
                        <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                          <span className='label'>placing the child(ren) with <i>(name of person)</i></span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.childProtectionCases?.placing?.person_name}
                            onChange={fillFormData('childProtectionCases.placing.person_name')}
                          />

                        </div>
                      </div>
                      <div className='form-check'>

                        <div className='data-input' style={{ justifyContent: "start" }}>
                          <span className='label'>for</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.childProtectionCases?.placing?.duration}
                            onChange={fillFormData('childProtectionCases.placing.duration')}

                          />
                          <span className='label'>months under supervision.</span>

                        </div>
                      </div>

                      <Col xs={7} className='px-0'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            checked={formData?.childProtectionCases?.interim_care?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('childProtectionCases.interim_care.isChecked')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                            <span className='label'>interim society care for</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.childProtectionCases?.interim_care?.duration}
                              onChange={fillFormData('childProtectionCases.placing.interim_care.duration')}
                            />
                            <span className="label">months.</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={5} >
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            checked={formData?.childProtectionCases?.extended_care} // Check against string 'true'
                            onChange={handleCheckBox('childProtectionCases.extended_care')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>extended society care.</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={12} className='px-0'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            checked={formData?.childProtectionCases?.other?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('childProtectionCases.other.isChecked')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>other (Specify.)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              checked={formData?.childProtectionCases?.other?.details} // Check against string 'true'
                              onChange={fillFormData('childProtectionCases.other.details')} // Pass 'true' as defaultVal
                            />

                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className='py-2'>
                  <Col xs={2}>
                    <BoldandThinText italic thin={"All other cases"} />
                  </Col>
                  <Col xs={10}>
                    <Row>
                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.child_support} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.child_support')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>child support</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.decision_making} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.decision_making')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>decision-making responsibility</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.entitlement} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.entitlement')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>entitlement</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.parenting_time} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.parenting_time')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>parenting time</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.payor_income} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.payor_income')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>payor’s income</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.contact} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.contact')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>contact</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.retro_child_support} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.retro_child_support')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>retroactive child support</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.spousal_support} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.spousal_support')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>spousal support</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.extraordinary_expenses} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.extraordinary_expenses')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>special or extraordinary expenses</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.restraining_order} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.restraining_order')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>restraining order</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={12} className='px-0'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.otherCases?.other?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('otherCases.other.isChecked')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>other (Specify.)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.otherCases?.other?.details}
                              onChange={fillFormData('otherCases.other.details')} // Pass 'true' as defaultVal

                            />

                          </div>
                          <small>Attach a copy of any agreement that the judge should read to prepare for the trial management conference.</small>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </li>

              <li>
                <BoldandThinText thin={"Where is the child living at the time of this conference?"} />
                <textarea className='border-0 w-100' rows={3} value={formData?.child_current?.address} onChange={fillFormData('child_current.address')}></textarea>

              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Are any of the issues in this case urgent?"} />

                  <Col xs={3}>

                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name=''
                        checked={formData?.item3?.is_urgent?.no?.isChecked} // Check against string 'true'
                        onChange={handleCheckBox('item3.is_urgent.no.isChecked')} // Pass 'true' as defaultVal
                      />
                      <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label'>No.</span>

                      </div>
                    </div>

                  </Col>
                  <Col xs={9}>

                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={formData?.item3?.is_urgent?.yes?.isChecked} // Check against string 'true'
                        onChange={handleCheckBox('item3.is_urgent.yes.isChecked')} // Pass 'true' as defaultVal
                      />

                      <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label'>Yes  (Identify the issues and give details of why the issues are urgent.)</span>

                      </div>

                    </div>

                  </Col>
                  <Col className='mt-2' xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item3?.details}
                      onChange={fillFormData('item3.details')}
                      rows={4}
                    />
                  </Col>

                </Row>

              </li>

              <li >
                <BoldandThinText thin={"What are the issues in this case that NOT been settled or about which an order has been made:"} />

                <Row>
                  <Col xs={2}>
                    <BoldandThinText italic thin={"Child protection cases"} />
                  </Col>
                  <Col xs={10}>
                    <Row>
                      <Col xs={4} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='access'
                            checked={formData?.item4?.childProtectionCases?.access || false} // Check against string 'true'
                            onChange={handleCheckBox('item4.childProtectionCases.access')} // Pass 'true' as defaultVal
                            id='childProtectionCases'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>access</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={8} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='need_protection'
                            checked={formData?.item4?.childProtectionCases?.need_protection} // Check against string 'true'
                            onChange={handleCheckBox('item4.childProtectionCases.need_protection')} // Pass 'true' as defaultVal
                            id='childProtectionCases'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>finding in need of protection</span>

                          </div>
                        </div>
                      </Col>

                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='placing'
                          checked={formData?.item4?.childProtectionCases?.placing?.isChecked} // Check against string 'true'
                          onChange={handleCheckBox('item4.childProtectionCases.placing.isChecked')} // Pass 'true' as defaultVal
                          id='childProtectionCases'
                        />
                        <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                          <span className='label'>placing the child(ren) with <i>(name of person)</i></span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item4?.childProtectionCases?.placing?.person_name}
                            onChange={fillFormData('childProtectionCases.placing.person_name')}
                          />

                        </div>
                      </div>
                      <div className='form-check'>

                        <div className='data-input' style={{ justifyContent: "start" }}>
                          <span className='label'>for</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item4?.childProtectionCases?.placing?.duration}
                            onChange={fillFormData('childProtectionCases.placing.duration')}

                          />
                          <span className='label'>months under supervision.</span>

                        </div>
                      </div>

                      <Col xs={7} className='px-0'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            checked={formData?.item4?.childProtectionCases?.interim_care?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item4.childProtectionCases.interim_care.isChecked')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                            <span className='label'>interim society care for</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item4?.childProtectionCases?.interim_care?.duration}
                              onChange={fillFormData('childProtectionCases.placing.interim_care.duration')}
                            />
                            <span className="label">months.</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={5} >
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            checked={formData?.item4?.childProtectionCases?.extended_care} // Check against string 'true'
                            onChange={handleCheckBox('item4.childProtectionCases.extended_care')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>extended society care.</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={12} className='px-0'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='relationship_status'
                            checked={formData?.item4?.childProtectionCases?.other?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item4.childProtectionCases.other.isChecked')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>other (Specify.)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              checked={formData?.item4?.childProtectionCases?.other?.details} // Check against string 'true'
                              onChange={fillFormData('childProtectionCases.other.details')} // Pass 'true' as defaultVal
                            />

                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className='py-2'>
                  <Col xs={2}>
                    <BoldandThinText italic thin={"All other cases"} />
                  </Col>
                  <Col xs={10}>
                    <Row>
                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.child_support} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.child_support')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>child support</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.decision_making} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.decision_making')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>decision-making responsibility</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.entitlement} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.entitlement')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>entitlement</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.parenting_time} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.parenting_time')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>parenting time</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.payor_income} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.payor_income')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>payor’s income</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.contact} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.contact')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>contact</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.retro_child_support} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.retro_child_support')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>retroactive child support</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.spousal_support} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.spousal_support')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>spousal support</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={5} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.extraordinary_expenses} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.extraordinary_expenses')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>special or extraordinary expenses</span>

                          </div>
                        </div>
                      </Col>
                      <Col xs={7} className='px-0'>

                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.restraining_order} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.restraining_order')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>restraining order</span>

                          </div>
                        </div>
                      </Col>

                      <Col xs={12} className='px-0'>
                        <div className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={formData?.item4?.otherCases?.other?.isChecked} // Check against string 'true'
                            onChange={handleCheckBox('item4.otherCases.other.isChecked')} // Pass 'true' as defaultVal
                            id='married_on'
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>other (Specify.)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item4?.otherCases?.other?.details}
                              onChange={fillFormData('otherCases.other.details')} // Pass 'true' as defaultVal

                            />

                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </li>

              <BoldandThinText centered bold={"PART 2: ISSUES FOR TRIAL"} />

              <li>
                <BoldandThinText thin={"Attach an outline of your opening statement for the trial, including:"} />
                <BoldandThinText thin={`(a) what you consider to be the undisputed facts;`} />
                <BoldandThinText thin={`(b) the theory of your case on the disputed issues;`} />
                <BoldandThinText thin={`(c) a brief summary of the evidence you plan to present at trial; and`} />
                <BoldandThinText thin={`(d) the orders you are asking the trial judge to make.`} />

              </li>
              <li>
                <BoldandThinText thin={`(a) These are the witnesses whom I plan to have testify for me, the topics about which they will testify and my current estimate of the length of time for the testimony of each witness, including cross-examination:`} />
                <table className='pb-40px form-8a-children w-100'>
                  <thead>
                    <tr>
                      <th >Name of witness</th>
                      <th >Topic about which witness will testify</th>
                      <th >Current time estimate for witness</th>

                    </tr>
                  </thead>
                  <tbody>
                    {emptyWitness && emptyWitness?.map((item, index) => (
                      <>
                        <tr key={index}>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="fullLegalName"
                              value={item.name || formData?.witnessTable?.name}
                              onChange={fillFormData(`witnessTable.${index}.name`)}
                            />
                          </td>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="age"
                              value={item.topic || formData?.witnessTable?.topic}
                              onChange={fillFormData(`witnessTable.${index}.topic`)}
                            />
                          </td>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="birthdate"
                              value={item.time_estimate || formData?.witnessTable?.time_estimate}
                              onChange={fillFormData(`witnessTable.${index}.time_estimate`)}
                            />
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>

                <BoldandThinText thin={`(b) These are the expert witnesses whom I plan to have testify, their areas of expertise, and my current estimate of
the length of time for the testimony of each witness, including cross-examination:`} />
                <table className='pb-40px form-8a-children w-100'>
                  <thead>
                    <tr>
                      <th >Name of expert</th>
                      <th style={{ minWidth: "200px" }}>Expert report and CV filed? (Yes or No)</th>
                      <th >Area of expertise</th>
                      <th >Qualifications admitted? (Yes or No)</th>
                      <th >Current time estimate for witness</th>

                    </tr>
                  </thead>
                  <tbody>
                    {emptyExpert && emptyExpert?.map((item, index) => (
                      <>
                        <tr key={index}>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="fullLegalName"
                              value={item.name || formData?.expertTable?.name}
                              onChange={fillFormData(`expertTable.${index}.name`)}
                            />
                          </td>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="age"
                              value={item.cv_on_file || formData?.expertTable?.cv_on_file}
                              onChange={fillFormData(`expertTable.${index}.cv_on_file`)}
                            />
                          </td>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="age"
                              value={item.cv_on_file || formData?.expertTable?.cv_on_file}
                              onChange={fillFormData(`expertTable.${index}.cv_on_file`)}
                            />
                          </td>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="age"
                              value={item.qualification || formData?.expertTable?.qualification}
                              onChange={fillFormData(`expertTable.${index}.qualification`)}
                            />
                          </td>
                          <td>
                            <input
                              className='custom-input-control py-1'
                              name="birthdate"
                              value={item.time_estimate || formData?.expertTable?.time_estimate}
                              onChange={fillFormData(`expertTable.${index}.time_estimate`)}
                            />
                          </td>
                        </tr>
                      </>
                    ))}

                  </tbody>
                </table>

              </li>

              <li>

                  <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                    <span className='label'>I estimate that the trial time needed for my part of this trial is</span>
                    <FormCustomInput
                      type='text'
                      fillFormData={fillFormData}
                      update={'item7.estimate'}
                      value={formData?.item7?.estimate}
                      small
                    />

                    <span className='label'>days; the other side’s part of this trial is</span>
                    <br />
                    <FormCustomInput
                      type='text'
                      fillFormData={fillFormData}
                      update={'item7.days'}
                      value={formData?.item7?.days}
                      small
                    />
                    {/* <input
                      type='text'
                      className='custom-input-control'
                      onChange={fillFormData('item7.days')}
                      value=""
                    /> */}
                    <span>days.</span>
                  </div>

              </li>


              <Row className='mt-4'>
                <p class="paragraph small text-center">
                  <span class="sub-heading">
                    PART 3: PROCEDURAL MATTERS
                  </span>
                </p>
              </Row>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Have the parties signed a statement of agreed facts?"} />
                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={`Yes. (Attach a copy.)`}
                      type='checkbox'
                      value={'yes'}
                      labelinput={'item8.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item8?.checked === 'yes'}
                    />
                  </Col>
                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={'No. (Explain why not.)'}
                      type='checkbox'
                      value={'no'}
                      labelinput={'item8.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item8?.checked === 'no'}
                    />
                  </Col>
                  <Col className='mt-2' xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item8?.details}
                      onChange={fillFormData('item8.details')}
                      rows={4}
                    />
                  </Col>
                </Row>
              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Have the parties finished the disclosing of documents and the questioning of witnesses?"} />
                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={`Yes.`}
                      type='checkbox'
                      value={'yes'}
                      labelinput={'item9.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item9?.checked === 'yes'}
                    />
                  </Col>
                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={'No.(Indicate what has not been done.)'}
                      type='checkbox'
                      value={'no'}
                      labelinput={'item9.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item9?.checked  === 'no'}
                    />
                  </Col>
                  <Col className='mt-2' xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item9?.details}
                      onChange={fillFormData('item9.details')}
                      rows={4}
                    />
                  </Col>
                </Row>
              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Are there any expert reports that you intend to rely on at trial?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={`No.`}
                      type='checkbox'
                      value={'no'}
                      labelinput={'item10.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item10?.checked  === 'no'}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Give details about the reports such as who prepared them and the issues addressed.)'}
                      type='checkbox'
                      value={'yes'}
                      labelinput={'item10.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item10?.checked  === 'yes'}
                    />
                  </Col>
                  <Col className='mt-2' xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item10?.details}
                      onChange={fillFormData('item10.details')}
                      rows={4}
                    />
                  </Col>

                </Row>

              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Have all of the reports you intend to rely on been provided to all of the parties and the Children’s Lawyer (if involved)?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={`No.`}
                      type='checkbox'
                      value={'no'}
                      labelinput={'item11.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item11?.checked === 'no'}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Give details about the reports such as who prepared them and the issues addressed.)'}
                      type='checkbox'
                      value={'yes'}
                      labelinput={'item11.checked'}
                      fillFormData={fillFormData}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item11?.checked === 'yes'}
                    />
                  </Col>

                  <BoldandThinText thin={"If no, when will they be provided?"} />

                  <textarea
                    className='form-control border-1'
                    value={formData?.item11?.details}
                    onChange={fillFormData('item11.details')}
                    rows={4}
                  />

                </Row>
                
              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Attach a list of the relevant orders in this case."} />

                </Row>

              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Are there any orders or directions for trial that have not been carried out?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={`No.`}
                      type='checkbox'
                      value={formData?.item13?.no?.isChecked || false}
                      labelinput={'item13.no.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item13?.no?.isChecked || false}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Explain)'}
                      type='checkbox'
                      value={formData?.item13?.yes?.isChecked || false}
                      labelinput={'item13.yes.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item13?.yes?.isChecked || false}
                    />
                  </Col>
                  <Col xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item13?.details}
                      onChange={fillFormData('item13.details')}
                      rows={4}
                    />
                  </Col>
                </Row>

              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={" Have the parties produced a joint document brief?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Attach a copy.)'}
                      type='checkbox'
                      value={formData?.item14?.yes?.isChecked || false}
                      labelinput={'item14.yes.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item14?.yes?.isChecked || false}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={`No. (Explain why not.)`}
                      type='checkbox'
                      value={formData?.item14?.no?.isChecked || false}
                      labelinput={'item14.no.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item14?.no?.isChecked || false}
                    />

                  </Col>
                  <Col xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item14?.details}
                      onChange={fillFormData('item14.details')}
                      rows={4}
                    />
                  </Col>
                </Row>
              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={" Has an order been made for affidavit evidence at trial?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Attach a copy.)'}
                      type='checkbox'
                      value={formData?.item15?.yes?.isChecked || false}
                      labelinput={'item15.yes.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item15?.yes?.isChecked || false}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={`No. (Explain why not.)`}
                      type='checkbox'
                      value={formData?.item15?.no?.isChecked || false}
                      labelinput={'item15.no.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item15?.no?.isChecked || false}
                    />

                  </Col>
                  <Col xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item15?.details}
                      onChange={fillFormData('item15.details')}
                      rows={4}
                    />
                  </Col>

                </Row>
              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Are there any preliminary or procedural matters that need to be dealt with before or at the start of the trial?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={`No. (Explain why not.)`}
                      type='checkbox'
                      value={formData?.item16?.no?.isChecked || false}
                      labelinput={'item16.no.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item16?.no?.isChecked || false}
                    />

                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Explain.)'}
                      type='checkbox'
                      value={formData?.item16?.yes?.isChecked || false}
                      labelinput={'item16.yes.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item16?.yes?.isChecked || false}
                    />

                  </Col>
                  <Col xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item16?.details}
                      onChange={fillFormData('item16.details')}
                      rows={4}
                    />
                  </Col>

                </Row>

              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Have all parties been served?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Attach a copy.)'}
                      type='checkbox'
                      value={formData?.item17?.yes?.isChecked || false}
                      labelinput={'item17.yes.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item17?.yes?.isChecked || false}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={`No. (Explain.)`}
                      type='checkbox'
                      value={formData?.item17?.no?.isChecked || false}
                      labelinput={'item17.no.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item17?.no?.isChecked || false}
                    />

                  </Col>
                  <Col xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item17?.details}
                      onChange={fillFormData('item17.details')}
                      rows={4}
                    />
                  </Col>

                </Row>

              </li>

              <li className={"my-2"}>
                <Row>
                  <BoldandThinText thin={"Have you served a request to admit?"} />

                  <Col xs={4}>
                    <CheckBox
                      id="special_service"
                      label={'Yes.(Attach a copy.)'}
                      type='checkbox'
                      value={formData?.item18?.yes?.isChecked || false}
                      labelinput={'item18.yes.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item18?.yes?.isChecked || false}
                    />
                  </Col>
                  <Col xs={8}>
                    <CheckBox
                      id="special_service"
                      label={`No. (Explain.)`}
                      type='checkbox'
                      value={formData?.item18?.no?.isChecked || false}
                      labelinput={'item18.no.isChecked'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.item18?.no?.isChecked || false}
                    />

                  </Col>
                  <Col xs={12}>
                    <textarea
                      className='form-control border-1'
                      value={formData?.item18?.details}
                      onChange={fillFormData('item18.details')}
                      rows={4}
                    />
                  </Col>

                </Row>

              </li>
            </ol>

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

export default ONTFORM17E