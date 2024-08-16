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

const ONTFORM14 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
      setCourtNumber(documentInfo.courtFileNumber)
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
      form_id: 'FORM14A',
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
                name={"court-number"}
              />
              <FormInfo
                number="14"
                format={"Affidavit of Service sworn/affirmed"}
              />
              <BorderLessInput
                value={formData?.court_info?.applicationType}
                type={"text"}
                onChange={fillFormData}
                update={"applicationType"}
                topheading
                style={{ marginTop: "-25px" }}
              />
            </Col>
          </Row>



          <div>


            <Row className='py-4'>
              <ApplicationTable data={formData} type="one-row" heading={'Applicant(s)'} applicant />
            </Row>
            <Row className='py-4'>
              <ApplicationTable data={formData} type="one-row" heading={'Respondent(s)'} respondent />
            </Row>

            <Row>

              <Col xs={3}>

                <BoldandThinText

                  thin={`The person making this
                    motion or the person’s
                    lawyer must contact the
                    clerk of the court by
                    telephone or otherwise to choose a time and
                    date when the court could hear this motion.`}

                />

              </Col>
              <Col xs={9}>
                <div className='fw-bold text-nowrap '>
                  TO THE PARTIES
                </div>

                <div className='data-input'>

                  <br />
                  <span className='fw-bold text-nowrap '>
                    THE COURT WILL HEAR A MOTION on <i>(date)</i>
                  </span>

                  <input
                    type='date'
                    className='custom-input-control '
                    value={formData?.place_of_hearing?.date}
                    onChange={fillFormData('place_of_hearing.date')}
                  />
                </div>
                <div className='data-input '>

                  <br />
                  <span className='fw-bold text-nowrap '>
                    at
                  </span>

                  <input
                    type='text'
                    className='custom-input-control '
                    value={formData?.place_of_hearing?.details}
                    onChange={fillFormData('place_of_hearing.details')}
                  />
                  <span className='fw-bold text-nowrap '>
                    , or as soon as possible after that time, at (place of hearing)
                  </span>
                  <input
                    type='text'
                    className='custom-input-control '
                    value={formData?.place_of_hearing?.time}
                    onChange={fillFormData('place_of_hearing.time')}
                  />
                </div>

              </Col>
            </Row>

            <Row>
              <div className='data-input'>


                <span className=' text-nowrap '>
                  This motion will be made by (name of person making the motion)
                </span>

                <input
                  type='text'
                  className='custom-input-control '
                  value={formData?.motion?.person_name || formData?.applicant?.fullLegalName}
                  onChange={fillFormData('motion.person_name')}
                />
              </div>
              <div className='data-input'>


                <span className=' text-nowrap '>
                  who will be asking the court for an order for the item(s) listed on page 2 of this notice.
                </span>


              </div>
            </Row>



            <div>
            <CheckBox
                  id='order'
                  label={`A copy of the affidavit(s) in support of this motion is/are served with this notice.`}
                  type='checkbox'
                  value={'affidavit_copy'}
                  labelinput={'notice.check'}
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  checked={formData?.notice?.check === 'affidavit_copy'}
                />
                 <CheckBox
                  id='order'
                  label={`A notice of a case conference is served with this notice to change an order.`}
                  type='checkbox'
                  value={'notice_to_change'}
                  labelinput={'notice.check'}
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  checked={formData?.notice?.check === 'notice_to_change'}
                />
              {/* <CheckBox
                id='order'
                name='order'
                label={`A copy of the affidavit(s) in support of this motion is/are served with this notice.`}
                type='checkbox'
                fillFormData={fillFormData}
                isBold={false}
                checkbox={true}
                checked={false}
              /> */}
              {/* <RadioChecks
                id='order'
                name='order'
                label={`A notice of a case conference is served with this notice to change an order.`}
                type='checkbox'
                fillFormData={fillFormData}
                isBold={false}
                checkbox={true}
                checked={false}
              /> */}
              <BoldandThinText

                thin={"If this material is missing, you should talk to the court office immediately."} />
              <BoldandThinText

                thin={"The person making this motion is also relying on the following documents in the continuing record: (List documents.)"} />

              <Row>
                <Col xs={12}>
                  <textarea rows={5} className='custom-input-control w-100' value={formData?.document_list?.details} onChange={fillFormData('document_list.details')} />
                </Col>
              </Row>

              <BoldandThinText
                thin={"If you want to oppose this motion or to give your own views, you should talk to your own lawyer and prepare your own affidavit, serve it on all other parties and file it at the court office not later than 4 days before the date above. Only written and affidavit evidence will be allowed at a motion unless the court gives permission for oral testimony. You may bring your lawyer to the motion."} />


              <BoldandThinText

                bold={"IF YOU DO NOT COME TO THE MOTION, THE COURT MAY MAKE AN ORDER WITHOUT YOU AND ENFORCE IT AGAINST YOU."} />
            </div>


            <Row>

              <Col xs={6}>

                <BorderLessInput
                  label={"Date of signature"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  update={'signature.date'}
                  value={formData?.signature?.date}
                  style={{ padding: "6px 0" }}

                />
                <BorderLessInput
                  label={"Signature of person making this motion or of person’s lawyer"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'courtName'}
                  value={""}
                  style={{ padding: "6px 0" }}

                />

              </Col>
              <Col xs={6}>
                <div className="text-center">
                  <textarea style={{ width: "100%" }} rows={4} value={formData?.signature?.printed_name} onChange={fillFormData('signature.printed_name')} />
                  <small>Typed or printed name of person or of person’s lawyer, address for service, telephone & fax numbers and e-mail address (if any)</small>
                </div>


              </Col>
            </Row>

            <Row>

              <BoldandThinText

                bold={"NOTE TO PERSON MAKING THIS MOTION: "}
                thin={"You MUST file a confirmation (Form 14C) not later than 2:00 p.m. 3 days before the date set out above."}
              />
              <BoldandThinText

                thin={"If this is a motion to change past and future support payments under an order that has been assigned to a government agency, you must also serve this notice on that agency. If you do not, the agency can ask the court to set aside any order that you may get in this motion and can ask for costs against you."}
              />


            </Row>

            <Row>

              <div style={{ border: "1px solid black" }}>

                <BoldandThinText

                  thin={"State the order or orders requested on this motion."}
                />

                <textarea rows={20} className='border-0 w-100' value={formData?.requested_motion?.details} onChange={fillFormData('requested_motion.details')} />
              </div>
            </Row>




          </div>





        </div>
      )}
    </>
  )
}

export default ONTFORM14