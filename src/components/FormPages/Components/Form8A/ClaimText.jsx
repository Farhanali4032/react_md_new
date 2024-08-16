import React from "react";
import RadioChecks from "../../forms/shared/RadioChecks";
import Listings from "../../forms/shared/FormListings";
import BoldandThinText from "../../forms/shared/BoldandThinText";
import CheckBox from "../../forms/shared/CheckBox";

const ClaimText = ({ fillFormData, formData, changeFormCheck }) => {
    const certificateitems = [
        [
            {
                text: `If you want to make a claim for support but do not want to make a claim for property or exclusive possession of the matrimonial home and its contents, you MUST fill out a Financial Statement (Form 13), serve a copy on the applicant(s) and file a copy in the court office.`,
                isLink: false,
            },
        ],
        [
            {
                text: "However, if your only claim for support is for child support in the table amount specified under the Child Support Guidelines, you do not need to fill out, serve or file a Financial Statement.",
                isLink: false,
            },
        ],
        [
            {
                text: `If you want to make a claim for property or exclusive possession of the matrimonial home and its contents, whether or not it includes a claim for support, you MUST fill out a Financial Statement (Form 13.1, not Form 13), serve a copy on the applicant(s), and file a copy in the court office.`,
                isLink: false,
            },
        ],
    ];
    return (
        <>
            <div className="border border-2 border-dark mb-2 px-2 py-2">
                {/* <div className="form-check mb-1"> */}
                <CheckBox
                      label={" IN THIS CASE, THE APPLICANTE IS CLAIMING A DIVORCE ONLY."}
                      labelinput={"applicationClaim"}
                      type={"checkbox"}
                      value={formData?.applicationClaim || false}
                      checked={formData?.applicationClaim}
                      fillFormData={changeFormCheck}
                      checkbox={true}
                      isBold
                      defaultPadding
                    />
                {/* </div> */}
                <BoldandThinText
                    bold={` TO THE RESPONDENT(S): A COURT CASE FOR DIVORCE HAS BEEN STARTED
                            AGAINST YOU IN THIS COURT. THE DETAILS ARE SET OUT ON THE ATTACHED
                            PAGES.`}
                />

                <BoldandThinText
                    bold={`THIS CASE IS ON THE STANDARD TRACK OF THE CASE MANAGEMENT SYSTEM.
                            No court date has been set for this case`}
                    thin={`  but, if you have been served with a notice of motion, it has a court
                    date and you or your lawyer should come to court for the motion. A
                    case management judge will not be assigned until one of the parties
                    asks the clerk of the court to schedule a case conference or until a
                    motion is scheduled, whichever comes first.`}
                />
                <BoldandThinText
                    bold={`IF, AFTER 365 DAYS, THE CASE HAS NOT BEEN SCHEDULED FOR TRIAL,`}
                    thin={` the clerk of the court will send out a warning that the case will be
                            dismissed within 60 days unless the parties file proof that the case
                            has been settled or one of the parties asks for a case or a
                            settlement conference.`}
                />

                <BoldandThinText
                    bold={`IF YOU WANT TO OPPOSE ANY CLAIM IN THIS CASE,`}
                    thin={`  you or your lawyer must prepare an Answer (Form 10 - a blank copy
                            should be attached), serve a copy on the applicant and file a copy
                            in the court office with an Affidavit of Service (Form 6B).`}
                    secondbold={`YOU HAVE ONLY 30 DAYS AFTER THIS APPLICATION IS SERVED ON YOU (60
                                DAYS IF THIS APPLICATION IS SERVED ON YOU OUTSIDE CANADA OR THE
                                UNITED STATES) TO SERVE AND FILE AN ANSWER. IF YOU DO NOT, THE
                                CASE WILL GO AHEAD WITHOUT YOU AND THE COURT MAY MAKE AN ORDER AND
                                ENFORCE IT AGAINST YOU.`}
                />

                <BoldandThinText
                    bold={`IF YOU WANT TO MAKE A CLAIM OF YOUR OWN,`}
                    thin={`you or your lawyer must fill out the claim portion in the Answer,
serve a copy on the applicant(s) and file a copy in the court office
with an Affidavit of Service.`}
                />
                <Listings items={certificateitems} />

                <BoldandThinText
                    bold={`YOU SHOULD GET LEGAL ADVICE ABOUT THIS CASE RIGHT AWAY.`}
                    thin={`If you cannot afford a lawyer, you may be able to get help from your
                    local Legal Aid Ontario office.`}
                    link={"https://www.legalaid.on.ca/"}
                    linktext={"(Go to www.legalaid.on.ca/.)"}
                />
            </div>

            <div className="border border-2 border-dark p-3">
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="divorce_type2"
                        value="joint"
                        id="joint2"
                        onChange={fillFormData("applicationClaim")}
                        checked={formData?.applicationClaim === "joint"}
                    />
                    <label className="form-check-label small" htmlFor="joint2">
                        <span className="fw-bold small">
                            THIS CASE IS A JOINT APPLICATION FOR DIVORCE. THE DETAILS ARE SET
                            OUT ON THE ATTACHED PAGES.
                        </span>
                        The application and affidavits in support of the application will be
                        presented to a judge when the materials have been checked for
                        completeness.
                    </label>
                </div>

                <BoldandThinText
                    thin={`If you are requesting anything other than a simple divorce, such as
support or property or exclusive possession of the matrimonial home
and its contents, then refer to page 1 for instructions regarding
the Financial Statement you should file.`}
                />
            </div>
        </>
    );
};

export default ClaimText;
