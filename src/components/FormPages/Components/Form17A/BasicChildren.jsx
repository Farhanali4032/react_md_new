import React from 'react';
import CurrencyFormat from 'react-currency-format';
import NumberFormat from 'react-number-format';
import BoldandThinText from '../../forms/shared/BoldandThinText';
import { Col } from 'react-bootstrap';
import { calculateAge } from '../../../../utils/matterValidations/matterValidation';

const BasicChildren = ({ formData, changeAmount, heading, info, assetType, fillFormData, totalTitle }) => {


    return (
        <>
            <Col xs={6}>
                <BoldandThinText thin={"The basic information about the child(ren) is as follows:"} />
            </Col>
            <table className='pb-40px form-8a-children'>
                <thead>
                    <tr>
                        <th style={{ minWidth: "170px" }}>Child’s full legal name</th>
                        <th style={{ minWidth: "80px" }}>Age</th>
                        <th style={{ minWidth: "150px" }}>Birthdate<br /><i><small>(d,m,y)</small></i></th>
                        <th style={{ minWidth: "180px" }}>Grade/Year and School<br /></th>
                        <th style={{ minWidth: "180px" }}>Now living with</th>

                    </tr>
                </thead>
                <tbody>
                    {formData?.theChildren && Array.isArray(formData.theChildren) && formData.theChildren.length > 0 ? (

                        formData.theChildren.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={item.fullLegalName}
                                        onChange={fillFormData(`theChildren.${index}.fullLegalName`)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="age"
                                        value={calculateAge(item.birthdate)}
                                        onChange={fillFormData(`theChildren.${index}.age`)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type='date'
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={item.birthdate}
                                        onChange={fillFormData(`theChildren.${index}.birthdate`)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="grade"
                                        value={item.grade || ''}
                                        onChange={fillFormData(`theChildren.${index}.grade`)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={item.nowLivingWith}
                                        onChange={fillFormData(`theChildren.${index}.nowLivingWith`)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <>
                            <tr>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="age"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="muncipilityAndProvince"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={""}

                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="age"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="muncipilityAndProvince"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={""}

                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="age"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="muncipilityAndProvince"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={""}

                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="age"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="muncipilityAndProvince"
                                        value={""}

                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={""}

                                    />
                                </td>
                            </tr>
                        </>
                    )}


                </tbody>
            </table>
        </>
    )

}



export default BasicChildren;