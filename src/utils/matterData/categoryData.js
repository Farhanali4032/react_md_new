const incomeDetails = [
    {
        name: "Employment income (before deductions)",
        valye: "Employment income (before deductions)",
    },
    {
        name: "Commissions, tips and bonuses",
        value: "Commissions, tips and bonuses"
    },
    {
        name: "Self-employment income",
        value: "Self-employment income"
    },
    {
        name: "Employment insurance benefits",
        value: "Employment insurance benefits"
    },
    {
        name: "Social assistance income (including ODSP payments)",
        value: "Social assistance income (including ODSP payments)"
    },
    {
        name: "Interest and investment income",
        value: "Interest and investment income"
    },
    {
        name: "Pension income (including CPP and OAS)",
        value: "Pension income (including CPP and OAS)"
    },
    {
        name: "Spousal support received from a former spouse/partner",
        value: "Spousal support received from a former spouse/partner"
    },
    {
        name: "Other sources of income",
        value: "Other sources of income"
    }
]

const natureOfOwnership = [
    {
        name: "Owned",
        valye: "Owned",
    },
    {
        name: "Renting",
        value: "Renting"
    },
]

const benefitsDetails = [
    {
        name:  'Medical Insurance Coverage',
        value:  'Medical Insurance Coverage',
    },
   
    {
        name:  'Use of Company Car',
        value:  'Use of Company Car',
    },
   
    {
        name:  'Use of Room',
        value:  'Use of Room',
    },
   
    {
        name:   'Other',
        value:   'Other'
    },
]

const financialAssets = [
    {
        name: "Investments",
        value: "Investments",
    },
    {
        name: "Bank accounts",
        value: "Bank accounts",
    },
    {
        name: "Life Insurance",
        value: "Life Insurance",
    },
    {
        name: "Savings Plans",
        value: "Savings Plans",
    },
    {
        name: "Other Assets",
        value: "Other Assets",
    },

]

const businessInterests = [
    {
        name: "Interest in Business",
        value: "Interest in Business",
    },
    {
        name: "Other Assets",
        value: "Other Assets",
    },
]

const moneyOwed = [
    {
        name: "Money Owned to you",
        value: "Money Owned to you",
    },
    {
        name: "Other Assets",
        value: "Other Assets",
    }
]

const assetsDetails = [
    {
        name: "Cars, Boats, Vehicles",
        value: "Cars, Boats, Vehicles",
    },
    {
        name: "Other Possessions of Value",
        value: "Other Possessions of Value",
    },
    {
        name: "Other Assets",
        value: "Other Assets",
    },
]

const debtsDetails = [
    {
        name: "Mortgages",
        value: "Mortgages",
    },
    {
        name: "Line of credits",
        value: "Line of credits",
    },
    {
        name: "Other loans",
        value: "Other loans",
    },
    {
        name: "Outstanding credit card balances",
        value: "Outstanding credit card balances",
    },
    {
        name: "Unpaid Support Amounts",
        value: "Unpaid Support Amounts",
    },
    {
        name: "Other Debts",
        value: "Other Debts",
    },
]

const specialExpenses = [
    {
        name: "Child care expense",
        value: "Child care expense",
    },
    {
        name: "Medical expenses",
        value: "Medical expenses",
    },
    {
        name: "Extraordinary education expenses",
        value: "Extraordinary education expenses",
    },
    {
        name: "Post Secondary expenses",
        value: "Post Secondary expenses",
    },
    {
        name: "Extraordinary extracurricular expenses",
        value: "Extraordinary extracurricular expenses",
    },
]

