import React from 'react'

const ChildInfoData = ({ formData, handleChildrenDataChange }) => {
    return (
        <>
            <table className='pb-40px form-8a-children'>
                <thead>
                    <tr>
                        <th style={{minWidth:"400px"}}>Child's full legal name</th>
                        <th style={{minWidth:"250px"}}>Birthdate <i>(d, m, y)</i> </th>
                        <th>
                            Age

                        </th>
                        <th>
                            Sex

                        </th>

                    </tr>
                </thead>
                <tbody>
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
                                        value={item.birthdate}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={item.age}
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
                               
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default ChildInfoData