import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import { Col, Form, Row } from 'react-bootstrap'
import BorderLessInput from '../shared/BorderLessInput'
import RadioChecks from '../shared/RadioChecks'
import BoldandThinText from '../shared/BoldandThinText'
import { Form10, Form10Alt, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import FormHeader from '../shared/FormHeader'
import ListItem from '../shared/ListItems'
import CheckBox from '../shared/CheckBox'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { Checkbox } from 'tabler-icons-react'

const ONTFORM10 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
  }, [loading, formData, selectFileData, documentInfo])

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

  function handleDynamicCheckbox(event) {
    console.log("🚀 ~ handleDynamicCheckbox ~ event:", event)
    // const { name, value } = event.target;

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


                <ol>
                  <li>
                    <textarea rows={8} className='custom-input-control border-0' value={formData?.item6?.details} onChange={fillFormData('item6.details')} />
                  </li>
                </ol>


              </li>
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
                      text='Try to resolve your family law issues by using out-of-court dispute resolution options, if it is appropriate in your case (for more information on dispute resolution options available to you, including court-connected mediation, you can visit the Ministry of the Attorney Generals website or www.stepstojustice.ca);'

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
                      label={"Date of Signature"}
                      type={"date"}
                      fileno
                      onChange={fillFormData}
                      update={'signature.date'}
                      value={formData?.signature?.date}
                      style={{ padding: "6px 0" }}

                    />
                  </Col>
                  <Col xs={6}>
                    <BorderLessInput
                      label={"Respondent's signature"}
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      update={''}
                      value={""}
                      style={{ padding: "6px 0" }}

                    />
                  </Col>
                </Row>

                <div className='row pb-10px ml-10px mt-20px mb-20px border-top border-2 border-dark' />

                <BoldandThinText bold={"LAWYERS'S CERTIFICATE"} centered />
                <div className='data-input'>

                  <span className='label'>My Name is </span>
                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.applicantsLawyer?.fullLegalName || false}
                    onChange={fillFormData('applicantsLawyer.fullLegalName')}
                  />
                </div>
                <p class="py-1">and I am the respondent's lawyer in this case. I certify that I have complied with the requirements of section 7.7 of the Divorce Act and section 33.2 of the Children's Law Reform Act regarding reconciliation and the duty to discuss and inform. </p>

                <Row className='mt-40px'>
                  <Col xs={6}>
                    <BorderLessInput
                      label={"Date"}
                      type={"date"}
                      fileno
                      onChange={fillFormData}
                      update={'lawyer_certificate.date'}
                      value={formData?.lawyer_certificate?.date}
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
              <div className='row pb-10px ml-10px mt-20px mb-20px border-top border-2 border-dark' />
              <BoldandThinText
              bold={"CLAIM BY RESPONDENT "}
              centered
            />
              <BoldandThinText thin={'Fill out a separate claim page for each person against whom you are making your claim(s).'} italic />
              <li>
                <ListItem
                  text='THIS CLAIM IS MADE AGAINST'

                />
                <CheckBox
                  id='order'
                  name='order'
                  label={`THE APPLICANT`}
                  type='checkbox'
                  fillFormData={handleCheckBox}
                  labelinput={'item7.the_applicant.isChecked'}
                  value={formData?.item7?.the_applicant?.isChecked ? true : false}
                  checkbox={true}
                  checked={formData?.item7?.the_applicant?.isChecked}
                />
                <div className="d-flex mb-2">
                  <div>
                    <CheckBox
                      id='order'
                      name='order'
                      label={`AN ADDED PARTY`}
                      type='checkbox'
                      fillFormData={handleCheckBox}
                      labelinput={'item7.added_party.isChecked'}
                      value={formData?.item7?.added_party?.isChecked ? true : false}
                      checkbox={true}
                      checked={formData?.item7?.added_party?.isChecked}
                    />
                  </div>
                  <div>
                    <div className='data-input'>

                      <span className='label'>Whose name is (full legal name)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.item7?.added_party?.fullLegalName}
                        onChange={fillFormData('item7.added_party.fullLegalName')}
                      />
                    </div>
                  </div>
                </div>

                <div className='mx-3'>
                  <small>(If your claim is against an added party, make sure that this person's name appears on page 1 of this form.)</small>
                </div>
              </li>
              <li>
                <ListItem
                  text='I ASK lHE COURT FOR lHE FOLLOWING:'

                />
                <div className='mx-3'>
                  <small>(Claims below include claims for temporary orders.)</small>
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
                        <CheckBox
                          name={"divorce"}
                          id={"divorce"}
                          label={"a divorce"}
                          labelinput={"familyHistory.claims.divorceAct.divorce.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.divorce?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.divorce?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>01</span>
                        <CheckBox
                          name={"support for me"}
                          id={"support for me"}
                          label={"support for me"}
                          labelinput={"familyHistory.claims.divorceAct.spousalSupport.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.spousalSupport?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.spousalSupport?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>02</span>
                        <CheckBox
                          name={"child_support02"}
                          id={"child_support02"}
                          label={"support for child(ren) - table amount"}
                          labelinput={"familyHistory.claims.divorceAct.supportForChildrenTableAmount.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenTableAmount?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenTableAmount?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>03</span>
                        <CheckBox
                          name={"child_support03"}
                          id={"child_support03"}
                          label={"support for child(ren) - other than table amount"}
                          labelinput={"familyHistory.claims.divorceAct.supportForChildrenOtherThanTableAmount.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenOtherThanTableAmount?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenOtherThanTableAmount?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>04</span>
                        <CheckBox
                          name={"decision_making"}
                          id={"decision_making"}
                          label={"decision-making responsibility for child(ren)"}
                          labelinput={"familyHistory.claims.divorceAct.decisionMakingResponsibility.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.decisionMakingResponsibility?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.decisionMakingResponsibility?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>05</span>
                        <CheckBox
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"parenting time for child(ren)"}
                          labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.parentingTime?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.parentingTime?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>06</span>
                        <CheckBox
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"contact with child(ren) (this requires court leave)"}
                          labelinput={"familyHistory.claims.divorceAct.contact_with_children.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.divorceAct?.contact_with_children?.checked || false}
                          checked={formData?.familyHistory?.claims?.divorceAct?.contact_with_children?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
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
                        <CheckBox
                          name={"equalizationFamilyProperties"}
                          id={"equalizationFamilyProperties"}
                          label={"equalization of net family properties"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.property.equalizationFamilyProperties.checked"}
                          value={formData?.familyHistory?.claims?.property?.equalizationFamilyProperties?.checked || false}
                          checked={formData?.familyHistory?.claims?.property?.equalizationFamilyProperties?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>23</span>
                        <CheckBox
                          name={"exclusive_possession"}
                          id={"exclusive_possession"}
                          label={"exclusive possession of matrimonial home"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.property.exclusive_possession.checked"}
                          value={formData?.familyHistory?.claims?.property?.exclusive_possession?.checked || false}
                          checked={formData?.familyHistory?.claims?.property?.exclusive_possession?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>24</span>
                        <CheckBox
                          name={"possession_of_contents"}
                          id={"possession_of_contents"}
                          label={"exclusive possession of contents of  matrimonial home"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.property.possession_of_contents.checked"}
                          value={formData?.familyHistory?.claims?.property?.possession_of_contents?.checked || false}
                          checked={formData?.familyHistory?.claims?.property?.possession_of_contents?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>25</span>
                        <CheckBox
                          name={"freezing_assets"}
                          id={"decisifreezing_assetson_making13"}
                          label={"freezing assets"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.property.freezing_assets.checked"}
                          value={formData?.familyHistory?.claims?.property?.freezing_assets?.checked || false}
                          checked={formData?.familyHistory?.claims?.property?.freezing_assets?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>26</span>
                        <CheckBox
                          name={"sale_of_family_property"}
                          id={"sale_of_family_property"}
                          label={"sale of family property"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.property.sale_of_family_property.checked"}
                          value={formData?.familyHistory?.claims?.property?.sale_of_family_property?.checked || false}
                          checked={formData?.familyHistory?.claims?.property?.sale_of_family_property?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>

                    </div>
                  </div>
                </Col>
                <Col xs={4} className='px-0'>
                  <div className='' >
                    <div style={{ borderBottom: "1px solid black", minHeight: "165px" }}>
                      <BoldandThinText centered bold={"Claims relating to child protection"} />
                    </div>
                    <div className='p-2' style={{ minHeight: "500px", borderBottom: "1px solid black" }}>

                      <div className='d-flex gap-2'>
                        <span>40</span>
                        <CheckBox
                          name={"access"}
                          id={"access"}
                          label={"access"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act.sale_of_family_property.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act?.access?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act?.access?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>41</span>
                        <CheckBox
                          name={"lesser_protection"}
                          id={"lesser_protection"}
                          label={"lesser protection order"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act.lesser_protection.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act?.lesser_protection?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act?.lesser_protection?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>42</span>
                        <CheckBox
                          name={"return_children"}
                          id={"return_children"}
                          label={"return of  child(ren) to my care"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act.lesser_protection.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act?.return_children?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act?.return_children?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>43</span>
                        <CheckBox
                          name={"place_in_care"}
                          id={"place_in_care"}
                          label={"Place child(ren) into care of (name)"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act.lesser_protection.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act?.place_in_care?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act?.place_in_care?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                        <div class="data-input">
                          <input type="text" class="custom-input-control"
                            value={formData?.familyHistory?.claims?.family_child_act?.place_in_care?.details}
                            onChange={fillFormData('orfamilyHistoryder.claims.family_child_act.place_in_care.details')} />
                        </div>
                      </div>
                      <div className='d-flex gap-2'>
                        <span>44</span>
                        <CheckBox
                          name={"interim_care"}
                          id={"interim_care"}
                          label={"Interim society care and custody for"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act.interim_care.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act?.interim_care?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act?.interim_care?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                        <div class="data-input">
                          <input type="text"
                            class="custom-input-control"
                            value={formData?.familyHistory?.claims?.family_child_act?.interim_care?.details}
                            onChange={fillFormData('orfamilyHistoryder.claims.family_child_act.interim_care.details')}
                          />
                          <label className='small'>months</label>
                        </div>
                      </div>
                      <div className='d-flex gap-2'>
                        <span>45</span>
                        <CheckBox
                          name={"society_supervision"}
                          id={"society_supervision"}
                          label={"society supervision  child(ren) for"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act.society_supervision.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act?.society_supervision?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act?.society_supervision?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                        <div class="data-input">
                          <input type="text" class="custom-input-control"
                            value={formData?.familyHistory?.claims?.family_child_act?.society_supervision?.details}
                            onChange={fillFormData('orfamilyHistoryder.claims.family_child_act.society_supervision.details')}
                          />
                          <label className='small'> months</label>
                        </div>
                      </div>

                    </div>
                  </div>
                </Col>

                <Col xs={4} className='px-0'>
                  <div >
                    <div style={{ borderBottom: "1px solid black", minHeight: "110px" }}>
                      <BoldandThinText centered bold={"Claims under the Family Law Act or Children's Law Reform Act"} />
                    </div>
                    <div className='px-1' style={{ minHeight: "900px", borderBottom: "1px solid black" }}>

                      <div className='d-flex gap-2'>
                        <span>10</span>
                        <CheckBox
                          name={"support_for_me"}
                          id={"support_for_me"}
                          label={"support for me"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act_reform.support_for_me.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_me?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_me?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>11</span>
                        <CheckBox
                          name={"support_for_children"}
                          id={"support for children"}
                          label={"support for child(ren) - table amount"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act_reform.support_for_children.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>12</span>
                        <CheckBox
                          name={"child_support02"}
                          id={"child_support02"}
                          type={"checkbox"}
                          label={"support for child(ren) - other than table amount"}
                          labelinput={"familyHistory.claims.family_child_act_reform.support_for_children_other.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children_other?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children_other?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>13</span>
                        <CheckBox
                          name={"responsibility_for_child"}
                          id={"child_support03"}
                          type={"checkbox"}
                          label={"decision-making responsibility for child(ren)"}
                          labelinput={"familyHistory.claims.family_child_act_reform.responsibility_for_child.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.responsibility_for_child?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.responsibility_for_child?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>14</span>
                        <CheckBox
                          name={"decision_making"}
                          id={"decision_making"}
                          type={"checkbox"}
                          label={"parenting time with child(ren)"}
                          labelinput={"familyHistory.claims.family_child_act_reform.parenting_time.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.parenting_time?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.parenting_time?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>15</span>
                        <CheckBox
                          name={"parenting_time"}
                          id={"parenting_time"}
                          label={"restraining/non-harassment order"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act_reform.restraining_order.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.restraining_order?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.restraining_order?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>16</span>
                        <CheckBox
                          name={"spousal_support"}
                          id={"spousal_support"}
                          label={"indexing spousal support"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act_reform.spousal_support.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.spousal_support?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.spousal_support?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>17</span>
                        <CheckBox
                          name={"parentage"}
                          id={"parentage"}
                          label={"declaration of parentage"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act_reform.parentage.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.parentage?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.parentage?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>18</span>
                        <CheckBox
                          name={"guardianship"}
                          id={"guardianship"}
                          label={"guardianship over child's property"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.family_child_act_reform.guardianship.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.guardianship?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.guardianship?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>19</span>
                        <CheckBox
                          name={"contact_with_child"}
                          id={"contact_with_child"}
                          type={"checkbox"}
                          label={"contact with child(ren) (this does not require court leave)"}
                          labelinput={"familyHistory.claims.family_child_act_reform.contact_with_child.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.contact_with_child?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.contact_with_child?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>

                      <div className='d-flex gap-2'>
                        <span>20</span>
                        <CheckBox
                          name={"wrongful_removal"}
                          id={"wrongful_removal"}
                          type={"checkbox"}
                          label={"Wrongful removal to or retention of child(ren) in Ontario involving a country outside Canada under the Convention on the Civil Aspects of International Child Abduction"}
                          labelinput={"familyHistory.claims.family_child_act_reform.wrongful_removal.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>21</span>
                        <CheckBox
                          name={"wrongful_removal_not"}
                          id={"wrongful_removal_not"}
                          type={"checkbox"}
                          label={"Wrongful removal to or retention of child(ren) in Ontario involving a country outside Canada NOT under the Convention on the Civil Aspects of International Child Abduction"}
                          labelinput={"familyHistory.claims.family_child_act_reform.wrongful_removal_not.checked"}
                          value={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal_not?.checked || false}
                          checked={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal_not?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
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
                        <CheckBox
                          name={"costs"}
                          id={"costs"}
                          label={"Costs"}
                          labelinput={"familyHistory.claims.other_claims.costs.checked"}
                          type={"checkbox"}
                          value={formData?.familyHistory?.claims?.other_claims?.costs?.checked || false}
                          checked={formData?.familyHistory?.claims?.other_claims?.costs?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>31</span>
                        <CheckBox
                          name={"annulment"}
                          id={"annulment"}
                          label={"Annulment of marriage"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.other_claims.annulment.checked"}
                          value={formData?.familyHistory?.claims?.other_claims?.annulment?.checked || false}
                          checked={formData?.familyHistory?.claims?.other_claims?.annulment?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>32</span>
                        <CheckBox
                          name={"prejudgement"}
                          id={"prejudgement"}
                          label={"Prejudgement interest"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.other_claims.prejudgement.checked"}
                          value={formData?.familyHistory?.claims?.other_claims?.prejudgement?.checked || false}
                          checked={formData?.familyHistory?.claims?.other_claims?.prejudgement?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>
                      <div className='d-flex gap-2'>
                        <span>33</span>
                        <CheckBox
                          name={"family_arbitration"}
                          id={"family_arbitration"}
                          label={"claims relating to a family arbitration"}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.other_claims.family_arbitration.checked"}
                          value={formData?.familyHistory?.claims?.other_claims?.family_arbitration?.checked || false}
                          checked={formData?.familyHistory?.claims?.other_claims?.family_arbitration?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
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
                        <CheckBox
                          name={"others"}
                          id={"others"}
                          label={""}
                          type={"checkbox"}
                          labelinput={"familyHistory.claims.others.checked"}
                          value={formData?.familyHistory?.claims?.others?.checked || false}
                          checked={formData?.familyHistory?.claims?.others?.checked || false}
                          fillFormData={handleCheckBox}
                          checkbox={true}
                        />
                      </div>

                    </div>
                  </div>
                </Col>
              </Row>

            </div>
          </div>

          <div>

            <p className='paragraph fst-italic text-center'>
              Give details of the order that you want the court to make. (Include any amounts of support (if known) and the name(s) of the child(ren) for whom you are claiming decision-making responsibility, parenting time, or contact in this case.)
            </p>

            <textarea
              className='custom-input-control border-0'
              value={formData?.order?.details}
              rows={5}
              onChange={fillFormData('order.details')}

            />

            <p className='sub-heading mt-20px'>IMPORTANT FACTS SUPPORTING MY CLAIM(S)</p>

            <p className='paragraph fst-italic text-center'>
              (In numbered paragraphs, set out the facts that form the legal basis for yourclaim(s). Attach an additional page and numberitifyou need more space.)
            </p>
            {/* <BoldandThinText
              thin={"IMPORTANT FACTS SUPPORTING MY CLAIM(S)"}
              italic

            /> */}
            <textarea
              className='custom-input-control border-0'
              value={formData?.important_facts?.details}
              rows={20}
              onChange={fillFormData('important_facts.details')}

            />

            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of signature"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  update={'signature2.date'}
                  value={formData?.signature2?.date}
                  style={{ padding: "6px 0" }}

                />
              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Respondent's signature"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={''}
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

export default ONTFORM10