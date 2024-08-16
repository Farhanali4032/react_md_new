import React, { useEffect, useState } from 'react'
import useSingleMatterData from '../../../utils/Apis/matters/CustomHook/DocumentViewData'
import { Form13, FormInformation } from '../../../utils/Apis/matters/CustomHook/PDFData'
import { formatNumber } from '../../../utils/helpers/Formatting'
import NumberFormat from 'react-number-format'
import Loader from '../../Loader'
import FormDetails from '../Components/FormDetails'
import ApplicantDetails from '../Components/ApplicantDetails'
import RespondentDetails from '../Components/RespondentDetails'
import { useDispatch, useSelector } from 'react-redux'
import { selectGetFileData } from '../../../utils/Apis/matters/getFileData/getFileDataSelector'
import { getFileData } from '../../../utils/Apis/matters/getFileData/getFileDataActions'
import IncomeSource from './shared/IncomeSource';
import ExpensesTable from './shared/ExpensesTable';
import AssetsTableCombined from './shared/AssetsTableCombined'
import DebtsTable from './shared/DebtsTable'
import { otherBenefits, specialChildExpenses } from '../../../utils/matterData/emptyDataArray'
import SummaryTable from './shared/SummaryTable'
import CurrencyFormat from 'react-currency-format';
import IncomeDeclaration from './shared/IncomeDeclaration'
import ChildrenSpecialExpenses from './shared/ChildrenSpecialExpenses'
import OtherIncomeEarners from './shared/OtherIncomeEarners'
import { selectSingleMatterData } from '../../../utils/Apis/matters/getSingleMatter/getSingleMattersSelectors'

