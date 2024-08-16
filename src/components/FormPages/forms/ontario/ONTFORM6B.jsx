import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Row } from 'react-bootstrap'
import Seal from '../shared/Seal'
import BorderLessInput from '../shared/BorderLessInput'
import FormInfo from '../shared/FormInfo'
import { Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import { BorderBottom } from 'tabler-icons-react'
import BoldandThinText from '../shared/BoldandThinText'
import RadioChecks from '../shared/RadioChecks'
import ApplicationTable from '../shared/ApplicationTable'
import CheckBox from '../shared/CheckBox'
import CurrencyFormat from 'react-currency-format';

const ONTFORM6B = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {
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
  // const { pdfData, loading } = Form6B(matterId);
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

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM6B',
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
  const sections = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className={`content-section ${i % 3 === 0 ? 'page-break' : ''}`}>
      <h2>Section {i + 1}</h2>
      <p>This is dummy content for section {i + 1}. Add more details as required.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
    </div>
  ));

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (

        <div className='pdf-form pdf-form-8A mt-20px px-4' ref={targetRef}>

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
                number="6B"
                format={"Affidavit of Service sworn/affirmed"}
              />
              <BorderLessInput
                type={"text"}
                fileno
                onChange={fillFormData}
                update={'courtName'}
                value={""}
                style={{ padding: "6px 0" }}
              />
            </Col>
          </Row>
          <Row className='pb-3'>
            <ApplicationTable data={formData} type="two-rows" heading={'Applicant(s)'} applicant />
          </Row>
          <Row className='pb-3'>
            <ApplicationTable data={formData} type="two-rows" fillFormData={fillFormData} heading={'Respondents(s)'} respondent />
          </Row>
          <Row>
            <div className='form-check px-3'>
              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label'> <b>My name is </b> (full legal name)</span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.applicant?.fullLegalName}
                  onChange={fillFormData('applicant.fullLegalName')}
                />
              </div>
              <div className='data-input' style={{ justifyContent: "start" }}>
                <span className='label'> <b>I live in </b>(municipality & province)</span>
                <input
                  type='text'
                  className='custom-input-control'
                  value={formData?.applicant?.municipality}
                  onChange={fillFormData('applicant.municipality')}
                />
              </div>
            </div>
            <BoldandThinText
              bold={`and I swear/affirm that the following is true:`}
            />
            <ol>
              <li>
                <div>

                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'> <b>On</b> <i>(date)</i></span>
                    <input
                      type='date'
                      className='custom-input-control'
                      value={formData?.affirm?.item1?.date}
                      onChange={fillFormData('affirm.item1.date')}
                    />
                    <span className='label'> ,at <i>(time)</i></span>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.affirm?.item1?.time}
                      onChange={fillFormData('affirm.item1.time')}
                    />
                    <span className='label'> ,I served <i>(name of person to be served)</i></span>
                  </div>

                  <div className='form-check mx-3'>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.respondent?.fullLegalName}
                        onChange={fillFormData('affirm.item1.served')}
                      />
                      <span className='label'>with the following document(s) in this case:</span>
                    </div>
                  </div>
                </div>
                <Row className='py-2'>
                  <Col xs={3}>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label text-wrap'>Name of document</span>
                    </div>
                    <div>
                      <input
                        type='text'
                        className='custom-input-control '
                        value={formData?.affirm?.item1?.document?.name}
                        onChange={fillFormData('affirm.item1.document.name')}
                      />
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label text-wrap'><i>Author (if applicable)</i></span>
                    </div>
                    <div>
                      <input
                        type='text'
                        className='custom-input-control '
                        value={formData?.affirm?.item1?.document?.author}
                        onChange={fillFormData('affirm.item1.document.author')}
                      />
                    </div>
                  </Col>
                  <Col xs={5}>
                    <div className='data-input' style={{ justifyContent: "start" }}>
                      <span className='label text-wrap'><i>Date when document signed, issued, sworn, etc.</i></span>
                    </div>
                    <div>
                      <input
                        type='text'
                        className='custom-input-control '
                        value={formData?.affirm?.item1?.document?.date}
                        onChange={fillFormData('affirm.item1.document.date')}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>
                    <div className='data-input mt-3' style={{ justifyContent: "start" }}>
                      <span className='label text-wrap'> List the documents served</span>
                    </div>
                  </Col>
                  <Col xs={10}>
                    <BorderLessInput
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      update={'affirm.item1.documents_served.line1'}
                      value={formData?.affirm?.item1?.documents_served?.line1}
                      style={{ padding: "6px 0" }}
                    />
                    <BorderLessInput
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      update={'affirm.item1.documents_served.line2'}
                      value={formData?.affirm?.item1?.documents_served?.line2}
                      style={{ padding: "6px 0" }}
                    />
                    <BorderLessInput
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      update={'affirm.item1.documents_served.line3'}
                      value={formData?.affirm?.item1?.documents_served?.line3}
                      style={{ padding: "6px 0" }}
                    />
                    <BorderLessInput
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      update={'affirm.item1.documents_served.line4'}
                      value={formData?.affirm?.item1?.documents_served?.line4}
                      style={{ padding: "6px 0" }}
                    />
                    <BorderLessInput
                      type={"text"}
                      fileno
                      onChange={fillFormData}
                      update={'affirm.item1.documents_served.line5'}
                      value={formData?.affirm?.item1?.documents_served?.line5}
                      style={{ padding: "6px 0" }}
                    />
                  </Col>
                </Row>
                <div className='data-input mt-3 justify-content-center  p-2' style={{ border: "1px solid black" }} >
                  <span className='label text-wrap'><b>NOTE:</b> <i>You can leave out any part of this form that is not applicable.</i></span>
                </div>
              </li>
              <li className='mt-2'>
                <BoldandThinText
                  thin={`I served the documents mentioned in paragraph 1 by:`}
                />
                <Row>
                  <Col xs={2}>
                    <BoldandThinText
                      thin={`Check one box only and go to indicated paragraph.`}
                      italic
                    />
                  </Col>
                  <Col xs={10}>
                    <CheckBox
                      id="special_service"
                      label={`special service. (Go to paragraph 3 below if you used special service.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.special_service || false}
                      labelinput={'affirm.item2.special_service'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.special_service || false}
                    />
                    <CheckBox
                      id="mail"
                      label={`mail. (Go to paragraph 4 if you used mailed service.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.mail || false}
                      labelinput={'affirm.item2.mail'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.mail || false}
                    />
                    <CheckBox
                      id="mail"
                      label={`same day courier. (Go to paragraph 5 if you used courier.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.same_day_courier || false}
                      labelinput={'affirm.item2.same_day_courier'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.same_day_courier || false}
                    />
                    <CheckBox
                      id="mail"
                      label={`next day courier. (Go to paragraph 5 if you used courier.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.next_day_courier || false}
                      labelinput={'affirm.item2.next_day_courier'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.next_day_courier || false}
                    />
                    <CheckBox
                      id="mail"
                      label={`deposit at a document exchange. (Go to paragraph 6 if you used a document exchange.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.document_exchange || false}
                      labelinput={'affirm.item2.document_exchange'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.document_exchange || false}
                    />
                    <CheckBox
                      label={`an electronic document exchange. (Go to paragraph 7 if you used an electronic document exchange.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.electronic_document_exchange || false}
                      labelinput={'affirm.item2.electronic_document_exchange'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.electronic_document_exchange || false}
                    />
                    <CheckBox
                      label={`fax. (Go to paragraph 8 if you used fax.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.fax || false}
                      labelinput={'affirm.item2.fax'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.fax || false}
                    />
                    <CheckBox
                      label={`email. (Go to paragraph 9 if you used email.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.email || false}
                      labelinput={'affirm.item2.email'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.email || false}
                    />
                    <CheckBox
                      label={`substituted service or advertisement. (Go to paragraph 10 if you used substituted service or advertisement.)`}
                      type='checkbox'
                      value={formData?.affirm?.item2?.advertisement || false}
                      labelinput={'affirm.item2.advertisement'}
                      fillFormData={handleCheckBox}
                      isBold={false}
                      checkbox={true}
                      checked={formData?.affirm?.item2?.advertisement || false}
                    />
                  </Col>
                </Row>
              </li>
              <div id='page-break' class="page-break"></div>
              
              <li className='pt-2'>
                <BoldandThinText thin={" I carried out special service of the document(s) on the person named in paragraph 1 at (place or address)"} />
                <BorderLessInput
                  type={"text"}
                  fileno
                  value={formData?.affirm?.item3?.address || formData?.respondent?.address}
                  onChange={fillFormData}
                  update={'affirm.item3.address'}
                  style={{ padding: "6px 0" }}
                />
                <Row>
                  <Col xs={2}>
                    <BoldandThinText thin={"by"} />
                    <BoldandThinText thin={"Check one box only. Strike out paragraphs 4 to 10 and go to paragraph 11."} />
                  </Col>
                  <Col xs={10}>
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <CheckBox
                          label={`leaving a copy with the person.`}
                          type='checkbox'
                          value={'leave_copy'}
                          labelinput={'affirm.item3.check'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item3?.check === 'leave_copy'}
                        />
                      </li>
                      <li>


                        <div className='mx-3 px-6 form-check'>
                          <CheckBox
                            type='checkbox'
                            value={'leave_copy_other'}
                            labelinput={'affirm.item3.check'}
                            fillFormData={fillFormData}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.affirm?.item3?.check === 'leave_copy_other'}
                            inline
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>leaving a copy with <i>(name)</i></span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.affirm?.item3?.leave_copy_other?.name} // Check against string 'true'
                              onChange={fillFormData('affirm.item3.leave_copy_other.name')} // Pass 'true' as defaultVal
                            />
                          </div>
                        </div>
                        <ul style={{ listStyleType: "none" }}>
                          <li>
                            <CheckBox
                              label={`who is a lawyer who accepted service in writing on a copy of the document.`}
                              type='checkbox'
                              value={'lawyer'}
                              labelinput={'affirm.item3.who'}
                              fillFormData={fillFormData}
                              isBold={false}
                              checkbox={true}
                              checked={formData?.affirm?.item3?.who === 'lawyer'}
                            />
                          </li>
                          <li>
                            <CheckBox
                              label={`who is the person’s lawyer of record.`}
                              type='checkbox'
                              value={'persons_lawyer'}
                              labelinput={'affirm.item3.who'}
                              fillFormData={fillFormData}
                              isBold={false}
                              checkbox={true}
                              checked={formData?.affirm?.item3?.who === 'persons_lawyer'}
                            />
                          </li>
                          <li>

                            <div className='mx-3 px-6 form-check'>
                              <CheckBox
                                type='checkbox'
                                value={'office_position'}
                                labelinput={'affirm.item3.who'}
                                fillFormData={fillFormData}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.affirm?.item3?.who === 'office_position'}
                                inline
                              />
                              <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>who is the  <i>(office or position)</i></span>
                                <input
                                  type='text'
                                  className='custom-input-control'
                                  value={formData?.affirm?.item3?.office_position?.name} // Check against string 'true'
                                  onChange={fillFormData('affirm.item3.office_position.name')} // Pass 'true' as defaultVal
                                />
                              </div>
                              <div className='label small'>of the corporation named in paragraph 1.</div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <CheckBox
                          label={`mailing a copy to the person together with a prepaid return postcard in Form 6 in an envelope bearing the sender’s return address. This postcard, in which receipt of the document(s) is acknowledged, was returned and is attached to this affidavit.`}
                          type='checkbox'
                          value={'mailing_copy'}
                          labelinput={'affirm.item3.check'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item3?.check === 'mailing_copy'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`leaving a copy in a sealed envelope addressed to the person at the person’s place of residence with`}
                          type='checkbox'
                          value={'leaving_copy'}
                          labelinput={'affirm.item3.check'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item3?.check === 'leaving_copy'}
                        />
                        <div className='form-check mx-3'>
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'> <i>(name)</i></span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.affirm?.item3?.leaving_copy?.name} // Check against string 'true'
                              onChange={fillFormData('affirm.item3.leaving_copy.name')} // Pass 'true' as defaultVal
                            />

                          </div>
                          <BoldandThinText thin={"who provided me with identification to show that he/she was an adult person residing at the same address and by mailing another copy of the same document(s) on the same or following day to the person named in paragraph 1 at that place of residence."} />
                        </div>

                      </li>
                      <li>
                        <CheckBox
                          label={`other (Specify. See rule 6 for details.)`}
                          type='checkbox'
                          value={'other'}
                          labelinput={'affirm.item3.check'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item3?.check === 'other'}
                        />
                        <BorderLessInput
                          type={"text"}
                          fileno
                          onChange={fillFormData}
                          update={'formData.affirm.item3.other.line1'}
                          value={formData?.affirm?.item3?.other?.line1}
                          style={{ padding: "6px 0" }}
                        />
                        <BorderLessInput
                          type={"text"}
                          fileno
                          onChange={fillFormData}
                          update={'formData.affirm.item3.other.line2'}
                          value={formData?.affirm?.item3?.other?.line2}
                          style={{ padding: "6px 0" }}
                        />
                        <BorderLessInput
                          type={"text"}
                          fileno
                          onChange={fillFormData}
                          update={'formData.affirm.item3.other.line3'}
                          value={formData?.affirm?.item3?.other?.line3}
                          style={{ padding: "6px 0" }}
                        />
                        <BorderLessInput
                          type={"text"}
                          fileno
                          onChange={fillFormData}
                          update={'formData.affirm.item3.other.line4'}
                          value={formData?.affirm?.item3?.other?.line4}
                          style={{ padding: "6px 0" }}
                        />
                        <BorderLessInput
                          type={"text"}
                          fileno
                          onChange={fillFormData}
                          update={'formData.affirm.item3.other.line5'}
                          value={formData?.affirm?.item3?.other?.line5}
                          style={{ padding: "6px 0" }}
                        />
                        <BorderLessInput
                          type={"text"}
                          fileno
                          onChange={fillFormData}
                          update={'formData.affirm.item3.other.line6'}
                          value={formData?.affirm?.item3?.other?.line6}
                          style={{ padding: "6px 0" }}
                        />
                      </li>
                    </ul>
                  </Col>
                </Row>
              </li>
              <li className='pt-2'>
                <BoldandThinText thin={"I mailed the document(s) to be served by addressing the covering envelope to the person named in paragraph 1 at:"} />
                <div className='form-check'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'> <i>(Set out address.)</i></span>
                    <input
                      type='text'
                      value={formData?.affirm?.item4?.address || formData?.respondent?.address}
                      onChange={fillFormData}
                      update={'affirm.item4.address'}
                    />
                  </div>
                </div>
                <Row>
                  <Col xs={2}>
                    <BoldandThinText thin={"which is the address"} />
                    <BoldandThinText thin={"Check appropriate paragraph and strike out paragraphs 3, 5, 6, 7, 8, 9 and 10."} />
                  </Col>
                  <Col xs={10}>
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <CheckBox
                          label={`of the person’s place of business.`}
                          type='checkbox'
                          labelinput={'affirm.item4'}
                          value={'place_of_business'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item4 === 'place_of_business'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`of a lawyer who accepted service on the person’s behalf.`}
                          type='checkbox'
                          labelinput={'affirm.item4'}
                          value={'on_behalf'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item4 === 'on_behalf'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`of the person’s lawyer of record.`}
                          type='checkbox'
                          labelinput={'affirm.item4'}
                          value={'lawyer_of_record'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item4 === 'lawyer_of_record'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`of the person’s home.`}
                          type='checkbox'
                          labelinput={'affirm.item4'}
                          value={'person_home'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item4 === 'person_home'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`on the document most recently filed in court by the person.`}
                          type='checkbox'
                          labelinput={'affirm.item4'}
                          value={'recently_filed'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item4 === 'recently_filed'}
                        />
                      </li>
                      <li>

                        <div className='mx-3 px-6 form-check'>
                          <CheckBox
                            type='checkbox'
                            value={'other'}
                            labelinput={'affirm.item4'}
                            fillFormData={fillFormData}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.affirm?.item4 === 'other'}
                            inline
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>other  <i>(Specify.)</i></span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.affirm?.item5?.other?.details}
                              onChange={fillFormData('affirm.item5.other.details')}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </li>
              {/* Item 5 */}
              <li className='pt-2'>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>The document(s) to be served was/were placed in an envelope that was picked up at</span>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.affirm?.item5?.document_served?.time}
                      onChange={fillFormData('affirm.item5.document_served.time')}
                    />
                    <select name="name_of_court" class="custom-input-control ">
                      <option value="am">am</option>
                      <option value="pm">pm</option>
                    </select>
                    <span className='label'>on</span>
                  </div>
                </div>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'><i>(date)</i></span>
                    <input
                      type='date'
                      className='custom-input-control'
                      value={formData?.affirm?.item5?.document_served?.data}
                      onChange={fillFormData('affirm.item5.document_served.data')}
                    />
                    <span className='label'>by<i> (name of courier service)</i></span>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.affirm?.item5?.document_served?.courier_name}
                      onChange={fillFormData('affirm.item5.document_served.courier_name')}
                    />
                  </div>
                </div>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>a private courier service, a copy of whose receipt is attached to this affidavit. The envelope was addressed to the person</span>
                  </div>
                </div>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>named in paragraph 1 at: <i>(Set out address.)</i></span>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.affirm?.item5?.address || formData?.respondent?.address}
                      onChange={fillFormData}
                      update={'affirm.item3.address'}
                    />
                  </div>
                </div>
                <Row>
                  <Col xs={2}>
                    <BoldandThinText thin={"which is the address"} />
                    <BoldandThinText thin={"Check appropriate paragraph and strike out paragraphs 3, 4, 6, 7, 8, 9 and 10."} />
                  </Col>
                  <Col xs={10}>
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <CheckBox
                          label={`of the person’s place of business.`}
                          type='checkbox'
                          labelinput={'affirm.item5'}
                          value={'place_of_business'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item5 === 'place_of_business'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`of a lawyer who accepted service on the person’s behalf.`}
                          type='checkbox'
                          labelinput={'affirm.item5'}
                          value={'on_behalf'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item5 === 'on_behalf'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`of the person’s lawyer of record.`}
                          type='checkbox'
                          labelinput={'affirm.item5'}
                          value={'lawyer_of_record'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item5 === 'lawyer_of_record'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`of the person’s home.`}
                          type='checkbox'
                          labelinput={'affirm.item5'}
                          value={'person_home'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item5 === 'person_home'}
                        />
                      </li>
                      <li>
                        <CheckBox
                          label={`on the document most recently filed in court by the person.`}
                          type='checkbox'
                          labelinput={'affirm.item5'}
                          value={'recently_filed'}
                          fillFormData={fillFormData}
                          isBold={false}
                          checkbox={true}
                          checked={formData?.affirm?.item5 === 'recently_filed'}
                        />
                      </li>
                      <li>

                        <div className='mx-3 px-6 form-check'>
                          <CheckBox
                            type='checkbox'
                            value={'other'}
                            labelinput={'affirm.item5'}
                            fillFormData={fillFormData}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.affirm?.item5 === 'other'}
                            inline
                          />
                          <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>other  <i>(Specify.)</i></span>
                            <input
                              type='text'
                              className='custom-input-control'
                              value={formData?.affirm?.item5?.other?.details}
                              onChange={fillFormData('affirm.item5.other.details')}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </li>
              <li>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className='label text-wrap'>The document(s) was/were deposited at a document exchange. The exchange’s date stamp on the attached copy shows the date of deposit. <i>(Strike out paragraphs 3, 4, 5, 7, 8, 9, 10 and 13.)</i>
                  </span>
                </div>
              </li>
              <li>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className='label text-wrap'> The documents were served through an electronic document exchange. The record of service from the exchange is attached to this affidavit.  <i>(Strike out paragraphs 3, 4, 5, 6, 8, 9, 10 and 13.)</i>
                  </span>
                </div>
              </li>
              <li>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className='label text-wrap'>The document(s) to be served was/were faxed. The fax confirmation is attached to this affidavit. <i>(Strike out paragraphs 3, 4, 5, 6, 7, 9, 10 and 13.)</i>
                  </span>
                </div>
              </li>
              <li>
                <div className='data-input' style={{ justifyContent: "start" }}>
                  <span className='label text-wrap'>The documents were served by email. Attached to this Affidavit is a copy of the email that the document was attached to. <i>(Strike out paragraphs 3, 4, 5, 6, 7, 8, 10 and 13.)</i>
                  </span>
                </div>
              </li>
              <li>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>An order of this court made on <i>(date)</i></span>
                    <input
                      type='date'
                      className='custom-input-control'
                      value={formData?.affirm?.item10?.substituted_advertisement}
                      onChange={fillFormData('affirm.item10.substituted_advertisement')}
                    />
                    <span className='label'>allowed</span>
                  </div>
                </div>
                <CheckBox
                  id='item10'
                  label={`substituted service.`}
                  type='checkbox'
                  value={'substituted_service'}
                  labelinput={'affirm.item10.check_value'}
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  checked={formData?.affirm?.item10?.check_value === 'substituted_service'}
                />
                <CheckBox
                  id='item10'
                  label={`service by advertisement. (Attach advertisement.)`}
                  type='checkbox'
                  value={'advertisement'}
                  labelinput={'affirm.item10.check_value'}
                  fillFormData={fillFormData}
                  isBold={false}
                  checkbox={true}
                  c checked={formData?.affirm?.item10?.check_value === 'advertisement'}
                />
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label text-wrap'>The order was carried out as follows: <i>(Give details. Then go to paragraph 13 if you had to travel to serve substitutionally or by advertisement.) </i></span>
                  </div>
                </div>

                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item10.carried_out_details.line1'}
                  value={formData?.item10?.carried_out_details?.line1}
                  style={{ padding: "6px 0" }}
                />
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item10.carried_out_details.line2'}
                  value={""}
                  style={{ padding: "6px 0" }}
                />
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item10.carried_out_details.line3'}
                  value={""}
                  style={{ padding: "6px 0" }}
                />
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item10.carried_out_details.line4'}
                  value={""}
                  style={{ padding: "6px 0" }}
                />
              </li>
              <li>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'> My relationship to, or affiliation with, any party in this case is as follows:</span>
                  </div>
                </div>
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item11.carried_out_details.line1'}
                  value={formData?.item11?.carried_out_details?.line1}
                  style={{ padding: "6px 0" }}
                />
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item11.carried_out_details.line2'}
                  value={formData?.item11?.carried_out_details?.line2}
                  style={{ padding: "6px 0" }}
                />
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item11.carried_out_details.line3'}
                  value={formData?.item11?.carried_out_details?.line3}
                  style={{ padding: "6px 0" }}
                />
                <BorderLessInput
                  type={"text"}
                  fileno
                  onChange={fillFormData}
                  update={'item11.carried_out_details.line4'}
                  value={formData?.item11?.carried_out_details?.line4}
                  style={{ padding: "6px 0" }}
                />
              </li>
              <li>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>  I am at least 18 years of age.</span>
                  </div>
                </div>
              </li>
              <li>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>To serve the document(s), I had to travel</span>
                    <input
                      type='text'
                      className='custom-input-control'
                      onChange={fillFormData('item13.travel_to')}
                      value={formData?.item13?.travel_to}
                    />
                    <span className='label'>kilometres. My fee for service of the document(s) is</span>
                  </div>
                </div>
                <div className='form-check px-0'>
                  <div className='data-input' style={{ justifyContent: "start" }}>
                    <span className='label'>$</span>
                    <CurrencyFormat
                      className='custom-input-control text-right'
                      disabled={false}
                      value={formData?.item13?.amount}
                      thousandSeparator={true}
                      prefix={'$'}
                      onChange={fillFormData('item13.amount')}
                    />
                    <span className='label'>including travel.</span>
                  </div>
                </div>
              </li>
            </ol>
          </Row>

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
        </div>
      )}
    </>
  )
}
export default ONTFORM6B