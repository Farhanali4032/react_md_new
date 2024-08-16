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
import BoldandThinText from '../shared/BoldandThinText'
import PreviousCasesOrAgreements from '../../Components/Form8A/PreviousCases'
import TextArea from '../shared/TextArea'
import DynamicTextArea from '../shared/TextArea'
import { Form15, Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import ListItem from '../shared/ListItems'
import Listing from '../../Components/Form15/Listing'
import ListItem15 from '../../Components/Form15/ListItem'
import ChildrenTable from '../../Components/Form15/ChildrenTable'
import IncomeTable from '../../Components/Form15/IncomeTable'
import SubTitleHeading from '../shared/SubTitle'
import CustomCheckBox from '../shared/CustomCheckBox'
import LawyersCertificate from '../shared/LawyerCertificate'
import SupportTable from '../../Components/Form15B/SupportTable'

const ONTFORM15 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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

  const { documentInfo, loading } = FormInformation(matterId)
  useEffect(() => {
    if (selectFileData && selectFileData[0]) {
      setFormData(JSON.parse(selectFileData[0].file_data))
    }
    else if (documentInfo) {
      setFormData(documentInfo);
      setCourtNumber(documentInfo.court_info.courtFileNumber)
    }
  }, [loading, formData, selectFileData])

  const [formData, setFormData] = useState()
  console.log("🚀 ~ ONTFORM15 ~ formData:", formData)


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
      form_id: 'FORM15',
      data: formData,
    })
  }, [formData])

  const ApplicantData = [
    { label: 'Full legal name:', value: documentInfo?.applicant.fullLegalName, type: 'text', update: 'applicant.fullLegalName' },
    { label: 'Address:', value: documentInfo?.applicant.address, type: 'text', update: 'applicant.address' },
    { label: 'Phone & fax:', value: documentInfo?.applicant?.phoneAndFax, type: 'text', update: 'applicant.phoneAndFax' },
    { label: 'Email:', value: documentInfo?.applicant?.email, type: 'email', update: 'applicant.email' },
  ];
  const ApplicantLawyerData = [
    { label: 'Full legal name:', value: documentInfo?.applicantsLawyer.fullLegalName, type: 'text', update: 'applicantsLawyer.fullLegalName' },
    { label: 'Address:', value: documentInfo?.applicantsLawyer.address, type: 'text', update: 'applicantsLawyer.address' },
    { label: 'Phone & fax:', value: documentInfo?.applicantsLawyer.phoneAndFax, type: 'text', update: 'applicantsLawyer.phoneAndFax' },
    { label: 'Email:', value: documentInfo?.applicantsLawyer.email, type: 'email', update: 'applicantsLawyer.email' },
  ];
  const RespondentData = [
    { label: 'Full legal name:', value: documentInfo?.respondent.fullLegalName, type: 'text', update: 'respondent.fullLegalName' },
    { label: 'Address:', value: documentInfo?.respondent.address, type: 'text', update: 'respondent.address' },
    { label: 'Phone & fax:', value: documentInfo?.respondent.phoneAndFax, type: 'text', update: 'respondent.phoneAndFax' },
    { label: 'Email:', value: documentInfo?.respondent.email, type: 'email', update: 'respondent.email' },
  ];
  const RespondentLawyerData = [
    { label: 'Full legal name:', value: documentInfo?.respondentsLawyer.fullLegalName, type: 'text', update: 'respondentsLawyer.fullLegalName' },
    { label: 'Address:', value: documentInfo?.respondentsLawyer.address, type: 'text', update: 'respondentsLawyer.address' },
    { label: 'Phone & fax:', value: documentInfo?.respondentsLawyer.phoneAndFax, type: 'text', update: 'respondentsLawyer.phoneAndFax' },
    { label: 'Email:', value: documentInfo?.respondentsLawyer.email, type: 'email', update: 'respondentsLawyer.email' },
  ];
  const AssigneeData = [
    { label: 'Full legal name:', value: documentInfo?.assignee?.fullLegalName, type: 'text', update: 'assignee.fullLegalName' },
    { label: 'Address:', value: documentInfo?.assignee?.address, type: 'text', update: 'assignee.address' },
    { label: 'Phone & fax:', value: documentInfo?.assignee?.phoneAndFax, type: 'text', update: 'assignee.phoneAndFax' },
    { label: 'Email:', value: documentInfo?.assignee?.email, type: 'email', update: 'assignee.email' },
  ];
  const AssigneeLawyerData = [
    { label: 'Full legal name:', value: documentInfo?.assigneeLawyer?.fullLegalName, type: 'text', update: 'assigneeLawyer.fullLegalName' },
    { label: 'Address:', value: documentInfo?.assigneeLawyer?.address, type: 'text', update: 'assigneeLawyer.address' },
    { label: 'Phone & fax:', value: documentInfo?.assigneeLawyer?.phoneAndFax, type: 'text', update: 'assigneeLawyer.phoneAndFax' },
    { label: 'Email:', value: documentInfo?.assigneeLawyer?.email, type: 'email', update: 'assigneeLawyer.email' },
  ];

  const checkboxes = [
    { id: 'decision_making', name: 'decision_making', label: 'Decision-making responsibility', checked: false },
    { id: 'child_support_table', name: 'child_support_table', label: 'Child support - table amount', checked: false },
    { id: 'child_support_expenses', name: 'child_support_expenses', label: 'Child support - special or extraordinary expenses (list type of expenses):', checked: false },
    { id: 'parenting_time', name: 'parenting_time', label: 'Parenting time', checked: false },
    { id: 'spousal_support', name: 'spousal_support', label: 'Spousal support', checked: false },
    { id: 'contact', name: 'contact', label: 'Contact', checked: false },
    { id: 'other_details', name: 'other_details', label: 'Other (give details):', checked: false },
  ];
  const nestedItems = [
    ['Current term:', 'Requested change:'],
    ['Current term:', 'Requested change:'],
    ['Current term:', 'Requested change:'],
    ['Current term:', 'Requested change:'],
    ['Current term:', 'Requested change:'],
    ['Current term:', 'Requested change:'],
    ['Current term:', 'Requested change:'],
  ];
  const types = ['a', 'b', 'c'];
  
  

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className='pdf-form pdf-form-8A mt-20px px-5' ref={targetRef}>
          <FormHeading heading={"ONTARIO"} />
          <Row className='pb-3'>
            <Col className='my-auto mx-auto text-center' xs={3}>
              <Seal text={"SEAL"} circle={false} />
            </Col>
            <Col xs={6}>
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
              />

              <FormInfo
                number="15"
                format={"Motion to Change"}
              />
            </Col>
          </Row>

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
              <ApplicationTable heading="Assignee's Lawyer" data={AssigneeLawyerData} onChange={fillFormData} />
            </Col>
          </Row>
          <div className='data-input'>
            <span className='fw-bold text-nowrap'>
              TO:
            </span>
            <span className='label'>(name(s) of responding party(ies)) {' '}</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
          </div>
          <div className='data-input'>
            <span className='label'>(Name of requesting party) {' '}</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
            <span className='label'>has brought a motion to change {' '}</span>
          </div>
          <div className='data-input'>
            <div className='form-check px-0'>
              <input
                className=''
                type='checkbox'
                name='relationship_status'
                id='married_on'
              />
            </div>
            <span className='label'>the final order of Justice</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
            <span className='label'>, dated {' '}</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
          </div>
          <div className='data-input'>
            <div className='form-check px-0'>
              <input
                className=''
                type='checkbox'
                name='relationship_status'
                id='married_on'

              />
            </div>
            <span className='label'>the agreement</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
            <span className='label'>, dated {' '}</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
          </div>
          <div className='data-input'>
            <div className='form-check px-0'>
              <input
                className=''
                type='checkbox'
                name='relationship_status'
                id='married_on'

              />
            </div>
            <span className='label'>the order/agreement recalculated by the online Child Support Service on</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
          </div>
          <div className='data-input'>
            <div className='form-check px-0'>
              <input
                className=''
                type='checkbox'
                name='relationship_status'
                id='married_on'

              />
            </div>
            <span className='fw-bold text-nowrap'>
              THE FIRST COURT DATE IS
            </span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
            <span className='label'>, at {' '}</span>
            <input
              type='text'
              className='form-control'
              onChange={fillFormData}
            />
            <div className='form-check px-0'>
              <input
                className=''
                type='checkbox'
                name='relationship_status'
                id='married_on'

              />
            </div>
            <span className='fw-bold text-nowrap'>
              a.m.
            </span>
            <div className='form-check px-0'>
              <input
                className=''
                type='checkbox'
                name='relationship_status'
                id='married_on'

              />
            </div>
            <span className='fw-bold text-nowrap'>
              p.m.
            </span>
          </div>
          <div className='mt-5 d-flex'>
            <div className='form-check ps-0'>
              <input
                className=' me-2'
                type='checkbox'
                name='relationship_status'
                id='married_on'
              />
            </div>
            <div>
              <span className='fw-bold text-nowrap'>
                NO COURT DATE HAS BEEN SET FOR THIS CASE.
              </span>
              <span className='label'> You or another party should schedule a case conference with the court clerk and serve a Conference Notice (Form 17) on all the other parties in this case {' '}</span>
            </div>
          </div>
          <div className='mt-4'>
            <div>
              <span className='fw-bold text-nowrap'>
                YOU MUST RESPOND
              </span>
              <span className='label'> to this Motion to Change within 30 days (or 60 days if you were served outside Canada orthe United States). {' '}</span>
              <span className='fw-bold text-nowrap'>
                IF YOU DO NOT RESPOND,
              </span>
              <span className='label'> this case will go ahead without you and the court may make orders against you. {' '}</span>
            </div>
          </div>
          <div className='py-4'>
            <Row className='pt-4'>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of issue by the clerk of the court"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  style={{ padding: "6px 0" }}
                />
              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Clerk of the court"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  style={{ padding: "6px 0" }}
                />
              </Col>
            </Row>
          </div>
          <div>
            <div className='py-4'>
              <p className='sub-heading text-decoration-underline pb-1'>
                PART A-BASIC INFORMATION
              </p>
            </div>
            <ol type="number">
              <li id='item_1'>
                <ListItem15
                  text='Date parties started living together (write "N/A" if not applicable):'
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'relationshipDates.startedLivingTogetherOn.date'}
                  type={'date'}
                  value={formData?.relationshipDates?.startedLivingTogetherOn?.date}
                />
              </li>
              <li id='item_2'>
                <ListItem15
                  text='Date parties married (write "N/A" if not applicable):'
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'relationshipDates.marriedOn.date'}
                  type={'date'}
                  value={formData?.relationshipDates?.marriedOn?.date}
                />
              </li>
              <li id='item_3'>
                <ListItem15
                  text='Date parties separated (write "N/A" if not applicable):'
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'relationshipDates.separatedOn.date'}
                  type={'date'}
                  value={formData?.relationshipDates?.separatedOn?.date}
                />
              </li>
              <li id='item_4'>
                <ListItem15
                  text={`Requesting party's birth date:`}
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'applicant.dateOfBirth'}
                  type={'date'}
                  value={formData?.applicant?.dateOfBirth}
                />
              </li>
              <li id='item_5'>
                <ListItem15
                  text={`Responding party's birth date:`}
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'respondent.dateOfBirth'}
                  type={'date'}
                  value={formData?.respondent?.dateOfBirth}
                />
              </li>
              <li id='item_6'>
                <ListItem15
                  text={`Municipality requesting party lives in:`}
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'respondent.municipality'}
                  value={formData?.respondent?.municipality}
                />
              </li>
              <li id='item_7'>
                <ListItem15
                  text={`Municipality responding party lives in:`}
                  showInput={true}
                  fillFormData={fillFormData}
                  labelinput={'respondent.municipality'}
                  value={formData?.respondent?.municipality}
                />
              </li>
              <li id='item_8'>
                <ListItem15
                  text={`Information about the child (ren):`}
                  showInput={false}
                />
                <div className='ps-3'>
                  <span className='label'>(List all children involved in this case, even if you are not requesting support for them.){' '}</span>
                </div>
                <div>

                  <ChildrenTable formData={formData} handleChildrenDataChange={handleChildrenDataChange} />
                </div>
              </li>
              <li id='item_9'>
                <ListItem15
                  text={`If you are asking to change support, please give information about your income (unless you're only asking to change the table amount of support) and the other party's income (if known) for the past 3 years (a party's income should be their total income from all sources as listed on line 150 of their Income Tax Return):`}
                  showInput={false}
                />
              </li>
              <div>
                <IncomeTable />
              </div>
              <SubTitleHeading heading={'PART B - CHANGES THAT THE REQUESTING PARTY WANTS TO MAKE'} underline />
              <li id='item_10'>
                <ListItem15
                  text="I want to change the following (check all that apply):"
                  showInput={false}
                />
              </li>
              <Row className='ps-5'>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.decision_making'}
                  label='Decision-making responsibility'
                  type={"checkbox"}
                  value={formData?.item10?.decision_making?.checked}
                  checked={formData?.item10?.decision_making?.checked}
                  checkbox={true}
                />
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.child_support_table'}
                  label='Child support - table amount'
                  type={"checkbox"}
                  value={formData?.item10?.child_support_table?.checked}
                  checked={formData?.item10?.child_support_table?.checked}
                  checkbox={true}
                />
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.child_support_expenses'}
                  label='Child support - special or extraordinary expenses (list type of expenses):'
                  type={"checkbox"}
                  value={formData?.item10?.child_support_expenses?.checked}
                  checked={formData?.item10?.child_support_expenses?.checked}
                  checkbox={true}
                />
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.parenting_time'}
                  label='Parenting time'
                  type={"checkbox"}
                  value={formData?.item10?.parenting_time?.checked}
                  checked={formData?.item10?.parenting_time?.checked}
                  checkbox={true}
                />
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.spousal_support'}
                  label='Spousal support'
                  type={"checkbox"}
                  value={formData?.item10?.spousal_support?.checked}
                  checked={formData?.item10?.spousal_support?.checked}
                  checkbox={true}
                />
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.contact'}
                  label='Contact'
                  type={"checkbox"}
                  value={formData?.item10?.contact?.checked}
                  checked={formData?.item10?.contact?.checked}
                  checkbox={true}
                />
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'item10.other_details'}
                  label='Other (give details):'
                  type={"checkbox"}
                  value={formData?.item10?.other_details?.checked}
                  checked={formData?.item10?.other_details?.checked}
                  checkbox={true}
                />
              </Row>

              <li id='item_11'>
                <ListItem15
                  text="I want to change the following specific terms of the current order/agreement (please provide the paragraph number of each term and the wording of the term exactly as it appears in the order/agreement):"
                  showInput={false}
                />
                <ol type="a">
                  {nestedItems.map((items, index) => (
                    <li key={index}>
                      <ol type={types[index % types.length]}>
                        {items.map((item, subIndex) => (
                          <ListItem15
                            key={subIndex}
                            text={item}
                            value={formData?.item11?.[index]?.[subIndex]?.details}
                            showInput={true} // Show input for all items in nested list
                            fillFormData={fillFormData}
                            labelinput={`item11.${index}.${subIndex}.details`}
                          />
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              </li>

              <div className='pt-4'>
                <SubTitleHeading heading={`REQUESTING PARTY'S CERTIFICATE`} />
                <div className='pb-3'>
                  <span className='label'> (Your lawyer, if you are represented, must complete the lawyer's Certificate below.){' '}</span>
                </div>
                <div>
                  <span className='label'> Sections 7.1 to 7.5 of the Divorce Act and section 33.1 of the Children's Law Reform Act require you and the other party to:{' '}</span>
                </div>
                <ul className='label'>
                  <li>Exercise your decision-making responsibility, parenting time, or contact with a child in a manner that is consistent with the child's best interests;</li>
                  <li>Protect the child from conflict arising from this case, to the best of your ability;</li>
                  <li>Try to resolve your family law issues by using out-of-court dispute resolution options, if it is appropriate in your case (for more information on dispute resolution options available to you, including court-connected mediation, you can visit the <span className='text-decoration-underline' style={{ color: 'blue' }}> Ministry of the Attorney General's website</span> or <span className='text-decoration-underline' style={{ color: 'blue' }}>www.stepstojustice.ca</span> );</li>
                  <li>Provide complete, accurate, and up-to-date information in this case; and</li>
                  <li>Comply with any orders made in this case.</li>
                </ul>
                <p>I certify that I am aware of these duties under the Divorce Act and the Children's Law Reform Act.</p>
              </div>
              <div className='py-2'>
                <Row className='pt-2'>
                  <Col xs={6}>
                    <BorderLessInput
                      label={"Date of signature"}
                      type={"date"}
                      fileno
                      onChange={fillFormData}
                      update={'signature.date'}
                      value={formData?.court_info.courtOfficeAddress}
                      style={{ padding: "6px 0" }}
                    />
                  </Col>
                  <Col xs={6}>
                    <BorderLessInput
                      label={"Requesting party's signature"}
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      style={{ padding: "6px 0" }}
                    />
                  </Col>
                </Row>
                <div className='pt-4'>
                  <hr style={{ color: "black", opacity: "unset", borderTop: '2px solid' }} />
                </div>
              </div>

              <LawyersCertificate
                formData={formData}
                fillFormData={fillFormData}
              />

              <SubTitleHeading heading={`PART C - WHY THE REQUESTING PARTY WANTS THE CHANGES`} underline />

              <div>
                <span className='fw-bold'>
                  Note: The requesting party must either complete the remainder of this form or complete a separate affidavit (Form 14A) to give the important facts that explain why the court should change the current order/agreement.
                  {' '}
                </span>
              </div>
              <div className='py-3'>
                <span className='fw-bold'>
                  I swear/affirm that the following is true:  {' '}
                </span>
              </div>

              <li id='item_12'>
                <ListItem15
                  text='Are you and the responding party following the current order/agreement?'
                  showInput={false}
                />
              </li>

              <Row className='ps-5'>
                <Col md={2}>
                  <CustomCheckBox
                    fillFormData={changeFormCheck}
                    labelinput={'item12.affirm.yes.isChecked'}
                    label='Yes'
                    type={"checkbox"}
                    value={formData?.item12?.affirm?.yes?.isChecked}
                    checked={formData?.item12?.affirm?.yes?.isChecked}
                    checkbox={true}
                  />
                </Col>
                <Col md={8}>
                  <CustomCheckBox
                    fillFormData={changeFormCheck}
                    labelinput={'item12.affirm.no.isChecked'}
                    label='No. (Give details in the box below.)'
                    type={"checkbox"}
                    value={formData?.item12?.affirm?.no?.isChecked}
                    checked={formData?.item12?.affirm?.no?.isChecked}
                    checkbox={true}
                  />
                </Col>
              </Row>
              <DynamicTextArea
                rows={5}
                formData={formData}
                updates={'item12.affirm.details'}
                fillFormData={fillFormData}
              />

              <li id='item_9' className='pt-3'>
                <ListItem
                  text='Briefly give the facts that show why the court should change the order/agreement, including how your situation has changed since the order/agreement was made:'
                  showInput={false}
                />
              </li>

              <DynamicTextArea
                rows={20}
                formData={formData}
                updates={'importantFacts.adultry.details'}
                fillFormData={fillFormData}
              />

              {/* Part D */}
              <SubTitleHeading
                heading={'PART D - ADDITIONAL INFORMATION FOR SUPPORT CASE ONLY'}
                underline
              />
              <div className='pt-1'>
                <span className='fw-bold'>
                  Note: The requesting party must complete this Part <span className='text-decoration-underline'>only</span> if asking to change child support or spousal support.
                  {' '}
                </span>
              </div>

              <li id='item_14'>
                <div className='d-flex gap-5 align-items-center ps-3'>
                  <span className='label'>
                    Is support owed under the current order/agreement?
                  </span>
                  <div className='d-flex gap-5'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='support_owed'
                        id='support_owed_yes'
                        onChange={fillFormData('item_14')}
                        value={'yes'}
                        checked={formData?.item_14 === "yes"}
                      />
                      <label className='form-check-label' htmlFor='support_owed_yes'>
                        Yes
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='support_owed'
                        id='support_owed_no'
                        onChange={fillFormData('item_14')}
                        value={'no'}
                        checked={formData?.item_14 === "no"}
                      />
                      <label className='form-check-label' htmlFor='support_owed_no'>
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </li>

              <li id='item_15' className='pt-3'>
                <ListItem
                  text='If yes, please give details about the support that is owed:'
                  showInput={false}
                />
              </li>
              <SupportTable formData={formData}  onChange={fillFormData}/>

              <li id='item_16' className='pt-3'>
                <ListItem
                  text='When do you want the change in support to start? (check one)'
                  showInput={false}
                />
                <Row className='ps-5'>
                  <Col md={12}>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='item17'
                        id='today'
                        onChange={fillFormData('item17.checked')}
                        value={'today'}
                        checked={formData?.item17?.checked === "today"}
                      />
                      <label className='form-check-label' htmlFor='support_owed_yes'>
                        Today
                      </label>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='item17'
                        id='before_today'
                        onChange={fillFormData('item17.checked')}
                        value={'before_today'}
                        checked={formData?.item17?.checked === "before_today"}
                      />
                      <label className='form-check-label' htmlFor='support_owed_yes'>
                        Before today (give exact date: d,m,y)
                      </label>
                    </div>
                  </Col>
                  <Col md={7}>
                    <div className='w-100'>
                      <div className='data-input mt-2'>
                        <input
                          type='date'
                          className='form-control'
                          onChange={fillFormData('item17.date')}
                          value={formData?.item17?.date}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </li>

              <li id='item_17' className='pt-3'>
                <ListItem
                  text='If you are asking to change support starting on a date before today, please answer the following:'
                  showInput={false}
                />
                {/* Nested list starts here */}
                <ol type="a">
                  <li className='pt-2'>
                    <ListItem
                      text='What date did you first ask the other party for updated income information or to change support?'
                      showInput={false}
                    />
                  </li>
                  <div className='w-100'>
                    <div className='data-input'>
                      <input
                        type='text'
                        className='form-control'
                        onChange={fillFormData('item17.a.details')}
                        value={formData?.item17?.a?.details}
                      />
                    </div>
                  </div>
                  <li className='pt-3'>
                    <ListItem
                      text=' Did the other party do anything to make it difficult for you to know if support should change?'
                      showInput={false}
                    />
                  </li>
                  <Row className='ps-5'>
                    <Col md={2}>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='item_17'
                          id='support_owed_no'
                          onChange={fillFormData('item_17.checked')}
                          value={'yes'}
                          checked={formData?.item_17?.checked === "yes"}
                        />
                        <label className='form-check-label' htmlFor='support_owed_no'>
                          Yes
                        </label>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='item_17'
                          id='support_owed_no'
                          onChange={fillFormData('item_17.checked')}
                          value={'no'}
                          checked={formData?.item_17?.checked === "no"}
                        />
                        <label className='form-check-label' htmlFor='support_owed_no'>
                          No.(Give details in the box below.)
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ marginTop: "-14px" }}>
                    <DynamicTextArea
                      rows={10}
                      formData={formData}
                      updates={'item17.b.details'}
                      fillFormData={fillFormData}
                      value={formData?.item17?.b?.details}
                    />
                  </div>
                  <li className='pt-3'>
                    <ListItem
                      text="why didn't you ask the court to change support sooner?"
                      showInput={false}
                    />
                    <div style={{ marginTop: "-14px" }}>
                      <DynamicTextArea
                        rows={10}
                        formData={formData}
                        updates={'item17.c.details'}
                        fillFormData={fillFormData}
                        value={formData?.item17?.c?.details}
                      />
                    </div>
                  </li>
                  <li className='pt-3'>
                    <ListItem
                      text="what are your circumstances and the child's circumstances that support this request?"
                      showInput={false}
                    />
                    <div style={{ marginTop: "-19px" }}>
                      <DynamicTextArea
                        rows={15}
                        formData={formData}
                        updates={'item17.d.details'}
                        fillFormData={fillFormData}
                        value={formData?.item17?.d?.details}
                      />
                    </div>
                  </li>

                </ol>
              </li>

            </ol>

            <div className='pt-4'>
            </div>
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
                      style={{ padding: "6px 0", marginTop: "10px" }}
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
                      style={{ padding: "6px 0", marginTop: "10px" }}
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
                          style={{ padding: "6px 0", marginTop: "10px" }}
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
                          style={{ padding: "6px 0", marginTop: "10px" }}
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
                    style={{ padding: "6px 0", marginTop: "10px" }}
                  />
                  <div className='text-center'>
                    <span className=''> (This form is to be signed in front of a lawyer, justice of the peace, notary public or commissioner for taking affidavits.)</span>
                  </div>
                </div>

              </Col>
            </Row>

            <div className='mt-4'>
              <div>
                <span className='fw-bold text-nowrap'>
                  YOU SHOULD GET LEGAL ADVICE RIGHT AWAY.
                </span>
                <span className='label'> For help finding legal advice, you can contact. {' '}</span>
              </div>
            </div>
            <ul className='label'>
              <li>The Law Society of Ontario's Referral Service at  <span className='text-decoration-underline' style={{ color: 'blue' }}> www.lsrs.info.</span> If you are unable to use this online service, you can call 416-947-5255 or toll-free at 1-855-947-5255.</li>
              <li>The Law Society of Ontario's list of lawyers at <span className='text-decoration-underline' style={{ color: 'blue' }}> www.lawyerandparalegal.directory.</span></li>
              <li>Legal Aid Ontario at  <span className='text-decoration-underline' style={{ color: 'blue' }}> www.legalaid.on.ca</span> or 1-800-668-8258 (subject to your eligibility).</li>
            </ul>
            <div>
              <span className='fw-bold text-nowrap'>
                IF THIS CASE HAS NOT BEEN SCHEDULED FOR A TRIAL AFTER 365 DAYS,
              </span>
              <span className='label'> the court clerk will send a warning that the case will be dismissed in 60 days unless a party asks to schedule a conference or files proof that the case has been settled.{' '}</span>
            </div>
            <div className='pt-3'>
              <p className='sub-heading text-decoration-underline pb-1'>
                IMPORTANT INFORMATION FOR THE REQUESTIG PARTY (THE PARTY BRINGING THIS MOTION)
              </p>
            </div>
            <div className='pt-1'>
              <span className='fw-bold text-nowrap'>
                YOU MUST attach the following to his form
              </span>
            </div>
            <div className='pt-2'>
              <span className='label'>A copy of either: {' '}</span>
            </div>
            <Row className='ps-5'>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.final_court_order'}
                  label={
                    <>
                      the{' '}
                      <span className='fw-bold'>final court order </span>
                      you want to Change,
                      <span className='fw-bold'> or</span>
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.final_court_order}
                  checked={formData?.requesting_party?.final_court_order}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.agreement'}
                  label={
                    <>
                      the{' '}
                      <span className='fw-bold'>agreement </span>
                      that you want to change. (You can only use this form to change support terms in an agreement that has been filed at the Ontario Court of Justice or the Family Court of the Superior Court of Justice.)
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.agreement}
                  checked={formData?.requesting_party?.agreement}
                  checkbox={true}
                  col
                />
              </Col>
            </Row>
            <Row className=''>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.copy_of_notice'}
                  label={
                    <>
                      A copy of any Notice of Recalculation from the online Child Support Service.{' '}
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.copy_of_notice}
                  checked={formData?.requesting_party?.copy_of_notice}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.change_arrangement'}
                  label={
                    <>
                      If you are asking to change your parenting or contact arrangement, a completed {' '}
                      <span className='fw-bold'>Affidavit (decision-making responsibility, parenting time, contact) (Form 35.1). </span>
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.change_arrangement}
                  checked={formData?.requesting_party?.change_arrangement}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.change_support'}
                  label={
                    <>
                      If you are asking to change child support or spousal support:{' '}
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.change_support}
                  checked={formData?.requesting_party?.change_support}
                  checkbox={true}
                  col
                />
              </Col>
            </Row>
            <Row className='ps-5'>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.financial_statements'}
                  label={
                    <>
                      A completed {' '}
                      <span className='fw-bold'>Financial Statement (Form 13) </span>
                      (including specific financial documents). You do not need this form if you are the person receiving support and you are only asking for the table child support amount.
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.financial_statements}
                  checked={formData?.requesting_party?.financial_statements}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.confirmation_assignment'}
                  label={
                    <>
                      A {' '}
                      <span className='fw-bold'> Confirmation of Assignment form. </span>
                      You can find this form at the court office or online at{' '}
                      <span className='text-decoration-underline' style={{ color: "blue" }}> www.forms.ssb.gov.on.ca.</span>
                      {' '}If your support payments are assigned to a social service agency, you must serve all your completed court-issued motion to change documents on the agency. The agency must agree to any changes to your support (even if you and the responding party agree).
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.confirmation_assignment}
                  checked={formData?.requesting_party?.confirmation_assignment}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.fro'}
                  label={
                    <>
                      <span className='fw-bold'>A current schedule of arrears from the Family Responsibility Office (FRO),{' '}</span>
                      if your case is registered with FRO. You can find this form online at{' '}
                      <span className='text-decoration-underline' style={{ color: "blue" }}> https://www.ontario.ca/page/paying-and-receiving-child-and-spousal-support#section-4.</span>
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.fro}
                  checked={formData?.requesting_party?.fro}
                  checkbox={true}
                  col
                />
              </Col>
            </Row>
            <div>
              <span className='fw-bold text-nowrap'>
                YOU MUST file all your completed documents with the court so a court clerk can sign and date this Motion to Change.
              </span>
              <span className='label'> You can file documents in person at a courthouse or online by visiting {' '}</span>
              <span className='text-decoration-underline' style={{ color: "blue" }}>www.Ontario.ca/familyclaims.</span>
              <span className='fw-bold text-nowrap'>
                {' '}YOU MUST then:
              </span>
            </div>
            <Row className=''>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.other_than_you'}
                  label={
                    <>
                      <span className='fw-bold'>Get someone other than you {' '}</span>
                      (who is at least 18 years old){' '}
                      <span className='fw-bold'>to serve a copy of all your completed court-issued documents,{' '}</span>
                      along with blank copies of a Response to Motion to Change (Form 15B) and Consent Motion to Change (Form 15C).
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.other_than_you}
                  checked={formData?.requesting_party?.other_than_you}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'requesting_party.affidavit'}
                  label={
                    <>
                      <span className='fw-bold'> Complete and file an Affidavit of Service (Form 6B) with the court.{' '}</span>
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.requesting_party?.affidavit}
                  checked={formData?.requesting_party?.affidavit}
                  checkbox={true}
                  col
                />

              </Col>
            </Row>
            <div className='pt-3'>
              <p className='sub-heading text-decoration-underline pb-1'>
                IMPORTANT INFORMATION FOR THE RESPONDING PARTY
              </p>
            </div>
            <div className='pt-1'>
              <span className='fw-bold text-nowrap'>
                IF YOU AGREE WITH THE CHANGES{' '}
              </span>
              <span className='label'> that the other party wants to make, you must complete the applicable parts of the Consent Motion to Change (Form 15C), give the original version to the other party, and give a copy to any assignee. The other party may then finish completing the form and file it with the court.{' '}</span>
            </div>
            <div className='pt-2'>
              <span className='fw-bold text-nowrap'>
                IF YOU DON'T AGREE WITH THE CHANGES{' '}
              </span>
              <span className='label'>or you want to ask for different changes, you must:{' '}</span>
            </div>
            <Row>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.complete'}
                  label={
                    <>
                      <span className='fw-bold'>Complete{' '}</span>
                      the following forms:{' '}
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.complete}
                  checked={formData?.responding_party?.complete}
                  checkbox={true}
                  col
                />
              </Col>
            </Row>
            <Row className='ps-5'>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.motion'}
                  label={
                    <>
                      <span className='fw-bold'>○	Response to Motion to Change (Form 15B).</span>
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.motion}
                  checked={formData?.responding_party?.motion}
                  checkbox={true}
                  col
                />

              </Col>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.affidavit'}
                  label={
                    <>
                      An{' '}
                      <span className='fw-bold'> Affidavit (decision-making responsibility, parenting time, contact) (Form 35.1){' '}</span>
                      if you or the other party is asking to change your parenting or contact arrangement.
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.affidavit}
                  checked={formData?.responding_party?.affidavit}
                  checkbox={true}
                  col
                />
              </Col>
              <Col md={12}>
              <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.finanical_statments'}
                  label={
                    <>
                      A{' '}
                      <span className='fw-bold'>Financial Statement (Form 13){' '}</span>
                      if you or the other party is asking to change any child support or spousal support that you pay.
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.finanical_statments}
                  checked={formData?.responding_party?.finanical_statments}
                  checkbox={true}
                  col
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.serve'}
                  label={
                    <>
                      <span className='fw-bold'>Serve{' '}</span>
                      a copy of all your completed forms on the other party.{' '}
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.serve}
                  checked={formData?.responding_party?.serve}
                  checkbox={true}
                  col
                />

              </Col>
              <Col md={12}>
              <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.affidavit_service'}
                  label={
                    <>
                      Complete an{' '}
                      <span className='fw-bold'>Affidavit of Service (Form 6B).</span>
                    </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.affidavit_service}
                  checked={formData?.responding_party?.affidavit_service}
                  checkbox={true}
                  col
                />
               
              </Col>
              <Col md={12}>
              <CustomCheckBox
                  fillFormData={changeFormCheck}
                  labelinput={'responding_party.file'}
                  label={
                    <>
                    <span className='fw-bold'>File{' '}</span>
                    all your completed forms and the Affidavit of Service with the court{' '}
                  </>
                  }
                  type={"checkbox"}
                  value={formData?.responding_party?.file}
                  checked={formData?.responding_party?.file}
                  checkbox={true}
                  col
                />
                
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}

export default ONTFORM15