const FinancialStatement13 = ({ targetRef, matterId, onFormDataSave, savedData }) => {

    const dispatch = useDispatch()

    useEffect(() => {

        let data = {
            matterId: matterId,
            file_id: savedData.file_id,
            folder_id: savedData.folder_id,
        }

        dispatch(getFileData(data))

    }, [selectFileData])


    const selectFileData = useSelector(selectGetFileData);


    const { pdfData } = Form13(matterId)

    const { documentInfo, loading } = FormInformation(matterId)

    useEffect(() => {
        if (selectFileData && selectFileData[0]) {
            setFormData(JSON.parse(selectFileData[0].file_data))
        }
        else if (documentInfo) {
            setFormData(documentInfo);
        }
    }, [loading, formData, selectFileData])

    const [formData, setFormData] = useState()
    console.log("🚀 ~ FinancialStatement13 ~ formData:", formData)

    useEffect(() => {
        onFormDataSave({
            form_id: 'FORM_13',
            data: formData,
        })
    }, [formData])

    function fillFormData(key, defaultVal = null) {
        return e => {
            const updatedFormData = { ...formData }

            const keys = key.split('.')
            console.log("🚀 ~ fillFormData ~ keys:", keys)
            const value = e.target.value

            let nestedObj = updatedFormData
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i]
                if (i === keys.length - 1) {
                    nestedObj[k] = defaultVal ? defaultVal : value
                } else {
                    nestedObj[k] = { ...nestedObj[k] }
                    nestedObj = nestedObj[k]
                }
            }

            console.log("🚀 ~ fillFormData ~ updatedFormData:", updatedFormData)

            setFormData(updatedFormData)
        }
    }

    function changeFormCheck(key) {
        return e => {
            const updatedFormData = { ...formData }
            const value = e.target.checked

            const keys = key.split('.')

            let nestedObj = updatedFormData
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i]
                if (i === keys.length - 1) {
                    nestedObj[k] = value
                } else {
                    nestedObj[k] = { ...nestedObj[k] }
                    nestedObj = nestedObj[k]
                }
            }

            setFormData(updatedFormData)
        }
    }

    function changeAmount(key, defaultVal = null) {

        return e => {
            const updatedFormData = { ...formData }

            const keys = key.split('.')

            const value = e.target.value.replace('$', '')

            let nestedObj = updatedFormData

            for (let i = 0; i < keys.length; i++) {
                const k = keys[i]

                if (i === keys.length - 1) {
                    nestedObj[k] = defaultVal ? defaultVal : value
                } else {
                    nestedObj[k] = { ...nestedObj[k] }
                    nestedObj = nestedObj[k]
                }
            }
            setFormData(updatedFormData)
        }
    }

    function changeAmountIndex(key, defaultVal = null) {
        return (e) => {
            const updatedFormData = { ...formData };

            const keys = key.split('.');
            const value = e.target.value.replace('$', '');

            let nestedObj = updatedFormData;

            for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];

                if (Array.isArray(nestedObj)) {
                    const index = parseInt(k, 10);
                    if (!Number.isNaN(index)) {
                        if (!nestedObj[index]) {
                            nestedObj[index] = {};
                        }
                        nestedObj = nestedObj[index];
                    }
                } else {
                    if (!nestedObj[k]) {
                        nestedObj[k] = {};
                    }
                    nestedObj = nestedObj[k];
                }
            }

            const lastKey = keys[keys.length - 1];

            if (Array.isArray(nestedObj)) {
                const index = parseInt(lastKey, 10);
                if (!Number.isNaN(index)) {
                    nestedObj[index] = defaultVal ? defaultVal : value;
                }
            } else {
                nestedObj[lastKey] = defaultVal ? defaultVal : value;
            }

            setFormData(updatedFormData);
        };
    }

    const fillFormDataIndex = (path) => (event) => {
        const value = event.target.value;
        setFormData((prevState) => {
            const newState = { ...prevState };
            const keys = path.split('.');
            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = isNaN(keys[i + 1]) ? {} : [];
                }
                current = current[keys[i]] = Array.isArray(current[keys[i]])
                    ? [...current[keys[i]]]
                    : { ...current[keys[i]] };
            }
            if (Array.isArray(current)) {
                current[keys[keys.length - 1]] = value;
            } else {
                current[keys[keys.length - 1]] = value;
            }
            return newState;
        });
    };


    return (
        <>
            {loading ? (
                <Loader isLoading={loading} />
            ) : (
                <div className='pdf-form pdf-form-13b' ref={targetRef}>
                    {/* Form Name */}
                    <div className='row text-center mb-4'>
                        <div className='col-12'>
                            <div className='fw-bold fst-italic'>ONTARIO</div>
                        </div>
                    </div>

                    {/* Form Details */}
                    <FormDetails
                        formTitle={'Form 13 - Financial Statement (Support Claims)'}
                        courtName={formData?.court_info.courtName}
                        courtFileNumber={formData?.court_info.courtFileNumber}
                        courtOfficeAddress={formData?.court_info.courtOfficeAddress}
                        applicationType={formData?.court_info.applicationType}
                        selectOptions={false}
                    />

                    {/* Applicants */}
                    <ApplicantDetails applicant={formData?.applicant} lawyer={formData?.applicantsLawyer} />

                    {/* Respondents */}
                    <RespondentDetails respondent={formData?.respondent} lawyer={formData?.respondentsLawyer} />

                    {/* Filled By */}
                    <div className='row pb-20px pl-40px'>
                        <div className='fw-bolder'>This form is filled by:</div>
                        <div className='d-flex flex-row gap-4 pb-10px'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    name='filledBy'
                                    value='client'
                                    id='applicant'
                                    checked={formData?.filledBy === 'client'}
                                    onChange={fillFormData('filledBy')}
                                />
                                <label className='form-check-label' htmlFor='applicant'>
                                    Applicant
                                </label>
                            </div>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='radio'
                                    name='filledBy'
                                    value='opposingParty'
                                    id='respondent'
                                    checked={formData?.filledBy === 'opposingParty'}
                                    onChange={fillFormData('filledBy')}
                                />
                                <label className='form-check-label' htmlFor='respondent'>
                                    Respondent
                                </label>
                            </div>
                        </div>
                        {/* Separator */}
                        <div className='row pb-10px ml-10px border-top border-2 border-dark' />
                    </div>

                    {/* Instructions */}
                    <div className='row pb-20px pl-40px'>
                        <p className='sub-heading'>Instructions</p>
                        <div className='paragraph'>
                            <ol>
                                <li>
                                    <p className='paragraph'>
                                        You must complete this form if you are making or responding to a
                                        claim for child or spousal support or a claim to change support,
                                        unless your only claim for support is a claim for child support
                                        in the table amount under the <i>Child Support Guidelines</i>.
                                    </p>
                                    <p className='paragraph'>
                                        You may also be required to complete and attach additional
                                        schedules based on the claims that have been made in your case
                                        or your financial circumstances:
                                    </p>
                                    <ul>
                                        <li>
                                            If you have income that is not shown in Part I of the
                                            financial statement (for example, partnership inco me,
                                            dividends, rental income, capital gains or RRSP income), you
                                            must also complete <b>Schedule A</b>.
                                        </li>
                                        <li>
                                            If you have made or responded to a claim for child support
                                            that involves undue hardship or a claim for spousal support,
                                            you must also complete <b>Schedule B</b>.
                                        </li>
                                        <li>
                                            If you or the other party has sought a contribution towards
                                            special or extraordinary expenses for the child(ren), you must
                                            also complete <b>Schedule C</b>.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                        <p className='paragraph fst-italic'>
                            NOTES: You must <b>fully and truthfully</b> complete this financial
                            statement, including any applicable schedules. You must also provide
                            the other party with documents relating to support and a Certificate
                            of Financial Disclosure (Form 13A) as required by Rule 13 of the
                            Family Law Rules.
                        </p>
                        <p className='paragraph fst-italic'>
                            If you are making or responding to a claim for property, an
                            equalization payment or the matrimonial home, you must complete Form
                            13.1: Financial Statement (Property and Support Claims) instead of
                            this form.
                        </p>
                        {/* Separator */}
                        <div className='row pb-10px ml-10px border-top border-2 border-dark' />
                    </div>

                    <div className='row pb-20px pl-40px'>
                        <ol>
                            {/* Personal Details */}
                            <li>
                                <div className='data-input'>
                                    <div className='label'>
                                        <strong>My name is</strong> (full legal name)
                                    </div>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.filler.fullLegalName}
                                        onChange={fillFormData('filler.fullLegalName')}
                                    />
                                </div>

                                <div className='data-input'>
                                    <div className='label'>
                                        <strong>I live in</strong> (municipality & province)
                                    </div>
                                    <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.filler.province}
                                        onChange={fillFormData('filler.province')}
                                    />
                                </div>

                                <p className='paragrap'>
                                    <strong>and I swear/affirm that the following is true:</strong>
                                </p>

                                <p className='sub-heading'>Part 1: Income</p>
                            </li>

                            {/* Income */}
                            <IncomeDeclaration formData={formData} fillFormData={fillFormData} filler={formData?.filledBy} changeFormCheck={changeFormCheck} />
                        </ol>
                    </div>

                    {/* Tables */}
                    <div className='row pb-20px pl-40px'>
                        <IncomeSource formData={formData} changeAmount={changeAmount} filler={formData?.filledBy} />

                        {/* Table 1 inner Table */}
                        <p className='paragraph fw-bold'>14. Other Benefits</p>
                        <p className='paragraph'>
                            Provide details of any non-cash benefits that employer provides to you
                            or are paid for by your business such as medical insurance coverage,
                            the use of a company car, or romm and board.
                        </p>
                        <table className='pb-40px form-131-income-inner'>
                            <thead>
                                <tr>
                                    <th className='text-center'>Item</th>
                                    <th className='text-center'>Details</th>
                                    <th className='text-center'>Yearly Market Values ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData?.income?.otherBenefits && Array.isArray(formData?.income?.otherBenefits) && formData?.income?.otherBenefits.length > 0 ? (
                                    formData?.income?.otherBenefits.map((item, index) => (
                                        <>
                                            <tr>
                                                <td>
                                                    <input
                                                        className='custom-input-control'
                                                        value={formData?.income.otherBenefits.b1.item}
                                                        onChange={fillFormData('income.otherBenefits.b1.item')}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className='custom-input-control'
                                                        value={formData?.income.otherBenefits.b1.details}
                                                        onChange={fillFormData('income.otherBenefits.b1.details')}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className='custom-input-control'
                                                        value={formData?.income.otherBenefits.b1.yearlyMarketValues}
                                                        onChange={fillFormData(
                                                            'income.otherBenefits.b1.yearlyMarketValues'
                                                        )}
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                ) : (
                                    otherBenefits.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    className='custom-input-control'
                                                    value={item.item}
                                                    onChange={fillFormData(`income.otherBenefits.${index}.item`)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className='custom-input-control'
                                                    value={item.details}
                                                    onChange={fillFormData(`income.otherBenefits.${index}.details`)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className='custom-input-control'
                                                    value={item.yearlyMarketValues}
                                                    onChange={fillFormData(`income.otherBenefits.${index}.yearlyMarketValues`)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>

                        <p className='sub-heading'>Part 2: Expenses</p>
                        {/* Table Expenses */}
                        <ExpensesTable formData={formData} changeAmount={changeAmount} filler={'client'} />
                    </div>

                    {/* 3 Assets */}
                    <div className='row pb-20px pl-40px'>
                        {/* <p className='sub-heading'>Part 3: ASSETS</p> */}

                        {/* Table */}
                        <AssetsTableCombined heading="Part 3: ASSETS" formData={formData} changeAmount={changeAmountIndex} fillFormData={fillFormData} />
                    </div>

                    {/* 4 Debts */}
                    <div className='row pb-20px pl-40px'>
                        <DebtsTable heading="Part 4: DEBTS" formData={formData} changeAmount={changeAmountIndex} fillFormData={fillFormData} />
                    </div>

                    {/*5 Summary of Assets And Liabilities */}
                    <div className='row pb-20px pl-40px justify-content-center'>


                        {/* Table */}
                        <SummaryTable heading="Part 5: SUMMARY OF ASSETS AND LIABILITIES" formData={formData} changeAmount={changeAmountIndex} fillFormData={fillFormData} />
                    </div>

                    {/* Note */}
                    <div className='row pb-20px pl-40px'>
                        <p className='paragraph'>
                            NOTE:
                            <i>
                                This financial statement must be updated before any court event if
                                it is
                            </i>
                        </p>
                        <ul className='pl-40px'>
                            <li>more than 60 days old by the time of the case conference,</li>
                            <li>more than 30 days old by the time the motion is heard, or</li>
                            <li>
                                more than 40 days old by the start of the trial or the start of the
                                trial sitting, whichever comes first.
                            </li>
                        </ul>

                        <p className='paragraph text-decoration-underline'>
                            You may update this financial statement by either completing and
                            filing:
                        </p>
                        <ul className='pl-40px'>
                            <li>a new financial statement with updated information, or</li>
                            <li>
                                an affidavit in Form 14A setting out the details of any minor
                                changes or confirming that the information contained in this
                                statement remains correct.
                            </li>
                        </ul>
                    </div>

                    {/* Affirmation + Signature */}
                    <div className='row pb-20px pl-40px'>
                        <div className='col-8'>
                            <div className='data-input'>
                                <div className='label'>
                                    Sworn/Affirmed before me at (municipality){' '}
                                </div>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    value={formData?.declaration?.muncipility || ''}
                                    onChange={fillFormData('declaration.muncipility')}
                                />
                            </div>
                            <div className='data-input mt-20px'>
                                <div className='label'>in (province, state or country) </div>
                                <input
                                    type='text'
                                    className='custom-input-control'
                                    value={formData?.declaration?.state || ''}
                                    onChange={fillFormData('declaration.state')}
                                />
                            </div>
                            <div className='data-input mt-20px'>
                                <div className='label'>on (date) </div>
                                <input
                                    type='date'
                                    className='custom-input-control'
                                    value={formData?.declaration?.date || ''}
                                    onChange={fillFormData('declaration.date')}
                                />
                            </div>
                            <div className='data-input flex-column mt-20px'>
                                <input
                                    type='text'
                                    className='custom-input-control d-block'
                                    value={formData?.declaration?.sigName || ''}
                                    onChange={fillFormData('declaration.sigName')}
                                />
                                <div className='label'>
                                    Commissioner for taking affidavits (Type or print name below if
                                    signature is illegible.){' '}
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='data-input flex-column'>
                                <input
                                    type='text'
                                    className='custom-input-control d-block'
                                    value={formData?.declaration?.signature || ''}
                                    onChange={fillFormData('declaration.signature')}
                                />
                                <div className='label text-wrap'>
                                    Signature (This form is to be signed in front of a lawyer, justice
                                    of the peace, notary public or commissioner for taking
                                    affidavits.){' '}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Schedule A */}
                    <div className='row pb-20px pl-40px'>
                        <p className='sub-heading'>Schedule A: Additional Sources of Income</p>

                        {/* Table */}
                        <table className='pb-40px form-131-schedule-a'>
                            <thead>
                                <tr>
                                    <th>Line</th>
                                    <th>Income Sources</th>
                                    <th>Annual Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 1.</td>
                                    <td className='paragraph'> Net partnership income</td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.partnership || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.partnership')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 2.</td>
                                    <td className='paragraph'>
                                        {' '}
                                        Net rental income (Gross annual rental income of $)
                                    </td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.rental || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.rental')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 3.</td>
                                    <td className='paragraph'>
                                        {' '}
                                        Total amount of dividents received from taxable Canadian
                                        corporations
                                    </td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.dividends || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.dividends')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 4.</td>
                                    <td className='paragraph'>
                                        {' '}
                                        Total capital gains ($) less capital losses ($)
                                    </td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.capital || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.capital')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 5.</td>
                                    <td className='paragraph'>
                                        {' '}
                                        Regitstered retirement savings plan withdrawals
                                    </td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.retirement || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.retirement')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 6.</td>
                                    <td className='paragraph'>
                                        {' '}
                                        Income from a Registerede Retirement Income Fund or Annuity
                                    </td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.annuity || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.annuity')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td className='paragraph fw-bold'> 7.</td>
                                    <td className='paragraph'> Any other income (specify source)</td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.incomeSources.other || ''}
                                            onChange={fillFormData('scheduleA.incomeSources.other')}
                                        />
                                    </td>
                                </tr>
                                <tr className='inputs'>
                                    <td colSpan={2} className='paragraph fw-bold'>
                                        {' '}
                                        Subtotal
                                    </td>
                                    <td>
                                        <input
                                            className='custom-input-control'
                                            value={formData?.scheduleA?.totalIncome || ''}
                                            onChange={fillFormData('scheduleA.totalIncome')}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Schedule B */}
                    <OtherIncomeEarners
                        title={'Schedule B: Other Income Earners in the Home'}
                        description={`Complete this part only if you are making or responding to a claim for
                            undue hardship or spousal support. Check and complete all sections
                            that apply to you circumstances.`}
                        formData={formData}
                        fillFormData={fillFormData}
                        changeFormCheck={changeFormCheck}
                    />


                    {/* Schedule C */}
                    <ChildrenSpecialExpenses
                        title={'Schedule C: Special or Extraordinary Expenses for the Child(ren)'}
                        formData={formData}
                        fillFormData={fillFormDataIndex}
                        changeAmount={changeAmountIndex}
                        filler={formData?.filledBy}
                    />

                    {/* Acknowledge */}
                    <div className='row pb-20px pl-40px'>
                        <p className='paragraph fw-bold'>
                            *Some of these expenses can be claimed in a parent's income tax return
                            in relation to a tax credit or deduction (for example childcare
                            costs). These credits or deductions must be shown in the above chart.
                        </p>

                        <div className='d-flex flex-row'>
                            <div className='form-check d-flex'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    name='i_earns'
                                    value='i_earns'
                                    id='i_earns'
                                    checked={formData?.scheduleC?.amIEarn === true || ''}
                                    onChange={changeFormCheck('scheduleC.amIEarn')}
                                />
                                <label className='form-check-label text-nowrap' htmlFor='i_earns'>
                                    I earn $
                                </label>
                                <div className='data-input'>
                                    <CurrencyFormat
                                        className='custom-input-control'
                                        disabled={false}
                                        value={formData?.scheduleC?.iEarn || ''}
                                        onChange={fillFormData('scheduleC.iEarn')}
                                        thousandSeparator={true}
                                    />
                                    {/* <input
                                        type='text'
                                        className='custom-input-control'
                                        value={formData?.scheduleC?.iEarn || ''}
                                        onChange={fillFormData('scheduleC.iEarn')}
                                    /> */}
                                    <label className='form-check-label text-nowrap'>
                                        per year which should be used to determine my share of the above
                                        expenses.
                                    </label>
                                </div>
                            </div>
                        </div>

                        <p className='paragraph'>
                            <span className='fw-bold'>NOTE: </span>
                            Pursuant to the Child Support Guidelines, a court can order that the
                            parents of a child share the costs of the following expenses for the
                            child:
                            <ul>
                                <li>Necessary childcare expenses;</li>
                                <li>
                                    Medical insurance premiums and certain health-related expenses for
                                    the child that cost more than $100 annually;
                                </li>
                                <li>Extraordinary expenses for the child's education;</li>
                                <li>Post-secondary school expenses; and,</li>
                                <li>Extraordinary expenses for extracurricular activities.</li>
                            </ul>
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default FinancialStatement13
