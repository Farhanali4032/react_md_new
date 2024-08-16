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
import { Form10A, Form23, Form6B, OntComponents } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'

const ONTCOMPONENTS = ({ targetRef, matterId, onFormDataSave, savedData }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    let data = {
      matterId: matterId,
      file_id: savedData.file_id,
      folder_id:  savedData.folder_id,
    }
    dispatch(getFileData(data))
  },[])

  const selectFileData = useSelector(selectGetFileData);

  const { pdfData, loading } = OntComponents(matterId);

  useEffect(() => {
    if(selectFileData && selectFileData[0]){
      setFormData(JSON.parse(selectFileData[0].file_data))
    }
    else if(pdfData) {
      setFormData(pdfData);
    }
  }, [loading, formData,selectFileData])

  const [formData, setFormData] = useState()
  

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
    { label: 'Full legal name:', value: formData?.assignee.fullLegalName, type: 'text', update: 'assignee.fullLegalName' },
    { label: 'Address:', value: formData?.assignee.address, type: 'text', update: 'assignee.address' },
    { label: 'Phone & fax:', value: formData?.assignee.phoneAndFax, type: 'text', update: 'assignee.phoneAndFax' },
    { label: 'Email:', value: formData?.assignee.email, type: 'email', update: 'assignee.email' },
];

const AssigneeLawyerData = [
    { label: 'Full legal name:', value: formData?.assigneeLawyer.fullLegalName, type: 'text', update: 'assigneeLawyer.fullLegalName' },
    { label: 'Address:', value: formData?.assigneeLawyer.address, type: 'text', update: 'assigneeLawyer.address' },
    { label: 'Phone & fax:', value: formData?.assigneeLawyer.phoneAndFax, type: 'text', update: 'assigneeLawyer.phoneAndFax' },
    { label: 'Email:', value: formData?.assigneeLawyer.email, type: 'email', update: 'assigneeLawyer.email' },
];

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
                value={formData?.courtName}
                style={{ padding: "6px 0" }}

              />
              <BorderLessInput
                label={"Court Office Address"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'courtOfficeAddress'}
                value={formData?.courtOfficeAddress}
                style={{ padding: "6px 0" }}

              />
            </Col>
            <Col xs={3}>
              <BorderLessInput
                value={formData?.courtFileNumber}
                label={"Court File Number"}
                type={"text"}
                onChange={fillFormData}
                update={"courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
              />
              <FormInfo 
                number="23"
                format={"Summons to Witness"}
              />
              <BorderLessInput
                value={formData?.applicationType}
                type={"text"}
                onChange={fillFormData}
                update={"applicationType"}
                topheading
                style={{ marginTop: "-25px" }}
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
              <ApplicationTable heading="Assignee’s Lawyer" data={AssigneeLawyerData} onChange={fillFormData} />
            </Col>
          </Row>

          <Row className='pb-3'>
            {/* Applicants */}
            <Row className='py-1'>
                <div className="fw-bolder small">Applicant(s)</div>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Full legal name & address for service — street & number, municipality,
                            postal code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.applicants.applicant1}
                            onChange={fillFormData('applicants.applicant1')}></textarea>
                        <textarea rows="2" value={formData?.applicants.applicant2}
                            onChange={fillFormData('applicants.applicant2')}></textarea>
                    </div>
                </Col>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Lawyer’s name & address — street & number, municipality, postal
                            code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.applicantsLawyer.lawyer1}
                            onChange={fillFormData('applicantsLawyer.lawyer1')}></textarea>
                        <textarea rows="2" value={formData?.applicantsLawyer.lawyer2}
                            onChange={fillFormData('applicantsLawyer.lawyer2')}></textarea>
                    </div>
                </Col>
           </Row>
             {/* Respondents */}
             <Row className='py-1'>
                <div className="fw-bolder small">Respondent(s)</div>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Full legal name & address for service — street & number, municipality,
                            postal code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.respondents.respondent1}
                            onChange={fillFormData('respondents.respondent1')}></textarea>
                        <textarea rows="2" value={formData?.respondents.respondent2}
                            onChange={fillFormData('respondents.respondent2')}></textarea>
                    </div>
                </Col>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Lawyer’s name & address — street & number, municipality, postal
                            code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.respondentsLawyer.lawyer1}
                            onChange={fillFormData('respondentsLawyer.lawyer1')}></textarea>
                        <textarea rows="2" value={formData?.respondentsLawyer.lawyer2}
                            onChange={fillFormData('respondentsLawyer.lawyer2')}></textarea>
                    </div>
                </Col>
            </Row>

          </Row>

          <Row className='pb-3'>
            {/* Applicants */}
            <Row className='py-1'>
                <div className="fw-bolder small">Applicant(s)</div>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Full legal name & address for service — street & number, municipality,
                            postal code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.applicants.applicant1}
                            onChange={fillFormData('applicants.applicant1')}></textarea>
                    </div>
                </Col>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Lawyer’s name & address — street & number, municipality, postal
                            code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.applicantsLawyer.lawyer1}
                            onChange={fillFormData('applicantsLawyer.lawyer1')}></textarea>
                    </div>
                </Col>
           </Row>
             {/* Respondents */}
             <Row className='py-1'>
                <div className="fw-bolder small">Respondent(s)</div>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Full legal name & address for service — street & number, municipality,
                            postal code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.respondents.respondent1}
                            onChange={fillFormData('respondents.respondent1')}></textarea>
                    </div>
                </Col>
                <Col xs={6} className='ps-0'>
                    <div className="data-group">
                        <label>
                            Lawyer’s name & address — street & number, municipality, postal
                            code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.respondentsLawyer.lawyer1}
                            onChange={fillFormData('respondentsLawyer.lawyer1')}></textarea>
                    </div>
                </Col>
            </Row>

          </Row>
          
          <Row className='pb-3'>
                <div className="fw-bolder small">Children's Lawyer</div>
                <Col xs={12} className='ps-0'>
                    <div className="data-group">
                        <label>
                        Name & address of Children’s Lawyer’s agent for service (street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)) and name of person represented.
                        </label>
                        <textarea rows="2" value={formData?.childrensLawyer.lawyer1}
                            onChange={fillFormData('respondentsLawyer.lawyer1')}></textarea>
                        <textarea rows="2" value={formData?.childrensLawyer.lawyer2}
                            onChange={fillFormData('respondentsLawyer.lawyer2')}></textarea>
                    </div>
               </Col>
          </Row>

        </div>
      )}
    </>
  )
}

export default ONTCOMPONENTS