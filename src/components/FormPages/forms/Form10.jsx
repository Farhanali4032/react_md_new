import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from './shared/FormHeading'
import { Col, Form, Row } from 'react-bootstrap'
import Seal from './shared/Seal'
import BorderLessInput from './shared/BorderLessInput'
import FormInfo from './shared/FormInfo'
import BorderedInput from './shared/BorderedInput'
import RadioChecks from './shared/RadioChecks'
import ApplicationTable from './shared/ApplicationTable'
import Listings from './shared/FormListings'
import ClaimText from '../Components/Form8A/ClaimText'
import FamilyForm from './shared/FamilyForm'
import ChildTable from '../Components/Form8A/ChildTable'
import BoldandThinText from './shared/BoldandThinText'
import PreviousCasesOrAgreements from '../Components/Form8A/PreviousCases'
import TextArea from './shared/TextArea'
import DynamicTextArea from './shared/TextArea'
import { Form10, Form10Alt, FormInformation } from '../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../Loader'
import FormHeader from './shared/FormHeader'
import ListItem from './shared/ListItems'
import { Bold } from 'tabler-icons-react'
import CheckBox from './shared/CheckBox'

const FORM10 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

  const [text, setText] = useState()

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
  console.log("🚀 ~ FORM10 ~ documentInfo:", documentInfo)


  useEffect(() => {
    // if (selectFileData && selectFileData[0]) {
    //   setFormData(JSON.parse(selectFileData[0].file_data))
    // }
    // else if (documentInfo) {
      console.log("check", documentInfo)
      setCourtNumber(documentInfo?.court_info?.courtFileNumber)
      setFormData(documentInfo);
    // }
  }, [loading, formData, selectFileData])

  const [formData, setFormData] = useState()


  function fillFormData(key, defaultVal = null) {
    return e => {
      const updatedFormData = { ...formData }
      const keys = key.split('.')
      const value = e.target.value
      if (e.target.name === "court-number") {
        setCourtNumber(formData?.court_info?.courtFileNumber)
      }

      let nestedObj = updatedFormData
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (i === keys.length - 1) {
          nestedObj[k] = defaultVal ? defaultVal : value
        } else {
          nestedObj[k] = { ...nestedObj[k] }
          nestedObj = nestedObj[k]
        }
      }
      setFormData(updatedFormData)
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
      form_id: 'FORM10',
      data: formData,
    })
  }, [formData])

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

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className='pdf-form pdf-form-8A mt-20px px-3' ref={targetRef}>

          <div style={{ height: "auto" }}>
            <FormHeader
              topheading={"ONTARIO"}
              SealText={"SEAL"}
              onChange={fillFormData}
              labelname={"(Name of Court)"}
              typename={"text"}
              updatename={'courtName'}
              valuename={formData?.court_info?.courtName}
              labeladdress={"Court Office Address"}
              typeaddress={"text"}
              updateaddress={'courtOfficeAddress'}
              valueaddress={formData?.court_info?.courtOfficeAddress}
              labelcourt={"Court File Number"}
              typecourt={"text"}
              valuecourt={formData?.court_info?.courtFileNumber}
              updatecourt={"courtFileNumber"}
              formnumber={"10"}
              formformat={"Answers"}
              formtype={""}
              divorcename={"divorce_type"}
              divorceid={"simple"}
              divorcelabel={"Simple (divorce only)"}
              divorcevalue={"simple"}
              divorcechecked={formData?.applicationType}
              divorcetype={'radio'}
              radioinput={'applicationType'}
              labeljoint={"Joint"}
              jointchecked={formData?.applicationType}
              jointid={"joint"}
              jointvalue={"joint"}
              ApplicantData={ApplicantData}
              ApplicantLawyerData={ApplicantLawyerData}
              RespondentData={RespondentData}
              RespondentLawyerData={RespondentLawyerData}
              name="court-number"
            />
          </div>

          <Row>
            <div style={{ border: "1px solid black" }} className='px-0'>
              <div className='px-3' style={{ borderBottom: "1px solid black" }}>
                <BoldandThinText thin={"Name & address of Children’s Lawyer’s agent (street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)) and name of person represented."}
                />
              </div>

              <textarea rows={4} className='border-0 w-100' value={formData?.childrenLawyer?.info} onChange={fillFormData('childrenLawyer.info')} />
            </div>
          </Row>



          <div className='text-center py-3'>
            <BoldandThinText
              bold={"INSTRUCTIONS : Financial Statements"}
              centered
            />
          </div>

          <div>

            <div>
              <p>
                COMPLETE A FINANCIAL STATEMENT (Form 13) IF:
              </p>
              <ul type="number">
                <li>
                  <ListItem
                    text='you are making or responding to a claim for spousal support; or '

                  />
                </li>
                <li>
                  <ListItem
                    text='you are responding to a claim for child support; or '


                  />
                </li>
                <li>
                  <ListItem
                    text='you are making a claim for child support in an amount different from the table amount specified under the Child Support Guidelines.'


                  />
                </li>

              </ul>
              <p>
                You must complete all parts of the form <strong>UNLESS</strong> you are the <strong>ONLY</strong> responding to the claim for the child support in the table amount

                specified under the Child Support Guidlines <strong>AND</strong> you agree with the claim.In that case,only complete Parts 1,2 and 3.
              </p>
              <p>
                COMPLETE A FINANCIAL STATEMENT (Form 13.1) IF:
              </p>

              <ul type="number">
                <li>
                  <ListItem
                    text='you are making or responding to a claim for property or exclusive possession of the matrimonial home and its contents; or'

                  />
                </li>
                <li>
                  <ListItem
                    text='you are making or responding to a claim for property or exclusive possession of the matrimonial home and its contents together with other claims for relief.'

                  />
                </li>






              </ul>
            </div>


          </div>
          <hr />

          <div>
            <BoldandThinText
              bold={"TO THE APPLICANT(S): "}


            />
            <BoldandThinText
              thin={"If you are making a claim against someone who is not an applicant, insert the person's name and address here"}
              italic

            />


            <ol type="number">
              <li>
                <ListItem
                  text='I agree with the following claim(s) made by the applicant:   (Refer to the numbers alongside the boxes on page 4 of the application form.)'

                />

              </li>
              <li>
                <ListItem
                  text='I do not agree with the following claim(s) made by the applicant (Again, refer to the numbers alongside the boxes on page 4 of the application form.)'

                />

              </li>


              <li>
                <CheckBox
                  id='order'
                  name='order'
                  label={`I am asking that the applicant's claim  (except for the parts with which I agree) be dismissed with costs.`}
                  type='checkbox'
                  fillFormData={handleCheckBox}
                  labelinput={'item3.isChecked'}
                  value={formData?.item3?.isChecked ? true : false}
                  checkbox={true}
                  checked={formData?.item3?.isChecked}
                />

              </li>
              <li>
                <CheckBox
                  id='order'
                  name='order'
                  label={`I am making a claim of my own.`}
                  type='checkbox'
                  fillFormData={handleCheckBox}
                  labelinput={'item4.isChecked'}
                  value={formData?.item4?.isChecked ? true : false}
                  checkbox={true}
                  checked={formData?.item4?.isChecked}
                />
                <div className='mx-3'>
                  <small>Attach a "Claim by Respondent" page and include it as page3 .Otherwise do not attach it"  </small>
                </div>
              </li>
              <li>
                <Row>
                  <Col xs={7}>
                    <CheckBox
                      id='order'
                      name='order'
                      label={`The FAMILY HISTORY, as set out in the application`}
                      type='checkbox'
                      fillFormData={handleCheckBox}
                      labelinput={'item5.isChecked'}
                      value={formData?.item5?.isChecked ? true : false}
                      checkbox={true}
                      checked={formData?.item5?.isChecked}
                    />
                  </Col>

                  <Col xs={5}>
                    <CheckBox
                      id='order'
                      name='order'
                      label={`Is Correct`}
                      type='checkbox'
                      fillFormData={handleCheckBox}
                      labelinput={'item5.isCorrect'}
                      value={formData?.item5?.isCorrect ? true : false}
                      checkbox={true}
                      checked={formData?.item5?.isCorrect}
                    />
                    <CheckBox
                      id='isCorrect'
                      name='isCorrect'
                      label={`Is Not Correct`}
                      type='checkbox'
                      fillFormData={handleCheckBox}
                      labelinput={'item5.isNotCorrect'}
                      value={formData?.item5?.isNotCorrect ? true : false}
                      checkbox={true}
                      checked={formData?.item5?.isNotCorrect}
                    />
                  </Col>

                  <div className='mx-3'>
                    <small>(If it is not correct, attach your own FAMILY HISTORY page and underline those parts that are different from the applicant's version.) </small>
                  </div>

                </Row>


              </li>
              <li>

                <ListItem
                  text='The important facts that form the legal basis for my position in paragraph 2 are as follows:
(In numbered paragraphs, set out the facts for your position. Attach an additional sheet and number it if you need more space.)'

                />

                <div className='py-2'>



                  <BoldandThinText
                    bold={"RESPONDENT'S CERTIFICATE"}
                    centered

                  />
                  <BoldandThinText
                    thin={"(Your Lawyer , if you are represented,must complete the Lawyer's Certificate below)."}
                    italic

                  />
                  <BoldandThinText
                    thin={"Sections 7.1 to 7.5 of the Divorce Act and section 33.1 of the Children's Law Reform Act require you and the other party to:"}

                  />
                  <ul type="number">
                    <li>
                      <ListItem
                        text='Exercise your decision-making responsibility, parenting time, or contact with a child in a manner that is consistent with the childs best interests;'

                      />
                    </li>
                    <li>
                      <ListItem
                        text='Protect the child from conflict arising from this case, to the best of your ability;'

                      />
                    </li>

                    <li>
                      <ListItem
                        text='Protect the child from conflict arising from this case, to the best of your ability;
Try to resolve your family law issues by using out-of-court dispute resolution options, if it is appropriate in your case (for more information on dispute resolution options available to you, including court-connected mediation, you can visit the Ministry of the Attorney Generals website or www.stepstojustice.ca);'

                      />
                    </li>
                    <li>
                      <ListItem
                        text='Provide complete, accurate, and up-to-date information in this case; and'

                      />
                    </li>
                    <li>
                      <ListItem
                        text='Comply with any orders made in this case.'

                      />
                    </li>



                  </ul>
                  <BoldandThinText
                    thin={"I certify that I am aware of these duties under the Divorce Act and the Children's Law Reform Act."}

                  />
                  <Row>
                    <Col xs={6}>
                      <BorderLessInput
                        label={"Date of signature"}
                        type={"date"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.date'}
                        value={''}
                        style={{ padding: "6px 0" }}

                      />
                    </Col>
                    <Col xs={6}>
                      <BorderLessInput
                        label={"Respondent's signature"}
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'courtName'}
                        value={""}
                        style={{ padding: "6px 0" }}

                      />
                    </Col>
                  </Row>

                  <BoldandThinText
                    bold={"LAWYERS'S CERTIFICATE"}
                    centered

                  />
                  <div className='data-input small'>

                    <span className='label small'>My Name is </span>
                    <input
                      type='text'
                      className='form-control small'
                      onChange={fillFormData}
                    />
                  </div>
                  <div className='data-input small'>

                    <span className='label small'>My Name is </span>

                  </div>

                  <Row>
                    <Col xs={6}>
                      <BorderLessInput
                        label={"Date"}
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'courtName'}
                        value={""}
                        style={{ padding: "6px 0" }}

                      />
                    </Col>
                    <Col xs={6}>
                      <BorderLessInput
                        label={"Lawyer's signature"}
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

              </li>

              <li>
                <ListItem
                  text='THIS CLAIM IS MADE AGAINST'

                />
                <RadioChecks
                  id='order'
                  name='order'
                  label={`THE APPLICANT`}
                  type='checkbox'
                  fillFormData={fillFormData}
                  checkbox={true}
                />
                <div className="d-flex mb-2">
                  <div>
                    <RadioChecks
                      id='order'
                      name='order'
                      label={`AN ADDED PARTY`}
                      type='checkbox'
                      fillFormData={fillFormData}
                      checkbox={true}
                    />
                  </div>
                  <div>
                    <div className='data-input small'>

                      <span className='label small'>Whose name is (full legal name)</span>
                      <input
                        type='text'
                        className='form-control small'
                        onChange={fillFormData}
                      />
                    </div>
                  </div>
                </div>

                <div className='mx-3'>
                  <small>(If your claim is against an added party, make sure that this person's name appears on page 1 of this form.)</small>
                </div>
              </li>
            </ol>
          </div>

          <div className='border border-2 border-dark px-3'>
            <div>
              <Row className='pb-4'>

                <Col xs={4} className='px-0'>
                  <div >
                    <div style={{ borderBottom: "1px solid black", minHeight: "165px" }}>
                      <BoldandThinText centered bold={"Claims under the Divorce Act"} />
                      <BoldandThinText centered thin={"(Check boxes in this column only if you are asking for a divorce and your case is in the Superior Court of Justice or Family Court of the Superior Court of Justice."} />
                    </div>
                    <div className='px-3' style={{ minHeight: "500px", borderBottom: "1px solid black" }}>

                      <div className='d-flex gap-2'>
                        <span>00</span>
                        <RadioChecks
                          name={"a_divorce"}
                          id={"a_divorce"}
                          label={"a divorce"}
                          value={"simple"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.divorce.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>01</span>
                        <RadioChecks
                          name={"support for me"}
                          id={"support for me"}
                          label={"support for me"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.spousalSupport.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>02</span>
                        <RadioChecks
                          name={"child_support02"}
                          id={"child_support02"}
                          label={"support for child(ren) - table amount"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.supportForChildrenTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>03</span>
                        <RadioChecks
                          name={"child_support03"}
                          id={"child_support03"}
                          label={"support for child(ren) - other than table amount"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.supportForChildrenOtherThanTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>04</span>
                        <RadioChecks
                          name={"decision_making"}
                          id={"decision_making"}
                          label={"decision-making responsibility for child(ren)"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.decisionMakingResponsibility.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>05</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"parenting time for child(ren)"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>06</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"contact with child(ren) (this requires court leave)"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                    </div>
                  </div>


                </Col>

                <Col xs={4} className='px-0'>
                  <div className='' >
                    <div style={{ borderLeft: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black", minHeight: "165px" }}>
                      <BoldandThinText centered bold={"Claims relating to property"} />
                      <BoldandThinText centered thin={"(Check boxes in this column only if your case is in the Superior Court of Justice For Family Court of the superior court of justice "} />
                    </div>
                    <div className='p-2' style={{ minHeight: "500px", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>


                      <div className='d-flex gap-2'>
                        <span>22</span>
                        <RadioChecks
                          name={"spousal_support10"}
                          id={"spousal_support10"}
                          label={"equalization of net family properties"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.spousalSupport.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>23</span>
                        <RadioChecks
                          name={"child_support11"}
                          id={"child_support11"}
                          label={"exclusive possession of matrimonial home"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.supportForChildrenTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>24</span>
                        <RadioChecks
                          name={"child_support12"}
                          id={"child_support12"}
                          label={"exclusive possession of contents of  matrimonial home"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.supportForChildrenOtherThanTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>25</span>
                        <RadioChecks
                          name={"decision_making13"}
                          id={"decision_making13"}
                          label={"freezing assets"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.decisionMakingResponsibility.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>26</span>
                        <RadioChecks
                          name={"parenting_time14"}
                          id={"parenting_time14"}
                          label={"sale of family property"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                    </div>
                  </div>
                </Col>
                <Col xs={4} className='px-0'>
                  <div className='' >
                    <div style={{ borderBottom: "1px solid black", minHeight: "165px" }}>
                      <BoldandThinText centered bold={"Claims under the Family Law Act or Children's Law Reform Act"} />
                    </div>
                    <div className='p-2' style={{ minHeight: "500px", borderBottom: "1px solid black" }}>


                      <div className='d-flex gap-2'>
                        <span>40</span>
                        <RadioChecks
                          name={"spousal_support10"}
                          id={"spousal_support10"}
                          label={"access"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.spousalSupport.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>41</span>
                        <RadioChecks
                          name={"child_support11"}
                          id={"child_support11"}
                          label={"lesser protection order"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.supportForChildrenTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>42</span>
                        <RadioChecks
                          name={"child_support12"}
                          id={"child_support12"}
                          label={"return of  child(ren) to my care"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.supportForChildrenOtherThanTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>43</span>
                        <RadioChecks
                          name={"decision_making13"}
                          id={"decision_making13"}
                          label={"Place child(ren) into care of (name)"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.decisionMakingResponsibility.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>44</span>
                        <RadioChecks
                          name={"parenting_time14"}
                          id={"parenting_time14"}
                          label={"Interim society care and custody for months"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>15</span>
                        <RadioChecks
                          name={"restraining"}
                          id={"restraining"}
                          label={"society supervision  child(ren) for months"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.restraining.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                    </div>
                  </div>
                </Col>


                <Col xs={4} className='px-0'>
                  <div >
                    <div style={{ borderBottom: "1px solid black", minHeight: "110px" }}>
                      <BoldandThinText centered bold={"Claims under the Family Law Act or Children's Law Reform"} />
                    </div>
                    <div className='px-1' style={{ minHeight: "900px", borderBottom: "1px solid black" }}>

                      <div className='d-flex gap-2'>
                        <span>10</span>
                        <RadioChecks
                          name={"a_divorce"}
                          id={"a_divorce"}
                          label={"support for me"}
                          value={"simple"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.divorce.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>11</span>
                        <RadioChecks
                          name={"support for me"}
                          id={"support for me"}
                          label={"support for child(ren) - table amount"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.spousalSupport.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>12</span>
                        <RadioChecks
                          name={"child_support02"}
                          id={"child_support02"}
                          label={"support for child(ren) - other than table amount"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.supportForChildrenTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>13</span>
                        <RadioChecks
                          name={"child_support03"}
                          id={"child_support03"}
                          label={"decision-making responsibility for child(ren)"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.supportForChildrenOtherThanTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>14</span>
                        <RadioChecks
                          name={"decision_making"}
                          id={"decision_making"}
                          label={"parenting time with child(ren)"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.decisionMakingResponsibility.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>15</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"restraining/non-harassment order"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>16</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"indexing spousal support"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>17</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"declaration of parentage"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>18</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"guardianship over child's property"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>19</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"contact with child(ren) (this does not require court leave)"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>20</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"Wrongful removal to or retention of child(ren) in Ontario involving a country outside Canada under the Convention on the Civil Aspects of International Child Abduction"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>21</span>
                        <RadioChecks
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"Wrongful removal to or retention of child(ren) in Ontario involving a country outside Canada NOT under the Convention on the Civil Aspects of International Child Abduction"}
                          checked={""}

                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                    </div>
                  </div>


                </Col>

                <Col xs={4} className='px-0'>
                  <div className='' >
                    <div style={{ borderLeft: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black", minHeight: "110px", }}>
                      <BoldandThinText centered bold={"Other Claims"} />
                    </div>
                    <div className='p-2' style={{ minHeight: "900px", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>


                      <div className='d-flex gap-2'>
                        <span>30</span>
                        <RadioChecks
                          name={"spousal_support10"}
                          id={"spousal_support10"}
                          label={"Costs"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.spousalSupport.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>31</span>
                        <RadioChecks
                          name={"child_support11"}
                          id={"child_support11"}
                          label={"Annulment of marriage"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.supportForChildrenTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>32</span>
                        <RadioChecks
                          name={"child_support12"}
                          id={"child_support12"}
                          label={"Prejudgement interest"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.supportForChildrenOtherThanTableAmount.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>33</span>
                        <RadioChecks
                          name={"decision_making13"}
                          id={"decision_making13"}
                          label={"claims relating to a family arbitration"}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.decisionMakingResponsibility.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                    </div>
                  </div>
                </Col>

                <Col xs={4} className='px-0'>
                  <div className='' >
                    <div style={{ borderBottom: "1px solid black", minHeight: "110px" }}>
                      <BoldandThinText centered bold={"Other (specify)"} />
                    </div>
                    <div className='p-2' style={{ minHeight: "900px", borderBottom: "1px solid black" }}>


                      <div className='d-flex gap-2'>
                        <span>50</span>
                        <RadioChecks
                          name={"spousal_support10"}
                          id={"spousal_support10"}
                          label={""}
                          checked={""}

                          labelinput={"familyHistory.claims.familyAct.spousalSupport.checked"}
                          type={"checkbox"}
                          checkbox
                        />
                      </div>

                    </div>
                  </div>
                </Col>
              </Row>


            </div>
          </div>





































          <div>

            <BoldandThinText
              bold={"IMPORTANT FACTS SUPPORTING MY CLAIM(S)"}
              centered

            />
            <BoldandThinText
              thin={"IMPORTANT FACTS SUPPORTING MY CLAIM(S)"}
              italic

            />
            <textarea
              className='form-control border-0'
              value={""}
              rows={20}
              onChange={fillFormData('assets.life.beneficiary')}

            />

            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of signature"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'courtName'}
                  value={""}
                  style={{ padding: "6px 0" }}

                />
              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Respondent's signature"}
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








        </div>
      )}
    </>
  )
}

export default FORM10