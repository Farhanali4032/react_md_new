import { useState, useEffect } from 'react'

import InputCustom from '../../../components/InputCustom'
import { natureOfOwnership } from '../../../utils/matterData/categoryData'
import CustomDropDown from '../../../components/Matters/Form/CustomDropdown'
import { formatNumber } from '../../../utils/helpers/Formatting'
const Land = ({ landData, assetsData }) => {

  const [opposingDiffers, setOpposingDiffers] = useState(false)
  const [formDataSet,  isFormDatSet] = useState(false)
 
  
  useEffect(() => {
    if(assetsData){
      setFormData(assetsData);
      isFormDatSet(true)
      calculateTotal()
    }
  }, [formDataSet,assetsData])

  const [formData, setFormData] = useState([
    {
      nature_and_type_of_ownership: '',
      address_of_property: '',
      property_status: '',
      market_value: {
        client: {
          on_date_of_marriage: '',
          on_valuation_date: '',
          today: ''
        },
        opposing_party: {
          on_date_of_marriage: '',
          on_valuation_date: '',
          today: ''
        }
      }
    }
  ])
  const [total, setTotal] = useState(0)


  const handleLandsChange = e => {
    let key =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.dataset.key
    if (key === '' || key === undefined) {
      key =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.dataset.key
    }
    

    let name = e.target.name
    if (name === '' || name === undefined) {
      name = e.target.dataset.name
    }
    // 

    const newFormData = [...formData]
    newFormData[key][name] = e.target.value

    if (e.target.value === 'opposing_Party_view_differs' && key) {
      setOpposingDiffers(true)
    } else {
        setOpposingDiffers(false)
    }
    setFormData(newFormData)
  }

  const handleClientLandsChange = e => {
    let key =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .key
    // 

    const newFormData = [...formData]
    newFormData[key].market_value.client[e.target.name] = e.target.value

    setFormData(newFormData)

    calculateTotal()
  }

  const handleOpposingPartyLandsChange = e => {
    let key =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .key
    // 

    const newFormData = [...formData]
    newFormData[key].market_value.opposing_party[e.target.name] = e.target.value

    setFormData(newFormData)

    calculateTotal()
  }

  const calculateTotal = () => {
    let total = 0
    formData.forEach(item => {
   
     
      total += parseInt(
        item?.market_value?.client?.today === ''
          ? 0
          : item?.market_value?.client?.today
      )

      total += parseInt(
        item?.market_value?.opposing_party?.today === ''
          ? 0
          :  item?.market_value?.opposing_party?.today
      )
    })

    setTotal(total)
  }

  useEffect(() => {
    landData(formData)
  }, [formData])

  return (
    <div className='pb-50px matterType'>
      <div className='inputs-group pb-10px'>
        <div className='header'>
          <div className='title'>Land</div>
          <div>
            <div className='calculated_amount'>{formatNumber(total)}</div>
          </div>
        </div>
        {formData && formData.map((land, index) => (
          <div className='body' data-key={index} key={index}>
            <div className='spanned-rows'>
              <div className='inputs-rows'>
                <div className='inputs-row no-action pb-10px'>
                  {/* <div className='inputs'> */}
                    <label className='form-label mb-0'>
                      Nature and type of ownership
                    </label>
                    <InputCustom
                      type='text'
                      placeholder='Write Ownership type'
                      name='nature_and_type_of_ownership'
                      value={land.nature_and_type_of_ownership}
                      handleChange={handleLandsChange}
                    />
                  {/* </div> */}
                </div>
                <div className='inputs-row no-action'>
                  {/* <div className='inputs'> */}
                    <label className='form-label mb-0'>
                      Address of property
                    </label>
                    <InputCustom
                      type='text'
                      placeholder='Write Address'
                      name='address_of_property'
                      value={land.address_of_property}
                      handleChange={handleLandsChange}
                    />
                  {/* </div> */}
                </div>
              </div>
              <div className='checkbox-rows'>
                <div className='form-group'>
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='radio'
                      data-name='property_status'
                      id={'disposed_property' + index}
                      value='disposed_property'
                      checked={land.property_status === 'disposed_property'}
                      onChange={handleLandsChange}
                      data-key={index}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={'disposed_property' + index}
                    >
                      Disposed property
                    </label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='radio'
                      data-name='property_status'
                      id={'excluded_property' + index}
                      value='excluded_property'
                      checked={land.property_status === 'excluded_property'}
                      onChange={handleLandsChange}
                      data-key={index}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={'excluded_property' + index}
                    >
                      Excluded property
                    </label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='radio'
                      data-name='property_status'
                      id={'opposing_Party_view_differs' + index}
                      value='opposing_Party_view_differs'
                      checked={
                        land.property_status === 'opposing_Party_view_differs'
                      }
                      onChange={handleLandsChange}
                      data-key={index}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={'opposing_Party_view_differs' + index}
                    >
                      Opposing Party view differs
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='inputs-row no-action'>
              <div className='inputs inputs-4'>
                <label className='form-label mb-0'>Market value (Client)</label>
                <InputCustom
                  type='text'
                  name='on_date_of_marriage'
                  label='on Date of marriage'
                  placeholder='Amount'
                  value={land?.market_value?.client?.on_date_of_marriage}
                  handleChange={handleClientLandsChange}
                />
                <InputCustom
                  type='text'
                  name='on_valuation_date'
                  label='on Valuation date'
                  placeholder='Amount'
                  value={land?.market_value?.client?.on_valuation_date}
                  handleChange={handleClientLandsChange}
                />
                <InputCustom
                  type='text'
                  name='today'
                  label='Today'
                  placeholder='Amount'
                  value={land?.market_value?.client?.today}
                  handleChange={handleClientLandsChange}
                />
              </div>
              {opposingDiffers && (
              <div className='inputs inputs-4 pt-4 pt-xl-0'>
                <label className='form-label mb-0'>
                  Market value (Opposing Party)
                </label>
                <InputCustom
                  type='text'
                  name='on_date_of_marriage'
                  label='on Date of marriage'
                  placeholder='Amount'
                  labelClassNames={'d-xl-none'}
                  value={land?.market_value?.opposing_party?.on_date_of_marriage}
                  handleChange={handleOpposingPartyLandsChange}
                />
                <InputCustom
                  type='text'
                  name='on_valuation_date'
                  label='on Valuation date'
                  placeholder='Amount'
                  labelClassNames={'d-xl-none'}
                  value={land?.market_value?.opposing_party?.on_valuation_date}
                  handleChange={handleOpposingPartyLandsChange}
                />
                <InputCustom
                  type='text'
                  name='today'
                  label='Today'
                  placeholder='Amount'
                  labelClassNames={'d-xl-none'}
                  value={land?.market_value?.opposing_party?.today}
                  handleChange={handleOpposingPartyLandsChange}
                />
              </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='action'>
        <button
          className='btn btn-link'
          onClick={() => {
            setFormData([
              ...formData,
              {
                type: 'lands',
                nature_and_type_of_ownership: '',
                address_of_property: '',
                property_status: '',
                market_value: {
                  client: {
                    on_date_of_marriage: '',
                    on_valuation_date: '',
                    today: '',
                    role: 'client'
                  },
                  opposing_party: {
                    on_date_of_marriage: '',
                    on_valuation_date: '',
                    today: '',
                    role: 'opposingParty'
                  }
                }
              }
            ])
          }}
        >
          Add Land
        </button>
      </div>
    </div>
  )
}

export default Land
