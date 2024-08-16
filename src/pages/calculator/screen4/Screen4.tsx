import React, { useEffect, useRef, useState } from "react";
import { useHistory , Link} from "react-router-dom";
import ReactToPrint from "react-to-print";
import InputCustom from "../../../components/InputCustom";
import useQuery from "../../../hooks/useQuery";
import { AUTH_ROUTES } from "../../../routes/Routes.types";
import { childSupportDetails } from "../../../utils/Apis/calcChildSupport";
import { apiCalculatorById } from "../../../utils/Apis/calculator/Calculator_values_id";
import { isENVPROD, replaceLastThreeChars } from "../../../utils/helpers";
import { formulaForChildSupport } from "../../../utils/helpers/calculator/taxCalculationFormula";
import { formatNumberInThousands } from "../../../utils/helpers/Formatting";

import {
  backgroundState,
  calculatorScreen2State,
  getCalculatorIdFromQuery,
} from "../Calculator";
//@ts-ignore
import Reports from "../reports/Reports.tsx";

import {
  aboutTheRelationshipState,
  aboutYourChildrenState,
} from "../screen1/Screen1";
import { totalNumberOfChildren } from "../screen2/Screen2";
import {
  changeReportIncompleteToComplete,
  determineTypeOfSplitting,
  getNumberOfChildrenWithParty1,
  getNumberOfChildrenWithParty2,
  getNumberOfChildrenWithSharing,
  supportQuantum,
} from "./Screen4";
import NPVCalculator from "../npvCalculation/NPVCalculator";
import CustomCheckbox from "../../../components/LayoutComponents/CustomCheckbox/CustomCheckbox";
import Restructuring from "./restructure/Restructuring.tsx";

type Props = {
  settingScreen4StateFromChild: (obj: any) => void;
  screen1: {
    background: backgroundState;
    aboutTheChildren: aboutYourChildrenState;
    aboutTheRelationship: aboutTheRelationshipState;
  };
  screen2: calculatorScreen2State;
  screen3: Object;
  typeOfCalculatorSelected: string;
  props: any;
  label: any;
  lumpsum: any;
  lifeInsurence: any;
  includeLumpsum: Boolean;
  includeLifeInsurence: Boolean;
  scenarios: any;
  setScenarios: any;
  restructioring :any,
  setRestructioring:any
};

