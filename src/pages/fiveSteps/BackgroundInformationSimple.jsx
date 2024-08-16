import { useEffect, useState } from 'react'

import Dropdown from '../../components/Matters/Form/Dropdown'
import InputCustom from '../../components/InputCustom'

import lawyer from '../../assets/images/lawyer.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleMatterData } from '../../utils/Apis/matters/getSingleMatterData/getSingleMattersDataActions'
import {
  selectDataSingleMatterData,
  selectDataSingleMatterLoading
} from '../../utils/Apis/matters/getSingleMatterData/getSingleMattersDataSelectors'
import { ClipLoader } from 'react-spinners'
import Loader from '../../components/Loader'
import { backgroundData } from '../../utils/matterData/sampleData'
import { selectSingleMatterData } from '../../utils/Apis/matters/getSingleMatter/getSingleMattersSelectors'
import { getAllMunicipalities } from '../../utils/Apis/matters/getMunicipalities/getMunicipalitiesActions'
import { selectMunicipaltiesData } from '../../utils/Apis/matters/getMunicipalities/getMunicipalitiesSelectors'
import useSingleMatterData from '../../utils/Apis/matters/CustomHook/DocumentViewData'

const BackgroundInformationSimple = ({ matterId, onUpdateFormData }) => {
  const [loading, setLoading] = useState(true)

  const [bgInfoActiveTab, setBgInfoActiveTab] = useState('Client')
  const dispatch = useDispatch()

  const { selectBackground, selectBackgroundLoading } = useSingleMatterData(matterId);

  

  useEffect(() => {
    if (selectBackground && !selectBackgroundLoading) {
      const separatedData = selectBackground?.body.reduce((acc, cur) => {
        if (cur.role === 'Client') {
          acc.client = cur
        } else if (cur.role === 'Opposing Party') {
          acc.opposingParty = cur
        }
        return acc
      }, {})

      setClientFormData({
        id: separatedData?.client?.id ?? '',
        role: separatedData?.client?.role ?? '',
        province: separatedData?.client?.province ?? '',
        name: separatedData?.client?.name ?? '',
        postalCode: separatedData?.client?.postalCode ?? '',
        dateOfBirth: separatedData?.client?.dateOfBirth ?? '',
        phone: separatedData?.client?.phone ?? '',
        address: separatedData?.client?.address ?? '',
        email: separatedData?.client?.email ?? '',
        municipality: separatedData?.client?.municipality ?? '',
        representedBy: separatedData?.client?.representedBy ?? '',

        // Lawyer
        lawyerName: separatedData?.client?.lawyerName,
        lawyerPostalCode: separatedData?.client?.lawyerPostalCode,
        lawyerAddress: separatedData?.client?.lawyerAddress,
        lawyerPhone: separatedData?.client?.lawyerPhone,
        lawyerEmail: separatedData?.client?.lawyerEmail,
        lawyerProvince: separatedData?.client?.lawyerProvince,
        lawyerMunicipality: separatedData?.client?.lawyerMunicipality
      })

      setOpposingPartyFormData({
        id: separatedData?.opposingParty?.id ?? '',
        role: separatedData?.opposingParty?.role || '',
        province: separatedData?.opposingParty?.province || '',
        name: separatedData?.opposingParty?.name || '',
        postalCode: separatedData?.opposingParty?.postalCode || '',
        dateOfBirth: separatedData?.opposingParty?.dateOfBirth || '',
        phone: separatedData?.opposingParty?.phone || '',
        address: separatedData?.opposingParty?.address || '',
        email: separatedData?.opposingParty?.email || '',
        municipality: separatedData?.opposingParty?.municipality || '',
        representedBy: separatedData?.opposingParty?.representedBy || '',

        // Lawyer
        lawyerName: separatedData?.opposingParty?.lawyerName || '',
        lawyerPostalCode: separatedData?.opposingParty?.lawyerPostalCode || '',
        lawyerAddress: separatedData?.opposingParty?.lawyerAddress || '',
        lawyerPhone: separatedData?.opposingParty?.lawyerPhone || '',
        lawyerEmail: separatedData?.opposingParty?.lawyerEmail || '',
        lawyerProvince: separatedData?.opposingParty?.lawyerProvince || '',
        lawyerMunicipality: separatedData?.opposingParty?.lawyerMunicipality || ''
      })

      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [selectBackground,selectBackgroundLoading])

  const [clientFormData, setClientFormData] = useState({})
  

  const [opposingPartyFormData, setOpposingPartyFormData] = useState({})

  useEffect(() => {
    onUpdateFormData({
      type: 'background',
      background: {
        client: clientFormData,
        opposingParty: opposingPartyFormData
      },
    })
  }, [clientFormData, opposingPartyFormData])
  
  const selectSingleMatter = useSelector(selectSingleMatterData)

  useEffect(() => {
    dispatch(getAllMunicipalities(selectSingleMatter.body[0].province))
  }, [])



  const getMunicipalities = useSelector(selectMunicipaltiesData)

  const municipalities = getMunicipalities?.body.map(item => ({
    name: item.municipality,
    value: item.municipality
  }))

  const handleClientFormDataChange = e => {
    setClientFormData({
      ...clientFormData,
      [e.target.name]: e.target.value
    })

  }

  const handleOpposingPartyFormDataChange = e => {

    setOpposingPartyFormData({
      ...opposingPartyFormData,
      [e.target.name]: e.target.value
    })
  }

  const clientRoleList = [
    {
      name: 'Client',
      value: 'Client'
    },
    {
      name: 'Opposing Party',
      value: 'Opposing Party'
    },
    {
      name: 'Other',
      value: 'Other'
    }
  ]

  const provinceList = [
    {
      name: 'Ontario',
      value: 'Ontario'
    },
    {
      name: 'Quebec',
      value: 'Quebec'
    },
    {
      name: 'British Columbia',
      value: 'British Columbia'
    },
    {
      name: 'Alberta',
      value: 'Alberta'
    },
    {
      name: 'Manitoba',
      value: 'Manitoba'
    },
    {
      name: 'Saskatchewan',
      value: 'Saskatchewan'
    },
    {
      name: 'Nova Scotia',
      value: 'Nova Scotia'
    },
    {
      name: 'New Brunswick',
      value: 'New Brunswick'
    },
    {
      name: 'Newfoundland and Labrador',
      value: 'Newfoundland and Labrador'
    },
    {
      name: 'Prince Edward Island',
      value: 'Prince Edward Island'
    },
    {
      name: 'Northwest Territories',
      value: 'Northwest Territories'
    },
    {
      name: 'Nunavut',
      value: 'Nunavut'
    },
    {
      name: 'Yukon',
      value: 'Yukon'
    }
  ]

  const representedByList = [
    {
      name: 'Self',
      value: 'Self'
    },
    {
      name: 'Lawyer',
      value: 'Lawyer'
    }
  ]

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className='accordion-body'>
          <div className='tab-actions'>
            <div
              className={`tab-action ${bgInfoActiveTab === 'Client' ? 'active' : ''
                }`}
              onClick={() => setBgInfoActiveTab('Client')}
            >
              Client
            </div>
            <div
              className={`tab-action ${bgInfoActiveTab === 'Opposing Party' ? 'active' : ''
                }`}
              onClick={() => setBgInfoActiveTab('Opposing Party')}
            >
              Opposing Party
            </div>
          </div>
          {bgInfoActiveTab === 'Client' ? (
            <div id='client' className='tab-content matterType'>
              <div className='inputs-group pt-4'>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Role*</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setClientFormData({
                          ...clientFormData,
                          role: li.value
                        })
                      }
                      list={clientRoleList}
                      curListItem={clientFormData.role}
                    ></Dropdown>
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Province*</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setClientFormData({
                          ...clientFormData,
                          province: li.value
                        })
                      }
                      list={provinceList}
                      curListItem={clientFormData.province}
                    ></Dropdown>
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Full Legal Name*</label>
                    <InputCustom
                      type='text'
                      placeholder='Enter Name'
                      name='name'
                      value={clientFormData.name}
                      handleChange={handleClientFormDataChange}
                    />
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Postal Code*</label>
                    <InputCustom
                      type='text'
                      placeholder='Write Postal code'
                      name='postalCode'
                      value={clientFormData.postalCode}
                      handleChange={handleClientFormDataChange}
                    />
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Date of Birth</label>
                    <InputCustom
                      type='date'
                      placeholder='Select Date'
                      name='dateOfBirth'
                      value={clientFormData.dateOfBirth}
                      handleChange={handleClientFormDataChange}
                    />
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Phone*</label>
                    <InputCustom
                      type='text'
                      placeholder='Write Phone Number'
                      name='phone'
                      value={clientFormData.phone}
                      handleChange={handleClientFormDataChange}
                    />
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Address*</label>
                    <InputCustom
                      type='text'
                      placeholder='Write Address'
                      name='address'
                      value={clientFormData.address}
                      handleChange={handleClientFormDataChange}
                    />
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Email*</label>
                    <InputCustom
                      type='email'
                      placeholder='Write Email'
                      name='email'
                      value={clientFormData.email}
                      handleChange={handleClientFormDataChange}
                    />
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Municipality</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setClientFormData({
                          ...clientFormData,
                          municipality: li.value
                        })
                      }
                      list={municipalities}
                      curListItem={clientFormData.municipality}
                    ></Dropdown>
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Represented by</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setClientFormData({
                          ...clientFormData,
                          representedBy: li.value
                        })
                      }
                      list={representedByList}
                      curListItem={clientFormData.representedBy}
                    ></Dropdown>
                  </div>
                </div>
              </div>

              {clientFormData && clientFormData.representedBy === 'Lawyer' ? (
                <>
                  <div className='sub-heading pt-0'>
                    <img src={lawyer} alt='Lawyer' />
                    <span>Lawyer</span>
                  </div>

                  <div className='inputs-group pb-10px'>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Full Name*</label>
                        <InputCustom
                          type='text'
                          placeholder='Enter Name'
                          name='lawyerName'
                          value={clientFormData.lawyerName}
                          handleChange={handleClientFormDataChange}
                        />
                      </div>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Postal Code</label>
                        <InputCustom
                          type='text'
                          placeholder='Write Postal code'
                          name='lawyerPostalCode'
                          value={clientFormData.lawyerPostalCode}
                          handleChange={handleClientFormDataChange}
                        />
                      </div>
                    </div>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Address*</label>
                        <InputCustom
                          type='text'
                          placeholder='Write Address'
                          name='lawyerAddress'
                          value={clientFormData.lawyerAddress}
                          handleChange={handleClientFormDataChange}
                        />
                      </div>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Phone*</label>
                        <InputCustom
                          type='text'
                          placeholder='Write Phone'
                          name='lawyerPhone'
                          value={clientFormData.lawyerPhone}
                          handleChange={handleClientFormDataChange}
                        />
                      </div>
                    </div>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Municipality</label>
                        <Dropdown
                          handleChange={(e, li) =>
                            setClientFormData({
                              ...clientFormData,
                              lawyerMunicipality: li.value
                            })
                          }
                          list={municipalities}
                          curListItem={clientFormData.lawyerMunicipality}
                        ></Dropdown>
                      </div>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Email*</label>
                        <InputCustom
                          type='email'
                          placeholder='Write Email'
                          name='lawyerEmail'
                          value={clientFormData.lawyerEmail}
                          handleChange={handleClientFormDataChange}
                        />
                      </div>
                    </div>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Province*</label>
                        <Dropdown
                          handleChange={(e, li) =>
                            setClientFormData({
                              ...clientFormData,
                              lawyerProvince: li.value
                            })
                          }
                          list={provinceList}
                          curListItem={clientFormData.lawyerProvince}
                        ></Dropdown>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div id='oppposingParty' className='tab-content matterType'>
              <div className='inputs-group pt-4'>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Role*</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setOpposingPartyFormData({
                          ...opposingPartyFormData,
                          role: li.value
                        })
                      }
                      list={clientRoleList}
                      curListItem={opposingPartyFormData.role}
                    ></Dropdown>
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Province*</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setOpposingPartyFormData({
                          ...opposingPartyFormData,
                          province: li.value
                        })
                      }
                      list={provinceList}
                      curListItem={opposingPartyFormData.province}
                    ></Dropdown>
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Full Legal Name*</label>
                    <InputCustom
                      type='text'
                      placeholder='Enter Name'
                      name='name'
                      value={opposingPartyFormData.name}
                      handleChange={handleOpposingPartyFormDataChange}
                    />
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Postal Code*</label>
                    <InputCustom
                      type='text'
                      placeholder='Write Postal code'
                      name='postalCode'
                      value={opposingPartyFormData.postalCode}
                      handleChange={handleOpposingPartyFormDataChange}
                    />
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Date of Birth</label>
                    <InputCustom
                      type='date'
                      placeholder='Select Date'
                      name='dateOfBirth'
                      value={opposingPartyFormData.dateOfBirth}
                      handleChange={handleOpposingPartyFormDataChange}
                    />
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Phone*</label>
                    <InputCustom
                      type='text'
                      placeholder='Write Phone Number'
                      name='phone'
                      value={opposingPartyFormData.phone}
                      handleChange={handleOpposingPartyFormDataChange}
                    />
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Address*</label>
                    <InputCustom
                      type='text'
                      placeholder='Write Address'
                      name='address'
                      value={opposingPartyFormData.address}
                      handleChange={handleOpposingPartyFormDataChange}
                    />
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Email*</label>
                    <InputCustom
                      type='email'
                      placeholder='Write Email'
                      name='email'
                      value={opposingPartyFormData.email}
                      handleChange={handleOpposingPartyFormDataChange}
                    />
                  </div>
                </div>
                <div className='inputs-row labeled pb-20px'>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Municipality</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setOpposingPartyFormData({
                          ...opposingPartyFormData,
                          municipality: li.value
                        })
                      }
                      list={municipalities}
                      curListItem={opposingPartyFormData.municipality}
                    ></Dropdown>
                  </div>
                  <div className='inputs inputs-2-3'>
                    <label className='form-label mb-0'>Represented by</label>
                    <Dropdown
                      handleChange={(e, li) =>
                        setOpposingPartyFormData({
                          ...opposingPartyFormData,
                          representedBy: li.value
                        })
                      }
                      list={representedByList}
                      curListItem={opposingPartyFormData.representedBy}
                    ></Dropdown>
                  </div>
                </div>
              </div>

              {opposingPartyFormData && opposingPartyFormData.representedBy === 'Lawyer' && (
                <>
                  <div className='sub-heading pt-0'>
                    <img src={lawyer} alt='Lawyer' />
                    <span>Lawyer</span>
                  </div>

                  <div className='inputs-group pb-10px'>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Full Name*</label>
                        <InputCustom
                          type='text'
                          placeholder='Enter Name'
                          name='lawyerName'
                          value={opposingPartyFormData.lawyerName}
                          handleChange={handleOpposingPartyFormDataChange}
                        />
                      </div>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Postal Code</label>
                        <InputCustom
                          type='text'
                          placeholder='Write Postal code'
                          name='lawyerPostalCode'
                          value={opposingPartyFormData.lawyerPostalCode}
                          handleChange={handleOpposingPartyFormDataChange}
                        />
                      </div>
                    </div>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Address*</label>
                        <InputCustom
                          type='text'
                          placeholder='Write Address'
                          name='lawyerAddress'
                          value={opposingPartyFormData.lawyerAddress}
                          handleChange={handleOpposingPartyFormDataChange}
                        />
                      </div>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Phone*</label>
                        <InputCustom
                          type='text'
                          placeholder='Write Phone'
                          name='lawyerPhone'
                          value={opposingPartyFormData.lawyerPhone}
                          handleChange={handleOpposingPartyFormDataChange}
                        />
                      </div>
                    </div>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Municipality</label>
                        <Dropdown
                          handleChange={(e, li) =>
                            setOpposingPartyFormData({
                              ...clientFormData,
                              lawyerMunicipality: li.value
                            })
                          }
                          list={municipalities}
                          curListItem={opposingPartyFormData.lawyerMunicipality}
                        ></Dropdown>
                      </div>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Email*</label>
                        <InputCustom
                          type='email'
                          placeholder='Write Email'
                          name='lawyerEmail'
                          value={opposingPartyFormData.lawyerEmail}
                          handleChange={handleOpposingPartyFormDataChange}
                        />
                      </div>
                    </div>
                    <div className='inputs-row labeled pb-20px'>
                      <div className='inputs inputs-2-3'>
                        <label className='form-label mb-0'>Province*</label>
                        <Dropdown
                          handleChange={(e, li) =>
                            setOpposingPartyFormData({
                              ...clientFormData,
                              lawyerProvince: li.value
                            })
                          }
                          list={provinceList}
                          curListItem={opposingPartyFormData.lawyerProvince}
                        ></Dropdown>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default BackgroundInformationSimple
