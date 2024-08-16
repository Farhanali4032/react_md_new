import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import LabelAndInput from "../../../../components/LayoutComponents/LabelAndInput/LabelAndInput";
import {
  fetchFormDetails,
  saveComplianceFormDetails,
} from "../../../../utils/helpers";
import ComplianceFormLayout from "../../ComplianceFormLayout";
import { ReportOnTheInvestment } from "./ReportOnTheInvestment";
import { Task } from "../../../../components/Tasks/Task";
import { useReactToPrint } from "react-to-print";
import Form9E from "../print/Form9E";

type Props = {};

const InvestmentAuthority: React.FC<Props> = () => {
  const history: any = useHistory();
  const taskState: Task = history.location.state;
  const compliancePDF = useRef(null);

  const [taskStatus, setTaskStatus] = useState(taskState);

  const [sectionA, setSectionA] = useState<ReportOnTheInvestment>({
    To: "",
    nameAndAddressOfBorrower: "",
    nameAndAddressOfGuarantor: "",
    legalDescriptionAndMunicipalAddressOfRealProperty: "",
    typeOfProperty: "",
    principalAmountOfMortgageOrCharge: "",
    amountOfLoan: "",
    rankOfMortgage: "",
    investmentSpecifyAmount: "",
    investmentSpecifyPercentage: "",
    datePrincipalAdvanced: "",
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
    detailsOfExistingEncumbrancesIncludingRank: "",
    mortgageOrChargeIsCollateralSecurity: "",
    particularsOfDisbursementsMadeForLegalBrokerage: "",
    advisedICannotConfirmWhatIndependentCommissions: "",
    registrationNumberDateOfRegistrationAndLandRegistry: "",
    insuranceParticulars: "",
    particularsOfExistingEncumbrancesOutstanding: "",
    syndicatedMortgageWhereProspectusWasRequired: "",
    syndicatedMortgageWhereProspectusWasRequiredDate: "",
    independentAppraisal: "",
    independentAppraisalDate: "",
    nameOfLawyerOrLawFirm: "",
    addressOfLawyerOrLawFirm: "",
    signatureOfLawyer: "",

    LetterOfDirection_NameofBank: "",
    LetterOfDirection_Branch: "",
    LetterOfDirection_Address: "",
    LetterOfDirection_ReAccountNo: "",
    LetterOfDirection_DirectionToPayInterest: "",
    LetterOfDirection_DirectionToPayInterestNameOfFirm: "",
    LetterOfDirection_Dated: "",
    LetterOfDirection_LicenseeName: "",
    LetterOfDirection_FirmName: "",
    LetterOfDirection_AddressAsPerClioOrQBO: "",

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

  const printDocument = useReactToPrint({
    content: () => compliancePDF.current,
  });

  const handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    setSectionA({ ...sectionA, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <ComplianceFormLayout
      saveDocument={saveDocument}
      printDocument={printDocument}
      formState={sectionA}
      setFormState={(obj) => {
        setSectionA({ ...sectionA, ...obj });
      }}
      taskStatus={taskStatus}
      setTaskStatus={(obj) => {
        setTaskStatus({ ...taskStatus, ...obj });
      }}
      title="Report on the Investment"
    >
      <div style={{ display: "none" }}>
        <Form9E taskData={taskState} ref={compliancePDF} />
      </div>
      <Container>
        <div
          className="page_container mt-5"
          style={{
            height: "510px",
            overflowY: "scroll",
            overflowX: "hidden",
            background: "white",
            position: "absolute",
            left: "45%",
            top: "50%",
            transform: "translate(-50%, -45%) scale(1.2)",
            width: "612px",
            borderStyle: "outset",
          }}
        >
          <h1 className="text-center heading-5 my-3 fw-bold">Form 9E</h1>
          <h1 className="text-center heading-5 my-3 fw-bold">
            Report on the Investment
          </h1>
          <div className="mx-5 mt-5">
            <LabelAndInput classes="my-2" label="To">
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.To}
                onChange={(e) => handleInputChange(e)}
                name="To"
              />
            </LabelAndInput>

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
                value={
                  sectionA.legalDescriptionAndMunicipalAddressOfRealProperty
                }
                onChange={(e) => handleInputChange(e)}
                name="legalDescriptionAndMunicipalAddressOfRealProperty"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="my-1 mt-3"
              label="4. Type of Property"
              sublabel="(specify, eg:, residence, vacant land, etc.)"
            >
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
              label="&nbsp;&nbsp;&nbsp;&nbsp;(b) Amount of loan to be advanced by you"
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
              sublabel="(or specify other rank)"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.rankOfMortgage}
                onChange={(e) => handleInputChange(e)}
                name="rankOfMortgage"
              />
            </LabelAndInput>

            <div className="mx-5 my-3 ">
              7. Your investment of{" "}
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
              of the total of this loan to the borrower (or borrowers).
            </div>

            <LabelAndInput
              classes="mt-3 my-1"
              label="8. Date principal advanced:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.datePrincipalAdvanced}
                onChange={(e) => handleInputChange(e)}
                name="datePrincipalAdvanced"
                type="date"
              />
            </LabelAndInput>

            <LabelAndInput
              classes="mt-3 my-1"
              label="9. (a) The term of loan is"
              sublabel="(specify term of loan in months, years, etc.)"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.termOfLoan}
                onChange={(e) => handleInputChange(e)}
                name="termOfLoan"
                type="date"
              />
            </LabelAndInput>

            <LabelAndInput
              classes="mt-3 my-1"
              label=" &nbsp;&nbsp;&nbsp;&nbsp;(b) The due date of the loan is"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.dueDateOfLoan}
                onChange={(e) => handleInputChange(e)}
                name="dueDateOfLoan"
                type="date"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="&nbsp;&nbsp;&nbsp;&nbsp;(c) The loan is amortized over"
              sublabel="(specify number of years)"
            >
              <input
                type="number"
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
              calculated semi annually, not in advance{" "}
              <i>(or specify how interest rate is calculated)</i>{" "}
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
              label="13. Details of any existing encumbrances, including rank on title, balances outstanding, mortgagee name and maturity dates:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.detailsOfExistingEncumbrancesIncludingRank}
                onChange={(e) => handleInputChange(e)}
                name="detailsOfExistingEncumbrancesIncludingRank"
              />
            </LabelAndInput>

            <LabelAndInput
              classes="mt-3 my-1"
              label="14. In those instances in which the mortgage or charge is a collateral security, or if the mortgage or charge is collaterally secured, the details of other security are:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.mortgageOrChargeIsCollateralSecurity}
                onChange={(e) => handleInputChange(e)}
                name="mortgageOrChargeIsCollateralSecurity"
              />
            </LabelAndInput>

            <LabelAndInput
              classes="mt-3 my-1"
              label="15. (a) Particulars of disbursements made for legal, brokerage or other fees or commissions in connection with the placement of the loan, including the names of recipients and amounts paid, are:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.particularsOfDisbursementsMadeForLegalBrokerage}
                onChange={(e) => handleInputChange(e)}
                name="particularsOfDisbursementsMadeForLegalBrokerage"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="(b) Alternatively, I have advised I cannot confirm what independent commissions or fees are being charged to the borrower"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.advisedICannotConfirmWhatIndependentCommissions}
                onChange={(e) => handleInputChange(e)}
                name="advisedICannotConfirmWhatIndependentCommissions"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="16. Registration number, date of registration and land registry office location:"
            >
              <input
                className="htmlInput_m htmlInput"
                value={
                  sectionA.registrationNumberDateOfRegistrationAndLandRegistry
                }
                onChange={(e) => handleInputChange(e)}
                name="registrationNumberDateOfRegistrationAndLandRegistry"
              />
            </LabelAndInput>
            <LabelAndInput
              classes="mt-3 my-1"
              label="17. Insurance particulars (where relevant):"
            >
              <input
                className="htmlInput_m htmlInput"
                value={sectionA.insuranceParticulars}
                onChange={(e) => handleInputChange(e)}
                name="insuranceParticulars"
              />
            </LabelAndInput>

            <div className="mx-5 fw-bold my-4">
              B. Conditions and disclosure:
            </div>

            <div>
              <div className="mx-5">
                In accordance with your Form 9D [Investment Authority] request
                for information and disclosures prior to the advance of your
                money, I advise that I have previously provided you with the
                requested information and disclosures as follows:
              </div>
              <LabelAndInput
                classes="mt-3 my-1"
                label="1. Particulars of existing encumbrances outstanding: "
                sublabel="(Specify yes or no, and if yes, specify date on which particulars were provided.)"
              >
                <input
                  className="htmlInput_m htmlInput"
                  value={sectionA.particularsOfExistingEncumbrancesOutstanding}
                  onChange={(e) => handleInputChange(e)}
                  name="particularsOfExistingEncumbrancesOutstanding"
                />
              </LabelAndInput>
              <LabelAndInput
                classes="mt-3 my-1"
                label="2. In the case of a syndicated mortgage where a prospectus was required, a copy of the prospectus: "
                sublabel="(Specify yes or no, and if yes, specify date on which prospectus was provided.)"
              >
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    <input
                      type="radio"
                      onChange={(e) =>
                        setSectionA({
                          ...sectionA,
                          syndicatedMortgageWhereProspectusWasRequired: "Yes",
                        })
                      }
                      value={
                        sectionA.syndicatedMortgageWhereProspectusWasRequired
                      }
                      checked={
                        sectionA.syndicatedMortgageWhereProspectusWasRequired ===
                        "Yes"
                      }
                    />
                    Yes
                    <div className="mx-3"></div>
                    <input
                      type="radio"
                      onChange={(e) =>
                        setSectionA({
                          ...sectionA,
                          syndicatedMortgageWhereProspectusWasRequired: "No",
                        })
                      }
                      checked={
                        sectionA.syndicatedMortgageWhereProspectusWasRequired ===
                        "No"
                      }
                      value={
                        sectionA.syndicatedMortgageWhereProspectusWasRequired
                      }
                    />
                    No
                  </div>
                  <input
                    type="date"
                    className="htmlInput_m htmlInput my-3"
                    value={
                      sectionA.syndicatedMortgageWhereProspectusWasRequiredDate
                    }
                    onChange={(e) => handleInputChange(e)}
                    name="syndicatedMortgageWhereProspectusWasRequiredDate"
                  />
                </div>
              </LabelAndInput>
              <div className="my-3 mx-5">
                I advised and you acknowledged that I gave no opinion as to the
                necessity or validity of a prospectus
              </div>
              <LabelAndInput
                label="3. Independent appraisal: "
                sublabel="(Specify yes or no, and if yes, specify date on which independent appraisal was provided.)"
              >
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    <input
                      type="radio"
                      onChange={(e) =>
                        setSectionA({
                          ...sectionA,
                          independentAppraisal: "Yes",
                        })
                      }
                      value={sectionA.independentAppraisal}
                      checked={sectionA.independentAppraisal === "Yes"}
                    />
                    Yes
                    <div className="mx-3"></div>
                    <input
                      type="radio"
                      onChange={(e) =>
                        setSectionA({
                          ...sectionA,
                          independentAppraisal: "No",
                        })
                      }
                      checked={sectionA.independentAppraisal === "No"}
                      value={sectionA.independentAppraisal}
                    />
                    No
                  </div>
                  {sectionA.independentAppraisal === "Yes" && (
                    <input
                      type="date"
                      className="htmlInput_m htmlInput my-3"
                      value={sectionA.independentAppraisalDate}
                      onChange={(e) => handleInputChange(e)}
                      name="independentAppraisalDate"
                    />
                  )}
                </div>
              </LabelAndInput>
              <div className="my-3 mx-5">
                I advised and you acknowledged that I gave no opinion as to the
                necessity or validity of an appraisal.
              </div>
              <div className="my-3 mx-5">
                4. Any loss you may suffer on this mortgage investment will not
                be insured under the lawyers' professional liability policy if
                the lawyer has acted as a mortgage broker or has helped to
                arrange it. I advised and you acknowledged having read and
                understood this warning.
              </div>
            </div>

            <div className="my-3 mx-5">
              *(Warning: You are cautioned that the responsibility for assissing
              the financial merits of the mortgage investment rests with the
              investor at all times. The lawyer's responsibility is limited to
              ensuring the mortgage is legally registered on title in accordance
              with the investor's instructions. The lawyer is not permitted to
              personally guarantee the obligations of the borrower or borrowers
              not the suitability of the property as security for the mortgage
              investment.)
            </div>

            <div className="my-5">
              <LabelAndInput
                classes="my-3"
                label="Name of the lawyer or law firm:"
              >
                <input
                  type="text"
                  className="htmlInput htmlInput_m"
                  value={sectionA.nameOfLawyerOrLawFirm}
                  onChange={(e) => handleInputChange(e)}
                  name="LetterOfDirection_NameofBank"
                />
              </LabelAndInput>

              <LabelAndInput
                classes="my-3"
                label="Address of lawyer or law firm:"
              >
                <input
                  type="text"
                  className="htmlInput htmlInput_m"
                  value={sectionA.addressOfLawyerOrLawFirm}
                  onChange={(e) => handleInputChange(e)}
                  name="LetterOfDirection_Branch"
                />
              </LabelAndInput>
            </div>
          </div>
        </div>
      </Container>
    </ComplianceFormLayout>
  );
};

export default InvestmentAuthority;
