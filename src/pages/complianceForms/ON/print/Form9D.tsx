import React, { useEffect, useState, forwardRef } from "react";
import { Container } from "react-bootstrap";
import LabelAndInput from "../../../../components/LayoutComponents/LabelAndInput/LabelAndInput";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import { InvestmentAuthorState } from "../InvestmentAuthority/InvestmentAuthor";
import { Task } from "../../../../components/Tasks/Task";

type Props = {
  taskData: Task;
};

const InvestmentAuthority = forwardRef(({ taskData }: Props, ref) => {
  const taskState: Task = taskData;

  const [taskStatus, setTaskStatus] = useState(taskState);

  const [sectionA, setSectionA] = useState<InvestmentAuthorState>({
    To: "",
    specifyAmount: "",
    nameAndAddressOfBorrower: "",
    nameAndAddressOfGuarantor: "",
    legalDescriptionAndMunicipalAddressOfRealProperty: "",
    typeOfProperty: "",
    principalAmountOfMortgageOrCharge: "",
    amountOfLoan: "",
    rankOfMortgage: "",
    investmentSpecifyAmount: "",
    investmentSpecifyPercentage: "",
    valueOfPropertySpecifyAmount: "",
    determineApproxValueOfProperty: "",
    percentValueOfPropertyMortgaged: "",
    termOfLoan: "",
    dueDateOfLoan: "",
    loanAmortized: "",
    //left
    interestRateCalculatedSemiAnnually: "",
    interestRateInAdvanced: "",
    principalInterestSpecify: "",
    particularsAmountsOfAnyBonus: "",
    theMortgageToBeRegistered: "",
    aCollectionOrAdministrationFeeAmount: "",
    payableByTheInvestorOrBorrower: "",
    mortgageIsHeldTheDates: "",
    particularsOfDisbursementsMadeForLegalIncludingTheNamesOfRecipients: "",
    mortgageTransactionYesOrNo: "",
    appraisalIsToBePaidByMeOrNameOfPersonWhoIsToPay: "",
    acceptDoNotExpressAnOpinionAsToValidityOfAppraisal: "",
    acknowledgeBeingAdvised: "",
    investorOrInvestors: "",
    signatureOfInvestor: "",
    dateOfSignature: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const { formDetails, isFormFilled } = await fetchFormDetails(
        taskState.id
      );

      console.log("form details", formDetails);
      console.log("form details", isFormFilled);

      if (isFormFilled) {
        setSectionA({
          ...formDetails,
        });
      }
    };

    fetchDetails();
  }, []);

  const saveDocument = (): void => {
    saveComplianceFormDetails(sectionA, taskState.id);
  };

  const handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    setSectionA({ ...sectionA, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <Container ref={ref}>
      <div
        className="page_container mt-5"
        style={{
          display: "inline",
          height: "auto",
          overflowY: "visible",
          overflowX: "visible",
          background: "white",
          position: "static",
          borderStyle: "outset",
        }}
      >
        <h1 className="text-center heading-5 my-3 fw-bold">Form 9D</h1>
        <h1 className="text-center heading-5 my-3 fw-bold">
          Investment Authority
        </h1>
        <div className="mx-5">
          <LabelAndInput classes="my-2" label="To">
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.To}
              onChange={(e) => handleInputChange(e)}
              name="To"
            />
          </LabelAndInput>

          <div className=" mx-5">
            I (or we) instruct you to act on my (or our) behalf, on my (or our)
            mortgage investment (or investments) of{" "}
            <input
              type="number"
              className="htmlInput htmlInput_m"
              value={sectionA.specifyAmount}
              onChange={handleInputChange}
              name="specifyAmount"
            />{" "}
            the details, conditions and disclosures of which are set out below.
          </div>

          <div className="fw-bold my-3 mx-5">
            A. Details About The Investment:
          </div>

          <LabelAndInput
            classes="my-2"
            label="1. Name and address of borrower (or borrowers)"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.nameAndAddressOfBorrower}
              onChange={(e) => handleInputChange(e)}
              name="nameAndAddressOfBorrower"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="mt-3 my-1"
            label="2. Name and address of guarantor (or guarantors) (if any)"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.nameAndAddressOfGuarantor}
              onChange={(e) => handleInputChange(e)}
              name="nameAndAddressOfGuarantor"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="3. Legal Description and municipal address of real property"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.legalDescriptionAndMunicipalAddressOfRealProperty}
              onChange={(e) => handleInputChange(e)}
              name="legalDescriptionAndMunicipalAddressOfRealProperty"
            />
          </LabelAndInput>
          <LabelAndInput classes="my-1 mt-3" label="4. Type of Property">
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.typeOfProperty}
              onChange={(e) => handleInputChange(e)}
              name="typeOfProperty"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="mt-3 my-1"
            label="5. (a) Principal amount of mortgage or charge"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.principalAmountOfMortgageOrCharge}
              onChange={(e) => handleInputChange(e)}
              name="principalAmountOfMortgageOrCharge"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="mt-3 my-1"
            label="&nbsp;&nbsp;&nbsp;&nbsp;(b) Amount of loan to be advanced by me (or us)"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.amountOfLoan}
              onChange={(e) => handleInputChange(e)}
              name="amountOfLoan"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="mt-3 my-1"
            label="6. Rank of mortgage or charge is first"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.rankOfMortgage}
              onChange={(e) => handleInputChange(e)}
              name="rankOfMortgage"
            />
          </LabelAndInput>

          <div className="mx-5 my-3 ">
            7. My (or our) investment of{" "}
            <input
              type="number"
              className="htmlInput htmlInput_m"
              value={sectionA.investmentSpecifyAmount}
              onChange={handleInputChange}
              name="investmentSpecifyAmount"
            />{" "}
            represents{" "}
            <input
              type="number"
              className="htmlInput htmlInput_m"
              value={sectionA.investmentSpecifyPercentage}
              onChange={handleInputChange}
              name="investmentSpecifyPercentage"
            />{" "}
            of the total loan to the borrower (or borrowers).
          </div>

          <LabelAndInput
            classes="mt-3 my-1"
            label="8. (a) I am (or we are) satisfied that the approximate value of the property is"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.valueOfPropertySpecifyAmount}
              onChange={(e) => handleInputChange(e)}
              name="valueOfPropertySpecifyAmount"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="mt-3 my-1"
            label=" &nbsp;&nbsp;&nbsp;&nbsp;(b) I (or we) used the following means to determine the approximate value of the property"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.determineApproxValueOfProperty}
              onChange={(e) => handleInputChange(e)}
              name="determineApproxValueOfProperty"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="&nbsp;&nbsp;&nbsp;&nbsp;(c) Including my (or our) mortgage amount, the percentage of the value of the property that is mortgaged (or /encumbered) is (specify percentage"
          >
            <input
              type="number"
              className="htmlInput_m htmlInput"
              value={sectionA.percentValueOfPropertyMortgaged}
              onChange={(e) => handleInputChange(e)}
              name="percentValueOfPropertyMortgaged"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="9. (a) The term of loan is (specify term of loan in months, years, etc.)"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.termOfLoan}
              onChange={(e) => handleInputChange(e)}
              name="termOfLoan"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="&nbsp;&nbsp;&nbsp;&nbsp;(b) The due date of loan is"
          >
            <input
              type="date"
              className="htmlInput_m htmlInput"
              value={sectionA.dueDateOfLoan}
              onChange={(e) => handleInputChange(e)}
              name="dueDateOfLoan"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="&nbsp;&nbsp;&nbsp;&nbsp;(c) The loan is amortized over (specify number of years)"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.loanAmortized}
              onChange={(e) => handleInputChange(e)}
              name="loanAmortized"
            />
          </LabelAndInput>

          <div className="mx-5 my-3">
            10. The interest rate is{" "}
            <input
              type="number"
              className="htmlInput htmlInput_m"
              value={sectionA.interestRateCalculatedSemiAnnually}
              onChange={handleInputChange}
              name="interestRateCalculatedSemiAnnually"
            />{" "}
            calculated semi annually, not in advance (or specify how interest
            rate is calculated){" "}
            <input
              type="number"
              className="htmlInput htmlInput_m"
              value={sectionA.interestRateInAdvanced}
              onChange={handleInputChange}
              name="interestRateInAdvanced"
            />{" "}
          </div>

          <LabelAndInput
            classes="mt-3 my-1"
            label="11. Particulars of amounts and due dates (monthly, quarterly, etc.) of payments of principal and interest:"
          >
            <input
              type="date"
              className="htmlInput_m htmlInput"
              value={sectionA.principalInterestSpecify}
              onChange={(e) => handleInputChange(e)}
              name="principalInterestSpecify"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="12. Particulars and amounts of any bonus or holdback or any other special terms:"
          >
            <input
              type="number"
              className="htmlInput_m htmlInput"
              value={sectionA.particularsAmountsOfAnyBonus}
              onChange={(e) => handleInputChange(e)}
              name="particularsAmountsOfAnyBonus"
            />
          </LabelAndInput>
          <LabelAndInput
            classes="mt-3 my-1"
            label="13. (a) The mortgage is to be registered in the name (or names) of (specify name or names)."
          >
            <input
              type="text"
              className="htmlInput_m htmlInput"
              value={sectionA.theMortgageToBeRegistered}
              onChange={(e) => handleInputChange(e)}
              name="theMortgageToBeRegistered"
            />
          </LabelAndInput>

          <div className="mx-5 my-3">
            &nbsp;&nbsp;&nbsp;&nbsp;(b) After completion of the mortgage
            transaction, a collection or administration fee of{" "}
            <input
              type="number"
              className="htmlInput_m htmlInput"
              value={sectionA.aCollectionOrAdministrationFeeAmount}
              onChange={(e) => handleInputChange(e)}
              name="aCollectionOrAdministrationFeeAmount"
            />{" "}
            per instalment is payable by the investor (or investors) (or
            borrower) (or borrowers) to{" "}
            <input
              type="number"
              className="htmlInput_m htmlInput"
              value={sectionA.payableByTheInvestorOrBorrower}
              onChange={(e) => handleInputChange(e)}
              name="payableByTheInvestorOrBorrower"
            />
          </div>

          <LabelAndInput
            classes="mt-3 my-1"
            label="(c) If the mortgage is held in trust, the dates on which payments are to be made by the trustee (if applicable) to me (or us) are:"
          >
            <input
              type="date"
              style={{ width: "17rem" }}
              className="htmlInput_m htmlInput"
              value={sectionA.mortgageIsHeldTheDates}
              onChange={(e) => handleInputChange(e)}
              name="mortgageIsHeldTheDates"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="mt-3 my-1"
            label="14. Particulars of disbursements made for legal, brokerage or other fees or commissions in connection with the placement of the loan, including the names of recipients and amounts paid, are:"
          >
            <input
              className="htmlInput_m htmlInput"
              value={
                sectionA.particularsOfDisbursementsMadeForLegalIncludingTheNamesOfRecipients
              }
              onChange={(e) => handleInputChange(e)}
              name="particularsOfDisbursementsMadeForLegalIncludingTheNamesOfRecipients"
            />
          </LabelAndInput>

          <div className="mx-5 fw-bold my-4">B. Conditions</div>

          <div className="mx-5">
            <div>
              1. (Instructions: Clauses (a) and (b) below refer to information
              which each investor may require from the lawyer. If you require
              the information referred to in a clause, initial the clause.
            </div>

            <div className="my-3">
              The information which I (or we) require from you as my (or our)
              lawyer before you complete the transaction and make the advance is
              as follows:
            </div>

            <div className="my-3">
              (a) If my (or our) investment will be in a position other than a
              first mortgage or charge, details, including amounts, of all
              existing encumbrances outstanding
            </div>

            <div className="my-3">
              (b) If the mortgage or charge is a syndicated mortgage, and a
              prospectus is necessary, a copy of the prospectus. We acknowledge
              and accept that you as my (or our) lawyer express no opinion as to
              the necessity for or validity of a prospectus.
            </div>

            <div className="my-3">
              2. (Instructions: Each investor to complete and initial clause (a)
              and, if clause (a) is answered in the affirmative, to complete (if
              necessary) and initial clause (b) and to initial clause (c).
            </div>
          </div>

          <LabelAndInput
            classes="my-3"
            label="(a) I (or we) instruct you to obtain a current and independent appraisal of the subject property and provide it to me (or us) before you complete this mortgage transaction."
          >
            <div className="d-flex">
              <input
                type="radio"
                onChange={(e) =>
                  setSectionA({
                    ...sectionA,
                    mortgageTransactionYesOrNo: "Yes",
                  })
                }
                value={sectionA.mortgageTransactionYesOrNo}
                checked={sectionA.mortgageTransactionYesOrNo === "Yes"}
              />
              Yes
              <div className="mx-3"></div>
              <input
                type="radio"
                onChange={(e) =>
                  setSectionA({
                    ...sectionA,
                    mortgageTransactionYesOrNo: "No",
                  })
                }
                checked={sectionA.mortgageTransactionYesOrNo === "No"}
                value={sectionA.mortgageTransactionYesOrNo}
              />
              No
            </div>
          </LabelAndInput>

          <LabelAndInput
            classes="my-3"
            label="(b) The appraisal is to be paid by me (or us) or (specify name of person who is to pay for appraisal)"
          >
            <input
              className="htmlInput_m htmlInput"
              value={sectionA.appraisalIsToBePaidByMeOrNameOfPersonWhoIsToPay}
              onChange={(e) => handleInputChange(e)}
              name="appraisalIsToBePaidByMeOrNameOfPersonWhoIsToPay"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="my-3"
            label="(c) I (or we) have been advised and accept that you as my (or our) lawyer do not express an opinion as to the validity of the appraisal"
          >
            <input
              className="htmlInput_m htmlInput"
              value={
                sectionA.acceptDoNotExpressAnOpinionAsToValidityOfAppraisal
              }
              onChange={(e) => handleInputChange(e)}
              name="acceptDoNotExpressAnOpinionAsToValidityOfAppraisal"
            />
          </LabelAndInput>

          <div className="mt-3 mx-5">C. Disclosure:</div>

          <LabelAndInput label="1. I (or we) acknowledge being advised by you as my (or our) lawyer that you do not have any direct or indirect interest in the borrower (or borrowers)">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <input
                  type="radio"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      mortgageTransactionYesOrNo: "Yes",
                    })
                  }
                  value={sectionA.mortgageTransactionYesOrNo}
                  checked={sectionA.mortgageTransactionYesOrNo === "Yes"}
                />
                Yes
                <div className="mx-3"></div>
                <input
                  type="radio"
                  onChange={(e) =>
                    setSectionA({
                      ...sectionA,
                      mortgageTransactionYesOrNo: "No",
                    })
                  }
                  checked={sectionA.mortgageTransactionYesOrNo === "No"}
                  value={sectionA.mortgageTransactionYesOrNo}
                />
                No
              </div>
              <input
                type="date"
                className="htmlInput_m htmlInput my-3"
                value={sectionA.acknowledgeBeingAdvised}
                onChange={(e) => handleInputChange(e)}
                name="acknowledgeBeingAdvised"
              />
            </div>
          </LabelAndInput>

          <div className="my-4 mx-5">
            (If the lawyer has an interest in the borrower or borrowers, he or
            she is unable to act for you on this loan (Rule 7, Rules of
            Professional Conduct)
          </div>

          <div className="mx-5">
            <div className="fw-bold">Warning:</div>

            <div>
              1. You are cautioned that the responsibility for assessing the
              financial merits of the mortgage investment rests with the
              investor or investors at all times. The lawyer's responsibility is
              limited to ensuring the mortgage is legally registered on title in
              accordance with the investor's or investors’ instructions. The
              lawyer is not permitted to personally guarantee the obligations of
              the borrower or borrowers nor the suitability of the property as
              security for the mortgage investment.
              <br />
              2. Any loss you may suffer on this mortgage investment will not be
              insured under the lawyer’s professional liability policy if the
              lawyer has acted as a mortgage broker or has helped to arrange
              it.*)
            </div>

            <div className="my-3">
              I (or we) hereby acknowledge receipt of a copy of this form prior
              to the advance of funds to or on behalf of the borrower
              (orborrowers). I (or we) further acknowledge having read and
              understood the above warnings.
            </div>
          </div>

          <LabelAndInput classes="my-3" label="Investor (or Investors):">
            <input
              type="text"
              className="htmlInput htmlInput_m"
              value={sectionA.investorOrInvestors}
              onChange={(e) => handleInputChange(e)}
              name="investorOrInvestors"
            />
          </LabelAndInput>

          <LabelAndInput
            classes="my-3"
            label="(Signature of the investor (or of each investor))"
          >
            <input
              type="text"
              className="htmlInput htmlInput_m"
              value={sectionA.signatureOfInvestor}
              onChange={(e) => handleInputChange(e)}
              name="signatureOfInvestor"
            />
          </LabelAndInput>

          <LabelAndInput classes="my-3" label="(Date of signature)">
            <input
              type="date"
              className="htmlInput htmlInput_m"
              value={sectionA.dateOfSignature}
              onChange={(e) => handleInputChange(e)}
              name="dateOfSignature"
            />
          </LabelAndInput>

          <div className="my-3 mx-5">
            *(Pursuant to clause (g) of Part III of the Professional Liability
            Insurance Policy for Lawyers, the policy does not apply "to any
            CLAIM directly or indirectly arising as a result of the INSURED
            acting as a MORTGAGE BROKER or as an intermediary arranging any
            financial transaction usual to mortgage lending; or to any CLAIM
            arising from circumstances where the INSURED has provided
            PROFESSIONAL SERVICES in conjunction with the above.")
          </div>

          <div className="my-5"></div>
        </div>
      </div>
    </Container>
  );
});

export default InvestmentAuthority;
