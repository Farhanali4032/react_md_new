import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { CalcualteAnnualIncome } from '../../../../utils/Apis/matters/CustomHook/CalculateTotals';

const IncomeDeclaration = ({ formData, changeAmount, fillFormData, filler, changeFormCheck }) => {

    const AnnualIncome = CalcualteAnnualIncome(formData, filler)

    return (
        <>
            <li>
                <p className='paragrap'>I am currently</p>

                <div className='row gap-4 pb-10px'>
                    <div className='d-flex flex-row'>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='employment'
                                value='employed'
                                id='employed_by'
                                checked={formData?.employmentStatus?.[filler]?.employmentStatus === 'employed'}
                                onChange={fillFormData(`employmentStatus.${filler}.employmentStatus`)}
                            />
                            <label
                                className='form-check-label text-nowrap'
                                htmlFor='employed'
                            >
                                employed by (name and address of employer)
                            </label>
                        </div>
                        <div className='data-input w-100'>
                            <input
                                type='text'
                                className='custom-input-control'
                                value={formData?.employmentStatus?.[filler]?.employerName}
                                onChange={fillFormData(`employmentStatus.${filler}.employerName`)}
                            />
                        </div>
                    </div>

                    <div className='d-flex flex-row'>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='employment'
                                value='self_employed'
                                id='self_employed'
                                checked={
                                    formData?.employmentStatus?.[filler]?.employmentStatus === 'self_employed'
                                }
                                onChange={fillFormData(`employmentStatus.${filler}.employmentStatus`)}
                            />
                            <label
                                className='form-check-label text-nowrap'
                                htmlFor='self_employed'
                            >
                                self-employed, carrying on business under the name of (name
                                and address of business)
                            </label>
                        </div>
                        <div className='data-input w-100'>
                            <input
                                type='text'
                                className='custom-input-control'
                                value={formData?.employmentStatus[filler]?.businessName}
                                onChange={fillFormData(`employmentStatus.${filler}.businessName`)}
                            />
                        </div>
                    </div>

                    <div className='d-flex flex-row'>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='employment'
                                value='unemployed'
                                id='unemployed'
                                checked={formData?.employmentStatus?.[filler]?.employmentStatus === 'unemployed'}
                                onChange={fillFormData(`employmentStatus.${filler}.employmentStatus`)}
                            />
                            <label
                                className='form-check-label text-nowrap'
                                htmlFor='unemployed'
                            >
                                unemployed since (date when last employed)
                            </label>
                        </div>
                        <div className='data-input w-100'>
                            <input
                                type='text'
                                className='custom-input-control'
                                value={formData?.unemployedDate}
                                onChange={fillFormData(`employmentStatus.${filler}.lastEmployed`)}
                            />
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <p className='paragrap'>
                    I attach proof of my year-to-date income from all sources,
                    including my most recent (attach all that are applicable):
                </p>

                <div className='row gap-4 pb-10px'>
                    <div className='d-flex flex-row flex-wrap gap-4 pb-10px'>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='payChequeStub'
                                value={formData?.income?.attachments?.payChequeStub}
                                id='pay_cheque_stub'
                                checked={formData?.income?.attachments?.payChequeStub}
                                onChange={changeFormCheck('income.attachments.payChequeStub')}
                            />
                            <label className='form-check-label' htmlFor='pay_cheque_stub'>
                                pay cheque stub
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='social_assistance_stub'
                                value={true}
                                id='social_assistance_stub'
                                checked={
                                    formData?.income?.attachments?.socialAssistanceStub === true || ''
                                }
                                onChange={changeFormCheck(
                                    'income.attachments.socialAssistanceStub'
                                )}
                            />
                            <label
                                className='form-check-label'
                                htmlFor='social_assistance_stub'
                            >
                                social assistance stub
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='attachements[]'
                                value='pension_stub'
                                id='pension_stub'
                                checked={formData?.income?.attachments?.pensionStub === true || ''}
                                onChange={changeFormCheck(`income.attachments.pensionStub`)}
                            />
                            <label className='form-check-label' htmlFor='pension_stub'>
                                pension stub
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='attachements[]'
                                value='workers_compensation_stub'
                                id='workers_compensation_stub'
                                checked={
                                    formData?.income?.attachments?.workersCompensationStub ===
                                    true || ''
                                }
                                onChange={changeFormCheck(
                                    'income.attachments.workersCompensationStub'
                                )}
                            />
                            <label
                                className='form-check-label'
                                htmlFor='workers_compensation_stub'
                            >
                                workers' compensation stub
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='attachements[]'
                                value='employment_insurance_stub'
                                id='employment_insurance_stub'
                                checked={
                                    formData?.income?.attachments?.employmentInsuranceStub ===
                                    true || ''
                                }
                                onChange={changeFormCheck(
                                    'income.attachments.employmentInsuranceStub'
                                )}
                            />
                            <label
                                className='form-check-label'
                                htmlFor='employment_insurance_stub'
                            >
                                employment insurance stub and last Record of Employment
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='attachements[]'
                                value='statement_of_income'
                                id='statement_of_income'
                                checked={
                                    formData?.income?.attachments?.statementOfIncome === true || ''
                                }
                                onChange={changeFormCheck(
                                    'income.attachments.statementOfIncome'
                                )}
                            />
                            <label
                                className='form-check-label'
                                htmlFor='statement_of_income'
                            >
                                statement of income and expenses/ professional activities
                                (for self-employed individuals)
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                name='attachements[]'
                                value='other'
                                id='other'
                                checked={formData?.income?.attachments?.other === true || ''}
                                onChange={changeFormCheck(`income.attachments.other`)}
                            />
                            <label className='form-check-label' htmlFor='other'>
                                other (e.g. a letter from your employer confirming all
                                income received to date this year)
                            </label>
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div className='data-input'>
                    <div className='label'>
                        Last year, my gross income from all sources was $
                    </div>
                    <CurrencyFormat
                        className='custom-input-control'
                        disabled={false}
                        value={AnnualIncome.TotalAnnualIncome}
                        thousandSeparator={true}
                        onChange={fillFormData(`income.lastYearGrossIncome`)}
                    />
                    {/* <input
                        type='text'
                        className='custom-input-control'
                        value={AnnualIncome.TotalAnnualIncome}
                        onChange={fillFormData(`income.lastYearGrossIncome`)}
                    /> */}
                    <p className='paragraph w-100'>
                        (do not suibsract any taxes that have been deducted from this
                        income).
                    </p>
                </div>
            </li>

            <li>
                <div className='row gap-4 pb-10px'>
                    <div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='attachementsAcknowledgment'
                                value='yes'
                                id='attaching'
                                checked={
                                    formData?.income.attachementsAcknowledgment === 'yes' || ''
                                }
                                onChange={fillFormData(`income.attachementsAcknowledgment`)}
                            />
                            <label className='form-check-label' htmlFor='attaching'>
                                I am attaching all of the following required documents to
                                this financial statement as proof of my income over the past
                                three years, if they have not already been provided:
                            </label>
                            <ul>
                                <li>
                                    a copy of my personal income tax returns for each of the
                                    past three taxation years, including any materials that
                                    were filed with the returns. (Income tax returns must be
                                    served but should NOT be filed in the continuing record,
                                    unless they are filed with a motion to refrain a driver's
                                    license suspension.)
                                </li>
                                <li>
                                    a copy of my notices of assessment and any notices of
                                    reassessment for each of the past three taxation years
                                </li>
                                <li>
                                    where my notices of assessment and reassessment are
                                    unavailable for any of the past three taxation years or
                                    where I have not filed a retum for any of the past three
                                    taxation years, an Income and Deductions printout from the
                                    Canada Revenue Agency for each of those years, whether or
                                    not I filed an income tax retum.
                                    <br />
                                    <i>
                                        Note: An Income and Deductions printout is available
                                        from Canada Revenue Agency. Please call customer service
                                        at 1-800-959-8281.
                                    </i>
                                </li>
                            </ul>
                        </div>
                        <div className='fw-bold'>OR</div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='attachementsAcknowledgment'
                                value='indian'
                                id='indian'
                                checked={
                                    formData?.income.attachementsAcknowledgment === 'indian' || ''
                                }
                                onChange={fillFormData(`income.attachementsAcknowledgment`)}
                            />
                            <label className='form-check-label' htmlFor='indian'>
                                I am an Indian within the meaning of the Indian Act (Canada)
                                and I have chosen not to file income tax returns for the
                                past three years. I am attaching the following proof of
                                income for the last three years (list documents you have
                                provided):
                            </label>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default IncomeDeclaration;
