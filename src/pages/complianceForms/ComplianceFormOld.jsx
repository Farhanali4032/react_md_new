import React, { useState } from "react";
import useQuery from "../../hooks/useQuery";
import BankDraftsAndMoneyOrder from "./AB/BankDraftsAndMoneyOrder";
import ClaimToTrustMoney from "./AB/ClaimToTrustMoney";
import ShortageSelfReportForm from "./AB/ShortageSelfReportForm";
import FinacInstAuthForm from "./AB/FinacInstAuthForm";
import LetterHead from "./AB/LetterHead";
import MatterMatterTrustTrans from "./AB/MatterMatterTrustTrans";
import RepresCapacityUndertaking from "./AB/RepresCapacityUndertaking";
import UndisbursableTrustMoney from "./AB/UndisbursableTrustMoney";
import UndisbursableTrustMoneyShort from "./AB/UndisbursableTrustMoneyShort";
import ElectronicBankWith from "./AB/ElectronicBankWith";
import { useHistory } from "react-router";
import ElecTrustTransferRequis from "./ON/ElecTrustTransferRequis/ElecTrustTransferRequis.jsx";
import AuthOfWithdrawByTeranet from "./ON/AuthOfWithdrawByTeranet/AuthOfWithdrawByTeranet.tsx";
import ElecTrustTransferRequisClosingFund from "./ON/ElecTrustTransferRequisClosingFund/ElecTrustTransferRequisClosingFund.jsx";
import InvestmentAuthority from "./ON/InvestmentAuthority/InvestmentAuthority.tsx";
import ReportOnTheInvestment from "./ON/ReportOnTheInvestment/ReportOnTheInvestment.tsx";
import ConfirmLawFoundationInterest from "./BC/ConfirmLawFoundationInterest/ConfirmLawFoundationInterest.tsx";
import ElecTransferofTrustFundsRequisition from "./BC/ElecTransferofTrustFundsRequisition/ElecTransferofTrustFundsRequisition.tsx";
import LtrNewTrustAcct from "./BC/LtrNewTrustAcct/LtrNewTrustAcct.tsx";
import Sch3Insolvent from "./BC/Sch3Insolvent/Sch3Insolvent.tsx";
import UnclaimedTrustFunds from "./BC/UnclaimedTrustFunds/UnclaimedTrustFunds.tsx";

const ComplianceForm = () => {
  const query = useQuery();
  const step = parseInt(query.get("step"));

  const history = useHistory();
  const complianceState = history.location.state;

  return (
    <div>
      {step === 4 && <FinacInstAuthForm data={complianceState} />}
      {step === 5 && <ClaimToTrustMoney data={complianceState} />}
      {step === 6 && <ShortageSelfReportForm data={complianceState} />}
      {step === 7 && <UndisbursableTrustMoney />}
      {step === 8 && <UndisbursableTrustMoneyShort />}
      {step === 9 && <BankDraftsAndMoneyOrder />}
      {step === 10 && <ElectronicBankWith />}
      {step === 11 && <MatterMatterTrustTrans />}
      {step === 12 && <LetterHead />}
      {step === 13 && <RepresCapacityUndertaking />}
      {step === 14 && <ElecTrustTransferRequis />}
      {step === 15 && <AuthOfWithdrawByTeranet />}
      {step === 16 && <ElecTrustTransferRequisClosingFund />}
      {step === 17 && <InvestmentAuthority />}
      {step === 18 && <ReportOnTheInvestment />}
      {step === 19 && <ConfirmLawFoundationInterest />}
      {step === 20 && <ElecTransferofTrustFundsRequisition />}
      {step === 21 && <LtrNewTrustAcct />}
      {step === 22 && <Sch3Insolvent />}
      {step === 23 && <UnclaimedTrustFunds />}
    </div>
  );
};

export default ComplianceForm;
