import React from 'react'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import DynamicTextArea from '../../forms/shared/TextArea'
import HeadingSeperator from '../../forms/shared/Seperator'

const FinancialInstructions = ({ formData, changeFormCheck, fillFormData }) => {
    return (
        <>
            <div className='row pl-40px'>
                <p className='sub-heading'>INSTRUCTIONS: Financial Statement</p>
                <HeadingSeperator />
                <div className='paragraph'>

                    <p className='paragraph'>COMPLETE A FINANCIAL STATEMENT (Form 13) IF:</p>
                    <ul>
                        <li>
                            you are responding to a claim for spousal support; or
                        </li>
                        <li>
                            you are responding to a claim for child support.
                        </li>
                    </ul>

                    <p className='paragraph'>You must complete all parts of the form <strong>UNLESS</strong> you are <strong>ONLY</strong> responding to a claim for child support in the table amount
                        specified under the Child Support Guidelines <strong>AND</strong> you agree with the claim. In that case, only complete Parts 1, 2 and 3.</p>


                    <p className='paragraph'>
                        COMPLETE A FINANCIAL STATEMENT (Form 13.1) IF:
                    </p>

                    <ul>
                        <li>
                            you are making or responding to a claim for property or exclusive possession of the matrimonial home and its contents; or
                        </li>
                        <li>
                            you are making or responding to a claim for property or exclusive possession of the matrimonial home and its contents
                            together with other claims for relief.
                        </li>
                    </ul>

                </div>
                {/* Separator */}
               <HeadingSeperator />
            </div>

        </>
    )
}

export default FinancialInstructions