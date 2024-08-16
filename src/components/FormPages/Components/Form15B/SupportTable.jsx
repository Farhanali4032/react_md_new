import React from 'react'
import CurrencyFormat from 'react-currency-format';

const SupportTable = ({ formData, onChange, handleChildrenDataChange }) => {
    return (
        <>
            <table className='pb-40px form-8a-children mt-3'>
                <thead>
                    <tr>
                        <th style={{ minWidth: "150px" }}>Child Support owned to recipients</th>
                        <th style={{ minWidth: "150px" }}>Child Support owned to any assignee(s)</th>
                        <th style={{ minWidth: "150px" }}>Spousal Support owned to recipients</th>
                        <th style={{ minWidth: "150px" }}>Spousal Support owned to any assignee(s)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <CurrencyFormat
                                className='form-control'
                                disabled={false}
                                value={formData?.item15?.child_owned_to_recipients}
                                thousandSeparator={true}
                                prefix={'$'}
                                onChange={onChange('item15.child_owned_to_recipients')}
                            />
                        </td>
                        <td>
                            <CurrencyFormat
                                className='form-control'
                                disabled={false}
                                value={formData?.item15?.child_owned_to_any_assignee}
                                thousandSeparator={true}
                                prefix={'$'}
                                onChange={onChange('item15.child_owned_to_any_assignee')}
                            />

                        </td>
                        <td>
                            <CurrencyFormat
                                className='form-control'
                                disabled={false}
                                value={formData?.item15?.spousal_owned_to_recipients}
                                thousandSeparator={true}
                                prefix={'$'}
                                onChange={onChange('item15.spousal_owned_to_recipients')}
                            />
                        </td>
                        <td>
                        <CurrencyFormat
                                className='form-control'
                                disabled={false}
                                value={formData?.item15?.spousal_owned_to_any_assignee}
                                thousandSeparator={true}
                                prefix={'$'}
                                onChange={onChange('item15.spousal_owned_to_any_assignee')}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default SupportTable