const Screen4 = ({
  settingScreen4StateFromChild,
  screen1,
  screen2,
  typeOfCalculatorSelected,
  label,
  lumpsum,
  props,
  lifeInsurence,
  includeLumpsum,
  includeLifeInsurence,
  scenarios,
  setScenarios,
  restructioring,
  setRestructioring
}: Props) => {
  const query = useQuery();
  let calculator_report = useRef(null);
  const history = useHistory();

  const {
    highparty2: lumpsumHigh,
    midparty2: lumpsumMid,
    lowparty2: lumpsumLow,
  } = screen2.lumpsumReport;
  const {
    highparty2: lifeinsurenceHigh,
    midparty2: lifeinsurenceMid,
    lowparty2: lifeinsurenceLow,
  } = screen2.insurenceReport;


  console.log("screen2",screen2)



  const spousalSupportMedGreater = () => {
    return Math.round(
      Math.max(
        screen2.spousalSupport.spousalSupport1Med,
        screen2.spousalSupport.spousalSupport2Med
      )
    );
  };

  const spousalSupportLowGreater = () => {
    return Math.round(
      Math.max(
        screen2.spousalSupport.spousalSupport1Low,
        screen2.spousalSupport.spousalSupport2Low
      )
    );
  };

  const spousalSupportHighGreater = () => {
    return Math.round(
      Math.max(
        screen2.spousalSupport.spousalSupport1High,
        screen2.spousalSupport.spousalSupport2High
      )
    );
  };

  const getNumberOfChildWithParties = () => {
    return screen1.aboutTheChildren.count;
  };

  const childSupportGreater = (): number => {
    //if the custody is of splitting, then we need to net it off.
    //11802(party1) - 7008(party2)
    //this diff will go to party 2.

    //if party1 has child then child support will go to party 1 otherwise vice-versa.
    const childSupportParty1 = screen2.childSupport.childSupport1; //1351
    const childSupportParty2 = screen2.childSupport.childSupport2; //0


    const typeOfSplitting = determineTypeOfSplitting(
      getNumberOfChildWithParties(),
      totalNumberOfChildren(screen1.aboutTheChildren)
    );
     // we convert this logic on Screen 2 (-info-)
    // if (typeOfSplitting === "SPLIT" || typeOfSplitting === "SHARED") {
    //   if (childSupportParty1 > childSupportParty2) {
    //     return childSupportParty1 - childSupportParty2;
    //   } else {
    //     return childSupportParty2 - childSupportParty1;
    //   }
    // } else 
    if (typeOfSplitting === "HYBRID") {
      if (screen2.maximumChildLivesWith === 1) {
        return childSupportParty2 - screen2.childSupportReadOnly.party1;
      } else if (screen2.maximumChildLivesWith === 2) {
        return childSupportParty1 - screen2.childSupportReadOnly.party2;
      }
    }


    //which party has child will get the amount calculated by other party.
    //refer majority party excel file.
    else if (
      getNumberOfChildrenWithParty1(getNumberOfChildWithParties()) >
      getNumberOfChildrenWithParty2(getNumberOfChildWithParties())
    ) {
      return childSupportParty2;
    } else if (
      getNumberOfChildrenWithParty2(getNumberOfChildWithParties()) >
      getNumberOfChildrenWithParty1(getNumberOfChildWithParties())
    ) {
      return childSupportParty1;
    } else {
      return Math.max(childSupportParty1, childSupportParty2);
    }



    console.log("chilSuportParty1 on 4th screen after",childSupportParty1)
    console.log("chilSuportParty1 on 4th screen 2 after",childSupportParty2)
  };

  const determineSupportGivenTo = () => {
    const supportGivenTo = screen2.childSupport.givenTo;

    if (
      determineTypeOfSplitting(
        getNumberOfChildWithParties(),
        screen1.aboutTheChildren.numberOfChildren
      ) === "SPLIT"
    ) {
      if (supportGivenTo === screen1.background.party1FirstName) {
        return screen1.background.party1FirstName;
      } else {
        return screen1.background.party2FirstName;
      }
    }

    return supportGivenTo;
  };

  const fixDurationOfSupportFormat = (arr: number[]): string => {
    if (arr[0] > 9999999) {
      return "Indefinite";
    }

    return `${arr[0]} - ${arr[1]} years`;
  };

  const getChildSpecialExpenses = (type: "Low" | "Med" | "High") => {
    const { specialExpenses, specialExpensesArr } = screen2;
    const partyGivenBy =
      specialExpensesArr.party1.filter((data) => data.value === "21400")[0]
        ?.value >
        specialExpensesArr.party2.filter((data) => data.value === "21400")[0]
          ?.value
        ? 2
        : 1;

    if (type === "Low") {
      return partyGivenBy === 1
        ? specialExpenses.specialExpensesLow1
        : specialExpenses.specialExpensesLow2;
    } else if (type === "Med") {
      return partyGivenBy === 1
        ? specialExpenses.specialExpensesMed1
        : specialExpenses.specialExpensesMed2;
    } else {
      return partyGivenBy === 1
        ? specialExpenses.specialExpensesHigh1
        : specialExpenses.specialExpensesHigh2;
    }
  };

  const [reportData, setReportData] = useState({
    data: {},
    showReportTemplate: true,
  });

  useEffect(() => {
    // Minus the number of shared children as we are always adding in the screen2.tsx in modifyScreen1PropsIfChildShared.
    if (
      determineTypeOfSplitting(
        getNumberOfChildWithParties(),
        totalNumberOfChildren(screen1.aboutTheChildren)
      ) === "HYBRID"
    ) {
      screen1.aboutTheChildren.count.party1 -=
        screen1.aboutTheChildren.count.shared;
      screen1.aboutTheChildren.count.party2 -=
        screen1.aboutTheChildren.count.shared;
    }
  }, []);

  useEffect(() => {
    downloadReports(getCalculatorIdFromQuery(query));
  }, []);

  const downloadReports = async (id: number) => {
    const data = await apiCalculatorById.get_value(id);
 
    const ExtractedData = JSON.parse(data.report_data);
    // setRestructioring(ExtractedData.restructioring)
    console.log("ExtractedData",ExtractedData.restructioring)

    // const TaxAmountForLumpSumAndInsurence = JSON.parse(data.report_data)?.valueswithoutSpousalSupport
    // if(TaxAmountForLumpSumAndInsurence){
    //   setRestructioring(true)
    // }


    setReportData((prev) => ({
      data: ExtractedData,
      showReportTemplate: false,
    }));
  };

  const reportType = reportData?.data?.report_type;
  const [supportQuantum, setSupportQuantum] = useState<supportQuantum>({
    support1: {
      spousalSupport: spousalSupportLowGreater(),
      childSupport: childSupportGreater() / 12,
      childSpecialExpense: getChildSpecialExpenses("Low") / 12,
      spousalSupportGivenTo: screen2.childSupport.givenTo,
      childSupportGivenTo: determineSupportGivenTo(),
      childSupportSpecialExpenses: 0,
      totalSupport: 0,
    },
    support2: {
      spousalSupport: spousalSupportMedGreater(),
      childSupport: childSupportGreater() / 12,
      childSpecialExpense: getChildSpecialExpenses("Med") / 12,
      spousalSupportGivenTo: screen2.childSupport.givenTo,
      childSupportGivenTo: determineSupportGivenTo(),
      childSupportSpecialExpenses: 0,
      totalSupport: 0,
    },
    support3: {
      spousalSupport: spousalSupportHighGreater(),
      childSupport: childSupportGreater() / 12,
      childSpecialExpense: getChildSpecialExpenses("High") / 12,
      spousalSupportGivenTo: screen2.childSupport.givenTo,
      childSupportGivenTo: determineSupportGivenTo(),
      childSupportSpecialExpenses: 0,
      totalSupport: 0,
    },
    spousalSupportDurationRange: fixDurationOfSupportFormat(
      screen2.durationOfSupport
    ),
    loading: false,
    supportGivenTo: screen2.childSupport.givenTo,
  });

  const [apiToggle,setApiToggle] = useState(false)

  console.log("checkChSuport4",childSupportGreater())

  const supportAmount = {
    party1: screen2.spousalSupport.spousalSupport1,
    party2: screen2.spousalSupport.spousalSupport2,
    // loading1: true,
    // loading2: true,
  };

  const supportAmountSpousal = {
    party1: screen2.childSupport.childSupport1,
    party2: screen2.childSupport.childSupport2,
  };

  const getTotalSupport1 = () => {
    const { childSpecialExpense, childSupport, spousalSupport } =
      supportQuantum.support1;

    return (
      Number(childSpecialExpense) +
      Number(childSupport) +
      Number(spousalSupport)
    );
  };

  const getTotalSupport2 = () => {
    const { childSpecialExpense, childSupport, spousalSupport } =
      supportQuantum.support2;

    return (
      Number(childSpecialExpense) +
      Number(childSupport) +
      Number(spousalSupport)
    );
  };

  const getTotalSupport3 = () => {
    const { childSpecialExpense, childSupport, spousalSupport } =
      supportQuantum.support3;

    return (
      Number(childSpecialExpense) +
      Number(childSupport) +
      Number(spousalSupport)
    );
  };

  const isShared = () => {
    return getNumberOfChildrenWithSharing(screen1.aboutTheChildren.count) > 0;
  };

  const getTotalNumberOfChildren = () => {
    return screen1.aboutTheChildren.numberOfChildren;
  };

  const getProvinceOfParty1 = () => {
    return screen1.background.party1province || "ON";
  };

  const getProvinceOfParty2 = () => {
    return screen1.background.party2province || "ON";
  };

  const calculateSupportForParty1 = () => {
    const incomeOver = getTotalIncomeParty1();
    const numChildren = isShared()
      ? getTotalNumberOfChildren()
      : getNumberOfChildrenWithParty2(getNumberOfChildWithParties());
    const province = getProvinceOfParty1();

    const data = {
      incomeOver: replaceLastThreeChars(incomeOver),
      numChildren,
      province,
    };

    try {
      childSupportDetails(data).then((res) => {
        const formulaResult = formulaForChildSupport({
          ...res,
          totalIncomeParty: parseInt(incomeOver),
        });

        supportAmount.party1 = formulaResult ? formulaResult : 0;
        supportAmount.loading1 = false;

        childSupportVal();
      });
    } catch (err) {
      console.log("err", err);
      supportAmount.loading1 = false;
      setSupportQuantum({ ...supportQuantum, loading: false });

      alert(err);
    }
  };

  const calculateSupportForParty2 = () => {
    const incomeOver = getTotalIncomeParty2();
    const numChildren = isShared()
      ? getTotalNumberOfChildren()
      : getNumberOfChildrenWithParty1(getNumberOfChildWithParties());
    const province = getProvinceOfParty2();

    const data = {
      incomeOver: replaceLastThreeChars(incomeOver),
      numChildren,
      province,
    };
    try {
      childSupportDetails(data).then((res) => {
        const formulaResult = formulaForChildSupport({
          ...res,
          totalIncomeParty: parseInt(incomeOver),
        });
        supportAmount.loading2 = false;
        supportAmount.party2 = formulaResult ? formulaResult : 0;
        childSupportVal();
      });
    } catch (err) {
      console.log("err", err);
      supportAmount.loading2 = false;
      setSupportQuantum({ ...supportQuantum, loading: false });

      alert(err);
    }
  };

  const childSupportVal = () => {
    if (!supportAmount.loading1 && !supportAmount.loading2) {
      const supportDetails: supportQuantum = supportQuantum;
      const diff = parseFloat(
        Math.abs(supportAmount.party1 - supportAmount.party2).toFixed(4)
      );

      supportDetails.support1.childSupport = diff;
      supportDetails.support2.childSupport = diff;
      supportDetails.support3.childSupport = diff;

      if (supportAmount.party1 > supportAmount.party2) {
        supportDetails.supportGivenTo = screen1.background.party2FirstName;
      } else {
        supportDetails.supportGivenTo = screen1.background.party1FirstName;
      }

      setSupportQuantum({
        ...supportDetails,
        loading: false,
      });
    }
  };

  const getTotalIncomeParty1 = () => {
    return screen2.totalIncomeParty1.toString();
  };

  const getTotalIncomeParty2 = () => {
    return screen2.totalIncomeParty2.toString();
  };

  const changeInputInSupport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupportQuantum({
      ...supportQuantum,
      [e.target.name]: e.target.value,
    });
  };

  const changeInputInSupport1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupportQuantum({
      ...supportQuantum,
      support1: {
        ...supportQuantum.support1,
        [e.target.name]: e.target.value,
      },
    });
  };

  const changeInputInSupport2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupportQuantum({
      ...supportQuantum,
      support2: {
        ...supportQuantum.support2,
        [e.target.name]: e.target.value,
      },
    });
  };

  const changeInputInSupport3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupportQuantum({
      ...supportQuantum,
      support3: {
        ...supportQuantum.support3,
        [e.target.name]: e.target.value,
      },
    });
  };

  const HusbandImage = () => (
    <div className="userImage">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            d="M94.145 79.4761C88.4439 53.5622 67.7868 45.7609 52.7486 41.787C46.8832 40.2372 41.8728 39.2696 38.9376 38.0368C38.9519 38.0425 38.9607 38.0451 38.9645 38.0451C39.0498 38.0451 36.2456 36.513 34.2286 35.0752C34.0236 34.9289 33.8268 34.784 33.6421 34.6413C33.6449 34.643 33.6467 34.6441 33.6471 34.6441C33.686 34.6441 28.6682 30.2658 25.6182 26.7219C25.2996 26.3513 25.1718 26.1877 24.9228 25.8304C21.3527 20.7028 20.2919 15.773 16.261 15.637C16.119 15.6322 15.9758 15.6289 15.828 15.6289C15.4737 15.6289 15.0935 15.6485 14.6376 15.7158C14.0799 15.811 13.7417 15.9207 13.2944 16.0824C12.4114 16.401 11.5918 16.9726 10.9254 17.7148C10.1401 18.5898 9.56768 19.702 9.35568 20.917C9.14324 22.1349 9.29278 23.4564 9.95297 24.7459C10.0068 24.8511 10.2173 25.2753 10.2644 25.3822C11.9883 29.2898 14.4703 32.7966 17.2216 36.0487C20.7002 40.1607 24.0669 43.2026 27.3571 45.5104C30.6286 47.8048 33.0503 51.0309 34.3594 54.6945C35.0825 56.7182 35.4663 58.8751 35.4663 61.0822V68.0095V87.3623H37.5165H39.7282H68.2311V61.4741C68.2669 61.493 69.1888 62.2521 70.0955 63.0023C70.9844 63.7372 71.8588 64.4636 71.8702 64.4757C72.1016 64.7213 72.3246 64.9591 72.5385 65.1887C74.6812 67.4846 75.9604 68.9604 76.2448 69.2742C76.3178 69.3552 76.3431 69.3833 76.3831 69.4368C77.7829 71.3019 79.4505 74.3578 79.7069 74.7715C82.3316 79.0051 81.8181 86.5071 86.682 87.189C86.8834 87.2174 87.7842 87.3337 88.0184 87.3513C88.1391 87.3601 88.2601 87.3647 88.3799 87.3647C89.9259 87.3647 91.3952 86.6329 92.4891 85.4913C93.1932 84.7559 93.7417 83.8505 94.0546 82.8609C94.3918 81.7945 94.4551 80.6303 94.145 79.4761Z"
            fill="#73C3FD"
          />
          <path
            d="M51.2219 34.8671C51.4295 34.8757 51.6385 34.8801 51.8483 34.8801C56.6356 34.8801 60.8936 32.6145 63.6089 29.0972C65.545 26.5893 66.6967 23.4452 66.6967 20.0319C66.6967 16.0798 65.1527 12.4883 62.6349 9.82777C59.9284 6.96777 56.0968 5.18359 51.8483 5.18359C51.1225 5.18359 50.4089 5.23572 49.7109 5.33622C42.5232 6.37246 37 12.5569 37 20.0319C37 28.0225 43.312 34.5388 51.2219 34.8671Z"
            fill="#73C3FD"
          />
        </g>
        <path
          d="M27.413 48.0905C23.8979 46.1422 20.2295 43.472 16.337 39.7495C13.2584 36.8053 10.4208 33.5796 8.29465 29.8753C8.2366 29.7741 7.98259 29.3743 7.91794 29.2756C5.93474 26.2399 7.11085 22.6691 9.35597 20.917C9.56797 19.702 10.1404 18.5899 10.9257 17.7148C10.2499 17.9121 9.81823 18.1107 9.36718 18.3299C7.29228 19.3376 5.66556 21.3421 5.01527 23.6919C4.70739 24.8043 4.62976 25.9362 4.78414 27.0562C4.95172 28.2704 5.38649 29.4216 6.07702 30.4783C6.1375 30.5709 6.34246 30.895 6.39062 30.9758C7.46667 32.8497 8.7347 34.6576 10.2669 36.5025C11.5839 38.0883 13.0723 39.6703 14.8171 41.3388C16.7636 43.2004 18.7431 44.8854 20.7008 46.3474C22.5516 47.7298 24.4514 48.9633 26.3471 50.0141C31.1452 52.6733 34.354 57.5103 34.9308 62.953L35.4666 68.0096V61.0822C35.4666 58.8751 35.0828 56.7182 34.3597 54.6945C32.669 51.9757 30.295 49.6877 27.413 48.0905Z"
          fill="#171D34"
        />
        <path
          d="M99.9448 76.0186C99.8687 75.3586 99.7113 74.7096 99.4768 74.089C98.8765 72.2952 98.1941 70.5466 97.4483 68.8913C96.7169 67.2681 95.9043 65.6893 95.033 64.199C94.1879 62.7532 93.2638 61.3508 92.2869 60.0302C91.3424 58.7534 90.3222 57.5182 89.2547 56.3585C87.2392 54.1691 84.9725 52.1603 82.5178 50.3883C80.2769 48.7703 77.8143 47.3033 75.1986 46.0276C65.2991 41.1995 54.7289 39.7835 47.0109 38.7495C43.7445 38.3118 40.9039 37.9311 39.0146 37.4018C38.9862 37.3882 38.9547 37.3734 38.9193 37.3569C38.792 37.2976 38.6207 37.2199 38.4036 37.1216C37.4624 36.6957 35.6314 35.8668 34.2266 35.0742C36.2436 36.512 39.0478 38.0442 38.9624 38.0442C38.9587 38.0442 38.9499 38.0415 38.9356 38.0358C41.8708 39.2687 46.8812 40.2363 52.7465 41.786C68.0815 44.1963 89.0926 49.9203 97.4055 74.8295C98.637 78.0226 96.8304 81.6194 94.0526 82.8599C93.5627 83.0787 93.0426 83.2243 92.5035 83.2815C92.3843 83.2942 92.2636 83.3024 92.1427 83.3063C91.908 83.3136 91 83.2927 90.7968 83.2859C85.888 83.1201 85.6081 75.6058 82.5521 71.6724C82.2535 71.2879 80.2732 68.4246 78.6847 66.7172C78.6394 66.6686 78.6112 66.6431 78.5299 66.5705C78.1826 66.26 76.4897 64.6784 73.6741 62.2595C73.6484 62.2373 69.8135 59.6878 69.7392 59.6579L70.0935 63.0013L72.4668 85.4021L68.229 85.8512L53.9754 87.3614L39.8843 88.8544L39.7262 87.3614H37.5145L37.6973 89.0859C37.7588 89.6661 38.048 90.1978 38.5017 90.5644C38.9552 90.9313 39.536 91.1026 40.1159 91.0412L72.6984 87.5892C73.2785 87.5276 73.8103 87.2382 74.1769 86.7847C74.5437 86.3311 74.715 85.7505 74.6537 85.1706L72.5365 65.1877L72.4193 64.0807C74.6178 65.9737 76.0989 67.3286 76.7408 67.9158C76.8932 68.0552 76.994 68.1471 77.0639 68.2096C77.0725 68.2175 77.0857 68.2291 77.0967 68.239C78.2774 69.5139 79.7739 71.5868 80.4154 72.4753C80.6301 72.7726 80.7367 72.9202 80.8154 73.0215C81.7153 74.1796 82.3982 75.9049 83.0586 77.5734C83.7383 79.2911 84.4414 81.0674 85.4669 82.4957C86.104 83.3831 86.8011 84.0551 87.5983 84.5504C88.5331 85.1314 89.5843 85.4452 90.7224 85.4837C90.8101 85.4868 91.8657 85.5152 92.2114 85.5044C92.3029 85.5015 92.3951 85.4967 92.487 85.4903C92.5701 85.4844 92.653 85.4771 92.7353 85.4683C93.3623 85.4019 93.9842 85.251 94.5839 85.0201C95.1519 84.8011 95.7011 84.5097 96.2165 84.1539C97.195 83.4785 98.0513 82.5665 98.693 81.5169C99.3547 80.434 99.7845 79.2102 99.9355 77.9778C100.016 77.3231 100.019 76.6638 99.9448 76.0186Z"
          fill="#171D34"
        />
        <path
          d="M32.8372 25.3473C33.1754 26.4132 33.6217 27.4495 34.1633 28.4276C34.6948 29.3876 35.3236 30.3011 36.0319 31.1425C36.7332 31.9755 37.5186 32.7455 38.3663 33.4307C39.2143 34.1162 40.1316 34.7227 41.0931 35.2338C42.0642 35.7502 43.0892 36.1735 44.1391 36.4922C45.209 36.8168 46.3161 37.0358 47.4291 37.1433C48.57 37.2535 49.7309 37.2478 50.8798 37.126C52.0286 37.0043 53.1649 36.7668 54.2574 36.4198C55.3234 36.0816 56.3598 35.6354 57.338 35.0937C58.2979 34.5622 59.2113 33.9334 60.0529 33.2251C60.8857 32.524 61.6556 31.7385 62.3411 30.8907C62.8009 30.3218 63.2256 29.7214 63.6093 29.0973C60.894 32.6146 56.636 34.8802 51.8487 34.8802C51.6389 34.8802 51.43 34.8758 51.2224 34.8672C51.0324 34.8947 50.8408 34.9187 50.6482 34.9391C42.4933 35.8032 35.182 29.8927 34.3179 21.7378C33.4539 13.5829 39.3643 6.2718 47.5192 5.40775C48.2581 5.32946 48.9902 5.30681 49.7113 5.33628C50.4094 5.23578 51.123 5.18365 51.8487 5.18365C56.0973 5.18365 59.9288 6.96783 62.6353 9.82783C62.4735 9.61605 62.3068 9.40801 62.1353 9.20437C61.4342 8.37133 60.6486 7.60141 59.8008 6.91615C58.9531 6.23067 58.0358 5.62393 57.0743 5.11284C56.103 4.5967 55.0782 4.17336 54.0281 3.85471C52.9582 3.53011 51.8513 3.31107 50.7381 3.20353C49.5972 3.09335 48.4363 3.09907 47.2874 3.22091C46.1388 3.34252 45.0023 3.58003 43.9097 3.92684C42.844 4.26529 41.8076 4.7115 40.8294 5.25315C39.8695 5.78468 38.9559 6.41342 38.1145 7.12177C37.2815 7.82286 36.5116 8.6084 35.8263 9.45618C35.1408 10.3039 34.5343 11.2214 34.0232 12.1827C33.5069 13.1541 33.0835 14.1789 32.7649 15.229C32.4403 16.2989 32.2212 17.4057 32.1137 18.5189C32.0035 19.6598 32.0092 20.8208 32.1311 21.9696C32.2527 23.1184 32.4904 24.2547 32.8372 25.3473Z"
          fill="#171D34"
        />
        <path
          d="M3.30621 29.4446C3.15201 29.0801 2.99729 28.7097 2.8463 28.3436C2.83211 28.3092 2.81676 28.2755 2.80025 28.2426C2.64154 27.926 2.37755 27.6794 2.04719 27.542C1.68246 27.3902 1.28048 27.3896 0.91531 27.5403C0.227875 27.8238 -0.143364 28.578 0.0517891 29.2945V29.2946C0.0680848 29.3544 0.0883828 29.4138 0.112046 29.4712C0.267196 29.8474 0.425403 30.2262 0.582247 30.5969C0.900289 31.3482 1.76946 31.7004 2.52043 31.3827C3.27118 31.0651 3.62366 30.1957 3.30621 29.4446Z"
          fill="#171D34"
        />
        <path
          d="M5.93778 34.4969C5.93011 34.4816 5.9221 34.4663 5.91383 34.4511C5.72464 34.1045 5.53404 33.7513 5.34724 33.4013C4.96323 32.682 4.06562 32.4092 3.34625 32.7932C2.70685 33.1344 2.40977 33.8802 2.63986 34.5665C2.66601 34.6446 2.69922 34.7213 2.73801 34.7941C2.93094 35.1555 3.12596 35.5168 3.31769 35.8681C3.70837 36.5839 4.6085 36.8483 5.32422 36.4577C6.02456 36.0755 6.29286 35.2051 5.93778 34.4969Z"
          fill="#171D34"
        />
        <path
          d="M9.08709 38.6702C8.86277 38.3773 8.62803 38.0669 8.36955 37.7214C7.88114 37.0684 6.95254 36.9346 6.29957 37.423C5.73876 37.8424 5.54873 38.6059 5.84771 39.2382C5.8898 39.3273 5.94152 39.4132 6.00118 39.493C6.2677 39.8492 6.5091 40.1684 6.73911 40.4687C7.23493 41.116 8.16498 41.2393 8.81235 40.7435C9.38415 40.3054 9.54706 39.5286 9.23544 38.9071C9.19434 38.825 9.1449 38.7456 9.08709 38.6702Z"
          fill="#171D34"
        />
        <path
          d="M12.7845 42.4846L12.7067 42.4021C12.4596 42.1411 12.2155 41.8783 11.981 41.6209C11.4319 41.0181 10.4947 40.9745 9.89194 41.5236C9.40874 41.9638 9.27197 42.6809 9.5594 43.2673C9.62078 43.3928 9.69993 43.5088 9.79466 43.6127C10.0437 43.886 10.3006 44.1627 10.5582 44.4348L10.6344 44.5154C10.9056 44.8026 11.2725 44.9669 11.6673 44.9782C12.0622 44.9894 12.4377 44.8462 12.7249 44.575C13.0121 44.3038 13.1764 43.9369 13.1877 43.542C13.1948 43.2942 13.141 43.0541 13.033 42.8387C12.9689 42.7107 12.8856 42.5915 12.7845 42.4846Z"
          fill="#171D34"
        />
        <path
          d="M17.4792 46.6112C17.3773 46.3627 17.2089 46.1462 16.987 45.9833C16.7142 45.7829 16.409 45.552 16.0538 45.2772C15.4088 44.7784 14.4782 44.8972 13.9792 45.5422C13.5783 46.0607 13.5634 46.7678 13.9421 47.302C14.0264 47.421 14.1281 47.5268 14.2442 47.6167C14.6195 47.907 14.9439 48.1524 15.236 48.367C15.8932 48.8497 16.8207 48.7078 17.3034 48.0506C17.5372 47.7322 17.633 47.3418 17.5733 46.9513C17.5552 46.8331 17.5235 46.7192 17.4792 46.6112Z"
          fill="#171D34"
        />
        <path
          d="M57.3244 91.0329C57.0053 90.7754 56.605 90.6572 56.1972 90.7L56.1918 90.7006L55.2248 90.8053C54.3812 90.897 53.7693 91.6576 53.8606 92.5008C53.9047 92.9086 54.1048 93.275 54.424 93.5326C54.7431 93.7902 55.1434 93.9084 55.5512 93.8656L55.5566 93.865L56.5236 93.7603C56.6178 93.7501 56.7111 93.7312 56.8011 93.7042C57.5106 93.4914 57.9677 92.8019 57.8878 92.0648C57.8437 91.657 57.6436 91.2905 57.3244 91.0329Z"
          fill="#171D34"
        />
        <path
          d="M52.2034 91.5837C51.8844 91.3262 51.484 91.2079 51.0763 91.2508L51.0708 91.2514L50.1039 91.356C49.6952 91.4003 49.3283 91.601 49.0706 91.9212C48.8129 92.2415 48.6954 92.6429 48.7396 93.0515C48.8306 93.8925 49.589 94.5047 50.4302 94.4163L50.4356 94.4157L51.4026 94.311C51.4967 94.3009 51.59 94.282 51.68 94.255C52.3896 94.0422 52.8467 93.3527 52.7669 92.6155C52.7227 92.2078 52.5226 91.8413 52.2034 91.5837Z"
          fill="#171D34"
        />
        <path
          d="M72.6916 89.447C72.3725 89.1895 71.9722 89.0712 71.5644 89.1141L71.559 89.1146L70.592 89.2193C69.7483 89.311 69.1364 90.0716 69.2278 90.9149C69.3188 91.7558 70.0772 92.368 70.9184 92.2796L70.9238 92.279L71.8908 92.1743C71.985 92.1641 72.0783 92.1453 72.1683 92.1183C72.8778 91.9055 73.3348 91.216 73.255 90.4788C73.2109 90.071 73.0108 89.7046 72.6916 89.447Z"
          fill="#171D34"
        />
        <path
          d="M67.5706 89.9978C67.2515 89.7403 66.8512 89.622 66.4434 89.6648L66.438 89.6654L65.4711 89.7701C65.0624 89.8143 64.6955 90.0151 64.4378 90.3353C64.1801 90.6555 64.0625 91.057 64.1068 91.4656C64.1978 92.3065 64.9562 92.9188 65.7974 92.8304L65.8028 92.8298L66.7698 92.7251C66.864 92.7149 66.9573 92.6961 67.0472 92.6691C67.7568 92.4563 68.2138 91.7668 68.134 91.0296C68.0899 90.6219 67.8898 90.2554 67.5706 89.9978Z"
          fill="#171D34"
        />
        <path
          d="M61.3222 90.2136L61.3168 90.2141L60.3498 90.3188C59.5062 90.4104 58.8943 91.171 58.9856 92.0143C59.0766 92.8553 59.835 93.4675 60.6762 93.3791L60.6816 93.3785L61.6486 93.2739C61.7427 93.2637 61.836 93.2448 61.926 93.2178C62.6356 93.005 63.0927 92.3155 63.0128 91.5784C62.9218 90.7374 62.1634 90.1252 61.3222 90.2136Z"
          fill="#171D34"
        />
        <path
          d="M19.6567 61.1194L18.1956 62.5805C17.8879 62.8882 17.8879 63.3871 18.1956 63.6948C18.5033 64.0024 19.0021 64.0024 19.3099 63.6948L20.7709 62.2337C21.0786 61.926 21.0786 61.4271 20.7709 61.1194C20.4632 60.8118 19.9644 60.8118 19.6567 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M25.8481 54.9261L24.387 56.3872C24.0793 56.6948 24.0793 57.1937 24.387 57.5014C24.6947 57.8091 25.1936 57.8091 25.5013 57.5014L26.9623 56.0403C27.27 55.7326 27.27 55.2338 26.9623 54.9261C26.6547 54.6184 26.1558 54.6184 25.8481 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M25.5013 61.1194C25.1936 60.8118 24.6947 60.8118 24.387 61.1194C24.0793 61.4271 24.0793 61.926 24.387 62.2337L25.8481 63.6948C26.1558 64.0024 26.6546 64.0024 26.9623 63.6948C27.27 63.3871 27.27 62.8882 26.9623 62.5805L25.5013 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M19.3099 54.9261C19.0022 54.6184 18.5033 54.6184 18.1956 54.9261C17.8879 55.2338 17.8879 55.7326 18.1956 56.0403L19.6567 57.5014C19.9644 57.8091 20.4632 57.8091 20.7709 57.5014C21.0786 57.1937 21.0786 56.6949 20.7709 56.3872L19.3099 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M18.6883 12.9255L19.7204 11.8934C19.9377 11.6761 19.9377 11.3237 19.7204 11.1064C19.503 10.889 19.1507 10.889 18.9333 11.1064L17.9013 12.1384C17.6839 12.3558 17.6839 12.7081 17.9013 12.9255C18.1186 13.1428 18.471 13.1428 18.6883 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M23.0633 8.55046L24.0954 7.51842C24.3127 7.30108 24.3127 6.94871 24.0954 6.73137C23.878 6.51402 23.5257 6.51402 23.3083 6.73137L22.2763 7.76341C22.0589 7.98075 22.0589 8.33312 22.2763 8.55046C22.4936 8.76781 22.846 8.76781 23.0633 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M23.3084 12.9255C23.5257 13.1428 23.8781 13.1428 24.0954 12.9255C24.3128 12.7081 24.3128 12.3557 24.0954 12.1384L23.0633 11.1064C22.846 10.889 22.4936 10.889 22.2763 11.1064C22.0589 11.3237 22.0589 11.6761 22.2763 11.8934L23.3084 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M18.9334 8.55046C19.1507 8.76781 19.5031 8.76781 19.7204 8.55046C19.9378 8.33312 19.9378 7.98075 19.7204 7.76341L18.6883 6.73137C18.471 6.51402 18.1186 6.51402 17.9013 6.73137C17.6839 6.94871 17.6839 7.30108 17.9013 7.51842L18.9334 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M91.3759 53.1696L92.4079 52.1376C92.6253 51.9202 92.6253 51.5678 92.4079 51.3505C92.1906 51.1332 91.8382 51.1332 91.6209 51.3505L90.5888 52.3825C90.3714 52.5999 90.3714 52.9523 90.5888 53.1696C90.8062 53.3869 91.1585 53.3869 91.3759 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M95.7548 48.7946L96.7868 47.7626C97.0042 47.5452 97.0042 47.1928 96.7868 46.9755C96.5695 46.7582 96.2171 46.7582 95.9998 46.9755L94.9677 48.0075C94.7504 48.2249 94.7504 48.5773 94.9677 48.7946C95.1851 49.0119 95.5374 49.0119 95.7548 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M95.9998 53.1696C96.2171 53.3869 96.5695 53.3869 96.7868 53.1696C97.0042 52.9523 97.0042 52.5999 96.7868 52.3825L95.7548 51.3505C95.5374 51.1332 95.1851 51.1332 94.9677 51.3505C94.7504 51.5678 94.7504 51.9202 94.9677 52.1376L95.9998 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M91.6209 48.7946C91.8382 49.0119 92.1906 49.0119 92.4079 48.7946C92.6253 48.5773 92.6253 48.2249 92.4079 48.0075L91.3759 46.9755C91.1585 46.7582 90.8062 46.7582 90.5888 46.9755C90.3714 47.1928 90.3714 47.5452 90.5888 47.7626L91.6209 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M64.8055 9.66375L65.8376 8.6317C66.0549 8.41436 66.0549 8.06199 65.8376 7.84465C65.6202 7.6273 65.2679 7.6273 65.0505 7.84465L64.0185 8.87669C63.8011 9.09403 63.8011 9.4464 64.0185 9.66375C64.2358 9.88109 64.5882 9.88109 64.8055 9.66375Z"
          fill="#171D34"
        />
        <path
          d="M69.1805 5.28875L70.2126 4.2567C70.4299 4.03936 70.4299 3.68699 70.2126 3.46965C69.9953 3.2523 69.6429 3.2523 69.4255 3.46965L68.3935 4.50169C68.1761 4.71903 68.1761 5.0714 68.3935 5.28875C68.6108 5.50609 68.9632 5.50609 69.1805 5.28875Z"
          fill="#171D34"
        />
        <path
          d="M69.4255 9.66377C69.6429 9.88111 69.9953 9.88111 70.2126 9.66377C70.4299 9.44643 70.4299 9.09406 70.2126 8.87671L69.1805 7.84465C68.9632 7.6273 68.6108 7.6273 68.3935 7.84465C68.1761 8.06199 68.1761 8.41436 68.3935 8.63171L69.4255 9.66377Z"
          fill="#171D34"
        />
        <path
          d="M65.0505 5.28877C65.2679 5.50611 65.6202 5.50611 65.8376 5.28877C66.0549 5.07142 66.0549 4.71906 65.8376 4.50171L64.8055 3.46965C64.5882 3.2523 64.2358 3.2523 64.0185 3.46965C63.8011 3.68699 63.8011 4.03936 64.0185 4.2567L65.0505 5.28877Z"
          fill="#171D34"
        />
        <path
          d="M77.0935 94.6689L76.0614 95.7009C75.8441 95.9183 75.8441 96.2706 76.0614 96.488C76.2788 96.7053 76.6312 96.7053 76.8485 96.488L77.8806 95.4559C78.0979 95.2386 78.0979 94.8862 77.8806 94.6689C77.6632 94.4515 77.3109 94.4515 77.0935 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M81.4685 90.2919L80.4364 91.324C80.2191 91.5413 80.2191 91.8937 80.4364 92.111C80.6538 92.3284 81.0062 92.3284 81.2235 92.111L82.2555 91.079C82.4729 90.8616 82.4729 90.5093 82.2555 90.2919C82.0382 90.0746 81.6858 90.0746 81.4685 90.2919Z"
          fill="#171D34"
        />
        <path
          d="M81.2235 94.6689C81.0062 94.4515 80.6538 94.4515 80.4364 94.6689C80.2191 94.8862 80.2191 95.2386 80.4364 95.4559L81.4685 96.488C81.6858 96.7053 82.0382 96.7053 82.2555 96.488C82.4729 96.2706 82.4729 95.9183 82.2555 95.7009L81.2235 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M76.8485 90.2919C76.6312 90.0746 76.2788 90.0746 76.0614 90.2919C75.8441 90.5093 75.8441 90.8616 76.0614 91.079L77.0935 92.111C77.3108 92.3283 77.6632 92.3283 77.8806 92.111C78.0979 91.8937 78.0979 91.5413 77.8806 91.324L76.8485 90.2919Z"
          fill="#171D34"
        />
      </svg>
      {screen1.background.party1FirstName}
    </div>
  );

  const WifeImage = () => (
    <div className="userImage">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            d="M94.145 79.4761C88.4439 53.5622 67.7868 45.7609 52.7486 41.787C46.8832 40.2372 41.8728 39.2696 38.9376 38.0368C38.9519 38.0425 38.9607 38.0451 38.9645 38.0451C39.0498 38.0451 36.2456 36.513 34.2286 35.0752C34.0236 34.9289 33.8268 34.784 33.6421 34.6413C33.6449 34.643 33.6467 34.6441 33.6471 34.6441C33.686 34.6441 28.6682 30.2658 25.6182 26.7219C25.2996 26.3513 25.1718 26.1877 24.9228 25.8304C21.3527 20.7028 20.2919 15.773 16.261 15.637C16.119 15.6322 15.9758 15.6289 15.828 15.6289C15.4737 15.6289 15.0935 15.6485 14.6376 15.7158C14.0799 15.811 13.7417 15.9207 13.2944 16.0824C12.4114 16.401 11.5918 16.9726 10.9254 17.7148C10.1401 18.5898 9.56768 19.702 9.35568 20.917C9.14324 22.1349 9.29278 23.4564 9.95297 24.7459C10.0068 24.8511 10.2173 25.2753 10.2644 25.3822C11.9883 29.2898 14.4703 32.7966 17.2216 36.0487C20.7002 40.1607 24.0669 43.2026 27.3571 45.5104C30.6286 47.8048 33.0503 51.0309 34.3594 54.6945C35.0825 56.7182 35.4663 58.8751 35.4663 61.0822V68.0095V87.3623H37.5165H39.7282H68.2311V61.4741C68.2669 61.493 69.1888 62.2521 70.0955 63.0023C70.9844 63.7372 71.8588 64.4636 71.8702 64.4757C72.1016 64.7213 72.3246 64.9591 72.5385 65.1887C74.6812 67.4846 75.9604 68.9604 76.2448 69.2742C76.3178 69.3552 76.3431 69.3833 76.3831 69.4368C77.7829 71.3019 79.4505 74.3578 79.7069 74.7715C82.3316 79.0051 81.8181 86.5071 86.682 87.189C86.8834 87.2174 87.7842 87.3337 88.0184 87.3513C88.1391 87.3601 88.2601 87.3647 88.3799 87.3647C89.9259 87.3647 91.3952 86.6329 92.4891 85.4913C93.1932 84.7559 93.7417 83.8505 94.0546 82.8609C94.3918 81.7945 94.4551 80.6303 94.145 79.4761Z"
            fill="#F6BD3D"
          />
          <path
            d="M51.2219 34.8671C51.4295 34.8757 51.6385 34.8801 51.8483 34.8801C56.6356 34.8801 60.8936 32.6145 63.6089 29.0972C65.545 26.5893 66.6967 23.4452 66.6967 20.0319C66.6967 16.0798 65.1527 12.4883 62.6349 9.82777C59.9284 6.96777 56.0968 5.18359 51.8483 5.18359C51.1225 5.18359 50.4089 5.23572 49.7109 5.33622C42.5232 6.37246 37 12.5569 37 20.0319C37 28.0225 43.312 34.5388 51.2219 34.8671Z"
            fill="#F6BD3D"
          />
        </g>
        <path
          d="M27.413 48.0905C23.8979 46.1422 20.2295 43.472 16.337 39.7495C13.2584 36.8053 10.4208 33.5796 8.29465 29.8753C8.2366 29.7741 7.98259 29.3743 7.91794 29.2756C5.93474 26.2399 7.11085 22.6691 9.35597 20.917C9.56797 19.702 10.1404 18.5899 10.9257 17.7148C10.2499 17.9121 9.81823 18.1107 9.36718 18.3299C7.29228 19.3376 5.66556 21.3421 5.01527 23.6919C4.70739 24.8043 4.62976 25.9362 4.78414 27.0562C4.95172 28.2704 5.38649 29.4216 6.07702 30.4783C6.1375 30.5709 6.34246 30.895 6.39062 30.9758C7.46667 32.8497 8.7347 34.6576 10.2669 36.5025C11.5839 38.0883 13.0723 39.6703 14.8171 41.3388C16.7636 43.2004 18.7431 44.8854 20.7008 46.3474C22.5516 47.7298 24.4514 48.9633 26.3471 50.0141C31.1452 52.6733 34.354 57.5103 34.9308 62.953L35.4666 68.0096V61.0822C35.4666 58.8751 35.0828 56.7182 34.3597 54.6945C32.669 51.9757 30.295 49.6877 27.413 48.0905Z"
          fill="#171D34"
        />
        <path
          d="M99.9448 76.0186C99.8687 75.3586 99.7113 74.7096 99.4768 74.089C98.8765 72.2952 98.1941 70.5466 97.4483 68.8913C96.7169 67.2681 95.9043 65.6893 95.033 64.199C94.1879 62.7532 93.2638 61.3508 92.2869 60.0302C91.3424 58.7534 90.3222 57.5182 89.2547 56.3585C87.2392 54.1691 84.9725 52.1603 82.5178 50.3883C80.2769 48.7703 77.8143 47.3033 75.1986 46.0276C65.2991 41.1995 54.7289 39.7835 47.0109 38.7495C43.7445 38.3118 40.9039 37.9311 39.0146 37.4018C38.9862 37.3882 38.9547 37.3734 38.9193 37.3569C38.792 37.2976 38.6207 37.2199 38.4036 37.1216C37.4624 36.6957 35.6314 35.8668 34.2266 35.0742C36.2436 36.512 39.0478 38.0442 38.9624 38.0442C38.9587 38.0442 38.9499 38.0415 38.9356 38.0358C41.8708 39.2687 46.8812 40.2363 52.7465 41.786C68.0815 44.1963 89.0926 49.9203 97.4055 74.8295C98.637 78.0226 96.8304 81.6194 94.0526 82.8599C93.5627 83.0787 93.0426 83.2243 92.5035 83.2815C92.3843 83.2942 92.2636 83.3024 92.1427 83.3063C91.908 83.3136 91 83.2927 90.7968 83.2859C85.888 83.1201 85.6081 75.6058 82.5521 71.6724C82.2535 71.2879 80.2732 68.4246 78.6847 66.7172C78.6394 66.6686 78.6112 66.6431 78.5299 66.5705C78.1826 66.26 76.4897 64.6784 73.6741 62.2595C73.6484 62.2373 69.8135 59.6878 69.7392 59.6579L70.0935 63.0013L72.4668 85.4021L68.229 85.8512L53.9754 87.3614L39.8843 88.8544L39.7262 87.3614H37.5145L37.6973 89.0859C37.7588 89.6661 38.048 90.1978 38.5017 90.5644C38.9552 90.9313 39.536 91.1026 40.1159 91.0412L72.6984 87.5892C73.2785 87.5276 73.8103 87.2382 74.1769 86.7847C74.5437 86.3311 74.715 85.7505 74.6537 85.1706L72.5365 65.1877L72.4193 64.0807C74.6178 65.9737 76.0989 67.3286 76.7408 67.9158C76.8932 68.0552 76.994 68.1471 77.0639 68.2096C77.0725 68.2175 77.0857 68.2291 77.0967 68.239C78.2774 69.5139 79.7739 71.5868 80.4154 72.4753C80.6301 72.7726 80.7367 72.9202 80.8154 73.0215C81.7153 74.1796 82.3982 75.9049 83.0586 77.5734C83.7383 79.2911 84.4414 81.0674 85.4669 82.4957C86.104 83.3831 86.8011 84.0551 87.5983 84.5504C88.5331 85.1314 89.5843 85.4452 90.7224 85.4837C90.8101 85.4868 91.8657 85.5152 92.2114 85.5044C92.3029 85.5015 92.3951 85.4967 92.487 85.4903C92.5701 85.4844 92.653 85.4771 92.7353 85.4683C93.3623 85.4019 93.9842 85.251 94.5839 85.0201C95.1519 84.8011 95.7011 84.5097 96.2165 84.1539C97.195 83.4785 98.0513 82.5665 98.693 81.5169C99.3547 80.434 99.7845 79.2102 99.9355 77.9778C100.016 77.3231 100.019 76.6638 99.9448 76.0186Z"
          fill="#171D34"
        />
        <path
          d="M32.8372 25.3473C33.1754 26.4132 33.6217 27.4495 34.1633 28.4276C34.6948 29.3876 35.3236 30.3011 36.0319 31.1425C36.7332 31.9755 37.5186 32.7455 38.3663 33.4307C39.2143 34.1162 40.1316 34.7227 41.0931 35.2338C42.0642 35.7502 43.0892 36.1735 44.1391 36.4922C45.209 36.8168 46.3161 37.0358 47.4291 37.1433C48.57 37.2535 49.7309 37.2478 50.8798 37.126C52.0286 37.0043 53.1649 36.7668 54.2574 36.4198C55.3234 36.0816 56.3598 35.6354 57.338 35.0937C58.2979 34.5622 59.2113 33.9334 60.0529 33.2251C60.8857 32.524 61.6556 31.7385 62.3411 30.8907C62.8009 30.3218 63.2256 29.7214 63.6093 29.0973C60.894 32.6146 56.636 34.8802 51.8487 34.8802C51.6389 34.8802 51.43 34.8758 51.2224 34.8672C51.0324 34.8947 50.8408 34.9187 50.6482 34.9391C42.4933 35.8032 35.182 29.8927 34.3179 21.7378C33.4539 13.5829 39.3643 6.2718 47.5192 5.40775C48.2581 5.32946 48.9902 5.30681 49.7113 5.33628C50.4094 5.23578 51.123 5.18365 51.8487 5.18365C56.0973 5.18365 59.9288 6.96783 62.6353 9.82783C62.4735 9.61605 62.3068 9.40801 62.1353 9.20437C61.4342 8.37133 60.6486 7.60141 59.8008 6.91615C58.9531 6.23067 58.0358 5.62393 57.0743 5.11284C56.103 4.5967 55.0782 4.17336 54.0281 3.85471C52.9582 3.53011 51.8513 3.31107 50.7381 3.20353C49.5972 3.09335 48.4363 3.09907 47.2874 3.22091C46.1388 3.34252 45.0023 3.58003 43.9097 3.92684C42.844 4.26529 41.8076 4.7115 40.8294 5.25315C39.8695 5.78468 38.9559 6.41342 38.1145 7.12177C37.2815 7.82286 36.5116 8.6084 35.8263 9.45618C35.1408 10.3039 34.5343 11.2214 34.0232 12.1827C33.5069 13.1541 33.0835 14.1789 32.7649 15.229C32.4403 16.2989 32.2212 17.4057 32.1137 18.5189C32.0035 19.6598 32.0092 20.8208 32.1311 21.9696C32.2527 23.1184 32.4904 24.2547 32.8372 25.3473Z"
          fill="#171D34"
        />
        <path
          d="M3.30621 29.4446C3.15201 29.0801 2.99729 28.7097 2.8463 28.3436C2.83211 28.3092 2.81676 28.2755 2.80025 28.2426C2.64154 27.926 2.37755 27.6794 2.04719 27.542C1.68246 27.3902 1.28048 27.3896 0.91531 27.5403C0.227875 27.8238 -0.143364 28.578 0.0517891 29.2945V29.2946C0.0680848 29.3544 0.0883828 29.4138 0.112046 29.4712C0.267196 29.8474 0.425403 30.2262 0.582247 30.5969C0.900289 31.3482 1.76946 31.7004 2.52043 31.3827C3.27118 31.0651 3.62366 30.1957 3.30621 29.4446Z"
          fill="#171D34"
        />
        <path
          d="M5.93778 34.4969C5.93011 34.4816 5.9221 34.4663 5.91383 34.4511C5.72464 34.1045 5.53404 33.7513 5.34724 33.4013C4.96323 32.682 4.06562 32.4092 3.34625 32.7932C2.70685 33.1344 2.40977 33.8802 2.63986 34.5665C2.66601 34.6446 2.69922 34.7213 2.73801 34.7941C2.93094 35.1555 3.12596 35.5168 3.31769 35.8681C3.70837 36.5839 4.6085 36.8483 5.32422 36.4577C6.02456 36.0755 6.29286 35.2051 5.93778 34.4969Z"
          fill="#171D34"
        />
        <path
          d="M9.08709 38.6702C8.86277 38.3773 8.62803 38.0669 8.36955 37.7214C7.88114 37.0684 6.95254 36.9346 6.29957 37.423C5.73876 37.8424 5.54873 38.6059 5.84771 39.2382C5.8898 39.3273 5.94152 39.4132 6.00118 39.493C6.2677 39.8492 6.5091 40.1684 6.73911 40.4687C7.23493 41.116 8.16498 41.2393 8.81235 40.7435C9.38415 40.3054 9.54706 39.5286 9.23544 38.9071C9.19434 38.825 9.1449 38.7456 9.08709 38.6702Z"
          fill="#171D34"
        />
        <path
          d="M12.7845 42.4846L12.7067 42.4021C12.4596 42.1411 12.2155 41.8783 11.981 41.6209C11.4319 41.0181 10.4947 40.9745 9.89194 41.5236C9.40874 41.9638 9.27197 42.6809 9.5594 43.2673C9.62078 43.3928 9.69993 43.5088 9.79466 43.6127C10.0437 43.886 10.3006 44.1627 10.5582 44.4348L10.6344 44.5154C10.9056 44.8026 11.2725 44.9669 11.6673 44.9782C12.0622 44.9894 12.4377 44.8462 12.7249 44.575C13.0121 44.3038 13.1764 43.9369 13.1877 43.542C13.1948 43.2942 13.141 43.0541 13.033 42.8387C12.9689 42.7107 12.8856 42.5915 12.7845 42.4846Z"
          fill="#171D34"
        />
        <path
          d="M17.4792 46.6112C17.3773 46.3627 17.2089 46.1462 16.987 45.9833C16.7142 45.7829 16.409 45.552 16.0538 45.2772C15.4088 44.7784 14.4782 44.8972 13.9792 45.5422C13.5783 46.0607 13.5634 46.7678 13.9421 47.302C14.0264 47.421 14.1281 47.5268 14.2442 47.6167C14.6195 47.907 14.9439 48.1524 15.236 48.367C15.8932 48.8497 16.8207 48.7078 17.3034 48.0506C17.5372 47.7322 17.633 47.3418 17.5733 46.9513C17.5552 46.8331 17.5235 46.7192 17.4792 46.6112Z"
          fill="#171D34"
        />
        <path
          d="M57.3244 91.0329C57.0053 90.7754 56.605 90.6572 56.1972 90.7L56.1918 90.7006L55.2248 90.8053C54.3812 90.897 53.7693 91.6576 53.8606 92.5008C53.9047 92.9086 54.1048 93.275 54.424 93.5326C54.7431 93.7902 55.1434 93.9084 55.5512 93.8656L55.5566 93.865L56.5236 93.7603C56.6178 93.7501 56.7111 93.7312 56.8011 93.7042C57.5106 93.4914 57.9677 92.8019 57.8878 92.0648C57.8437 91.657 57.6436 91.2905 57.3244 91.0329Z"
          fill="#171D34"
        />
        <path
          d="M52.2034 91.5837C51.8844 91.3262 51.484 91.2079 51.0763 91.2508L51.0708 91.2514L50.1039 91.356C49.6952 91.4003 49.3283 91.601 49.0706 91.9212C48.8129 92.2415 48.6954 92.6429 48.7396 93.0515C48.8306 93.8925 49.589 94.5047 50.4302 94.4163L50.4356 94.4157L51.4026 94.311C51.4967 94.3009 51.59 94.282 51.68 94.255C52.3896 94.0422 52.8467 93.3527 52.7669 92.6155C52.7227 92.2078 52.5226 91.8413 52.2034 91.5837Z"
          fill="#171D34"
        />
        <path
          d="M72.6916 89.447C72.3725 89.1895 71.9722 89.0712 71.5644 89.1141L71.559 89.1146L70.592 89.2193C69.7483 89.311 69.1364 90.0716 69.2278 90.9149C69.3188 91.7558 70.0772 92.368 70.9184 92.2796L70.9238 92.279L71.8908 92.1743C71.985 92.1641 72.0783 92.1453 72.1683 92.1183C72.8778 91.9055 73.3348 91.216 73.255 90.4788C73.2109 90.071 73.0108 89.7046 72.6916 89.447Z"
          fill="#171D34"
        />
        <path
          d="M67.5706 89.9978C67.2515 89.7403 66.8512 89.622 66.4434 89.6648L66.438 89.6654L65.4711 89.7701C65.0624 89.8143 64.6955 90.0151 64.4378 90.3353C64.1801 90.6555 64.0625 91.057 64.1068 91.4656C64.1978 92.3065 64.9562 92.9188 65.7974 92.8304L65.8028 92.8298L66.7698 92.7251C66.864 92.7149 66.9573 92.6961 67.0472 92.6691C67.7568 92.4563 68.2138 91.7668 68.134 91.0296C68.0899 90.6219 67.8898 90.2554 67.5706 89.9978Z"
          fill="#171D34"
        />
        <path
          d="M61.3222 90.2136L61.3168 90.2141L60.3498 90.3188C59.5062 90.4104 58.8943 91.171 58.9856 92.0143C59.0766 92.8553 59.835 93.4675 60.6762 93.3791L60.6816 93.3785L61.6486 93.2739C61.7427 93.2637 61.836 93.2448 61.926 93.2178C62.6356 93.005 63.0927 92.3155 63.0128 91.5784C62.9218 90.7374 62.1634 90.1252 61.3222 90.2136Z"
          fill="#171D34"
        />
        <path
          d="M19.6567 61.1194L18.1956 62.5805C17.8879 62.8882 17.8879 63.3871 18.1956 63.6948C18.5033 64.0024 19.0021 64.0024 19.3099 63.6948L20.7709 62.2337C21.0786 61.926 21.0786 61.4271 20.7709 61.1194C20.4632 60.8118 19.9644 60.8118 19.6567 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M25.8481 54.9261L24.387 56.3872C24.0793 56.6948 24.0793 57.1937 24.387 57.5014C24.6947 57.8091 25.1936 57.8091 25.5013 57.5014L26.9623 56.0403C27.27 55.7326 27.27 55.2338 26.9623 54.9261C26.6547 54.6184 26.1558 54.6184 25.8481 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M25.5013 61.1194C25.1936 60.8118 24.6947 60.8118 24.387 61.1194C24.0793 61.4271 24.0793 61.926 24.387 62.2337L25.8481 63.6948C26.1558 64.0024 26.6546 64.0024 26.9623 63.6948C27.27 63.3871 27.27 62.8882 26.9623 62.5805L25.5013 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M19.3099 54.9261C19.0022 54.6184 18.5033 54.6184 18.1956 54.9261C17.8879 55.2338 17.8879 55.7326 18.1956 56.0403L19.6567 57.5014C19.9644 57.8091 20.4632 57.8091 20.7709 57.5014C21.0786 57.1937 21.0786 56.6949 20.7709 56.3872L19.3099 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M18.6883 12.9255L19.7204 11.8934C19.9377 11.6761 19.9377 11.3237 19.7204 11.1064C19.503 10.889 19.1507 10.889 18.9333 11.1064L17.9013 12.1384C17.6839 12.3558 17.6839 12.7081 17.9013 12.9255C18.1186 13.1428 18.471 13.1428 18.6883 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M23.0633 8.55046L24.0954 7.51842C24.3127 7.30108 24.3127 6.94871 24.0954 6.73137C23.878 6.51402 23.5257 6.51402 23.3083 6.73137L22.2763 7.76341C22.0589 7.98075 22.0589 8.33312 22.2763 8.55046C22.4936 8.76781 22.846 8.76781 23.0633 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M23.3084 12.9255C23.5257 13.1428 23.8781 13.1428 24.0954 12.9255C24.3128 12.7081 24.3128 12.3557 24.0954 12.1384L23.0633 11.1064C22.846 10.889 22.4936 10.889 22.2763 11.1064C22.0589 11.3237 22.0589 11.6761 22.2763 11.8934L23.3084 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M18.9334 8.55046C19.1507 8.76781 19.5031 8.76781 19.7204 8.55046C19.9378 8.33312 19.9378 7.98075 19.7204 7.76341L18.6883 6.73137C18.471 6.51402 18.1186 6.51402 17.9013 6.73137C17.6839 6.94871 17.6839 7.30108 17.9013 7.51842L18.9334 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M91.3759 53.1696L92.4079 52.1376C92.6253 51.9202 92.6253 51.5678 92.4079 51.3505C92.1906 51.1332 91.8382 51.1332 91.6209 51.3505L90.5888 52.3825C90.3714 52.5999 90.3714 52.9523 90.5888 53.1696C90.8062 53.3869 91.1585 53.3869 91.3759 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M95.7548 48.7946L96.7868 47.7626C97.0042 47.5452 97.0042 47.1928 96.7868 46.9755C96.5695 46.7582 96.2171 46.7582 95.9998 46.9755L94.9677 48.0075C94.7504 48.2249 94.7504 48.5773 94.9677 48.7946C95.1851 49.0119 95.5374 49.0119 95.7548 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M95.9998 53.1696C96.2171 53.3869 96.5695 53.3869 96.7868 53.1696C97.0042 52.9523 97.0042 52.5999 96.7868 52.3825L95.7548 51.3505C95.5374 51.1332 95.1851 51.1332 94.9677 51.3505C94.7504 51.5678 94.7504 51.9202 94.9677 52.1376L95.9998 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M91.6209 48.7946C91.8382 49.0119 92.1906 49.0119 92.4079 48.7946C92.6253 48.5773 92.6253 48.2249 92.4079 48.0075L91.3759 46.9755C91.1585 46.7582 90.8062 46.7582 90.5888 46.9755C90.3714 47.1928 90.3714 47.5452 90.5888 47.7626L91.6209 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M64.8055 9.66375L65.8376 8.6317C66.0549 8.41436 66.0549 8.06199 65.8376 7.84465C65.6202 7.6273 65.2679 7.6273 65.0505 7.84465L64.0185 8.87669C63.8011 9.09403 63.8011 9.4464 64.0185 9.66375C64.2358 9.88109 64.5882 9.88109 64.8055 9.66375Z"
          fill="#171D34"
        />
        <path
          d="M69.1805 5.28875L70.2126 4.2567C70.4299 4.03936 70.4299 3.68699 70.2126 3.46965C69.9953 3.2523 69.6429 3.2523 69.4255 3.46965L68.3935 4.50169C68.1761 4.71903 68.1761 5.0714 68.3935 5.28875C68.6108 5.50609 68.9632 5.50609 69.1805 5.28875Z"
          fill="#171D34"
        />
        <path
          d="M69.4255 9.66377C69.6429 9.88111 69.9953 9.88111 70.2126 9.66377C70.4299 9.44643 70.4299 9.09406 70.2126 8.87671L69.1805 7.84465C68.9632 7.6273 68.6108 7.6273 68.3935 7.84465C68.1761 8.06199 68.1761 8.41436 68.3935 8.63171L69.4255 9.66377Z"
          fill="#171D34"
        />
        <path
          d="M65.0505 5.28877C65.2679 5.50611 65.6202 5.50611 65.8376 5.28877C66.0549 5.07142 66.0549 4.71906 65.8376 4.50171L64.8055 3.46965C64.5882 3.2523 64.2358 3.2523 64.0185 3.46965C63.8011 3.68699 63.8011 4.03936 64.0185 4.2567L65.0505 5.28877Z"
          fill="#171D34"
        />
        <path
          d="M77.0935 94.6689L76.0614 95.7009C75.8441 95.9183 75.8441 96.2706 76.0614 96.488C76.2788 96.7053 76.6312 96.7053 76.8485 96.488L77.8806 95.4559C78.0979 95.2386 78.0979 94.8862 77.8806 94.6689C77.6632 94.4515 77.3109 94.4515 77.0935 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M81.4685 90.2919L80.4364 91.324C80.2191 91.5413 80.2191 91.8937 80.4364 92.111C80.6538 92.3284 81.0062 92.3284 81.2235 92.111L82.2555 91.079C82.4729 90.8616 82.4729 90.5093 82.2555 90.2919C82.0382 90.0746 81.6858 90.0746 81.4685 90.2919Z"
          fill="#171D34"
        />
        <path
          d="M81.2235 94.6689C81.0062 94.4515 80.6538 94.4515 80.4364 94.6689C80.2191 94.8862 80.2191 95.2386 80.4364 95.4559L81.4685 96.488C81.6858 96.7053 82.0382 96.7053 82.2555 96.488C82.4729 96.2706 82.4729 95.9183 82.2555 95.7009L81.2235 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M76.8485 90.2919C76.6312 90.0746 76.2788 90.0746 76.0614 90.2919C75.8441 90.5093 75.8441 90.8616 76.0614 91.079L77.0935 92.111C77.3108 92.3283 77.6632 92.3283 77.8806 92.111C78.0979 91.8937 78.0979 91.5413 77.8806 91.324L76.8485 90.2919Z"
          fill="#171D34"
        />
      </svg>
      {screen1.background.party2FirstName}
    </div>
  );

  interface ArrowDetails {
    amount: number | string;
    givenTo: boolean;
  }

  const AmountGivenToParty1 = (givenTo: string): boolean => {
    return screen1.background.party1FirstName === givenTo;
  };

  const ChildSpecialExpenseArrow = ({ amount, givenTo }: ArrowDetails) => {
    return (
      <div className="arrow">
        <span>
          {formatNumberInThousands(amount)
            .toString()
            .replace(/(\.00|\.0+)$/, "")}{" "}
          Child Special Expense Support
        </span>
        <svg
          width="345"
          height="51"
          viewBox="0 0 345 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            opacity="0.5"
            d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
            fill="#F6BD3D"
          />{" "}
        </svg>
      </div>
    );
  };

  const LumpsumArrow = ({ amount, givenTo }: ArrowDetails) => {
    return (
      <div className="arrow">
        <span>
          {amount} {""}
          Lump Sum Amount
        </span>
        <svg
          width="345"
          height="51"
          viewBox="0 0 345 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            opacity="0.5"
            d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
            fill="#F6BD3D"
          />{" "}
        </svg>
      </div>
    );
  };

  const LifeinsurenceArrow = ({ amount, givenTo }: ArrowDetails) => {
    return (
      <div className="arrow">
        <span>
          {amount} {""}
          Lump Sum Amount
        </span>
        <svg
          width="345"
          height="51"
          viewBox="0 0 345 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            opacity="0.5"
            d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
            fill="#F6BD3D"
          />{" "}
        </svg>
      </div>
    );
  };

  const SpousalSupportArrow = ({ amount, givenTo }: ArrowDetails) =>
    typeOfCalculatorSelected !== "CHILD_SUPPORT_CAL" && (
      <div className="arrow">
        <svg
          width="345"
          height="51"
          viewBox="0 0 345 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            opacity="0.5"
            d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
            fill="#F6BD3D"
          />{" "}
        </svg>
        <span>
          {formatNumberInThousands(amount)
            .toString()
            .replace(/(\.00|\.0+)$/, "")}{" "}
          Spousal Support
        </span>
      </div>
    );

  const ChildSupportArrow = ({ amount, givenTo }: ArrowDetails) => (
    <div className="arrow">
      <svg
        width="345"
        height="51"
        viewBox="0 0 345 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          opacity="0.5"
          d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
          fill="#73C3FD"
        />{" "}
      </svg>
      <span>
        {formatNumberInThousands(amount)
          .toString()
          .replace(/(\.00|\.0+)$/, "")}{" "}
        Child Support (Table Amount)
      </span>
    </div>
  );

  const ChildSupportSpecialArrow = ({ amount, givenTo }: ArrowDetails) => (
    <div
      className="justify-content-center d-flex my-5"
      style={{ position: "relative" }}
    >
      <img src="/images/arrow_black.jpeg" className="w-75" alt="" />
      <span
        style={{ position: "absolute", top: "40%", color: "white" }}
        className="heading-5"
      >
        {formatNumberInThousands(amount)} Child Support (Special Expenses)
      </span>
    </div>
  );


  const handleChangeRestrcution = (event) => {
    const { checked } = event.target;
    setRestructioring(checked);
  };

 
  const saveScenariotoDB = async () => {
    let allreportresult = {
      ...screen2.report_data,
      scenarios: scenarios,
      restructioring:restructioring
    };
    if (getCalculatorIdFromQuery(query)) {
      await apiCalculatorById.edit_value(getCalculatorIdFromQuery(query), {
        report_data: allreportresult,
      });

      downloadReports(getCalculatorIdFromQuery(query));
    } else {
      alert("Please fill provice data first");
    }
  };


  const handleChildData=(value)=>{
       
    // setCollectedValues((prevValues) => [...prevValues, value]);
    console.log("unnder value",value)
  }

  const handleApiResponse=()=>{
    setApiToggle(!apiToggle)
  }



 

  return (
    <>
      {/* <OverviewCal screen1={screen1} incomeDetails={{party1: screen2.totalIncomeParty1,party2: screen2.totalIncomeParty2,}}taxDetails={{ party1: 0, party2: 0 }}/> */}
      <div className="panel">
        {/* <input type="checkbox" onChange={handleChangeRestrcution} value={restructioring}/> */}
        <div className="pHead">
          <span className="h5">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.2355 16.2939V16.2937C49.1858 15.8088 48.9513 15.3668 48.622 15.05C48.4339 14.8687 48.2148 14.7283 47.9817 14.6442C47.8415 14.5935 47.7354 14.559 47.5604 14.5291C47.4175 14.5081 47.2982 14.502 47.1871 14.502C47.1408 14.502 47.0959 14.503 47.0513 14.5045C45.7871 14.5472 45.4544 16.0934 44.3346 17.7014C43.7284 18.5721 41.5916 20.4633 41.6019 20.4633C41.602 20.4633 41.6025 20.4629 41.6034 20.4623C40.9754 20.9472 39.9012 21.5325 39.9306 21.5325C39.9318 21.5325 39.9345 21.5317 39.9389 21.53C38.7876 22.0136 36.6183 22.3671 34.1799 23.1103C33.7001 23.2565 33.2098 23.4178 32.7148 23.5983C33.8214 24.617 34.7922 25.7618 35.6165 27.04C36.8212 28.9081 37.7129 31.0611 38.2579 33.5218C38.2641 33.5457 38.27 33.5698 38.2758 33.5938V33.5939C38.4207 34.2042 38.4127 34.8215 38.2776 35.4045C38.1985 35.7462 38.077 36.071 37.9218 36.3728C37.8688 36.4759 37.8118 36.5764 37.7511 36.674C37.6811 36.7868 37.6063 36.8957 37.5271 37.0003H41.0278V28.7579C41.0278 27.588 41.3715 26.463 41.9919 25.509V25.5089C42.3837 24.9065 42.886 24.3722 43.4816 23.938C43.5112 23.9163 43.541 23.895 43.5711 23.8739C44.6031 23.1501 45.659 22.196 46.7501 20.9063C47.6129 19.8864 48.3914 18.7865 48.9321 17.5609C48.9469 17.5275 49.0129 17.3944 49.0297 17.3614C49.2129 17.0036 49.2708 16.6379 49.2355 16.2939Z"
                fill="#73C3FD"
              />
              <path
                d="M36.6911 33.9006C35.6839 29.3217 33.4655 26.2302 30.7932 24.0684C29.9585 23.3931 29.0795 22.8086 28.1793 22.2978C25.4523 20.7504 22.5306 19.8796 20.0559 19.2134C17.9156 18.6371 16.1095 18.2137 15.0525 17.6378C14.2853 17.2198 13.6069 16.8161 12.9055 16.2746C12.9059 16.2749 12.9061 16.275 12.9062 16.275C12.9159 16.275 11.0852 14.6502 10.0242 13.4752C9.80166 13.2288 9.61309 13.0022 9.48234 12.8144C8.07908 10.799 7.66204 8.86126 6.07771 8.80781C6.01791 8.80573 5.96113 8.80469 5.90695 8.80469C5.51804 8.80469 5.25758 8.85782 4.91158 8.98284C4.65966 9.07379 4.42087 9.21705 4.20876 9.40041C3.71795 9.82444 3.36976 10.4626 3.33163 11.1623C3.30986 11.5604 3.38841 11.9783 3.59824 12.3882C3.89297 12.9639 4.41129 14.4148 6.45527 16.8309C7.82258 18.4472 9.14593 19.6428 10.4392 20.5499C11.4222 21.2394 12.2102 22.1429 12.7566 23.1737C13.3197 24.236 13.6266 25.4333 13.6266 26.6707V28.7662V37.0005H14.4544H15.5015H20.6031V36.559C20.6031 35.6875 20.1758 34.8675 19.46 34.3654C18.0395 33.3692 16.7202 31.9103 15.8851 30.6563C15.3315 29.8252 15.11 29.2653 15.0228 29.0934C14.0148 27.1217 15.4176 24.6907 17.7844 24.6907C18.2023 24.6907 18.5578 24.7661 18.8646 24.8948C19.9977 25.3694 20.4665 26.5694 20.9593 27.3752C20.9844 26.9795 21.0534 26.6015 21.1609 26.2445C21.5669 24.8952 22.52 23.8434 23.7034 23.2533C24.3895 22.9111 25.153 22.7241 25.9323 22.7241C26.8635 22.7241 27.8167 22.991 28.6878 23.5794C31.3796 25.3981 31.6539 29.3244 29.1265 31.4745C29.8932 31.772 30.6227 32.1146 31.3084 32.5087C33.0573 33.514 34.5206 34.8552 35.5856 36.6423C35.806 36.4993 36.006 36.3189 36.1762 36.1114C36.5895 35.6078 36.8279 34.9438 36.7579 34.2632C36.7456 34.1426 36.7236 34.0215 36.6911 33.9006Z"
                fill="#73C3FD"
              />
              <path
                d="M20.0669 16.2294C20.1004 16.2294 20.1338 16.2291 20.1672 16.2286C23.3443 16.175 25.9032 13.5828 25.9032 10.393C25.9032 7.16968 23.2902 4.55664 20.0669 4.55664C19.7728 4.55664 19.4839 4.57842 19.2016 4.6204C16.3885 5.03839 14.2305 7.46369 14.2305 10.393C14.2305 13.6164 16.8435 16.2294 20.0669 16.2294Z"
                fill="#73C3FD"
              />
              <path
                d="M35.8914 19.8414C38.4634 19.8414 40.5484 17.7564 40.5484 15.1844C40.5484 12.6124 38.4634 10.5273 35.8914 10.5273C33.3194 10.5273 31.2344 12.6124 31.2344 15.1844C31.2344 17.7564 33.3194 19.8414 35.8914 19.8414Z"
                fill="#73C3FD"
              />
              <path
                d="M24.4873 30.7242C24.8896 30.9134 25.327 31.0215 25.7732 31.0405C25.8204 31.0425 25.8677 31.0435 25.915 31.0435C26.324 31.0435 26.7376 30.9684 27.1364 30.8119C27.5231 30.6601 27.8747 30.4385 28.1757 30.1627H28.1758C28.8442 29.5501 29.2631 28.67 29.2631 27.6921C29.2631 25.8418 27.763 24.3418 25.9128 24.3418C25.4428 24.3418 24.9952 24.4387 24.5892 24.6135C23.397 25.1267 22.5625 26.3119 22.5625 27.6921C22.5625 28.3757 22.7673 29.0115 23.1188 29.5415C23.4686 30.0689 23.9462 30.4698 24.4873 30.7242Z"
                fill="#73C3FD"
              />
              <path
                d="M35.4343 40.6159L35.4342 40.6157C34.4578 36.3259 31.6191 33.921 27.4228 32.5828C26.7896 32.3808 26.1788 32.2175 25.6137 32.0754C25.1064 32.0404 24.6059 31.9168 24.14 31.7118C23.6875 31.5957 23.3021 31.4846 23.0071 31.3618C23.0073 31.362 23.0073 31.362 23.0071 31.362C23.0066 31.362 23.0037 31.3608 22.9984 31.3582C23.0013 31.3593 23.0042 31.3606 23.0071 31.3618C22.9952 31.3492 22.2034 30.9006 21.8033 30.5918C21.8029 30.5914 21.8016 30.5903 21.8 30.5887C21.7834 30.5735 21.7034 30.5015 21.5834 30.3916C21.1416 29.9868 20.1608 29.0703 19.836 28.6039C19.2097 27.7046 18.9539 26.9107 18.4802 26.5335H18.4801C18.2933 26.3847 18.0727 26.3008 17.7821 26.3008C17.6991 26.3008 17.6105 26.3077 17.5153 26.3217C16.5353 26.4887 16.0296 27.5218 16.4582 28.3592C16.4704 28.383 16.5179 28.4786 16.5286 28.5028C17.2473 30.1321 18.8834 31.9911 20.3852 33.0444C21.1383 33.5725 21.6918 34.3194 21.9828 35.1666C22.1346 35.6088 22.215 36.0781 22.215 36.558V42.4877H29.6079V36.6464C29.6227 36.6543 30.4214 37.3156 30.429 37.3237C31.0028 37.9329 31.3457 38.3287 31.416 38.4064C31.4984 38.4975 31.6258 38.6897 31.754 38.8964V38.8965C31.9671 39.2397 32.1822 39.6226 32.1972 39.6468C32.6322 40.3483 32.6852 41.4478 33.1176 42.0431V42.0432C33.2738 42.2584 33.4797 42.4077 33.7711 42.4486C33.8165 42.455 34.0198 42.4813 34.0726 42.4852C34.0998 42.4872 34.1271 42.4883 34.1542 42.4883C34.6092 42.4883 35.0348 42.2074 35.2811 41.8067C35.4765 41.489 35.5593 41.0962 35.455 40.7083C35.4483 40.6773 35.4414 40.6466 35.4343 40.6159Z"
                fill="#73C3FD"
              />
              <path
                d="M49.9932 13.5865C49.9656 13.1846 49.8563 12.7959 49.6685 12.4313C49.2726 11.6629 48.5598 11.0844 47.7616 10.8836C47.5913 10.8408 47.4161 10.8008 47.1483 10.7823L47.1367 10.7816L47.1253 10.7811C46.9459 10.7728 46.7784 10.7772 46.5984 10.7954C46.5462 10.8006 46.4922 10.807 46.4287 10.8156C46.0599 10.8653 45.7203 10.9923 45.4194 11.1928C45.16 11.366 44.9324 11.5895 44.7238 11.8761C44.4011 12.3196 44.169 12.8569 43.9234 13.4256C43.7316 13.8695 43.5333 14.3287 43.2742 14.7941C43.1869 14.9508 42.9326 15.3425 42.211 16.2027C41.7463 16.7567 41.2772 17.2788 41.077 17.5018C41.0403 17.5424 41.0116 17.5744 40.9922 17.5963C40.991 17.5976 40.9898 17.5989 40.9886 17.6002C40.6178 17.9426 40.0393 18.3651 39.7562 18.5718C39.6951 18.6164 39.6469 18.6516 39.6101 18.6791C39.6089 18.68 39.6078 18.6808 39.6066 18.6818C39.2254 18.8766 38.6856 19.0835 38.0556 19.31H38.0555C38.0554 19.3101 38.0554 19.3101 38.0553 19.3101C37.8181 19.3955 37.5679 19.4837 37.3088 19.5751C37.1465 19.6323 36.9792 19.6912 36.8075 19.7522C36.8074 19.7522 36.8073 19.7523 36.8072 19.7523H36.8071C36.807 19.7523 36.807 19.7523 36.8069 19.7524C35.6078 20.1781 34.1942 20.6998 32.7599 21.3921L31.6327 21.9362C31.1488 21.6316 30.645 21.3444 30.1244 21.0773C28.4693 20.2282 26.6175 19.5561 24.4627 19.0227C22.6269 18.5683 20.886 18.2902 19.35 18.0447C17.6961 17.7804 16.2676 17.5522 15.4465 17.2062C14.6926 16.8887 14.0481 16.5895 13.3667 16.1694C13.363 16.1665 13.3588 16.1634 13.3544 16.1601C13.3272 16.1397 13.2872 16.11 13.2361 16.0721C12.9349 15.8484 12.2293 15.3247 11.5123 14.7539C10.7171 14.121 10.2719 13.7196 10.0251 13.4755C9.92189 13.3735 9.85334 13.2989 9.80843 13.2465C9.36544 12.7294 9.00361 12.2096 8.65355 11.7068C8.21859 11.082 7.80779 10.4918 7.32229 10.0473C7.01797 9.76874 6.70844 9.56725 6.37589 9.43139C5.99384 9.27532 5.58461 9.21063 5.15975 9.23886C5.08807 9.24365 5.0191 9.24938 4.9545 9.25584C4.70946 9.28054 4.49443 9.31898 4.28346 9.37888C4.25887 9.38586 4.23428 9.39316 4.20969 9.40076C4.02383 9.45796 3.83859 9.53256 3.63606 9.62965C2.7731 10.0431 2.09424 10.8693 1.82013 11.8399C1.69011 12.2999 1.65552 12.7686 1.71709 13.2333C1.78377 13.7371 1.9613 14.2151 2.24478 14.654C2.28542 14.717 2.33928 14.8076 2.40158 14.9126C2.60922 15.2623 2.92302 15.7908 3.44227 16.4785C4.05092 17.2846 4.8049 18.1237 5.68306 18.9726C6.44934 19.7134 7.22946 20.3846 8.00147 20.9677C8.73253 21.5197 9.48338 22.0131 10.2332 22.4339C12.0632 23.461 13.2808 25.3178 13.4902 27.4007L13.6275 28.7666V26.671C13.6275 25.4336 13.3207 24.2363 12.7576 23.1741C12.195 22.5197 11.5161 21.9592 10.7432 21.5254C9.36555 20.7522 7.92927 19.695 6.40714 18.2235C4.13176 16.024 3.47092 14.6323 3.12003 14.0889C2.46378 13.0725 2.70309 11.9093 3.33257 11.1626C3.54552 10.9099 3.80327 10.7047 4.08613 10.5692C4.41796 10.4103 4.67175 10.3313 5.05869 10.2925C5.11266 10.2871 5.16923 10.2824 5.22892 10.2784C6.81065 10.1731 7.41939 12.0594 9.01726 13.9243C9.87605 14.9266 12.7818 17.024 12.7702 17.0252C12.7701 17.0252 12.7699 17.025 12.7694 17.0248C13.5214 17.4935 14.237 17.8273 15.042 18.1664C16.1307 18.625 17.9228 18.8652 20.0568 19.2137C24.89 20.0028 31.4771 21.3469 35.6182 27.0407C36.6531 28.4635 37.5351 30.1578 38.199 32.1831C38.3765 32.6511 38.3887 33.14 38.2775 33.5945V33.5946C38.1396 34.1592 37.8112 34.6705 37.3732 35.0217C37.1771 34.7569 36.9722 34.5044 36.7588 34.2635C35.0968 32.3864 32.9238 31.2163 30.4296 30.5258C32.2108 28.673 32.213 25.9279 30.7941 24.0687C30.3812 23.5276 29.848 23.0616 29.2032 22.7143C28.8672 22.5333 28.5246 22.3957 28.1802 22.2981C27.576 22.127 26.9662 22.0796 26.376 22.1389C25.39 22.238 24.4595 22.6355 23.7044 23.2537C22.5703 24.1815 21.8316 25.6064 21.8933 27.264C21.6643 26.9623 21.4329 26.5971 21.1619 26.2448C20.6356 25.5602 19.9606 24.9238 18.8656 24.8951C18.7381 24.8918 18.605 24.8967 18.4657 24.9106C16.1108 25.1473 14.9581 27.7063 16.1583 29.5674C16.2624 29.7298 16.5387 30.2646 17.1727 31.0363C18.129 32.2005 19.5877 33.5201 21.1007 34.3693C21.4564 34.5689 21.7566 34.8436 21.9843 35.1679C22.245 35.5389 22.411 35.9747 22.4575 36.4373L22.5017 36.8767L22.2165 36.9053L15.5601 37.5746L15.5024 37.0008H14.4553L14.5235 37.6788L14.6278 38.7154L15.6643 38.6112L22.2165 37.9525L22.606 37.9133L23.1736 37.8562L23.6183 42.2803L23.6394 42.4891L23.7226 43.3169L24.7592 43.2127L32.115 42.4731L33.1517 42.3689L33.1191 42.0445V42.0444C32.6867 41.4491 32.6337 40.3496 32.1987 39.6481C32.1837 39.6239 31.9686 39.241 31.7555 38.8978C31.8851 40.1856 32.0047 41.3759 32.0109 41.4366L29.6094 41.678L24.655 42.1761C24.6494 42.121 24.1122 36.7772 24.106 36.7154L24.0618 36.276C23.9218 34.8835 23.1103 33.6481 21.8898 32.9632C20.2902 32.0653 18.4763 30.3794 17.5982 28.8301C17.5851 28.8072 17.5284 28.7168 17.5139 28.6944C17.0036 27.904 17.4033 26.8255 18.3618 26.5613C18.4029 26.551 18.4428 26.5421 18.4816 26.5349H18.4817C18.5312 26.5254 18.5788 26.5184 18.6251 26.5138C19.6476 26.4111 19.9049 27.4395 20.8991 28.5999C21.269 29.0315 22.3366 29.8453 22.8165 30.2038C22.947 30.3012 23.0338 30.3649 23.0517 30.3783C23.0538 30.3799 23.0551 30.3808 23.0553 30.3811C23.4843 30.6483 24.3171 31.0154 24.3302 31.0267C24.636 31.1195 25.0305 31.1915 25.4924 31.2616C25.9765 31.4191 26.4868 31.4919 26.9951 31.4761C27.5716 31.5609 28.1956 31.6624 28.8459 31.7999C28.8459 31.7998 28.8459 31.7998 28.8459 31.7998C29.7193 31.9846 30.5416 32.2186 31.3093 32.5091C33.3326 33.2743 34.9767 34.4313 36.1772 36.1117C36.7847 36.9619 37.2785 37.946 37.6505 39.0812C37.9729 39.9305 37.346 40.9007 36.5343 40.9823C36.5074 40.985 36.4801 40.9867 36.4529 40.9875C36.3999 40.9888 36.1951 40.983 36.1492 40.9812C35.8424 40.9692 35.6167 40.8304 35.4358 40.6172C35.4429 40.6479 35.4498 40.6787 35.4565 40.7096C35.5608 41.0975 35.478 41.4903 35.2827 41.808C35.5798 41.9607 35.8711 42.0129 36.1085 42.0222C36.1109 42.0223 36.376 42.0316 36.48 42.0289C36.5326 42.0275 36.586 42.0242 36.6386 42.0189C37.0042 41.9821 37.3638 41.8492 37.6786 41.6343C37.9628 41.4405 38.2112 41.1791 38.397 40.8786C38.5883 40.5694 38.7134 40.2185 38.7589 39.864C38.8077 39.4823 38.7646 39.0933 38.634 38.7369C38.4496 38.1769 38.2328 37.6388 37.9897 37.137C37.9676 37.0915 37.9453 37.0462 37.9226 37.001C37.8677 36.891 37.811 36.7823 37.7529 36.6747C37.7038 36.5841 37.6537 36.4944 37.6026 36.4058L37.9235 36.3735L39.4458 36.2204L41.0295 36.0612L42.9289 35.8703L43.9656 35.7661L43.8614 34.7294L43.0369 26.5283C42.9465 25.6293 43.1076 24.7354 43.4834 23.9387C42.8878 24.3729 42.3855 24.9072 41.9937 25.5096V25.5097C41.9607 25.88 41.9623 26.2556 42.0002 26.6325L42.8247 34.8336L41.0295 35.0142L39.3416 35.1839C39.6418 34.6914 39.8512 34.1253 39.9287 33.5209C40.0077 32.904 39.9466 32.2638 39.7208 31.6497C38.542 28.0705 36.6607 25.2533 34.1816 23.111C33.8682 22.84 33.5452 22.5799 33.2128 22.3304C36.0969 20.9384 38.878 20.2641 40.1918 19.5509C40.1888 19.5524 40.1867 19.5532 40.1858 19.5533C40.1566 19.5562 41.1652 18.8674 41.7417 18.3221C41.7314 18.3232 43.6684 16.2277 44.1844 15.3008C45.1377 13.5888 45.3141 12.017 46.5676 11.8482C46.6119 11.8422 46.6565 11.8366 46.7026 11.832C46.8131 11.8209 46.9324 11.815 47.0768 11.8218C47.2538 11.834 47.3628 11.8576 47.5075 11.894C48.4671 12.1354 49.2929 13.2894 48.822 14.4929C48.8085 14.5274 48.7561 14.6663 48.7448 14.7011C48.7066 14.8184 48.6661 14.935 48.6237 15.0507C48.953 15.3675 49.1876 15.8095 49.2373 16.2944C49.4315 15.8703 49.5954 15.4521 49.7334 15.03C49.744 14.9999 49.7815 14.8999 49.7923 14.8725C49.9556 14.4549 50.0232 14.0223 49.9932 13.5865ZM28.3825 30.0672C28.3143 30.1022 28.2456 30.1346 28.176 30.1645H28.1759C27.8749 30.4404 27.5233 30.662 27.1365 30.8138C26.7377 30.9703 26.3241 31.0454 25.9152 31.0454C25.8679 31.0454 25.8206 31.0443 25.7734 31.0424C25.3272 31.0234 24.8897 30.9153 24.4874 30.7261C23.9463 30.4716 23.4687 30.0708 23.119 29.5434C22.7675 29.0134 22.5626 28.3776 22.5626 27.694C22.5626 26.3138 23.3972 25.1286 24.5893 24.6154C25.1038 24.1431 25.7695 23.8272 26.5178 23.752C28.3588 23.5669 30.0014 24.9094 30.1864 26.7503C30.3283 28.1618 29.5724 29.4564 28.3825 30.0672Z"
                fill="#171D34"
              />
              <path
                d="M13.2672 13.7551C13.4795 14.1436 13.7312 14.5136 14.0152 14.8546C14.2963 15.1921 14.6114 15.5045 14.952 15.7827C15.2926 16.0611 15.6613 16.3078 16.0481 16.5161C16.4388 16.7264 16.8515 16.8995 17.2745 17.0303C18.1547 17.3026 19.0694 17.3935 19.9928 17.3007C20.9162 17.2079 21.7944 16.9367 22.6029 16.4946C22.9914 16.2822 23.3612 16.0305 23.7023 15.7466C24.0399 15.4655 24.3521 15.1502 24.6305 14.8098C24.9088 14.4692 25.1555 14.1004 25.3637 13.7137C25.5742 13.3229 25.7472 12.9103 25.878 12.4873C26.1503 11.6069 26.2413 10.6924 26.1485 9.76894C26.0556 8.84555 25.7843 7.96739 25.3423 7.15892C25.13 6.77042 24.8783 6.40046 24.5942 6.05947C24.3132 5.72191 23.998 5.40957 23.6574 5.13129C23.3168 4.85291 22.9481 4.6062 22.5613 4.39794C22.1706 4.18759 21.7579 4.01454 21.335 3.88369C20.4547 3.61146 19.5401 3.5205 18.6167 3.61333C17.6932 3.70616 16.815 3.97735 16.0066 4.4194C15.6181 4.63183 15.2482 4.88354 14.9071 5.16744C14.5696 5.44853 14.2573 5.76379 13.9789 6.10426C13.7007 6.44484 13.454 6.81365 13.2457 7.20039C13.0352 7.59118 12.8622 8.00375 12.7314 8.42673C12.4591 9.30709 12.3682 10.2216 12.461 11.1451C12.5538 12.0685 12.8251 12.9467 13.2672 13.7551ZM18.7209 4.64996C18.8818 4.63371 19.0419 4.62433 19.2007 4.62131C19.4831 4.57932 19.772 4.55755 20.066 4.55755C23.2893 4.55755 25.9024 7.17059 25.9024 10.3939C25.9024 13.5837 23.3434 16.1759 20.1663 16.2295C20.0745 16.2431 19.9819 16.2547 19.8886 16.2641C16.6814 16.5865 13.8201 14.248 13.4976 11.0408C13.1752 7.83373 15.5137 4.97242 18.7209 4.64996Z"
                fill="#171D34"
              />
              <path
                d="M24.3295 31.0265C24.3296 31.0265 24.3296 31.0264 24.3294 31.0262C24.3264 31.0253 24.3234 31.0244 24.3203 31.0234C24.3259 31.0256 24.3289 31.0265 24.3295 31.0265Z"
                fill="#171D34"
              />
              <path
                d="M30.5291 16.3735C30.7052 16.6954 30.9137 17.0019 31.149 17.2845C31.3819 17.5642 31.643 17.8229 31.9251 18.0534C32.2072 18.284 32.5127 18.4884 32.8331 18.6609C33.1569 18.8352 33.4987 18.9786 33.8492 19.087C34.5787 19.3126 35.3365 19.388 36.1015 19.3111C36.8666 19.2342 37.5942 19.0095 38.2641 18.6431C38.586 18.4671 38.8926 18.2586 39.1751 18.0233C39.4548 17.7904 39.7135 17.5293 39.9441 17.2472C40.1746 16.9651 40.379 16.6596 40.5515 16.3392C40.7259 16.0154 40.8692 15.6735 40.9776 15.323C41.2032 14.5936 41.2787 13.8358 41.2017 13.0708C41.1248 12.3057 40.9001 11.5781 40.5338 10.9082C40.3578 10.5863 40.1492 10.2797 39.9139 9.99716C39.6811 9.71751 39.4199 9.45881 39.1378 9.22825C38.8557 8.99769 38.5502 8.7933 38.2298 8.62077C37.9061 8.44643 37.5642 8.30307 37.2137 8.19466C36.4842 7.96905 35.7264 7.89365 34.9614 7.97057C34.1964 8.04749 33.4688 8.27222 32.7988 8.63853C32.4769 8.81454 32.1704 9.02309 31.8878 9.25839C31.6081 9.49125 31.3494 9.75236 31.1189 10.0345C30.8883 10.3166 30.6839 10.6221 30.5114 10.9425C30.3371 11.2662 30.1937 11.6081 30.0853 11.9586C29.8597 12.6881 29.7843 13.4459 29.8612 14.2109C29.9381 14.9759 30.1628 15.7035 30.5291 16.3735ZM35.0656 9.00717C37.6247 8.74989 39.9078 10.6159 40.1651 13.175C40.4224 15.7341 38.5564 18.0172 35.9973 18.2745C33.4382 18.5318 31.1551 16.6658 30.8978 14.1067C30.6405 11.5476 32.5065 9.26445 35.0656 9.00717Z"
                fill="#171D34"
              />
              <path
                d="M1.58405 15.1558C1.49722 14.9896 1.40991 14.8207 1.32454 14.6536C1.31651 14.6379 1.30797 14.6226 1.29892 14.6077C1.2118 14.4643 1.07766 14.3581 0.916395 14.3059C0.738334 14.2482 0.548511 14.2634 0.381879 14.3486C0.0681914 14.5089 -0.0781038 14.8793 0.0416035 15.2101V15.2102C0.0516052 15.2378 0.0634723 15.265 0.0768495 15.2912C0.164572 15.4629 0.253847 15.6357 0.342164 15.8047C0.521225 16.1472 0.945181 16.2801 1.28755 16.1012C1.62983 15.9223 1.76283 15.4982 1.58405 15.1558Z"
                fill="#171D34"
              />
              <path
                d="M3.02166 17.439C3.01745 17.4321 3.01307 17.4252 3.00859 17.4183C2.90593 17.2619 2.80234 17.1025 2.70069 16.9444C2.49169 16.6195 2.05737 16.5252 1.73246 16.7342C1.44368 16.92 1.33208 17.2835 1.46713 17.5987C1.48247 17.6346 1.50111 17.6695 1.52223 17.7024C1.62723 17.8656 1.73321 18.0288 1.83724 18.1873C2.04924 18.5102 2.48443 18.6005 2.80736 18.3885C3.12334 18.1811 3.21655 17.7598 3.02166 17.439Z"
                fill="#171D34"
              />
              <path
                d="M4.66702 19.2897C4.54983 19.16 4.42706 19.0225 4.29171 18.8693C4.03597 18.5798 3.59237 18.5523 3.30283 18.808C3.05415 19.0276 2.9938 19.3954 3.15929 19.6825C3.18258 19.7229 3.21032 19.7615 3.24155 19.7969C3.38109 19.9548 3.50736 20.0963 3.62751 20.2292C3.88652 20.5158 4.33042 20.5382 4.61702 20.2792C4.87016 20.0504 4.9172 19.6773 4.74616 19.3958C4.72361 19.3587 4.69721 19.3231 4.66702 19.2897Z"
                fill="#171D34"
              />
              <path
                d="M6.69009 21.1053C6.6549 21.0474 6.61099 20.9943 6.55916 20.9477L6.51921 20.9117C6.39252 20.798 6.26715 20.6833 6.14655 20.5708C5.86406 20.3073 5.41988 20.3227 5.15636 20.6052C4.94514 20.8316 4.90814 21.1755 5.06641 21.4413C5.10022 21.4982 5.14205 21.5499 5.19078 21.5954C5.31886 21.7148 5.45083 21.8356 5.58294 21.9542L5.622 21.9893C5.76112 22.1145 5.94065 22.178 6.12752 22.1681C6.3144 22.1582 6.48624 22.0762 6.61138 21.937C6.73656 21.7979 6.80005 21.6184 6.79017 21.4315C6.78399 21.3142 6.74938 21.2029 6.69009 21.1053Z"
                fill="#171D34"
              />
              <path
                d="M8.90943 23.4021C9.0076 23.2427 9.03784 23.0547 8.99459 22.8726C8.9815 22.8175 8.96215 22.7649 8.9371 22.7156C8.87944 22.6022 8.79157 22.5065 8.68053 22.4381C8.54403 22.354 8.39101 22.2567 8.21274 22.1406C7.88901 21.9299 7.45415 22.0218 7.24336 22.3455C7.074 22.6057 7.09414 22.9402 7.29349 23.1779C7.33788 23.2308 7.38996 23.2769 7.44828 23.3148C7.63664 23.4375 7.79927 23.5409 7.94545 23.6309C8.27433 23.8336 8.70678 23.7309 8.90943 23.4021Z"
                fill="#171D34"
              />
              <path
                d="M45.2 33.2241C45.3769 33.2055 45.5362 33.1191 45.6483 32.9809C45.7604 32.8428 45.8122 32.6693 45.7941 32.4923L45.7939 32.4899L45.7496 32.0703C45.7453 32.0294 45.7372 31.9889 45.7256 31.9498C45.6342 31.6418 45.3356 31.4426 45.0156 31.4764C44.8387 31.495 44.6794 31.5814 44.5673 31.7196C44.4552 31.8577 44.4034 32.0313 44.4215 32.2082L44.4217 32.2106L44.466 32.6302C44.5048 32.9964 44.834 33.2627 45.2 33.2241Z"
                fill="#171D34"
              />
              <path
                d="M46.0283 34.7126L45.984 34.293C45.9797 34.2521 45.9716 34.2116 45.96 34.1725C45.8685 33.8644 45.5699 33.6653 45.25 33.699C45.0731 33.7177 44.9138 33.8041 44.8017 33.9422C44.6896 34.0804 44.6378 34.2539 44.6559 34.4309L44.6561 34.4332L44.7004 34.8529C44.7191 35.0302 44.8057 35.1897 44.9443 35.3018C45.083 35.414 45.257 35.4655 45.4344 35.4468C45.7993 35.4083 46.0658 35.08 46.0285 34.715L46.0283 34.7126Z"
                fill="#171D34"
              />
              <path
                d="M44.5281 26.5542C44.8931 26.5157 45.1596 26.1874 45.1222 25.8224L45.122 25.82L45.0777 25.4004C45.0734 25.3595 45.0654 25.319 45.0537 25.2799C44.9623 24.9718 44.6637 24.7727 44.3438 24.8065C44.1668 24.8251 44.0076 24.9115 43.8954 25.0497C43.7833 25.1878 43.7315 25.3613 43.7496 25.5383L43.7499 25.5406L43.7941 25.9603C43.8329 26.3265 44.1622 26.5928 44.5281 26.5542Z"
                fill="#171D34"
              />
              <path
                d="M44.2725 28.6319C44.4111 28.7441 44.5852 28.7956 44.7625 28.7769C45.1274 28.7384 45.394 28.4101 45.3566 28.045L45.3564 28.0427L45.3121 27.623C45.3078 27.5821 45.2997 27.5416 45.2881 27.5026C45.1967 27.1945 44.8981 26.9954 44.5781 27.0291C44.4012 27.0478 44.2419 27.1341 44.1298 27.2723C44.0177 27.4105 43.9659 27.584 43.984 27.7609L43.9842 27.7633L44.0285 28.183C44.0472 28.3603 44.1339 28.5197 44.2725 28.6319Z"
                fill="#171D34"
              />
              <path
                d="M44.9929 30.9996C45.3578 30.9611 45.6244 30.6328 45.587 30.2677L45.5868 30.2653L45.5425 29.8457C45.5382 29.8048 45.5302 29.7643 45.5186 29.7253C45.4271 29.4171 45.1285 29.218 44.8086 29.2518C44.4436 29.2902 44.1771 29.6186 44.2144 29.9836L44.2147 29.986L44.2589 30.4056C44.2976 30.7718 44.6269 31.0382 44.9929 30.9996Z"
                fill="#171D34"
              />
              <path
                d="M8.65306 34.0859L7.96089 34.7781C7.81512 34.9238 7.81512 35.1602 7.96089 35.3059C8.10665 35.4517 8.34298 35.4517 8.48875 35.3059L9.18093 34.6138C9.32669 34.468 9.32669 34.2317 9.18093 34.0859C9.03516 33.9401 8.79883 33.9401 8.65306 34.0859Z"
                fill="#171D34"
              />
              <path
                d="M11.5867 31.1503L10.8945 31.8425C10.7487 31.9883 10.7487 32.2246 10.8945 32.3704C11.0402 32.5162 11.2766 32.5162 11.4223 32.3704L12.1145 31.6782C12.2603 31.5324 12.2603 31.2961 12.1145 31.1503C11.9688 31.0046 11.7324 31.0046 11.5867 31.1503Z"
                fill="#171D34"
              />
              <path
                d="M11.4224 34.0859C11.2766 33.9401 11.0403 33.9401 10.8945 34.0859C10.7487 34.2316 10.7487 34.468 10.8945 34.6138L11.5867 35.3059C11.7324 35.4517 11.9688 35.4517 12.1145 35.3059C12.2603 35.1602 12.2603 34.9238 12.1145 34.7781L11.4224 34.0859Z"
                fill="#171D34"
              />
              <path
                d="M8.48876 31.1503C8.34299 31.0046 8.10666 31.0046 7.96089 31.1503C7.81512 31.2961 7.81513 31.5324 7.96089 31.6782L8.65307 32.3704C8.79883 32.5162 9.03516 32.5162 9.18094 32.3704C9.32671 32.2246 9.3267 31.9883 9.18094 31.8425L8.48876 31.1503Z"
                fill="#171D34"
              />
              <path
                d="M46.6091 25.5011L46.1202 25.99C46.0172 26.0929 46.0172 26.2599 46.1202 26.3628C46.2232 26.4658 46.3901 26.4658 46.4931 26.3628L46.982 25.8739C47.085 25.771 47.085 25.604 46.982 25.5011C46.879 25.3981 46.7121 25.3981 46.6091 25.5011Z"
                fill="#171D34"
              />
              <path
                d="M48.6833 23.4268L48.1944 23.9158C48.0914 24.0187 48.0914 24.1857 48.1944 24.2886C48.2974 24.3916 48.4643 24.3916 48.5673 24.2886L49.0562 23.7997C49.1592 23.6967 49.1592 23.5298 49.0562 23.4268C48.9533 23.3239 48.7863 23.3239 48.6833 23.4268Z"
                fill="#171D34"
              />
              <path
                d="M48.5673 25.5011C48.4643 25.3981 48.2974 25.3981 48.1944 25.5011C48.0914 25.604 48.0914 25.771 48.1944 25.8739L48.6833 26.3628C48.7863 26.4658 48.9532 26.4658 49.0562 26.3628C49.1592 26.2599 49.1592 26.0929 49.0562 25.99L48.5673 25.5011Z"
                fill="#171D34"
              />
              <path
                d="M46.4931 23.4268C46.3901 23.3239 46.2232 23.3239 46.1202 23.4268C46.0172 23.5298 46.0172 23.6967 46.1202 23.7997L46.6091 24.2886C46.7121 24.3916 46.879 24.3916 46.982 24.2886C47.085 24.1857 47.085 24.0187 46.982 23.9158L46.4931 23.4268Z"
                fill="#171D34"
              />
              <path
                d="M8.20791 7.97417L8.69684 7.48524C8.7998 7.38228 8.7998 7.21534 8.69684 7.11238C8.59387 7.00942 8.42694 7.00942 8.32397 7.11238L7.83504 7.60131C7.73207 7.70427 7.73207 7.8712 7.83504 7.97417C7.93801 8.07713 8.10495 8.07713 8.20791 7.97417Z"
                fill="#171D34"
              />
              <path
                d="M10.2821 5.9019L10.7711 5.41298C10.874 5.31001 10.874 5.14308 10.7711 5.04011C10.6681 4.93715 10.5012 4.93715 10.3982 5.04011L9.90925 5.52904C9.80629 5.632 9.80629 5.79894 9.90925 5.9019C10.0122 6.00487 10.1792 6.00487 10.2821 5.9019Z"
                fill="#171D34"
              />
              <path
                d="M10.3982 7.97417C10.5012 8.07713 10.6681 8.07713 10.7711 7.97417C10.874 7.8712 10.874 7.70427 10.7711 7.60131L10.2821 7.11238C10.1792 7.00942 10.0122 7.00942 9.90925 7.11238C9.80629 7.21534 9.80629 7.38228 9.90925 7.48524L10.3982 7.97417Z"
                fill="#171D34"
              />
              <path
                d="M8.32397 5.9019C8.42694 6.00487 8.59387 6.00487 8.69684 5.9019C8.7998 5.79894 8.7998 5.632 8.69684 5.52904L8.20791 5.04011C8.10495 4.93715 7.93801 4.93715 7.83504 5.04011C7.73207 5.14308 7.73207 5.31001 7.83504 5.41298L8.32397 5.9019Z"
                fill="#171D34"
              />
              <path
                d="M40.8993 9.40972L41.3882 8.92079C41.4912 8.81783 41.4912 8.65089 41.3882 8.54793C41.2853 8.44496 41.1183 8.44496 41.0154 8.54793L40.5264 9.03685C40.4235 9.13982 40.4235 9.30675 40.5264 9.40972C40.6294 9.51268 40.7963 9.51268 40.8993 9.40972Z"
                fill="#171D34"
              />
              <path
                d="M42.9735 7.3355L43.4625 6.84657C43.5654 6.74361 43.5654 6.57667 43.4625 6.47371C43.3595 6.37074 43.1926 6.37074 43.0896 6.47371L42.6007 6.96263C42.4977 7.0656 42.4977 7.23253 42.6007 7.3355C42.7036 7.43846 42.8706 7.43846 42.9735 7.3355Z"
                fill="#171D34"
              />
              <path
                d="M43.0896 9.40973C43.1926 9.51269 43.3595 9.51269 43.4625 9.40973C43.5654 9.30676 43.5654 9.13983 43.4625 9.03686L42.9735 8.54793C42.8706 8.44496 42.7036 8.44496 42.6007 8.54793C42.4977 8.65089 42.4977 8.81783 42.6007 8.92079L43.0896 9.40973Z"
                fill="#171D34"
              />
              <path
                d="M41.0154 7.33551C41.1183 7.43847 41.2853 7.43847 41.3882 7.33551C41.4912 7.23254 41.4912 7.06561 41.3882 6.96264L40.8993 6.47371C40.7963 6.37074 40.6294 6.37074 40.5264 6.47371C40.4235 6.57667 40.4235 6.74361 40.5264 6.84657L41.0154 7.33551Z"
                fill="#171D34"
              />
              <path
                d="M25.7849 45.5909L25.296 46.0798C25.193 46.1828 25.193 46.3497 25.296 46.4527C25.3989 46.5557 25.5659 46.5557 25.6688 46.4527L26.1578 45.9638C26.2607 45.8608 26.2607 45.6939 26.1578 45.5909C26.0548 45.4879 25.8879 45.4879 25.7849 45.5909Z"
                fill="#171D34"
              />
              <path
                d="M27.8591 43.5167L27.3702 44.0056C27.2672 44.1086 27.2672 44.2755 27.3702 44.3785C27.4732 44.4814 27.6401 44.4814 27.7431 44.3785L28.232 43.8895C28.335 43.7866 28.335 43.6196 28.232 43.5167C28.129 43.4137 27.9621 43.4137 27.8591 43.5167Z"
                fill="#171D34"
              />
              <path
                d="M27.7431 45.5909C27.6401 45.4879 27.4732 45.4879 27.3702 45.5909C27.2672 45.6939 27.2672 45.8608 27.3702 45.9638L27.8591 46.4527C27.9621 46.5556 28.129 46.5556 28.232 46.4527C28.335 46.3497 28.335 46.1828 28.232 46.0798L27.7431 45.5909Z"
                fill="#171D34"
              />
              <path
                d="M25.6688 43.5167C25.5659 43.4137 25.3989 43.4137 25.296 43.5167C25.193 43.6196 25.193 43.7866 25.296 43.8895L25.7849 44.3785C25.8879 44.4814 26.0548 44.4814 26.1578 44.3785C26.2607 44.2755 26.2607 44.1086 26.1578 44.0056L25.6688 43.5167Z"
                fill="#171D34"
              />
            </svg>{" "}
            Support Quantum range
          </span>
        </div>
        {
          !apiToggle ? 
          <div className="pBody">
          <span className="heading">Scenario 1- Low End</span>
          <div className="scenarioView">
            <HusbandImage />
            <div className="arrowView">
              <SpousalSupportArrow
                amount={Math.round(supportQuantum.support1.spousalSupport)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support1.spousalSupportGivenTo
                )}
              />
              <ChildSupportArrow
                amount={Math.round(supportQuantum.support1.childSupport)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support1.childSupportGivenTo
                )}
              />
              <ChildSpecialExpenseArrow
                amount={Math.round(supportQuantum.support1.childSpecialExpense)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support1.childSupportGivenTo
                )}
              />
              {includeLumpsum && !includeLifeInsurence && (
                <LumpsumArrow amount={lumpsumLow} />
              )}

              {includeLifeInsurence && (
                <>
                  <LumpsumArrow amount={lumpsumLow} />
                  <LifeinsurenceArrow amount={lifeinsurenceLow} />
                </>
              )}
            </div>
            <WifeImage />
          </div>
          <span className="heading mt-5">Scenario 2- Midpoint</span>
          <div className="scenarioView">
            <HusbandImage />
            <div className="arrowView">
              <SpousalSupportArrow
                amount={Math.round(supportQuantum.support2.spousalSupport)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support2.spousalSupportGivenTo
                )}
              />
              <ChildSupportArrow
                amount={Math.round(supportQuantum.support2.childSupport)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support2.childSupportGivenTo
                )}
              />
              <ChildSpecialExpenseArrow
                amount={Math.round(supportQuantum.support2.childSpecialExpense)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support2.childSupportGivenTo
                )}
              />

              {includeLumpsum && !includeLifeInsurence && (
                <LumpsumArrow amount={lumpsumMid} />
              )}

              {includeLifeInsurence && (
                <>
                  <LumpsumArrow amount={lumpsumMid} />
                  <LifeinsurenceArrow amount={lifeinsurenceMid} />
                </>
              )}
            </div>
            <WifeImage />
          </div>
          <span className="heading mt-5">Scenario 3- High End</span>
          <div className="scenarioView">
            <HusbandImage />
            <div className="arrowView">
              <SpousalSupportArrow
                amount={Math.round(supportQuantum.support3.spousalSupport)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support3.spousalSupportGivenTo
                )}
              />
              <ChildSupportArrow
                amount={Math.round(supportQuantum.support3.childSupport)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support3.childSupportGivenTo
                )}
              />
              <ChildSpecialExpenseArrow
                amount={Math.round(supportQuantum.support3.childSpecialExpense)}
                givenTo={AmountGivenToParty1(
                  supportQuantum.support3.childSupportGivenTo
                )}
              />
              {includeLumpsum && !includeLifeInsurence && (
                <LumpsumArrow amount={lumpsumHigh} />
              )}

              {includeLifeInsurence && (
                <>
                  <LumpsumArrow amount={lumpsumHigh} />
                  <LifeinsurenceArrow amount={lifeinsurenceHigh} />
                </>
              )}
            </div>
            <WifeImage />
          </div>
          <div>

          </div>
          {typeOfCalculatorSelected !== "CHILD_SUPPORT_CAL" && (
            <>
              <div className="pHead">
                <span className="h5">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_832_36514)">
                      <path
                        d="M44.6296 24.7346C44.5112 24.5828 44.3643 24.4475 44.1911 24.3365C43.3712 23.8136 42.2807 24.0119 41.7086 24.7881C39.2177 28.1798 36.4511 31.4853 33.486 34.6121L33.459 34.6403L33.4268 34.6627C33.3495 34.716 33.2741 34.7685 33.2002 34.8198C32.4302 35.3553 31.7653 35.8174 30.6204 36.1612C30.0169 36.3414 29.3897 36.4465 28.7557 36.4736C26.3642 36.5724 23.9294 36.5988 21.4972 36.5525C21.4812 36.5525 21.465 36.5523 21.449 36.5516H21.4488C20.9526 36.542 20.4564 36.5292 19.9609 36.5135C19.7002 36.5052 19.4519 36.3957 19.2796 36.2133C19.1223 36.0466 19.0413 35.8346 19.0516 35.6163C19.0733 35.1496 19.503 34.7827 20.008 34.7987C20.4958 34.8142 20.9848 34.8266 21.4744 34.836C23.6279 34.877 25.7962 34.8586 27.9392 34.7808C28.691 34.7537 29.398 34.4378 29.8787 33.9136C29.9394 33.8473 29.9958 33.7788 30.0474 33.7082C30.3506 33.2945 30.4963 32.8112 30.4613 32.3232C30.3691 31.0346 29.1938 30.0647 27.7863 30.1151C27.6975 30.119 24.8809 30.2406 21.3732 30.1891C19.8731 30.167 18.2465 30.1132 16.653 30.005C16.4909 29.9952 16.3271 29.9904 16.1617 29.9904C15.9907 29.9904 15.8182 29.9956 15.6446 30.0058C14.103 30.0959 12.4742 30.5822 11.0453 31.3939C7.73969 33.2721 4.25912 35.0011 0.700307 36.5329C0.429961 36.6492 0.30459 36.9504 0.415067 37.2183C1.74418 40.444 3.23731 43.6766 4.85298 46.826C4.92367 46.9639 5.04641 47.0618 5.19836 47.1017C5.35031 47.1416 5.50622 47.1168 5.63762 47.0323C5.7038 46.9896 5.76997 46.947 5.83614 46.9039C6.04559 46.7686 6.25505 46.6321 6.46412 46.495C7.07815 46.0921 7.68955 45.6827 8.29038 45.2722C9.76164 44.2707 11.4116 43.4912 13.1951 42.9548C14.9237 42.4348 16.7347 42.1555 18.5777 42.1243C19.4104 42.111 21.2284 42.0323 23.6526 41.8333C25.8258 41.6549 28.4861 41.3798 31.3609 40.9682C31.9501 40.8838 32.5481 40.7939 33.1529 40.6977C33.6879 40.6128 34.1798 40.4213 34.5906 40.1429C34.8034 39.999 34.9944 39.8317 35.1588 39.6438C35.3309 39.4429 35.5025 39.2412 35.6729 39.0393C36.8484 37.6474 37.9863 36.2297 39.0835 34.7904C40.7292 32.6321 42.2834 30.4253 43.735 28.185C44.0765 27.658 44.4124 27.1294 44.7423 26.5989C44.9097 26.3257 44.9872 26.0241 44.9825 25.7265C44.9768 25.3722 44.8547 25.0233 44.6296 24.7346Z"
                        fill="#73C3FD"
                      />
                      <path
                        d="M15.0977 21.7153C15.8179 22.3745 16.6242 23.0435 17.4939 23.7034C18.2689 24.2916 18.9993 24.8014 19.6065 25.2136C19.6067 25.2139 19.6071 25.2139 19.6073 25.2141C19.9036 25.415 20.1706 25.5928 20.3993 25.745C20.5721 25.86 20.7213 25.9593 20.8483 26.0454C21.2043 26.2867 21.7357 26.6665 22.2483 27.1058C22.2551 27.1117 22.2606 27.1163 22.2647 27.1198C22.524 27.3074 22.8891 27.2952 23.1357 27.0895C23.1425 27.084 23.1619 27.0678 23.1928 27.0425C23.2649 26.9837 23.3983 26.8761 23.5731 26.7408C23.7264 26.622 23.9113 26.4823 24.1147 26.3356C24.2426 26.2431 24.3777 26.1482 24.5169 26.0539C24.6541 25.961 24.8072 25.8587 24.9844 25.7404C26.0626 25.0204 27.8525 23.8251 29.6414 22.2787C31.4893 20.6808 33.3363 18.708 34.3964 16.4969C35.0044 15.2288 35.3102 13.9692 35.3102 12.7396C35.3102 12.379 35.2838 12.0212 35.2312 11.6663C35.0444 10.4078 34.6221 9.30823 33.9733 8.38853C33.8463 8.20831 33.7105 8.03493 33.5661 7.86876C33.3397 7.60804 33.0905 7.36376 32.8247 7.14255C32.3524 6.74908 31.8253 6.42854 31.2633 6.18019C28.5532 4.98205 25.0327 5.46138 22.9555 7.52994L22.6863 7.79804L22.4174 7.52938C22.1767 7.28879 21.9156 7.06833 21.6377 6.86873C21.4313 6.72028 21.2154 6.58345 20.9918 6.45864C20.246 6.04171 19.4125 5.75625 18.5436 5.61352C17.3346 5.41485 16.0569 5.49258 14.8524 5.87756C14.4788 5.99703 14.0376 6.17189 13.5761 6.42614C12.1674 7.20238 10.5701 8.71885 10.1342 11.6584C9.71491 14.4841 10.9554 17.4471 13.8212 20.4649C14.2148 20.8796 14.6445 21.3004 15.0977 21.7153Z"
                        fill="#73C3FD"
                      />
                      <path
                        d="M44.5484 21.0599L44.5481 21.0597C43.3113 20.4565 41.8146 20.9087 41.1404 22.0897C39.0865 25.7024 36.7519 29.2614 34.2019 32.6677C34.1408 32.721 34.0813 32.7737 34.0226 32.8254C33.3424 33.4249 32.8053 33.8985 31.8203 34.3212C31.3007 34.5433 30.7513 34.7006 30.1878 34.7892C27.345 35.2318 24.4263 35.5767 21.5126 35.8144C21.4534 35.8192 21.3942 35.802 21.3544 35.7686C21.3391 35.7558 21.3207 35.7353 21.3188 35.7104C21.3148 35.6543 21.3816 35.5865 21.483 35.5777C24.1252 35.3624 26.7925 35.0533 29.4109 34.6591C30.3554 34.5173 31.203 34.0132 31.7366 33.2759C32.2164 32.6127 32.4002 31.8283 32.2541 31.067C32.0999 30.262 31.6204 29.5618 30.904 29.0956C30.1973 28.6356 29.3366 28.453 28.48 28.5819L28.4766 28.5823C28.4204 28.5913 22.8036 29.4802 17.4881 29.7206L17.4849 29.7208C16.8935 29.7524 16.271 29.8497 15.6455 30.007C15.288 30.0969 14.9296 30.2064 14.5754 30.3342C13.5317 30.7112 12.5529 31.2308 11.6659 31.8789C8.62569 34.1013 5.39529 36.196 2.0644 38.1052C1.77181 38.2729 1.56085 38.5414 1.46979 38.8612C1.37892 39.181 1.41814 39.5178 1.58027 39.8093C2.90806 42.1951 4.33502 44.5737 5.837 46.9051C6.26873 47.5758 6.70687 48.2425 7.15066 48.9043C7.35389 49.2075 7.68041 49.4115 8.04653 49.4643C8.15965 49.4807 8.27333 49.482 8.38475 49.4695C8.63417 49.441 8.87285 49.3422 9.06872 49.1814C9.89089 48.5073 10.713 47.814 11.512 47.1212C14.0398 44.9374 17.3956 43.4782 20.9608 43.0121C22.337 42.8334 26.3866 42.1702 31.3618 40.9694C28.4869 41.381 25.8266 41.6561 23.6535 41.8345C22.3734 42.062 21.4061 42.2093 20.8612 42.28C19.0342 42.5188 17.2681 43.0007 15.6123 43.7121C13.9037 44.4463 12.3564 45.4068 11.0126 46.5676C10.2184 47.2565 9.40147 47.9452 8.58459 48.6151C8.46412 48.7141 8.31217 48.7562 8.15644 48.7337C8.00072 48.7111 7.86743 48.6279 7.7809 48.4988C7.33635 47.8357 6.89747 47.1679 6.46499 46.4962C4.97525 44.1828 3.55961 41.8228 2.24237 39.4557C2.10117 39.202 2.19034 38.8889 2.44523 38.7428C5.80024 36.8198 9.05421 34.7095 12.117 32.4709C13.59 31.3944 15.3561 30.6902 17.0342 30.4994C17.1984 30.4808 17.3618 30.4671 17.5239 30.4584C18.8176 30.3997 20.1286 30.3033 21.374 30.1903C25.2563 29.838 28.5013 29.3266 28.5961 29.3116C29.9884 29.1028 31.2698 29.9339 31.513 31.2033C31.621 31.7661 31.4819 32.3505 31.1212 32.8488C30.8524 33.2203 30.4793 33.5163 30.0483 33.7094C29.9967 33.78 29.9403 33.8485 29.8796 33.9148C29.3988 34.439 28.6919 34.7549 27.94 34.782C25.797 34.8598 23.6288 34.8782 21.4753 34.8372C21.457 34.8387 21.4387 34.8402 21.4204 34.8417C20.9168 34.8827 20.5332 35.2957 20.5666 35.7618C20.582 35.9798 20.6874 36.1813 20.8633 36.3292C21.0247 36.4649 21.2334 36.5433 21.4496 36.5528H21.4498C21.4658 36.5535 21.4821 36.5537 21.4981 36.5537C21.5237 36.5535 21.5495 36.5524 21.5752 36.5504C24.5075 36.3112 27.445 35.9641 30.3068 35.5186C30.9334 35.4202 31.5441 35.2449 32.1223 34.9979C33.2193 34.5272 33.8254 33.9929 34.5271 33.3743C34.5946 33.3149 34.6632 33.2543 34.7339 33.1924L34.7634 33.1668L34.7865 33.1358C37.3645 29.6951 39.7239 26.0996 41.799 22.4495C42.2761 21.6138 43.336 21.2939 44.2119 21.7208C45.0461 22.1288 45.4034 23.0884 45.0256 23.9058C44.8953 24.1828 44.7635 24.4594 44.6304 24.7358C42.9893 28.1432 41.1318 31.5105 39.0844 34.7916C38.4225 35.8524 37.7408 36.9041 37.0402 37.9452C36.7178 38.4141 36.2429 38.7925 35.6738 39.0405C35.5033 39.2425 35.3318 39.4441 35.1596 39.645C34.9952 39.8329 34.8043 40.0002 34.5914 40.1441C34.852 40.0737 35.114 40.0021 35.3772 39.929C36.3408 39.6614 37.1539 39.1031 37.6667 38.3564L37.6685 38.3536C39.889 35.0544 41.9209 31.6485 43.7359 28.1862C44.1638 27.3695 44.5799 26.5499 44.9834 25.7277C45.2307 25.2238 45.4732 24.7192 45.7111 24.2136L45.712 24.2116C46.2588 23.0306 45.7477 21.6462 44.5484 21.0599Z"
                        fill="#171D34"
                      />
                      <path
                        d="M13.0991 21.8627C13.5525 22.2414 14.0425 22.6218 14.5557 22.9929C15.3673 23.5799 16.2662 24.1662 17.2276 24.7354C18.4966 25.4869 19.6389 26.0713 20.3947 26.4581C20.5783 26.5521 20.7371 26.6332 20.8703 26.703C21.235 26.8935 21.7811 27.196 22.3128 27.5549C22.3418 27.5745 22.3527 27.5819 22.368 27.5907C22.6406 27.748 22.9611 27.8141 23.2748 27.7785C23.2888 27.7768 23.3025 27.7752 23.3165 27.7732C23.6434 27.7266 23.9473 27.5704 24.1724 27.3335L24.1735 27.3322C24.1941 27.3108 24.7361 26.7445 25.3682 26.2007C25.4915 26.0946 25.6306 25.9766 25.7918 25.8398C26.705 25.0648 28.1661 23.8255 29.6421 22.2791C27.8532 23.8255 26.0633 25.0209 24.9851 25.7408C24.8079 25.8591 24.6548 25.9614 24.5176 26.0543C24.3784 26.1487 24.2433 26.2436 24.1154 26.3361C23.8336 26.6075 23.6432 26.8064 23.6202 26.8304C23.5056 26.9509 23.353 27.0233 23.1936 27.0429C23.1641 27.0466 23.1344 27.0484 23.1046 27.0484C22.9856 27.0484 22.8661 27.0193 22.7586 26.9589C22.7541 26.9557 22.7483 26.9517 22.7407 26.9467C22.18 26.5682 21.6073 26.251 21.2253 26.0514C21.089 25.9801 20.9292 25.8983 20.744 25.8036C20.4273 25.6415 20.042 25.4443 19.608 25.2146C19.6078 25.2144 19.6074 25.2144 19.6072 25.214C19.0171 24.9018 18.3371 24.5293 17.6177 24.1034C16.6762 23.5459 15.7967 22.9724 15.0038 22.3987C14.5046 22.0378 14.0285 21.6685 13.5885 21.3009C10.387 18.6265 8.80616 15.8232 8.89025 12.9688C9.00619 9.02708 11.4504 7.34572 12.8972 6.6943C13.12 6.59404 13.3468 6.50467 13.5768 6.42657C15.989 5.6062 18.7342 5.99875 20.606 7.48162L20.9047 7.71815L21.1407 7.42143C21.2953 7.22681 21.4618 7.04254 21.6384 6.86916C23.9724 4.57238 28.109 4.09582 30.8986 5.92305C31.0231 6.00447 31.145 6.0907 31.264 6.18062C31.826 6.42897 32.3531 6.74951 32.8254 7.14298C33.0912 7.36419 33.3404 7.60847 33.5668 7.86918C33.7113 8.03536 33.847 8.20874 33.9741 8.38896C33.5355 7.47017 32.9538 6.67731 32.2347 6.02072C31.9499 5.76038 31.6412 5.52089 31.3177 5.30911C30.4816 4.76146 29.5392 4.38645 28.5162 4.19497C27.5442 4.01291 26.5431 4.00313 25.5409 4.16635C24.5494 4.32755 23.6143 4.64827 22.7613 5.11911C22.0894 5.49024 21.4966 5.93948 20.9925 6.45907C20.9209 6.53292 20.8511 6.60807 20.7832 6.6847C20.1177 6.21331 19.3621 5.8527 18.5443 5.61395C18.0498 5.46938 17.5325 5.36949 16.9988 5.31649C15.4721 5.16527 13.9448 5.40955 12.5822 6.02331C11.3096 6.59626 10.2375 7.48088 9.48165 8.58154C8.63819 9.80978 8.18554 11.2788 8.13633 12.9476C8.04546 16.0365 9.71524 19.036 13.0991 21.8627Z"
                        fill="#171D34"
                      />
                      <path
                        d="M6.6017 15.0659C6.60443 15.0871 6.60856 15.1084 6.61399 15.1291C6.64949 15.2652 6.68596 15.4023 6.72232 15.5366C6.79609 15.8087 7.08188 15.9712 7.3596 15.899C7.63722 15.8269 7.80322 15.5469 7.72966 15.2749C7.69389 15.1429 7.65826 15.0088 7.6237 14.8764C7.62046 14.8639 7.61677 14.8517 7.61264 14.8396C7.57293 14.7238 7.49303 14.6267 7.38459 14.5638C7.26486 14.4942 7.12466 14.4745 6.9898 14.5083C6.73595 14.5719 6.5691 14.8115 6.60172 15.0658L6.6017 15.0659Z"
                        fill="#171D34"
                      />
                      <path
                        d="M7.24315 16.9932C7.24841 17.0211 7.2562 17.049 7.26613 17.0757C7.31555 17.2085 7.36572 17.3414 7.4152 17.4708C7.51609 17.7343 7.81701 17.8683 8.08604 17.7695C8.34928 17.6728 8.48596 17.3885 8.39712 17.1293C8.3952 17.1237 8.39317 17.118 8.39104 17.1124C8.34219 16.9848 8.29317 16.8549 8.24532 16.7263C8.14695 16.4619 7.84731 16.3252 7.57734 16.4215C7.33742 16.5071 7.19685 16.7475 7.24315 16.9932Z"
                        fill="#171D34"
                      />
                      <path
                        d="M9.29077 18.706C9.22701 18.5951 9.16048 18.4776 9.0874 18.347C8.94933 18.1003 8.632 18.0095 8.38003 18.1447C8.16363 18.2609 8.05954 18.5125 8.13255 18.7431C8.14283 18.7756 8.15663 18.8074 8.17348 18.8375C8.24884 18.9722 8.31725 19.0929 8.38264 19.2067C8.52358 19.4519 8.84194 19.5391 9.09232 19.4011C9.31348 19.2791 9.40877 19.0216 9.33081 18.7941C9.3205 18.7641 9.30719 18.7346 9.29077 18.706Z"
                        fill="#171D34"
                      />
                      <path
                        d="M9.29334 20.4303C9.36668 20.5357 9.44264 20.6427 9.51905 20.7482L9.54163 20.7794C9.62204 20.8907 9.74188 20.9646 9.87907 20.9876C10.0163 21.0106 10.1544 20.9799 10.268 20.9011C10.3816 20.8224 10.4571 20.705 10.4806 20.5706C10.4953 20.4863 10.4884 20.4016 10.4614 20.3228C10.4454 20.276 10.4222 20.2312 10.3923 20.1898L10.3692 20.1578C10.2959 20.0567 10.2238 19.955 10.1547 19.8557C9.99294 19.6231 9.66817 19.5628 9.4307 19.7212C9.24035 19.8482 9.15713 20.0866 9.2284 20.3009C9.24357 20.3467 9.26544 20.3902 9.29334 20.4303Z"
                        fill="#171D34"
                      />
                      <path
                        d="M11.3953 21.3027C11.195 21.101 10.8645 21.0965 10.6585 21.2927C10.493 21.4504 10.4528 21.6913 10.5584 21.8922C10.582 21.937 10.6122 21.978 10.6483 22.0144C10.7648 22.1318 10.8659 22.2313 10.9572 22.3188C11.1625 22.5156 11.4931 22.5121 11.694 22.3109C11.7914 22.2135 11.8441 22.0847 11.8426 21.9484C11.8421 21.9071 11.8367 21.8666 11.8266 21.8276C11.8034 21.7378 11.7553 21.6556 11.686 21.5892C11.6007 21.5075 11.5057 21.4138 11.3953 21.3027Z"
                        fill="#171D34"
                      />
                      <path
                        d="M13.3181 22.8345C13.2261 22.7602 13.1231 22.6749 13.0035 22.5734C12.7863 22.3893 12.4565 22.4126 12.2685 22.6254C12.1174 22.7964 12.0984 23.0398 12.2213 23.2311C12.2486 23.2737 12.2823 23.312 12.3215 23.3452C12.4479 23.4524 12.5573 23.5431 12.6559 23.6226C12.8777 23.8014 13.2068 23.7701 13.3894 23.5528C13.4778 23.4475 13.5191 23.3149 13.5056 23.1792C13.5015 23.1381 13.4926 23.0982 13.4791 23.0602C13.4481 22.9726 13.393 22.8948 13.3181 22.8345Z"
                        fill="#171D34"
                      />
                      <path
                        d="M41.6568 33.7472C41.4276 33.6169 41.1339 33.6932 41.0009 33.9177L40.7407 34.3567C40.6077 34.5812 40.6855 34.8688 40.9148 34.9991C41.144 35.1294 41.4376 35.0531 41.5707 34.8286L41.8309 34.3896C41.846 34.3641 41.8584 34.3378 41.8682 34.311C41.9443 34.1019 41.86 33.8627 41.6568 33.7472Z"
                        fill="#171D34"
                      />
                      <path
                        d="M40.5748 35.5675C40.3456 35.4372 40.0519 35.5135 39.9189 35.738L39.6587 36.177C39.5256 36.4014 39.6035 36.6891 39.8328 36.8194C40.062 36.9498 40.3557 36.8734 40.4887 36.6489L40.7489 36.2099C40.764 36.1844 40.7764 36.1581 40.7862 36.1313C40.8623 35.9222 40.778 35.683 40.5748 35.5675Z"
                        fill="#171D34"
                      />
                      <path
                        d="M39.4967 37.3898C39.2675 37.2595 38.9738 37.3358 38.8408 37.5603L38.5805 37.9992C38.4475 38.2238 38.5254 38.5114 38.7546 38.6417C38.9838 38.772 39.2775 38.6957 39.4106 38.4712L39.6708 38.0322C39.6859 38.0067 39.6983 37.9804 39.708 37.9536C39.7842 37.7444 39.6998 37.5053 39.4967 37.3898Z"
                        fill="#171D34"
                      />
                      <path
                        d="M44.8677 28.3956C44.6385 28.2653 44.3449 28.3416 44.2118 28.5661L43.9516 29.0051C43.8187 29.2296 43.8965 29.5172 44.1257 29.6476C44.3549 29.7779 44.6486 29.7015 44.7816 29.4771L45.0418 29.0381C45.057 29.0126 45.0693 28.9863 45.0791 28.9594C45.1553 28.7503 45.0709 28.5111 44.8677 28.3956Z"
                        fill="#171D34"
                      />
                      <path
                        d="M43.7858 30.216C43.5566 30.0856 43.2629 30.162 43.1298 30.3864L42.8696 30.8254C42.7366 31.0499 42.8145 31.3375 43.0437 31.4679C43.2729 31.5982 43.5666 31.5219 43.6997 31.2974L43.9599 30.8584C43.975 30.8329 43.9874 30.8066 43.9971 30.7798C44.0733 30.5706 43.9889 30.3315 43.7858 30.216Z"
                        fill="#171D34"
                      />
                      <path
                        d="M42.7076 32.0382C42.4784 31.9079 42.1847 31.9842 42.0517 32.2087L41.7915 32.6477C41.6585 32.8722 41.7364 33.1598 41.9656 33.2901C42.1948 33.4205 42.4885 33.3441 42.6215 33.1196L42.8817 32.6806C42.8968 32.6551 42.9092 32.6288 42.919 32.602C42.9951 32.3929 42.9108 32.1537 42.7076 32.0382Z"
                        fill="#171D34"
                      />
                      <path
                        d="M1.97181 32.4193C2.11869 32.4193 2.25678 32.3633 2.36066 32.2615L3.24065 31.3997C3.45508 31.1897 3.45508 30.848 3.24065 30.638C3.02622 30.428 2.67731 30.428 2.46292 30.638L1.58295 31.4998C1.47907 31.6015 1.42188 31.7368 1.42188 31.8807C1.42188 32.0245 1.47907 32.1598 1.58295 32.2615C1.68681 32.3633 1.82491 32.4193 1.97181 32.4193Z"
                        fill="#171D34"
                      />
                      <path
                        d="M5.70201 28.7647C5.84285 28.7647 5.98367 28.7122 6.09088 28.6073L6.97085 27.7454C7.18528 27.5354 7.18528 27.1937 6.97085 26.9837C6.75645 26.7737 6.40757 26.7737 6.19314 26.9837L5.31315 27.8455C5.09874 28.0555 5.09874 28.3973 5.31315 28.6073C5.42037 28.7123 5.5612 28.7647 5.70201 28.7647Z"
                        fill="#171D34"
                      />
                      <path
                        d="M6.19314 32.2615C6.29701 32.3633 6.43511 32.4193 6.58199 32.4193C6.72889 32.4193 6.86699 32.3633 6.97085 32.2615C7.07472 32.1598 7.13192 32.0245 7.13192 31.8807C7.13192 31.7368 7.07472 31.6016 6.97085 31.4998L6.09088 30.638C5.87645 30.428 5.52754 30.428 5.31315 30.638C5.09874 30.848 5.09874 31.1897 5.31315 31.3997L6.19314 32.2615Z"
                        fill="#171D34"
                      />
                      <path
                        d="M2.46292 28.6075C2.57013 28.7125 2.71094 28.765 2.85177 28.765C2.99262 28.765 3.13343 28.7125 3.24065 28.6075C3.45508 28.3975 3.45508 28.0558 3.24065 27.8458L2.36066 26.9839C2.25678 26.8822 2.11869 26.8262 1.97181 26.8262C1.82491 26.8262 1.68681 26.8822 1.58295 26.9839C1.47907 27.0856 1.42188 27.2209 1.42188 27.3648C1.42188 27.5087 1.47907 27.6439 1.58295 27.7456L2.46292 28.6075Z"
                        fill="#171D34"
                      />
                      <path
                        d="M15.2932 4.61797C15.4029 4.61797 15.506 4.57613 15.5835 4.50017L16.2051 3.89138C16.3652 3.7346 16.3652 3.47946 16.2051 3.32268C16.0451 3.1659 15.7846 3.16586 15.6245 3.32266L15.0029 3.93147C14.8428 4.08825 14.8428 4.34339 15.0029 4.50017C15.0804 4.57613 15.1836 4.61797 15.2932 4.61797Z"
                        fill="#171D34"
                      />
                      <path
                        d="M17.9301 2.03768C18.0353 2.03768 18.1404 1.99848 18.2205 1.92008L18.842 1.31129C19.0021 1.15451 19.0021 0.899373 18.842 0.742592C18.682 0.585793 18.4214 0.585812 18.2614 0.742592L17.6398 1.35136C17.5622 1.4273 17.5195 1.5283 17.5195 1.63571C17.5195 1.74312 17.5622 1.84412 17.6398 1.92006C17.7198 1.99848 17.825 2.03768 17.9301 2.03768Z"
                        fill="#171D34"
                      />
                      <path
                        d="M18.2614 4.50016C18.3414 4.57856 18.4466 4.61776 18.5517 4.61776C18.6569 4.61776 18.762 4.57856 18.842 4.50016C19.0021 4.34338 19.0021 4.08824 18.842 3.93146L18.2205 3.32267C18.0604 3.16587 17.7999 3.16589 17.6398 3.32267C17.5622 3.39861 17.5195 3.49961 17.5195 3.60702C17.5195 3.71443 17.5622 3.81543 17.6398 3.89135L18.2614 4.50016Z"
                        fill="#171D34"
                      />
                      <path
                        d="M15.6245 1.92031C15.7045 1.99869 15.8096 2.03789 15.9148 2.03789C16.0199 2.03789 16.1251 1.99869 16.2051 1.92029C16.3652 1.76351 16.3652 1.50837 16.2051 1.35159L15.5835 0.742802C15.506 0.66684 15.4029 0.625 15.2932 0.625C15.1835 0.625 15.0804 0.66684 15.0029 0.742802C14.8428 0.899583 14.8428 1.15472 15.0029 1.3115L15.6245 1.92031Z"
                        fill="#171D34"
                      />
                      <path
                        d="M20.7692 46.436L20.1476 47.0447C20.0701 47.1207 20.0273 47.2217 20.0273 47.3291C20.0273 47.4365 20.0701 47.5375 20.1476 47.6135C20.2277 47.6918 20.3328 47.731 20.438 47.731C20.5431 47.731 20.6483 47.6918 20.7283 47.6134L21.3499 47.0047C21.51 46.8479 21.51 46.5927 21.3499 46.436C21.1898 46.2792 20.9293 46.2792 20.7692 46.436Z"
                        fill="#171D34"
                      />
                      <path
                        d="M23.4018 43.8539L22.7802 44.4627C22.6201 44.6195 22.6201 44.8746 22.7802 45.0314C22.8603 45.1098 22.9654 45.149 23.0706 45.149C23.1757 45.149 23.2808 45.1098 23.3609 45.0314L23.9825 44.4226C24.1426 44.2659 24.1426 44.0107 23.9825 43.8539C23.8224 43.6971 23.5619 43.6971 23.4018 43.8539Z"
                        fill="#171D34"
                      />
                      <path
                        d="M23.3609 46.436C23.2008 46.2792 22.9403 46.2792 22.7802 46.436C22.6201 46.5927 22.6201 46.8479 22.7802 47.0047L23.4018 47.6134C23.4818 47.6918 23.587 47.731 23.6922 47.731C23.7973 47.731 23.9024 47.6918 23.9825 47.6134C24.1426 47.4567 24.1426 47.2015 23.9825 47.0447L23.3609 46.436Z"
                        fill="#171D34"
                      />
                      <path
                        d="M20.7283 43.8539C20.5682 43.6971 20.3077 43.6971 20.1476 43.8539C20.0701 43.9299 20.0273 44.0309 20.0273 44.1383C20.0273 44.2457 20.0701 44.3467 20.1476 44.4226L20.7692 45.0314C20.8493 45.1098 20.9544 45.149 21.0595 45.149C21.1647 45.149 21.2698 45.1098 21.3499 45.0314C21.4274 44.9555 21.4702 44.8545 21.4702 44.7471C21.4702 44.6396 21.4274 44.5386 21.3499 44.4627L20.7283 43.8539Z"
                        fill="#171D34"
                      />
                      <path
                        d="M46.6713 29.0336L46.0498 29.6424C45.8897 29.7992 45.8897 30.0543 46.0498 30.2111C46.1298 30.2895 46.2349 30.3287 46.3401 30.3287C46.4452 30.3287 46.5504 30.2895 46.6304 30.2111L47.252 29.6023C47.4121 29.4455 47.4121 29.1904 47.252 29.0336C47.0919 28.8768 46.8314 28.8768 46.6713 29.0336Z"
                        fill="#171D34"
                      />
                      <path
                        d="M48.9768 27.7486C49.082 27.7486 49.1871 27.7094 49.2672 27.631L49.8887 27.0222C50.0488 26.8655 50.0488 26.6103 49.8887 26.4535C49.7287 26.2967 49.4682 26.2967 49.3081 26.4535L48.6865 27.0623C48.5264 27.2191 48.5264 27.4742 48.6865 27.631C48.7665 27.7094 48.8717 27.7486 48.9768 27.7486Z"
                        fill="#171D34"
                      />
                      <path
                        d="M49.8887 29.6424L49.2672 29.0336C49.1071 28.8768 48.8466 28.8768 48.6865 29.0336C48.5264 29.1904 48.5264 29.4456 48.6865 29.6023L49.3081 30.2111C49.3881 30.2895 49.4932 30.3287 49.5984 30.3287C49.7035 30.3287 49.8087 30.2895 49.8887 30.2111C49.9663 30.1352 50.009 30.0342 50.009 29.9268C50.009 29.8194 49.9663 29.7184 49.8887 29.6424Z"
                        fill="#171D34"
                      />
                      <path
                        d="M46.6304 26.4535C46.4704 26.2967 46.2098 26.2967 46.0498 26.4535C45.8897 26.6103 45.8897 26.8654 46.0498 27.0222L46.6713 27.631C46.7514 27.7094 46.8565 27.7486 46.9617 27.7486C47.0668 27.7486 47.172 27.7094 47.252 27.631C47.4121 27.4742 47.4121 27.2191 47.252 27.0623L46.6304 26.4535Z"
                        fill="#171D34"
                      />
                      <path
                        d="M36.8872 18.3873C36.9923 18.3873 37.0975 18.3481 37.1775 18.2697L37.7991 17.6609C37.9592 17.5042 37.9592 17.249 37.7991 17.0922C37.639 16.9354 37.3785 16.9354 37.2184 17.0922L36.5968 17.701C36.5193 17.7769 36.4766 17.8779 36.4766 17.9853C36.4766 18.0928 36.5193 18.1938 36.5968 18.2697C36.6769 18.3481 36.782 18.3873 36.8872 18.3873Z"
                        fill="#171D34"
                      />
                      <path
                        d="M39.5237 15.8052C39.6288 15.8052 39.734 15.766 39.814 15.6877L40.4356 15.0789C40.5132 15.0029 40.5559 14.9019 40.5559 14.7945C40.5559 14.6871 40.5132 14.5861 40.4356 14.5102C40.2755 14.3534 40.015 14.3534 39.8549 14.5102L39.2333 15.1189C39.0733 15.2757 39.0733 15.5309 39.2333 15.6877C39.3134 15.766 39.4185 15.8052 39.5237 15.8052Z"
                        fill="#171D34"
                      />
                      <path
                        d="M39.855 18.2697C39.935 18.3481 40.0401 18.3873 40.1453 18.3873C40.2504 18.3873 40.3556 18.3481 40.4356 18.2697C40.5957 18.1129 40.5957 17.8578 40.4356 17.701L39.814 17.0922C39.6539 16.9354 39.3934 16.9354 39.2334 17.0922C39.0733 17.249 39.0733 17.5041 39.2334 17.6609L39.855 18.2697Z"
                        fill="#171D34"
                      />
                      <path
                        d="M37.2182 15.6877C37.2983 15.7661 37.4034 15.8053 37.5086 15.8053C37.6137 15.8053 37.7189 15.7661 37.7989 15.6877C37.959 15.5309 37.959 15.2757 37.7989 15.1189L37.1773 14.5102V14.5101C37.0172 14.3534 36.7567 14.3534 36.5966 14.5102C36.4365 14.6669 36.4365 14.9221 36.5966 15.0789L37.2182 15.6877Z"
                        fill="#171D34"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_832_36514">
                        <rect width="50" height="50" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>{" "}
                  Spousal Support Duration Range
                </span>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <InputCustom
                      type="text"
                      handleChange={changeInputInSupport}
                      value={supportQuantum.spousalSupportDurationRange}
                      name="spousalSupportDurationRange"
                      label=""
                    ></InputCustom>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        : <Screen4ApiComponent apiData={'apires'} />

        }
      
      </div>
      <div className="d-flex justify-content-start">
        <CustomCheckbox
          ChangeFun={handleChangeRestrcution}
          label={"Restructuring the Support Amount"}
          checked={restructioring}
        />
      </div>

    
{
        restructioring &&
<div className="row">

<div className="col-md-4">
<Restructuring {...props  } 
      handleChildData={handleChildData} scenarioKey="scenario1" setScenarios={setScenarios}
      scenarios={scenarios}
       />
</div>

<div className="col-md-4">
<Restructuring {...props  } 
      handleChildData={handleChildData} scenarioKey="scenario2" setScenarios={setScenarios}
      scenarios={scenarios}
       />
</div>

<div className="col-md-4">
<Restructuring {...props  } 
      handleChildData={handleChildData} scenarioKey="scenario3" setScenarios={setScenarios}
      scenarios={scenarios}
       />
</div>

<div className="d-flex justify-content-center mt-4">
            <button className="btn btnPrimary rounded-pill" onClick={saveScenariotoDB}>
              Save
            </button>
</div>


</div>  
}




      <div className="btnGroup mb-4">
        <button
          className="btn btnPrimary rounded-pill"
          onClick={() =>
            history.push(
              isENVPROD()
                ? `${AUTH_ROUTES.PROD_CALCULATOR}?id=${getCalculatorIdFromQuery(
                  query
                )}&step=2`
                : `${AUTH_ROUTES.CALCULATOR}?id=${getCalculatorIdFromQuery(
                  query
                )}&step=2`
            )
          }
        >
          Back
        </button>
        <div className="d-flex">
          <button
            className="btn btnPrimary rounded-pill me-3"
            onClick={() => {
              history.push("/SupportCalculator");
            }}
          >
            Home Page
          </button>
          {query.get("saveValues") === "true" && (
            <button
              onClick={() => {
                changeReportIncompleteToComplete(
                  getCalculatorIdFromQuery(query)
                );
              }}
              className="btn btnPrimary rounded-pill"
            >
              <ReactToPrint
                pageStyle={`@page {
                  size: A4;
                  margin: 0;
                }
                body {
                  size: A4;
                  margin: 0;
                }`}
                onBeforePrint={() => {
                  const content = calculator_report.current;
                  if (content) {
                    content.style.height = "90%";
                  }
                }}
                trigger={() => (
                  <button className="btn btnPrimary rounded-pill">
                    Download Report
                  </button>
                )}
                content={() => calculator_report.current}
              />
            </button>
          )}
        </div>
      </div>    


      <div className="d-flex justify-content-end mb-4">

       {/* <button onClick={()=>history.push('/cal_demo')}>Click to open new tab</button> */}
       <button className="btn btnPrimary rounded-pill">

       <Link to="/cal_demo" style={{ textDecoration:"none" , color:"#171D34" }} target="_blank"  >
        Api Calculator
        </Link>
       </button>


     
      </div>

      {reportData.data && (
        <div>
          <Reports ref={calculator_report} data={reportData.data} />
        </div>
      )}

    </>
  );
};

