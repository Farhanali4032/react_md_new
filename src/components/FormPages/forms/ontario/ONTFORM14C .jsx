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

const ONTFORM14C = ({ targetRef, matterId, onFormDataSave, savedData, courtNumber, setCourtNumber }) => {

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
  console.log("🚀 ~ ONTFORM14C ~ documentInfo:", documentInfo)

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
      form_id: 'FORM14C',
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
                value={formData?.court_info?.courtName}
                style={{ padding: "6px 0" }}

              />
              <BorderLessInput
                label={"Court Office Address"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'courtOfficeAddress'}
                value={formData?.court_info?.courtOfficeAddress}
                style={{ padding: "6px 0" }}

              />
            </Col>
            <Col xs={3}>
              <BorderLessInput
                value={formData?.court_info?.courtFileNumber}
                label={"Court File Number"}
                type={"text"}
                onChange={fillFormData}
                update={"courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
                name="court-number"
              />
              <FormInfo
                number="14C"
                format={"Confirmation of Motion"}
              />
            </Col>
          </Row>
          <div>

            <Row className='pb-3'>
              <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Applicant(s)'} applicant />
            </Row>
            <Row className='pb-3'>
              <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Respondents(s)'} respondent />
            </Row>


            <Row>
              <div className=''>

                <div style={{ border: "1px solid black" }} className='px-0'>

                  <div className='px-3' style={{ borderBottom: "1px solid black" }}>
                    <BoldandThinText thin={"Name & address of Children’s Lawyer’s agent (street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)) and name of person represented."}
                    />
                  </div>

                  <textarea
                    className='form-control border-0'
                    rows={4}
                    value={formData?.childrens_lawyer?.details}
                    fillFormData={fillFormData('childrens_lawyer.details')}
                  />
                </div>
              </div>
            </Row>

            <div className='orderlist'>
              <ol>

                <li>
                  <div className='form-check px-0'>

                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>My name is <i>(full legal name)</i></span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.applicant?.fullLegalName}
                        onChange={fillFormData('applicant.fullLegalName')}

                      />
                    </div>


                  </div>
                  <Row>
                    <Col xs={2}>
                      <span className='label'>and I am</span>

                    </Col>
                    <Col xs={10}>
                      <div className='form-check px-0'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='lawyer'
                          id='married_on'
                          checked={formData?.item1?.lawyer?.isChecked}
                          onChange={
                            handleCheckBox('item1.lawyer.isChecked')
                          }
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                          <span className='label'>the lawyer for (name)</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item1?.lawyer?.details || formData?.applicantsLawyer?.fullLegalName}
                            onChange={fillFormData('item1.lawyer.details')}
                          />
                        </div>


                      </div>

                      <Row >

                        <Col xs={6} >
                          <div className='form-check px-0'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              name='applicant'
                              id='married_on'
                              checked={formData?.item1?.applicant?.isChecked}
                              onChange={
                                handleCheckBox('item1.applicant.isChecked')
                              }
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                              <span className='label'>the applicant in this case</span>
                            </div>


                          </div>

                        </Col>
                        <Col xs={6} className='px-0'>
                          <div className='form-check px-0'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              name='respondent'
                              id='married_on'
                              checked={formData?.item1?.respondent?.isChecked}
                              onChange={
                                handleCheckBox('item1.respondent.isChecked')
                              }
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                              <span className='label'>the respondent in this case</span>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <div className='form-check px-0'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='other_specify'
                          id='married_on'
                          checked={formData?.item1?.other_specify?.isChecked}
                          onChange={
                            handleCheckBox('item1.other_specify.isChecked')
                          }
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                          <span className='label'>other <i>(specify)</i></span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item1?.other_specify?.details}
                            onChange={fillFormData}
                          />
                        </div>


                      </div>


                    </Col>
                  </Row>


                </li>

                <li>
                  <div>
                    <span className='label text-wrap'>

                      Have you conferred with the opposing counsel or party regarding the issues, motion material, and time estimates,
                      as set out in paragraphs 3 to 10 below?

                    </span>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='Yes'
                        id='married_on'
                        checked={formData?.item2?.yes?.isChecked}
                        onChange={
                          handleCheckBox('item2.yes.isChecked')
                        }
                      />
                      <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label'>Yes</span>


                      </div>
                    </div>

                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='no'
                        id='married_on'
                        checked={formData?.item2?.no?.isChecked}
                        onChange={
                          handleCheckBox('item2.no.isChecked')
                        }
                      />
                      <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label'>No, because (provide reasons)</span>


                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        className='border-0 w-100'
                        value={formData?.item2?.no?.details}
                        onChange={fillFormData('item2.no.details')} />
                    </div>
                  </div>

                </li>

                <div>
                  <span className='label text-wrap'>

                    <b> NOTE:</b>

                    The Family Law Rules require the parties or their counsel to confer, or attempt to confer, orally or in writing with each other on the issues in dispute for a motion prior to filing Confirmations. The only exception is where a party is prohibited from such communication by court order.

                    <b>Failure to comply with the Family Law Rules may result in a cost order.</b>

                  </span>
                </div>

                <li>
                  <Row>
                    <Col xs={7}>
                      <div className='form-check px-0'>

                        <div className='data-input' style={{ justifyContent: "start" }}>
                          <span className='label'>The scheduled date and time for this motion is (date)</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item3?.date}
                            onChange={fillFormData('item3.date')}
                          />
                        </div>


                      </div>
                    </Col>
                    <Col xs={1}>
                      <span className='label text-wrap'>at</span>

                    </Col>
                    <Col xs={4}>
                      <div className="d-flex justify-content-around">


                        <div className='form-check px-0'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='no'
                            id='married_on'
                            checked={formData?.item3?.am?.isChecked}
                            onChange={
                              handleCheckBox('item3.am.isChecked')
                            }
                          />
                          <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                            <span className='label'>a.m</span>

                          </div>


                        </div>
                        <div className='form-check px-0'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            name='no'
                            id='married_on'
                            checked={formData?.item3?.pm?.isChecked}
                            onChange={
                              handleCheckBox('item3.pm.isChecked')
                            }
                          />
                          <div className='data-input mt-0' style={{ justifyContent: "start" }}>
                            <span className='label'>p.m</span>

                          </div>


                        </div>
                      </div>

                    </Col>
                  </Row>
                </li>

                <li>
                  <span className='label text-wrap'> Has a case conference been held on the substantive issues in this case?</span>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='relationship_status'
                      id='married_on'
                      checked={formData?.item4?.yes?.isChecked}
                      onChange={
                        handleCheckBox('item4.yes.isChecked')
                      }
                    />
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>Yes, a case conference was held before Justice</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.item4?.yes?.details}
                        onChange={fillFormData('item4.yes.details')}
                      />


                    </div>


                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='relationship_status'
                      id='married_on'
                      checked={formData?.item4?.no?.isChecked}
                      onChange={
                        handleCheckBox('item4.no.isChecked')
                      }
                    />
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>No, a case conference has not been held on the substantive issues in this case.</span>

                    </div>


                  </div>

                </li>

                <li>
                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>The case management judge for this case is Justice</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control'
                          value={formData?.item5?.details}
                          onChange={fillFormData('item5.details')}
                        />
                      </div>
                    </div>
                  </div>

                </li>


                <li>
                  <span className='label text-wrap'>This matter is</span>
                  <div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='relationship_status'
                        id='married_on'
                        checked={formData?.item6?.issues_listed?.isChecked}
                        onChange={
                          handleCheckBox('item6.issues_listed.isChecked')
                        }
                      />
                      <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label'>going ahead on the issues listed in paragraph 7 below.</span>

                      </div>


                    </div>
                  </div>
                  <div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='relationship_status'
                        id='married_on'
                        checked={formData?.item6?.consent_order?.isChecked}
                        onChange={
                          handleCheckBox('item6.consent_order.isChecked')
                        }
                      />
                      <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label'>going ahead for a consent order (attach draft order).</span>

                      </div>


                    </div>
                  </div>

                  <div className='form-check '>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='relationship_status'
                      id='married_on'
                      checked={formData?.item6?.adjourned?.isChecked}
                      onChange={
                        handleCheckBox('item6.adjourned.isChecked')
                      }
                    />
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>being adjourned on consent to (date)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.item6?.adjourned?.date}
                        onChange={fillFormData('item6.adjourned.date')}

                      />
                      <span className='label'>for a (event)</span>


                    </div>
                    <div className='data-input' style={{ justifyContent: "start" }}>

                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.item6?.adjourned?.details}
                        onChange={fillFormData('item6.adjourned.details')}

                      />
                      <span className='label'>because (give reasons)</span>

                    </div>

                  </div>

                  <div>
                    <textarea rows={4} className='border-0 w-100' />
                  </div>

                  <div className='form-check '>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='relationship_status'
                      id='married_on'
                      checked={formData?.item6?.contested_adjourned?.isChecked}
                      onChange={
                        handleCheckBox('item6.contested_adjourned.isChecked')
                      }
                    />
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>going ahead for a contested adjournment to (date)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.item6?.contested_adjourned?.date}
                        onChange={fillFormData('item6.contested_adjourned.date')}

                      />
                      <span className='label'>asked for by (name of person asking</span>


                    </div>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>for adjournment)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.item6?.contested_adjourned?.person}
                        onChange={fillFormData('item6.contested_adjourned.person')}

                      />
                      <span className='label'>because (give reasons)</span>

                    </div>

                  </div>
                  <div>
                    <textarea
                      rows={4}
                      className='border-0 w-100'
                      value={formData?.item6?.contested_adjourned?.details}
                      onChange={fillFormData('item6.contested_adjourned.details')} />
                  </div>
                </li>

                <li>

                  <span className='label text-wrap'>What specific orders are you seeking on this motion? (List the specific orders below)</span>


                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>(a)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control border-0'
                          value={formData?.item7?.a?.details}
                          onChange={fillFormData('item7.a.details')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>(b)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control border-0'
                          value={formData?.item7?.b?.details}
                          onChange={fillFormData('item7.b.details')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>(c)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control border-0'
                          value={formData?.item7?.c?.details}
                          onChange={fillFormData('item7.c.details')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>(d)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control border-0'
                          value={formData?.item7?.d?.details}
                          onChange={fillFormData('item7.d.details')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>(e)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control border-0'
                          value={formData?.item7?.e?.details}
                          onChange={fillFormData('item7.e.details')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='data-input'>
                      <span className='label'>(f)</span>
                    </div>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='text'
                          className='custom-input-control border-0'
                          value={formData?.item7?.f?.details}
                          onChange={fillFormData('item7.f.details')}
                        />
                      </div>
                    </div>
                  </div>

                </li>

                <li className='py-2'>

                  <div className='form-check '>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='relationship_status'
                      id='married_on'
                      checked={formData?.item6?.contested_adjourned?.isChecked}
                      onChange={
                        handleCheckBox('item6.contested_adjourned.isChecked')
                      }
                    />
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>I confirm that I will bring a draft order to the motion.</span>
                    </div>


                  </div>
                </li>


                <li>
                  <span className='label text-wrap'>The presiding judge will be referred to the following pages/tabs:</span>
                  <div>
                    <textarea
                      className='border-0 w-100'
                      rows={5}
                      value={formData?.item9?.details}
                      onChange={fillFormData('item9details')}
                    />
                  </div>

                </li>


                <li>

                  <Row>
                    <Col xs={4}>

                      <div className='d-flex'>
                        <div className='data-input'>
                          <span className='label'>Time estimate: applicant:</span>
                        </div>
                        <div className='w-100'>
                          <div className='data-input mt-2'>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item10?.time?.applicant}
                              onChange={fillFormData('item10.time.applicant')}
                            />
                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={3}>

                      <div className='d-flex'>
                        <div className='data-input'>
                          <span className='label'>minutes; respondent:</span>
                        </div>
                        <div className='w-100'>
                          <div className='data-input mt-2'>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item10?.time?.respondent}
                              onChange={fillFormData('item10.time.respondent')}
                            />
                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={4}>

                      <div className='d-flex'>
                        <div className='data-input'>
                          <span className='label'>minutes; for a total of</span>
                        </div>
                        <div className='w-100'>
                          <div className='data-input mt-2'>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item10?.time?.total}
                              onChange={fillFormData('item10.time.total')}
                            />
                          </div>
                        </div>
                      </div>

                    </Col>
                    <Col xs={1}>


                      <div className='data-input'>
                        <span className='label'>minutes</span>
                      </div>

                    </Col>
                  </Row>

                  <div>
                    <span className='label text-wrap'>

                      <b> NOTE:</b> The Family Law Rules require you to <b>deliver a copy</b> of this form to the opposing lawyer or party, unless this is a child protection matter. For clarification, regular or special service and an accompanying Affidavit of Service (Form 6B) under rule 6 of the Family Law Rules are not required. However, you must deliver this form by some method (including fax or e-mail) to the opposing lawyer or party prior to giving a copy to the court clerk.

                    </span>
                  </div>

                  <Row>

                    <Col xs={6}>
                      <BorderLessInput
                        type={"municipality"}
                        label={"Date of Signature"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.date'}
                        value={formData?.signature?.date}
                        style={{ padding: "6px 0" }}

                      />

                    </Col>
                    <Col xs={6}>
                      <BorderLessInput
                        type={"municipality"}
                        label={"Lawyer's or party's signature"}
                        fileno
                        onChange={fillFormData}
                        update={''}
                        value={""}
                        style={{ padding: "6px 0" }}

                      />

                    </Col>
                  </Row>

                </li>

              </ol>
            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default ONTFORM14C