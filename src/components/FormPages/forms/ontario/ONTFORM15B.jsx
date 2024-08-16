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
import { Form15B, Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import Listing from '../../Components/Form15B/Listing'

const ONTFORM15B = ({ targetRef, matterId, onFormDataSave, savedData,setCourtNumber }) => {

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

  // const { pdfData, loading, ApplicantData,ApplicantLawyerData, RespondentData,
  //   RespondentLawyerData, AssigneeData, AssigneeLawyerData } = Form15B(matterId);

  const {documentInfo, loading} = FormInformation(matterId);

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

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM15B',
      data: formData,
    })
  }, [formData])

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

  const ApplicantData = [
    { label: 'Full legal name:', value: formData?.applicant.fullLegalName, type: 'text', update: 'applicant.fullLegalName' },
    { label: 'Address:', value: formData?.applicant.address, type: 'text', update: 'applicant.address' },
    { label: 'Phone & fax:', value: formData?.applicant?.phoneAndFax, type: 'text', update: 'applicant.phoneAndFax' },
    { label: 'Email:', value: formData?.applicant?.email, type: 'email', update: 'applicant.email' },
  ];
  const ApplicantLawyerData = [
    { label: 'Full legal name:', value: formData?.applicantsLawyer.fullLegalName, type: 'text', update: 'applicantsLawyer.fullLegalName' },
    { label: 'Address:', value: formData?.applicantsLawyer.address, type: 'text', update: 'applicantsLawyer.address' },
    { label: 'Phone & fax:', value: formData?.applicantsLawyer.phoneAndFax, type: 'text', update: 'applicantsLawyer.phoneAndFax' },
    { label: 'Email:', value: formData?.applicantsLawyer.email, type: 'email', update: 'applicantsLawyer.email' },
  ];
  const RespondentData = [
    { label: 'Full legal name:', value: formData?.respondent.fullLegalName, type: 'text', update: 'respondent.fullLegalName' },
    { label: 'Address:', value: formData?.respondent.address, type: 'text', update: 'respondent.address' },
    { label: 'Phone & fax:', value: formData?.respondent.phoneAndFax, type: 'text', update: 'respondent.phoneAndFax' },
    { label: 'Email:', value: formData?.respondent.email, type: 'email', update: 'respondent.email' },
  ];

  const RespondentLawyerData = [
    { label: 'Full legal name:', value: formData?.respondentsLawyer.fullLegalName, type: 'text', update: 'respondentsLawyer.fullLegalName' },
    { label: 'Address:', value: formData?.respondentsLawyer.address, type: 'text', update: 'respondentsLawyer.address' },
    { label: 'Phone & fax:', value: formData?.respondentsLawyer.phoneAndFax, type: 'text', update: 'respondentsLawyer.phoneAndFax' },
    { label: 'Email:', value: formData?.respondentsLawyer.email, type: 'email', update: 'respondentsLawyer.email' },
  ];

  const AssigneeData = [
    { label: 'Full legal name:', value: formData?.assignee?.fullLegalName, type: 'text', update: 'assignee.fullLegalName' },
    { label: 'Address:', value: formData?.assignee?.address, type: 'text', update: 'assignee.address' },
    { label: 'Phone & fax:', value: formData?.assignee?.phoneAndFax, type: 'text', update: 'assignee.phoneAndFax' },
    { label: 'Email:', value: formData?.assignee?.email, type: 'email', update: 'assignee.email' },
  ];

  const AssigneeLawyerData = [
    { label: 'Full legal name:', value: formData?.assigneeLawyer?.fullLegalName, type: 'text', update: 'assigneeLawyer.fullLegalName' },
    { label: 'Address:', value: formData?.assigneeLawyer?.address, type: 'text', update: 'assigneeLawyer.address' },
    { label: 'Phone & fax:', value: formData?.assigneeLawyer?.phoneAndFax, type: 'text', update: 'assigneeLawyer.phoneAndFax' },
    { label: 'Email:', value: formData?.assigneeLawyer?.email, type: 'email', update: 'assigneeLawyer.email' },
  ];

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className='pdf-form pdf-form-8A mt-20px px-4' ref={targetRef}>
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
                number="15B"
                format={"Response to Motion to Change"}
              />
            </Col>
          </Row>

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
              <ApplicationTable heading="Assignee's Lawyer" data={AssigneeLawyerData} onChange={fillFormData} />
            </Col>
          </Row>

          <div className='py-4'>
            <p className='sub-heading text-decoration-underline pb-1'>
              PART A-BASIC INFORMATION
            </p>
          </div>
          <div>

          </div>

          <div className='data-input '>
            <span className='fw-bold text-nowrap '>
              My name is
            </span>
            <span className='label '><i>(full legal name) </i></span>
            <input
              type='text'
              className='form-control small'
              value={formData?.applicant?.fullLegalName}
              onChange={fillFormData('applicant.fullLegalName')}
            />
          </div>

          <div>

            <Listing
              fillFormData={fillFormData}
              formData={formData}
              handleChildrenDataChange={handleChildrenDataChange}
              changeFormCheck={changeFormCheck}
            />

            <div className='pt-3'>
              <p className='sub-heading text-decoration-underline pb-1'>
                IMPORTANT INFORMATION
              </p>
            </div>

            <div className='mt-4'>
              <div>
                <span className='fw-bold text-nowrap small'>
                  YOU SHOULD GET LEGAL ADVICE RIGHT AWAY.
                </span>
                <span className='label small'> For help finding legal advice, you can contact. {' '}</span>
              </div>
            </div>
            <ul className='label'>
              <li>The Law Society of Ontario's Referral Service at  <span className='text-decoration-underline' style={{ color: 'blue' }}> www.lsrs.info.</span> If you are unable to use this online service, you can call 416-947-5255 or toll-free at 1-855-947-5255.</li>
              <li>The Law Society of Ontario's list of lawyers at <span className='text-decoration-underline' style={{ color: 'blue' }}> www.lawyerandparalegal.directory.</span></li>
              <li>Legal Aid Ontario at  <span className='text-decoration-underline' style={{ color: 'blue' }}> www.legalaid.on.ca</span> or 1-800-668-8258 (subject to your eligibility).</li>
            </ul>
            <div>
              <span className='fw-bold text-nowrap small'>
                IF THIS CASE HAS NOT BEEN SCHEDULED FOR A TRIAL AFTER 365 DAYS,
              </span>
              <span className='label small'> the court clerk will send a warning that the case will be dismissed in 60 days unless a party asks to schedule a conference or files proof that the case has been settled.{' '}</span>
            </div>

            <div className='pt-1'>
              <span className='fw-bold text-nowrap small'>
                IF YOU AGREE WITH THE CHANGES{' '}
              </span>
              <span className='label small'> that the other party wants to make, you must complete the applicable parts of the Consent Motion to Change (Form 15C), give the original version to the other party, and give a copy to any assignee?. The other party may then finish completing the form and file it with the court.{' '}</span>
            </div>
            <div className='pt-2'>
              <span className='fw-bold text-nowrap small'>
                IF YOU DON'T AGREE WITH THE CHANGES{' '}
              </span>
              <span className='label small'>or you want to ask for different changes, you must:{' '}</span>
            </div>
            <Row>
              <Col md={12}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={
                    <>
                      <span className='fw-bold'>Complete{' '}</span>
                      the following forms:{' '}
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
            </Row>
            <Row className='ps-5'>
              <Col md={12}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={
                    <>
                      <span className='fw-bold'>○	Response to Motion to Change (Form 15B).</span>
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
              <Col md={12}>
                <RadioChecks
                  id='agreement'
                  name='agreement'
                  label={
                    <>
                      An{' '}
                      <span className='fw-bold'> Affidavit (decision-making responsibility, parenting time, contact) (Form 35.1){' '}</span>
                      if you or the other party is asking to change your parenting or contact arrangement.
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
              <Col md={12}>
                <RadioChecks
                  id='agreement'
                  name='agreement'
                  label={
                    <>
                      A{' '}
                      <span className='fw-bold'>Financial Statement (Form 13){' '}</span>
                      if you or the other party is asking to change any child support or spousal support that you pay.
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={
                    <>
                      <span className='fw-bold'>Serve{' '}</span>
                      a copy of all your completed forms on the other party.{' '}
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
              <Col md={12}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={
                    <>
                      Complete an{' '}
                      <span className='fw-bold'>Affidavit of Service (Form 6B).</span>
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
              <Col md={12}>
                <RadioChecks
                  id='order'
                  name='order'
                  label={
                    <>
                      <span className='fw-bold'>File{' '}</span>
                      all your completed forms and the Affidavit of Service with the court.
                    </>
                  }
                  type='checkbox'
                  fillFormData={fillFormData}
                  isBold={false}
                  defaultPadding={true}
                  checkbox={true}
                  checked={false}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

export default ONTFORM15B