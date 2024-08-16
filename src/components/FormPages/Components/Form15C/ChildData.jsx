import React from 'react'
import NumberFormat from 'react-number-format'
import CurrencyFormat from 'react-currency-format';

const ChildData = ({formData,handleChildrenDataExpenseChange}) => {
  return (
    <>
    <table className='pb-40px table-col-5'>
            <thead>
              <tr>
                <th style={{ height: "10px" }}>Child’s name</th>
                <th>Type of expense</th>
                <th>
                  Total Amount of Expense <br />

                </th>
                <th>
                  Payor’s Share <br />

                </th>
                <th>
                  Terms of Payment<br />
                  <small>
                    <i>(frequency of payment, date due, etc.)</i>
                  </small>
                </th>
              </tr>
            </thead>
            <tbody>
              {formData?.expenses.specialExpenses &&
                formData?.expenses.specialExpenses.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className='form-control small py-1'
                        name="name"
                        value={item.name}
                        onChange={(e) => handleChildrenDataExpenseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className='form-control small py-1'
                        name="expenses"
                        value={item.expenses}
                        onChange={(e) => handleChildrenDataExpenseChange(e, index)}
                      />
                    </td>
                    <td>
                    {/* <NumberFormat
                      value={item.amount}
                      className='form-control amount'
                      inputMode='numeric'
                      thousandSeparator={true}
                      decimalScale={3}
                      defaultValue={0}
                      prefix={'$'}
                      onChange={(e) => handleChildrenDataExpenseChange(e, index)}
                    /> */}
                    <CurrencyFormat
                      className='form-control text-right'
                      disabled={true}
                      value={item.amount}
                      thousandSeparator={true}
                      prefix={'$'}
                      onChange={(e) => handleChildrenDataExpenseChange(e, index)}
                    />
                    </td>
                    <td>
                      <input
                        className='form-control small py-1'
                        name="payor"
                        value={item?.payor || ''}
                        onChange={(e) => handleChildrenDataExpenseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className='form-control small py-1'
                        name="termsofpayment"
                        value={item?.termsofpayment || ''}
                        onChange={(e) => handleChildrenDataExpenseChange(e, index)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
    </>
  )
}

export default ChildData