import React from 'react';
import RadioChecks from '../../forms/shared/RadioChecks';
import BoldandThinText from '../../forms/shared/BoldandThinText';
import BorderLessInput from '../../forms/shared/BorderLessInput';

function PreviousCasesOrAgreements({ formData, fillFormData }) {

    const radioInput = (checked, change, label, id, name, value) => {
        return (
            <div className='mx-3'>
                <div class="px-6 form-check">
                    <input
                        name={name}
                        id={id}
                        value={value}
                        checked={checked === value}
                        onChange={fillFormData(`${change}`)}
                        type={"radio"}
                        className='form-check-input'
                    />
                    <label title="" for="previous_cases_no" class="form-check-label">
                        <span class="mx-1">{label}</span>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className=''>

            <BoldandThinText bold={"PREVIOUS CASES OR AGREEMENTS"} />

            <div>
                <BoldandThinText thin={`Have the parties of the children been in a court case before?`} />
                <div className='d-flex pb-10px'>
                {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.haveBeenInCourt,
                        'familyHistory.prevCaseOrAgreements.haveBeenInCourt',
                        'No',
                        'previous_cases_no',
                        'previous_cases',
                        'no')}
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.haveBeenInCourt,
                        'familyHistory.prevCaseOrAgreements.haveBeenInCourt',
                        'Yes',
                        'previous_cases_yes',
                        'previous_cases',
                        'yes')}
                </div>
            </div>
            <div className='pt-5'>

                <BoldandThinText
                    thin={` Have the parties made a written agreement dealing with any matter
                involved in this case?`}
                />
                <div className='d-flex pb-10px'>
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.haveWrittenAgreement?.checked,
                        'familyHistory.prevCaseOrAgreements.haveWrittenAgreement.checked',
                        'No',
                        'written_agreement_no',
                        'written_agreement',
                        'no')}
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.haveWrittenAgreement?.checked,
                        'familyHistory.prevCaseOrAgreements.haveWrittenAgreement.checked',
                        'Yes (Give date of agreement. Indicate which of its terms are in dispute.))',
                        'written_agreement_yes',
                        'written_agreement',
                        'yes')}

                </div>
                <div className='pb-3'>

                    <BorderLessInput
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'familyHistory.prevCaseOrAgreements.haveWrittenAgreement.details'}
                        value={formData?.familyHistory?.prevCaseOrAgreements?.haveWrittenAgreement?.details}
                        style={{ padding: "6px 0", width: "100%" }}

                    />
                </div>
            </div>


            <div>



                <BoldandThinText
                    thin={` Have a Notice of Calculation and/or a Notice of Recalculation been issued by the online Child Support Service in this case?`}
                />
                 <div className='d-flex pb-10px'>
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.haveNoticeOfCalculation?.checked,
                        'familyHistory.prevCaseOrAgreements.haveNoticeOfCalculation.checked',
                        'No',
                        'noticeOfCalculation_no',
                        'noticeOfCalculation',
                        'no')}
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.haveNoticeOfCalculation?.checked,
                        'familyHistory.prevCaseOrAgreements.haveNoticeOfCalculation.checked',
                        'Yes (Give date(s) of Notice(s) of Calculation or Recalculation.)',
                        'noticeOfCalculation_yes',
                        'noticeOfCalculation',
                        'yes')}
                </div>
                <div className='pb-3'>
                    <BorderLessInput
                        type={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'familyHistory.prevCaseOrAgreements.noticeOfCalculation.details'}
                        value={formData?.familyHistory?.prevCaseOrAgreements?.noticeOfCalculation?.details}
                        style={{ padding: "6px 0", width: "100%" }}

                    />

                </div>
            </div>







            <div>



                <BoldandThinText
                    thin={` If yes, are you asking the court to make an order for child support that is different from the amount set out in the Notice?`}
                />
               <div className='d-flex pb-10px'>
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.askingToMakeOrder?.checked,
                        'familyHistory.prevCaseOrAgreements.askingToMakeOrder.checked',
                        'No',
                        'askingToMakeOrder_no',
                        'askingToMakeOrder',
                        'no')}
                    {radioInput(
                        formData?.familyHistory?.prevCaseOrAgreements?.askingToMakeOrder?.checked,
                        'familyHistory.prevCaseOrAgreements.askingToMakeOrder.checked',
                        'Yes (Provide an explanation.)',
                        'askingToMakeOrder_yes',
                        'askingToMakeOrder',
                        'yes')}
                </div>

                <div className='pb-3'>
                    <BorderLessInput
                        type={"text"}
                        labelinput={"text"}
                        fileno
                        onChange={fillFormData}
                        update={'familyHistory.prevCaseOrAgreements.askingToMakeOrder.details'}
                        value={formData?.familyHistory?.prevCaseOrAgreements?.askingToMakeOrder?.details}
                        style={{ padding: "6px 0", width: "100%" }}

                    />


                </div>
            </div>


        </div>
    );
}

export default PreviousCasesOrAgreements;


