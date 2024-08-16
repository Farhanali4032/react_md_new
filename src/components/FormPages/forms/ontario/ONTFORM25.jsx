import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Row } from 'react-bootstrap'
import Seal from '../shared/Seal'
import BorderLessInput from '../shared/BorderLessInput'
import FormInfo from '../shared/FormInfo'
import ApplicationTable from '../shared/ApplicationTable'
import BoldandThinText from '../shared/BoldandThinText'
import { FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import CheckBox from '../shared/CheckBox'

const ONTFORM25 = ({ targetRef, matterId, onFormDataSave, savedData,courtNumber,setCourtNumber }) => {

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
      form_id: 'FORM25',
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
            <Col xs={3}>
              <Seal text={"SEAL"} />
            </Col>
            <Col xs={6}>
              <BorderLessInput
                label={"(Name of Court)"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtName'}
                value={formData?.court_info?.courtName}
                style={{ padding: "6px 0" }}

              />
              <BorderLessInput
                label={"Court Office Address"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtOfficeAddress'}
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
                update={"court_info.courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
                name="court-number"
              />
              <FormInfo
                number="25"
                format={"Order (general)"}
              />
              <CheckBox
                id='order'
                name='order'
                label={`Temporary`}
                value={'temporary'}
                labelinput={'applicationType'}
                type='checkbox'
                fillFormData={fillFormData}
                isBold={false}
                checkbox={true}
                checked={formData?.applicationType === 'temporary'}
              />
              <CheckBox
                id='order'
                name='order'
                label={`Final`}
                value={'final'}
                labelinput={'applicationType'}
                type='checkbox'
                fillFormData={fillFormData}
                isBold={false}
                checkbox={true}
                checked={formData?.applicationType === 'final'}
              />
            </Col>
          </Row>

          <ApplicationTable data={formData} fillFormData={fillFormData} type="two-rows" heading={'Applicant(s)'} applicant judgeSide />
          <ApplicationTable data={formData} fillFormData={fillFormData} type="two-rows" heading={'Respondent(s)'} respondent judgeSide />

          <div>
            <CheckBox
              id='order'
              name='order'
              label={`This order is made pursuant to provincial legislation only.`}
              type='checkbox'
              fillFormData={handleCheckBox}
              value={formData?.pursuant_order?.isChecked || false}
              labelinput={'pursuant_order.isChecked'}
              isBold={false}
              checkbox={true}
              checked={formData?.pursuant_order?.isChecked || false}
            />
          </div>

          <div>
            <BoldandThinText thin={"The court heard an application/motion made by (name of person or persons)"} />
            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'applicant.fullLegalName'}
              value={formData?.applicant?.fullLegalName}
              style={{ padding: "6px 0" }}

            />
          </div>
          <div>
            <BoldandThinText thin={"The following persons were in court (names of parties and lawyers in court)"} />
            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'persons_in_court.details'}
              value={formData?.persons_in_court?.details}
              style={{ padding: "6px 0" }}

            />
          </div>
          <div>
            <BoldandThinText thin={"The court received evidence and heard submissions on behalf of (name or names)"} />
            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'recevied_evidence.details'}
              value={formData?.recevied_evidence?.details}
              style={{ padding: "6px 0" }}

            />
          </div>



          <div className='py-2'>
            <BoldandThinText bold={"PURSUANT TO THE DIVORCE ACT (CANADA), THIS COURT ORDERS THAT:"} thin={"(if not applicable, cross out this line)"} />
            <textarea rows={3}
              className='w-100 border-0'
              value={formData?.pursuant_divorce?.details}
              onChange={fillFormData('pursuant_divorce.details')}
            />
          </div>
          <div className='py-2'>
            <BoldandThinText bold={"PURSUANT TO THE CHILDREN’S LAW REFORM ACT, THIS COURT ORDERS THAT: "} thin={"(if not applicable, cross out this line)"} />
            <textarea rows={3}
              className='w-100 border-0'
              value={formData?.pursuant_children?.details}
              onChange={fillFormData('pursuant_children.details')}
            />
          </div>
          <div className='py-2'>
            <BoldandThinText bold={"PURSUANT TO THE FAMILY LAW ACT, THIS COURT ORDERS THAT:"} thin={"(if not applicable, cross out this line)"} />
            <textarea rows={3}
              className='w-100 border-0'
              value={formData?.pursuant_family?.details}
              onChange={fillFormData('pursuant_family.details')}
            />
          </div>
          <div className='py-2'>
            <BoldandThinText bold={"THIS COURT ORDERS THAT"} thin={"(if not applicable, cross out this line)"} />
            <textarea rows={3}
              className='w-100 border-0'
              value={formData?.court_orders?.details}
              onChange={fillFormData('court_orders.details')}
            />
          </div>


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
                label={"Signature of judge or clerk of the court"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'courtName'}
                value={""}
                style={{ padding: "6px 0" }}

              />
            </Col>

          </Row>





































        </div>
      )}
    </>
  )
}

export default ONTFORM25