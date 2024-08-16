import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Margin, usePDF } from 'react-to-pdf'
import { calculateAge } from '../../../utils/matterValidations/matterValidation'
import moment from 'moment'
import { Form8A, FormInformation } from '../../../utils/Apis/matters/CustomHook/PDFData'
import Loader from '../../Loader'
import { selectGetFileData } from '../../../utils/Apis/matters/getFileData/getFileDataSelector'
import { getFileData } from '../../../utils/Apis/matters/getFileData/getFileDataActions'
import FormHeading from './shared/FormHeading'
import { Col, Row } from 'react-bootstrap'
import Seal from './shared/Seal'
import BorderLessInput from './shared/BorderLessInput'
import FormInfo from './shared/FormInfo'
import RadioChecks from './shared/RadioChecks'
import ApplicationTable from './shared/ApplicationTable'
import Listings from './shared/FormListings'
import ClaimText from '../Components/Form8A/ClaimText'
import ChildTable from '../Components/Form8A/ChildTable'
import BoldandThinText from './shared/BoldandThinText'
import PreviousCasesOrAgreements from '../Components/Form8A/PreviousCases'
import DynamicTextArea from './shared/TextArea'
import Claims from '../Components/Form8A/Claims'
import LawyerCertificate from '../Components/Form8A/LawyerCertificate'
import FamilyHistory from '../Components/Form8A/FamilyHistory'
import Facts from '../Components/Form8A/Facts'
import FormHeader from './shared/FormHeader'

