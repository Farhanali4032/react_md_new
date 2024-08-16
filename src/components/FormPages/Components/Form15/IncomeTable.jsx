import React from 'react'

const IncomeTable = ({ formData, handleChildrenDataChange }) => {
    return (
        <>
            <table className='pb-40px form-8a-children'>
                <thead>
                    <tr>
                        <th style={{ minWidth: "80px" }}>Years</th>
                        <th style={{ minWidth: "130px" }}>Requesting Party income</th>
                        <th style={{ minWidth: "170px" }}>Income Sources<br /><i><small>(municipality & Province)</small></i></th>
                        <th style={{ minWidth: "100px" }}>Responsing party's Income</th>
                        <th style={{ minWidth: "150px" }}>Income Sources<br /><i><small>(YES or NO)</small></i></th>

                    </tr>
                </thead>
                <tbody>
                    <tr >
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
                                value={"$"}
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
                                value={"$"}
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


                    <tr >
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
                                value={"$"}
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
                                value={"$"}
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
                    <tr >
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
                                value={"$"}
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
                                value={"$"}
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

                    {formData?.familyHistory.theChildren &&
                        formData?.familyHistory.theChildren.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={item.fullLegalName}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="age"
                                        value={`$${item.age}`}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={item.birthdate}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="muncipilityAndProvince"
                                        value={item.muncipilityAndProvince}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={item.nowLivingWith}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default IncomeTable