import React from 'react';
import CurrencyFormat from 'react-currency-format';
import NumberFormat from 'react-number-format';

const AssetsTableCombined = ({ formData, changeAmount, heading, info, assetType, fillFormData, totalTitle }) => {

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

    
    const totalMonthly = calculateSums(formData?.assets, 'today')

    return (
        <>
            <p className='sub-heading'>{heading}</p>
            <p className='paragraph fst-italic'>{info}</p>

            <table className='pb-40px form-13-assets expense-table table-col-3'>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th colSpan={2}>Details</th>
                        <th>Value or Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {formData?.assets?.land ? (
                        <>
                            {/* Real Estate */}
                            <tr>
                                <td colSpan={4}>
                                    State Address of Each Property and Nature of Ownership
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.land.length + 1}>Real Estate</td>
                            </tr>
                            {formData?.assets?.land.map((item, index) => (
                                <tr key={index}>
                                    <td className='number'>{index + 1}</td>
                                    <td>
                                        <textarea
                                            className='form-control'
                                            value={item.address}
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
                                        >{item.address} </textarea>
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
                                            onChange={changeAmount(`assets.land.${index}.today`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}


                    {formData?.assets?.household ? (
                        <>
                            {/* Real Estate */}
                            <tr>
                                <td colSpan={4}>
                                    Year and Make
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.household.length + 1}>  Cars, Boats, Vehicles</td>
                            </tr>
                            {formData?.assets?.household.map((item, index) => (
                                <tr>
                                    <td className='number'>{index + 1}</td>
                                    <td>
                                        <input
                                            className='form-control'
                                            value={item.item}
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
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
                                            onChange={changeAmount(`assets.household.${index}.today`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {formData?.assets?.life ? (
                        <>
                            {/* Real Estate */}
                            <tr>
                                <td colSpan={3}>Type - Beneficiary - Face Amount</td>
                                <td>Cash Surrender Value</td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.life.length + 1}>  Life Insurance</td>
                            </tr>
                            {formData?.assets?.life.map((item, index) => (
                                <tr>
                                    <td className='number'>{index + 1}</td>
                                    <td className='details'>
                                        <input
                                            className='form-control details'
                                            value={
                                                'Life Insurance' +
                                                ' - ' +
                                                item.beneficiary +
                                                ' - ' +
                                                item.today
                                            }
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
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
                                            onChange={changeAmount(`assets.life.${index}.today`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {formData?.assets?.interests ? (
                        <>
                            {/* Real Estate */}
                            <tr>
                                <td colSpan={4}>Name and Address of Business</td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.interests.length + 1}>
                                    Interest in Business <br />
                                    <small>
                                        <i>
                                            (*attach separate year-end statements for each business)
                                        </i>
                                    </small>
                                </td>
                            </tr>
                            {formData?.assets?.interests.map((item, index) => (
                                <tr>
                                    <td className='number'>{index + 1}</td>
                                    <td className='details'>
                                        <input
                                            className='form-control details'
                                            value={item.firm_name}
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
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
                                            onChange={changeAmount(`assets.interests.${index}.today`)}
                                        />

                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {formData?.assets?.moneyOwed ? (
                        <>
                            {/* Real Estate */}
                            <tr>
                                <td colSpan={4}>Name and Address of Debtors</td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.moneyOwed.length + 1}>
                                    Money Owed to You
                                    <br />
                                    <small>
                                        <i>
                                            (for example, any court judgments in your favour, estate
                                            money and income tax refunds)
                                        </i>
                                    </small>
                                </td>
                            </tr>
                            {formData?.assets?.moneyOwed.map((item, index) => (
                                <tr>
                                    <td className='number'>{index + 1}</td>
                                    <td className='details'>
                                        <input
                                            className='form-control details'
                                            value={item.details}
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
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
                                            onChange={changeAmount(`assets.moneyOwed.${index}.today`)}
                                        />

                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {formData?.assets?.otherProperty ? (
                        <>
                            {/* Real Estate */}
                            <tr>
                                <td colSpan={4}>Description</td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.otherProperty.length + 1}>
                                    Other Assets
                                </td>
                            </tr>
                            {formData?.assets?.otherProperty.map((item, index) => (
                                <tr>
                                    <td className='number'>{index + 1}</td>
                                    <td className='details'>
                                        <input
                                            className='form-control details'
                                            value={item.details}
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
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
                                            onChange={changeAmount(`assets.otherProperty.${index}.today`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {formData?.assets?.bank ? (
                        <>
                            <tr>
                                <td colSpan={4}>Description</td>
                            </tr>
                            <tr>
                                <td rowSpan={formData?.assets?.bank.length + 1}>
                                    Bank accounts, savings, securities, pension
                                </td>
                            </tr>
                            {formData?.assets?.bank.map((item, index) => (
                                <tr>
                                    <td className='number'>{index + 1}</td>
                                    <td className='details'>
                                        <input
                                            className='form-control details'
                                            value={item.category}
                                            onChange={fillFormData(
                                                'assets.realEstate.property2.details'
                                            )}
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
                                            onChange={changeAmount(`assets.bank.${index}.today`)}
                                        />

                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    <tr>
                        <td colSpan={3} className='text-end fw-bold'>
                            Total Value of All Property
                        </td>
                        <td>
                            <CurrencyFormat
                                className='form-control'
                                name="onDateOfMarriage"
                                value={calculateSums(formData?.assets, 'today')}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    )

}



export default AssetsTableCombined;