const ApplicationDivorce8A = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

  useEffect(() => {
    let data = {
      matterId: matterId,
      file_id: savedData.file_id,
      folder_id: savedData.folder_id,
    }
    dispatch(getFileData(data))
  }, [])

  const selectFileData = useSelector(selectGetFileData);

  const dispatch = useDispatch()

  // const { pdfData, loading } = Form8A(matterId);
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
  console.log("🚀 ~ ApplicationDivorce8A ~ formData:", formData)


  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM8A',
      data: formData,
    })
  }, [formData])

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

  const handleRadioChange = (field, value) => {
    setFormData(prevState => ({
        ...prevState,
        applicant: {
            ...prevState.applicant,
            [field]: value
        }
    }));
};

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





  const certificateitems = [
    [
      { text: `Exercise your decision-making responsibility, parenting time, or contact with a child in a manner that is·•·consistent with the child's best interests;`, isLink: false },
    ],
    [
      { text: 'Protect the child from conflict arising from this case, to the best of your ability;', isLink: false },
    ],
    [
      { text: `Try to resolve your family law issues by using out-of-court dispute resolution options, if it is appropriate in your case (for more information on dispute resolution options available to you, including court-connected mediation, you can visit theMinistry of the Attorney General's websiteor www.stepstojustice.ca);`, isLink: false },
    ],

    [
      { text: `Try to resolve your family law issues by using out-of-court dispute resolution options, if it is appropriate in your case (for more information on dispute resolution options available to you, including court-connected mediation, you can visit `, isLink: false },
      { text: `theMinistry of the Attorney General's website`, isLink: true, url: 'https://www.ontario.ca/page/family-law-services' },
      { text: 'or', isLink: false },
      { text: `www.stepstojustice.ca`, isLink: true, url: 'https://stepstojustice.ca/' },
    ],
    [
      { text: 'Provide complete, accurate, and up-to-date information in this case; and', isLink: false },
    ],
    [
      { text: `Comply with any orders made in this case.`, isLink: false },
    ],

  ];


  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (


        <div className='pdf-form pdf-form-8A mt-10px px-4' ref={targetRef}>

          <div>
            <FormHeader
              topheading={"ONTARIO"}
              SealText={"SEAL"}
              onChange={fillFormData}
              labelname={"(Name of Court)"}
              typename={"text"}
              divorce
              updatename={'court_info.courtName'}
              valuename={formData?.court_info.courtName}
              labeladdress={"Court Office Address"}
              typeaddress={"text"}
              updateaddress={'court_info.courtOfficeAddress'}
              valueaddress={formData?.court_info.courtOfficeAddress}
              labelcourt={"Court File Number"}
              typecourt={"textarea"}
              valuecourt={formData?.court_info.courtFileNumber}
              updatecourt={"court_info.courtFileNumber"}
              formnumber={"8A"}
              formformat={"Application"}
              formtype={"Divorce"}
              divorcename={"divorce_type"}
              divorceid={"simple"}
              divorcelabel={"Simple (divorce only)"}
              divorcevalue={"simple"}
              divorcechecked={formData?.court_info.applicationType}
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


            <ClaimText fillFormData={fillFormData} formData={formData} changeFormCheck={changeFormCheck} />

          </div>
          <Row className={"py-2"}>
            <Col xs={6}>
              <BorderLessInput
                label={"Date of issue"}
                fileno
                onChange={fillFormData}
                update={'dateOfIssue'}
                value={formData?.dateOfIssue}
                style={{ padding: "6px 0" }}
                type={"date"}

              />
            </Col>
            <Col xs={6}>
              <BorderLessInput
                label={"Clerk of the court"}
                fileno
                onChange={fillFormData}
                update={'clerkOfTheCourt'}
                value={formData?.clerkOfTheCourt}
                style={{ padding: "6px 0" }}
                type={"text"}

              />
            </Col>
          </Row>


          <FamilyHistory changeFormCheck={changeFormCheck} formData={formData} fillFormData={fillFormData} />


          <div>
            <BoldandThinText
              bold={"THE CHILD(REN)"}
            />
            <BoldandThinText
              thin={` List all children involved in this case, even if no claim is made
                for these children.`}
              italic
            />
            <ChildTable formData={formData} handleChildrenDataChange={handleChildrenDataChange} />
          </div>

          <div>
            <PreviousCasesOrAgreements formData={formData} fillFormData={fillFormData} />
          </div>


          <div>
            <Claims formData={formData} changeFormCheck={changeFormCheck} fillFormData={fillFormData} />
          </div>




          {/* Facts */}
          <Facts changeFormCheck={changeFormCheck} formData={formData} fillFormData={fillFormData} />

          {/* Claims 3 */}
          <div className='row  mt-40px'>
            <div className='border border-2 border-dark pb-3'>


              <BoldandThinText bold={` USE THIS FRAME ONLY IF THIS CASE IS A JOINT APPLICATION FOR DIVORCE.`} />
              <div className='border-bottom border-2 border-dark'></div>

              <BoldandThinText thin={`The details of the other order(s) that we jointly ask the court to
                  make are as follows: (Include any amount of support and the names
                  of the children for whom support, decision-making responsibility,
                  parenting time or contact is to be ordered.)`} />


              <DynamicTextArea
                rows={5}
                updates={'importantFacts.detailsOfOtherOrder'}
                fillFormData={fillFormData}
                value={formData?.importantFacts?.detailsOfOtherOrder}
              />

              <div className='sub-heading mt-20px'>
                IMPORTANT FACTS SUPPORTING OUR CLAIM(S)
              </div>
              <BoldandThinText thin={"  (Set out the facts that form the legal basis for your claim(s).Attach an additional page if you need more space.)"} />

              <DynamicTextArea
                heading={"Adultery Details"}
                rows={10}
                updates={'importantFacts.legalBasisFacts'}
                fillFormData={fillFormData}
                value={formData?.importantFacts?.legalBasisFacts}
              />

            </div>
          </div>


          <div className=' pt-40px' >
            <p className='sub-heading'>APPLICANT'S CERTIFICATE</p>

            <p className='paragraph fst-italic small'>
              (Your lawyer, if you are represented, must complete the Lawyer's
              Certificate below.)
            </p>
            <p className='paragraph small'>
              Sections 7.1 to 7.5 of the Divorce Act and section 33.1 of the
              Children's Law Reform Act require you and the other party to:
            </p>
            <Listings items={certificateitems} />
            <BoldandThinText bold={"We/I"} thin={" certify that "} secondbold={"we are/I am"} secondthin={` aware of these duties
              under the Divorce Act and the Children's Law Reform Act. `} />
            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'applicantsCertificate.divorce.details'}
              value={formData?.applicantsCertificate?.divorce?.details}
              style={{ padding: "3px 0" }}

            />
            <BoldandThinText thin={` Complete this section if your only claim is for a divorce. Your
              lawyer, if you are represented, must complete the Lawyer's Certificate
              below.`} />
            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of signature"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  update={'applicantsCertificate.divorce.date'}
                  value={formData?.applicantsCertificate?.divorce?.date}
                  style={{ padding: "6px 0" }}
                />
              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Signature of joint applicant"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'applicantsCertificate.divorce.signature'}
                  value={formData?.applicantsCertificate?.divorce?.signature}
                  style={{ padding: "6px 0" }}

                />
              </Col>
            </Row>
            <div className='row pb-10px  mt-30px border-top border-2 border-dark' />
            <BoldandThinText thin={" Complete this section if you are making a joint application for divorce."} />
            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of signature"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  update={'applicantsCertificate.jointDivorce.sig1.date'}
                  value={formData?.applicantsCertificate?.jointDivorce?.sig1?.date}
                  style={{ padding: "6px 0" }}

                />
              </Col>
              <Col xs={6}>
                <BorderLessInput
                  label={"Signature of joint applicant"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'applicantsCertificate.jointDivorce.sig1.signature'}
                  value={formData?.applicantsCertificate?.jointDivorce?.sig1?.signature}
                  style={{ padding: "6px 0" }}

                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <BorderLessInput
                  label={"Date of signature"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  update={'applicantsCertificate.jointDivorce.sig2.date'}
                  value={formData?.applicantsCertificate?.jointDivorce?.sig2?.date}
                  style={{ padding: "6px 0" }}

                />

              </Col>
              <Col xs={6}>

                <BorderLessInput
                  label={"Signature of joint applicant"}
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'applicantsCertificate.jointDivorce.sig1.signature'}
                  value={formData?.applicantsCertificate?.jointDivorce.sig2?.signature}
                  style={{ padding: "6px 0" }}

                />




              </Col>

            </Row>
          </div>

          <LawyerCertificate fillFormData={fillFormData} formData={formData} />


        </div>
      )}
    </>
  )
}

export default ApplicationDivorce8A;

