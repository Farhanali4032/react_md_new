import React, { useEffect, useState } from 'react'
import useSingleMatterData from '../../../utils/Apis/matters/CustomHook/DocumentViewData';
import { Form131, FormInformation } from '../../../utils/Apis/matters/CustomHook/PDFData';
import Loader from '../../Loader';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import FormDetails from '../Components/FormDetails';
import IncomeSource from './shared/IncomeSource';
import ExpensesTable from './shared/ExpensesTable';
import '../../../assets/css/pages/formPages/fill-pdf.css'
import CurrencyFormat from 'react-currency-format';
import { Row } from 'react-bootstrap';
import AssetsTable from './shared/AssetsTable';
import { getMatterData } from '../../../utils/Apis/matters/getMatterData/getMatterDataActions';
import { selectMatterData } from '../../../utils/Apis/matters/getMatterData/getMatterDataSelectors';
import IncomeDeclaration from './shared/IncomeDeclaration';
import { otherBenefits, specialChildExpenses } from '../../../utils/matterData/emptyDataArray';
import DebtsTable from './shared/DebtsTable';
import ChildrenSpecialExpenses from './shared/ChildrenSpecialExpenses';
import OtherIncomeEarners from './shared/OtherIncomeEarners';

const FinancialStatement131 = ({ targetRef, matterId, onFormDataSave }) => {

  const dispatch = useDispatch();
  const [dataCollected, setDataCollected] = useState(false);
  // const { pdfData, loading } = Form131(matterId)
  const { documentInfo, loading } = FormInformation(matterId)
  console.log("🚀 ~ FinancialStatement131 ~ documentInfo:", documentInfo)

  useEffect(() => {
    if (documentInfo) {
      setFormData(documentInfo);
    }
  }, [documentInfo, formData, loading])

  const [formData, setFormData] = useState()

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM_13_1',
      data: formData,
    })
  }, [formData])



  function fillFormData(key, defaultVal = null) {
    return e => {
      const updatedFormData = { ...formData }

      const keys = key.split('.')
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
          {/* Form 13.1 - Financial Statement (Property and Support Claims) */}
          <FormDetails
            formTitle={'Form 13.1 - Financial Statement (Property and Support Claims)'}
            courtName={formData?.court_info.courtName}
            courtFileNumber={formData?.court_info.courtFileNumber}
            courtOfficeAddress={formData?.court_info.courtOfficeAddress}
            applicationType={formData?.court_info.applicationType}
            selectOptions={false}
          />

          {/* Applicants */}
          <div className='row pb-20px pl-40px'>
            <div className='col-6'>
              <div className='fw-bolder'>Applicant(s)</div>
              <div className='data-group inputs'>
                <div className='data-input'>
                  <div className='label'>Full legal name:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicant.fullLegalName}
                    onChange={fillFormData('applicant.fullLegalName')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Address:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicant.address}
                    onChange={fillFormData('applicant.address')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Phone & fax:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicant.phoneAndFax}
                    onChange={fillFormData('applicant.phoneAndFax')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Email:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicant.email}
                    onChange={fillFormData('applicant.email')}
                  />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='fw-bolder'>Applicant(s) Lawyer</div>
              <div className='data-group inputs'>
                <div className='data-input'>
                  <div className='label'>Full legal name:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicantsLawyer.fullLegalName}
                    onChange={fillFormData('applicantsLawyer.fullLegalName')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Address:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicantsLawyer.address}
                    onChange={fillFormData('applicantsLawyer.address')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Phone & fax:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicantsLawyer.phoneAndFax}
                    onChange={fillFormData('applicantsLawyer.phoneAndFax')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Email:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.applicantsLawyer.email}
                    onChange={fillFormData('applicantsLawyer.email')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Respondents */}
          <div className='row pb-20px pl-40px'>
            <div className='col-6'>
              <div className='fw-bolder'>Respondent(s)</div>
              <div className='data-group inputs'>
                <div className='data-input'>
                  <div className='label'>Full legal name:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondent.fullLegalName}
                    onChange={fillFormData('respondent.fullLegalName')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Address:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondent.address}
                    onChange={fillFormData('respondent.address')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Phone & fax:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondent.phoneAndFax}
                    onChange={fillFormData('respondent.phoneAndFax')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Email:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondent.email}
                    onChange={fillFormData('respondent.email')}
                  />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='fw-bolder'>Respondent(s) Lawyer</div>
              <div className='data-group inputs'>
                <div className='data-input'>
                  <div className='label'>Full legal name:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondentsLawyer.fullLegalName}
                    onChange={fillFormData('respondentsLawyer.fullLegalName')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Address:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondentsLawyer.address}
                    onChange={fillFormData('respondentsLawyer.address')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Phone & fax:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondentsLawyer.phoneAndFax}
                    onChange={fillFormData('respondentsLawyer.phoneAndFax')}
                  />
                </div>
                <div className='data-input'>
                  <div className='label'>Email:</div>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.respondentsLawyer.email}
                    onChange={fillFormData('respondentsLawyer.email')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Filled By */}
          <div className='row pb-20px pl-40px'>
            <div className='fw-bolder'>This form is filled by:</div>
            <div className='d-flex flex-row gap-4 pb-10px'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='filledBy'
                  value='applicant'
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
                  value='respondent'
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
                  <p className='paragraph'>USE THIS FORM IF:</p>
                  <ul>
                    <li>
                      you are making or responding to a claim for property or
                      exclusive possession of the matrimonial home and its contents;
                      or
                    </li>
                    <li>
                      you are making or responding to a claim for property or
                      exclusive possession of the matrimonial home and its contents
                      together with other claims for relief.
                    </li>
                  </ul>
                </li>
                <li>
                  <p className='paragraph'>USE FORM 13 INSTEAD OF THIS FORM IF:</p>
                  <ul>
                    <li>
                      you are making or responding to a claim for support but NOT
                      making or responding to a claim for property or exclusive
                      possession of the matrimonial home and its contents.
                    </li>
                  </ul>
                </li>
                <li>
                  <p className='paragraph'>
                    If you have income that is not shown in Part I of the financial
                    statement (for example, partnership income, dividends, rental
                    income, capital gains or RRSP income), you must also complete{' '}
                    <strong>Schedule A</strong>.
                  </p>
                </li>
                <li>
                  <p className='paragraph'>
                    If you or the other party has sought a contribution towards
                    special or extraordinary expenses for the child(ren), you must
                    also complete <strong>Schedule B</strong>.
                  </p>
                </li>
              </ol>
            </div>
            <p className='paragraph fst-italic'>
              NOTE: You must <strong>fully and truthfully</strong> complete this
              financial statement, including any applicable schedules. You must also
              provide the other party with documents relating to support and
              property and a Certificate of Financial Disclosure (Form 13A) as
              required by Rule 13 of the Family Law Rules.
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
                    className='form-control'
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
                    className='form-control'
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
            {/* Income Sources */}
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
                            className='form-control'
                            value={formData?.income.otherBenefits.b1.item}
                            onChange={fillFormData('income.otherBenefits.b1.item')}
                          />
                        </td>
                        <td>
                          <input
                            className='form-control'
                            value={formData?.income.otherBenefits.b1.details}
                            onChange={fillFormData('income.otherBenefits.b1.details')}
                          />
                        </td>
                        <td>
                          <input
                            className='form-control'
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
                          className='form-control'
                          value={item.item}
                          onChange={fillFormData(`income.otherBenefits.${index}.item`)}
                        />
                      </td>
                      <td>
                        <input
                          className='form-control'
                          value={item.details}
                          onChange={fillFormData(`income.otherBenefits.${index}.details`)}
                        />
                      </td>
                      <td>
                        <input
                          className='form-control'
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

            <ExpensesTable formData={formData} changeAmount={changeAmount} filler={'client'} />

          </div>

          {/* Other Income Earners */}
          <OtherIncomeEarners
            title={'Part 3: OTHER INCOME EARNERS IN THE HOME'}
            description={'Complete this part only if you are making or responding to a claim for undue hardship or spousal support. Check and complete all sections that apply to you circumstances.'}
            formData={formData}
            fillFormData={fillFormData}
            changeFormCheck={changeFormCheck}
          />

          {/* Assets in and out */}
          <div className='row pb-20px pl-40px'>
            <p className='sub-heading'>Part 4: ASSETS IN AND OUT OF ONTARIO</p>

            <p className='paragraph fst-italic'>
              If any sections of Parts 4 to 9 do not apply, do not leave blank,
              print "NONE" in the section.
            </p>

            <div className='data-input'>
              <div className='label'>The date of marriage is: (give date)</div>
              <input
                type='text'
                className='form-control'
                value={formData?.assets.dateOfMarriage}
                onChange={fillFormData('assets.dateOfMarriage')}
              />
            </div>

            <div className='data-input'>
              <div className='label'>The valuation date is: (give date)</div>
              <input
                type='text'
                className='form-control'
                value={formData?.assets.dateOfValuation}
                onChange={fillFormData('assets.dateOfValuation')}
              />
            </div>

            <div className='data-input'>
              <div className='label'>
                The date of commencement of cohabitation is (if different from date
                of marriage): (give date)
              </div>
              <input
                type='date'
                className='form-control'
                value={formData?.assets.dateOfCommencement}
                onChange={fillFormData('assets.dateOfCommencement')}
              />
            </div>
          </div>

          {/* 4(a) Land */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.land}
              changeAmount={changeAmountIndex}
              heading={'Part 4(a): LAND'}
              info={`Include any interest in land owned on the dates in each of the
              columns below, including leasehold interests and mortgages. Show
              estimated market value of your interest, but do not deduct
              encumbrances or costs of disposition; these encumbrances and costs
              should be shown under Part 5, "Debts and Other Liabilities".`}
              assetType={'land'}
              totalTitle={'15. TOTAL VALUE OF LAND'}
              fillFormData={fillFormData}
            />
          </Row>

          {/* 4(b) General Household Items and Vehicles */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.household}
              changeAmount={changeAmountIndex}
              heading={`Part 4(b): GENERAL HOUSEHOLD ITEMS AND VEHICLES`}
              info={`Show estimated market value, not the cost of replacement for these
              items owned on the dates in each of the columns below. Do not deduct
              encumbrances or costs of disposition; these encumbrances and costs
              should be shown under Part 5, "Debts and Other Liablilities"`}
              totalTitle={'16. TOTAL VALUE GENERAL HOUSEHOLD ITEMS AND VEHICLES'}
              assetType={'household'}
              fillFormData={fillFormData}
            />
          </Row>

          {/* 4(c) Bank Accounts, Savings Securities and Pensions */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.bank}
              changeAmount={changeAmountIndex}
              heading={`Part 4(c): BANK ACCOUNTS, SAVINGS SECURITIES AND PENSIONS`}
              info={`Show the items owned on the dates in each of the columns below by
              category, for example, cash, accounts in financial institutions,
              pensions, registered retirement or other savings plans, deposit
              receipts, any other savings, bonds, warrants, options, notes and other
              securities. Give your best estimate of the market value of the
              securities if the items were to be sold on the open market.`}
              totalTitle={'17. TOTAL VALUE OF ACCOUNTS, SAVINGS SECURITIES AND PENSIONS'}
              assetType={'bank'}
              fillFormData={fillFormData}
            />
          </Row>

          {/* 4(d) Life and Disability Insurance */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.life}
              changeAmount={changeAmountIndex}
              heading={`Part 4(d): LIFE AND DISABILITY INSURANCE`}
              info={`List all policies in existence on the dates in each of the columns below.`}
              totalTitle={'18. TOTAL VALUE OF LIFE AND DISABILITY INSURANCE'}
              assetType={'life'}
              fillFormData={fillFormData}
            />
          </Row>


          {/* 4(e) Business Interests */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.interests}
              changeAmount={changeAmountIndex}
              heading={`Part 4(e): BUSINESS INTERESTS`}
              info={` Show any interest in an unincorporated business owned on the dates in
              each of the columns below. An interest in an incorporated business may
              be shown here or under "BANK ACCOUNTS, SAVINGS, SECURITIES, AND
              PENSIONS" in Part 4(c). Give your best estimate of the market value of
              your interest.`}
              totalTitle={'19. TOTAL VALUE OF BUSINESS INTERESTS'}
              assetType={'interests'}
              fillFormData={fillFormData}
            />
          </Row>
       

          {/* 4(f) Money Owed To You */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.moneyOwed}
              changeAmount={changeAmountIndex}
              heading={`Part 4(f): MONEY OWED TO YOU`}
              info={`  Give details of all money that other persons owe to you on the dates
              in each of the columns below, whether because of business or from
              personal dealings. Include any court judgments in your favour, any
              estate money and any income tax refunds owed to you.`}
              totalTitle={'20. TOTAL VALUE OF MONEY OWED TO YOU	'}
              assetType={'moneyOwed'}
              fillFormData={fillFormData}
            />
          </Row>

          {/* 4(g) Other Property */}
          <Row className='pb-20px pl-40px'>
            <AssetsTable
              formData={formData?.assets?.otherProperty}
              changeAmount={changeAmountIndex}
              heading={`Part 4(g): OTHER PROPERTY`}
              info={`Show other property or assets owned on the dates in each of the
              columns below. Inlcude property on any kind not listed above. Give
              your best estimate of market value.`}
              totalTitle={'20. TOTAL VALUE OF MONEY OWED TO YOU	'}
              assetType={'otherProperty'}
              fillFormData={fillFormData}
            />
          </Row>

          {/* 5 Debts and Other Liabilities */}
          <div className='row pb-20px pl-40px'>



           

            <DebtsTable heading="Part 5: DEBTS AND OTHER LIABILITIES" info={`<p className='paragraph fst-italic'>
              Show your debts and other liabilities on the dates in each of the
              columns below. List them by category such as mortgages, charges,
              liens, notes, credit cards, and accounts payable. Don't forget to
              include:
              <ul>
                <li>any money owed to the Canada Revenue Agency;</li>
                <li>
                  contingent liabilities such as guarantees or warranties given by
                  you (but indicate that they are contingent); and
                </li>
                <li>
                  any unpaid legal or professional bills as a result of this case.
                </li>
              </ul>
            </p>`} formData={formData} changeAmount={changeAmountIndex} fillFormData={fillFormData} />
            {/* Table
            <table className='pb-40px form-131-5'>
              <thead>
                <tr>
                  <th rowSpan={2}>Category</th>
                  <th rowSpan={2}>Details</th>
                  <th colSpan={3}>Amount Owing</th>
                </tr>
                <tr>
                  <th>on date of marriage</th>
                  <th>on valuation date</th>
                  <th>today</th>
                </tr>
              </thead>
              <tbody>
                {formData?.debts && formData?.debts.map(item => (
                  <tr className='inputs'>
                    <td>
                      <textarea
                        className='form-control'
                        value={item.category}
                        onChange={fillFormData('assets.debts.category')}
                      />
                    </td>
                    <td>
                      <textarea
                        className='form-control'
                        value={item.details}
                        onChange={fillFormData('assets.debts.details')}
                      />
                    </td>
                    <td>
                      <NumberFormat
                        value={item.on_date_of_marriage}
                        className='form-control'
                        inputMode='numeric'
                        thousandSeparator={true}
                        decimalScale={3}
                        defaultValue={0}
                        prefix={'$'}
                        onChange={fillFormData('assets.debts.onDateOfMarriage')}
                      />

                    </td>
                    <td>
                      <NumberFormat
                        value={item.on_valuation_date}
                        className='form-control'
                        inputMode='numeric'
                        thousandSeparator={true}
                        decimalScale={3}
                        defaultValue={0}
                        prefix={'$'}
                        onChange={fillFormData('assets.debts.onDateOfMarriage')}
                      />

                    </td>
                    <td>
                      <NumberFormat
                        value={item.today}
                        className='form-control'
                        inputMode='numeric'
                        thousandSeparator={true}
                        decimalScale={3}
                        defaultValue={0}
                        prefix={'$'}
                        onChange={fillFormData('assets.debts.onDateOfMarriage')}
                      />

                    </td>
                  </tr>
                ))}
                <tr className='results'>
                  <td colSpan={3} className='paragraph fw-bold text-end'>
                    {' '}
                    23. TOTAL VALUE OF DEBTS AND OTHER LIABILITIES
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={''}
                      onChange={fillFormData('assets.debts.total1')}
                    />
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={''}
                      onChange={fillFormData('assets.debts.total2')}
                    />
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>

          {/* 6 Property, Debts and Other Liabilities on Date of Marriage */}
          <div className='row pb-20px pl-40px'>
            <p className='sub-heading'>
              Part 6: PROPERTY, DEBTS AND OTHER LIABILITIES ON DATE OF MARRIAGE
            </p>

            <p className='paragraph fst-italic'>
              Show by category the value of your property, debts and other
              liabilities, calculated as of the date of your marriage. (In this
              part, do not include the value of a matrimonial home or debts or other
              liabilities directly related to its purchase or significant
              improvement, if you and your spouse ordinarily occupied this property
              as your family residence at the time of separation.)
            </p>

            {/* Table */}
            <table className='pb-40px form-131-6 expense-table'>
              <thead>
                <tr>
                  <th rowSpan={2}>Category and Details</th>
                  <th colSpan={2}>Value on date of marriage</th>
                </tr>
                <tr>
                  <th>Assets</th>
                  <th>Liabilities</th>
                </tr>
              </thead>
              <tbody>
                <tr className='inputs'>
                  <td className='paragraph'> Land</td>
                  <td>
                    <CurrencyFormat
                      className='form-control'
                      disabled={true}
                      value={formData?.assets.property.land.assets}
                      thousandSeparator={true}
                      prefix={'$'}
                      onChange={fillFormData('assets.property.land.assets')}
                    />
                    {/* <input
                      className='form-control'
                      value={formData?.assets.property.land.assets}
                      onChange={fillFormData('assets.property.land.assets')}
                    /> */}
                  </td>
                  <td>
                    <CurrencyFormat
                      className='form-control'
                      disabled={true}
                      value={formData?.assets.property.land.liabilities}
                      thousandSeparator={true}
                      prefix={'$'}
                      onChange={fillFormData('assets.property.land.liabilities')}
                    />
                    {/* <input
                      className='form-control'
                      value={formData?.assets.property.land.liabilities}
                      onChange={fillFormData('assets.property.land.liabilities')}
                    /> */}
                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'> General Household items & vehicles</td>
                  <td>
                    <CurrencyFormat
                      className='form-control'
                      disabled={true}
                      value={formData?.assets.property.household.assets}
                      onChange={fillFormData('assets.property.household.assets')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      className='form-control'
                      disabled={true}
                      value={formData?.assets.property.household.liabilities}
                      onChange={fillFormData(
                        'assets.property.household.liabilities'
                      )}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'>
                    {' '}
                    Bank accounts, savings, securities & pensions
                  </td>
                  <td>
                    <CurrencyFormat
                      className='form-control'
                      disabled={true}
                      value={formData?.assets.property.bank.assets}
                      onChange={fillFormData('assets.property.bank.assets')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                  <td>
                    <CurrencyFormat
                      className='form-control'
                      disabled={true}
                      value={formData?.assets.property.bank.liabilities}
                      onChange={fillFormData('assets.property.bank.liabilities')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'> Life & disability insurance</td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.life.assets}
                      onChange={fillFormData('assets.property.life.assets')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.life.liabilities}
                      onChange={fillFormData('assets.property.life.liabilities')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'> Business interests</td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.interests.assets}
                      onChange={fillFormData('assets.property.interests.assets')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.interests.liabilities}
                      onChange={fillFormData(
                        'assets.property.interests.liabilities'
                      )}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'> Money owed to you</td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.moneyOwed.assets}
                      onChange={fillFormData('assets.property.moneyOwed.assets')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.moneyOwed.liabilities}
                      onChange={fillFormData(
                        'assets.property.moneyOwed.liabilities'
                      )}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'> Other property (Specify.)</td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.otherProperty.assets}
                      onChange={fillFormData(
                        'assets.property.otherProperty.assets'
                      )}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.otherProperty.liabilities}
                      onChange={fillFormData(
                        'assets.property.otherProperty.liabilities'
                      )}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='inputs'>
                  <td className='paragraph'>
                    {' '}
                    Debts and other liabilities (Specify.)
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.debts.assets}
                      onChange={fillFormData('assets.property.debts.assets')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.debts.liabilities}
                      onChange={fillFormData('assets.property.debts.liabilities')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td className='paragraph fw-bold text-end'> TOTALS</td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.total1}
                      onChange={fillFormData('assets.property.total1')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.total2}
                      onChange={fillFormData('assets.property.total2')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td className='paragraph fw-bold text-end'>
                    24. NET VALUE OF PROPERTY OWNED ON DATE OF MARRIAGE
                    <br />
                    <small>
                      <i>
                        {' '}
                        (From the total of the "Assets" column, subtract the total
                        of the "Liabilities" column.)
                      </i>
                    </small>
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.netValue1}
                      onChange={fillFormData('assets.property.netValue1')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.netValue2}
                      onChange={fillFormData('assets.property.netValue2')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td className='paragraph fw-bold text-end'>
                    24. VALUE OF ALL DEDUCTIONS
                    <small>
                      <i>
                        {' '}
                        (Add items <b>[23]</b> and <b>[24]</b>.
                      </i>
                    </small>
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.valueOfDeductions1}
                      onChange={fillFormData('assets.property.valueOfDeductions1')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.property.valueOfDeductions2}
                      onChange={fillFormData('assets.property.valueOfDeductions2')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 7 Excluded Property */}
          <div className='row pb-20px pl-40px'>
            <p className='sub-heading'>Part 7: EXCLUDED PROPERTY</p>

            <p className='paragraph fst-italic'>
              Show by category the value of property owned on the valuation date
              that is excluded from the definition of "net family property" (such as
              gifts or inheritances received after marriage).
            </p>

            {/* Table */}
            <table className='pb-40px form-131-7'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Details</th>
                  <th>Value on valuation date</th>
                </tr>
              </thead>
              <tbody>
                <tr className='inputs'>
                  <td>
                    <textarea
                      className='form-control'
                      value={formData?.assets.excluded.category}
                      onChange={fillFormData('assets.excluded.category')}
                    />
                  </td>
                  <td>
                    <textarea
                      className='form-control'
                      value={formData?.assets.excluded.details}
                      onChange={fillFormData('assets.excluded.details')}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.excluded.onValuationDate}
                      onChange={fillFormData('assets.excluded.onValuationDate')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />

                  </td>
                </tr>
                <tr className='results'>
                  <td colSpan={2} className='paragraph fw-bold text-end'>
                    {' '}
                    26. TOTAL VALUE OF EXCLUDED PROPERTY
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.excluded.total}
                      onChange={fillFormData('assets.excluded.total')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 8 Disposed-Of Property */}
          <div className='row pb-20px pl-40px'>
            <p className='sub-heading'>Part 8: DISPOSED-OF PROPERTY</p>

            <p className='paragraph fst-italic'>
              Show by category the value of all property that you disposed of during
              the two years immediately preceding the making of this statement, or
              during the marriage, whichever period is shorter.
            </p>

            {/* Table */}
            <table className='pb-40px form-131-7'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Details</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className='inputs'>
                  <td>
                    <textarea
                      className='form-control'
                      value={formData?.assets.disposed.category}
                      onChange={fillFormData('assets.disposed.category')}
                    />
                  </td>
                  <td>
                    <textarea
                      className='form-control'
                      value={formData?.assets.disposed.details}
                      onChange={fillFormData('assets.disposed.details')}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.disposed.onValuationDate}
                      onChange={fillFormData('assets.disposed.onValuationDate')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td colSpan={2} className='paragraph fw-bold text-end'>
                    {' '}
                    27. TOTAL VALUE OF DISPOSED-OF PROPERTY
                  </td>
                  <td>
                    <CurrencyFormat
                      disabled={true}
                      className='form-control'
                      value={formData?.assets.disposed.total}
                      onChange={fillFormData('assets.disposed.total')}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 9 Calculation of Net Family Property */}
          <div className='row pb-20px pl-40px'>
            <p className='sub-heading'>
              Part 9: CALCULATION OF NET FAMILY PROPERTY
            </p>

            {/* Table */}
            <table className='pb-40px form-131-9'>
              <thead>
                <tr>
                  <th></th>
                  <th>Deductions</th>
                  <th>BALANCE</th>
                </tr>
              </thead>
              <tbody>
                <tr className='results'>
                  <td className='paragraph fw-bold text-end'>
                    Value of all property owned on valuation date
                    <small>
                      <i>
                        {' '}
                        (From item <b>[22]</b> above)
                      </i>
                    </small>
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={formData?.assets.calculations.allProperty}
                      onChange={fillFormData('assets.calculations.allProperty')}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td className='paragraph fw-bold text-end'>
                    Subtract value of all deductions
                    <small>
                      <i>
                        {' '}
                        (From item <b>[25]</b> above)
                      </i>
                    </small>
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={
                        formData?.assets.calculations.subtractDeductions.deductions
                      }
                      onChange={fillFormData(
                        'assets.calculations.subtractDeductions.deductions'
                      )}
                    />
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={
                        formData?.assets.calculations.subtractDeductions.balance
                      }
                      onChange={fillFormData(
                        'assets.calculations.subtractDeductions.balance'
                      )}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td className='paragraph fw-bold text-end'>
                    Subtract total value of excluded property
                    <small>
                      <i>
                        {' '}
                        (From item <b>[26]</b> above)
                      </i>
                    </small>
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={
                        formData?.assets.calculations.subtractExcluded.deductions
                      }
                      onChange={fillFormData(
                        'assets.calculations.subtractExcluded.deductions'
                      )}
                    />
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={formData?.assets.calculations.subtractExcluded.balance}
                      onChange={fillFormData(
                        'assets.calculations.subtractExcluded.balance'
                      )}
                    />
                  </td>
                </tr>
                <tr className='results'>
                  <td colSpan={2} className='paragraph fw-bold text-end'>
                    28. NET FAMILY PROPERTY
                  </td>
                  <td>
                    <input
                      className='form-control text-end'
                      value={formData?.assets.calculations.netFamilyProperty}
                      onChange={fillFormData(
                        'assets.calculations.netFamilyProperty'
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
                  Sworn/Affirmed before me at (municipality)
                </div>
                <input
                  type='text'
                  className='form-control'
                  value={formData?.declaration?.muncipility || ''}
                  onChange={fillFormData('declaration.muncipility')}
                />
              </div>
              <div className='data-input mt-20px'>
                <div className='label'>in (province, state or country)</div>
                <input
                  type='text'
                  className='form-control'
                  value={formData?.declaration?.state || ''}
                  onChange={fillFormData('declaration.state')}
                />
              </div>
              <div className='data-input mt-20px'>
                <div className='label'>on (date)</div>
                <input
                  type='date'
                  className='form-control'
                  value={formData?.declaration?.date || ''}
                  onChange={fillFormData('declaration.date')}
                />
              </div>
              <div className='data-input flex-column mt-20px'>
                <input
                  type='text'
                  className='form-control d-block'
                  value={formData?.declaration?.sigName || ''}
                  onChange={fillFormData('declaration.sigName')}
                />
                <div className='label'>
                  Commissioner for taking affidavits (Type or print name below if
                  signature is illegible.)
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='data-input flex-column'>
                <input
                  type='text'
                  className='form-control d-block'
                  value={formData?.declaration?.signature || ''}
                  onChange={fillFormData('declaration.signature')}
                />
                <div className='label text-wrap'>
                  Signature (This form is to be signed in front of a lawyer, justice
                  of the peace, notary public or commissioner for taking
                  affidavits.)
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
                      className='form-control'
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
                      className='form-control'
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
                      className='form-control'
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
                      className='form-control'
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
                      className='form-control'
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
                      className='form-control'
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
                      className='form-control'
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
                      className='form-control'
                      value={formData?.scheduleA?.totalIncome || ''}
                      onChange={fillFormData('scheduleA.totalIncome')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Schedule B */}
          <ChildrenSpecialExpenses
            title={'Schedule B: Special or Extraordinary Expenses for the Child(ren)'}
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
                  checked={formData?.scheduleB?.amIEarn === true}
                  onChange={changeFormCheck('scheduleB.amIEarn')}
                />
                <label className='form-check-label text-nowrap' htmlFor='i_earns'>
                  I earn $
                </label>
                <div className='data-input'>
                  <input
                    type='text'
                    className='form-control'
                    value={formData?.scheduleB?.iEarn}
                    onChange={fillFormData('scheduleB.iEarn')}
                  />
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

export default FinancialStatement131
