import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../assets/css/pages/formPages/flr25.css'

const FLR25 = ({ targetRef, matterId, onFormDataSave }) => {

    return(
        <>
        <div class="flr25-page">
            <div class="flr25-page-content">
                <p class="text-11 text-center text-italic">ONTARIO</p>
                <table>
                    <tr>
                        <td width="15%" rowspan="2" class="valign-top">
                            <div class="div-seal">
                                <p class="text-11 text-center">Seal</p>
                            </div>
                        </td>
                        <td class="px-10 valign-top">
                            <select name="name_of_court" class="form-control">
                                <option value=""></option>
                                <option value="Ontario Court of Justice">Ontario Court of Justice</option>
                                <option value="Superior Court of Justice">Superior Court of Justice</option>
                                <option value="Superior Court of Justice, Family Branch">Superior Court of Justice, Family Branch</option>
                            </select>
                            <p class="text-9 text-center text-italic">(Name of court)</p>
                        </td>
                        <td width="25%" class="valign-top">
                            <div class="border-1">
                                <p class="text-9 px-4">Court File Number</p>
                                <input type="text" name="court_file_number" class="text-9 form-control" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-10 valign-top">
                            <p class="text-11 mt-10 d-flex"><span class="fw-700">at&ensp;</span>
                            <input type="text" name="court_office_address" class="text-11 border-bottom form-control"/></p>
                            <p class="text-9 text-center text-italic">Court Office Address</p>
                        </td>
                        <td class="valign-top">
                            <p class="text-11 fw-700 mt-10">Form 25: Order (general)</p>
                            <label class="flr25-custom-checkbox text-11 fw-700">
                                <input type="checkbox" name="order_temporary" class="form-control"/>
                                <span class="checkmark"></span>
                                Temporary
                            </label>
                            <br />
                            <label class="flr25-custom-checkbox text-11 fw-700">
                                <input type="checkbox" name="order_final" class="form-control"/>
                                <span class="checkmark"></span>
                                Final
                            </label>
                        </td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td width="22%" rowspan="2" class="valign-bottom">
                            <input type="text" name="judge_name" class="text-9 border-bottom form-control"/>
                            <p class="text-9 text-center text-italic">Judge (print or type name)</p>
                        </td>
                        <td colspan="2" class="px-10">
                            <p class="text-11 fw-700">Applicant(s)</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="valign-top px-10">
                            <table class="tbl-bordered">
                                <tr>
                                    <td>
                                        <p class="text-8 text-justify text-italic px-4">Full legal name & address for service — street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any).</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="" rows="3"></textarea>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="valign-top">
                            <table class="tbl-bordered">
                                <tr>
                                    <td>
                                        <p class="text-8 text-justify text-italic px-4">Lawyer’s name & address — street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any).</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="" rows="3"></textarea>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="valign-top" rowspan="2">
                            <br /><br />
                            <input type="text" name="date_of_order" class="text-9 border-bottom"/>
                            <p class="text-9 text-center text-italic">Date of order</p>
                        </td>
                        <td colspan="2" class="px-10">
                            <p class="text-11 fw-700 mt-10">Respondent(s)</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="valign-top px-10">
                            <table class="tbl-bordered">
                                <tr>
                                    <td>
                                        <p class="text-8 text-justify text-italic px-4">Full legal name & address for service — street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any)..</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="" rows="3"></textarea>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="valign-top">
                            <table class="tbl-bordered">
                                <tr>
                                    <td>
                                        <p class="text-8 text-justify text-italic px-4">Lawyer’s name & address — street & number, municipality, postal code, telephone & fax numbers and e-mail address (if any).</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="" rows="3"></textarea>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <div class="mt-15">
                    <label class="flr25-custom-checkbox text-10">
                        <input type="checkbox" name="" />
                        <span class="checkmark"></span>
                        This order is made pursuant to provincial legislation only. 
                    </label>
                </div>

                <p class="text-10 mt-15">The court heard an application/motion made by <span class="text-8 text-italic">(name of person or persons)</span></p>
                <input type="text" name="" class="text-10 border-bottom" />

                <p class="text-10 mt-10">The following persons were in court <span class="text-8 text-italic">(names of parties and lawyers in court)</span></p>
                <input type="text" name="" class="text-10 border-bottom" />

                <p class="text-10 mt-10">The court received evidence and heard submissions on behalf of <span class="text-8 text-italic">(name or names)</span></p>
                <input type="text" name="" class="text-10 border-bottom" />

                <p class="text-10 fw-700 mt-10">PURSUANT TO THE DIVORCE ACT (CANADA), THIS COURT ORDERS THAT: <span class="text-8 fw-500 text-italic">(if not applicable, cross out this line)</span></p>
                <textarea name="" rows="2" class="text-10"></textarea>

                <p class="text-10 fw-700 mt-10">PURSUANT TO THE CHILDREN’S LAW REFORM ACT, THIS COURT ORDERS THAT: <span class="text-8 fw-500 text-italic">(if not applicable, cross out this line)</span></p>
                <textarea name="" rows="2" class="text-10"></textarea>

                <p class="text-10 fw-700 mt-10">PURSUANT TO THE FAMILY LAW ACT, THIS COURT ORDERS THAT: <span class="text-8 fw-500 text-italic">(if not applicable, cross out this line)</span></p>
                <textarea name="" rows="15" class="text-10"></textarea>

                <div class="flr-page-footer">
                    <table>
                        <tr>
                            <td>
                                <p class="text-8">FLR 25 (December 1, 2020) </p>
                            </td>
                            <td>
                                <p class="text-8 text-right">Page 1 of 2</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            </div>
            <div class="flr25-page">
            <div class="flr25-page-content">
                <div>
                    <table>
                        <tr>
                            <td width="25%">
                                <p class="text-10 fw-700">Form 25: Order (general)</p>
                            </td>
                            <td>
                                <p class="text-10 fw-700 text-center">(page 2)</p>
                            </td>
                            <td width="25%" class="valign-top">
                                <div >
                                    <p class="text-9 px-4">Court File Number</p>
                                    <input type="text" name="court_file_number" class="text-9 form-control" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <hr />
                <p class="text-10 fw-700 mt-10">THIS COURT ORDERS THAT <span class="fw-500 text-italic">(specify legislation, where applicable):</span></p>
                <textarea name="" rows="45" class="text-10 form-control"></textarea>

                <p class="small centered">Put a line through any blank space left on this page. If additional space is needed, extra sheets may be attached.</p>
                <hr />

                <table class="mt-10">
                    <tr>
                        <td width="45%" class="border-bottom">
                            <input type="text" name="date_of_signature" class="text-11 text-center py-10 form-control" />
                        </td>
                        <td rowspan="2"></td>
                        <td width="45%" class="border-bottom">
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="text-9 text-center text-italic">Date of signature</p>
                        </td>
                        <td>
                            <p class="text-9 text-center text-italic">Signature of judge or clerk of the court</p>
                        </td>
                    </tr>
                </table>

                <div class="page-footer">
                    <table>
                        <tr>
                            <td>
                                <p class="text-8">FLR 25 (December 1, 2020) </p>
                            </td>
                            <td>
                                <p class="text-8 text-right">Page 2 of 2</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            </div>
        
        </>
    )
}

export default FLR25