import React from 'react';
import CurrencyFormat from 'react-currency-format';

const AssetsTable = ({ formData, changeAmount, heading, info, assetType, fillFormData, totalTitle }) => {

    const sumOnValuationDate = formData?.reduce((acc, item) => {
        const numericValue = parseFloat(item.onValuationDate.replace(/,/g, '')) || 0;
        return acc + numericValue;
    }, 0);

    const sumToday = formData?.reduce((acc, item) => {
        const numericValue = parseFloat(item.today.replace(/,/g, '')) || 0;
        return acc + numericValue;
    }, 0);



    const land = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>
                                Nature & Type of Ownership{' '}
                                <small>(Give your percentage interest where relevant.)</small>
                            </th>
                            <th rowSpan={2}>Address of Property</th>
                            <th colSpan={3}>Estimated Market Value of YOUR Interest ($)</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr key={index} className='inputs'>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.ownership}
                                        onChange={fillFormData(`assets.${assetType}.${index}.ownership`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.address}
                                        onChange={fillFormData(`assets.${assetType}.${index}.address`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        name="onDateOfMarriage"
                                        value={item.onDateOfMarriage || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    // onChange={(e) => changeAmount(e, index)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        value={item.onValuationDate || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        value={item.today}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.today`)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={3} className='paragraph fw-bold text-end'>
                                {' '}
                                {totalTitle}
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
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

    const bank = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Category</th>
                            <th rowSpan={2}>
                                INSTITUTION <small>(including location)</small>|
                                <br />
                                Description <small>(including issuer and date)</small>
                            </th>
                            <th rowSpan={2}>Account number</th>
                            <th colSpan={3}>Amount/Estimated Market Value</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr key={index} className='inputs'>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.category}
                                        onChange={fillFormData(`assets.${assetType}.${index}.category`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.institution + ' - ' + item.description_bassp}
                                        onChange={fillFormData(`assets.${assetType}.${index}.institution`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.account_number}
                                        onChange={fillFormData(`assets.${assetType}.${index}.account_number`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        name="onDateOfMarriage"
                                        value={item.onDateOfMarriage || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        value={item.onValuationDate || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        value={item.today}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.today`)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={4} className='paragraph fw-bold text-end'>
                                {' '}
                                {totalTitle}
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
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

    const household = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Item</th>
                            <th rowSpan={2}>Description</th>
                            <th rowSpan={2}>Indicate if NOT in your possession</th>
                            <th colSpan={3}>Estimated Market Value of YOUR Intrerest</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr className='inputs'>
                                <td>
                                    <p className='paragraph text-start'>
                                        <textarea
                                            className='form-control'
                                            value={item.item}
                                            onChange={fillFormData(
                                                'item.description'
                                            )}
                                        />
                                    </p>
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.description}
                                        onChange={fillFormData(
                                            'item.description'
                                        )}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.isInPossession}
                                        onChange={fillFormData(
                                            'item.indication'
                                        )}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        value={item.onDateOfMarriage}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        value={item.onValuationDate}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                       className='form-control text-end'
                                        value={item.today}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.today`)}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={4} className='paragraph fw-bold text-end'>
                                {' '}
                                {totalTitle}
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
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

    const life = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Company, Type & Policy No.</th>
                            <th rowSpan={2}>Owner</th>
                            <th rowSpan={2}>Beneficiary</th>
                            <th rowSpan={2}>Face Amount</th>
                            <th colSpan={3}>Cash Surrender Value</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr className='inputs'>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.policy_no}
                                        onChange={fillFormData(`assets.${assetType}.${index}.policy_no`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.owner}
                                        onChange={fillFormData(`assets.${assetType}.${index}.owner`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.beneficiary}
                                        onChange={fillFormData(`assets.${assetType}.${index}.beneficiary`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        name="face_amount"
                                        value={item.face_amount || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.face_amount`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onDateOfMarriage"
                                        value={item.onDateOfMarriage || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onValuationDate"
                                        value={item.onValuationDate || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="today"
                                        value={item.today || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onVatodayuationDate`)}
                                    />

                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={5} className='paragraph fw-bold text-end'>
                                {' '}
                                18. TOTAL VALUE OF LIFE AND DISABILITY INSURANCE
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
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

    const interests = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Name of Firm or Company</th>
                            <th rowSpan={2}>Interest</th>
                            <th colSpan={3}>Estimated Market Value of YOUR Interest</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr className='inputs'>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.firm_name}
                                        onChange={fillFormData(`assets.${assetType}.${index}.company`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.interest}
                                        onChange={fillFormData(`assets.${assetType}.${index}.interest`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onDateOfMarriage"
                                        value={item.onDateOfMarriage || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onValuationDate"
                                        value={item.onValuationDate || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="today"
                                        value={item.today || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onVatodayuationDate`)}
                                    />

                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={3} className='paragraph fw-bold text-end'>
                                {' '}
                                19. TOTAL VALUE OF BUSINESS INTERESTS
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
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

    const moneyOwed = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Details</th>
                            <th colSpan={3}>Amount Owed to You</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr className='inputs'>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.details}
                                        onChange={fillFormData(`assets.${assetType}.${index}.details`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onDateOfMarriage"
                                        value={item.onDateOfMarriage || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onValuationDate"
                                        value={item.onValuationDate || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="today"
                                        value={item.today || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onVatodayuationDate`)}
                                    />

                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={2} className='paragraph fw-bold text-end'>
                                {' '}
                                20. TOTAL VALUE OF MONEY OWED TO YOU
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />

                            </td>
                        </tr>
                    </tbody>
                </table>
            </>)
    }

    const otherProperty = () => {
        return (
            <>
                <table className='pb-40px form-131-4a expense-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Category</th>
                            <th rowSpan={2}>Details</th>
                            <th colSpan={3}>Estimated Market Value of YOUR Interest</th>
                        </tr>
                        <tr>
                            <th>on date of marriage</th>
                            <th>on valuation date</th>
                            <th>today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => (
                            <tr className='inputs'>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.category}
                                        onChange={fillFormData(`assets.${assetType}.${index}.category`)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={item.details}
                                        onChange={fillFormData(`assets.${assetType}.${index}.details`)}
                                    />
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onDateOfMarriage"
                                        value={item.onDateOfMarriage || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onDateOfMarriage`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="onValuationDate"
                                        value={item.onValuationDate || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onValuationDate`)}
                                    />

                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control text-end'
                                        name="today"
                                        value={item.today || 0}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                        }}
                                        onChange={changeAmount(`assets.${assetType}.${index}.onVatodayuationDate`)}
                                    />

                                </td>
                            </tr>
                        ))}
                        <tr className='results'>
                            <td colSpan={3} className='paragraph fw-bold text-end'>
                                {' '}
                                21. TOTAL VALUE OF OTHER PROPERTY
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumOnValuationDate}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={sumToday}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />

                            </td>
                        </tr>
                        <tr className='results'>
                            <td colSpan={3} className='paragraph fw-bold text-end'>
                                22. VALUE OF ALL PROPERTY OWNED ON THE VALUATION DATE
                                <small>
                                    <i>
                                        {' '}
                                        (Add items <b>[15]</b> to <b>[21] </b>
                                    </i>
                                    )
                                </small>
                            </td>
                            <td>
                                <CurrencyFormat
                                    className='form-control text-end'
                                    value={0}
                                    disabled={true}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                            </td>
                            <td>
                                <input
                                    className='form-control text-end'
                                    value={''}
                                    onChange={fillFormData('assets.otherProperty.totalOwned2')}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <>
            <p className='sub-heading'>{heading}</p>
            <p className='paragraph fst-italic'>{info}</p>

            {assetType === 'land' && (
                land()
            )}

            {assetType === 'household' && (
                household()
            )}

            {assetType === 'bank' && (
                bank()
            )}

            {assetType === 'life' && (
                life()
            )}
            {assetType === 'interests' && (
                interests()
            )}
            {assetType === 'moneyOwed' && (
                moneyOwed()
            )}
            {assetType === 'otherProperty' && (
                otherProperty()
            )}

        </>
    )

}



export default AssetsTable;