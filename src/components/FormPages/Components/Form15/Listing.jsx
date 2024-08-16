import React from 'react'
import ListItem from '../../forms/shared/ListItems'
import { Col, Row } from 'react-bootstrap'
import RadioChecks from '../../forms/shared/RadioChecks'
import BorderLessInput from '../../forms/shared/BorderLessInput'
import DynamicTextArea from '../../forms/shared/TextArea'
import ChildrenTable from './ChildrenTable'
import IncomeTable from './IncomeTable'
import SupportTable from './SupportTable'

const Listing = ({ fillFormData, formData }) => {
    const checkboxes = [
        { id: 'decision_making', name: 'decision_making', label: 'Decision-making responsibility', checked: false },
        { id: 'child_support_table', name: 'child_support_table', label: 'Child support - table amount', checked: false },
        { id: 'child_support_expenses', name: 'child_support_expenses', label: 'Child support - special or extraordinary expenses (list type of expenses):', checked: false },
        { id: 'parenting_time', name: 'parenting_time', label: 'Parenting time', checked: false },
        { id: 'spousal_support', name: 'spousal_support', label: 'Spousal support', checked: false },
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
                        <ListItem
                            text='Date parties started living together (write "N/A" if not applicable):'
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text='Date parties married (write "N/A" if not applicable):'
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text='Date parties separated (write "N/A" if not applicable):'
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text="Requesting party's birth date:"
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text="Responding party's birth date:"
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text='Municipality requesting party lives in:'
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text='Municipallity responding party lives in:'
                            showInput={true}
                            onChange={fillFormData}
                        />
                    </li>
                    <li>
                        <ListItem
                            text='Information about the child (ren):'
                            showInput={false}
                        />
                    </li>
                    <div className='ps-3'>
                        <span className='label small'>(List all children involved in this case, even if you are not requesting support for them.){' '}</span>
                    </div>
                    <div>

                        <ChildrenTable />
                    </div>
                    <li>
                        <ListItem
                            text="If you are asking to change support, please give information about your income (unless you're only asking to change the table amount of support) and the other party's income (if known) for the past 3 years (a party's income should be their total income from all sources as listed on line 150 of their Income Tax Return):"
                            showInput={false}
                        />
                    </li>
                    <div>

                        <IncomeTable />
                    </div>
                    <div className='py-4'>
                        <p className='sub-heading text-decoration-underline pb-1'>
                            PART B- CHANGES THAT THE REQUESTING PARTY WANTS TO MAKE
                        </p>
                    </div>
                    <li>
                        <ListItem
                            text="I want to change the following (check all that apply):"
                            showInput={false}
                        />
                    </li>
                    <Row className='ps-5'>
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
                        <ListItem
                            text="I want to change the following specific terms of the current order/agreement (please provide the paragraph number of each term and the wording of the term exactly as it appears in the order/agreement):"
                            showInput={false}
                        />
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
                    <div className='pt-4'>
                        <div className='pt-4'>
                            <p className='sub-heading pb-1'>
                                REQUESTING PARTY'S CERTIFICATE
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
                    <div className='py-2'>
                        <Row className='pt-2'>
                            <Col xs={6}>
                                <BorderLessInput
                                    label={"Date of signature"}
                                    type={"date"}
                                    fileno
                                    onChange={fillFormData}
                                    style={{ padding: "6px 0" }}
                                />
                            </Col>
                            <Col xs={6}>
                                <BorderLessInput
                                    label={"Requesting party's signature"}
                                    type={"text"}
                                    fileno
                                    onChange={fillFormData}
                                    style={{ padding: "6px 0" }}
                                />
                            </Col>
                        </Row>
                        <div className='pt-4'>
                            <hr style={{ color: "black", opacity: "unset", borderTop: '2px solid' }} />
                        </div>
                    </div>
                    <div className='pY-2'>
                        <p className='sub-heading pb-1'>
                            LAWYER'S CERTIFICATE
                        </p>
                        <ListItem
                            text='My name is:'
                            showInput={true}
                            onChange={fillFormData}
                        />
                        <ListItem
                            text="and I am the requesting party's lawyer in this case. I certify that I have complied with the requirements of section 7.7 of the Divorce Act and section 33.2 of the Children's Law Reform Act regarding reconciliation and the duty to discuss and inform."
                            showInput={false}
                        />
                    </div>
                    <div className='py-4'>
                        <Row className='pt-2'>
                            <Col xs={6}>
                                <BorderLessInput
                                    label={"Date"}
                                    type={"date"}
                                    fileno
                                    onChange={fillFormData}
                                    style={{ padding: "6px 0" }}
                                />
                            </Col>
                            <Col xs={6}>
                                <BorderLessInput
                                    label={"Lawyer's signature"}
                                    type={"text"}
                                    fileno
                                    onChange={fillFormData}
                                    style={{ padding: "6px 0" }}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className='pY-2'>
                        <p className='sub-heading text-decoration-underline pb-1'>
                            PART C-WHY THE REQUESTING PARTY WANTS THE CHANGES
                        </p>
                    </div>
                    <div>
                        <span className='fw-bold'>
                            Note: The requesting party must either complete the remainder of this form or complete a separate affidavit (Form 14A) to give the important facts that explain why the court should change the current order/agreement.
                            {' '}
                        </span>
                    </div>
                    <div className='py-3'>
                        <span className='fw-bold'>
                            I swear/affirm that the following is true:  {' '}
                        </span>
                    </div>
                    <li>
                        <ListItem
                            text='Are you and the responding party following the current order/agreement?'
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
                        <Col md={4}>
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
                    <DynamicTextArea
                        rows={5}
                        formData={formData}
                        updates={'importantFacts.adultry.details'}
                        fillFormData={fillFormData}
                    />
                    <li className='pt-3'>
                        <ListItem
                            text='Briefly give the facts that show why the court should change the order/agreement, including how your situation has changed since the order/agreement was made:'
                            showInput={false}
                        />
                    </li>
                    <DynamicTextArea
                        rows={20}
                        formData={formData}
                        updates={'importantFacts.adultry.details'}
                        fillFormData={fillFormData}
                    />
                    
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
                            <Col md={4}>
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
                            <Col md={8}>
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
                                    text='What date did you first ask the responsing'
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
                                    text='Did theresponsing party'
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
                                <Col md={4}>
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
                            <div className='pt-4'>
                            </div>
                            <Row className='border-top  border-dark border-4'>
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
                        </ol>
                    </li>
                </ol>
            </div>
        </>
    )
}

export default Listing