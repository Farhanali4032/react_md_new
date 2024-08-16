import React, { useEffect, useState } from 'react'
import useSingleMatterData from '../../../utils/Apis/matters/CustomHook/DocumentViewData';
import { Form13b } from '../../../utils/Apis/matters/CustomHook/PDFData';
import NumberFormat from 'react-number-format';
import Loader from '../../Loader';
import FormDetails from '../Components/FormDetails';

const NetFamilyPropertyStatement13B = ({ targetRef, matterId,onFormDataSave }) => {

    
    const [dataCollected, setDataCollected] = useState(false);
    const {pdfData, loading} = Form13b(matterId)

    useEffect(() => {
        if (!loading && pdfData) {
            setFormData(pdfData);
        }
    }, [loading, formData]);

  const [formData, setFormData] = useState()

  useEffect(() => {
    onFormDataSave({
      form_id: 'FORM_13_B',
      data: formData,
    })
  }, [formData])

    function fillFormData(key, defaultVal = null) {
        return (e) => {
            const updatedFormData = { ...formData };

            const keys = key.split('.');
            const value = e.target.value;

            let nestedObj = updatedFormData;
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                if (i === keys.length - 1) {
                    nestedObj[k] = defaultVal ? defaultVal : value;
                } else {
                    nestedObj[k] = { ...nestedObj[k] };
                    nestedObj = nestedObj[k];
                }
            }

            setFormData(updatedFormData);

        };
    }

    function changeFormCheck(key) {
        return (e) => {
            const updatedFormData = { ...formData };
            const value = e.target.checked;

            const keys = key.split('.');

            let nestedObj = updatedFormData;
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                if (i === keys.length - 1) {
                    nestedObj[k] = value;
                } else {
                    nestedObj[k] = { ...nestedObj[k] };
                    nestedObj = nestedObj[k];
                }
            }

            setFormData(updatedFormData);

        };
    }

    return (
        <>
        {loading ? (
          <Loader isLoading={loading} />
        ) : (
        <div className="pdf-form pdf-form-13b" ref={targetRef}>
            {/* Form Name */}
            <div className="row text-center mb-4">
                <div className="col-12">
                    <div className="fw-bold fst-italic">
                        ONTARIO
                    </div>
                </div>
            </div>

            {/* Form Details */}
            <FormDetails
                formTitle={'Form 13.B - Net Family Property Statement'} 
                courtName={formData?.courtName} 
                courtFileNumber={formData?.courtFileNumber} 
                courtOfficeAddress={formData?.courtOfficeAddress} 
                applicationType={formData?.applicationType} 
                selectOptions={false}
                />
            {/* <div className="row">
                <div className="col-9">
                    <div className="row justify-content-end">
                        <div className="col-11">
                            <div className="form-group align-items-center">
                                <input type="text" className="form-control" id="at" name="at" value={formData?.courtName}
                                    onChange={fillFormData('courtName')} />
                                <div className="fst-italic">(Name of Court)</div>
                            </div>
                        </div>
                    </div>
                    <div className="row  justify-content-end">
                        <div className="col-1 fw-bold mt-2" style={{ paddingLeft: '40px' }}>at</div>
                        <div className="col-11">
                            <div className="form-group align-items-center">
                                <input type="text" className="form-control" id="at" name="at"
                                    value={formData?.courtOfficeAddress}
                                    onChange={fillFormData('courtOfficeAddress')} />
                                <div className="fst-italic">Court Office Address</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group" style={{ marginTop: '-25px' }}>
                                <span className="text-nowrap">Court File Number</span>
                                <input type="text" className="form-control" id="at" name="at"
                                    value={formData?.courtFileNumber}
                                    onChange={fillFormData('courtFileNumber')} />
                            </div>
                            <div className="fw-bolder text-end" style={{ marginTop: '-15px' }}>Form 13B: Net Family Property Statement
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Applicants */}
            <div className="row pb-20px pl-40px">
                <div className="fw-bolder">Applicant(s)</div>
                <div className="col-6">
                    <div className="data-group">
                        <label>
                            Full legal name & address for service — street & number, municipality,
                            postal code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.applicants.applicant1}
                            onChange={fillFormData('applicants.applicant1')}></textarea>
                        <textarea rows="2" value={formData?.applicants.applicant2}
                            onChange={fillFormData('applicants.applicant2')}></textarea>
                    </div>
                </div>
                <div className="col-6">
                    <div className="data-group">
                        <label>
                            Lawyer’s name & address — street & number, municipality, postal
                            code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.applicantsLawyer.lawyer1}
                            onChange={fillFormData('applicantsLawyer.lawyer1')}></textarea>
                        <textarea rows="2" value={formData?.applicantsLawyer.lawyer2}
                            onChange={fillFormData('applicantsLawyer.lawyer2')}></textarea>
                    </div>
                </div>
            </div>

            {/* Respondents */}
            <div className="row pb-20px pl-40px">
                <div className="fw-bolder">Respondent(s)</div>
                <div className="col-6">
                    <div className="data-group">
                        <label>
                            Full legal name & address for service — street & number, municipality,
                            postal code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.respondents.respondent1}
                            onChange={fillFormData('respondents.respondent1')}></textarea>
                        <textarea rows="2" value={formData?.respondents.respondent2}
                            onChange={fillFormData('respondents.respondent2')}></textarea>
                    </div>
                </div>
                <div className="col-6">
                    <div className="data-group">
                        <label>
                            Lawyer’s name & address — street & number, municipality, postal
                            code, telephone & fax numbers and e-mail address (if any).
                        </label>
                        <textarea rows="2" value={formData?.respondentsLawyer.lawyer1}
                            onChange={fillFormData('respondentsLawyer.lawyer1')}></textarea>
                        <textarea rows="2" value={formData?.respondentsLawyer.lawyer2}
                            onChange={fillFormData('respondentsLawyer.lawyer2')}></textarea>
                    </div>
                </div>
            </div>

            {/* My Information */}
            <div className="row pb-10px pl-40px">
                <div className="data-input">
                    <div className="label">My name is (full legal name)</div>
                    <input type="text" className="form-control" value={formData?.myName}
                        onChange={fillFormData('myName')} />
                </div>
            </div>

            {/* Valuation Information */}
            <div className="row pb-10px pl-40px">
                <div className="data-input">
                    <div className="label">The valuation date for the following material is (date)</div>
                    <input type="date" className="form-control" value={formData?.valuationDate}
                        onChange={fillFormData('valuationDate')} />
                </div>
            </div>

            {/* Tables */}
            <div className="row pb-40px pl-40px">
                <div className="text pb-10px">
                    (Complete the tables by filling in the columns for both parties, showing your assets, debts, etc.,
                    and those of your spouse.)
                </div>

                {/* Table 1 */}
                <table className='pb-40px'>
                    <thead>
                        <tr>
                            <th colSpan={3} className="name">TABLE 1: Value of assets owned on valuation date</th>
                        </tr>
                        <tr>
                            <th colSpan={3} className="info">(List in the order of the categories in the financial
                                statement.)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='text-center'>ITEM</th>
                            <th>APPLICANT (in $)</th>
                            <th>RESPONDENT (in $)</th>
                        </tr>
                        {formData?.table1 &&
                            formData?.table1.items.map(item => (
                                <tr>
                                    <td><input className="form-control" value={item.item}
                                        onChange={fillFormData('table1.item1.name')} /></td>
                                    <td>
                                        <NumberFormat
                                            value={item.market_value.client.today}
                                            className='form-control'
                                            inputMode='numeric'
                                            thousandSeparator={true}
                                            decimalScale={3}
                                            defaultValue={0}
                                            prefix={'$'}
                                            onChange={fillFormData('scheduleC.expenses.child1.name')}
                                        />
                                    </td>
                                    <td>
                                        <NumberFormat
                                            value={item.market_value.opposing_party.today || 0}
                                            className='form-control'
                                            inputMode='numeric'
                                            thousandSeparator={true}
                                            decimalScale={3}
                                            defaultValue={0}
                                            prefix={'$'}
                                            onChange={fillFormData('scheduleC.expenses.child1.name')}
                                        />
                                    </td>
                                </tr>
                            ))}
                        <tr>
                            <td className="fw-bold text-end">Total 1</td>
                            <td>
                                <NumberFormat
                                    value={formData?.table1.totals.client || 0}
                                    className='form-control'
                                    inputMode='numeric'
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    defaultValue={0}
                                    prefix={'$'}
                                    onChange={fillFormData('scheduleC.expenses.child1.name')}
                                />
                            </td>
                            <td>
                                <NumberFormat
                                    value={formData?.table1.totals.opposing_party || 0}
                                    className='form-control'
                                    inputMode='numeric'
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    defaultValue={0}
                                    prefix={'$'}
                                    onChange={fillFormData('scheduleC.expenses.child1.name')}
                                /></td>
                        </tr>
                    </tbody>
                </table>

                {/* Table 2 */}
                <table className='pb-40px'>
                    <thead>
                        <tr>
                            <th colSpan={3} className="name">TABLE 2: Value of debts and liabilities on valuation date</th>
                        </tr>
                        <tr>
                            <th colSpan={3} className="info">(List in the order of the categories in the financial statement.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='text-center'>ITEM</th>
                            <th>APPLICANT (in $)</th>
                            <th>RESPONDENT (in $)</th>
                        </tr>
                        {formData?.table2 &&
                            formData?.table2.items.map(item => (
                                <tr>
                                    <td><input className="form-control" value={item.category}
                                        onChange={fillFormData('table2.item1.name')} /></td>
                                    <td>
                                        <NumberFormat
                                            value={item.today}
                                            className='form-control'
                                            inputMode='numeric'
                                            thousandSeparator={true}
                                            decimalScale={3}
                                            defaultValue={0}
                                            prefix={'$'}
                                            onChange={fillFormData('scheduleC.expenses.child1.name')}
                                        />
                                    </td>
                                    <td><input className="form-control" value={''}
                                        onChange={fillFormData('table2.item1.respondent')} /></td>
                                </tr>
                            ))}
                        <tr>
                            <td className="fw-bold text-end">Total 2</td>
                            <td>
                                <NumberFormat
                                    value={formData?.table2.totalValue}
                                    className='form-control'
                                    inputMode='numeric'
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    defaultValue={0}
                                    prefix={'$'}
                                    onChange={fillFormData('scheduleC.expenses.child1.name')}
                                />
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
                                    onChange={fillFormData('scheduleC.expenses.child1.name')}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Table 3 */}
                <table className='pb-40px'>
                    <thead>
                        <tr>
                            <th colSpan={3} className="name">TABLE 3: Net value on date of marriage of property (other than
                                a matrimonial home) after deducting debts or other liabilities on date of marriage (other
                                than those relating directly to the purchase or significant improvement of a matrimonial
                                home)
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={3} className="info">(List in the order of the categories in the financial
                                statement.)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='text-center'> 3(a) PROPERTY ITEM</th>
                            <th>APPLICANT (in $)</th>
                            <th>RESPONDENT (in $)</th>
                        </tr>
                        {formData?.table3a &&
                            formData?.table3a.items.map(item => (
                                <tr>
                                    <td><input className="form-control" value={item.item}
                                        onChange={fillFormData('table3a.item1.name')} /></td>
                                    <td><NumberFormat
                                        value={item.market_value.client.today || 0}
                                        className='form-control'
                                        inputMode='numeric'
                                        thousandSeparator={true}
                                        decimalScale={3}
                                        defaultValue={0}
                                        prefix={'$'}
                                        onChange={fillFormData('scheduleC.expenses.child1.name')}
                                    /></td>
                                    <td>
                                        <NumberFormat
                                            value={item.market_value.opposing_party.today || 0}
                                            className='form-control'
                                            inputMode='numeric'
                                            thousandSeparator={true}
                                            decimalScale={3}
                                            defaultValue={0}
                                            prefix={'$'}
                                            onChange={fillFormData('scheduleC.expenses.child1.name')}
                                        /></td>
                                </tr>
                            ))}
                        <tr>
                            <td className="fw-bold text-end">TOTAL OF PROPERTY ITEMS</td>
                            <td><NumberFormat
                                value={formData?.table3a.totals.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                            <td>
                            <NumberFormat
                                value={formData?.table3a.totals.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                           </td>
                        </tr>
                        <tr>
                            <th className='text-center'> 3(b) DEBT ITEM</th>
                            <th>APPLICANT (in $)</th>
                            <th>RESPONDENT (in $)</th>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table3b.item1.name}
                                onChange={fillFormData('table3b.item1.name')} /></td>
                            <td><input className="form-control" value={formData?.table3b.item1.applicant}
                                onChange={fillFormData('table3b.item1.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table3b.item1.respondent}
                                onChange={fillFormData('table3b.item1.respondent')} /></td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">TOTAL OF DEBT ITEMS</td>
                            <td><input className="fw-bold form-control" value={formData?.table3b.client}
                                onChange={fillFormData('table3b.total1')} /></td>
                            <td><input className="fw-bold form-control" value={formData?.table3b.opposing_party}
                                onChange={fillFormData('table3b.opposing_party')} /></td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">NET TOTAL 3 [3(a) <small>minus</small> 3(b)]</td>
                            <td><NumberFormat
                                value={formData?.totals.total3.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                               </td>
                            <td>
                                <NumberFormat
                                value={formData?.totals.total3.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            /></td>
                        </tr>
                    </tbody>
                </table>

                {/* Table 4 */}
                <table className='pb-40px'>
                    <thead>
                        <tr>
                            <th colSpan={3} className="name">TABLE 4: Value or property excluded under subsection 4(2) of
                                the Family Law Act
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={3} className="info">(List in the order of the categories in the financial
                                statement.)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='text-center'>ITEM</th>
                            <th>APPLICANT (in $)</th>
                            <th>RESPONDENT (in $)</th>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item1.name}
                                onChange={fillFormData('table4.item1.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item1.applicant}
                                onChange={fillFormData('table4.item1.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item1.respondent}
                                onChange={fillFormData('table4.item1.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item2.name}
                                onChange={fillFormData('table4.item2.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item2.applicant}
                                onChange={fillFormData('table4.item2.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item2.respondent}
                                onChange={fillFormData('table4.item2.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item3.name}
                                onChange={fillFormData('table4.item3.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item3.applicant}
                                onChange={fillFormData('table4.item3.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item3.respondent}
                                onChange={fillFormData('table4.item3.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item4.name}
                                onChange={fillFormData('table4.item4.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item4.applicant}
                                onChange={fillFormData('table4.item4.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item4.respondent}
                                onChange={fillFormData('table4.item4.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item5.name}
                                onChange={fillFormData('table4.item5.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item5.applicant}
                                onChange={fillFormData('table4.item5.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item5.respondent}
                                onChange={fillFormData('table4.item5.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item6.name}
                                onChange={fillFormData('table4.item6.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item6.applicant}
                                onChange={fillFormData('table4.item6.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item6.respondent}
                                onChange={fillFormData('table4.item6.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item7.name}
                                onChange={fillFormData('table4.item7.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item7.applicant}
                                onChange={fillFormData('table4.item7.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item7.respondent}
                                onChange={fillFormData('table4.item7.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item8.name}
                                onChange={fillFormData('table4.item8.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item8.applicant}
                                onChange={fillFormData('table4.item8.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item8.respondent}
                                onChange={fillFormData('table4.item8.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item9.name}
                                onChange={fillFormData('table4.item9.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item9.applicant}
                                onChange={fillFormData('table4.item9.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item9.respondent}
                                onChange={fillFormData('table4.item9.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item10.name}
                                onChange={fillFormData('table4.item10.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item10.applicant}
                                onChange={fillFormData('table4.item10.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item10.respondent}
                                onChange={fillFormData('table4.item10.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item11.name}
                                onChange={fillFormData('table4.item11.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item11.applicant}
                                onChange={fillFormData('table4.item11.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item11.respondent}
                                onChange={fillFormData('table4.item11.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item12.name}
                                onChange={fillFormData('table4.item12.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item12.applicant}
                                onChange={fillFormData('table4.item12.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item12.respondent}
                                onChange={fillFormData('table4.item12.respondent')} /></td>
                        </tr>
                        <tr>
                            <td><input className="form-control" value={formData?.table4.item13.name}
                                onChange={fillFormData('table4.item13.name')} /></td>
                            <td><input className="form-control" value={formData?.table4.item13.applicant}
                                onChange={fillFormData('table4.item13.applicant')} /></td>
                            <td><input className="form-control" value={formData?.table4.item13.respondent}
                                onChange={fillFormData('table4.item13.respondent')} /></td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">Total 4</td>
                            <td><input className="fw-bold form-control" value={formData?.table4.total1}
                                onChange={fillFormData('table4.total1')} /></td>
                            <td><input className="fw-bold form-control" value={formData?.table4.opposing_party}
                                onChange={fillFormData('table4.opposing_party')} /></td>
                        </tr>
                    </tbody>
                </table>

                {/* Table 5 */}
                <table className='pb-40px'>
                    <tbody>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 2 <small>(from the Form 2)</small></td>
                            <td>
                            <NumberFormat
                                value={formData?.table2.totalValue}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                            <td><NumberFormat
                                value={'0'}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            /></td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 3 <small>(from the Form 3)</small></td>
                            <td><NumberFormat
                                value={formData?.totals.total3.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                               </td>
                            <td>
                                <NumberFormat
                                value={formData?.totals.total3.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            /></td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 4 <small>(from the Form 4)</small></td>
                            <td> <NumberFormat
                                value={formData?.totals.total4.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                           </td>
                            <td>
                            <NumberFormat
                                value={formData?.totals.total4.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 5 <small><b>([TOTAL 2] + [TOTAL 3] + [TOTAL
                                4])</b></small></td>
                                <td>
                                <NumberFormat
                                value={formData?.netTotals.total5.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                            <td>
                            <NumberFormat
                                value={formData?.netTotals.total5.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Table 6 */}
                <table className='pb-40px'>
                    <tbody>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 1 <small>(from the Form 1)</small></td>
                            <td>
                            <NumberFormat
                                value={formData?.netTotals.total1.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                           </td>
                            <td>
                            <NumberFormat
                                value={formData?.netTotals.total1.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                              </td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 5 <small>(from the above)</small></td>
                            <td>
                            <NumberFormat
                                value={formData?.netTotals.total5.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                            <td>
                            <NumberFormat
                                value={formData?.netTotals.total5.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold text-end">TOTAL 6: NET FAMILY PROPERTY <small><b>([Total 1]</b> minus <b>[Total
                                5])</b></small></td>
                            <td><NumberFormat
                                value={formData?.netTotals.total6.client}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                            <td>
                            <NumberFormat
                                value={formData?.netTotals.total6.opposing_party}
                                className='form-control'
                                inputMode='numeric'
                                thousandSeparator={true}
                                decimalScale={3}
                                defaultValue={0}
                                prefix={'$'}
                                onChange={fillFormData('scheduleC.expenses.child1.name')}
                            />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Signatures */}
            <div className="row pb-40px pl-40px">
                <div className="col-4">
                    <div className="data-input">
                        <div className="label">Date of Signature</div>
                        <input type="date" className="form-control" value={formData?.dateOfSignature}
                            onChange={fillFormData('dateOfSignature')} />
                    </div>
                </div>
                <div className="col-8">
                    <div className="data-input">
                        <div className="label">Signature</div>
                        <input type="text" className="form-control" value={formData?.signature}
                            onChange={fillFormData('signature')} />
                    </div>
                </div>
            </div>

        </div>
         ) }
         </>
    )
}

export default NetFamilyPropertyStatement13B