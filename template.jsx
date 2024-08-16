import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from './shared/FormHeading'
import { Col, Row } from 'react-bootstrap'
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
import { Form6B } from '../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'

const __COMPONENT_NAME__ = ({ targetRef, matterId, onFormDataSave, savedData }) => {

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

  const { pdfData, loading } = Form6B(matterId);

  useEffect(() => {
    if(selectFileData && selectFileData[0]){
      setFormData(JSON.parse(selectFileData[0].file_data))
    }
    else if(pdfData) {
      setFormData(pdfData);
    }
  }, [loading, formData,selectFileData])

  const [formData, setFormData] = useState()
  console.log("🚀 ~ FORM6B ~ formData:", formData)

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
                label={"court Office Address"}
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
                style={{ marginTop: "-25px" }}
              />
              <FormInfo
                number="6B"
                format={"Affidavit of Service sworn/affirmed"}
              />
              <BorderLessInput
              value={formData?.applicationType}
              type={"text"}
              onChange={fillFormData}
              update={"applicationType"}
              topheading
              style={{ marginTop: "-25px" }}
            />
              {/* <div className='text-start py-2'>
                <RadioChecks
                  name={"divorce_type"}
                  id={"simple"}
                  label={"Simple (divorce only)"}
                  value={"simple"}
                  checked={formData?.applicationType}
                  fillFormData={fillFormData}

                  type={'applicationType'}
                />
                <RadioChecks
                  name={"divorce_type"}
                  id={"joint"}
                  label={"joint"}
                  value={"joint"}
                  checked={formData?.applicationType}
                  fillFormData={fillFormData}
                  type={'applicationType'}
                />
              </div> */}

            </Col>
          </Row>

          <Row className='pb-3'>
            <ApplicationTable
              onChange={fillFormData}
              heading={'Applicant'}
            />
          </Row>

        </div>
      )}
    </>
  )
}

export default __COMPONENT_NAME__