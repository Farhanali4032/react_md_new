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
import { formatDate } from '../../../../utils/matterValidations/matterValidation'
import CurrencyFormat from 'react-currency-format';
const ONTFORM36 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
  }, [loading, documentInfo, selectFileData])

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
      form_id: 'FORM36',
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
                name="court-number"
              />
              <FormInfo
                number="36"
                format={"Affidavit for Divorce"}
              />
              {/* <BorderLessInput
                value={formData?.applicationType || ''}
                type={"text"}
                onChange={fillFormData}
                update={"applicationType"}
                topheading
                style={{ marginTop: "-25px" }}
              /> */}
            </Col>
          </Row>
          <div>
            <Row className='py-4'>
              <ApplicationTable data={formData} type="one-row" heading={'Applicant(s)'} applicant />
            </Row>
            <Row className='py-4'>
              <ApplicationTable data={formData} type="one-row" heading={'Respondent(s)'} respondent />
            </Row>
            <li className='d-flex'>
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
            </li>
            <li className='d-flex'>
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
            </li>

            <li className='d-flex'>
              <div className='data-input'>
                <span className='label'><b>and I swear/affirm that the following is true:</b></span>
              </div>

            </li>

            <div>
              <ol>

                <li className='my-2'>
                  <div>
                    <BoldandThinText thin={"I am the applicant in this divorce case."} />
                  </div>
                </li>
                <li className='my-2'>
                  <div>
                    <BoldandThinText thin={"There is no chance of a reconciliation between the respondent and me."} />
                  </div>
                </li>
                <li className='my-2'>
                  <div>
                    <BoldandThinText thin={"All the information in the application in this case is correct, except:"} />
                    <small><i>(State any corrections or changes to the information in the application. Write “NONE” if there are no corrections or changes.)</i></small>

                  </div>
                  <div>
                    <textarea className='border-0 w-100' rows={3} value={formData?.item3?.details}
                      onChange={fillFormData('item3.details')} />
                  </div>
                </li>

                <li>
                  <CheckBox
                    id="special_service"
                    label={`The certificate or registration of my marriage to the respondent has been signed and sealed by the Registrar General of Ontario and:`}
                    type='checkbox'
                    value={formData?.item4?.sealed || false}
                    labelinput={'item4.sealed'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item4?.sealed || false}
                  />

                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      <CheckBox
                        id='order'
                        label={`has been filed with the application. `}
                        type='checkbox'
                        value={formData?.item4?.filled_with_application || false}
                        labelinput={'item4.filled_with_application'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item4?.filled_with_application || false}
                      />
                    </li>
                    <li>
                      <CheckBox
                        id='order'
                        label={`is attached to this affidavit.`}
                        type='checkbox'
                        value={formData?.item4?.affidavit || false}
                        labelinput={'item4.affidavit'}
                        fillFormData={handleCheckBox}
                        isBold={false}
                        checkbox={true}
                        checked={formData?.item4?.affidavit || false}
                      />
                    </li>
                  </ul>
                  <CheckBox
                    id='order'
                    name='order'
                    label={`The certificate of my marriage to the respondent was issued outside Ontario. It is called (title of certificate)`}
                    type='checkbox'
                    value={formData?.item4?.certificate_of_marraige?.isChecked || false}
                    labelinput={'item4.certificate_of_marraige.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item4?.certificate_of_marraige?.isChecked || false}
                  />
                  <BorderLessInput
                    type={"text"}
                    fileno
                    onChange={fillFormData}
                    update={'item4.certificate_of_marraige.details'}
                    value={formData?.item4?.certificate_of_marraige?.details}
                    style={{ padding: "6px 0" }}
                  />
                  <div>

                    <div className='d-flex'>
                      <div className='data-input'>
                        <span className='label'> It was issued at <i>(place of issue)</i>  </span>
                      </div>
                      <div className='w-100'>
                        <div className='data-input mt-2'>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item4?.place_of_issue?.details}
                            onChange={fillFormData('item4.place_of_issue.details')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div className='data-input'>
                        <span className='label'>on <i>(date)</i>  </span>
                      </div>
                      <div className='w-100'>
                        <div className='data-input mt-2'>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item4?.place_of_issue?.date}
                            onChange={fillFormData('item4.place_of_issue.date')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div className='data-input'>
                        <span className='label'>by <i>(name and title of person who issued certificate)</i>  </span>
                      </div>
                      <div className='w-100'>
                        <div className='data-input mt-2'>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item4?.place_of_issue?.person_issued}
                            onChange={fillFormData('item4.place_of_issue.person_issued')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div className='data-input'>
                        <span className='label'>and the information in it about my marriage is correct. </span>
                      </div>

                    </div>

                  </div>

                  <CheckBox
                    id='order'
                    name='order'
                    label={`I have not been able to get a certificate or registration of my marriage. I was married to the respondent on (date)`}
                    type='checkbox'
                    value={formData?.item4?.certificate_of_marraige_no?.isChecked || false}
                    labelinput={'item4.certificate_of_marraige_no.isChecked'}
                    fillFormData={handleCheckBox}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item4?.certificate_of_marraige_no?.isChecked || false}
                  />
                  <div>
                    <div className='d-flex'>

                      <div className='w-100'>
                        <div className='data-input mt-2'>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formatDate(formData?.relationshipDates?.marriedOn.date, '-') || formData?.item4?.date_of_marriage}
                            onChange={fillFormData('item4.date_of_marriage')}
                          />
                        </div>
                      </div>
                      <div className='data-input'>
                        <span className='label'>at  <i>(place of marriage)</i>  </span>
                      </div>
                      <div className='w-100'>
                        <div className='data-input mt-2'>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.relationshipDates?.placeOfMarriage}
                            onChange={fillFormData('relationshipDates.placeOfMarriage')}
                          />
                        </div>
                      </div>

                    </div>

                    <div className='d-flex'>
                      <div className='data-input'>
                        <span className='label'>The marriage was performed by <i>(name and title)</i>  </span>
                      </div>
                      <div className='w-100'>
                        <div className='data-input mt-2'>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item4?.marriage_performed?.details}
                            onChange={fillFormData('item4.marriage_performed.details')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='d-flex'>
                      <div className='data-input'>
                        <span className='label'>who had the authority to perform marriages in that place.</span>
                      </div>

                    </div>

                  </div>
                </li>

                <li>

                  <div className='data-input'>
                    <span className='label'>The legal basis for the divorce is: </span>
                  </div>
                  <CheckBox
                    id='order'
                    name='order'
                    label={`that the respondent and I have been separated for at least one year.`}
                    type='checkbox'
                    value={'been_separated'}
                    labelinput={'item5.divorce_basis.checked'}
                    fillFormData={fillFormData}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item5?.divorce_basis?.checked === 'been_separated'}
                  />
                  <div className='form-check'>

                    <div className='data-input m-0' style={{ justifyContent: "start" }}>
                      <span className='label'>We separated on <i>(date)</i></span>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formatDate(formData?.relationshipDates?.separatedOn?.date, '-')}
                        onChange={fillFormData('relationshipDates.separatedOn.date')}

                      />

                    </div>
                  </div>

                  <CheckBox
                    id='order'
                    name='order'
                    label={`Other (Specify.)`}
                    type='checkbox'
                    value={'other'}
                    labelinput={'item5.divorce_basis.checked'}
                    fillFormData={fillFormData}
                    isBold={false}
                    checkbox={true}
                    checked={formData?.item5?.divorce_basis?.checked === 'other'}
                  />

                  <textarea className='border-0 w-100' rows={3} value={formData?.item5?.other?.details}
                    onChange={fillFormData('item5.other.details')} />

                </li>

                <li>

                  <div className='data-input'>
                    <span className='label text-wrap'>I do not know about and I am not involved in any arrangement to make up or to hide evidence or to deceive the court in this divorce case. </span>
                  </div>
                </li>

                <div className='data-input border-bottom border-black'>
                  <span className='label text-wrap italic'>Strike out the following paragraphs if they do not apply.</span>
                </div>

                <li>
                  <div className='data-input'>
                    <span className='label text-wrap italic'>I do not want to make a claim for a division of property in this divorce case, even though I know that it may be legally impossible to make such a claim after the divorce.</span>
                  </div>

                </li>

                <li>
                  <div className='data-input'>
                    <span className='label text-wrap'>

                      I want the divorce order to include the following paragraph numbers of the attached consent, settlement, separation agreement or previous court order:<i> (List the numbers of the paragraphs that you want included in the divorce order.)</i>
                    </span>
                  </div>

                  <BorderLessInput
                    type={"text"}
                    fileno
                    onChange={fillFormData}
                    update={'item8.divorce_order.details'}
                    value={formData?.item8?.divorce_order?.details}
                    style={{ padding: "6px 0" }}

                  />
                </li>

                <li className={"my-2"}>
                  <Col xs={12}>
                    <div className='my-2'>

                      <div className='data-input m-0' style={{ justifyContent: "start" }}>
                        <span className='label'>There are  <i>(number)</i></span>
                        <input
                          type='text'
                          className='custom-input-control'
                          value={formData?.theChildren.length}
                        />
                        <span className='label'>children of the marriage. They are:</span>

                      </div>
                    </div>
                    <table className='pb-40px form-8a-children ' style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th style={{ minWidth: "60%" }}>Full legal name of child</th>
                          <th style={{ minWidth: "40%" }}>Birthdate<br /><i><small>(d,m,y)</small></i></th>

                        </tr>
                      </thead>
                      <tbody>
                        {formData?.theChildren &&
                          formData?.theChildren.map((item, index) => (
                            <tr>
                              <td>
                                <input
                                  className='custom-input-control py-1'
                                  name="fullLegalName"
                                  value={item.fullLegalName}
                                />
                              </td>
                              <td>
                                <input
                                  className='custom-input-control py-1'
                                  name="fullLegalName"
                                  value={formatDate(item.birthdate, '-')}
                                />
                              </td>
                            </tr>
                          ))}

                      </tbody>
                    </table>

                  </Col>

                </li>

                <li>

                  <div className='data-input'>
                    <span className='label text-wrap'>

                      The parenting arrangements for the child(ren) are as follows:<i> (Give summary.)</i>
                    </span>
                  </div>

                  <textarea rows={4} className='border-0 w-100' value={formData?.item10?.details} onChange={fillFormData('item10.details')} />

                </li>

                <li>

                  <div className='data-input'>
                    <span className='label text-wrap'>
                      These are the arrangements that have been made for the support of the child(ren) of the marriage:
                    </span>
                  </div>

                  <ul >
                    <li className='d-flex'>
                      <div className='form-check'>
                        <div className='data-input m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>The income of the party paying child support is $</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item11?.child_support?.amount_per_year}
                            onChange={fillFormData('item11.child_support.amount_per_year')}
                          />
                          <span className='label'> per year.</span>

                        </div>
                      </div>

                    </li>

                    <li className='d-flex'>
                      <div className='form-check'>
                        <div className='data-input m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>The number of children for whom support is supposed to be paid is (number)</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.theChildren.length || formData?.item11?.child_support?.number_of_children}
                            onChange={fillFormData('item11.child_support.number_of_children')}

                          />
                        </div>
                      </div>

                    </li>
                    <li >
                      <div className='form-check'>
                        <div className='data-input m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>The amount of support that should be paid according to the applicable table in the child support guidelines is</span>

                        </div>
                      </div>
                      <div className='form-check'>
                        <div className='data-input m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>$</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item11?.child_support?.amount_per_month}
                            onChange={fillFormData('item11.child_support.amount_per_month')}
                            style={{ width: "60px" }}

                          />
                          <span className='label'>per month.</span>
                        </div>
                      </div>

                    </li>
                    <li className='d-flex'>
                      <div className='form-check'>
                        <div className='data-input m-0' style={{ justifyContent: "start" }}>
                          <span className='label'>The amount of child support actually being paid is $</span>
                          <input
                            type='text'
                            className='custom-input-control'
                            value={formData?.item11?.child_support?.amount_per_month_actual}
                            onChange={fillFormData('item11.child_support.amount_per_month_actual')}

                          />
                          <span className='label'> per month.</span>

                        </div>
                      </div>

                    </li>

                    <span className='label text-wrap small'>(<b>NOTE:</b> - Where the dollar amounts in clauses [c] and [d] are different, you must fill out the frame on the next page. If the amounts in clauses [c] and [d] are the same, skip the frame and go directly to paragraph 12.)</span>

                  </ul>

                  <div className="label">

                    <i>(Paragraph 11 continued.)</i>
                  </div>
                  <div className="label">

                    <i> Fill out the information in this frame only if the amounts in paragraphs 11(c) and 11(d) are different. If they are the same, go to paragraph 12.</i>
                  </div>

                  <div className="p-2 border border-black">
                    <div className='data-input my-2' style={{ justifyContent: "start" }}>
                      <span className='label'>(a)Child support is already covered by:</span>

                    </div>
                    <ul style={{ listStyleType: "none" }}>

                      <li>
                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.a?.court_dated?.isChecked}
                            labelinput={'item11.a.court_dated.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            type={'checkbox'}
                            checked={formData?.item11?.a?.court_dated?.isChecked || false}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label'>a court order dated (date)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item11?.a?.court_dated?.date}
                              onChange={fillFormData('item11.a.court_dated.dated')}

                            />
                            <span className='label'> that was made before the</span>

                          </div>
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label'>child support guidelines came into effect (before 1 May 1997). I attach a copy of the order.</span>

                          </div>
                        </div>
                      </li>

                      <li>

                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.a?.domestic_contract?.isChecked}
                            labelinput={'item11.a.domestic_contract.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.a?.domestic_contract?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label'>a domestic contract order dated (date)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item11?.a?.domestic_contract?.date}
                              onChange={fillFormData('item11.a.domestic_contract.dated')}
                            />
                            <span className='label'> that was made before the</span>

                          </div>
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label'>child support guidelines came into effect (before 1 May 1997). I attach a copy of the contract.</span>

                          </div>

                        </div>

                      </li>

                      <li>

                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.a?.written_agreement?.isChecked}
                            labelinput={'item11.a.written_agreement.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.a?.written_agreement?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label'>a court order or written agreement dated (date)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item11?.a?.written_agreement?.date}
                              onChange={fillFormData('item11.a.written_agreement.dated')}
                            />
                            <span className='label'>made after the</span>

                          </div>
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label text-wrap'>guidelines came into effect that has some direct or indirect benefits for the child(ren). I attach a copy.</span>

                          </div>

                        </div>

                      </li>

                      <li>

                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.a?.written_consent?.isChecked}
                            labelinput={'item11.a.written_consent.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.a?.written_consent?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>

                            <span className='label'>a written consent between the parties dated (date)</span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.item11?.a?.written_consent?.date}
                              onChange={fillFormData('item11.a.written_consent.dated')}
                            />
                            <span className='label'>agreeing to the payment</span>

                          </div>
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label text-wrap'>of an amount different from that set out in the guidelines.</span>

                          </div>

                        </div>

                      </li>

                    </ul>

                    <div className='data-input my-2' style={{ justifyContent: "start" }}>
                      <span className='label'>(b) The child support clauses of this order or agreement require payment of $</span>
                      <CurrencyFormat
                        className='custom-input-control'
                        disabled={false}
                        thousandSeparator={true}
                        prefix={''}
                        value={formData?.item11?.b?.amount}
                        onChange={fillFormData('item11.b.amount')}
                      />
                      {/* <input
                        type='text'
                        className='custom-input-control'
                        name=''
                        id='married_on'
                        value={formData?.item11?.b?.amount}
                        onChange={fillFormData('item11.b.amount')}

                      /> */}
                      <span className='label'>per</span>
                      <select name="name_of_court" class="form-control" style={{ borderBottom: '1px solid rgba(23, 29, 52, 0.6) !important' }} value={formData?.item11?.b?.per}
                        onChange={fillFormData('item11.b.per')}>
                        <option value="am">month</option>
                        <option value="pm">year</option>
                      </select>
                      {/* <input
                        type='text'
                        className='custom-input-control'
                        name=''
                        value={formData?.item11?.b?.per}
                        onChange={fillFormData('item11.b.per')}
                        id='married_on'
                      /> */}
                      <span className='label px-2'>in child support.</span>
                    </div>


                    <div className='data-input my-2' style={{ justifyContent: "start" }}>
                      <span className='label'>(c) These child support clauses</span>

                    </div>
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.c?.not_indexed?.isChecked}
                            labelinput={'item11.c.not_indexed.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.c?.not_indexed?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>are not indexed for any automatic cost-of-living increases.</span>

                          </div>
                        </div>
                      </li>
                      <li>
                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.c?.not_indexed?.isChecked}
                            labelinput={'item11.c.indexed.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.c?.indexed?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>are indexed according to (Give indexing formula.)</span>

                          </div>
                        </div>
                      </li>

                    </ul>


                    <div className='data-input my-2' style={{ justifyContent: "start" }}>
                      <span className='label'>(d) These child support clauses</span>
                    </div>
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.d?.not_changed?.isChecked}
                            labelinput={'item11.d.not_changed.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.d?.not_changed?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>have not been changed since the day the order or agreement was made.</span>

                          </div>
                        </div>
                      </li>
                      <li><div className='form-check'>
                        <CheckBox
                          id="special_service"
                          value={formData?.item11?.d?.changed?.isChecked}
                          labelinput={'item11.d.changed.isChecked'}
                          fillFormData={handleCheckBox}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.item11?.d?.changed?.isChecked || false}
                          type={'checkbox'}
                          inline
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                          <span className='label'>have been changed on (Give dates and details of changes.)</span>

                        </div>
                      </div></li>

                    </ul>


                    <div className='data-input my-2' style={{ justifyContent: "start" }}>
                      <span className='label text-wrap'>(e) (If you ticked off box [i] above, you can go to paragraph 12. If you ticked off boxes [ii], [iii] or [iv] above, then fill out the information after box of the corresponding number below. For example, if you ticked off box [iii] above, you would fill out the information alongside box [iii] below.)</span>

                    </div>
                    <ul style={{ listStyleType: "none" }}>

                      <li>

                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.e?.amount_being_paid?.isChecked}
                            labelinput={'item11.e.amount_being_paid.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.e?.amount_being_paid?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label text-wrap'>The amount being paid under this agreement is a fair and reasonable arrangement for the support of the child(ren) because: (Give reasons.)</span>

                          </div>

                        </div>

                      </li>

                      <li>

                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.e?.detail_benefit?.isChecked}
                            labelinput={'item11.e.detail_benefit.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.e?.detail_benefit?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label text-wrap'>The order or agreement directly or indirectly benefits the child(ren) because: (Give details or benefits.)</span>

                          </div>

                        </div>

                      </li>

                      <li>

                        <div className='form-check'>
                          <CheckBox
                            id="special_service"
                            value={formData?.item11?.e?.amount_consented?.isChecked}
                            labelinput={'item11.e.amount_consented.isChecked'}
                            fillFormData={handleCheckBox}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item11?.e?.amount_consented?.isChecked || false}
                            type={'checkbox'}
                            inline
                          />
                          <div className='data-input m-0' style={{ justifyContent: "start" }}>
                            <span className='label text-wrap'>The amount to which the parties have consented is reasonable for the support of the child(ren) because:
                              (Give reasons.)</span>

                          </div>

                        </div>

                      </li>

                    </ul>

                  </div>

                </li>

                <li>

                  <span className='label text-wrap'>I am claiming costs in this case. The details of this claim are as follows: (Give details.)</span>
                  <textarea className='border-0 w-100' rows={20} value={formData?.item12?.claiming_costs?.details}
                    onChange={fillFormData('item12.claiming_costs.details')}></textarea>

                </li>

                <li>
                  <span className='label text-wrap'>The respondent’s address last known to me is: (Give address.)</span>
                  <div>
                    <textarea className='border-0 w-100' rows={5} value={formData?.respondent?.address || formData?.item13?.last_know_address.details}
                      onChange={fillFormData('item13.last_know_address.details')} />
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
                            style={{ padding: "6px 0" }}
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
                            style={{ padding: "6px 0" }}
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
                                style={{ padding: "6px 0" }}
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
                                style={{ padding: "6px 0" }}
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
                          style={{ padding: "6px 0" }}
                        />
                        <div className='text-center'>
                          <span className=' small'> (This form is to be signed in front of a lawyer, justice of the peace, notary public or commissioner for taking affidavits.)</span>
                        </div>
                      </div>

                    </Col>
                  </Row>
                </li>

              </ol>
            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default ONTFORM36