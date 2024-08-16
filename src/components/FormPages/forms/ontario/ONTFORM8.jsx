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
import FamilyHistory from '../../Components/Form8A/FamilyHistory'
import FamilyHistory8 from '../../Components/Form8/FamilyHistory8'
import ChildTable8 from '../../Components/Form8/ChildTable8'
import PreviousCasesOrAgreements8 from '../../Components/Form8/PreviousCases8'
import Claims8 from '../../Components/Form8/Claim8'
import CheckBox from '../shared/CheckBox'

const ONTFORM8 = ({ targetRef, matterId, onFormDataSave, savedData, courtNumber, setCourtNumber }) => {

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
  console.log("🚀 ~ ONTFORM8 ~ documentInfo:", documentInfo)

  useEffect(() => {
    if (selectFileData && selectFileData[0]) {
      setFormData(JSON.parse(selectFileData[0].file_data))
      console.log(selectFileData[0].file_data)

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
        setCourtNumber(value)
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

  const handleChildrenDataChange = (e, index) => {
    console.log("🚀 ~ handleChildrenDataChange ~ index:", index)
    const { name, value } = e.target;
    console.log("🚀 ~ handleChildrenDataChange ~ value:", value)
    console.log("🚀 ~ handleChildrenDataChange ~ name:", name)
    console.log("🚀 ~ handleChildrenDataChange ~  e.target:", e.target)
    setFormData((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [name]: value,
      },
    }))
    // setFormData((prevState) => ({
    //   ...prevState,
    //   theChildren: {
    //     ...prevState.theChildren,
    //     theChildren: prevState.theChildren.map((child, i) => {
    //       if (i === index) {
    //         return {
    //           ...child,
    //           [name]: value,
    //         };
    //       }
    //       return child;
    //     }),
    //   },
    // }));
  }

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM8',
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
                name={"court-number"}
                onChange={fillFormData}
                update={"courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
              />
              <FormInfo
                number="8"
                format={"Application (General)"}
              />

            </Col>
          </Row>

          <Row className='py-4'>
            <ApplicationTable data={formData} type="one-row" heading={'Applicant(s)'} applicant />
          </Row>
          <Row className='py-4'>
            <ApplicationTable data={formData} type="one-row" heading={'Respondent(s)'} respondent />
          </Row>
          <Row>
            <BoldandThinText bold={"TO THE RESPONDENT(S):"} />
            <BoldandThinText bold={"A COURT CASE HAS BEEN STARTED AGAINST YOU IN THIS COURT. THE DETAILS ARE SET OUT ON THE ATTACHED PAGES."} />

            <div className='data-input small'>
              <div className='form-check px-0'>
                <input
                  className=''
                  type='checkbox'
                  name='relationship_status'
                  id='married_on'
                  checked={formData?.court_case?.first_courtDate?.checked === true || false}
                  onChange={changeFormCheck('court_case.first_courtDate.checked')}
                />
                {formData?.court_case?.first_courtDate?.checked}
              </div>
              <span className='fw-bold text-nowrap '>
                THE FIRST COURT DATE IS <i>(date)</i>
              </span>
              <input
                type='text'
                className='form-control small'
                value={formData?.court_case?.first_courtDate?.date}
                onChange={fillFormData('court_case.first_courtDate.date')}
              />
              <span className='label fw-bold '> AT {' '}</span>
              <input
                type='text'
                className='form-control small'
                value={formData?.court_case?.first_courtDate?.time}
                onChange={fillFormData('court_case.first_courtDate.time')}
              />
              <div className='form-check px-0'>
                <input
                  className=''
                  type='checkbox'
                  name='am'
                  id='first_courtDate'
                  checked={formData?.court_case?.first_courtDate?.am?.checked === true || false}
                  onChange={changeFormCheck('court_case.first_courtDate.am.checked')}

                />
              </div>
              <span className='fw-bold text-nowrap '>
                a.m.
              </span>
              <div className='form-check px-0'>
                <input
                  className=''
                  type='checkbox'
                  name='pm'
                  id='first_courtDate'
                  checked={formData?.court_case?.first_courtDate?.pm?.checked === true || false}
                  onChange={changeFormCheck('court_case.first_courtDate.pm.checked')}
                />
              </div>
              <span className='fw-bold text-nowrap '>
                p.m.
              </span>

            </div>
            <div className='ms-4'>
              <span className='small text-nowrap '>
                or as soon as possible after that time, at: <i>(address)   </i>         </span>
            </div>

            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'court_case.first_courtDate.address_1'}
              value={formData?.court_case?.first_courtDate?.address_1}
              style={{ padding: "6px 0" }}

            />
            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'court_case.first_courtDate.address_2'}
              value={formData?.court_case?.first_courtDate?.address_2}
              style={{ padding: "6px 0" }}

            />

            <div>
              <span className=' text-wrap py-2'>
                <b>NOTE: </b>
                If this is a divorce case, no date will be set unless an Answer is filed. If you have also been served with a notice of motion, there may be an earlier court date and you or your lawyer should come to court for the motion.
              </span>

              <div className='d-flex small'>
                <div className='form-check px-0 me-2'>
                  <input
                    className=''
                    type='checkbox'
                    name='fast_track'
                    id='married_on'
                    checked={formData?.court_case?.fast_track?.checked === true || false}
                    onChange={changeFormCheck('court_case.fast_track.checked')}
                  />
                </div>
                <span className=' text-wrap '>
                  <b>THIS CASE IS ON THE FAST TRACK OF THE CASE MANAGEMENT SYSTEM.</b>
                  A case management judge will be assigned by the time this case first comes before a judge.
                </span>

              </div>
              <div className='d-flex small'>
                <div className='form-check px-0 me-2'>
                  <input
                    className=''
                    type='checkbox'
                    name='normal_track'
                    id='married_on'
                    checked={formData?.court_case?.normal_track?.checked === true || false}
                    onChange={changeFormCheck('court_case.normal_track.checked')}
                  />
                </div>
                <span className=' text-wrap '>
                  <b>THIS CASE IS ON THE STANDARD TRACK OF THE CASE MANAGEMENT SYSTEM. No court date has been set for this case </b>
                  but, if you have been served with a notice of motion, it has a court date and you or your lawyer should come to court for the motion. A case management judge will not be assigned until one of the parties asks the clerk of the court to schedule a case conference or until a motion is scheduled, whichever comes first.
                </span>

              </div>
            </div>

            <span className=' text-wrap py-2'>
              <b>IF, AFTER 365 DAYS, THE CASE HAS NOT BEEN SCHEDULED FOR TRIAL, </b>
              the clerk of the court will send out a warning that the case will be dismissed within 60 days unless the parties file proof that the case has been settled or one of the parties asks for a case or a settlement conference.
            </span>
            <span className=' text-wrap py-2'>
              <b>IF YOU WANT TO OPPOSE ANY CLAIM IN THIS CASE </b>
              you or your lawyer must prepare an Answer (Form 10 – a blank copy should be attached), serve a copy on the applicant(s) and file a copy in the court office with an Affidavit of Service (Form 6B).
              <br />

              <b>YOU HAVE ONLY 30 DAYS AFTER THIS APPLICATION IS SERVED ON YOU (60 DAYS IF THIS APPLICATION IS SERVED ON YOU OUTSIDE CANADA OR THE UNITED STATES) TO SERVE AND FILE AN ANSWER. IF YOU DO NOT, THE CASE WILL GO AHEAD WITHOUT YOU AND THE COURT MAY MAKE AN ORDER AND ENFORCE IT AGAINST YOU.</b>
            </span>

            <div>

              <span className=' text-wrap '>
                <i>Check the box of the paragraph that applies to your case</i>
              </span>
            </div>

            <div>

              <div className='d-flex small'>
                <div className='form-check px-0 me-2'>
                  <input
                    className=''
                    type='checkbox'
                    name='support_claim'
                    checked={formData?.court_case?.support_claim?.checked === true || false}
                    onChange={changeFormCheck('court_case.support_claim.checked')}

                  />
                </div>
                <span className=' text-wrap '>
                  This case includes a claim for support. It does not include a claim for property or exclusive possession of the matrimonial home and its contents. You <b>MUST</b> fill out a Financial Statement (Form 13 – a blank copy attached), serve a copy on the applicant(s) and file a copy in the court office with an Affidavit of Service even if you do not answer this case.
                </span>

              </div>
              <div className='d-flex small'>
                <div className='form-check px-0 me-2'>
                  <input
                    className=''
                    type='checkbox'
                    name='property_claim'
                    checked={formData?.court_case?.property_claim?.checked === true || false}
                    onChange={changeFormCheck('court_case.property_claim.checked')}
                  />
                </div>
                <span className=' text-wrap '>
                  This case includes a claim for property or exclusive possession of the matrimonial home and its contents. You <b> MUST</b> fill out a Financial Statement (Form 13.1 – a blank copy attached), serve a copy on the applicant(s) and file a copy in the court office with an Affidavit of Service even if you do not answer this case.
                </span>

              </div>
            </div>

            <div>

              <span className=' text-wrap '>
                <b>IF YOU WANT TO MAKE A CLAIM OF YOUR OWN</b>, you or your lawyer must fill out the claim portion in the Answer, serve a copy on the applicant(s) and file a copy in the court office with an Affidavit of Service.
              </span>
            </div>

            <div>
              <ul>
                <li>If you want to make a claim for support but do not want to make a claim for property or exclusive possession of the matrimonial home and its contents, you MUST fill out a Financial Statement (Form 13), serve a copy on the applicant(s) and file a copy in the court office.</li>

                <li>However, if your only claim for support is for child support in the table amount specified under the Child Support Guidelines, you do not need to fill out, serve or file a Financial Statement.</li>
                <li>If you want to make a claim for property or exclusive possession of the matrimonial home and its contents, whether or not it includes a claim for support, you MUST fill out a Financial Statement (Form 13.1, not Form 13), serve a copy on the applicant(s), and file a copy in the court office.</li>
              </ul>
            </div>

            <div>

              <span className=' text-wrap '>
                <b>YOU SHOULD GET LEGAL ADVICE ABOUT THIS CASE RIGHT AWAY.</b>, If you cannot afford a lawyer, you may be able to get help from your local Legal Aid Ontario office. (See your telephone directory under LEGAL AID.)

              </span>
            </div>

            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of issue"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'court_case.date_of_issue'}
                  value={formData?.court_case?.date_of_issue}
                  style={{ padding: "6px 0" }}
                />

              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Clerk of the court"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'courtName'}
                  value={""}
                  style={{ padding: "6px 0" }}

                />

              </Col>
            </Row>

            {/* <FamilyHistory8 changeFormCheck={changeFormCheck} formData={formData} fillFormData={fillFormData} /> */}
            <FamilyHistory changeFormCheck={changeFormCheck} formData={formData} fillFormData={fillFormData} />

            <ChildTable formData={formData} handleChildrenDataChange={handleChildrenDataChange} />
            {/* <ChildTable8 formData={formData} handleChildrenDataChange={handleChildrenDataChange} /> */}

            <div>
              <PreviousCasesOrAgreements8 formData={formData} changeFormCheck={changeFormCheck} fillFormData={fillFormData} />
            </div>
            <div>
              <Claims8 formData={formData} fillFormData={fillFormData} changeFormCheck={changeFormCheck} />
            </div>

            <div className='sub-heading mt-20px'>
              IMPORTANT FACTS SUPPORTING MY CLAIM FOR DIVORCE
            </div>

            <div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='seperation'
                  checked={formData?.important_facts?.seperation?.checked}
                  onChange={changeFormCheck('important_facts.seperation.checked')}
                />
                <div className='data-input' style={{ justifyContent: "start", fontSize: "12px" }}>
                  <span className='label'><b>Separation:</b><span>The spouses have lived separate and apart since (date)</span></span>
                  <input
                    className='form-control'
                    type='text'
                    id='seperation_date'
                    value={formData?.important_facts?.seperation?.date}
                    onChange={fillFormData('important_facts.seperation.date')}
                  />
                  {/* <span className='label'>at</span> */}
                </div>
              </div>
              <div className='form-check ms-3'>
              <input
                  className='form-check-input'
                  type='checkbox'
                  name='not_lived_together'
                  checked={formData?.important_facts?.seperation?.not_lived_together?.checked}
                  onChange={changeFormCheck('important_facts.seperation.not_lived_together.checked')}
                />
                <div className='data-input' style={{ justifyContent: "start", fontSize: "12px" }}>
                  <span className='label'>
                    have not lived together again since that date in an unsuccessful attempt to reconcile.</span>

                </div>
              </div>
              <div className='form-check ms-3'>
              <input
                  className='form-check-input'
                  type='checkbox'
                  name='lived_together'
                  checked={formData?.important_facts?.seperation?.lived_together?.checked}
                  onChange={changeFormCheck('important_facts.seperation.lived_together.checked')}
                />
                <div className='data-input' style={{ justifyContent: "start", fontSize: "12px" }}>
                  <span className='label'>
                    have lived together again during the following period(s) in an unsuccessful attempt to reconcile: (Give dates.)</span>

                </div>
              </div>

            </div>

            <div>
              <div className='form-check'>
              <input
                  className='form-check-input'
                  type='checkbox'
                  name='lived_together'
                  checked={formData?.important_facts?.adultry?.checked}
                  onChange={changeFormCheck('important_facts.adultry.checked')}
                />
                <div className='data-input' style={{ justifyContent: "start", fontSize: "12px" }}>
                  <span className='label'><b>Adultery:</b></span>

                </div>
              </div>

              <BoldandThinText thin="The respondent has committed adultery. (Give details. It is not necessary to name any other person involved but, if you do name the other person, then you must serve this application on the other person.)" />
              <textarea rows={5} className='border-0 w-100' value={formData?.important_facts?.adultry?.details} onChange={fillFormData('important_facts.adultry.details')} />
            </div>

            <div>
              <div className='form-check'>
              <input
                  className='form-check-input'
                  type='checkbox'
                  name='cruelty'
                  checked={formData?.important_facts?.cruelty?.checked}
                  onChange={changeFormCheck('important_facts.cruelty.checked')}
                />
                <div className='data-input' style={{ justifyContent: "start", fontSize: "12px" }}>
                  <span className='label'><b>Cruelty:</b></span>

                </div>
              </div>

              <BoldandThinText thin="The respondent has treated the applicant with physical or mental cruelty of such a kind as to make continued cohabitation intolerable. (Give details.)" />
              <textarea rows={5} className='border-0 w-100' value={formData?.important_facts?.cruelty?.details} onChange={fillFormData('important_facts.cruelty.details')} />
            </div>

            <div>
              <BoldandThinText centered bold={"IMPORTANT FACTS SUPPORTING MY OTHER CLAIM(S)"} />
              <div className="label small">
                <i>(Set out below the facts that form the legal basis for your other claim(s). Attach an additional page if you need more space.)</i>
              </div>

              <textarea rows={5} className='border-0 w-100' value={formData?.important_facts?.other_claims?.details} onChange={fillFormData('important_facts.other_claims.details')} />
              <div className="label small">
                <i>Put a line through any blank space left on this page. If additional space is needed, extra pages may be attached.</i>
              </div>

            </div>

            <div className='sub-heading mt-20px'>
              LAWYER’S CERTIFICATE
            </div>

            <div className='data-input'>
              <label className='label'>My name is:</label>
              <input
                type='text'
                className='form-control'
                value={formData?.applicantsLawyer?.fullLegalName}
                onChange={fillFormData('applicantsLawyer.fullLegalName')}
              />
            </div>
            <BoldandThinText thin={`and I am the applicant’s lawyer in this divorce case. I certify that I have complied with the requirements of section 9 of
         the Divorce Act.`} />

            <Row>

              <Col xs={6}>
                <BorderLessInput
                  label={"Date"}
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
                  label={"Signature of Lawyer"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'courtName'}
                  value={""}
                  style={{ padding: "6px 0" }}

                />

              </Col>
            </Row>

          </Row>

        </div>
      )}
    </>
  )
}

export default ONTFORM8