import React from 'react'
import ListItem from '../../forms/shared/ListItems'
import { Col, Form, Row } from 'react-bootstrap'
import RadioChecks from '../../forms/shared/RadioChecks'
import BorderLessInput from '../../forms/shared/BorderLessInput'
import DynamicTextArea from '../../forms/shared/TextArea'
import IncomeTable from '../Form15B/IncomeTable'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import SupportTable from './SupportTable'

const Listing = ({ fillFormData, formData, changeFormCheck }) => {
    const checkboxes = [
        { id: 'decision_making', name: 'decision_making', label: 'Decision-making responsibility', checked: false },
        { id: 'parenting time', name: 'parenting time', label: 'parenting time', checked: false },
        { id: 'child support – table amount', name: 'child support – table amount', label: 'child support – table amount', checked: false },
        { id: 'spousal support', name: 'spousal support', label: 'spousal support', checked: false },
        { id: 'child support – special or extraordinary expenses (list type of expenses):', name: 'child support – special or extraordinary expenses(list type of expenses):', label: 'child support – special or extraordinary expenses(list type of expenses):', checked: false },
        { id: 'contact', name: 'contact', label: 'Contact', checked: false },
        { id: 'other_details', name: 'other_details', label: 'Other (give details):', checked: false },
    ];
    const nestedItems = [
        ['Current term:', 'Requested change:'],
        ['Current term:', 'Requested change:'],
        ['Current term:', 'Requested change:'],
        ['Current term:', 'Requested change:'],
        ['Current term:', 'Requested change:'],
        ['Current term:', 'Requested change:'],
        ['Current term:', 'Requested change:'],
    ];
    const types = ['a', 'b', 'c'];
    return (
        <>

            <div>
                <ol type="number">
                    <li>
                        <div>
                            <label class="form-check-label ms-2 fw-bold small" for="flexCheckDefault">
                                I am the responding party to this motion to change.
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className={`d-flex flex-column flex-md-row gap-3 ps-3`}>

                            <>
                                <div className='data-input small'>
                                    <span className='label '><span className='fw-bold'>I live in</span> <i >(municipality & province)</i></span>
                                </div>
                                <div className='data-input mt-2'>
                                    <input
                                        type='text'
                                        className='form-control small'
                                        onChange={fillFormData('applicant.municipality')}
                                        value={formData?.applicant?.municipality}
                                    />
                                </div>
                                <span className='label fw-bold small mt-2'>and I swear/affirm that the following is true:</span>
                            </>

                        </div>
                    </li>
                    <li className='py-1'>

                        <div class="form-check d-flex ms-3">
                            <input
                                class="form-check-input p-2"
                                type='checkbox'
                                name='item3'
                                id='item3'
                                checked={formData?.item3?.isChecked === true || false}
                                onChange={changeFormCheck('item3.isChecked')}
                            />
                            <label class="form-check-label ms-2 small" for="flexCheckDefault">
                                I request to convert this motion to change support from s. 17 to s. 18.1 of the Divorce Act. (You can make this request only if you live outside of Ontario and this motion includes support claims under the Divorce Act. If the court grants your request, motion documents will be sent to Ontario’s designated authority under the Interjurisdictional Support Orders Act, 2002.)
                            </label>
                        </div>

                    </li>

                    <li className='py-1'>

                        <div class="form-check d-flex ms-3">
                            <input
                                class="form-check-input p-2"
                                type='checkbox'
                                name='item3'
                                id='item3'
                                checked={formData?.item4?.isChecked === true || false}
                                onChange={changeFormCheck('item4.isChecked')}
                            />
                            <label class="form-check-label ms-2 small" for="flexCheckDefault">
                                I agree with the following claims made by the requesting party at paragraph 11 of their Motion to Change Form
                                (Form 15) (list the claims you agree with, for example paragraph 11(a), (b), (c), etc.):
                            </label>
                        </div>

                        <div className="d-flex justify-content-center">
                            <span className='small'>
                                Paragraph11
                            </span>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line1'}
                                value={formData?.item4?.paragraph11?.line1}
                                style={{ width: "30px", margin: "0px 10px", padding: "0" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line2'}
                                value={formData?.item4?.paragraph11?.line2}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line3'}
                                value={formData?.item4?.paragraph11?.line3}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line4'}
                                value={formData?.item4?.paragraph11?.line4}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line5'}
                                value={formData?.item4?.paragraph11?.line5}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line6'}
                                value={formData?.item4?.paragraph11?.line6}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line7'}
                                value={formData?.item4?.paragraph11?.line7}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line8'}
                                value={formData?.item4?.paragraph11?.line8}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line9'}
                                value={formData?.item4?.paragraph11?.line9}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item4.paragraph11.line10'}
                                value={formData?.item4?.paragraph11?.line10}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>

                        </div>

                    </li>

                    <li className='py-1'>

                        <div class="form-check d-flex ms-3">
                            <input
                                class="form-check-input p-2"
                                type='checkbox'
                                name='item3'
                                id='item3'
                                checked={formData?.item5?.isChecked === true || false}
                                onChange={changeFormCheck('item5.isChecked')}
                            />
                            <label class="form-check-label ms-2 small" for="flexCheckDefault">
                                I disagree with the following claims made by the requesting party at paragraph 11 of their Motion to Change Form
                                (Form 15) (list the claims you agree with, for example paragraph 11(a), (b), (c), etc.):
                            </label>
                        </div>

                        <div className="d-flex justify-content-center">
                            <span className='small'>
                                Paragraph11
                            </span>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line1'}
                                value={formData?.item5?.paragraph11?.line1}
                                style={{ width: "30px", margin: "0px 10px", padding: "0" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line2'}
                                value={formData?.item5?.paragraph11?.line2}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line3'}
                                value={formData?.item5?.paragraph11?.line3}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line4'}
                                value={formData?.item5?.paragraph11?.line4}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line5'}
                                value={formData?.item5?.paragraph11?.line5}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line6'}
                                value={formData?.item5?.paragraph11?.line6}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line7'}
                                value={formData?.item5?.paragraph11?.line7}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line8'}
                                value={formData?.item5?.paragraph11?.line8}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line9'}
                                value={formData?.item5?.paragraph11?.line9}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>
                            <BorderLessInput
                                type={"text"}
                                fileno
                                onChange={fillFormData}
                                update={'item5.paragraph11.line10'}
                                value={formData?.item5?.paragraph11?.line10}
                                style={{ width: "30px", margin: "0px 10px" }}

                            />
                            <div className='mt-3'>,</div>

                        </div>

                    </li>
                    <li>
                        <div>
                            <label class="form-check-label ms-2 small" for="flexCheckDefault">
                                I disagree with the claims made by the requesting party because <i>(briefly explain why you do not think that the current
                                    order/agreement should be changed):</i>
                            </label>
                        </div>
                    </li>
                    <div>

                        <textarea rows={5} className='w-100' value={formData?.item6?.details} onChange={fillFormData('item6.details')} />
                    </div>
                    <li>
                        <div>
                            <div class="form-check d-flex ms-3">
                                <input
                                    class="form-check-input p-2"
                                    type='checkbox'
                                    name='item3'
                                    id='item3'
                                    checked={formData?.item7?.isChecked === true || false}
                                    onChange={changeFormCheck('item7.isChecked')}
                                />
                                <label class="form-check-label ms-2 small" for="flexCheckDefault">
                                    I also disagree with the following facts in the requesting party’s Motion to Change Form (Form 15) <i>(briefly explain what information you do not agree with and explain why):</i>
                                </label>
                            </div>

                        </div>
                    </li>
                    <div>

                        <textarea rows={15} className='w-100' value={formData?.item7?.details} onChange={fillFormData('item7.details')} />
                    </div>

                    <li>
                        <div>
                            <div class="form-check d-flex ms-3">
                                <input
                                    class="form-check-input p-2"
                                    type='checkbox'
                                    name='item8'
                                    id='item8'
                                    checked={formData?.item8?.isChecked === true || false}
                                    onChange={changeFormCheck('item8.isChecked')}
                                />
                                <label class="form-check-label ms-2 small" for="flexCheckDefault">
                                    I am asking that the motion to change (except the parts that I agree with) be dismissed with costs.
                                </label>
                            </div>

                        </div>
                    </li>

                    <li>
                        <div>
                            <div class="form-check d-flex ms-3">
                                <input
                                    class="form-check-input p-2"
                                    type='checkbox'
                                    name='item9'
                                    id='item9'
                                    checked={formData?.item9?.isChecked === true || false}
                                    onChange={changeFormCheck('item9.isChecked')}
                                />
                                <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                    If this motion to change includes a request to change support, please complete the following:
                                </label>
                            </div>

                        </div>

                        <ul style={{ listStyleType: "none" }}>

                            <li>
                                <div class="form-check d-flex ms-3">
                                    <div>
                                        <span className='small'> a.</span>
                                    </div>
                                    <div >
                                        <div className='d-flex'>
                                            <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                I am the
                                            </label>
                                            <div>
                                                <div class="form-check d-flex ms-3">
                                                    <input
                                                        class="form-check-input p-2"
                                                        type='radio'
                                                        name='a'
                                                        id='a'
                                                        value={'payor'}
                                                        checked={formData?.item9?.checked}
                                                        onChange={changeFormCheck('item9.a.checked')}
                                                    />
                                                    <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                        support payor
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="form-check d-flex ms-3">
                                                    <input
                                                        class="form-check-input p-2"
                                                        type='radio'
                                                        name='a'
                                                        id='a'
                                                        value={'recipient'}
                                                        checked={formData?.item9?.checked}
                                                        onChange={changeFormCheck('item9.a.checked')}
                                                    />
                                                    <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                        support recipient
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="form-check d-flex ms-3">
                                    <div>
                                        <span className='small'> b.</span>
                                    </div>
                                    <div>
                                        <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                            I have attached a completed confirmation of assignment form, returned to me by the Ontario Ministry of Children, Community and Social Services showing that:
                                        </label>
                                        <div class="form-check d-flex ms-3">

                                            <div>
                                                <input
                                                    class="form-check-input p-2"
                                                    type='checkbox'
                                                    name='b'
                                                    id='b'
                                                    checked={formData?.item9?.b?.notassigned?.checked === true || false}
                                                    onChange={changeFormCheck('item9.b.notassigned.checked')}
                                                />
                                                <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                    The order has not been assigned to a government agency.
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-check d-flex ms-3">
                                        <input
                                                    class="form-check-input p-2"
                                                    type='checkbox'
                                                    name='b'
                                                    id='b'
                                                    checked={formData?.item9?.b?.assigned?.checked === true || false}
                                                    onChange={changeFormCheck('item9.b.assigned.checked')}
                                                />
                                            <div>
                                                <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                    The order has been assigned to a government agency. <i>(You must serve a copy of this document, with all
                                                        attachments, on the government agency.)</i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>
                            <li>
                                <div class="form-check d-flex ms-3">
                                    <div>
                                        <span className='small'> c.</span>
                                    </div>
                                    <div>
                                        <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                            Since the order/agreement for child support was made, a Notice of Recalculation was issued by the online Child Support Service dated <input type="text" style={{ width: "180px", border: "none", borderBottom: "1px solid black" }} />  <i>(please attach).</i>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-check d-flex ms-3">
                                    <div>
                                        <span className='small'> d.</span>
                                    </div>
                                    <div>
                                        <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                            Please give information about your income and the other party’s income (if known) for the past 3 years (a party’s income should be their total income from all sources as listed on line 150 of their Income Tax Return):
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <div>
                        <IncomeTable />
                    </div>

                    <div className='py-2 text-center'>
                        <small className='sub-heading text-decoration-underline pb-1'>
                            PART B – CHANGES THAT THE RESPONDING PARTY WANTS TO MAKE
                        </small>
                    </div>
                    <div className='py-4'>
                        <small className='fw-bold pb-1'>
                            Note: Do not complete this Part if you are only asking to dismiss the requesting party’s motion to change.
                        </small>
                    </div>

                    <li>
                        <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                            I want to change the following (check all that apply):
                        </label>
                    </li>
                    <Row className='ps-5 justify-content-end'>
                        {checkboxes.map((checkbox, index) => (
                            <div key={index} className='col-md-6'>
                                <RadioChecks
                                    id={checkbox.id}
                                    name={checkbox.name}
                                    label={checkbox.label}
                                    type='checkbox'
                                    fillFormData={fillFormData}
                                    isBold={false}
                                    defaultPadding={true}
                                    checkbox={true}
                                    checked={checkbox.checked}
                                />
                            </div>
                        ))}
                    </Row>
                    <li>
                        <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                            I want to change the following specific terms of the current order/agreement <i>(please provide the paragraph number of
                                each term and the wording of the term exactly as it appears in the order/agreement):</i>
                        </label>
                        {/* Nested list starts here */}
                        <ol type="a">
                            {nestedItems.map((items, index) => (
                                <li key={index}>
                                    <ol type={types[index % types.length]}>
                                        {items.map((item, subIndex) => (
                                            <ListItem
                                                key={subIndex}
                                                text={item}
                                                showInput={true} // Show input for all items in nested list
                                                onChange={fillFormData}
                                            />
                                        ))}
                                    </ol>
                                </li>
                            ))}
                        </ol>
                    </li>

                    <div className='pt-5 text-center'>
                        <p className='sub-heading text-decoration-underline pb-1'>
                            PART C – WHY THE RESPONDING PARTY WANTS THE CHANGES
                        </p>
                    </div>

                    <BoldandThinText bold={"Note: The responding party must either complete the remainder of this form or complete a separate affidavit (Form 14A) to give the important facts that explain why the court should change the current order/agreement."} />

                    <li>
                        <div>
                            <div class="form-check d-flex px-0">
                                <label class="form-check-label  small mt-1" for="flexCheckDefault">
                                    Are you and the other party following the current order/agreement?
                                </label>
                            </div>

                        </div>
                        <textarea rows={4} className="w-100 " />

                        <ul className='px-0' style={{ listStyleType: "none" }}>

                            <li className='px-0'>
                                <div class="form-check d-flex px-0">

                                    <div >
                                        <div className='d-flex'>

                                            <div>
                                                <div class="form-check d-flex ">
                                                    <input class="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                        Yes
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="form-check d-flex ms-3">
                                                    <input class="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label class="form-check-label ms-2 small mt-1" for="flexCheckDefault">
                                                        No. <i>(Give details in the box below.)</i>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div>
                            <div class="form-check d-flex px-0">
                                <label class="form-check-label  small mt-1" for="flexCheckDefault">
                                    Briefly give the facts that show why the court should change the order/agreement, including how your situation has changed since the order/agreement was made:
                                </label>
                            </div>

                        </div>

                    </li>

                    <textarea rows={20} className="w-100 " />

                    <div className='py-4'>
                        <p className='sub-heading text-decoration-underline pb-1'>
                            PART D - ADDITIONAL INFORMATION FOR SUPPORT CASE ONLY
                        </p>
                    </div>
                    <div className='pt-1'>
                        <span className='fw-bold'>
                            Note: The requesting party must complete this Part <span className='text-decoration-underline'>only</span> if asking to change child support or spousal support.
                            {' '}
                        </span>
                    </div>
                    <li>
                        <div className='d-flex gap-5 align-items-center ps-3'>
                            <span className='label'>
                                Is support owed under the current order/agreement?
                            </span>
                            <div className='d-flex gap-5'>
                                <div className='form-check'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        name='support_owed'
                                        id='support_owed_yes'
                                    />
                                    <label className='form-check-label' htmlFor='support_owed_yes'>
                                        Yes
                                    </label>
                                </div>
                                <div className='form-check'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        name='support_owed'
                                        id='support_owed_no'
                                    />
                                    <label className='form-check-label' htmlFor='support_owed_no'>
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className='pt-3'>
                        <ListItem
                            text='If yes, please give details about the support that is owed:'
                            showInput={false}
                        />
                    </li>
                    <SupportTable />
                    <li className='pt-3'>
                        <ListItem
                            text='When do you want the change in support to start? (check one)'
                            showInput={false}
                        />
                        <Row className='ps-5'>
                            <Col md={12}>
                                <RadioChecks
                                    id='today'
                                    name='today'
                                    label='Today'
                                    type='checkbox'
                                    fillFormData={fillFormData}
                                    isBold={false}
                                    defaultPadding={true}
                                    checkbox={true}
                                    checked={false}
                                />
                            </Col>
                            <Col md={5}>
                                <RadioChecks
                                    id='before_today'
                                    name='before_today'
                                    label="Before today (give exact date: d,m,y)"
                                    type='checkbox'
                                    fillFormData={fillFormData}
                                    isBold={false}
                                    defaultPadding={true}
                                    checkbox={true}
                                    checked={false}
                                />
                            </Col>
                            <Col md={7}>
                                <div className='w-100'>
                                    <div className='data-input mt-2'>
                                        <input
                                            type='date'
                                            className='form-control small'
                                            onChange={fillFormData}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </li>
                    <li className='pt-3'>
                        <ListItem
                            text='If you are asking to change support starting on a date before today, please answer the following:'
                            showInput={false}
                        />
                        {/* Nested list starts here */}
                        <ol type="a">
                            <li className='pt-2'>
                                <ListItem
                                    text='What date did you first ask the other party for updated income information or to change support?'
                                    showInput={false}
                                />
                            </li>
                            <div className='w-100'>
                                <div className='data-input'>
                                    <input
                                        type='text'
                                        className='form-control small'
                                        onChange={fillFormData}
                                    />
                                </div>
                            </div>
                            <li className='pt-3'>
                                <ListItem
                                    text=' Did the other party do anything to make it difficult for you to know if support should change?'
                                    showInput={false}
                                />
                            </li>
                            <Row className='ps-5'>
                                <Col md={2}>
                                    <RadioChecks
                                        id='yes'
                                        name='yes'
                                        label='Yes'
                                        type='checkbox'
                                        fillFormData={fillFormData}
                                        isBold={false}
                                        defaultPadding={true}
                                        checkbox={true}
                                        checked={false}
                                    />
                                </Col>
                                <Col md={6}>
                                    <RadioChecks
                                        id='no'
                                        name='no'
                                        label="No.(Give details in the box below.)"
                                        type='checkbox'
                                        fillFormData={fillFormData}
                                        isBold={false}
                                        defaultPadding={true}
                                        checkbox={true}
                                        checked={false}
                                    />
                                </Col>
                            </Row>
                            <div style={{ marginTop: "-14px" }}>
                                <DynamicTextArea
                                    rows={10}
                                    formData={formData}
                                    updates={'importantFacts.adultry.details'}
                                    fillFormData={fillFormData}
                                />
                            </div>
                            <li className='pt-3'>
                                <ListItem
                                    text="why did'nt you ask the court to change support sooner?"
                                    showInput={false}
                                />
                                <div style={{ marginTop: "-14px" }}>
                                    <DynamicTextArea
                                        rows={10}
                                        formData={formData}
                                        updates={'importantFacts.adultry.details'}
                                        fillFormData={fillFormData}
                                    />
                                </div>
                            </li>
                            <li className='pt-3'>
                                <ListItem
                                    text="what are your circumstances and the child's circumstances that support this request?"
                                    showInput={false}
                                />
                                <div style={{ marginTop: "-19px" }}>
                                    <DynamicTextArea
                                        rows={15}
                                        formData={formData}
                                        updates={'importantFacts.adultry.details'}
                                        fillFormData={fillFormData}
                                    />
                                </div>
                            </li>

                        </ol>
                    </li>

                </ol>
            </div>
            <div className='mt-4' style={{ width: "100%", border: "2px solid black" }}></div>
            <div className='pt-4'>
                <div className='pt-4'>
                    <p className='sub-heading pb-1'>
                        RESPONDING PARTY’S CERTIFICATE
                    </p>
                </div>
                <div className='pb-3'>
                    <span className='label small'> (Your lawyer, if you are represented, must complete the lawyer's Certificate below.){' '}</span>
                </div>
                <div>
                    <span className='label small'> Sections 7.1 to 7.5 of the Divorce Act and section 33.1 of the Children's Law Reform Act require you and the other party to:{' '}</span>
                </div>
                <ul className='label'>
                    <li>Exercise your decision-making responsibility, parenting time, or contact with a child in a manner that is consistent with the child's best interests;</li>
                    <li>Protect the child from conflict arising from this case, to the best of your ability;</li>
                    <li>Try to resolve your family law issues by using out-of-court dispute resolution options, if it is appropriate in your case (for more information on dispute resolution options available to you, including court-connected mediation, you can visit the <span className='text-decoration-underline' style={{ color: 'blue' }}> Ministry of the Attorney General's website</span> or <span className='text-decoration-underline' style={{ color: 'blue' }}>www.stepstojustice.ca</span> );</li>
                    <li>Provide complete, accurate, and up-to-date information in this case; and</li>
                    <li>Comply with any orders made in this case.</li>
                </ul>
                <p>I certify that I am aware of these duties under the Divorce Act and the Children's Law Reform Act.</p>
            </div>

            <div className='pt-4'>
            </div>
            <Row className='border-top border-bottom  border-dark border-4'>
                <Col className='border-end  border-dark border-4' xs={7}>
                    <div className='d-flex align-items-center gap-2'>
                        <div className='data-input flex-grow-1'>
                            <span className='label word-wrap'> <span style={{ color: 'blue' }}>Sworn/Affirmed</span> before me at</span>
                        </div>
                        <div style={{ width: "100%" }}>
                            <BorderLessInput
                                label={"municipality"}
                                type={"text"}
                                fileno
                                onChange={fillFormData}
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
                                        style={{ padding: "6px 0" }}
                                    />
                                </Col>

                                <Col xs={6}>
                                    <BorderLessInput
                                        label={"Commissioner for taking affidavits (type or print name below if signature is illegible.)"}
                                        type={"text"}
                                        fileno
                                        onChange={fillFormData}
                                        style={{ padding: "6px 0" }}
                                    />
                                </Col>
                            </Row>

                        </div>
                    </div>

                </Col>
                <Col xs={5}>
                    <BorderLessInput
                        label={"signature"}
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        style={{ padding: "6px 0" }}
                    />
                    <div className='text-center'>
                        <span className='label small'> (This form is to be signed in front of a lawyer, justice of the peace, notary public or commissioner for taking affidavits.)</span>
                    </div>
                </Col>
            </Row>

            <div className='sub-heading mt-20px'>
                LAWYER’S CERTIFICATE
            </div>

            <div className='data-input'>
                <label className='label'>My name is:</label>
                <input
                    type='text'
                    className='form-control'
                    value={""}
                    onChange={fillFormData('lawyersCertificate.sig1.name')}
                />
            </div>
            <BoldandThinText thin={`and I am the responding party’s lawyer in this case. I certify that I have complied with the requirements section 7.7 of the
Divorce Act and section 33.2 of the Children’s Law Reform Act regarding reconciliation and the duty to discuss and inform.`} />

            <Row>

                <Col xs={6}>
                    <BorderLessInput
                        label={"Date"}
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
        </>
    )
}

export default Listing