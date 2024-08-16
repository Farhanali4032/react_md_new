import React from 'react'

const ChildrenTable = ({ formData, handleChildrenDataChange }) => {
    console.log("🚀 ~ ChildrenTable ~ formData:", formData)
    return (
        <>
            <table className='pb-40px form-8a-children'>
                <thead>
                    <tr>
                        <th style={{ minWidth: "150px" }}>Child’s full legal name</th>
                        <th style={{ minWidth: "100px" }}>Birthdate<br /><i><small>(d,m,y)</small></i></th>
                        <th style={{ minWidth: "150px" }}>Lives in<br /><i><small>(municipality & Province)</small></i></th>
                        <th style={{ minWidth: "150px" }}>Now living with<br /><i><small>(name of person and relationship to child)</small></i></th>
                        <th style={{ minWidth: "150px" }}>Is Change of support being requested?<br /><i><small>(YES or NO)</small></i></th>

                    </tr>
                </thead>
                <tbody>
                    {formData?.theChildren &&
                        formData?.theChildren.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="fullLegalName"
                                        value={item?.fullLegalName}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                <input
                                        className='form-control small py-1'
                                        name="birthdate"
                                        value={item?.birthdate}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                <input
                                        className='form-control small py-1'
                                        name="muncipilityAndProvince"
                                        value={item?.muncipilityAndProvince}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                <input
                                        className='form-control small py-1'
                                        name="nowLivingWith"
                                        value={item?.nowLivingWith}
                                        onChange={(e) => handleChildrenDataChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className='form-control small py-1'
                                        name="change_of_support"
                                        value={item?.change_of_support}
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

export default ChildrenTable