const expenseDetails = [
    {
        name: "CPP contributions",
        value: "CPP contributions",
    },
    {
        name: "EI premiums",
        value: "EI premiums",
    },
    {
        name: "Income taxes",
        value: "Income taxes",
    },
    {
        name: "Employee pension contributions",
        value: "Employee pension contributions",
    },
    {
        name: "Union dues",
        value: "Union dues",
    },
    {
        name: "Rent or mortgage",
        value: "Rent or mortgage",
    },
    {
        name: "Property taxes",
        value: "Property taxes",
    },
    {
        name: "Property insurance",
        value: "Property insurance",
    },
    {
        name: "Condominium fees",
        value: "Condominium fees",
    },
    {
        name: "Repairs and maintenance",
        value: "Repairs and maintenance",
    },
    {
        name: "Water",
        value: "Water",
    },
    {
        name: "Heat",
        value: "Heat",
    },
    {
        name: "Electricity",
        value: "Electricity",
    },
    {
        name: "Telephone",
        value: "Telephone",
    },
    {
        name: "Cell Phone",
        value: "Cell Phone",
    },
    {
        name: "Cable",
        value: "Cable",
    },
    {
        name: "Internet",
        value: "Internet",
    },
    {
        name: "Groceries",
        value: "Groceries",
    },
    {
        name: "Household supplies",
        value: "Household supplies",
    },
    {
        name: "Meals outside the home",
        value: "Meals outside the home",
    },
    {
        name: "Pet care",
        value: "Pet care",
    },
    {
        name: "Laundry and Dry Cleaning",
        value: "Laundry and Dry Cleaning",
    },
    {
        name: "Daycare expenses",
        value: "Daycare expenses",
    },
    {
        name: "Babysitting costs",
        value: "Babysitting costs",
    },
    {
        name: "Public transit, taxis",
        value: "Public transit, taxis",
    },
    {
        name: "Gas and oil",
        value: "Gas and oil",
    },
    {
        name: "Car insurance and licence",
        value: "Car insurance and licence",
    },
    {
        name: "Repairs and maintenance",
        value: "Repairs and maintenance",
    },
    {
        name: "Parking",
        value: "Parking",
    },
    {
        name: "Car Loan or Lease Payments",
        value: "Car Loan or Lease Payments",
    },
    {
        name: "Health insurance premiums",
        value: "Health insurance premiums",
    },
    {
        name: "Dental expenses",
        value: "Dental expenses",
    },
    {
        name: "Medicine and drugs",
        value: "Medicine and drugs",
    },
    {
        name: "Eye care",
        value: "Eye care",
    },
    {
        name: "Clothing",
        value: "Clothing",
    },
    {
        name: "Hair care and beauty",
        value: "Hair care and beauty",
    },
    {
        name: "Alcohol and tobacco",
        value: "Alcohol and tobacco",
    },
    {
        name: "Education (specify)",
        value: "Education (specify)",
    },
    {
        name: "Entertainment/recreation (including children)",
        value: "Entertainment/recreation (including children)",
    },
    {
        name: "Gifts",
        value: "Gifts",
    },
    {
        name: "Life Insurance premiums",
        value: "Life Insurance premiums",
    },
    {
        name: "RRSP/RESP withdrawals",
        value: "RRSP/RESP withdrawals",
    },
    {
        name: "Vacations",
        value: "Vacations",
    },
    {
        name: "School fees and supplies",
        value: "School fees and supplies",
    },
    {
        name: "Clothing for children",
        value: "Clothing for children",
    },
    {
        name: "Children's activities",
        value: "Children's activities",
    },
    {
        name: "Summer camp expenses",
        value: "Summer camp expenses",
    },
    {
        name: "Debt payments",
        value: "Debt payments",
    },
    {
        name: "Support paid for other children",
        value: "Support paid for other children",
    },
    {
        name: "Other expenses not shown above (specify)",
        value: "Other expenses not shown above (specify)",
    }
]

const simpleYesNo = [
    {
        name: 'Yes',
        value: 'Yes',
        label: 'isInPossession'
    },
    {
        name: 'No',
        value: 'No',
        label: 'isInPossession'
    }
    
]

const lifeInsurance = [
    {
        name: 'Life Insurance',
        value: 'Life Insurance',
    },
    {
        name: 'Pension Fund',
        value: 'Pension Fund',
    },
    {
        name: 'Disability Cover',
        value: 'Disability Cover',
    }
    
]

const financialYear = [
    {
        name: '2022',
        value: '2022',
    },
    {
        name: '2023',
        value: '2023',
    },
    {
        name: '2024',
        value: '2024',
    },
]

export {
    incomeDetails,
    benefitsDetails,
    assetsDetails,
    expenseDetails,
    specialExpenses,
    debtsDetails,
    natureOfOwnership,
    financialAssets,
    businessInterests,
    moneyOwed,
    simpleYesNo,
    lifeInsurance,
    financialYear
}