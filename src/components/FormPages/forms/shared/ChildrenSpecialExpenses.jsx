import React from 'react'
import { Link } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';
import NumberFormat from 'react-number-format'
import { specialChildExpenses } from '../../../../utils/matterData/emptyDataArray';

const ChildrenSpecialExpenses = ({ title, formData, fillFormData, changeAmount, filler }) => {

    const renderExpenses = () => {
        if (formData?.specialExpenses[filler] && formData?.specialExpenses[filler].length > 0) {
            return formData.specialExpenses[filler].map((item, index) => (
                <tr className="inputs" key={index}>
                    <td>
                        <input
                            className='form-control'
                            value={item.name}
                            onChange={fillFormData(`specialExpenses.${filler}.${index}.name`)}
                        />
                    </td>
                    <td>
                        <input
                            className='form-control'
                            value={item.expenses}
                            onChange={fillFormData(`specialExpenses.${filler}.${index}.expenses`)}
                        />
                    </td>
                    <td>
                        <NumberFormat
                            value={item.amount}
                            className='form-control text-right'
                            inputMode='numeric'
                            thousandSeparator={true}
                            decimalScale={3}
                            defaultValue={0}
                            prefix={'$'}
                            onChange={fillFormData(`specialExpenses.${filler}.${index}.amount`)}
                        />
                    </td>
                    <td>
                        <NumberFormat
                            value={item.tax}
                            className='form-control text-right'
                            inputMode='numeric'
                            thousandSeparator={true}
                            decimalScale={3}
                            defaultValue={0}
                            prefix={'$'}
                            onChange={fillFormData(`specialExpenses.${filler}.${index}.tax`)}
                        />
                    </td>
                </tr>
            ))
        } else {
            return specialChildExpenses.map((item, index) => (
                <tr className="inputs" key={index}>
                    <td>
                        <input
                            className='form-control'
                            value={item.name}
                            onChange={fillFormData(`scheduleB.expenses.${index}.name`)}
                        />
                    </td>
                    <td>
                        <input
                            className='form-control'
                            value={item.expenses}
                            onChange={fillFormData(
                                `scheduleB.expenses.${index}.expenses`
                            )}
                        />
                    </td>
                    <td>
                        <CurrencyFormat
                            className='form-control'
                            value={item.amount || 0}
                            thousandSeparator={true}
                            prefix={'$'}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                            }}
                            onChange={changeAmount(`scheduleB.expenses.${index}.amount`)}
                        />
                    </td>
                    <td>
                        <CurrencyFormat
                            className='form-control text-right'
                            value={item.amount || 0}
                            thousandSeparator={true}
                            prefix={'$'}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                            }}
                            onChange={changeAmount(`scheduleB.expenses.${index}.tax`)}
                        />
                    </td>
                </tr>
            ))
        }
    }
    return (
        <>
            <div className='row pb-20px pl-40px'>
                <p className='sub-heading'>
                    {title}
                </p>

                {/* Table */}
                {/* Table */}
                <table className='pb-40px form-131-schedule-b children_special_table'>
                    <thead>
                        <tr>
                            <th>Child's Name</th>
                            <th>Expenses</th>
                            <th>Amount/yr.</th>
                            <th>Available Tax Credits or Deductions*</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderExpenses()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ChildrenSpecialExpenses