export default Screen4;



const Screen4ApiComponent=({apiData})=>{
  console.log('apiDataRepose',apiData)


  const SpousalSupportArrow = ({ amount, givenTo }: ArrowDetails) => <div className="arrow">
      <svg
        width="345"
        height="51"
        viewBox="0 0 345 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          opacity="0.5"
          d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
          fill="#F6BD3D"
        />{" "}
      </svg>
      <span>
       87654321
        Spousal Support
      </span>
    </div>
  

const ChildSupportArrow = ({ amount, givenTo }: ArrowDetails) => (
  <div className="arrow">
    <svg
      width="345"
      height="51"
      viewBox="0 0 345 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <path
        opacity="0.5"
        d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
        fill="#73C3FD"
      />{" "}
    </svg>
    <span>
      1234567
      Child Support (Table Amount)
    </span>
  </div>
);

const ChildSpecialExpenseArrow = ({ amount, givenTo }: ArrowDetails) => {
  return (
    <div className="arrow">
      <span>
        123123
        Child Special Expense Support
      </span>
      <svg
        width="345"
        height="51"
        viewBox="0 0 345 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          opacity="0.5"
          d="M0 13H308V0L345 25.5L308 51V39H0V13Z"
          fill="#F6BD3D"
        />{" "}
      </svg>
    </div>
  );
};



  const HusbandImage = () => (
    <div className="userImage">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            d="M94.145 79.4761C88.4439 53.5622 67.7868 45.7609 52.7486 41.787C46.8832 40.2372 41.8728 39.2696 38.9376 38.0368C38.9519 38.0425 38.9607 38.0451 38.9645 38.0451C39.0498 38.0451 36.2456 36.513 34.2286 35.0752C34.0236 34.9289 33.8268 34.784 33.6421 34.6413C33.6449 34.643 33.6467 34.6441 33.6471 34.6441C33.686 34.6441 28.6682 30.2658 25.6182 26.7219C25.2996 26.3513 25.1718 26.1877 24.9228 25.8304C21.3527 20.7028 20.2919 15.773 16.261 15.637C16.119 15.6322 15.9758 15.6289 15.828 15.6289C15.4737 15.6289 15.0935 15.6485 14.6376 15.7158C14.0799 15.811 13.7417 15.9207 13.2944 16.0824C12.4114 16.401 11.5918 16.9726 10.9254 17.7148C10.1401 18.5898 9.56768 19.702 9.35568 20.917C9.14324 22.1349 9.29278 23.4564 9.95297 24.7459C10.0068 24.8511 10.2173 25.2753 10.2644 25.3822C11.9883 29.2898 14.4703 32.7966 17.2216 36.0487C20.7002 40.1607 24.0669 43.2026 27.3571 45.5104C30.6286 47.8048 33.0503 51.0309 34.3594 54.6945C35.0825 56.7182 35.4663 58.8751 35.4663 61.0822V68.0095V87.3623H37.5165H39.7282H68.2311V61.4741C68.2669 61.493 69.1888 62.2521 70.0955 63.0023C70.9844 63.7372 71.8588 64.4636 71.8702 64.4757C72.1016 64.7213 72.3246 64.9591 72.5385 65.1887C74.6812 67.4846 75.9604 68.9604 76.2448 69.2742C76.3178 69.3552 76.3431 69.3833 76.3831 69.4368C77.7829 71.3019 79.4505 74.3578 79.7069 74.7715C82.3316 79.0051 81.8181 86.5071 86.682 87.189C86.8834 87.2174 87.7842 87.3337 88.0184 87.3513C88.1391 87.3601 88.2601 87.3647 88.3799 87.3647C89.9259 87.3647 91.3952 86.6329 92.4891 85.4913C93.1932 84.7559 93.7417 83.8505 94.0546 82.8609C94.3918 81.7945 94.4551 80.6303 94.145 79.4761Z"
            fill="#73C3FD"
          />
          <path
            d="M51.2219 34.8671C51.4295 34.8757 51.6385 34.8801 51.8483 34.8801C56.6356 34.8801 60.8936 32.6145 63.6089 29.0972C65.545 26.5893 66.6967 23.4452 66.6967 20.0319C66.6967 16.0798 65.1527 12.4883 62.6349 9.82777C59.9284 6.96777 56.0968 5.18359 51.8483 5.18359C51.1225 5.18359 50.4089 5.23572 49.7109 5.33622C42.5232 6.37246 37 12.5569 37 20.0319C37 28.0225 43.312 34.5388 51.2219 34.8671Z"
            fill="#73C3FD"
          />
        </g>
        <path
          d="M27.413 48.0905C23.8979 46.1422 20.2295 43.472 16.337 39.7495C13.2584 36.8053 10.4208 33.5796 8.29465 29.8753C8.2366 29.7741 7.98259 29.3743 7.91794 29.2756C5.93474 26.2399 7.11085 22.6691 9.35597 20.917C9.56797 19.702 10.1404 18.5899 10.9257 17.7148C10.2499 17.9121 9.81823 18.1107 9.36718 18.3299C7.29228 19.3376 5.66556 21.3421 5.01527 23.6919C4.70739 24.8043 4.62976 25.9362 4.78414 27.0562C4.95172 28.2704 5.38649 29.4216 6.07702 30.4783C6.1375 30.5709 6.34246 30.895 6.39062 30.9758C7.46667 32.8497 8.7347 34.6576 10.2669 36.5025C11.5839 38.0883 13.0723 39.6703 14.8171 41.3388C16.7636 43.2004 18.7431 44.8854 20.7008 46.3474C22.5516 47.7298 24.4514 48.9633 26.3471 50.0141C31.1452 52.6733 34.354 57.5103 34.9308 62.953L35.4666 68.0096V61.0822C35.4666 58.8751 35.0828 56.7182 34.3597 54.6945C32.669 51.9757 30.295 49.6877 27.413 48.0905Z"
          fill="#171D34"
        />
        <path
          d="M99.9448 76.0186C99.8687 75.3586 99.7113 74.7096 99.4768 74.089C98.8765 72.2952 98.1941 70.5466 97.4483 68.8913C96.7169 67.2681 95.9043 65.6893 95.033 64.199C94.1879 62.7532 93.2638 61.3508 92.2869 60.0302C91.3424 58.7534 90.3222 57.5182 89.2547 56.3585C87.2392 54.1691 84.9725 52.1603 82.5178 50.3883C80.2769 48.7703 77.8143 47.3033 75.1986 46.0276C65.2991 41.1995 54.7289 39.7835 47.0109 38.7495C43.7445 38.3118 40.9039 37.9311 39.0146 37.4018C38.9862 37.3882 38.9547 37.3734 38.9193 37.3569C38.792 37.2976 38.6207 37.2199 38.4036 37.1216C37.4624 36.6957 35.6314 35.8668 34.2266 35.0742C36.2436 36.512 39.0478 38.0442 38.9624 38.0442C38.9587 38.0442 38.9499 38.0415 38.9356 38.0358C41.8708 39.2687 46.8812 40.2363 52.7465 41.786C68.0815 44.1963 89.0926 49.9203 97.4055 74.8295C98.637 78.0226 96.8304 81.6194 94.0526 82.8599C93.5627 83.0787 93.0426 83.2243 92.5035 83.2815C92.3843 83.2942 92.2636 83.3024 92.1427 83.3063C91.908 83.3136 91 83.2927 90.7968 83.2859C85.888 83.1201 85.6081 75.6058 82.5521 71.6724C82.2535 71.2879 80.2732 68.4246 78.6847 66.7172C78.6394 66.6686 78.6112 66.6431 78.5299 66.5705C78.1826 66.26 76.4897 64.6784 73.6741 62.2595C73.6484 62.2373 69.8135 59.6878 69.7392 59.6579L70.0935 63.0013L72.4668 85.4021L68.229 85.8512L53.9754 87.3614L39.8843 88.8544L39.7262 87.3614H37.5145L37.6973 89.0859C37.7588 89.6661 38.048 90.1978 38.5017 90.5644C38.9552 90.9313 39.536 91.1026 40.1159 91.0412L72.6984 87.5892C73.2785 87.5276 73.8103 87.2382 74.1769 86.7847C74.5437 86.3311 74.715 85.7505 74.6537 85.1706L72.5365 65.1877L72.4193 64.0807C74.6178 65.9737 76.0989 67.3286 76.7408 67.9158C76.8932 68.0552 76.994 68.1471 77.0639 68.2096C77.0725 68.2175 77.0857 68.2291 77.0967 68.239C78.2774 69.5139 79.7739 71.5868 80.4154 72.4753C80.6301 72.7726 80.7367 72.9202 80.8154 73.0215C81.7153 74.1796 82.3982 75.9049 83.0586 77.5734C83.7383 79.2911 84.4414 81.0674 85.4669 82.4957C86.104 83.3831 86.8011 84.0551 87.5983 84.5504C88.5331 85.1314 89.5843 85.4452 90.7224 85.4837C90.8101 85.4868 91.8657 85.5152 92.2114 85.5044C92.3029 85.5015 92.3951 85.4967 92.487 85.4903C92.5701 85.4844 92.653 85.4771 92.7353 85.4683C93.3623 85.4019 93.9842 85.251 94.5839 85.0201C95.1519 84.8011 95.7011 84.5097 96.2165 84.1539C97.195 83.4785 98.0513 82.5665 98.693 81.5169C99.3547 80.434 99.7845 79.2102 99.9355 77.9778C100.016 77.3231 100.019 76.6638 99.9448 76.0186Z"
          fill="#171D34"
        />
        <path
          d="M32.8372 25.3473C33.1754 26.4132 33.6217 27.4495 34.1633 28.4276C34.6948 29.3876 35.3236 30.3011 36.0319 31.1425C36.7332 31.9755 37.5186 32.7455 38.3663 33.4307C39.2143 34.1162 40.1316 34.7227 41.0931 35.2338C42.0642 35.7502 43.0892 36.1735 44.1391 36.4922C45.209 36.8168 46.3161 37.0358 47.4291 37.1433C48.57 37.2535 49.7309 37.2478 50.8798 37.126C52.0286 37.0043 53.1649 36.7668 54.2574 36.4198C55.3234 36.0816 56.3598 35.6354 57.338 35.0937C58.2979 34.5622 59.2113 33.9334 60.0529 33.2251C60.8857 32.524 61.6556 31.7385 62.3411 30.8907C62.8009 30.3218 63.2256 29.7214 63.6093 29.0973C60.894 32.6146 56.636 34.8802 51.8487 34.8802C51.6389 34.8802 51.43 34.8758 51.2224 34.8672C51.0324 34.8947 50.8408 34.9187 50.6482 34.9391C42.4933 35.8032 35.182 29.8927 34.3179 21.7378C33.4539 13.5829 39.3643 6.2718 47.5192 5.40775C48.2581 5.32946 48.9902 5.30681 49.7113 5.33628C50.4094 5.23578 51.123 5.18365 51.8487 5.18365C56.0973 5.18365 59.9288 6.96783 62.6353 9.82783C62.4735 9.61605 62.3068 9.40801 62.1353 9.20437C61.4342 8.37133 60.6486 7.60141 59.8008 6.91615C58.9531 6.23067 58.0358 5.62393 57.0743 5.11284C56.103 4.5967 55.0782 4.17336 54.0281 3.85471C52.9582 3.53011 51.8513 3.31107 50.7381 3.20353C49.5972 3.09335 48.4363 3.09907 47.2874 3.22091C46.1388 3.34252 45.0023 3.58003 43.9097 3.92684C42.844 4.26529 41.8076 4.7115 40.8294 5.25315C39.8695 5.78468 38.9559 6.41342 38.1145 7.12177C37.2815 7.82286 36.5116 8.6084 35.8263 9.45618C35.1408 10.3039 34.5343 11.2214 34.0232 12.1827C33.5069 13.1541 33.0835 14.1789 32.7649 15.229C32.4403 16.2989 32.2212 17.4057 32.1137 18.5189C32.0035 19.6598 32.0092 20.8208 32.1311 21.9696C32.2527 23.1184 32.4904 24.2547 32.8372 25.3473Z"
          fill="#171D34"
        />
        <path
          d="M3.30621 29.4446C3.15201 29.0801 2.99729 28.7097 2.8463 28.3436C2.83211 28.3092 2.81676 28.2755 2.80025 28.2426C2.64154 27.926 2.37755 27.6794 2.04719 27.542C1.68246 27.3902 1.28048 27.3896 0.91531 27.5403C0.227875 27.8238 -0.143364 28.578 0.0517891 29.2945V29.2946C0.0680848 29.3544 0.0883828 29.4138 0.112046 29.4712C0.267196 29.8474 0.425403 30.2262 0.582247 30.5969C0.900289 31.3482 1.76946 31.7004 2.52043 31.3827C3.27118 31.0651 3.62366 30.1957 3.30621 29.4446Z"
          fill="#171D34"
        />
        <path
          d="M5.93778 34.4969C5.93011 34.4816 5.9221 34.4663 5.91383 34.4511C5.72464 34.1045 5.53404 33.7513 5.34724 33.4013C4.96323 32.682 4.06562 32.4092 3.34625 32.7932C2.70685 33.1344 2.40977 33.8802 2.63986 34.5665C2.66601 34.6446 2.69922 34.7213 2.73801 34.7941C2.93094 35.1555 3.12596 35.5168 3.31769 35.8681C3.70837 36.5839 4.6085 36.8483 5.32422 36.4577C6.02456 36.0755 6.29286 35.2051 5.93778 34.4969Z"
          fill="#171D34"
        />
        <path
          d="M9.08709 38.6702C8.86277 38.3773 8.62803 38.0669 8.36955 37.7214C7.88114 37.0684 6.95254 36.9346 6.29957 37.423C5.73876 37.8424 5.54873 38.6059 5.84771 39.2382C5.8898 39.3273 5.94152 39.4132 6.00118 39.493C6.2677 39.8492 6.5091 40.1684 6.73911 40.4687C7.23493 41.116 8.16498 41.2393 8.81235 40.7435C9.38415 40.3054 9.54706 39.5286 9.23544 38.9071C9.19434 38.825 9.1449 38.7456 9.08709 38.6702Z"
          fill="#171D34"
        />
        <path
          d="M12.7845 42.4846L12.7067 42.4021C12.4596 42.1411 12.2155 41.8783 11.981 41.6209C11.4319 41.0181 10.4947 40.9745 9.89194 41.5236C9.40874 41.9638 9.27197 42.6809 9.5594 43.2673C9.62078 43.3928 9.69993 43.5088 9.79466 43.6127C10.0437 43.886 10.3006 44.1627 10.5582 44.4348L10.6344 44.5154C10.9056 44.8026 11.2725 44.9669 11.6673 44.9782C12.0622 44.9894 12.4377 44.8462 12.7249 44.575C13.0121 44.3038 13.1764 43.9369 13.1877 43.542C13.1948 43.2942 13.141 43.0541 13.033 42.8387C12.9689 42.7107 12.8856 42.5915 12.7845 42.4846Z"
          fill="#171D34"
        />
        <path
          d="M17.4792 46.6112C17.3773 46.3627 17.2089 46.1462 16.987 45.9833C16.7142 45.7829 16.409 45.552 16.0538 45.2772C15.4088 44.7784 14.4782 44.8972 13.9792 45.5422C13.5783 46.0607 13.5634 46.7678 13.9421 47.302C14.0264 47.421 14.1281 47.5268 14.2442 47.6167C14.6195 47.907 14.9439 48.1524 15.236 48.367C15.8932 48.8497 16.8207 48.7078 17.3034 48.0506C17.5372 47.7322 17.633 47.3418 17.5733 46.9513C17.5552 46.8331 17.5235 46.7192 17.4792 46.6112Z"
          fill="#171D34"
        />
        <path
          d="M57.3244 91.0329C57.0053 90.7754 56.605 90.6572 56.1972 90.7L56.1918 90.7006L55.2248 90.8053C54.3812 90.897 53.7693 91.6576 53.8606 92.5008C53.9047 92.9086 54.1048 93.275 54.424 93.5326C54.7431 93.7902 55.1434 93.9084 55.5512 93.8656L55.5566 93.865L56.5236 93.7603C56.6178 93.7501 56.7111 93.7312 56.8011 93.7042C57.5106 93.4914 57.9677 92.8019 57.8878 92.0648C57.8437 91.657 57.6436 91.2905 57.3244 91.0329Z"
          fill="#171D34"
        />
        <path
          d="M52.2034 91.5837C51.8844 91.3262 51.484 91.2079 51.0763 91.2508L51.0708 91.2514L50.1039 91.356C49.6952 91.4003 49.3283 91.601 49.0706 91.9212C48.8129 92.2415 48.6954 92.6429 48.7396 93.0515C48.8306 93.8925 49.589 94.5047 50.4302 94.4163L50.4356 94.4157L51.4026 94.311C51.4967 94.3009 51.59 94.282 51.68 94.255C52.3896 94.0422 52.8467 93.3527 52.7669 92.6155C52.7227 92.2078 52.5226 91.8413 52.2034 91.5837Z"
          fill="#171D34"
        />
        <path
          d="M72.6916 89.447C72.3725 89.1895 71.9722 89.0712 71.5644 89.1141L71.559 89.1146L70.592 89.2193C69.7483 89.311 69.1364 90.0716 69.2278 90.9149C69.3188 91.7558 70.0772 92.368 70.9184 92.2796L70.9238 92.279L71.8908 92.1743C71.985 92.1641 72.0783 92.1453 72.1683 92.1183C72.8778 91.9055 73.3348 91.216 73.255 90.4788C73.2109 90.071 73.0108 89.7046 72.6916 89.447Z"
          fill="#171D34"
        />
        <path
          d="M67.5706 89.9978C67.2515 89.7403 66.8512 89.622 66.4434 89.6648L66.438 89.6654L65.4711 89.7701C65.0624 89.8143 64.6955 90.0151 64.4378 90.3353C64.1801 90.6555 64.0625 91.057 64.1068 91.4656C64.1978 92.3065 64.9562 92.9188 65.7974 92.8304L65.8028 92.8298L66.7698 92.7251C66.864 92.7149 66.9573 92.6961 67.0472 92.6691C67.7568 92.4563 68.2138 91.7668 68.134 91.0296C68.0899 90.6219 67.8898 90.2554 67.5706 89.9978Z"
          fill="#171D34"
        />
        <path
          d="M61.3222 90.2136L61.3168 90.2141L60.3498 90.3188C59.5062 90.4104 58.8943 91.171 58.9856 92.0143C59.0766 92.8553 59.835 93.4675 60.6762 93.3791L60.6816 93.3785L61.6486 93.2739C61.7427 93.2637 61.836 93.2448 61.926 93.2178C62.6356 93.005 63.0927 92.3155 63.0128 91.5784C62.9218 90.7374 62.1634 90.1252 61.3222 90.2136Z"
          fill="#171D34"
        />
        <path
          d="M19.6567 61.1194L18.1956 62.5805C17.8879 62.8882 17.8879 63.3871 18.1956 63.6948C18.5033 64.0024 19.0021 64.0024 19.3099 63.6948L20.7709 62.2337C21.0786 61.926 21.0786 61.4271 20.7709 61.1194C20.4632 60.8118 19.9644 60.8118 19.6567 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M25.8481 54.9261L24.387 56.3872C24.0793 56.6948 24.0793 57.1937 24.387 57.5014C24.6947 57.8091 25.1936 57.8091 25.5013 57.5014L26.9623 56.0403C27.27 55.7326 27.27 55.2338 26.9623 54.9261C26.6547 54.6184 26.1558 54.6184 25.8481 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M25.5013 61.1194C25.1936 60.8118 24.6947 60.8118 24.387 61.1194C24.0793 61.4271 24.0793 61.926 24.387 62.2337L25.8481 63.6948C26.1558 64.0024 26.6546 64.0024 26.9623 63.6948C27.27 63.3871 27.27 62.8882 26.9623 62.5805L25.5013 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M19.3099 54.9261C19.0022 54.6184 18.5033 54.6184 18.1956 54.9261C17.8879 55.2338 17.8879 55.7326 18.1956 56.0403L19.6567 57.5014C19.9644 57.8091 20.4632 57.8091 20.7709 57.5014C21.0786 57.1937 21.0786 56.6949 20.7709 56.3872L19.3099 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M18.6883 12.9255L19.7204 11.8934C19.9377 11.6761 19.9377 11.3237 19.7204 11.1064C19.503 10.889 19.1507 10.889 18.9333 11.1064L17.9013 12.1384C17.6839 12.3558 17.6839 12.7081 17.9013 12.9255C18.1186 13.1428 18.471 13.1428 18.6883 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M23.0633 8.55046L24.0954 7.51842C24.3127 7.30108 24.3127 6.94871 24.0954 6.73137C23.878 6.51402 23.5257 6.51402 23.3083 6.73137L22.2763 7.76341C22.0589 7.98075 22.0589 8.33312 22.2763 8.55046C22.4936 8.76781 22.846 8.76781 23.0633 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M23.3084 12.9255C23.5257 13.1428 23.8781 13.1428 24.0954 12.9255C24.3128 12.7081 24.3128 12.3557 24.0954 12.1384L23.0633 11.1064C22.846 10.889 22.4936 10.889 22.2763 11.1064C22.0589 11.3237 22.0589 11.6761 22.2763 11.8934L23.3084 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M18.9334 8.55046C19.1507 8.76781 19.5031 8.76781 19.7204 8.55046C19.9378 8.33312 19.9378 7.98075 19.7204 7.76341L18.6883 6.73137C18.471 6.51402 18.1186 6.51402 17.9013 6.73137C17.6839 6.94871 17.6839 7.30108 17.9013 7.51842L18.9334 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M91.3759 53.1696L92.4079 52.1376C92.6253 51.9202 92.6253 51.5678 92.4079 51.3505C92.1906 51.1332 91.8382 51.1332 91.6209 51.3505L90.5888 52.3825C90.3714 52.5999 90.3714 52.9523 90.5888 53.1696C90.8062 53.3869 91.1585 53.3869 91.3759 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M95.7548 48.7946L96.7868 47.7626C97.0042 47.5452 97.0042 47.1928 96.7868 46.9755C96.5695 46.7582 96.2171 46.7582 95.9998 46.9755L94.9677 48.0075C94.7504 48.2249 94.7504 48.5773 94.9677 48.7946C95.1851 49.0119 95.5374 49.0119 95.7548 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M95.9998 53.1696C96.2171 53.3869 96.5695 53.3869 96.7868 53.1696C97.0042 52.9523 97.0042 52.5999 96.7868 52.3825L95.7548 51.3505C95.5374 51.1332 95.1851 51.1332 94.9677 51.3505C94.7504 51.5678 94.7504 51.9202 94.9677 52.1376L95.9998 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M91.6209 48.7946C91.8382 49.0119 92.1906 49.0119 92.4079 48.7946C92.6253 48.5773 92.6253 48.2249 92.4079 48.0075L91.3759 46.9755C91.1585 46.7582 90.8062 46.7582 90.5888 46.9755C90.3714 47.1928 90.3714 47.5452 90.5888 47.7626L91.6209 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M64.8055 9.66375L65.8376 8.6317C66.0549 8.41436 66.0549 8.06199 65.8376 7.84465C65.6202 7.6273 65.2679 7.6273 65.0505 7.84465L64.0185 8.87669C63.8011 9.09403 63.8011 9.4464 64.0185 9.66375C64.2358 9.88109 64.5882 9.88109 64.8055 9.66375Z"
          fill="#171D34"
        />
        <path
          d="M69.1805 5.28875L70.2126 4.2567C70.4299 4.03936 70.4299 3.68699 70.2126 3.46965C69.9953 3.2523 69.6429 3.2523 69.4255 3.46965L68.3935 4.50169C68.1761 4.71903 68.1761 5.0714 68.3935 5.28875C68.6108 5.50609 68.9632 5.50609 69.1805 5.28875Z"
          fill="#171D34"
        />
        <path
          d="M69.4255 9.66377C69.6429 9.88111 69.9953 9.88111 70.2126 9.66377C70.4299 9.44643 70.4299 9.09406 70.2126 8.87671L69.1805 7.84465C68.9632 7.6273 68.6108 7.6273 68.3935 7.84465C68.1761 8.06199 68.1761 8.41436 68.3935 8.63171L69.4255 9.66377Z"
          fill="#171D34"
        />
        <path
          d="M65.0505 5.28877C65.2679 5.50611 65.6202 5.50611 65.8376 5.28877C66.0549 5.07142 66.0549 4.71906 65.8376 4.50171L64.8055 3.46965C64.5882 3.2523 64.2358 3.2523 64.0185 3.46965C63.8011 3.68699 63.8011 4.03936 64.0185 4.2567L65.0505 5.28877Z"
          fill="#171D34"
        />
        <path
          d="M77.0935 94.6689L76.0614 95.7009C75.8441 95.9183 75.8441 96.2706 76.0614 96.488C76.2788 96.7053 76.6312 96.7053 76.8485 96.488L77.8806 95.4559C78.0979 95.2386 78.0979 94.8862 77.8806 94.6689C77.6632 94.4515 77.3109 94.4515 77.0935 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M81.4685 90.2919L80.4364 91.324C80.2191 91.5413 80.2191 91.8937 80.4364 92.111C80.6538 92.3284 81.0062 92.3284 81.2235 92.111L82.2555 91.079C82.4729 90.8616 82.4729 90.5093 82.2555 90.2919C82.0382 90.0746 81.6858 90.0746 81.4685 90.2919Z"
          fill="#171D34"
        />
        <path
          d="M81.2235 94.6689C81.0062 94.4515 80.6538 94.4515 80.4364 94.6689C80.2191 94.8862 80.2191 95.2386 80.4364 95.4559L81.4685 96.488C81.6858 96.7053 82.0382 96.7053 82.2555 96.488C82.4729 96.2706 82.4729 95.9183 82.2555 95.7009L81.2235 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M76.8485 90.2919C76.6312 90.0746 76.2788 90.0746 76.0614 90.2919C75.8441 90.5093 75.8441 90.8616 76.0614 91.079L77.0935 92.111C77.3108 92.3283 77.6632 92.3283 77.8806 92.111C78.0979 91.8937 78.0979 91.5413 77.8806 91.324L76.8485 90.2919Z"
          fill="#171D34"
        />
      </svg>
      Test 1
    </div>
  );

  const WifeImage = () => (
    <div className="userImage">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            d="M94.145 79.4761C88.4439 53.5622 67.7868 45.7609 52.7486 41.787C46.8832 40.2372 41.8728 39.2696 38.9376 38.0368C38.9519 38.0425 38.9607 38.0451 38.9645 38.0451C39.0498 38.0451 36.2456 36.513 34.2286 35.0752C34.0236 34.9289 33.8268 34.784 33.6421 34.6413C33.6449 34.643 33.6467 34.6441 33.6471 34.6441C33.686 34.6441 28.6682 30.2658 25.6182 26.7219C25.2996 26.3513 25.1718 26.1877 24.9228 25.8304C21.3527 20.7028 20.2919 15.773 16.261 15.637C16.119 15.6322 15.9758 15.6289 15.828 15.6289C15.4737 15.6289 15.0935 15.6485 14.6376 15.7158C14.0799 15.811 13.7417 15.9207 13.2944 16.0824C12.4114 16.401 11.5918 16.9726 10.9254 17.7148C10.1401 18.5898 9.56768 19.702 9.35568 20.917C9.14324 22.1349 9.29278 23.4564 9.95297 24.7459C10.0068 24.8511 10.2173 25.2753 10.2644 25.3822C11.9883 29.2898 14.4703 32.7966 17.2216 36.0487C20.7002 40.1607 24.0669 43.2026 27.3571 45.5104C30.6286 47.8048 33.0503 51.0309 34.3594 54.6945C35.0825 56.7182 35.4663 58.8751 35.4663 61.0822V68.0095V87.3623H37.5165H39.7282H68.2311V61.4741C68.2669 61.493 69.1888 62.2521 70.0955 63.0023C70.9844 63.7372 71.8588 64.4636 71.8702 64.4757C72.1016 64.7213 72.3246 64.9591 72.5385 65.1887C74.6812 67.4846 75.9604 68.9604 76.2448 69.2742C76.3178 69.3552 76.3431 69.3833 76.3831 69.4368C77.7829 71.3019 79.4505 74.3578 79.7069 74.7715C82.3316 79.0051 81.8181 86.5071 86.682 87.189C86.8834 87.2174 87.7842 87.3337 88.0184 87.3513C88.1391 87.3601 88.2601 87.3647 88.3799 87.3647C89.9259 87.3647 91.3952 86.6329 92.4891 85.4913C93.1932 84.7559 93.7417 83.8505 94.0546 82.8609C94.3918 81.7945 94.4551 80.6303 94.145 79.4761Z"
            fill="#F6BD3D"
          />
          <path
            d="M51.2219 34.8671C51.4295 34.8757 51.6385 34.8801 51.8483 34.8801C56.6356 34.8801 60.8936 32.6145 63.6089 29.0972C65.545 26.5893 66.6967 23.4452 66.6967 20.0319C66.6967 16.0798 65.1527 12.4883 62.6349 9.82777C59.9284 6.96777 56.0968 5.18359 51.8483 5.18359C51.1225 5.18359 50.4089 5.23572 49.7109 5.33622C42.5232 6.37246 37 12.5569 37 20.0319C37 28.0225 43.312 34.5388 51.2219 34.8671Z"
            fill="#F6BD3D"
          />
        </g>
        <path
          d="M27.413 48.0905C23.8979 46.1422 20.2295 43.472 16.337 39.7495C13.2584 36.8053 10.4208 33.5796 8.29465 29.8753C8.2366 29.7741 7.98259 29.3743 7.91794 29.2756C5.93474 26.2399 7.11085 22.6691 9.35597 20.917C9.56797 19.702 10.1404 18.5899 10.9257 17.7148C10.2499 17.9121 9.81823 18.1107 9.36718 18.3299C7.29228 19.3376 5.66556 21.3421 5.01527 23.6919C4.70739 24.8043 4.62976 25.9362 4.78414 27.0562C4.95172 28.2704 5.38649 29.4216 6.07702 30.4783C6.1375 30.5709 6.34246 30.895 6.39062 30.9758C7.46667 32.8497 8.7347 34.6576 10.2669 36.5025C11.5839 38.0883 13.0723 39.6703 14.8171 41.3388C16.7636 43.2004 18.7431 44.8854 20.7008 46.3474C22.5516 47.7298 24.4514 48.9633 26.3471 50.0141C31.1452 52.6733 34.354 57.5103 34.9308 62.953L35.4666 68.0096V61.0822C35.4666 58.8751 35.0828 56.7182 34.3597 54.6945C32.669 51.9757 30.295 49.6877 27.413 48.0905Z"
          fill="#171D34"
        />
        <path
          d="M99.9448 76.0186C99.8687 75.3586 99.7113 74.7096 99.4768 74.089C98.8765 72.2952 98.1941 70.5466 97.4483 68.8913C96.7169 67.2681 95.9043 65.6893 95.033 64.199C94.1879 62.7532 93.2638 61.3508 92.2869 60.0302C91.3424 58.7534 90.3222 57.5182 89.2547 56.3585C87.2392 54.1691 84.9725 52.1603 82.5178 50.3883C80.2769 48.7703 77.8143 47.3033 75.1986 46.0276C65.2991 41.1995 54.7289 39.7835 47.0109 38.7495C43.7445 38.3118 40.9039 37.9311 39.0146 37.4018C38.9862 37.3882 38.9547 37.3734 38.9193 37.3569C38.792 37.2976 38.6207 37.2199 38.4036 37.1216C37.4624 36.6957 35.6314 35.8668 34.2266 35.0742C36.2436 36.512 39.0478 38.0442 38.9624 38.0442C38.9587 38.0442 38.9499 38.0415 38.9356 38.0358C41.8708 39.2687 46.8812 40.2363 52.7465 41.786C68.0815 44.1963 89.0926 49.9203 97.4055 74.8295C98.637 78.0226 96.8304 81.6194 94.0526 82.8599C93.5627 83.0787 93.0426 83.2243 92.5035 83.2815C92.3843 83.2942 92.2636 83.3024 92.1427 83.3063C91.908 83.3136 91 83.2927 90.7968 83.2859C85.888 83.1201 85.6081 75.6058 82.5521 71.6724C82.2535 71.2879 80.2732 68.4246 78.6847 66.7172C78.6394 66.6686 78.6112 66.6431 78.5299 66.5705C78.1826 66.26 76.4897 64.6784 73.6741 62.2595C73.6484 62.2373 69.8135 59.6878 69.7392 59.6579L70.0935 63.0013L72.4668 85.4021L68.229 85.8512L53.9754 87.3614L39.8843 88.8544L39.7262 87.3614H37.5145L37.6973 89.0859C37.7588 89.6661 38.048 90.1978 38.5017 90.5644C38.9552 90.9313 39.536 91.1026 40.1159 91.0412L72.6984 87.5892C73.2785 87.5276 73.8103 87.2382 74.1769 86.7847C74.5437 86.3311 74.715 85.7505 74.6537 85.1706L72.5365 65.1877L72.4193 64.0807C74.6178 65.9737 76.0989 67.3286 76.7408 67.9158C76.8932 68.0552 76.994 68.1471 77.0639 68.2096C77.0725 68.2175 77.0857 68.2291 77.0967 68.239C78.2774 69.5139 79.7739 71.5868 80.4154 72.4753C80.6301 72.7726 80.7367 72.9202 80.8154 73.0215C81.7153 74.1796 82.3982 75.9049 83.0586 77.5734C83.7383 79.2911 84.4414 81.0674 85.4669 82.4957C86.104 83.3831 86.8011 84.0551 87.5983 84.5504C88.5331 85.1314 89.5843 85.4452 90.7224 85.4837C90.8101 85.4868 91.8657 85.5152 92.2114 85.5044C92.3029 85.5015 92.3951 85.4967 92.487 85.4903C92.5701 85.4844 92.653 85.4771 92.7353 85.4683C93.3623 85.4019 93.9842 85.251 94.5839 85.0201C95.1519 84.8011 95.7011 84.5097 96.2165 84.1539C97.195 83.4785 98.0513 82.5665 98.693 81.5169C99.3547 80.434 99.7845 79.2102 99.9355 77.9778C100.016 77.3231 100.019 76.6638 99.9448 76.0186Z"
          fill="#171D34"
        />
        <path
          d="M32.8372 25.3473C33.1754 26.4132 33.6217 27.4495 34.1633 28.4276C34.6948 29.3876 35.3236 30.3011 36.0319 31.1425C36.7332 31.9755 37.5186 32.7455 38.3663 33.4307C39.2143 34.1162 40.1316 34.7227 41.0931 35.2338C42.0642 35.7502 43.0892 36.1735 44.1391 36.4922C45.209 36.8168 46.3161 37.0358 47.4291 37.1433C48.57 37.2535 49.7309 37.2478 50.8798 37.126C52.0286 37.0043 53.1649 36.7668 54.2574 36.4198C55.3234 36.0816 56.3598 35.6354 57.338 35.0937C58.2979 34.5622 59.2113 33.9334 60.0529 33.2251C60.8857 32.524 61.6556 31.7385 62.3411 30.8907C62.8009 30.3218 63.2256 29.7214 63.6093 29.0973C60.894 32.6146 56.636 34.8802 51.8487 34.8802C51.6389 34.8802 51.43 34.8758 51.2224 34.8672C51.0324 34.8947 50.8408 34.9187 50.6482 34.9391C42.4933 35.8032 35.182 29.8927 34.3179 21.7378C33.4539 13.5829 39.3643 6.2718 47.5192 5.40775C48.2581 5.32946 48.9902 5.30681 49.7113 5.33628C50.4094 5.23578 51.123 5.18365 51.8487 5.18365C56.0973 5.18365 59.9288 6.96783 62.6353 9.82783C62.4735 9.61605 62.3068 9.40801 62.1353 9.20437C61.4342 8.37133 60.6486 7.60141 59.8008 6.91615C58.9531 6.23067 58.0358 5.62393 57.0743 5.11284C56.103 4.5967 55.0782 4.17336 54.0281 3.85471C52.9582 3.53011 51.8513 3.31107 50.7381 3.20353C49.5972 3.09335 48.4363 3.09907 47.2874 3.22091C46.1388 3.34252 45.0023 3.58003 43.9097 3.92684C42.844 4.26529 41.8076 4.7115 40.8294 5.25315C39.8695 5.78468 38.9559 6.41342 38.1145 7.12177C37.2815 7.82286 36.5116 8.6084 35.8263 9.45618C35.1408 10.3039 34.5343 11.2214 34.0232 12.1827C33.5069 13.1541 33.0835 14.1789 32.7649 15.229C32.4403 16.2989 32.2212 17.4057 32.1137 18.5189C32.0035 19.6598 32.0092 20.8208 32.1311 21.9696C32.2527 23.1184 32.4904 24.2547 32.8372 25.3473Z"
          fill="#171D34"
        />
        <path
          d="M3.30621 29.4446C3.15201 29.0801 2.99729 28.7097 2.8463 28.3436C2.83211 28.3092 2.81676 28.2755 2.80025 28.2426C2.64154 27.926 2.37755 27.6794 2.04719 27.542C1.68246 27.3902 1.28048 27.3896 0.91531 27.5403C0.227875 27.8238 -0.143364 28.578 0.0517891 29.2945V29.2946C0.0680848 29.3544 0.0883828 29.4138 0.112046 29.4712C0.267196 29.8474 0.425403 30.2262 0.582247 30.5969C0.900289 31.3482 1.76946 31.7004 2.52043 31.3827C3.27118 31.0651 3.62366 30.1957 3.30621 29.4446Z"
          fill="#171D34"
        />
        <path
          d="M5.93778 34.4969C5.93011 34.4816 5.9221 34.4663 5.91383 34.4511C5.72464 34.1045 5.53404 33.7513 5.34724 33.4013C4.96323 32.682 4.06562 32.4092 3.34625 32.7932C2.70685 33.1344 2.40977 33.8802 2.63986 34.5665C2.66601 34.6446 2.69922 34.7213 2.73801 34.7941C2.93094 35.1555 3.12596 35.5168 3.31769 35.8681C3.70837 36.5839 4.6085 36.8483 5.32422 36.4577C6.02456 36.0755 6.29286 35.2051 5.93778 34.4969Z"
          fill="#171D34"
        />
        <path
          d="M9.08709 38.6702C8.86277 38.3773 8.62803 38.0669 8.36955 37.7214C7.88114 37.0684 6.95254 36.9346 6.29957 37.423C5.73876 37.8424 5.54873 38.6059 5.84771 39.2382C5.8898 39.3273 5.94152 39.4132 6.00118 39.493C6.2677 39.8492 6.5091 40.1684 6.73911 40.4687C7.23493 41.116 8.16498 41.2393 8.81235 40.7435C9.38415 40.3054 9.54706 39.5286 9.23544 38.9071C9.19434 38.825 9.1449 38.7456 9.08709 38.6702Z"
          fill="#171D34"
        />
        <path
          d="M12.7845 42.4846L12.7067 42.4021C12.4596 42.1411 12.2155 41.8783 11.981 41.6209C11.4319 41.0181 10.4947 40.9745 9.89194 41.5236C9.40874 41.9638 9.27197 42.6809 9.5594 43.2673C9.62078 43.3928 9.69993 43.5088 9.79466 43.6127C10.0437 43.886 10.3006 44.1627 10.5582 44.4348L10.6344 44.5154C10.9056 44.8026 11.2725 44.9669 11.6673 44.9782C12.0622 44.9894 12.4377 44.8462 12.7249 44.575C13.0121 44.3038 13.1764 43.9369 13.1877 43.542C13.1948 43.2942 13.141 43.0541 13.033 42.8387C12.9689 42.7107 12.8856 42.5915 12.7845 42.4846Z"
          fill="#171D34"
        />
        <path
          d="M17.4792 46.6112C17.3773 46.3627 17.2089 46.1462 16.987 45.9833C16.7142 45.7829 16.409 45.552 16.0538 45.2772C15.4088 44.7784 14.4782 44.8972 13.9792 45.5422C13.5783 46.0607 13.5634 46.7678 13.9421 47.302C14.0264 47.421 14.1281 47.5268 14.2442 47.6167C14.6195 47.907 14.9439 48.1524 15.236 48.367C15.8932 48.8497 16.8207 48.7078 17.3034 48.0506C17.5372 47.7322 17.633 47.3418 17.5733 46.9513C17.5552 46.8331 17.5235 46.7192 17.4792 46.6112Z"
          fill="#171D34"
        />
        <path
          d="M57.3244 91.0329C57.0053 90.7754 56.605 90.6572 56.1972 90.7L56.1918 90.7006L55.2248 90.8053C54.3812 90.897 53.7693 91.6576 53.8606 92.5008C53.9047 92.9086 54.1048 93.275 54.424 93.5326C54.7431 93.7902 55.1434 93.9084 55.5512 93.8656L55.5566 93.865L56.5236 93.7603C56.6178 93.7501 56.7111 93.7312 56.8011 93.7042C57.5106 93.4914 57.9677 92.8019 57.8878 92.0648C57.8437 91.657 57.6436 91.2905 57.3244 91.0329Z"
          fill="#171D34"
        />
        <path
          d="M52.2034 91.5837C51.8844 91.3262 51.484 91.2079 51.0763 91.2508L51.0708 91.2514L50.1039 91.356C49.6952 91.4003 49.3283 91.601 49.0706 91.9212C48.8129 92.2415 48.6954 92.6429 48.7396 93.0515C48.8306 93.8925 49.589 94.5047 50.4302 94.4163L50.4356 94.4157L51.4026 94.311C51.4967 94.3009 51.59 94.282 51.68 94.255C52.3896 94.0422 52.8467 93.3527 52.7669 92.6155C52.7227 92.2078 52.5226 91.8413 52.2034 91.5837Z"
          fill="#171D34"
        />
        <path
          d="M72.6916 89.447C72.3725 89.1895 71.9722 89.0712 71.5644 89.1141L71.559 89.1146L70.592 89.2193C69.7483 89.311 69.1364 90.0716 69.2278 90.9149C69.3188 91.7558 70.0772 92.368 70.9184 92.2796L70.9238 92.279L71.8908 92.1743C71.985 92.1641 72.0783 92.1453 72.1683 92.1183C72.8778 91.9055 73.3348 91.216 73.255 90.4788C73.2109 90.071 73.0108 89.7046 72.6916 89.447Z"
          fill="#171D34"
        />
        <path
          d="M67.5706 89.9978C67.2515 89.7403 66.8512 89.622 66.4434 89.6648L66.438 89.6654L65.4711 89.7701C65.0624 89.8143 64.6955 90.0151 64.4378 90.3353C64.1801 90.6555 64.0625 91.057 64.1068 91.4656C64.1978 92.3065 64.9562 92.9188 65.7974 92.8304L65.8028 92.8298L66.7698 92.7251C66.864 92.7149 66.9573 92.6961 67.0472 92.6691C67.7568 92.4563 68.2138 91.7668 68.134 91.0296C68.0899 90.6219 67.8898 90.2554 67.5706 89.9978Z"
          fill="#171D34"
        />
        <path
          d="M61.3222 90.2136L61.3168 90.2141L60.3498 90.3188C59.5062 90.4104 58.8943 91.171 58.9856 92.0143C59.0766 92.8553 59.835 93.4675 60.6762 93.3791L60.6816 93.3785L61.6486 93.2739C61.7427 93.2637 61.836 93.2448 61.926 93.2178C62.6356 93.005 63.0927 92.3155 63.0128 91.5784C62.9218 90.7374 62.1634 90.1252 61.3222 90.2136Z"
          fill="#171D34"
        />
        <path
          d="M19.6567 61.1194L18.1956 62.5805C17.8879 62.8882 17.8879 63.3871 18.1956 63.6948C18.5033 64.0024 19.0021 64.0024 19.3099 63.6948L20.7709 62.2337C21.0786 61.926 21.0786 61.4271 20.7709 61.1194C20.4632 60.8118 19.9644 60.8118 19.6567 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M25.8481 54.9261L24.387 56.3872C24.0793 56.6948 24.0793 57.1937 24.387 57.5014C24.6947 57.8091 25.1936 57.8091 25.5013 57.5014L26.9623 56.0403C27.27 55.7326 27.27 55.2338 26.9623 54.9261C26.6547 54.6184 26.1558 54.6184 25.8481 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M25.5013 61.1194C25.1936 60.8118 24.6947 60.8118 24.387 61.1194C24.0793 61.4271 24.0793 61.926 24.387 62.2337L25.8481 63.6948C26.1558 64.0024 26.6546 64.0024 26.9623 63.6948C27.27 63.3871 27.27 62.8882 26.9623 62.5805L25.5013 61.1194Z"
          fill="#171D34"
        />
        <path
          d="M19.3099 54.9261C19.0022 54.6184 18.5033 54.6184 18.1956 54.9261C17.8879 55.2338 17.8879 55.7326 18.1956 56.0403L19.6567 57.5014C19.9644 57.8091 20.4632 57.8091 20.7709 57.5014C21.0786 57.1937 21.0786 56.6949 20.7709 56.3872L19.3099 54.9261Z"
          fill="#171D34"
        />
        <path
          d="M18.6883 12.9255L19.7204 11.8934C19.9377 11.6761 19.9377 11.3237 19.7204 11.1064C19.503 10.889 19.1507 10.889 18.9333 11.1064L17.9013 12.1384C17.6839 12.3558 17.6839 12.7081 17.9013 12.9255C18.1186 13.1428 18.471 13.1428 18.6883 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M23.0633 8.55046L24.0954 7.51842C24.3127 7.30108 24.3127 6.94871 24.0954 6.73137C23.878 6.51402 23.5257 6.51402 23.3083 6.73137L22.2763 7.76341C22.0589 7.98075 22.0589 8.33312 22.2763 8.55046C22.4936 8.76781 22.846 8.76781 23.0633 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M23.3084 12.9255C23.5257 13.1428 23.8781 13.1428 24.0954 12.9255C24.3128 12.7081 24.3128 12.3557 24.0954 12.1384L23.0633 11.1064C22.846 10.889 22.4936 10.889 22.2763 11.1064C22.0589 11.3237 22.0589 11.6761 22.2763 11.8934L23.3084 12.9255Z"
          fill="#171D34"
        />
        <path
          d="M18.9334 8.55046C19.1507 8.76781 19.5031 8.76781 19.7204 8.55046C19.9378 8.33312 19.9378 7.98075 19.7204 7.76341L18.6883 6.73137C18.471 6.51402 18.1186 6.51402 17.9013 6.73137C17.6839 6.94871 17.6839 7.30108 17.9013 7.51842L18.9334 8.55046Z"
          fill="#171D34"
        />
        <path
          d="M91.3759 53.1696L92.4079 52.1376C92.6253 51.9202 92.6253 51.5678 92.4079 51.3505C92.1906 51.1332 91.8382 51.1332 91.6209 51.3505L90.5888 52.3825C90.3714 52.5999 90.3714 52.9523 90.5888 53.1696C90.8062 53.3869 91.1585 53.3869 91.3759 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M95.7548 48.7946L96.7868 47.7626C97.0042 47.5452 97.0042 47.1928 96.7868 46.9755C96.5695 46.7582 96.2171 46.7582 95.9998 46.9755L94.9677 48.0075C94.7504 48.2249 94.7504 48.5773 94.9677 48.7946C95.1851 49.0119 95.5374 49.0119 95.7548 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M95.9998 53.1696C96.2171 53.3869 96.5695 53.3869 96.7868 53.1696C97.0042 52.9523 97.0042 52.5999 96.7868 52.3825L95.7548 51.3505C95.5374 51.1332 95.1851 51.1332 94.9677 51.3505C94.7504 51.5678 94.7504 51.9202 94.9677 52.1376L95.9998 53.1696Z"
          fill="#171D34"
        />
        <path
          d="M91.6209 48.7946C91.8382 49.0119 92.1906 49.0119 92.4079 48.7946C92.6253 48.5773 92.6253 48.2249 92.4079 48.0075L91.3759 46.9755C91.1585 46.7582 90.8062 46.7582 90.5888 46.9755C90.3714 47.1928 90.3714 47.5452 90.5888 47.7626L91.6209 48.7946Z"
          fill="#171D34"
        />
        <path
          d="M64.8055 9.66375L65.8376 8.6317C66.0549 8.41436 66.0549 8.06199 65.8376 7.84465C65.6202 7.6273 65.2679 7.6273 65.0505 7.84465L64.0185 8.87669C63.8011 9.09403 63.8011 9.4464 64.0185 9.66375C64.2358 9.88109 64.5882 9.88109 64.8055 9.66375Z"
          fill="#171D34"
        />
        <path
          d="M69.1805 5.28875L70.2126 4.2567C70.4299 4.03936 70.4299 3.68699 70.2126 3.46965C69.9953 3.2523 69.6429 3.2523 69.4255 3.46965L68.3935 4.50169C68.1761 4.71903 68.1761 5.0714 68.3935 5.28875C68.6108 5.50609 68.9632 5.50609 69.1805 5.28875Z"
          fill="#171D34"
        />
        <path
          d="M69.4255 9.66377C69.6429 9.88111 69.9953 9.88111 70.2126 9.66377C70.4299 9.44643 70.4299 9.09406 70.2126 8.87671L69.1805 7.84465C68.9632 7.6273 68.6108 7.6273 68.3935 7.84465C68.1761 8.06199 68.1761 8.41436 68.3935 8.63171L69.4255 9.66377Z"
          fill="#171D34"
        />
        <path
          d="M65.0505 5.28877C65.2679 5.50611 65.6202 5.50611 65.8376 5.28877C66.0549 5.07142 66.0549 4.71906 65.8376 4.50171L64.8055 3.46965C64.5882 3.2523 64.2358 3.2523 64.0185 3.46965C63.8011 3.68699 63.8011 4.03936 64.0185 4.2567L65.0505 5.28877Z"
          fill="#171D34"
        />
        <path
          d="M77.0935 94.6689L76.0614 95.7009C75.8441 95.9183 75.8441 96.2706 76.0614 96.488C76.2788 96.7053 76.6312 96.7053 76.8485 96.488L77.8806 95.4559C78.0979 95.2386 78.0979 94.8862 77.8806 94.6689C77.6632 94.4515 77.3109 94.4515 77.0935 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M81.4685 90.2919L80.4364 91.324C80.2191 91.5413 80.2191 91.8937 80.4364 92.111C80.6538 92.3284 81.0062 92.3284 81.2235 92.111L82.2555 91.079C82.4729 90.8616 82.4729 90.5093 82.2555 90.2919C82.0382 90.0746 81.6858 90.0746 81.4685 90.2919Z"
          fill="#171D34"
        />
        <path
          d="M81.2235 94.6689C81.0062 94.4515 80.6538 94.4515 80.4364 94.6689C80.2191 94.8862 80.2191 95.2386 80.4364 95.4559L81.4685 96.488C81.6858 96.7053 82.0382 96.7053 82.2555 96.488C82.4729 96.2706 82.4729 95.9183 82.2555 95.7009L81.2235 94.6689Z"
          fill="#171D34"
        />
        <path
          d="M76.8485 90.2919C76.6312 90.0746 76.2788 90.0746 76.0614 90.2919C75.8441 90.5093 75.8441 90.8616 76.0614 91.079L77.0935 92.111C77.3108 92.3283 77.6632 92.3283 77.8806 92.111C78.0979 91.8937 78.0979 91.5413 77.8806 91.324L76.8485 90.2919Z"
          fill="#171D34"
        />
      </svg>
      Test 2
    </div>
  );



  return (
    <>
        <div className="pBody">
          <span className="heading">Scenario 1- Low End</span>
          <div className="scenarioView">
            <HusbandImage />
            <div className="arrowView">
              <SpousalSupportArrow
               
              />
              <ChildSupportArrow
              
              />
              <ChildSpecialExpenseArrow
               
              />
              
            </div>
            <WifeImage />
          </div>
          <span className="heading mt-5">Scenario 2- Midpoint</span>
          <div className="scenarioView">
            <HusbandImage />
            <div className="arrowView">
              <SpousalSupportArrow
                
              />
              <ChildSupportArrow
               
              />
              <ChildSpecialExpenseArrow
                
              />

             
            </div>
            <WifeImage />
          </div>
          <span className="heading mt-5">Scenario 3- High End</span>
          <div className="scenarioView">
            <HusbandImage />
            <div className="arrowView">
              <SpousalSupportArrow
               
              />
              <ChildSupportArrow
               
              />
              <ChildSpecialExpenseArrow
              
              />
             
            </div>
            <WifeImage />
          </div>
          <div>

          </div>
          
        </div>
     
    </>
  );
}
