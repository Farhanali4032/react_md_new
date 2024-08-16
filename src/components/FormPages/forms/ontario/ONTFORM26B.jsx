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
import CheckBox from '../shared/CheckBox'
import CurrencyFormat from 'react-currency-format';
import { emptySpecialExpenses } from '../../../../utils/matterData/emptyDataArray'
const ONTFORM26B = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
  console.log("🚀 ~ ONTFORM26B ~ formData:", formData)


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

  const handleInputChange = (path, value) => {
    const pathArray = path.split('.');
    setFormData(prevState => {
      const updatedData = { ...prevState };
      let tempData = updatedData;
      for (let i = 0; i < pathArray.length - 1; i++) {
        tempData = tempData[pathArray[i]];
      }
      tempData[pathArray[pathArray.length - 1]] = value;
      return updatedData;
    });
  };

  const handleIndexChange = (path) => (event) => {
    handleInputChange(path, event.target.value);
  };

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM26B',
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
                number="26B"
                format={"Affidavit"}
              />
              <div className='data-input text-end'>
                <span className='label  text-wrap small'> <b>for Filing Domestic Contract with Court</b></span>
              </div>
              <div className='form-check pb-3'>

                <div className='data-input ' style={{ justifyContent: "start" }}>

                  <span className='label'> <b>Dated</b></span>
                  <input
                    type='date'
                    className='custom-input-control'
                    onChange={fillFormData('document_dated')}
                    value={formData?.document_dated}
                  />

                </div>

              </div>

            </Col>
          </Row>


          <Row className='pb-3'>
            <ApplicationTable data={formData} type="one-row" fillFormData={fillFormData} heading={'Recipient(s)'} applicant />
          </Row>
          <Row className='pb-3'>
            <ApplicationTable data={formData} type="one-row" fillFormData={fillFormData} heading={'Payor(s)'} respondent />
          </Row>

          <div className='d-flex'>
            <div className='data-input'>
              <span className='label'><b>My name</b> is <i>(full legal name)</i>  </span>
            </div>
            <div className='w-100'>
              <div className='data-input mt-2'>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.applicant?.fullLegalName}
                  onChange={fillFormData('applicant.fullLegalName')}
                />
              </div>
            </div>
          </div>
          <div className='d-flex'>
            <div className='data-input'>
              <span className='label'><b>I live in </b> <i>(municipality & province)</i> </span>
            </div>
            <div className='w-100'>
              <div className='data-input mt-2'>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.applicant?.municipality}
                  onChange={fillFormData('applicant.municipality')}
                />
              </div>
            </div>
          </div>
          <div>
            <div className='data-input'>
              <span className='label'><b>and I swear/affirm that the following is true:</b></span>
            </div>
          </div>

          <ol>

            <li>
              <Row>
                <Col xs={4}>
                  <div>
                    <div className='data-input'>
                      <span className='label'>I attach a copy of a</span>
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <CheckBox
                    id="special_service"
                    label={`marriage contract`}
                    value={formData?.item1?.marriage_contract?.isChecked}
                    labelinput={'item1.marriage_contract.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item1?.marriage_contract?.isChecked || false}
                    type={`checkbox`}
                  />
                  <CheckBox
                    id="special_service"
                    label={`separation agreement`}
                    value={formData?.item1?.separation?.isChecked}
                    labelinput={'item1.separation.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    type={`checkbox`}
                    checked={formData?.item1?.separation?.isChecked || false}
                  />
                </Col>
                <Col xs={4}>
                  <CheckBox
                    id="special_service"
                    label={`cohabitation agreement`}
                    value={formData?.item1?.cohabitation_agreement?.isChecked}
                    labelinput={'item1.cohabitation_agreement.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    type={`checkbox`}
                    checked={formData?.item1?.cohabitation_agreement?.isChecked || false}
                  />
                  <CheckBox
                    id="special_service"
                    label={`paternity agreement`}
                    value={formData?.item1?.paternity_agreement?.isChecked}
                    labelinput={'item1.paternity_agreement.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    type={`checkbox`}
                    checked={formData?.item1?.paternity_agreement?.isChecked || false}
                  />
                </Col>
                <div>
                  <div className='data-input'>
                    <span className='label text-wrap'>for filing with the court so that its support provisions can be enforced or changed as if they were a court order.</span>
                  </div>
                </div>
              </Row>
            </li>

            <li>
              <div>
                <div className='data-input'>
                  <span className='label  text-wrap'>The <b>contract/agreement</b> includes the following provisions relating to child support:</span>
                </div>
              </div>
              <ul>
                <li>
                  <div className='form-check pb-3'>

                    <div className='data-input ' style={{ justifyContent: "start" }}>

                      <span className='label'> (Name of party)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.applicant?.fullLegalName || ''}
                        onChange={fillFormData('applicant.fullLegalName')}
                      />
                      <span className='label'> to pay (name of party)</span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.respondent?.fullLegalName || ''}
                        onChange={fillFormData('respondent.fullLegalName')}
                      />

                    </div>
                    <div className='data-input ' style={{ justifyContent: "start" }}>

                      <span className='label'>child support in the monthly amount of $</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        thousandSeparator={true}
                        value={formData?.item2?.child_support_amount || ''}
                        onChange={fillFormData('item2.child_support_amount')}
                        style={{ width: "100px" }}
                      />
                      <span className='label'>for the following children: (names and birthdates of children)</span>
                      
                     

                    </div>

                    <textarea className='w-100 mt-2' rows={3}
                        value={formData?.children_names}
                        fillFormData={fillFormData('item2.children_names')}
                      />
                  </div>
                  <CheckBox
                    id="special_service"
                    label={`This amount includes the following special expenses:`}
                    value={formData?.item2?.special_expenses?.isChecked}
                    labelinput={'item2.special_expenses.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    type={`checkbox`}
                    checked={formData?.item2?.special_expenses?.isChecked || false}
                  />

                  <table className='pb-40px form-8a-children' style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ minWidth: "70%" }}>Type</th>
                        <th style={{ minWidth: "30%" }}>Amount</th>

                      </tr>
                    </thead>
                    <tbody>
                      {formData?.specialExpenses?.client && Array.isArray(formData.specialExpenses?.client) && formData.specialExpenses?.client?.length > 0 ? (

                        formData.specialExpenses?.client?.map((item, index) => (
                          <>
                            <tr key={index}>
                              <td>
                                <input
                                  className='custom-input-control py-1'
                                  name=""
                                  value={item.expenses}
                                  onChange={handleIndexChange(`specialExpenses.client.${index}.expenses`)}
                                />
                              </td>
                              <td>
                                <CurrencyFormat
                                  className='custom-input-control'
                                  value={item.amount}
                                  thousandSeparator={true}
                                  prefix={'$ '}
                                  onChange={handleIndexChange(`specialExpenses.client.${index}.amount`)}
                                  style={{ width: "100px" }}
                                />
                              </td>

                            </tr>
                          </>
                        ))
                      ) : (
                        emptySpecialExpenses.map((item, index) => (
                          <>
                            <tr>
                              <td>
                                <input
                                  className='custom-input-control py-1'
                                  name=""
                                  value={item.expenses}
                                  onChange={fillFormData(`specialExpenses.client.${index}.expenses`)}
                                />
                              </td>
                              <td>
                                <CurrencyFormat
                                  className='custom-input-control'
                                  value={item.amount}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  onChange={fillFormData(`specialExpenses.client.${index}.amount`)}
                                  style={{ width: "100px" }}
                                />
                              </td>

                            </tr>
                          </>
                        ))
                      )}

                    </tbody>
                  </table>
                </li>

                <li>

                  <div className='form-check '>

                    <div className='data-input ' style={{ justifyContent: "start" }}>

                      <span className='label'> Child support is based on the payor’s gross annual income of $</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.payor_gross_annual_income?.amount}
                        thousandSeparator={true}
                        onChange={fillFormData('payor_gross_annual_income.amount')}
                        style={{ width: "100px" }}
                      />
                      <span className='label'>The proportionate share of</span>


                    </div>
                    <div className='data-input ' style={{ justifyContent: "start" }}>

                      <span className='label'>special expenses is based on the recipient’s gross annual income of $</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        value={formData?.recipient_gross_annual_income?.amount}
                        thousandSeparator={true}
                        onChange={fillFormData('recipient_gross_annual_income.amount')}
                        style={{ width: "100px" }}
                      />


                    </div>


                  </div>

                </li>
              </ul>

            </li>




            <li>
              <div className='mb-2'>

                <span className='label text-wrap'>The <b>contract/agreement</b> has not been set aside or disregarded by a court nor has it been changed by agreement of the parties.</span>
              </div>
              <Row className={'pt-3'} style={{ borderTop: "3px solid black" }}>
                <Col xs={8}>
                  <Row>
                    <Col xs={6}>
                      <span className='label text-wrap'>Sworn/Affirmed before me at</span>
                    </Col>
                    <Col xs={6}>
                      <BorderLessInput
                        type={"municipality"}
                        label={"municipality"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.municipality'}
                        value={formData?.signature?.municipality}
                        style={{ padding: "6px 0" }}

                      />
                    </Col>
                  </Row>
                  <Row>
                    <BorderLessInput
                      type={"province, state or country"}
                      label={"province, state or country"}
                      fileno
                      onChange={fillFormData}
                      update={'signature.province'}
                      value={formData?.signature?.province}
                      style={{ padding: "6px 0" }}

                    />

                  </Row>
                  <Row>
                    <Col xs={6}>
                      <BorderLessInput

                        type={'date'}
                        label={"date"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.date'}
                        value={formData?.signature?.date}
                        style={{ padding: "6px 0" }}

                      />
                    </Col>
                    <Col xs={6}>
                      <BorderLessInput
                        type={"province, state or country"}
                        label={"Commissioner for taking affidavits"}
                        fileno
                        onChange={fillFormData}
                        update={'signature.commissioner'}
                        value={formData?.signature?.commissioner}
                        style={{ padding: "6px 0" }}

                      />
                      <span className='label small'><i>(Type or print name below if signature is illegible.)</i></span>
                    </Col>

                  </Row>

                </Col>

                <Col xs={4} style={{ borderLeft: "3px solid black" }}>

                  <div className='pt-5'>

                    <BorderLessInput
                      type={"province, state or country"}
                      label={"Signature"}
                      fileno
                      onChange={fillFormData}
                      update={''}
                      value={""}
                      style={{ padding: "6px 0" }}
                    />

                    <span className='label small'><i>(This form is to be signed in front of a
                      lawyer, justice of the peace, notary public or commissioner for taking affidavits.)</i></span>
                  </div>
                </Col>
              </Row>
            </li>
          </ol>

        </div>
      )}
    </>
  )
}

export default ONTFORM26B