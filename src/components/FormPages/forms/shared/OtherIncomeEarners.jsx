const OtherIncomeEarners = ({title,description,formData, fillFormData, changeFormCheck }) => {

    return (
        <>
         <div className='row pb-20px pl-40px'>
            <p className='sub-heading'>{title}</p>

            <p className='paragraph fst-italic'>
             {description}
            </p>

            <ol>
              <li>
                <div className='d-flex flex-row'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='living_status_alone'
                      value='alone'
                      id='alone'
                      checked={formData?.otherIncomeEarners.liveAlone === true}
                      onChange={changeFormCheck('otherIncomeEarners.liveAlone')}
                    />
                    <label className='form-check-label text-nowrap' htmlFor='alone'>
                      I live alone.
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className='d-flex flex-row'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='living_status_partner'
                      value='partner'
                      id='partner'
                      checked={formData?.otherIncomeEarners.isLivingWith === true}
                      onChange={changeFormCheck('otherIncomeEarners.isLivingWith')}
                    />
                    <label
                      className='form-check-label text-nowrap'
                      htmlFor='partner'
                    >
                      I am living with (full legal name of person you are married to
                      or cohabiting with)
                    </label>
                  </div>
                  <div className='data-input w-100'>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.otherIncomeEarners.livingWith}
                      onChange={fillFormData('otherIncomeEarners.livingWith')}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className='d-flex flex-row'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='living_status_children'
                      value='children'
                      id='children'
                      checked={formData?.otherIncomeEarners.isAdults === true}
                      onChange={changeFormCheck('otherIncomeEarners.isAdults')}
                    />
                    <label
                      className='form-check-label text-nowrap'
                      htmlFor='children'
                    >
                      I/we live with the following other adults(s):
                    </label>
                  </div>
                  <div className='data-input w-100'>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.otherIncomeEarners.adults}
                      onChange={fillFormData('otherIncomeEarners.adults')}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className='d-flex flex-row'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='living_status_no_of_children'
                      value='no_of_children'
                      id='no_of_children'
                      checked={formData?.otherIncomeEarners.isChildren === true}
                      onChange={changeFormCheck('otherIncomeEarners.isChildren')}
                    />
                    <label
                      className='form-check-label text-nowrap'
                      htmlFor='no_of_children'
                    >
                      I/we have (give number)
                    </label>
                  </div>
                  <div className='data-input'>
                    <input
                      type='text'
                      className='custom-input-control'
                      value={formData?.otherIncomeEarners.children}
                      onChange={fillFormData('otherIncomeEarners.children')}
                    />
                  </div>
                  <span className='paragraph mb-0'>
                    child(ren) who live(s) in the home.
                  </span>
                </div>
              </li>
              <li>
                <p className='paragraph'>My spouse/partner</p>
                <div className='pl-40px'>
                  <div className='d-flex flex-row'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='partner_works'
                        value='yes'
                        id='partner_works'
                        checked={
                          formData?.otherIncomeEarners.partner.isWorks === 'yes'
                        }
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.isWorks'
                        )}
                      />
                      <label
                        className='form-check-label text-nowrap'
                        htmlFor='partner_works'
                      >
                        works at (place of work or business)
                      </label>
                    </div>
                    <div className='data-input'>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.otherIncomeEarners.partner.worksAt}
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.worksAt'
                        )}
                      />
                    </div>
                  </div>
                  <div className='d-flex flex-row'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='partner_works'
                        value='no'
                        id='partner_not_works'
                        checked={
                          formData?.otherIncomeEarners.partner.isWorks === 'no'
                        }
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.isWorks'
                        )}
                      />
                      <label
                        className='form-check-label text-nowrap'
                        htmlFor='partner_not_works'
                      >
                        does not work outside the home.
                      </label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <p className='paragraph'>My spouse/partner</p>
                <div className='pl-40px'>
                  <div className='d-flex flex-row'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='partner_earns'
                        value='yes'
                        id='partner_earns'
                        checked={
                          formData?.otherIncomeEarners.partner.isEarns === 'yes'
                        }
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.isEarns'
                        )}
                      />
                      <label
                        className='form-check-label text-nowrap'
                        htmlFor='partner_earns'
                      >
                        earns (give amount) $
                      </label>
                    </div>
                    <div className='data-input'>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.otherIncomeEarners.partner.earns}
                        onChange={fillFormData('otherIncomeEarners.partner.earns')}
                      />
                    </div>
                    <span className='paraphaph mb-0'>per</span>
                    <div className='data-input'>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.otherIncomeEarners.partner.earnsPer}
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.earnsPer'
                        )}
                      />
                    </div>
                  </div>
                  <div className='d-flex flex-row'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='partner_earns'
                        value='no'
                        id='partner_not_earns'
                        checked={
                          formData?.otherIncomeEarners.partner.isEarns === 'no'
                        }
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.isEarns'
                        )}
                      />
                      <label
                        className='form-check-label text-nowrap'
                        htmlFor='partner_not_earns'
                      >
                        does not earn any income.
                      </label>
                    </div>
                  </div>
                </div>
              </li>

              <li>

                  <div className='d-flex flex-row'>
                    <span className='paragraph mb-0'>
                      My spouse/partner or other adult residing in the home
                      contributions about $
                    </span>
                    <div className='data-input'>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.otherIncomeEarners.partner.contributions}
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.contributions'
                        )}
                      />
                    </div>
                    <span className='parapraph mb-0'>per</span>
                    <div className='data-input'>
                      <input
                        type='text'
                        className='custom-input-control'
                        value={formData?.otherIncomeEarners.partner.contributionsPer}
                        onChange={fillFormData(
                          'otherIncomeEarners.partner.contributionsPer'
                        )}
                      />
                    </div>
                  </div>
                  <p className='paragraph'>towards the household expenses.</p>

              </li>
            </ol>
          </div>
        </>
    )
}


export default OtherIncomeEarners