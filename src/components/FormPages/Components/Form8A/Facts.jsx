import React from 'react'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import DynamicTextArea from '../../forms/shared/TextArea'

const Facts = ({ formData, changeFormCheck, fillFormData }) => {
  return (
    <>
      <div className='row  mt-40px'>
        <p className='sub-heading'>
          IMPORTANT FACTS SUPPORTING THE CLAIM FOR DIVORCE
        </p>

        <div className='d-flex flex-row gap-4'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='separation_fact'
              id='separation_fact'
              checked={formData?.importantFacts?.separation?.checked === true}
              onChange={changeFormCheck('importantFacts.separation.checked')}
            />
            <label className='form-check-label small' htmlFor='separation_fact'>
              <b>Separation: </b>
              The spouses have lived separate and apart since (date)
            </label>
          </div>
          <div className='data-input'>
            <input
              type='date'
              className='form-control'
              value={formData?.importantFacts?.separation?.date}
              onChange={fillFormData('importantFacts.separation.date')}
            />
          </div>
          <span className='small'>and</span>
        </div>

        <div className=''>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='not_lived_fact'
              id='not_lived_fact'
              checked={
                formData?.importantFacts?.separation?.haveNotLivedTogether === true
              }
              onChange={changeFormCheck(
                'importantFacts.separation.haveNotLivedTogether'
              )}
            />
            <label className='form-check-label small' htmlFor='not_lived_fact'>
              have not lived together again since that date in an unsuccessful
              attempt at reconcile.
            </label>
          </div>
        </div>

        <div className=''>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='have_lived_fact'
              id='have_lived_fact'
              checked={
                formData?.importantFacts?.separation?.haveLivedTogether === true
              }
              onChange={changeFormCheck(
                'importantFacts.separation.haveLivedTogether'
              )}
            />
            <label className='form-check-label small' htmlFor='have_lived_fact'>
              have lived toghether again during the following period(s) in an
              unsuccessful attempt at reconcile: (Give dates.)
            </label>
          </div>
          <div className='data-input'>
            <input
              type='text'
              className='form-control'
              value={
                formData?.importantFacts?.separation?.haveLivedTogetherDescription
              }
              onChange={fillFormData(
                'importantFacts.separation.haveLivedTogetherDescription'
              )}
            />
          </div>
        </div>

        <div className='d-flex flex-row gap-4 mt-20px'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='adultry_fact'
              id='adultry_fact'
              checked={formData?.importantFacts?.adultry?.checked === true}
              onChange={changeFormCheck('importantFacts.adultry.checked')}
            />
            <label
              className='form-check-label text-nowrap small'
              htmlFor='adultry_fact'
            >
              <b>Adultery: </b>
              (Name of spouse)
            </label>
          </div>
          <div className='data-input w-100'>
            <input
              type='text'
              className='form-control'
              value={formData?.importantFacts?.adultry?.nameOfSpouse}
              onChange={fillFormData('importantFacts.adultry.nameOfSpouse')}
            />
          </div>
          <span className='text-nowrap small'>has committed Adultery</span>
        </div>

        <p className='paragraph fst-italic small'>
          (Give details. It is not necessary to name any other person involved
          but if you do name the other person, then you must serve this
          application on that person.)
        </p>
        <DynamicTextArea
          rows={5}
          formData={formData}
          updates={'importantFacts.adultry.details'}
          fillFormData={fillFormData}
          value={formData?.importantFacts?.adultry?.details}
        />


        <div className='d-flex flex-row gap-4 mt-20px'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='cruelty_fact'
              id='cruelty_fact'
              checked={formData?.importantFacts?.cruelty?.checked === true}
              onChange={changeFormCheck('importantFacts.cruelty.checked')}
            />
            <label
              className='form-check-label text-nowrap small'
              htmlFor='cruelty_fact'
            >
              <b>Cruelty: </b>
              (Name of spouse)
            </label>
          </div>
          <div className='data-input w-100'>
            <input
              type='text'
              className='form-control'
              value={formData?.importantFacts?.cruelty?.nameOfSpouse}
              onChange={fillFormData('importantFacts.cruelty.nameOfSpouse')}
            />
          </div>
          <span className='text-nowrap small'>has treated (name of spouse)</span>
          <div className='data-input w-100'>
            <input
              type='text'
              className='form-control'
              value={formData?.importantFacts?.cruelty?.hasTreatedNameOfSpouse}
              onChange={fillFormData(
                'importantFacts.cruelty.hasTreatedNameOfSpouse'
              )}
            />
          </div>
        </div>


        <BoldandThinText thin={`with physical or mental cruelty of such a kind as to make continued
              cohabitation intolerable. (Give details.)`} />
        <DynamicTextArea
          rows={3}
          updates={'importantFacts.cruelty.details'}
          fillFormData={fillFormData}
          value={formData?.importantFacts?.cruelty?.details}
        />


      </div>

    </>
  )
}

export default Facts