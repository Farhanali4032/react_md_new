import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Form, Row } from 'react-bootstrap'
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
import { Form23, Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import CurrencyFormat from 'react-currency-format';

const ONTFORM23 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
  console.log("🚀 ~ ONTFORM23 ~ formData:", formData)

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
    if (formData && formData.allowance) {
      const amount = parseFloat(formData?.allowance?.appearance_allowance?.amount) || 0;
      const calculatedDays = parseFloat(formData?.allowance?.calculated_days) || 0;
      const appearanceAllowanceTotal = amount * calculatedDays;

      const travelAmount = parseFloat(formData?.allowance?.travel_allowance?.amount) || 0;
      const travelAllowanceTotal = travelAmount * calculatedDays;
      console.log("🚀 ~ useEffect ~ travelAllowanceTotal:", travelAllowanceTotal)

      const hotelAmount = parseFloat(formData?.allowance?.hotel_allowance?.amount) || 0;

      const total = appearanceAllowanceTotal + travelAllowanceTotal + hotelAmount;

      setFormData(prevState => ({
        ...prevState,
        allowance: {
          ...prevState.allowance,
          appearance_allowance: {
            ...prevState.allowance.appearance_allowance,
            total: appearanceAllowanceTotal
          },
          travel_allowance: {
            ...prevState.allowance.travel_allowance,
            total: travelAllowanceTotal
          },
          total: total
        }
      }));
    }
  }, [formData?.allowance?.appearance_allowance?.amount,
    formData?.allowance?.calculated_days,
    formData?.allowance?.travel_allowance?.amount,
    formData?.allowance?.hotel_allowance?.amount])

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM23',
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
            <Col xs={9}>
              <BorderLessInput
                label={"(Name of Court)"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtName'}
                value={formData?.court_info?.courtName}
                style={{ padding: "6px 0" }}

              />
              <BorderLessInput
                label={"Court Office Address"}
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'court_info.courtOfficeAddress'}
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
                update={"court_info.courtFileNumber"}
                topheading
                style={{ marginTop: "-25px", border: "1px solid black" }}
                name="court-number"
              />
              <FormInfo
                number="23"
                format={"Summons to Witness"}
              />
            </Col>
          </Row>



          <Row className='py-4'>
            <ApplicationTable data={formData} type="two-rows" heading={'Applicant(s)'} applicant />
          </Row>
          <Row className='py-4'>
            <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Respondent(s)'} respondent />
          </Row>

          <Row>
            <div className='form-check  pb-2' style={{ paddingLeft: "12px" }}>
              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label ps-0'><b>TO: </b> (full legal name of witness)</span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.applicant?.fullLegalName}
                  onChange={fillFormData('applicant.fullLegalName')}
                />

              </div>
              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label ps-0'><b>of </b>(address: street & number, municipality, postal code)</span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.applicant?.address + ', ' + formData?.applicant?.municipality || formData?.applicant?.fulladdress}
                  onChange={fillFormData('applicant.fulladdress')}

                />

              </div>
            </div>

            <BoldandThinText bold={`YOU MUST `} />

            <div className='form-check  pb-2' style={{ paddingLeft: "12px" }}>

              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label ps-0'><b>(1) come to </b>  (address: street & number, municipality)</span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.come_to?.address}
                  onChange={fillFormData('come_to.address')}
                />

              </div>
              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label ps-0'><b>on</b> <i>(date)</i></span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.come_to?.date}
                  onChange={fillFormData('come_to.date')}
                />
                <span className='label ps-0'><b>at</b></span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.come_to?.time}
                  onChange={fillFormData('come_to.time')}

                />
                <span className='label ps-0' style={{ color: "blue" }}><b>am/pm</b></span>


              </div>
            </div>


            <BoldandThinText
              bold={`(2) give evidence in the case or examination before `}
              thin={"(court or other person)"}
            />
            <BorderLessInput
              type={"text"}
              fileno
              onChange={fillFormData}
              update={'give_evidence.details'}
              value={formData?.give_evidence?.details}
              style={{ padding: "6px 0" }}

            />

            <BoldandThinText
              bold={"(3) bring with you the documents and things listed on the back of this summons; and"}
            />

            <BoldandThinText
              bold={"(4) remain there until this case or examination is finished or until the person conducting it says otherwise."}
            />
            <Row>
              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label ps-0'> With this summons, you should get a fee that is calculated for</span>
                <input
                  type='text'
                  className='custom-input-control input-small'
                  value={formData?.allowance?.calculated_days}
                  onChange={fillFormData('allowance.calculated_days')}
                />
                <span className='label'>  day(s) of attendance as follows:</span>
              </div>
            </Row>
            <Col xs={10} className='mx-auto'>
              <Row>
                <Col xs={6}>

                  <div className='form-check  pb-2' style={{ paddingLeft: "12px" }}>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label ps-0'>Appearance allowance of $</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.allowance?.appearance_allowance?.amount}
                        thousandSeparator={false}
                        onChange={fillFormData('allowance.appearance_allowance.amount')}
                        style={{ width: "100px" }}
                      />
                      <span>daily</span>

                    </div>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label ps-0'>Travel allowance of $</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.allowance?.travel_allowance?.amount}
                        thousandSeparator={false}
                        onChange={fillFormData('allowance.travel_allowance.amount')}
                        style={{ width: "100px" }}
                      />

                      <span className='label ps-0'>each way</span>

                    </div>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label ps-0'>Overnight hotel and meal allowance</span>
                    </div>
                  </div>


                </Col>
                <Col xs={6} className='text-center'>

                  <div className='form-check  pb-2' style={{ paddingLeft: "12px" }}>

                    <div className='data-input ' style={{ justifyContent: "center" }}>
                      <span className='label ps-0'>$</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.allowance?.appearance_allowance?.total}
                        thousandSeparator={false}
                        onChange={fillFormData('allowance.appearance_allowance.total')}
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div className='data-input ' style={{ justifyContent: "center" }}>
                      <span className='label ps-0'>$</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.allowance?.travel_allowance?.total}
                        thousandSeparator={false}
                        onChange={fillFormData('allowance.travel_allowance.total')}
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div className='data-input ' style={{ justifyContent: "center" }}>
                      <span className='label ps-0'>$</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.allowance?.hotel_allowance?.amount}
                        thousandSeparator={false}
                        onChange={fillFormData('allowance.hotel_allowance.amount')}
                        style={{ width: "100px" }}
                      />
                    </div>

                    <div className='data-input d-flex' style={{ justifyContent: "center", marginLeft: "-34px" }}>
                      <div>
                        <span className='label ps-0' > Total $</span>
                      </div>
                      <div>
                        <CurrencyFormat
                          className='custom-input-control'
                          value={formData?.allowance?.total}
                          thousandSeparator={false}
                          onChange={fillFormData('allowance.total')}
                          style={{ width: "100px" }}
                        />
                      </div>


                    </div>

                  </div>


                </Col>

              </Row>
            </Col>










            <BoldandThinText
              thin={"If the case or examination takes up more of your time, you will be entitled to an additional fee."}
            />

          </Row>

          <Row className='py-5'>
            <Col xs={6} style={{ borderRight: "2px solid black" }}>
              <div>
                <BorderLessInput
                  label={"Date of issue"}
                  type={"date"}
                  fileno
                  onChange={fillFormData}
                  update={'signature.date_of_issue'}
                  value={formData?.signature?.date_of_issue}
                  style={{ padding: "6px 0" }}

                />
              </div>
            </Col>
            <Col xs={6}>
              <div>
                <BoldandThinText
                  bold={`IF YOU DO NOT COME AND REMAIN AS REQUIRED BY THIS SUMMONS, A WARRANT MAY BE ISSUED FOR YOUR ARREST.`} />
              </div>
            </Col>
          </Row>


          <Row style={{ border: "1px solid black" }} >
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ fontSize: "14px" }}>(Give the date of every document that the witness must bring and give enough of a description to identify each document or thing that the witness must bring.)</Form.Label>
                <Form.Control as="textarea" className='border-0' rows={20} onChange={fillFormData('date_of_documents.details')} value={formData?.date_of_documents?.details} />
              </Form.Group>
            </Form>
          </Row>
          <Row className='mt-3' style={{ border: "1px solid black" }} >
            <Col xs={3} style={{ borderRight: "2px solid black" }}>
              <div className='py-2'>
                <i style={{ fontSize: "14px" }}>
                  Name, address, telephone & fax numbers and e-mail address (if any) of person or lawyer who prepared this summons.
                </i>

              </div>
            </Col>
            <Col xs={9}>
              <textarea className='border-0 w-100' rows={5} value={formData?.prepared_summons?.details}
                onChange={fillFormData('prepared_summons.details')} />
            </Col>
          </Row>

        </div>
      )}
    </>
  )
}

export default ONTFORM23