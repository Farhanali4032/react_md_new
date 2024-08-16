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
import { formatDate } from '../../../../utils/matterValidations/matterValidation'
import TextArea from '../shared/TextArea'

const ONTFORM25A = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
      if (e.target.name === "court-number") {
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

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM25A',
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
                type={"textarea"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtOfficeAddress'}
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
                update={"court_info.courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
                name="court-number"
              />
              <FormInfo
                number="25A"
                format={"Divorce Order"}
              />
              <BorderLessInput
                value={formData?.applicationType.applicationType}
                type={"text"}
                onChange={fillFormData}
                update={"applicationType.applicationTupe"}
                topheading
                style={{ marginTop: "-25px" }}
              />
            </Col>
          </Row>

          <ApplicationTable data={formData} fillFormData={fillFormData} type="two-rows" heading={'Applicant(s)'} applicant judgeSide />
          <ApplicationTable data={formData} fillFormData={fillFormData} type="two-rows" heading={'Respondent(s)'} respondent judgeSide />

          <Row>


            <div className='pb-3'>

              <div className='form-check ps-0'>

                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className='label'> The Court considered an application of (name)</span>

                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.applicant?.fullLegalName}
                    onChange={fillFormData('applicant.fullLegalName')}
                  />

                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.applicant?.fullLegalName_2}
                    onChange={fillFormData('applicant.fullLegalName_2')}
                  />
                </div>

                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className='label'>on (date)</span>
                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.application_date?.date}
                    onChange={fillFormData('application_date.date')}
                  />
                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className=' '>The following persons were in court (Give names of parties and lawyers in court. This paragraph may be struck out if the divorce is uncontested.)</span>
                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>

                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.persons_in_court?.line1}
                    onChange={fillFormData('persons_in_court.line1')}
                  />


                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>

                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.persons_in_court?.line2}
                    onChange={fillFormData('persons_in_court.line2')}
                  />


                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className=' '>The court received evidence and considered submissions on behalf of (name or names)</span>
                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>

                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.received_evidence?.line1}
                    onChange={fillFormData('received_evidence.line1')}
                  />


                </div>
                <div className='data-input' style={{ justifyContent: "start" }}>

                  <input
                    type='text'
                    className='custom-input-control'
                    value={formData?.received_evidence?.line2}
                    onChange={fillFormData('received_evidence.line2')}
                  />

                </div>

              </div>



            </div>
          </Row>

          <Row>
            <div className="fw-bolder">THIS COURT ORDERS THAT</div>
            <Col xs={2} className='pe-0'>

              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className=' '>If the court decides that the divorce should take effect earlier, replace "31" with the smaller number.</span>



              </div>

            </Col>
            <Col xs={10}>
              <ol>
                <li>

                  <div className='form-check ps-0'>

                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'><i> (full legal names of spouses)</i></span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.applicant?.fullLegalName}
                        onChange={fillFormData('applicant.fullLegalName')}
                      />

                    </div>

                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>who were married at (place)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.relationshipDates?.placeOfMarriage}
                        onChange={fillFormData('relationshipDates.placeOfMarriage')}
                      />


                    </div>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label'>on (date)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formatDate(formData?.relationshipDates?.marriedOn?.date, '-')}
                        onChange={fillFormData('relationshipDates.marriedOn.date')}

                      />


                    </div>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className=' '>be divorced and that the divorce take effect 31 days after the date of this order.</span>



                    </div>
                    <span className='small'><i>(Add further paragraphs where the court orders other relief.)</i></span>
                    <div className='data-input' style={{ justifyContent: "start" }}>

                      <textarea
                        className='custom-input-control'
                        onChange={fillFormData('other_relief')}
                        value={formData?.otherRelief}
                        rows={10} />
                    </div>

                  </div>
                </li>
              </ol>

            </Col>
          </Row>


          <div className='row py-10px  mt-30px border-top border-2 border-dark' />

          <Row className='pb-2 pt-5'>
            <Col xs={6}>
              <BorderLessInput
                label={"Date of signature"}
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
                label={"Signature of judge or clerk of the court"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'signature.date'}
                value={""}
                style={{ padding: "6px 0" }}

              />
            </Col>
            <BoldandThinText italic bold={"NOTE:"} thin={" Neither spouse is free to remarry until this order takes effect, at which time you can get a "} secondbold={"Certificate of Divorce "}
              secondthin={"from the court office."}
            />
          </Row>

        </div>
      )}
    </>
  )
}

export default ONTFORM25A