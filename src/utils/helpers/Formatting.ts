import { removeNegSignAndWrapInBrackets } from "../../pages/calculator/reports";
const formatNumberInThousands = (
  val: number | string,
  fractions: number = 0
) => {
  console.log('checkVale',typeof val , val)
  if (typeof val === "string") {
    return val;
  } else {
    if (val <= 0 || isNaN(val)) return 0;
    return formatNumber(val, fractions);
  }
};

const convertCurrencyFormattingToText = (val: string) => {
  return val.replace(/[$,]/g, "");
};

const formatNumber = (val: number, fractions: number = 0) => {
  if (val >= 0) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      signDisplay: "never",
      maximumFractionDigits: fractions,
    }).format(val);
  } else {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
      signDisplay: "never",
    }).format(0);
  }
  // const roundedValue = Math.round(val);
  // if (roundedValue >= 0) {
  //   return new Intl.NumberFormat("en-CA", {
  //     style: "currency",
  //     currency: "CAD",
  //     signDisplay: "never",
  //     maximumFractionDigits: 0,
  //   }).format(roundedValue);
  // } else {
  //   return new Intl.NumberFormat("en-CA", {
  //     style: "currency",
  //     currency: "CAD",
  //     maximumFractionDigits: 0,
  //     signDisplay: "never",
  //   }).format(0);
  // }
};

const currencyFormat = (val: number) => {
  if (val >= 0) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      signDisplay: "never",
      maximumFractionDigits: 2,
    }).format(val);
  }
}

const convertDate = (isoString: string) => {
  return isoString.split('T')[0];
};


const formatNumberWithCommasAndDecimals = (value: number): string => {
  // Round to two decimal places
  const roundedValue = Math.round(value * 100) / 100;
  
  // Format with commas for thousands separators
  const formattedValue = roundedValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  });

  return formattedValue;
};




export {
  formatNumberInThousands,
  formatNumber,
  convertCurrencyFormattingToText,
  convertDate,
  currencyFormat,
  formatNumberWithCommasAndDecimals
};
