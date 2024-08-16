import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../assets/css/pages/formPages/fill-pdf.css'
import FormHeading from '../shared/FormHeading'
import { Col, Form, Row, Table } from 'react-bootstrap'
import Seal from '../shared/Seal'
import BorderLessInput from '../shared/BorderLessInput'
import FormInfo from '../shared/FormInfo'
import BorderedInput from '../shared/BorderedInput'
import RadioChecks from '../shared/RadioChecks'
import ApplicationTable from '../shared/ApplicationTable'
import Listings from '../shared/FormListings'
import ClaimText from '../../Components/Form8A/ClaimText'
import FamilyForm from '../shared/FamilyForm'
import BoldandThinText from '../shared/BoldandThinText'
import PreviousCasesOrAgreements from '../../Components/Form8A/PreviousCases'
import TextArea from '../shared/TextArea'
import DynamicTextArea from '../shared/TextArea'
import { Form15C, Form6B, FormInformation } from '../../../../utils/Apis/matters/CustomHook/PDFData'
import { getFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataActions'
import { selectGetFileData } from '../../../../utils/Apis/matters/getFileData/getFileDataSelector'
import Loader from '../../../Loader'
import Signature from '../../Components/Form15C/Signature'
import ChildData from '../../Components/Form15C/ChildData'
import ChildInfoData from '../../Components/Form15C/ChildInfoData'
import ListItem from '../shared/ListItems'
import AllListing from '../../Components/Form15C/AllListing'

const ONTFORM6 = ({ targetRef, matterId, onFormDataSave, savedData, setCourtNumber }) => {

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
            const keys = key?.split('.') // ['familyHistory', 'applicant', 'age']
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
            form_id: 'FORM6A',
            data: formData,
        })
    }, [formData])

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

    return (
        <>
            {loading ? (
                <Loader isLoading={loading} />
            ) : (
                <div className='pdf-form pdf-form-8A mt-20px px-3' ref={targetRef}>
                    <FormHeading heading={"ONTARIO"} />
                    <Row className='pb-3'>
                        <Col xs={8}>
                            <BorderLessInput
                                label={"(Name of Court/Nom du tribunal)"}
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'court_info.courtName'}
                                value={formData?.court_info.courtName}
                                style={{ padding: "6px 0" }}

                            />
                            <BorderLessInput
                                label={"Court Office Address / Adresse du greffe"}
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'court_info.courtOfficeAddress'}
                                value={formData?.court_info.courtOfficeAddress}
                                style={{ padding: "6px 0" }}

                            />
                        </Col>
                        <Col xs={4}>
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
                                number="6"
                                format={"Acknowledgement of Service"}
                            />
                            <FormInfo
                                number="Formule 6"
                                format={"Accusé de réception de la signification"}
                                formcheck
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

                    <BoldandThinText thin={`You are asked to fill out and sign this card and to mail it immediately. If you do not return this card, the document(s) listed below may be personally served on you and you may be ordered to pay the costs of service.`} />

                    <BoldandThinText thin={`Veuillez remplir et signer la présente carte et la mettre à la poste immédiatement. Si vous ne la retournez pas, le ou les documents énumérés ci- dessous peuvent vous être signifiés à personne et il peut vous être ordonné de payer les frais de la signification.`} />
                    <div className='data-input' style={{ justifyContent: "start" }}>
                        <span className='label small'><b>My name is:</b> (full legal name) /<b>Je m'appelle :</b> (nom et prénom officiels)</span>
                        <input
                            type='text'
                            value={formData?.applicant.fullLegalName}
                            update={"applicant.fullLegalName"}
                            className='custom-input-control'
                            onChange={fillFormData}
                            style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none" }}
                        />
                    </div>
                    <div>
                        <span className='label small'><b>may be served at:</b> (address where court documents may be mailed to you)</span>
                    </div>

                    <div>
                        <span className='label small'><b>Les documents peuvent m'être signifiés au :</b>  (adresse où les documents de procédure peuvent vous être envoyés)</span>
                    </div>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control value={formData?.applicant.address} onChange={fillFormData} update={"applicant.address"} type="name" style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none" }} />
                        </Form.Group>

                    </Form>

                    <BoldandThinText bold={`I acknowledge receiving a copy of the following document(s): / J'accuse réception d'une copie du ou des documents suivants :`} />

                    <Row>
                        <Col xs={6}>

                            <div>
                                <ul className='px-0' style={{ listStyleType: "none" }}>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'

                                                id='application_dated'
                                                checked={formData?.acknowledge?.application_dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.application_dated.isChecked')} // Pass 'true' as defaultVal
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Application dated / Demande datée du</span>
                                                <input
                                                    type='date'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.application_dated?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.application_dated.date')}
                                                />

                                            </div>
                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                id='blankform_application'
                                                checked={formData?.acknowledge?.blankform_application?.dated} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.blankform_application')} // Pass 'true' as defaultVal
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label text-wrap'>Blank form of application / Exemplaire de la formule de demande</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'

                                                checked={formData?.acknowledge?.financial_statment?.dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.financial_statment.dated.isChecked')} // Pass 'true' as defaultVal
                                                id='financial_statment_dated'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Financial statement dated / État financier daté du</span>
                                                <input
                                                    type='date'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.financial_statment?.dated?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.financial_statment.dated.date')} // Pass 'true' as defaultVal

                                                />

                                            </div>
                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.blankForm?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.blankForm.isChecked')} // Pass 'true' as defaultVal
                                                id='blank_form'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label text-wrap'>Blank form of financial statement / Exemplaire de la formule d'état financier</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'

                                                checked={formData?.acknowledge?.answer?.dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.answer.dated.isChecked')} // Pass 'true' as defaultVal
                                                id='answer_dated'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Answer dated / Défense datée du</span>
                                                <input
                                                    type='date'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.answer?.dated?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.answer.dated.date')} // Pass 'true' as defaultVal
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.blankform_answer?.dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.blankform_answer.dated.isChecked')} // Pass 'true' as defaultVal
                                                id='blankform_answer'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Blank form of answer / Exemplaire de la formule de défense</span>
                                                <input
                                                    type='text'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.blankform_answer?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.blankform_answer.date')} // Pass 'true' as defaultVal
                                                />

                                            </div>
                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.affidavit?.dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.affidavit.dated.isChecked')} // Pass 'true' as defaultVal
                                                id='married_on'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Affidavit of (name) / Affidavit de (nom)</span>
                                                <input
                                                    type='text'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.affidavit?.dated?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.affidavit.date')} // Pass 'true' as defaultVal
                                                />

                                            </div>
                                        </div>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.dated?.dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.dated.dated.isChecked')} // Pass 'true' as defaultVal
                                                id='dated'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>dated / daté du</span>
                                                <input
                                                    type='date'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.dated?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.dated.date')} // Pass 'true' as defaultVal
                                                />

                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div>
                                <ul className='px-0' style={{ listStyleType: "none" }}>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.motion_notice} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.motion_notice')} // Pass 'true' as defaultVal
                                                id='motion_notice'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Notice of motion dated / Avis de motion daté du</span>
                                            </div>
                                        </div>
                                    </li>

                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.money_statement?.dated?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.money_statement.dated.isChecked')} // Pass 'true' as defaultVal
                                                id='married_on'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label'>Statement of money owed dated / État des sommes dues daté du</span>
                                            </div>
                                            <div className='data-input'>
                                                <input
                                                    type='date'
                                                    className='custom-input-control'
                                                    checked={formData?.acknowledge?.money_statement?.date} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.money_statement.date')} // Pass 'true' as defaultVal
                                                />
                                            </div>

                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.other?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.other.isChecked')} // Pass 'true' as defaultVal
                                                id='money_statement'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label text-wrap'>(Other. Give title and date of document.) / </span>
                                            </div>
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label text-wrap'>    (Autre. Donnez le titre et la date du document.) </span>
                                            </div>

                                        </div>
                                    </li>
                                    <li >
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.other?.line1?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.other.line1.isChecked')} // Pass 'true' as defaultVal
                                                id='married_on'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                            </div>
                                            <div className='data-input'>
                                                <input
                                                    type='text'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.other?.line1?.detail} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.other.line1.detail')} // Pass 'true' as defaultVal
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li className='pt-4'>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.other?.line2?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.other.line2.isChecked')} // Pass 'true' as defaultVal
                                                id='married_on'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label text-wrap'></span>
                                            </div>
                                            <div className='data-input'>
                                                <input
                                                    type='text'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.other?.line2?.detail} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.other.line2.detail')} // Pass 'true' as defaultVal
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li className='pt-4'>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                checked={formData?.acknowledge?.other?.line3?.isChecked} // Check against string 'true'
                                                onChange={handleCheckBox('acknowledge.other.line3.isChecked')} // Pass 'true' as defaultVal
                                                id='married_on'
                                            />
                                            <div className='data-input' style={{ justifyContent: "start" }}>
                                                <span className='label text-wrap'></span>
                                            </div>
                                            <div className='data-input'>
                                                <input
                                                    type='text'
                                                    className='custom-input-control'
                                                    value={formData?.acknowledge?.other?.line3?.detail} // Check against string 'true'
                                                    onChange={fillFormData('acknowledge.other.line3.detail')} // Pass 'true' as defaultVal
                                                />
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                        <BorderLessInput
                                label={"Signature"}
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'courtName'}
                                value={""}
                                style={{ padding: "6px 0" }}

                            />
                        </Col>
                        <Col xs={6}>
                            <BorderLessInput
                                label={"Date of signature / Date de la signature"}
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'courtName'}
                                value={""}
                                style={{ padding: "6px 0" }}

                            />
                        </Col>
                    </Row>
                    <small> <b><i>NOTICE:</i></b>  The address that you give above will be used in future to serve documents by mail until you inform the other parties and the court office of a new address for service. REMARQUE : L'adresse que vous indiquez ci-dessus servira à l'avenir à vous signifier des documents par la poste jusqu'à ce que vous avisiez les autres parties et le greffe d'une nouvelle adresse aux fins de signification. </small>
                </div>
            )}
            <div>
                <Row>
                    <Col xs={6}>
                        <Row>
                            <Col xs={3}>
                                <div className='mt-4 text-center'>
                                    <span className='label small'>From/ De</span>
                                </div>

                            </Col>
                            <Col xs={9}>
                                <div className='data-input' style={{ justifyContent: "start" }}>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.signature?.from?.line1}
                                        onChange={fillFormData('signature.from.line1')}
                                        style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none", borderRadius: "0" }}
                                    />
                                </div>
                                <div className='data-input' style={{ justifyContent: "start" }}>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.signature?.from?.line2}
                                        onChange={fillFormData('signature.from.line2')}
                                        style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none", borderRadius: "0" }}
                                    />
                                </div>
                                <div className='data-input' style={{ justifyContent: "start" }}>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.signature?.from?.line3}
                                        onChange={fillFormData('signature.from.line3')}
                                        style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none", borderRadius: "0" }}
                                    />
                                </div>

                            </Col>

                        </Row>
                    </Col>
                    <Col xs={6}>

                        <div className='mt-3 mx-auto' style={{ border: "1px solid black", height: "120px", width: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div>
                                <p>STAMP</p>
                                <p>TIMBRE</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col xs={3}>
                                <div className='mt-4 text-center'>
                                    <span className='label small'>To/À</span>
                                </div>

                            </Col>
                            <Col xs={9}>

                                <div className='data-input' style={{ justifyContent: "start" }}>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.signature?.to?.line1}
                                        onChange={fillFormData('signature.to.line1')}
                                        style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none", borderRadius: "0" }}
                                    />
                                </div>
                                <div className='data-input' style={{ justifyContent: "start" }}>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.signature?.to?.line2}
                                        onChange={fillFormData('signature.to.line2')}
                                        style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none", borderRadius: "0" }}
                                    />
                                </div>
                                <div className='data-input' style={{ justifyContent: "start" }}>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.signature?.to?.line3}
                                        onChange={fillFormData('signature.to.line3')}
                                        style={{ border: "none", borderBottom: "1px dotted black ", boxShadow: "none", borderRadius: "0" }}
                                    />
                                </div>

                            </Col>

                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ONTFORM6
