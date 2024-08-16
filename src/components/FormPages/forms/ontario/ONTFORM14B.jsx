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

const ONTFORM14B = ({ targetRef, matterId, onFormDataSave, savedData,courtNumber,setCourtNumber }) => {

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
      const updatedFormData = { ...formData }

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
          <Row className='pb-3'>

            <Col xs={9}>
              <BorderLessInput
                label={"(Name of Court)"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtName'}
                value={formData?.court_info.courtName}
                style={{ padding: "6px 0" }}

              />
              <BorderLessInput
                label={"Court Office Address"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtOfficeAddress'}
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
                update={"court_info.courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
                name={"court-number"}
              />
              <FormInfo
                number="14B"
                format={"Motion Form"}
              />
            </Col>
          </Row>

          <div>
            <BoldandThinText italic bold={"I am:   "} />

            <Row>
              <Col xs={6}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={`Making this motion`}
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  checked={false}
                />
              </Col>
              <Col xs={6}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={`Responding to a motion (Form 14B) already filled`}
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  checked={false}
                />
              </Col>

            </Row>

          </div>

          <div>

            <BoldandThinText italic bold={"Name of Parties "} />

            <Row>
              <Col xs={6}>
                <div className='d-flex'>
                  <div className='data-input'>
                    <span className='label small me-2'><i> Applicant</i></span>
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
              </Col>
              <Col xs={6}>
                <div className='d-flex'>
                  <div className='data-input'>
                    <span className='label small me-2'><i> Respondent</i></span>
                  </div>
                  <div className='w-100'>
                    <div className='data-input mt-2'>
                      <input
                        type='text'
                        className='form-control small'
                        value={formData?.respondent?.fullLegalName}
                        onChange={fillFormData('respondent.fullLegalName')}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <div className='d-flex py-2'>
                <div className='data-input'>
                  <span className='label small me-2'><b>Next scheduled court date</b><i>  (if any)</i></span>
                </div>
                <div className=''>
                  <div className='data-input mt-2'>
                    <input
                      type='text'
                      className='form-control small'
                      value={formData?.next_court_date?.date}
                      onChange={fillFormData('next_court_date.date')}
                    />
                  </div>
                </div>
              </div>
              <div className='d-flex py-2'>
                <div className='data-input'>
                  <span className='label small me-2'><b>Name of case management judge</b><i>  (if any)</i></span>
                </div>
                <div className=''>
                  <div className='data-input mt-2'>
                    <input
                      type='text'
                      className='form-control small'
                      value={formData?.judge_name?.details}
                      onChange={fillFormData('judge_name.details')}
                    />
                  </div>
                </div>
              </div>
            </Row>
          </div>

          <hr style={{ border: "1px solid black", opacity: "1" }} />

          <div>
            <BoldandThinText italic bold={"This form is filled by:   "} />

            <Row>
              <Col xs={3}>

                <RadioChecks
                  id='order'
                  name='client'
                  value={'client'}
                  label={`applicant`}
                  type='checkbox'
                  fillFormData={fillFormData}
                  labelinput={'filledBy'}
                  isBold={false}
                  checkbox={true}
                  checked={formData?.filledBy === 'client' ? true : false}
                />

              </Col>
              <Col xs={3}>
                <RadioChecks
                  id='order'
                  name='opposingParty'
                  label={`respondent`}
                  value={'opposingParty'}
                  type='checkbox'
                  fillFormData={fillFormData}
                  labelinput={'filledBy'}
                  isBold={false}
                  checkbox={true}
                  checked={formData?.filledBy === 'opposingParty' ? true : false}
                />

              </Col>
              <Col xs={3}>
                <RadioChecks
                  id='order'
                  name='other'
                  label={`(other,specify)`}
                  labelinput={'filledBy'}
                  value={'other'}
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  checked={formData?.filledBy === 'other' ? true : false}
                />

              </Col>
            </Row>

          </div>

          <hr style={{ border: "1px solid black", opacity: "1" }} />

          <div>
            <BoldandThinText italic bold={"This motion is made:   "} />

            <Row>
              <Col xs={6}>

                <RadioChecks
                  id='motion'
                  name='with_consent'
                  value={'with_consent'}
                  label={`with the consent of all persons affected (this means that all persons affected agree to the proposed order)`}
                  type='checkbox'
                  labelinput={'motion'}
                  fillFormData={fillFormData}
                  isBold={false}
                  checked={formData?.motion === 'with_consent'}
                  checkbox={true} // This allows multi-select
                />

                <RadioChecks
                  id='motion'
                  name='with_notice_served'
                  label={`with notice to all persons affected (this means that all persons affected will be served the motion)`}
                  type='checkbox'
                  value={'with_notice_served'}
                  labelinput={'motion'}
                  fillFormData={fillFormData}
                  isBold={false}
                  checked={formData?.motion === 'with_notice_served'}
                  checkbox={true} // This allows multi-select
                />

              </Col>
              <Col xs={6}>
                <RadioChecks
                  id='motion'
                  name='without_consent'
                  label={`Without notice to `}
                  value={'without_consent'}
                  labelinput={'motion'}
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  checked={formData?.motion === 'without_consent'}
                  checkbox={true} // This is single-select
                />

              </Col>
            </Row>

          </div>

          <hr style={{ border: "1px solid black", opacity: "1" }} />

          <ul>
            <BoldandThinText italic bold={"NOTE TO PERSON MAKING THIS MOTION    "} />
            <li>
              <div className="label small">
                You may not serve or file a reply to a response from any person affected by this motion.
              </div>

            </li>
            <li>
              <div className="label small">
                If this is a motion to change past and future support payments under an order that has been assigned to a government agency, you must also serve this motion form on that agency. If you do not, the agency can ask the court to set aside any order that you may get in this motion and can ask for court costs against you.
              </div>
            </li>
          </ul>
          <hr style={{ border: "1px solid black", opacity: "1" }} />

          <ul>
            <BoldandThinText italic bold={"NOTE TO ALL PERSON AFFECTED BY THIS MOTION"} />
            <li>
              <div className="label small">
                If you want to oppose this motion, you or your lawyer must prepare a response by completing i) your own motion (Form 14B) or ii) your own motion form (Form 14B) and an affidavit (Form 14A), serve it on all other parties and file it at the court office not later than seven days after this motion form was served on you.
              </div>

            </li>
            <li>
              <div className="label small">
                If you do not respond in time, the motion may be dealt with as unopposed, and the court may make an order based on the information provided by the person making this motion, without your input.
              </div>
            </li>
          </ul>
          <hr style={{ border: "1px solid black", opacity: "1" }} />

          <ul>
            <BoldandThinText italic bold={"NOTE TO ALL"} />
            <li>
              <div className="label small">
                The court will deal with this motion by relying on written material unless the court deems it necessary to hold a hearing. This will be done in exceptional circumstances only. If you believe that a hearing is required, provide reasons below.
              </div>
            </li>
          </ul>
          <hr style={{ border: "1px solid black", opacity: "1" }} />

          <div className='py-2'>
            <BoldandThinText bold={"Procedural, uncomplicated or unopposed order that you want the court to make:"} />
            <textarea rows={5} className='w-100 border-0' onChange={fillFormData(`unopposed_order`)} />
          </div>
          <div className='py-2'>
            <BoldandThinText bold={"Why the court should make this order"} />
            <textarea rows={20} className='w-100 border-0' onChange={fillFormData(`court_order_reason`)} />
          </div>
          <div className='py-2'>
            <BoldandThinText bold={"Laws and rules on which you are relying, in addition to rule 14(10):"} thin={"((Give name of statute and section numbers; name of regulation and section numbers; and rule numbers.))"} />
            <textarea rows={20} className='w-100 border-0' onChange={fillFormData(`statute`)} />
          </div>

          <Row>
            <Col xs={6}>

              <label className='small'>
                <b>This party's lawyer</b> <i> (Give lawyer's name, firm, telephone & fax number and e-mail address (if any). If no lawyer, give party's name, and address for service, telephone & fax number and e- mail address (if any).)</i>
              </label>

              <textarea rows="5" value={formData?.applicantsLawyer.fullLegalName + ' , ' + formData?.applicantsLawyer.address} className='w-100' />

              <BorderLessInput
                label={"Date of signature"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'signature.client.date'}
                value={formData?.signature?.client.date}
                style={{ padding: "6px 0" }}

              />

            </Col>

            <Col xs={6}>

              <label className='small'>
                <b>Other party's lawyer</b> <i> (Give lawyer's name, firm, telephone & fax number and e-mail address (if any). If no lawyer, give party's name, and address for service, telephone & fax number and e- mail address (if any).)</i>
              </label>

              <textarea rows="5" value={formData?.respondentsLawyer.fullLegalName + ' , ' + formData?.respondentsLawyer.address} className='w-100' />

              <BorderLessInput
                label={"Date of signature"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'signature.respondent.date'}
                value={formData?.signature?.respondent.date}
                style={{ padding: "6px 0" }}

              />

            </Col>

          </Row>

        </div>
      )}
    </>
  )
}

export default ONTFORM14B