import React from 'react';
import CurrencyFormat from 'react-currency-format';
import NumberFormat from 'react-number-format';

const DebtsTable = ({ formData, changeAmount, heading, info, assetType, fillFormData, totalTitle }) => {

    // Function to parse and sum values
    const parseAndSumValues = (items, field) => {
        let sum = 0;
        items.forEach(item => {
            if (item[field]) {
                sum += parseFloat(item[field].replace(/,/g, '')) || 0;
            }
        });
        return sum;
    };

    // Function to handle both arrays and objects
    const calculateSums = (data, field) => {
        let totalSum = 0;

        if (data) {
            Object.keys(data).forEach(key => {
                const value = data[key];
                if (value) {
                    if (Array.isArray(value)) {
                        totalSum += parseAndSumValues(value, field);
                    } else if (typeof value === 'object' && value !== null) {
                        totalSum += parseAndSumValues(Object.values(value), field);
                    }
                } else {
                    console.warn(`Skipping undefined or null value for key: ${key}`);
                }
            });
        }
        return totalSum;
    };

    return (
        <>
            <p className='sub-heading'>{heading}</p>
            <p className='paragraph fst-italic'>
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
            </p>

            <table className='pb-40px form-13-debts'>
                <thead>
                    <tr>
                        <th>Type of Debt</th>
                        <th>
                            Creditor{' '}
                            <small>
                                <i>(name and address)</i>
                            </small>
                        </th>
                        <th>Full Amount Now Owing</th>
                        <th>Monthly Payments</th>
                        <th>Are Payments Being Made?</th>
                    </tr>
                </thead>
                <tbody>
                    {formData?.debts ? (
                        <>
                            {Array.isArray(formData?.debts?.mortgages) && formData.debts.mortgages.length > 0 && (

                                <tr>
                                    <td rowSpan={formData?.debts?.mortgages.length + 1}>
                                        Mortgages
                                    </td>
                                </tr>
                            )}
                            {formData?.debts?.mortgages?.map((item, index) => (
                                <>
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className='form-control'
                                                value={item.details}
                                                onChange={changeAmount(`debts.mortgages.${index}.details`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="onDateOfMarriage"
                                                value={item.today || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.mortgages.${index}.today`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="monthly_payments"
                                                value={item.monthly_payments || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.mortgages.${index}.monthly_payments`)}
                                            />
                                        </td>
                                        <td>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_mortgages`}
                                                    value='yes'
                                                    id={`paymentsMadeYes`}
                                                    checked={item.paymentsMade === 'yes'}
                                                    onChange={changeAmount(`debts.mortgages.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeYes`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_mortgages`}
                                                    value='no'
                                                    id={`paymentsMadeNo`}
                                                    checked={item.paymentsMade === 'no'}
                                                    onChange={changeAmount(`debts.mortgages.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeNo`}>
                                                    No
                                                </label>
                                            </div>
                                        </td>
                                    </tr>

                                </>
                            ))}

                            {formData?.debts?.lineofcredits && (
                                <tr>
                                    <td rowSpan={formData?.debts?.lineofcredits.length + 1}>
                                        Line of Credit
                                    </td>
                                </tr>
                            )}

                            {formData?.debts?.lineofcredits?.map((item, index) => (
                                <>
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className='form-control'
                                                value={item.details}
                                                onChange={changeAmount(`debts.lineofcredits.${index}.details`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="onDateOfMarriage"
                                                value={item.today || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.lineofcredits.${index}.today`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="monthly_payments"
                                                value={item.monthly_payments || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.lineofcredits.${index}.monthly_payments`)}
                                            />
                                        </td>
                                        <td>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_lineofcredits`}
                                                    value='yes'
                                                    id={`paymentsMadeYes`}
                                                    checked={item.paymentsMade === 'yes'}
                                                    onChange={changeAmount(`debts.lineofcredits.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeYes`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_lineofcredits`}
                                                    value='no'
                                                    id={`paymentsMadeNo`}
                                                    checked={item.paymentsMade === 'no'}
                                                    onChange={changeAmount(`debts.lineofcredits.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeNo`}>
                                                    No
                                                </label>
                                            </div>
                                        </td>
                                    </tr>

                                </>
                            ))}

                            {formData?.debts?.otherloans && (
                                <tr>
                                    <td rowSpan={formData?.debts?.otherloans.length + 1}>
                                        Other Loans
                                    </td>
                                </tr>
                            )}

                            {formData?.debts?.otherloans?.map((item, index) => (
                                <>
                                     <tr key={index}>
                                        <td>
                                            <input
                                                className='form-control'
                                                value={item.details}
                                                onChange={changeAmount(`debts.otherloans.${index}.details`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="onDateOfMarriage"
                                                value={item.today || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.otherloans.${index}.today`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="monthly_payments"
                                                value={item.monthly_payments || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.otherloans.${index}.monthly_payments`)}
                                            />
                                        </td>
                                        <td>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_otherloans`}
                                                    value='yes'
                                                    id={`paymentsMadeYes`}
                                                    checked={item.paymentsMade === 'yes'}
                                                    onChange={changeAmount(`debts.otherloans.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeYes`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_otherloans`}
                                                    value='no'
                                                    id={`paymentsMadeNo`}
                                                    checked={item.paymentsMade === 'no'}
                                                    onChange={changeAmount(`debts.otherloans.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeNo`}>
                                                    No
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}

                            {formData?.debts?.unpaidsupportamounts && (
                                <tr>
                                    <td rowSpan={formData?.debts?.unpaidsupportamounts.length + 1}>
                                        Unpaid Support Amounts
                                    </td>
                                </tr>
                            )}

                            {formData?.debts?.unpaidsupportamounts?.map((item, index) => (
                                <>
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className='form-control'
                                                value={item.details}
                                                onChange={changeAmount(`debts.unpaidsupportamounts.${index}.details`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="onDateOfMarriage"
                                                value={item.today || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.unpaidsupportamounts.${index}.today`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="monthly_payments"
                                                value={item.monthly_payments || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.unpaidsupportamounts.${index}.monthly_payments`)}
                                            />
                                        </td>
                                        <td>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_unpaidsupportamounts`}
                                                    value='yes'
                                                    id={`paymentsMadeYes`}
                                                    checked={item.paymentsMade === 'yes'}
                                                    onChange={changeAmount(`debts.unpaidsupportamounts.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeYes`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_unpaidsupportamounts`}
                                                    value='no'
                                                    id={`paymentsMadeNo`}
                                                    checked={item.paymentsMade === 'no'}
                                                    onChange={changeAmount(`debts.unpaidsupportamounts.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeNo`}>
                                                    No
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}

                            {formData?.debts?.otherdebts && (
                                <tr>
                                    <td rowSpan={formData?.debts?.otherdebts.length + 1}>
                                        Other Debts
                                    </td>
                                </tr>
                            )}

                            {formData?.debts?.otherdebts?.map((item, index) => (
                                <>
                                     <tr key={index}>
                                        <td>
                                            <input
                                                className='form-control'
                                                value={item.details}
                                                onChange={changeAmount(`debts.otherdebts.${index}.details`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="onDateOfMarriage"
                                                value={item.today || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.otherdebts.${index}.today`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="monthly_payments"
                                                value={item.monthly_payments || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.otherdebts.${index}.monthly_payments`)}
                                            />
                                        </td>
                                        <td>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_otherdebts`}
                                                    value='yes'
                                                    id={`paymentsMadeYes`}
                                                    checked={item.paymentsMade === 'yes'}
                                                    onChange={changeAmount(`debts.otherdebts.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeYes`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_otherdebts`}
                                                    value='no'
                                                    id={`paymentsMadeNo`}
                                                    checked={item.paymentsMade === 'no'}
                                                    onChange={changeAmount(`debts.otherdebts.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeNo`}>
                                                    No
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}

                            {formData?.debts?.outstandingcreditcardbalances && (
                                <tr>
                                    <td rowSpan={formData?.debts?.outstandingcreditcardbalances.length + 1}>
                                        Outstanding Credit Card Balances
                                    </td>
                                </tr>
                            )}

                            {formData?.debts?.outstandingcreditcardbalances?.map((item, index) => (
                                <>
                                     <tr key={index}>
                                        <td>
                                            <input
                                                className='form-control'
                                                value={item.details}
                                                onChange={changeAmount(`debts.outstandingcreditcardbalances.${index}.details`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="onDateOfMarriage"
                                                value={item.today || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.outstandingcreditcardbalances.${index}.today`)}
                                            />
                                        </td>
                                        <td>
                                            <CurrencyFormat
                                                className='form-control'
                                                name="monthly_payments"
                                                value={item.monthly_payments || 0}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                }}
                                                onChange={changeAmount(`debts.outstandingcreditcardbalances.${index}.monthly_payments`)}
                                            />
                                        </td>
                                        <td>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_outstandingcreditcardbalances`}
                                                    value='yes'
                                                    id={`paymentsMadeYes`}
                                                    checked={item.paymentsMade === 'yes'}
                                                    onChange={changeAmount(`debts.outstandingcreditcardbalances.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeYes`}>
                                                    Yes
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name={`paymentsMade_${index}_outstandingcreditcardbalances`}
                                                    value='no'
                                                    id={`paymentsMadeNo`}
                                                    checked={item.paymentsMade === 'no'}
                                                    onChange={changeAmount(`debts.outstandingcreditcardbalances.${index}.paymentsMade`)}
                                                />
                                                <label className='form-check-label' htmlFor={`paymentsMadeNo`}>
                                                    No
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))}

                            <tr>
                                <td colSpan={2} className='text-end fw-bold'>
                                    Total Value of All Property
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        name="onDateOfMarriage"
                                        disabled
                                        value={calculateSums(formData?.debts, 'today')}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        name="onDateOfMarriage"
                                        disabled
                                        value={calculateSums(formData?.debts, 'monthly_payments')}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                    />
                                </td>
                            </tr>
                        </>
                    ) : (
                        <>
                            <tr>
                                <td rowSpan={3}>Mortgages, Lines of Credits or other Loans from a Bank, Trust or Finance Company</td>
                                <td><input className="form-control" value={''}
                                    onChange={fillFormData('debts.mortgage.m1.creditor')} /></td>
                                <td><input className="form-control" value={''}
                                    onChange={fillFormData('debts.mortgage.m1.fullAmount')} /></td>
                                <td><input className="form-control" value={''}
                                    onChange={fillFormData('debts.mortgage.m1.monthlyPayments')} /></td>
                                <td>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="paymentsMade11" value="yes" id="paymentsMadeYes11"
                                            checked={''}
                                            onChange={fillFormData('debts.mortgage.m1.arePayementsMade')}
                                        />
                                        <label className="form-check-label" htmlFor="paymentsMadeYes11">Yes</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="paymentsMade11" value="no" id="paymentsMadeNo11"
                                            checked={''}
                                            onChange={fillFormData('debts.mortgage.m1.arePayementsMade')}
                                        />
                                        <label className="form-check-label" htmlFor="paymentsMadeNo11">No</label>
                                    </div>
                                </td>
                            </tr>
                        </>)}
                </tbody>
            </table>

        </>
    )

}



export default DebtsTable;