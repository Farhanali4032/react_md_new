import React from 'react'
import BoldandThinText from '../../forms/shared/BoldandThinText'
import { Col, Row } from 'react-bootstrap'
import RadioChecks from '../../forms/shared/RadioChecks'
import CheckBox from '../../forms/shared/CheckBox'

const Claims8 = ({ formData, changeFormCheck, fillFormData }) => {

  return (
    <>
      <div className='py-5'></div>
      <BoldandThinText centered bold={"CLAIM BY APPLICANT"} />

      <BoldandThinText bold={"I ASK THE COURT FOR THE FOLLOWING:"} />
      <BoldandThinText thin={"(Claims below include claims for temporary orders.)"} />

      <div className='border border-2 border-dark px-3'>
        <div>
          <Row className='pb-4'>

            <Col xs={4} className='px-0'>
              <div >
                <div style={{ borderBottom: "1px solid black", minHeight: "165px" }}>
                  <BoldandThinText centered bold={"Claims under the Divorce Act"} />
                  <BoldandThinText centered thin={"(Check boxes in this column only if you are asking for a divorce and your case is in the Superior Court of Justice or Family Court of the Superior Court of Justice."} />
                </div>
                <div className='px-3' style={{ minHeight: "500px", borderBottom: "1px solid black" }}>

                  <div className='d-flex gap-2'>
                    <span>00</span>
                    <CheckBox
                      label={"a divorce"}
                      labelinput={"familyHistory.claims.divorceAct.divorce.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.divorce?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.divorce?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>01</span>
                    <CheckBox
                      label={"support for me"}
                      labelinput={"familyHistory.claims.divorceAct.spousalSupport.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.spousalSupport?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.spousalSupport?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>02</span>
                    <CheckBox
                      label={"support for child(ren) - table amount"}
                      labelinput={"familyHistory.claims.divorceAct.supportForChildrenTableAmount.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenTableAmount?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenTableAmount?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>03</span>
                    <CheckBox
                      label={"support for child(ren) - other than table amount"}
                      labelinput={"familyHistory.claims.divorceAct.supportForChildrenOtherThanTableAmount.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenOtherThanTableAmount?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.supportForChildrenOtherThanTableAmount?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>04</span>
                    <CheckBox
                      label={"decision-making responsibility for child(ren)"}
                      labelinput={"familyHistory.claims.divorceAct.decisionMakingResponsibility.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.decisionMakingResponsibility?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.decisionMakingResponsibility?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                  <div className='d-flex gap-2'>
                    <span>05</span>
                    <CheckBox
                      label={"parenting time for child(ren)"}
                      labelinput={"familyHistory.claims.divorceAct.parentingTime.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.parentingTime?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.parentingTime?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>06</span>
                    <CheckBox
                      label={"contact with child(ren) (this requires court leave)"}
                      labelinput={"familyHistory.claims.divorceAct.contact_with_children.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.divorceAct?.contact_with_children?.checked || false}
                      checked={formData?.familyHistory?.claims?.divorceAct?.contact_with_children?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                </div>
              </div>

            </Col>

            <Col xs={4} className='px-0'>
              <div className='' >
                <div style={{ borderLeft: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black", minHeight: "165px" }}>
                  <BoldandThinText centered bold={"Claims relating to property"} />
                  <BoldandThinText centered thin={"(Check boxes in this column only if your case is in the Superior Court of Justice For Family Court of the superior court of justice "} />
                </div>
                <div className='p-2' style={{ minHeight: "500px", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>

                  <div className='d-flex gap-2'>
                    <span>22</span>
                    <CheckBox
                      label={"equalization of net family properties"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.property.equalizationFamilyProperties.checked"}
                      value={formData?.familyHistory?.claims?.property?.equalizationFamilyProperties?.checked || false}
                      checked={formData?.familyHistory?.claims?.property?.equalizationFamilyProperties?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>23</span>
                    <CheckBox
                      label={"exclusive possession of matrimonial home"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.property.exclusive_possession.checked"}
                      value={formData?.familyHistory?.claims?.property?.exclusive_possession?.checked || false}
                      checked={formData?.familyHistory?.claims?.property?.exclusive_possession?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>24</span>
                    <CheckBox
                      label={"exclusive possession of contents of  matrimonial home"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.property.possession_of_contents.checked"}
                      value={formData?.familyHistory?.claims?.property?.possession_of_contents?.checked || false}
                      checked={formData?.familyHistory?.claims?.property?.possession_of_contents?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>25</span>
                    <CheckBox
                      label={"freezing assets"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.property.freezing_assets.checked"}
                      value={formData?.familyHistory?.claims?.property?.freezing_assets?.checked || false}
                      checked={formData?.familyHistory?.claims?.property?.freezing_assets?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>26</span>
                    <CheckBox
                      label={"sale of family property"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.property.sale_of_family_property.checked"}
                      value={formData?.familyHistory?.claims?.property?.sale_of_family_property?.checked || false}
                      checked={formData?.familyHistory?.claims?.property?.sale_of_family_property?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                </div>
              </div>
            </Col>
            <Col xs={4} className='px-0'>
              <div className='' >
                <div style={{ borderBottom: "1px solid black", minHeight: "165px" }}>
                  <BoldandThinText centered bold={"Claims relating to child protection"} />
                </div>
                <div className='p-2' style={{ minHeight: "500px", borderBottom: "1px solid black" }}>

                  <div className='d-flex gap-2'>
                    <span>40</span>
                    <CheckBox
                      label={"access"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act.sale_of_family_property.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act?.access?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act?.access?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>41</span>
                    <CheckBox
                      label={"lesser protection order"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act.lesser_protection.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act?.lesser_protection?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act?.lesser_protection?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>42</span>
                    <CheckBox
                      label={"return of  child(ren) to my care"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act.lesser_protection.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act?.return_children?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act?.return_children?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>43</span>
                    <CheckBox
                      label={"Place child(ren) into care of (name)"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act.lesser_protection.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act?.place_in_care?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act?.place_in_care?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    /> 
                   
                  </div>
                  <div className='d-flex gap-2'>
                    <span>44</span>
                    <CheckBox
                      label={"Interim society care and custody for"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act.interim_care.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act?.interim_care?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act?.interim_care?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                    <div class="data-input"><input type="text" class="form-control" value="" /><label>months</label></div>
                  </div>
                  <div className='d-flex gap-2'>
                    <span>15</span>
                    <CheckBox
                      label={"society supervision  child(ren) for months"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act.society_supervision.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act?.society_supervision?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act?.society_supervision?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                </div>
              </div>
            </Col>

            <Col xs={4} className='px-0'>
              <div >
                <div style={{ borderBottom: "1px solid black", minHeight: "110px" }}>
                  <BoldandThinText centered bold={"Claims under the Family Law Act or Children's Law Reform Act"} />
                </div>
                <div className='px-1' style={{ minHeight: "900px", borderBottom: "1px solid black" }}>

                  <div className='d-flex gap-2'>
                    <span>10</span>
                    <CheckBox
                      label={"support for me"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act_reform.support_for_me.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_me?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_me?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>11</span>
                    <CheckBox
                      label={"support for child(ren) - table amount"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act_reform.support_for_children.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>12</span>
                    <CheckBox
                      type={"checkbox"}
                      label={"support for child(ren) - other than table amount"}
                      labelinput={"familyHistory.claims.family_child_act_reform.support_for_children_other.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children_other?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.support_for_children_other?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>13</span>
                    <CheckBox
                      type={"checkbox"}
                      label={"decision-making responsibility for child(ren)"}
                      labelinput={"familyHistory.claims.family_child_act_reform.support_for_children_other.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.responsibility_for_child?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.responsibility_for_child?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>14</span>
                    <CheckBox
                      type={"checkbox"}
                      label={"parenting time with child(ren)"}
                      labelinput={"familyHistory.claims.family_child_act_reform.parenting_time.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.parenting_time?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.parenting_time?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                  <div className='d-flex gap-2'>
                    <span>15</span>
                    <CheckBox
                      label={"restraining/non-harassment order"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act_reform.restraining_order.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.restraining_order?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.restraining_order?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>16</span>
                    <CheckBox
                      label={"indexing spousal support"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act_reform.spousal_support.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.spousal_support?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.spousal_support?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                  <div className='d-flex gap-2'>
                    <span>17</span>
                    <CheckBox
                      label={"declaration of parentage"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act_reform.parentage.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.parentage?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.parentage?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>18</span>
                    <CheckBox
                      label={"guardianship over child's property"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.family_child_act_reform.guardianship.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.guardianship?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.guardianship?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>19</span>
                    <CheckBox
                      type={"checkbox"}
                      label={"contact with child(ren) (this does not require court leave)"}
                      labelinput={"familyHistory.claims.family_child_act_reform.guardianship.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.contact_with_child?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.contact_with_child?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                  <div className='d-flex gap-2'>
                    <span>20</span>
                    <CheckBox
                      type={"checkbox"}
                      label={"Wrongful removal to or retention of child(ren) in Ontario involving a country outside Canada under the Convention on the Civil Aspects of International Child Abduction"}
                      labelinput={"familyHistory.claims.family_child_act_reform.wrongful_removal.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>21</span>
                    <CheckBox
                      type={"checkbox"}
                      label={"Wrongful removal to or retention of child(ren) in Ontario involving a country outside Canada NOT under the Convention on the Civil Aspects of International Child Abduction"}
                      labelinput={"familyHistory.claims.family_child_act_reform.wrongful_removal_not.checked"}
                      value={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal_not?.checked || false}
                      checked={formData?.familyHistory?.claims?.family_child_act_reform?.wrongful_removal_not?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                </div>
              </div>

            </Col>

            <Col xs={4} className='px-0'>
              <div className='' >
                <div style={{ borderLeft: "1px solid black", borderRight: "1px solid black", borderBottom: "1px solid black", minHeight: "110px", }}>
                  <BoldandThinText centered bold={"Other Claims"} />
                </div>
                <div className='p-2' style={{ minHeight: "900px", borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black" }}>

                  <div className='d-flex gap-2'>
                    <span>30</span>
                    <CheckBox
                      label={"Costs"}
                      labelinput={"familyHistory.claims.other_claims.costs.checked"}
                      type={"checkbox"}
                      value={formData?.familyHistory?.claims?.other_claims?.costs?.checked || false}
                      checked={formData?.familyHistory?.claims?.other_claims?.costs?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>31</span>
                    <CheckBox
                      label={"Annulment of marriage"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.other_claims.costs.checked"}
                      value={formData?.familyHistory?.claims?.other_claims?.annulment?.checked || false}
                      checked={formData?.familyHistory?.claims?.other_claims?.annulment?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>32</span>
                    <CheckBox
                      label={"Prejudgement interest"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.other_claims.costs.checked"}
                      value={formData?.familyHistory?.claims?.other_claims?.prejudgement?.checked || false}
                      checked={formData?.familyHistory?.claims?.other_claims?.prejudgement?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>
                  <div className='d-flex gap-2'>
                    <span>33</span>
                    <CheckBox
                      label={"claims relating to a family arbitration"}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.other_claims.costs.checked"}
                      value={formData?.familyHistory?.claims?.other_claims?.family_arbitration?.checked || false}
                      checked={formData?.familyHistory?.claims?.other_claims?.family_arbitration?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                </div>
              </div>
            </Col>

            <Col xs={4} className='px-0'>
              <div className='' >
                <div style={{ borderBottom: "1px solid black", minHeight: "110px" }}>
                  <BoldandThinText centered bold={"Other (specify)"} />
                </div>
                <div className='p-2' style={{ minHeight: "900px", borderBottom: "1px solid black" }}>

                  <div className='d-flex gap-2'>
                    <span>50</span>
                    <CheckBox
                      label={""}
                      type={"checkbox"}
                      labelinput={"familyHistory.claims.others.checked"}
                      value={formData?.familyHistory?.claims?.others?.checked || false}
                      checked={formData?.familyHistory?.claims?.familothersy_child_act?.checked || false}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                    />
                  </div>

                </div>
              </div>
            </Col>
          </Row>




        </div>
      </div>

      <BoldandThinText italic thin="Give details of the order that you want the court to make. (Include any amounts of support (if known) and the names of the children for whom support, custody or access is claimed.)" />


    </>
  )
}

export default Claims8