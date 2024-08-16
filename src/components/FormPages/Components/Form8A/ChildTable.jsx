import React from 'react'

const ChildTable = ({ formData, handleChildrenDataChange }) => {
  return (
    <>

      <table className='pb-40px form-8a-children'>
        <thead>
          <tr>
            <th style={{ height: "10px" }}>Full legal name</th>
            <th>Age</th>
            <th>
              Birthdate <br />
              <small>
                <i>(d,m,y)</i>
              </small>
            </th>
            <th>
              Resident in <br />
              <small>
                <i>(municipality & province)</i>
              </small>
            </th>
            <th>
              Now Living With <br />
              <small>
                <i>(name of person and relationship to child)</i>
              </small>
            </th>
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
                    name="age"
                    value={item?.age}
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
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default ChildTable