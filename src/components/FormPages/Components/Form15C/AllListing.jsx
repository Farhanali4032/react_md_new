import React, { useState } from 'react'
import ListItem from '../../forms/shared/ListItems'
import RadioChecks from '../../forms/shared/RadioChecks'
import ChildInfoData from './ChildInfoData'
import { Col, Row } from 'react-bootstrap'
import ChildData from './ChildData'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import DynamicTextArea from '../../forms/shared/TextArea'
import CustomCheckBox from '../../forms/shared/CustomCheckBox'
import SubTitleHeading from '../../forms/shared/SubTitle'
import CurrencyFormat from 'react-currency-format';

const AllListing = ({ fillFormData, formData, handleChildrenDataChange, changeFormCheck }) => {

    return (
        <>
            <div>
                <ol type="number">
                    <li>
                        <ListItem

                            text={"We know that each of us has the right to get advice from his or her own lawyer about this case and understand that signing this consent may result in a final court order that will be enforced."}
                            showInput={false}
                        />
                    </li>
                    <li>
                        <CustomCheckBox
                            id='order'
                            name='order'
                            label={`We have filed/are filing Financial Statements (Form 13 or 13.1) with the court.`}
                            type='checkbox'
                            fillFormData={changeFormCheck}
                            labelinput={'item2.a.checked'}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item2?.a?.checked}
                            col
                            marginRight
                        />
                        <CustomCheckBox
                            id='order'
                            name='order'
                            label={`We have agreed not to file any Financial Statements with the court.`}
                            type='checkbox'
                            fillFormData={changeFormCheck}
                            labelinput={'item2.b.checked'}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item2?.b?.checked}
                            col
                            marginRight
                        />
                    </li>
                    <li>
                        <CustomCheckBox
                            id='order'
                            name='order'
                            label={`We have attached the existing final order or support agreement and ask the court to make an order that changes that order or agreement as set out below. `}
                            type='checkbox'
                            fillFormData={changeFormCheck}
                            labelinput={'item3.a.checked'}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item3?.a?.checked}
                            col
                            marginRight
                        />

                        <div className='ps-4'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                label={`Since the order/agreement for child support was made, a Notice of Recalculation was issued by the`}
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item3.b.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item3?.b?.checked}
                                col
                                marginRight
                            />
                            <div className='data-input ps-5' style={{ justifyContent: "start" }}>
                                <span className='label'>online Child Support Service dated</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item3.details')}
                                    value={formData?.item3?.details}
                                    style={{ width: "auto" }}
                                />
                                <span className='label small'>(please attach) {' '}</span>
                            </div>
                        </div>
                    </li>
                    <SubTitleHeading
                        heading={' PARENTING OR CONTACT'}
                        note={
                            <>
                                <span className='label small fw-bold'>(Complete only if the parties are asking for a change in parenting or contact.) {' '}</span>
                            </>
                        }
                        smallLabel
                        centered
                    />
                    <li>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item4.a.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item4?.a?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>We agree that (name(s) of person(s) or party(ies)){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item4.a.details')}
                                    value={formData?.item4?.a?.details}

                                />
                            </div>
                        </div>
                        <div className='ps-4'>
                            <ListItem
                                text={"shall have decision-making responsibility for the following child(ren) as described in the attached schedule:"}
                                showInput={false}
                            />
                            <div className='mt-3 ps-3'>
                                <ChildInfoData
                                    formData={formData}
                                    handleChildrenDataChange={handleChildrenDataChange}
                                />
                            </div>
                        </div>

                    </li>
                    <div className='form-check mx-3'>
                        <CustomCheckBox
                            id='order'
                            name='order'
                            type='checkbox'
                            fillFormData={changeFormCheck}
                            labelinput={'item4.b.checked'}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item4?.b?.checked}
                            noWrap
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>We agree that (name(s) of person(s) or party(ies)){'   '}</span>
                            <input
                                type='text'
                                className='custom-input-control'
                                onChange={fillFormData('item4.b.details')}
                                value={formData?.item4?.b?.details}
                            />
                        </div>
                    </div>
                    <div className='ps-4'>
                        <ListItem
                            text={"shall have parenting time with: (name(s) and birthdate(s) of child(ren))"}
                            showInput={false}
                        />
                    </div>
                    <div className='data-input ps-5 pe-3' style={{ justifyContent: "start" }}>
                        <input
                            type='text'
                            className='custom-input-control'
                            onChange={fillFormData('item4.b.parenting_time')}
                            value={formData?.item4?.b?.parenting_time}
                        />
                    </div>
                    <div className='ps-4 pt-2'>
                        <ListItem
                            text={"as described in the attached schedule."}
                            showInput={false}
                        />
                    </div>
                    <div className='form-check mx-3'>
                        <CustomCheckBox
                            id='order'
                            name='order'
                            type='checkbox'
                            fillFormData={changeFormCheck}
                            labelinput={'item4.c.checked'}
                            isBold={false}
                            checkbox={true}
                            checked={formData?.item4?.c?.checked}
                            noWrap
                        />
                        <div className='data-input' style={{ justifyContent: "start" }}>
                            <span className='label'>We agree that (name(s) of person(s) or party(ies)){'   '}</span>
                            <input
                                type='text'
                                className='custom-input-control'
                                onChange={fillFormData('item4.c.details')}
                                value={formData?.item4?.c?.details}
                            />
                        </div>
                    </div>
                    <div className='ps-4'>
                        <ListItem
                            text={"shall have contact with: (name(s) and birthdate(s) of child(ren)) "}
                            showInput={false}
                        />
                    </div>
                    <div className='data-input ps-5 pe-3' style={{ justifyContent: "start" }}>
                        <input
                            type='text'
                            className='custom-input-control'
                            onChange={fillFormData('item4.c.contact_with')}
                            value={formData?.item4?.c?.contact_with}
                        />
                    </div>
                    <div className='ps-4 pt-2'>
                        <ListItem
                            text={"as described in the attached schedule."}
                            showInput={false}
                        />
                    </div>
                    <div className='pt-2 text-center'>
                        <p className='sub-heading small mb-0'>
                            CHILD SUPPORT
                        </p>
                        <span className='label small fw-bold'>(Complete only if the parties are asking for a change in child support.) {' '}</span>
                    </div>
                    <li className='pt-3'>
                        <ListItem
                            text='We agree to an order for child support that is:'
                            showInput={false}
                        />
                        <Row className='ps-4'>
                            <Col md={12}>
                                <CustomCheckBox
                                    id='order'
                                    name='order'
                                    label=' equal to or more than what is in the Child Support Guidelines.'
                                    type='checkbox'
                                    fillFormData={changeFormCheck}
                                    labelinput={'item5.a.checked'}
                                    isBold={false}
                                    checkbox={true}
                                    checked={formData?.item5?.a?.checked}
                                    col
                                    marginRight
                                />

                            </Col>
                            <Col md={12}>
                                <CustomCheckBox
                                    id='order'
                                    name='order'
                                    label="none (no child support)."
                                    type='checkbox'
                                    fillFormData={changeFormCheck}
                                    labelinput={'item5.b.checked'}
                                    isBold={false}
                                    checkbox={true}
                                    checked={formData?.item5?.b?.checked}
                                    col
                                    marginRight
                                />
                            </Col>
                            <Col md={12}>
                                <CustomCheckBox
                                    id='order'
                                    name='order'
                                    label="less than what is in the Child Support Guidelines for the following reasons:"
                                    type='checkbox'
                                    fillFormData={changeFormCheck}
                                    labelinput={'item5.c.checked'}
                                    isBold={false}
                                    checkbox={true}
                                    checked={formData?.item5?.c?.checked}
                                    col
                                    marginRight
                                />

                            </Col>
                            <Col md={12}>
                                <div className='w-100 ps-4'>
                                    <div className='data-input mt-0 pt-0'>
                                        <input
                                            type='text'
                                            className='custom-input-control'
                                            onChange={fillFormData('item5.c.details')}
                                            value={formData?.item5?.c?.details}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </li>
                    <li>
                        <div className='d-flex gap-5 align-items-center ps-3 pt-2'>
                            <span className='label'>
                                The party receiving support
                            </span>
                            <div className='d-flex gap-5'>
                                <div className='form-check'>
                                    <CustomCheckBox
                                        id='order'
                                        name='order'
                                        type='checkbox'
                                        fillFormData={changeFormCheck}
                                        labelinput={'item6.is.checked'}
                                        isBold={false}
                                        checkbox={true}
                                        checked={formData?.item6?.is?.checked}
                                        noWrap
                                    />
                                    <label className='form-check-label' htmlFor='support_owed_yes'>
                                        is
                                    </label>
                                </div>
                                <div className='form-check'>
                                    <CustomCheckBox
                                        id='order'
                                        name='order'
                                        type='checkbox'
                                        fillFormData={changeFormCheck}
                                        labelinput={'item6.is_not.checked'}
                                        isBold={false}
                                        checkbox={true}
                                        checked={formData?.item6?.is_not?.checked}
                                        noWrap
                                    />
                                    <label className='form-check-label' htmlFor='support_owed_no'>
                                        is not
                                    </label>
                                </div>
                                <div>
                                    <span className='label'>
                                        receiving social assistance
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='pt-2'>
                        <ListItem
                            text=' We agree that child support shall be as follows:'
                            showInput={false}
                        />
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item7.a.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item7?.a?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'> Based on the payor’s annual income of ${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item7?.a?.annual_income}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item7.a.annual_income')}
                                />

                                <span className='label'>, (name of party){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.a.party_name')}
                                    value={formData?.item7?.a?.party_name}
                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>shall pay to (name of party){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.a.pay_party')}
                                    value={formData?.item7?.a?.pay_party}
                                />
                                <span className='label'>${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item7?.a?.per_month}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item7.a.per_month')}
                                />
                                <span className='label'>per month{'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>for the following child(ren) (name(s) and birthdate(s) of child(ren)){'   '}</span>
                            </div>
                            <div className='data-input mt-0'>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.a.children')}
                                    value={formData?.item7?.a?.children}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>with payments to begin on (date)</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    style={{ width: "auto" }}
                                    onChange={fillFormData('item7.a.date')}
                                    value={formData?.item7?.a?.date}
                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item7.b.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item7?.b?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>Starting on (date){'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.b.date')}
                                    value={formData?.item7?.b?.date}

                                />
                                <span className='label'>, (name of party){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.b.party_name')}
                                    value={formData?.item7?.b?.party_name}

                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>shall pay to (name of party){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.b.pay_party')}
                                    value={formData?.item7?.b?.pay_party}
                                />
                                <span className='label'>${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item7?.b?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item7.b.amount')}
                                />
                                <span className='label'>for the{'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>following special or extraordinary expenses:{'   '}</span>
                            </div>
                            <div className='mt-3'>
                                <ChildData
                                    formData={formData}
                                    handleChildrenDataChange={handleChildrenDataChange}
                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item7.c.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item7?.c?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>(Complete only if the parties are agreeing to special or extraordinary expenses.) The recipient’s total annual income is</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>$</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item7?.c?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item7.b.amount')}
                                    style={{ width: 'auto' }}
                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item7.d.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item7?.d?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>The order or agreement for child support, with respect to the child(ren) (name(s) and birthdate(s) of child(ren))</span>
                            </div>
                            <div className='data-input mt-0'>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.d.children')}
                                    value={formData?.item7?.d?.children}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>dated</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.d.dated')}
                                    value={formData?.item7?.d?.dated}
                                    style={{ width: "auto" }}
                                />
                                <span className='label'>{' '}, shall be terminated as of (date)</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item7.d.date')}
                                    value={formData?.item7?.d?.date}
                                    style={{ width: "auto" }}
                                />
                            </div>
                        </div>
                    </li>
                    <div className='mt-3'>
                    <BoldandThinText bold={'Complete if applicable:'} italic />
                    </div>
                    <li className=''>
                       
                        <ListItem
                            text='We also agree that the outstanding child support owed be paid off as follows:'
                            showInput={false}
                        />
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item8.a.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.itema?.a?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>The child support owed to (name of recipient){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.a.recipient_name')}
                                    value={formData?.item8?.a?.recipient_name}
                                />
                                <span className='label'>shall be{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>fixed at ${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item8?.a?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item8.a.amount')}
                                />
                                <span className='label'>as of (date){'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.a.date')}
                                    value={formData?.item8?.a?.date}
                                />
                                <span className='label'>{' '}and (name of payor) {'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.a.payor')}
                                    value={formData?.item8?.a?.payor}
                                />
                                <span className='label'>shall pay (name of agency or other person)</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.a.shall_pay')}
                                    value={formData?.item8?.a?.shall_pay}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>${' '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item8?.a?.payor_amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item8.a.payor_amount')}
                                />
                                <span className='label'>{' '}per month, with payments to begin on (date)</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.a.payment_date')}
                                    value={formData?.item8?.a?.payment_date}
                                />
                                <span className='label'>{' '}until the</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>full amount owing has been paid.{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item8.b.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.itema?.b?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>The child support owed to (name of agency or other person){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.b.owed')}
                                    value={formData?.item8?.b?.owed}

                                />
                                <span className='label'>shall be{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>fixed at ${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item8?.b?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item8.b.amount')}
                                />
                                <span className='label'>as of (date){'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.b.date')}
                                    value={formData?.item8?.b?.date}

                                />
                                <span className='label'>{' '}and (name of payor) {'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.b.payor_name')}
                                    value={formData?.item8?.b?.payor_name}
                                />
                                <span className='label'>shall pay (name of agency or other person)</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.b.shall_pay')}
                                    value={formData?.item8?.b?.shall_pay}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>${' '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item8?.b?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item8.b.amount')}
                                />
                                <span className='label'>{' '}per month, with payments to begin on (date)</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item8.b.payment_date')}
                                    value={formData?.item8?.b?.payment_date}
                                />
                                <span className='label'>{' '}until the</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>full amount owing has been paid.{'   '}</span>
                            </div>
                        </div>
                    </li>
                    <div className='pt-2 text-center'>
                        <p className='sub-heading small mb-0'>
                            SPOUSAL SUPPORT
                        </p>
                        <span className='label small fw-bold'>(Complete only if the parties are seeking a change in spousal support.) {' '}</span>
                    </div>
                    <li className='pt-2'>
                        <ListItem
                            text='We agree that the spousal support payments should be as follows:'
                            showInput={false}
                        />
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item9.a.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item9?.a?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>(Name of party){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item9.a.party_name')}
                                    value={formData?.item9?.a?.party_name}
                                />
                                <span className='label'>shall pay to{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>(name of party){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item9.a.pay_to')}
                                    value={formData?.item9?.a?.pay_to}
                                />
                                <span className='label'>the amount of{'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>${' '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item9?.a?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('item9.a.amount')}
                                />
                                <span className='label'>{' '}per month, with payments to begin on (date)</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item9.a.date')}
                                    value={formData?.item9?.a?.date}
                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item9.b.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item9?.b?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>The order or agreement for spousal support, dated{'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item9.b.dated')}
                                    value={formData?.item9?.b?.dated}

                                />
                                <span className='label'>, shall be terminated as of{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>(date){'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item9.b.date')}
                                    value={formData?.item9?.b?.date}
                                    style={{ width: "auto" }}
                                />
                            </div>
                        </div>
                    </li>
                    <li className='pt-2'>
                        <ListItem
                            text='We agree that the outstanding spousal support owed be paid off as follows:'
                            showInput={false}
                        />
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item10.a.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item10?.a?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>The spousal support owed to (name of recipient){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.a.recipient_name')}
                                    value={formData?.item10?.a?.recipient_name}

                                />
                                <span className='label'>shall be{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>fixed at ${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item10?.a?.amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('itema10.a.amount')}
                                />
                                <span className='label'>as of (date){'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.a.date')}
                                    value={formData?.item10?.a?.date}

                                />
                                <span className='label'>and (name of payor){'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.a.payor_name')}
                                    value={formData?.item10?.a?.payor_name}
                                />
                                <span className='label'>{' '}shall pay (name of recipient){' '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.a.recipient_name')}
                                    value={formData?.item10?.a?.recipient_name}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>${' '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item10?.a?.payor_amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('itema10.a.payor_amount')}
                                />
                                <span className='label'>{' '}per month, with payments to begin on (date){' '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.a.date')}
                                    value={formData?.item10?.a?.date}
                                />
                                <span className='label'>{' '}until the{' '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>full amount owing has been paid.{'   '}</span>
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <CustomCheckBox
                                id='order'
                                name='order'
                                type='checkbox'
                                fillFormData={changeFormCheck}
                                labelinput={'item10.b.checked'}
                                isBold={false}
                                checkbox={true}
                                checked={formData?.item10?.b?.checked}
                                noWrap
                            />
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>The spousal support owed to (name of agency or other person){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.b.support_owed_to')}
                                    value={formData?.item10?.b?.support_owed_to}
                                />
                            </div>
                        </div>
                        <div className='form-check mx-3'>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>shall be fixed at ${'   '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item10?.b?.payor_amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('itema10.b.payor_amount')}
                                />
                                <span className='label'>as of (date){'   '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.b.date')}
                                    value={formData?.item10?.b?.date}

                                />
                                <span className='label'>and (name of payor){'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.b.payor_name')}
                                    value={formData?.item10?.b?.payor_name}
                                />
                                <span className='label'>{' '}shall pay (name of recipient){' '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.b.recipient_name')}
                                    value={formData?.item10?.b?.recipient_name}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>${' '}</span>
                                <CurrencyFormat
                                    className='custom-input-control'
                                    disabled={false}
                                    value={formData?.item10?.b?.recipient_amount}
                                    thousandSeparator={true}
                                    onChange={fillFormData('itema10.b.recipient_amount')}
                                />
                                <span className='label'>{' '}per month, with payments to begin on (date){' '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item10.b.to_date')}
                                    value={formData?.item10?.b?.to_date}
                                />
                                <span className='label'>{' '}until the{' '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>full amount owing has been paid.{'   '}</span>
                            </div>
                            <div className='pt-2'>
                                <BoldandThinText bold={`NOTE: If money is owed to an agency or other person (an assignee), a representative of that agency or the other person must consent to the change in the order`} />
                            </div>
                        </div>
                    </li>
                    <div className='pt-2 text-center'>
                        <p className='sub-heading small mb-0'>
                            OTHER
                        </p>
                        <span className='label small fw-bold'>(Complete if applicable.) {' '}</span>
                    </div>
                    <li className='pt-2'>
                        <div className='form-check '>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>We agree that paragraph(s) (specify which paragraphs of the order are to be changed){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item11.paragraphs')}
                                    value={formData?.item11?.paragraphs}
                                />
                                <span className='label'>of the order{'   '}</span>
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>of Justice (name of judge){'   '}</span>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    onChange={fillFormData('item11.judge_name')}
                                    value={formData?.item11?.judge_name}

                                />
                                <span className='label'>, dated{' '}</span>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    onChange={fillFormData('item11.dated')}
                                    value={formData?.item11?.dated}
                                />
                            </div>
                            <div className='data-input' style={{ justifyContent: "start" }}>
                                <span className='label'>shall be changed as follows: (give details of the order you want the court to make){'   '}</span>
                            </div>
                            <div>
                                <DynamicTextArea
                                    rows={5}
                                    formData={formData}
                                    updates={'item11.details'}
                                    value={formData?.item11?.details}
                                    fillFormData={fillFormData}
                                />
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </>
    )
}

export default AllListing