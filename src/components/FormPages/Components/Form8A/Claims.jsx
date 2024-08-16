import React from 'react'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import { Col, Row } from 'react-bootstrap'
import BorderedInput from '../../forms/shared/BorderedInput'
import CheckBox from '../../forms/shared/CheckBox'
import CurrencyFormat from 'react-currency-format';

const Claims = ({ formData, changeFormCheck, fillFormData }) => {
    return (
        <>

            <div className='border border-2 border-dark p-2'>
                <p className='sub-heading'>CLAIMS</p>
                <BoldandThinText bold={"USE THIS FRAME ONLY IF THIS CASE IS A JOINT APPLICATION FOR DIVORCE"} />
                <div className=' border-bottom border-2 border-dark'> </div>
                <BoldandThinText bold={"WE JOINTLY ASK THE COURT FOR THE FOLLOWING:"} />
                <div>
                    <Row className='pb-4 pt-2'>

                        <Col xs={4}>
                            <BoldandThinText bold={"Claims under the Divorce Act"} />
                            <div className='d-flex gap-2'>
                                <span>00</span>
                                <CheckBox
                                    name={"a_divorce"}
                                    id={"a_divorce"}
                                    label={"A Divorce"}
                                    value={"simple"}
                                    checked={formData?.claims?.divorceAct?.divorce?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.divorceAct.divorce.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>01</span>
                                <CheckBox
                                    name={"spousal_support"}
                                    id={"spousal_support"}
                                    label={"spousal support"}
                                    checked={formData?.claims?.divorceAct?.spousalSupport?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.divorceAct.spousalSupport.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>02</span>
                                <CheckBox
                                    name={"child_support02"}
                                    id={"child_support02"}
                                    label={"A support for child(ren) - table amount"}
                                    checked={formData?.claims?.divorceAct?.supportForChildrenTableAmount?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.divorceAct.supportForChildrenTableAmount.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>03</span>
                                <CheckBox
                                    name={"child_support03"}
                                    id={"child_support03"}
                                    label={" a support for child(ren) - other than table amount"}
                                    checked={formData?.claims?.divorceAct?.supportForChildrenOtherThanTableAmount?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.divorceAct.supportForChildrenOtherThanTableAmount.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>04</span>
                                <CheckBox
                                    name={"decision_making"}
                                    id={"decision_making"}
                                    label={"decision-making responsibility for child(ren)"}
                                    checked={formData?.claims?.divorceAct?.decisionMakingResponsibility?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.divorceAct.decisionMakingResponsibility.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>05</span>
                                <CheckBox
                                    name={"parenting_time"}
                                    id={"parenting_time"}
                                    label={"parenting time for child(ren)"}
                                    checked={formData?.claims?.divorceAct?.parentingTime?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.divorceAct.parentingTime.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                        </Col>

                        <Col xs={4}>
                            <BoldandThinText bold={"Claims under the Family Law Act or Children's Law Reform Act"} />
                            <div className='d-flex gap-2'>
                                <span>10</span>
                                <CheckBox
                                    name={"spousal_support10"}
                                    id={"spousal_support10"}
                                    label={"spousal support"}
                                    checked={formData?.claims?.familyAct?.spousalSupport?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.spousalSupport.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>11</span>
                                <CheckBox
                                    name={"child_support11"}
                                    id={"child_support11"}
                                    label={"a support for child(ren) - table amount"}
                                    checked={formData?.claims?.familyAct?.supportForChildrenTableAmount?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.supportForChildrenTableAmount.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>12</span>
                                <CheckBox
                                    name={"child_support12"}
                                    id={"child_support12"}
                                    label={"a support for child(ren) - other than table amount"}
                                    checked={formData?.claims?.familyAct?.supportForChildrenOtherThanTableAmount?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.supportForChildrenOtherThanTableAmount.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>13</span>
                                <CheckBox
                                    name={"decision_making13"}
                                    id={"decision_making13"}
                                    label={"decision-making responsibility for child(ren)"}
                                    checked={formData?.claims?.familyAct?.decisionMakingResponsibility?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.decisionMakingResponsibility.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>14</span>
                                <CheckBox
                                    name={"parenting_time14"}
                                    id={"parenting_time14"}
                                    label={"parenting time for child(ren)"}
                                    checked={formData?.claims?.familyAct?.parentingTime?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.parentingTime.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>15</span>
                                <CheckBox
                                    name={"restraining"}
                                    id={"restraining"}
                                    label={"restraining/non-harassment order"}
                                    checked={formData?.claims?.familyAct?.restraining?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.restraining.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>16</span>
                                <CheckBox
                                    name={"indexing_spousal_support"}
                                    id={"indexing_spousal_support"}
                                    label={"indexing spousal support"}
                                    checked={formData?.claims?.familyAct?.indexingSpousalSupport?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.indexingSpousalSupport.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>17</span>
                                <CheckBox
                                    name={"declaration_of_parentage"}
                                    id={"declaration_of_parentage"}
                                    label={"declaration of parentage"}
                                    checked={formData?.claims?.familyAct?.declarationOfParentage?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.declarationOfParentage.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                            <div className='d-flex gap-2'>
                                <span>18</span>
                                <CheckBox
                                    name={"guardianship"}
                                    id={"guardianship"}
                                    label={"guardianship over child's property"}
                                    checked={formData?.claims?.familyAct?.guardianship?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.familyAct.guardianship.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>
                        </Col>



                        <Col xs={4}>
                            <BoldandThinText bold={"Claims relating to property"} />

                            <div className='d-flex gap-2'>
                                <span>20</span>
                                <CheckBox
                                    name={"spousal_support20"}
                                    id={"spousal_support20"}
                                    label={"equalization of net family properties"}
                                    checked={formData?.claims?.property?.eqalizationOfNetFamilyProperties?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.property.eqalizationOfNetFamilyProperties.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>21</span>
                                <CheckBox
                                    name={"child_support21"}
                                    id={"child_support21"}
                                    label={"exclusive possession of matrimonial home"}
                                    checked={formData?.claims?.property?.exclusivePossessionOfMatrimonialHome?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.property.exclusivePossessionOfMatrimonialHome.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>22</span>
                                <CheckBox
                                    name={"child_support22"}
                                    id={"child_support22"}
                                    label={"exclusive possession of contents of matrimonial home"}
                                    checked={formData?.claims?.property?.exclusivePossessionOfContentsOfMatrimonialHome?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.property.exclusivePossessionOfContentsOfMatrimonialHome.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>23</span>
                                <CheckBox
                                    name={"decision_making23"}
                                    id={"decision_making23"}
                                    label={"freezing assets"}
                                    checked={formData?.claims?.property?.freezingAssets?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.property.freezingAssets.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>24</span>
                                <CheckBox
                                    name={"parenting_time24"}
                                    id={"parenting_time24"}
                                    label={"sale of family property"}
                                    checked={formData?.claims?.property?.saleOfFamilyProperty?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.property.saleOfFamilyProperty.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>


                            <BoldandThinText bold={"Other claims"} />

                            <div className='d-flex gap-2'>
                                <span>30</span>
                                <CheckBox
                                    name={"costs"}
                                    id={"costs"}
                                    label={"costs"}
                                    checked={formData?.claims?.other?.costs?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.other.costs.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>31</span>
                                <CheckBox
                                    name={"annulment_of_marriage"}
                                    id={"annulment_of_marriage"}
                                    label={"annulment of marriage"}
                                    checked={formData?.claims?.other?.annulment?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.other.annulment.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>32</span>
                                <CheckBox
                                    name={"prejudgment_interest"}
                                    id={"prejudgment_interest"}
                                    label={"prejudgment interest"}
                                    checked={formData?.claims?.other?.prejudgement?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.other.prejudgement.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                            <div className='d-flex gap-2'>
                                <span>50</span>
                                <CheckBox
                                    name={"other_other_claims"}
                                    id={"other_other_claims"}
                                    label={"Other (specify)"}
                                    checked={formData?.claims?.other?.other?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"claims.other.other.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                        </Col>
                    </Row>


                </div>
            </div>

            <div className='border border-2 border-dark mt-20px p-2'>
                <BoldandThinText bold={"USE THIS FRAME ONLY IF THE APPLICANT'S ONLY CLAIM IN THIS CASE IS FOR DIVORCE."} />
                <div className=' border-bottom border-2 border-dark'> </div>
                <BoldandThinText bold={"I ASK THE COURT FOR:"} />
                <BoldandThinText thin={"(Check if applicable.)"} italic />
                <div>
                    <Row>
                        <Col xs={4}>

                            <div className='d-flex gap-2'>
                                <span>00</span>
                                <CheckBox
                                    name={"a_divorce"}
                                    id={"a_divorce22"}
                                    label={"a Divorce"}
                                    checked={formData?.applicantsOnlyClaim?.divorce?.checked}
                                    fillFormData={changeFormCheck}
                                    labelinput={"applicantsOnlyClaim.divorce.checked"}
                                    type={"checkbox"}
                                    checkbox
                                />
                            </div>

                        </Col>

                        <Col xs={8}>
                            <div className='d-flex gap-2'>
                                <span>30</span>
                                <div className='form-check d-flex flex-row w-100'>
                                    <CheckBox
                                        name={"costs2"}
                                        id={"costs2"}
                                        label={"Costs"}
                                        checked={formData?.applicantsOnlyClaim?.costs?.checked}
                                        fillFormData={changeFormCheck}
                                        labelinput={"applicantsOnlyClaim.costs.checked"}
                                        type={"checkbox"}
                                        checkbox
                                    />

                                    <div className='data-group w-100 ml-10px'>
                                        <CurrencyFormat
                                            className='form-control'
                                            disabled={false}
                                            value={formData?.applicantsOnlyClaim?.costsDescription}
                                            thousandSeparator={true}
                                            onChange={fillFormData('applicantsOnlyClaim.costsDescription')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Claims