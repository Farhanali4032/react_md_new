import React from 'react';
import CurrencyFormat from 'react-currency-format';

const IncomeSource = ({ formData, changeAmount, filler }) => {

    const sources = [
        { id: 'employmentIncome', name: 'employmentIncome', value: formData?.income?.[filler].employmentIncome || 0, label: 'Employment income (before deductions)', update: `income.${filler}.employmentIncome` },
        { id: 'commissionTipsBonuses', name: 'commissionTipsBonuses', value: formData?.income?.[filler].commissionTipsBonuses  || 0, label: 'Commission, tips and bonuses', update: `income.${filler}.commissionTipsBonuses` },
        { id: 'selfEmploymentIncome', name: 'selfEmploymentIncome', value: formData?.income?.[filler].selfEmploymentIncome  || 0, label: 'Self-employment income (Monthly amount before expenses: $)', update: `income.${filler}.selfEmploymentIncome`},
        { id: 'employmentInsuranceBenefits', name: 'employmentInsuranceBenefits', value: formData?.income?.[filler].employmentInsuranceBenefits  || 0, label: 'Employment Insurance benefits', update: `income.${filler}.employmentInsuranceBenefits`},
        { id: 'workersCompensationBenefits', name: 'workersCompensationBenefits', value: formData?.income?.[filler].workersCompensationBenefits  || 0, label: 'Workers compensation benefits', update: `income.${filler}.workersCompensationBenefits`},
        { id: 'socialAssistanceIncome', name: 'socialAssistanceIncome', value: formData?.income?.[filler].socialAssistanceIncome  || 0, label: 'Social assistance income (including ODSP payments)', update: `income.${filler}.socialAssistanceIncome`},
        { id: 'interestInvestmentIncome', name: 'interestInvestmentIncome', value: formData?.income?.[filler].interestInvestmentIncome  || 0, label: 'Interest and investment income', update: `income.${filler}.interestInvestmentIncome`},
        { id: 'pensionIncome', name: 'pensionIncome', value: formData?.income?.[filler].pensionIncome  || 0, label: ' Pension income (including CPP and OAS)', update: `income.${filler}.pensionIncome`},
        { id: 'spousalSupport', name: 'spousalSupport', value: formData?.income?.[filler].spousalSupport  || 0, label: 'Spousal support received from a former spouse/partner', update: `income.${filler}.spousalSupport`},
        { id: 'childTaxBenefits', name: 'childTaxBenefits', value: formData?.income?.[filler].childTaxBenefits  || 0, label: 'Child Tax Benefits or Tax Rebates (e.g. GST)', update: `income.${filler}.childTaxBenefits`},
        { id: 'otherIncome', name: 'otherIncome', value: formData?.income?.[filler].otherIncome  || 0, label: 'Other sources of income (e.g. RRSP withdrawals, capital gains) (*attach Schedule A and divide annual amount by 12)', update: `income.${filler}.otherIncome`},
    ];

    const total = sources.reduce((sum, item) => {
        if (item && item.value !== undefined && item.value !== null) {
            const cleanedValue = item.value.toString().replace(/,/g, ''); // Remove commas
            const numericValue = parseFloat(cleanedValue) || 0; // Convert to number
            return sum + numericValue;
        }
        return sum;
    }, 0);

    const TotalAnnualIncome = total * 12;

    return (
        <>
            <p className='paragraph fst-italic'>
                (In this table you must show all of the income that you are currently
                receiving whether taxable or not.)
            </p>
            <table className='pb-40px form-131-income expense-table'>
                <thead>
                    <tr>
                        <th className='text-center col-lg-9'>Income Source</th>
                        <th className='text-center col-lg-3'>Amount Received/Month</th>
                    </tr>
                </thead>
                <tbody>
                    {sources.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <span className='number'>{index + 1}.</span>
                                <span className='paragraph'>
                                    {item.label}
                                </span>
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control'
                                    value={item.value || 0}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                    }}
                                    onChange={changeAmount(`${item.update}`)}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <span className='number'>12.</span>
                            <span className='paragraph fw-bold'>
                                Total monthly income from all sources:
                            </span>
                        </td>
                        <td>
                            <CurrencyFormat
                                className='form-control'
                                disabled={true}
                                value={total}
                                thousandSeparator={true}
                                prefix={'$'}
                                onValueChange={(values) => {
                                    const { formattedValue, value } = values;
                                }}

                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className='number'>13.</span>
                            <span className='paragraph fw-bold'>
                                Total monthly income X 12 = Total annual income:
                            </span>
                        </td>
                        <td>
                            <CurrencyFormat
                                className='form-control'
                                disabled={true}
                                value={TotalAnnualIncome}
                                thousandSeparator={true}
                                prefix={'$'}
                                onValueChange={(values) => {
                                    const { formattedValue, value } = values;
                                }}

                            />
                        </td>
                    </tr>

                </tbody>
            </table>
        </>
    );
};

export default IncomeSource;
