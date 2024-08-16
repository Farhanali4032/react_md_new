import React from 'react';
import CurrencyFormat from 'react-currency-format';
import NumberFormat from 'react-number-format';

const SummaryTable = ({ formData, changeAmount, heading, info, assetType, fillFormData, totalTitle }) => {

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
            <p className='paragraph fst-italic'>{info}</p>

            <div className='col-6'>
                <table className='pb-40px form-131-5'>
                    <tbody>
                        <tr className='results'>
                            <td className='paragraph fw-bold text-center'>Total Assets</td>
                            <td>
                                <NumberFormat
                                    value={''}
                                    className='form-control'
                                    inputMode='numeric'
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    defaultValue={0}
                                    prefix={'$'}
                                    onChange={fillFormData('summary.totalAssets')}
                                />
                            </td>
                        </tr>
                        <tr className='results'>
                            <td className='paragraph fw-bold text-center'>
                                Subtract Total Debts
                            </td>
                            <td>
                                <NumberFormat
                                    value={''}
                                    className='form-control'
                                    inputMode='numeric'
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    defaultValue={0}
                                    prefix={'$'}
                                    onChange={fillFormData('summary.subtractTotalDebts')}
                                />
                            </td>
                        </tr>
                        <tr className='results'>
                            <td className='paragraph fw-bold text-center'>Net Worth</td>
                            <td>
                                <NumberFormat
                                    value={''}
                                    className='form-control'
                                    inputMode='numeric'
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    defaultValue={0}
                                    prefix={'$'}
                                    onChange={fillFormData('summary.netWorth')}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )

}



export default SummaryTable;