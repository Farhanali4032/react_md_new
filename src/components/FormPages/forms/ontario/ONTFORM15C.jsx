import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Row, Table } from 'react-bootstrap'
import Seal from '../shared/Seal'
import BorderLessInput from '../shared/BorderLessInput'
import FormInfo from '../shared/FormInfo'
import BorderedInput from '../shared/BorderedInput'
import RadioChecks from '../shared/RadioChecks'
import ApplicationTable from '../shared/ApplicationTable'
import Listings from '../shared/FormListings'
import ClaimText from '../../Components/Form8A/ClaimText'
import FamilyForm from '../shared/FamilyForm'
import BoldandThinText from '../shared/BoldandThinText'
import PreviousCasesOrAgreements from '../../Components/Form8A/PreviousCases'
import TextArea from '../shared/TextArea'
import DynamicTextArea from '../shared/TextArea'
import { Form15C } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import Signature from '../../Components/Form15C/Signature'
import ChildData from '../../Components/Form15C/ChildData'
import ChildInfoData from '../../Components/Form15C/ChildInfoData'
import ListItem from '../shared/ListItems'
import AllListing from '../../Components/Form15C/AllListing'
import FormsHeader from '../shared/FormsHeader'

const ONTFORM15C = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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

  const { pdfData, loading, ApplicantData, ApplicantLawyerData, RespondentData, RespondentLawyerData, AssigneeData, AssigneeLawyerData } = Form15C(matterId);
  console.log("🚀 ~ ONTFORM15C ~ RespondentData:", RespondentData)

  useEffect(() => {
    if (selectFileData && selectFileData[0]) {
      setFormData(JSON.parse(selectFileData[0].file_data))
    }
    else if (pdfData) {
      setCourtNumber(pdfData.courtFileNumber)
      setFormData(pdfData);
    }
  }, [loading, formData, selectFileData])

  const [formData, setFormData] = useState()

  function fillFormData(key, defaultVal = null) {
    return e => {
      const updatedFormData = { ...formData } // Create a shallow copy of formData

      // Split the key into an array using dot (.) separator
      const keys = key?.split('.') // ['familyHistory', 'applicant', 'age']
      const value = e.target.value
      if (e.target.name === "court-number") {
        setCourtNumber(formData?.court_info?.courtFileNumber)
      }

      // Traverse the nested structure and update the value
      let nestedObj = updatedFormData
      for (let i = 0; i < keys?.length; i++) {
        const k = keys[i]
        if (i === keys?.length - 1) {
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

  const handleChildrenDataChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      familyHistory: {
        ...prevState.familyHistory,
        theChildren: prevState.familyHistory.theChildren.map((child, i) => {
          if (i === index) {
            return {
              ...child,
              [name]: value,
            };
          }
          return child;
        }),
      },
    }));
  }


  function changeFormCheck(key) {
    return e => {
      const updatedFormData = { ...formData } // Create a shallow copy of formData
      const value = e.target.checked
      console.log("🚀 ~ changeFormCheck ~ value:", value.toString())

      // Split the key into an array using dot (.) separator
      const keys = key.split('.') // ['familyHistory', 'applicant', 'age']

      // Traverse the nested structure and update the value
      let nestedObj = updatedFormData
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (i === keys.length - 1) {
          nestedObj[k] = value // Update the value at the last key
        } else {
          nestedObj[k] = { ...nestedObj[k] } // Create a shallow copy of the nested object
          nestedObj = nestedObj[k] // Move to the next level of nested object
        }
      }

      setFormData(updatedFormData) // Update the state with the new formData
    }
  }

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM15C',
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
          <FormsHeader 
            fillFormData={fillFormData}
            formData={formData}
            formID={'15C'}
            formName={'Consent Motion to Change'}
          />
          {/* Applicant Data */}
          <Row className='py-1'>
            <Col xs={6} className='ps-0'>
              <ApplicationTable heading="Applicant(s)" data={ApplicantData} onChange={fillFormData} />
            </Col>
            <Col xs={6} className='pe-0'>
              <ApplicationTable heading="Applicant(s) Lawyer" data={ApplicantLawyerData} onChange={fillFormData} />
            </Col>
            <Col xs={6} className='ps-0'>
              <ApplicationTable heading="Respondent(s)" data={RespondentData} onChange={fillFormData} />
            </Col>
            <Col xs={6} className='pe-0'>
              <ApplicationTable heading="Respondent(s) Lawyer" data={RespondentLawyerData} onChange={fillFormData} />
            </Col>
            <Col xs={6} className='ps-0'>
              <ApplicationTable heading="Assignee of Support Order (if applicable)" data={AssigneeData} onChange={fillFormData} />
            </Col>
            <Col xs={6} className='pe-0'>
              <ApplicationTable heading="Assignee’s Lawyer" data={AssigneeLawyerData} onChange={fillFormData} />
            </Col>
          </Row>

          <BoldandThinText bold={`YOU MAY USE THIS FORM IF YOU ARE SEEKING TO CHANGE AN ORDER OR AGREEMENT THAT HAS BEEN RECALCULATED BY THE ONLINE CHILD SUPPORT SERVICE. YOU MUST SERVE A COPY OF THIS FORM ON THE FAMILY RESPONSIBILITY OFFICE IF THE ORDER WAS MADE UNDER THE DIVORCE ACT AND THE RECALCULATION WAS MADE WITHIN THE LAST 35 DAYS.`} />

          <BoldandThinText bold={`YOU MAY NOT USE THIS FORM TO CHANGE A NOTICE OF CALCULATION MADE BY THE ONLINE CHILD SUPPORT SERVICE.`} />

          <BoldandThinText bold={`EACH OF YOU SHOULD CONSIDER GETTING A LAWYER’S ADVICE BEFORE SIGNING THIS CONSENT.`} />
          <BoldandThinText bold={`IF YOU ARE SEEKING TO CHANGE A SUPPORT ORDER OR AGREEMENT THAT HAS BEEN ASSIGNED TO A PERSON OR AGENCY, YOU MUST SERVE ALL DOCUMENTS ON THE ASSIGNEE AND OBTAIN THE ASSIGNEE’S CONSENT TO ANY CHANGE THAT MAY AFFECT THE ASSIGNEE’S FINANCIAL INTEREST. FAILURE TO OBTAIN THE ASSIGNEE’S CONSENT MAY RESULT IN A COURT SETTING ASIDE AN ORDER AND ORDERING COSTS AGAINST YOU. IT IS YOUR RESPONSIBILITY TO DETERMINE IF THE ORDER HAS BEEN ASSIGNED. YOU CAN DO THIS BY SUBMITTING A CONFIRMATION OF ASSIGNMENT FORM, AVAILABLE ON THE MINISTRY OF THE ATTORNEY GENERAL WEBSITE OR AT THE COURT OFFICE.`} />
          <AllListing fillFormData={fillFormData}
            formData={formData}
            handleChildrenDataChange={handleChildrenDataChange}
            changeFormCheck={changeFormCheck}
          />
          <Signature fillFormData={fillFormData} formData={formData} />

        </div>
      )}
    </>
  )
}

export default ONTFORM15C
