import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSingleMatterData } from '../getSingleMatterData/getSingleMattersDataActions'

import {
  selectDataSingleMatterExpenseData,
  selectDataSingleMatterExpenseError,
  selectDataSingleMatterExpenseLoading
} from '../getSingleMatterData/getSingleMattersDataSelectors'
import { formatNumber, formatNumberInThousands } from '../../../helpers/Formatting'

export function ExpenseData(matterId) {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSingleMatterData(matterId, 'expenses'))
    }
    fetchData()
  }, [dispatch])

  const selectExpenseData = useSelector(selectDataSingleMatterExpenseData)
  const selectExpenseDataLoading = useSelector(
    selectDataSingleMatterExpenseLoading
  )
  const selectExpenseDataError = useSelector(selectDataSingleMatterExpenseError)

  return {
    selectExpenseData,
    selectExpenseDataLoading,
    selectExpenseDataError
  }
}

export function Expenses(data) {

  const exepenseData = data || {}

  const exepenseDetails = exepenseData?.body

  const clientExpenses = exepenseDetails?.client?.expenses || '';
  const clientSpecialExpenses = exepenseDetails?.client?.specialChildExpenses || '';

  const opposingPartyExpenses = exepenseDetails?.opposingParty?.expenses || ''
  const opposingPartySpecialExpenses = exepenseDetails?.opposingParty?.specialChildExpenses || ''

  // CLIENTS
  const totalClientExpensesMonthlyTotal = Array.isArray(clientExpenses) ?
    clientExpenses?.reduce((total, income) => total + parseFloat(income.monthlyAmount), 0) : '';

  const totalClientExpensesYearly = Array.isArray(clientExpenses) ?
    clientExpenses?.reduce((total, income) => total + parseFloat(income.yearlyAmount), 0) : '';

  // OPPOSING PARTY
  const totalopposingPartyExpensesMonthlyTotal = Array.isArray(opposingPartyExpenses) ?
    opposingPartyExpenses?.reduce((total, income) => total + parseFloat(income.monthlyAmount), 0) : '';

  const totalopposingPartyExpensesYearly = Array.isArray(opposingPartyExpenses) ?
    opposingPartyExpenses?.reduce((total, income) => total + parseFloat(income.yearlyAmount), 0) : '';

  const ClientExpensesDetails = () => {

    // Initialize an object to store the totals
    const totals = {}
    // Calculate totals for each type of income
    if (Array.isArray(clientExpenses)) {
      clientExpenses?.forEach(item => {
        if (!totals[item.type]) {
          totals[item.type] = 0
        }
        totals[item.type] += parseInt(item.monthlyAmount)
      })
    } else {

    }

    // Log the totals

    const sources = {
      // Automatic Deductions
      automaticDeductionsCPPContributions: totals['CPP contributions'] || 0,
      automaticDeductionsEIPremiums: totals['EI premiums'] || 0,
      automaticDeductionsIncomeTaxes: totals['Income taxes'] || 0,
      automaticDeductionsEmployeePensionContributions: totals['Employee pension contributions'] || 0,
      automaticDeductionsUnionDues: totals['Union dues'] || 0,
      // Housing
      housingRentOrMortgage: totals['Rent or mortgage'] || 0,
      housingPropertyTaxes: totals['Property taxes'] || 0,
      housingPropertyInsurance: totals['Property insurance'] || 0,
      housingCondominiumFees: totals['Condominium fees'] || 0,
      housingRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      //Utilities
      utilitiesWater: totals['Water'] || 0,
      utilitiesHeat: totals['Heat'] || 0,
      utilitiesElectricity: totals['Electricity'] || 0,
      utilitiesTelephone: totals['Telephone'] || 0,
      utilitiesCellPhone: totals['Cell Phone'] || 0,
      utilitiesCable: totals['Cable'] || 0,
      utilitiesInternet: totals['Internet'] || 0,
      // Household Expenses
      householdExpensesGroceries: totals['Groceries'] || 0,
      householdExpensesHouseholdSupplies: totals['Household supplies'] || 0,
      householdExpensesMealsOutsideTheHome: totals['Meals outside the home'] || 0,
      householdExpensesPetCare: totals['Pet care'] || 0,
      householdExpensesLaundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
      // Childcare Costs
      childcareCostsDaycareExpenses: totals['Daycare expenses'] || 0,
      childcareCostsBabysittingCosts: totals['Babysitting costs'] || 0,
      // Transportaion
      transportationPublicTransitTaxis: totals['Public transit, taxis'] || 0,
      transportationGasAndOil: totals['Gas and oil'] || 0,
      transportationCarInsuranceAndLicence: totals['Car insurance and licence'] || 0,
      transportationRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      transportationParking: totals['Parking'] || 0,
      transportationCarLoanOrLeasePayments: totals['Car Loan or Lease Payments'] || 0,
      // Health
      healthHealthInsurancePremiums: totals['Health insurance premiums'] || 0,
      healthDentalExpenses: totals['Dental expenses'] || 0,
      healthMedicineAndDrugs: totals['Medicine and drugs'] || 0,
      healthEyeCare: totals['Eye care'] || 0,
      // Personal
      personalClothing: totals['Clothing'] || 0,
      personalHairCareAndBeauty: totals['Hair care and beauty'] || 0,
      personalAlcoholAndTobacco: totals['Alcohol and tobacco'] || 0,
      personalEducation: totals['Education (specify)'] || 0,
      personalEntertainmentAndRecreation: totals['Entertainment/recreation (including children)'] || 0,
      personalGifts: totals['Gifts'] || 0,
      // Other Expenses
      otherExpensesLifeInsurancePremiums: totals['Life Insurance premiums'] || 0,
      otherExpensesRRSPAndRESPWithdrawals: totals['RRSP/RESP withdrawals'] || 0,
      otherExpensesVacations: totals['Vacations'] || 0,
      otherExpensesSchoolFeesAndSupplies: totals['School fees and supplies'] || 0,
      otherExpensesClothingForChildren: totals['Clothing for children'] || 0,
      otherExpensesChildrensActivities: totals["Children's activities"] || 0,
      otherExpensesSummerCampExpenses: totals['Summer camp expenses'] || 0,
      otherExpensesDebtPayments: totals['Debt payments'] || 0,
      otherExpensesSupportPaidForOtherChildren: totals['Support paid for other children'] || 0,
      otherExpensesOtherExpensesNotShownAbove: totals['Other expenses not shown above (specify)'] || 0,

      totalMonthlyIncome: totalClientExpensesMonthlyTotal || 0, // Total monthly income (sum of all above incomes)
      totalAnnualIncome: totalClientExpensesYearly || 0 // Total annual income (multiply total monthly income by 12)
    }
    // totals['CPP contributions']
    const expenses = {
      expenses: {
        automaticDeductions: {
          cppContributions: totals['CPP contributions'] || 0,
          eiPremiums: totals['EI premiums'] || 0,
          incomeTaxes: totals['Income taxes'] || 0,
          employeePensionContributions: totals['Employee pension contributions'] || 0,
          unionDues: totals['Union dues'] || 0,
          subtotal:
            (parseInt(totals['CPP contributions']) || 0) +
            (parseInt(totals['EI premiums']) || 0) +
            (parseInt(totals['Income taxes']) || 0) +
            (parseInt(totals['Employee pension contributions']) || 0) +
            (parseInt(totals['Union dues']) || 0)
        },
        housing: {
          rentOrMortgage: totals['Rent or mortgage'] || 0,
          propertyTaxes: totals['Property taxes'] || 0,
          propertyInsurance: totals['Property insurance'] || 0,
          condominiumFees: totals['Condominium fees'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          subtotal: 
            (parseInt(totals['Rent or mortgage']) || 0) +
            (parseInt(totals['Property taxes']) || 0) +
            (parseInt(totals['Property insurance']) || 0) +
            (parseInt(totals['Condominium fees']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0)
        },
        utilities: {
          water: totals['Water'] || 0,
          heat: totals['Heat'] || 0,
          electricity: totals['Electricity'] || 0,
          telephone: totals['Telephone'] || 0,
          cellPhone: totals['Cell Phone'] || 0,
          cable: totals['Cable'] || 0,
          internet: totals['Internet'] || 0,
          subtotal: 
            (parseInt(totals['Water']) || 0) +
            (parseInt(totals['Heat']) || 0) +
            (parseInt(totals['Electricity']) || 0) +
            (parseInt(totals['Telephone']) || 0) +
            (parseInt(totals['Cell Phone']) || 0) +
            (parseInt(totals['Cable']) || 0) +
            (parseInt(totals['Internet']) || 0)
          
        },
        householdExpenses: {
          groceries: totals['Groceries'] || 0,
          householdSupplies: totals['Household supplies'] || 0,
          mealsOutsideTheHome: totals['Meals outside the home'] || 0,
          petCare: totals['Pet care'] || 0,
          laundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
          subtotal: 
            (parseInt(totals['Groceries']) || 0) +
            (parseInt(totals['Household supplies']) || 0) +
            (parseInt(totals['Meals outside the home']) || 0) +
            (parseInt(totals['Pet care']) || 0) +
            (parseInt(totals['Laundry and Dry Cleaning']) || 0)
        },
        childcare: {
          daycare: totals['Daycare expenses'] || 0,
          babysitting: totals['Babysitting costs'] || 0,
          subtotal: 
            (parseInt(totals['Daycare expenses']) || 0) +
            (parseInt(totals['Babysitting costs']) || 0)
          
        },
        transportation: {
          publicTransit: totals['Public transit, taxis'] || 0,
          carPayments: totals['Car Loan or Lease Payments'] || 0,
          gasAndOil: totals['Gas and oil'] || 0,
          insurance: totals['Car insurance and licence'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          parking: totals['Parking'] || 0,
          subtotal: 
            (parseInt(totals['Public transit, taxis']) || 0) +
            (parseInt(totals['Car Loan or Lease Payments']) || 0) +
            (parseInt(totals['Gas and oil']) || 0) +
            (parseInt(totals['Car insurance and licence']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0) +
            (parseInt(totals['Parking']) || 0)

        },
        health: {
          insurance: totals['Health insurance premiums'] || 0,
          dental: totals['Dental expenses'] || 0,
          medicine: totals['Medicine and drugs'] || 0,
          eyecare: totals['Eye care'] || 0,
          subtotal: 
            (parseInt(totals['Health insurance premiums']) || 0) +
            (parseInt(totals['Dental expenses']) || 0) +
            (parseInt(totals['Medicine and drugs']) || 0) +
            (parseInt(totals['Eye care']) || 0)
        },
        personal: {
          clothing: totals['Clothing'] || 0,
          haircare: totals['Hair care and beauty'] || 0,
          alcohol: totals['Alcohol and tobacco'] || 0,
          education: totals['Education (specify)'] || 0,
          entertainment: totals['Entertainment/recreation (including children)'] || 0,
          gifts: totals['Gifts'] || 0,
          subtotal: 
            (parseInt(totals['Clothing']) || 0) +
            (parseInt(totals['Hair care and beauty']) || 0) +
            (parseInt(totals['Alcohol and tobacco']) || 0) +
            (parseInt(totals['Education (specify)']) || 0) +
            (parseInt(totals['Entertainment/recreation (including children)']) || 0) +
            (parseInt(totals['Gifts']) || 0)
        },
        other: {
          lifeInsurance: totals['Life Insurance premiums'] || 0,
          rrsp: totals['RRSP/RESP withdrawals'] || 0,
          vacations: totals['Vacations'] || 0,
          school: totals['School fees and supplies'] || 0,
          clothingForChildren: totals['Clothing for children'] || 0,
          childrenActivities: totals["Children's activities"] || 0,
          summerCamp: totals['Summer camp expenses'] || 0,
          debtPayments: totals['Debt payments'] || 0,
          supportPaidForOtherChildren: totals['Support paid for other children'] || 0,
          other: totals['Other expenses not shown above (specify)'] || 0,
          subtotal: 
            (parseInt(totals['Life Insurance premiums']) || 0) +
            (parseInt(totals['RRSP/RESP withdrawals']) || 0) +
            (parseInt(totals['Vacations']) || 0) +
            (parseInt(totals['School fees and supplies']) || 0) +
            (parseInt(totals['Clothing for children']) || 0) +
            (parseInt(totals["Children's activities"]) || 0) +
            (parseInt(totals['Summer camp expenses']) || 0) +
            (parseInt(totals['Debt payments']) || 0) +
            (parseInt(totals['Support paid for other children']) || 0) +
            (parseInt(totals['Other expenses not shown above (specify)']) || 0)
        },
        totalMonthlyExpenses: totalClientExpensesMonthlyTotal || 0,
        totalYearlyExpenses: totalClientExpensesYearly || 0

      },
    }


    return expenses
  }
  // formatNumberInThousands
  const opposingPartyExpensesDetails = () => {
    // Initialize an object to store the totals
    const totals = {}

    // Calculate totals for each type of income
    if (Array.isArray(opposingPartyExpenses)) {
    opposingPartyExpenses?.forEach(item => {
      if (!totals[item.type]) {
        totals[item.type] = 0
      }
      totals[item.type] += parseInt(item.monthlyAmount)
    })
  }else {}

    // Log the totals

    const sources = {
      // Automatic Deductions
      automaticDeductionsCPPContributions: totals['CPP contributions'] || 0,
      automaticDeductionsEIPremiums: totals['EI premiums'] || 0,
      automaticDeductionsIncomeTaxes: totals['Income taxes'] || 0,
      automaticDeductionsEmployeePensionContributions: totals['Employee pension contributions'] || 0,
      automaticDeductionsUnionDues: totals['Union dues'] || 0,
      // Housing
      housingRentOrMortgage: totals['Rent or mortgage'] || 0,
      housingPropertyTaxes: totals['Property taxes'] || 0,
      housingPropertyInsurance: totals['Property insurance'] || 0,
      housingCondominiumFees: totals['Condominium fees'] || 0,
      housingRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      //Utilities
      utilitiesWater: totals['Water'] || 0,
      utilitiesHeat: totals['Heat'] || 0,
      utilitiesElectricity: totals['Electricity'] || 0,
      utilitiesTelephone: totals['Telephone'] || 0,
      utilitiesCellPhone: totals['Cell Phone'] || 0,
      utilitiesCable: totals['Cable'] || 0,
      utilitiesInternet: totals['Internet'] || 0,
      // Household Expenses
      householdExpensesGroceries: totals['Groceries'] || 0,
      householdExpensesHouseholdSupplies: totals['Household supplies'] || 0,
      householdExpensesMealsOutsideTheHome: totals['Meals outside the home'] || 0,
      householdExpensesPetCare: totals['Pet care'] || 0,
      householdExpensesLaundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
      // Childcare Costs
      childcareCostsDaycareExpenses: totals['Daycare expenses'] || 0,
      childcareCostsBabysittingCosts: totals['Babysitting costs'] || 0,
      // Transportaion
      transportationPublicTransitTaxis: totals['Public transit, taxis'] || 0,
      transportationGasAndOil: totals['Gas and oil'] || 0,
      transportationCarInsuranceAndLicence: totals['Car insurance and licence'] || 0,
      transportationRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      transportationParking: totals['Parking'] || 0,
      transportationCarLoanOrLeasePayments: totals['Car Loan or Lease Payments'] || 0,
      // Health
      healthHealthInsurancePremiums: totals['Health insurance premiums'] || 0,
      healthDentalExpenses: totals['Dental expenses'] || 0,
      healthMedicineAndDrugs: totals['Medicine and drugs'] || 0,
      healthEyeCare: totals['Eye care'] || 0,
      // Personal
      personalClothing: totals['Clothing'] || 0,
      personalHairCareAndBeauty: totals['Hair care and beauty'] || 0,
      personalAlcoholAndTobacco: totals['Alcohol and tobacco'] || 0,
      personalEducation: totals['Education (specify)'] || 0,
      personalEntertainmentAndRecreation: totals['Entertainment/recreation (including children)'] || 0,
      personalGifts: totals['Gifts'] || 0,
      // Other Expenses
      otherExpensesLifeInsurancePremiums: totals['Life Insurance premiums'] || 0,
      otherExpensesRRSPAndRESPWithdrawals: totals['RRSP/RESP withdrawals'] || 0,
      otherExpensesVacations: totals['Vacations'] || 0,
      otherExpensesSchoolFeesAndSupplies: totals['School fees and supplies'] || 0,
      otherExpensesClothingForChildren: totals['Clothing for children'] || 0,
      otherExpensesChildrensActivities: totals["Children's activities"] || 0,
      otherExpensesSummerCampExpenses: totals['Summer camp expenses'] || 0,
      otherExpensesDebtPayments: totals['Debt payments'] || 0,
      otherExpensesSupportPaidForOtherChildren: totals['Support paid for other children'] || 0,
      otherExpensesOtherExpensesNotShownAbove: totals['Other expenses not shown above (specify)'] || 0,

      totalMonthlyIncome: totalopposingPartyExpensesMonthlyTotal || 0, // Total monthly income (sum of all above incomes)
      totalAnnualIncome: totalopposingPartyExpensesYearly || 0 // Total annual income (multiply total monthly income by 12)
    }

    const expenses = {
      expenses: {
        automaticDeductions: {
          cppContributions: (totals['CPP contributions'] !== undefined ? totals['CPP contributions'].toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '') || 0,
          eiPremiums: totals['EI premiums'] || 0,
          incomeTaxes: totals['Income taxes'] || 0,
          employeePensionContributions: totals['Employee pension contributions'] || 0,
          unionDues: totals['Union dues'] || 0,
          subtotal: (parseInt(totals['CPP contributions']) || 0) +
            (parseInt(totals['EI premiums']) || 0) +
            (parseInt(totals['Income taxes']) || 0) +
            (parseInt(totals['Employee pension contributions']) || 0) +
            (parseInt(totals['Union dues']) || 0)
        },
        housing: {
          rentOrMortgage: totals['Rent or mortgage'] || 0,
          propertyTaxes: totals['Property taxes'] || 0,
          propertyInsurance: totals['Property insurance'] || 0,
          condominiumFees: totals['Condominium fees'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          subtotal: (parseInt(totals['Rent or mortgage']) || 0) +
            (parseInt(totals['Property taxes']) || 0) +
            (parseInt(totals['Property insurance']) || 0) +
            (parseInt(totals['Condominium fees']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0)
        },
        utilities: {
          water: totals['Water'] || 0,
          heat: totals['Heat'] || 0,
          electricity: totals['Electricity'] || 0,
          telephone: totals['Telephone'] || 0,
          cellPhone: totals['Cell Phone'] || 0,
          cable: totals['Cable'] || 0,
          internet: totals['Internet'] || 0,
          subtotal: (parseInt(totals['Water']) || 0) +
            (parseInt(totals['Heat']) || 0) +
            (parseInt(totals['Electricity']) || 0) +
            (parseInt(totals['Telephone']) || 0) +
            (parseInt(totals['Cell Phone']) || 0) +
            (parseInt(totals['Cable']) || 0) +
            (parseInt(totals['Internet']) || 0)
        },
        householdExpenses: {
          groceries: totals['Groceries'] || 0,
          householdSupplies: totals['Household supplies'] || 0,
          mealsOutsideTheHome: totals['Meals outside the home'] || 0,
          petCare: totals['Pet care'] || 0,
          laundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
          subtotal: (parseInt(totals['Groceries']) || 0) +
            (parseInt(totals['Household supplies']) || 0) +
            (parseInt(totals['Meals outside the home']) || 0) +
            (parseInt(totals['Pet care']) || 0) +
            (parseInt(totals['Laundry and Dry Cleaning']) || 0)
        },
        childcare: {
          daycare: totals['Daycare expenses'] || 0,
          babysitting: totals['Babysitting costs'] || 0,
          subtotal: (parseInt(totals['Daycare expenses']) || 0) +
            (parseInt(totals['Babysitting costs']) || 0)
        },
        transportation: {
          publicTransit: totals['Public transit, taxis'] || 0,
          carPayments: totals['Car Loan or Lease Payments'] || 0,
          gasAndOil: totals['Gas and oil'] || 0,
          insurance: totals['Car insurance and licence'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          parking: totals['Parking'] || 0,
          subtotal: (parseInt(totals['Public transit, taxis']) || 0) +
            (parseInt(totals['Car Loan or Lease Payments']) || 0) +
            (parseInt(totals['Gas and oil']) || 0) +
            (parseInt(totals['Car insurance and licence']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0) +
            (parseInt(totals['Parking']) || 0)
        },
        health: {
          insurance: totals['Health insurance premiums'] || 0,
          dental: totals['Dental expenses'] || 0,
          medicine: totals['Medicine and drugs'] || 0,
          eyecare: totals['Eye care'] || 0,
          subtotal: (parseInt(totals['Health insurance premiums']) || 0) +
            (parseInt(totals['Dental expenses']) || 0) +
            (parseInt(totals['Medicine and drugs']) || 0) +
            (parseInt(totals['Eye care']) || 0)
        },
        personal: {
          clothing: totals['Clothing'] || 0,
          haircare: totals['Hair care and beauty'] || 0,
          alcohol: totals['Alcohol and tobacco'] || 0,
          education: totals['Education (specify)'] || 0,
          entertainment: totals['Entertainment/recreation (including children)'] || 0,
          gifts: totals['Gifts'] || 0,
          subtotal: (parseInt(totals['Clothing']) || 0) +
            (parseInt(totals['Hair care and beauty']) || 0) +
            (parseInt(totals['Alcohol and tobacco']) || 0) +
            (parseInt(totals['Education (specify)']) || 0) +
            (parseInt(totals['Entertainment/recreation (including children)']) || 0) +
            (parseInt(totals['Gifts']) || 0)
        },
        other: {
          lifeInsurance: totals['Life Insurance premiums'] || 0,
          rrsp: totals['RRSP/RESP withdrawals'] || 0,
          vacations: totals['Vacations'] || 0,
          school: totals['School fees and supplies'] || 0,
          clothingForChildren: totals['Clothing for children'] || 0,
          childrenActivities: totals["Children's activities"] || 0,
          summerCamp: totals['Summer camp expenses'] || 0,
          debtPayments: totals['Debt payments'] || 0,
          supportPaidForOtherChildren: totals['Support paid for other children'] || 0,
          other: totals['Other expenses not shown above (specify)'] || 0,
          subtotal: (parseInt(totals['Life Insurance premiums']) || 0) +
            (parseInt(totals['RRSP/RESP withdrawals']) || 0) +
            (parseInt(totals['Vacations']) || 0) +
            (parseInt(totals['School fees and supplies']) || 0) +
            (parseInt(totals['Clothing for children']) || 0) +
            (parseInt(totals["Children's activities"]) || 0) +
            (parseInt(totals['Summer camp expenses']) || 0) +
            (parseInt(totals['Debt payments']) || 0) +
            (parseInt(totals['Support paid for other children']) || 0) +
            (parseInt(totals['Other expenses not shown above (specify)']) || 0)
        },
        totalMonthlyExpenses: totalClientExpensesMonthlyTotal || 0,
        totalYearlyExpenses: totalClientExpensesYearly || 0
      },
    }


    // // Calculate total monthly income
    // sources.totalMonthlyIncome =
    //   Object.values(totals).reduce((total, amount) => total + amount, 0) || 0

    // // Calculate total annual income
    // sources.totalAnnualIncome = sources.totalMonthlyIncome
    //   ? sources.totalMonthlyIncome * 12
    //   : ''

    return expenses
  }

  const ExpenseDetailsClient = ClientExpensesDetails();
  const ExpenseDetailsOpposingParty = opposingPartyExpensesDetails();

  return {
    ExpenseDetailsClient,
    ExpenseDetailsOpposingParty,
    clientSpecialExpenses,
    opposingPartySpecialExpenses
  }

}

export function ExpenseInfo(data) {

  const exepenseData = data || {}

  const exepenseDetails = exepenseData

  const clientExpenses = exepenseDetails?.client?.expenses || '';
  const clientSpecialExpenses = exepenseDetails?.client?.specialChildExpenses || '';

  const opposingPartyExpenses = exepenseDetails?.opposingParty?.expenses || ''
  const opposingPartySpecialExpenses = exepenseDetails?.opposingParty?.specialChildExpenses || ''

  // CLIENTS
  const totalClientExpensesMonthlyTotal = Array.isArray(clientExpenses) ?
    clientExpenses?.reduce((total, income) => total + parseFloat(income.monthlyAmount), 0) : '';

  const totalClientExpensesYearly = Array.isArray(clientExpenses) ?
    clientExpenses?.reduce((total, income) => total + parseFloat(income.yearlyAmount), 0) : '';

  // OPPOSING PARTY
  const totalopposingPartyExpensesMonthlyTotal = Array.isArray(opposingPartyExpenses) ?
    opposingPartyExpenses?.reduce((total, income) => total + parseFloat(income.monthlyAmount), 0) : '';

  const totalopposingPartyExpensesYearly = Array.isArray(opposingPartyExpenses) ?
    opposingPartyExpenses?.reduce((total, income) => total + parseFloat(income.yearlyAmount), 0) : '';

  const ClientExpensesDetails = () => {

    // Initialize an object to store the totals
    const totals = {}
    // Calculate totals for each type of income
    if (Array.isArray(clientExpenses)) {
      clientExpenses?.forEach(item => {
        if (!totals[item.type]) {
          totals[item.type] = 0
        }
        totals[item.type] += parseInt(item.monthlyAmount)
      })
    } else {

    }

    // Log the totals

    const sources = {
      // Automatic Deductions
      automaticDeductionsCPPContributions: totals['CPP contributions'] || 0,
      automaticDeductionsEIPremiums: totals['EI premiums'] || 0,
      automaticDeductionsIncomeTaxes: totals['Income taxes'] || 0,
      automaticDeductionsEmployeePensionContributions: totals['Employee pension contributions'] || 0,
      automaticDeductionsUnionDues: totals['Union dues'] || 0,
      // Housing
      housingRentOrMortgage: totals['Rent or mortgage'] || 0,
      housingPropertyTaxes: totals['Property taxes'] || 0,
      housingPropertyInsurance: totals['Property insurance'] || 0,
      housingCondominiumFees: totals['Condominium fees'] || 0,
      housingRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      //Utilities
      utilitiesWater: totals['Water'] || 0,
      utilitiesHeat: totals['Heat'] || 0,
      utilitiesElectricity: totals['Electricity'] || 0,
      utilitiesTelephone: totals['Telephone'] || 0,
      utilitiesCellPhone: totals['Cell Phone'] || 0,
      utilitiesCable: totals['Cable'] || 0,
      utilitiesInternet: totals['Internet'] || 0,
      // Household Expenses
      householdExpensesGroceries: totals['Groceries'] || 0,
      householdExpensesHouseholdSupplies: totals['Household supplies'] || 0,
      householdExpensesMealsOutsideTheHome: totals['Meals outside the home'] || 0,
      householdExpensesPetCare: totals['Pet care'] || 0,
      householdExpensesLaundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
      // Childcare Costs
      childcareCostsDaycareExpenses: totals['Daycare expenses'] || 0,
      childcareCostsBabysittingCosts: totals['Babysitting costs'] || 0,
      // Transportaion
      transportationPublicTransitTaxis: totals['Public transit, taxis'] || 0,
      transportationGasAndOil: totals['Gas and oil'] || 0,
      transportationCarInsuranceAndLicence: totals['Car insurance and licence'] || 0,
      transportationRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      transportationParking: totals['Parking'] || 0,
      transportationCarLoanOrLeasePayments: totals['Car Loan or Lease Payments'] || 0,
      // Health
      healthHealthInsurancePremiums: totals['Health insurance premiums'] || 0,
      healthDentalExpenses: totals['Dental expenses'] || 0,
      healthMedicineAndDrugs: totals['Medicine and drugs'] || 0,
      healthEyeCare: totals['Eye care'] || 0,
      // Personal
      personalClothing: totals['Clothing'] || 0,
      personalHairCareAndBeauty: totals['Hair care and beauty'] || 0,
      personalAlcoholAndTobacco: totals['Alcohol and tobacco'] || 0,
      personalEducation: totals['Education (specify)'] || 0,
      personalEntertainmentAndRecreation: totals['Entertainment/recreation (including children)'] || 0,
      personalGifts: totals['Gifts'] || 0,
      // Other Expenses
      otherExpensesLifeInsurancePremiums: totals['Life Insurance premiums'] || 0,
      otherExpensesRRSPAndRESPWithdrawals: totals['RRSP/RESP withdrawals'] || 0,
      otherExpensesVacations: totals['Vacations'] || 0,
      otherExpensesSchoolFeesAndSupplies: totals['School fees and supplies'] || 0,
      otherExpensesClothingForChildren: totals['Clothing for children'] || 0,
      otherExpensesChildrensActivities: totals["Children's activities"] || 0,
      otherExpensesSummerCampExpenses: totals['Summer camp expenses'] || 0,
      otherExpensesDebtPayments: totals['Debt payments'] || 0,
      otherExpensesSupportPaidForOtherChildren: totals['Support paid for other children'] || 0,
      otherExpensesOtherExpensesNotShownAbove: totals['Other expenses not shown above (specify)'] || 0,

      totalMonthlyIncome: totalClientExpensesMonthlyTotal || 0, // Total monthly income (sum of all above incomes)
      totalAnnualIncome: totalClientExpensesYearly || 0 // Total annual income (multiply total monthly income by 12)
    }
    // totals['CPP contributions']
    const expenses = {
      expenses: {
        automaticDeductions: {
          cppContributions: totals['CPP contributions'] || 0,
          eiPremiums: totals['EI premiums'] || 0,
          incomeTaxes: totals['Income taxes'] || 0,
          employeePensionContributions: totals['Employee pension contributions'] || 0,
          unionDues: totals['Union dues'] || 0,
          subtotal:
            (parseInt(totals['CPP contributions']) || 0) +
            (parseInt(totals['EI premiums']) || 0) +
            (parseInt(totals['Income taxes']) || 0) +
            (parseInt(totals['Employee pension contributions']) || 0) +
            (parseInt(totals['Union dues']) || 0)
        },
        housing: {
          rentOrMortgage: totals['Rent or mortgage'] || 0,
          propertyTaxes: totals['Property taxes'] || 0,
          propertyInsurance: totals['Property insurance'] || 0,
          condominiumFees: totals['Condominium fees'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          subtotal: 
            (parseInt(totals['Rent or mortgage']) || 0) +
            (parseInt(totals['Property taxes']) || 0) +
            (parseInt(totals['Property insurance']) || 0) +
            (parseInt(totals['Condominium fees']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0)
        },
        utilities: {
          water: totals['Water'] || 0,
          heat: totals['Heat'] || 0,
          electricity: totals['Electricity'] || 0,
          telephone: totals['Telephone'] || 0,
          cellPhone: totals['Cell Phone'] || 0,
          cable: totals['Cable'] || 0,
          internet: totals['Internet'] || 0,
          subtotal: 
            (parseInt(totals['Water']) || 0) +
            (parseInt(totals['Heat']) || 0) +
            (parseInt(totals['Electricity']) || 0) +
            (parseInt(totals['Telephone']) || 0) +
            (parseInt(totals['Cell Phone']) || 0) +
            (parseInt(totals['Cable']) || 0) +
            (parseInt(totals['Internet']) || 0)
          
        },
        householdExpenses: {
          groceries: totals['Groceries'] || 0,
          householdSupplies: totals['Household supplies'] || 0,
          mealsOutsideTheHome: totals['Meals outside the home'] || 0,
          petCare: totals['Pet care'] || 0,
          laundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
          subtotal: 
            (parseInt(totals['Groceries']) || 0) +
            (parseInt(totals['Household supplies']) || 0) +
            (parseInt(totals['Meals outside the home']) || 0) +
            (parseInt(totals['Pet care']) || 0) +
            (parseInt(totals['Laundry and Dry Cleaning']) || 0)
        },
        childcare: {
          daycare: totals['Daycare expenses'] || 0,
          babysitting: totals['Babysitting costs'] || 0,
          subtotal: 
            (parseInt(totals['Daycare expenses']) || 0) +
            (parseInt(totals['Babysitting costs']) || 0)
          
        },
        transportation: {
          publicTransit: totals['Public transit, taxis'] || 0,
          carPayments: totals['Car Loan or Lease Payments'] || 0,
          gasAndOil: totals['Gas and oil'] || 0,
          insurance: totals['Car insurance and licence'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          parking: totals['Parking'] || 0,
          subtotal: 
            (parseInt(totals['Public transit, taxis']) || 0) +
            (parseInt(totals['Car Loan or Lease Payments']) || 0) +
            (parseInt(totals['Gas and oil']) || 0) +
            (parseInt(totals['Car insurance and licence']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0) +
            (parseInt(totals['Parking']) || 0)

        },
        health: {
          insurance: totals['Health insurance premiums'] || 0,
          dental: totals['Dental expenses'] || 0,
          medicine: totals['Medicine and drugs'] || 0,
          eyecare: totals['Eye care'] || 0,
          subtotal: 
            (parseInt(totals['Health insurance premiums']) || 0) +
            (parseInt(totals['Dental expenses']) || 0) +
            (parseInt(totals['Medicine and drugs']) || 0) +
            (parseInt(totals['Eye care']) || 0)
        },
        personal: {
          clothing: totals['Clothing'] || 0,
          haircare: totals['Hair care and beauty'] || 0,
          alcohol: totals['Alcohol and tobacco'] || 0,
          education: totals['Education (specify)'] || 0,
          entertainment: totals['Entertainment/recreation (including children)'] || 0,
          gifts: totals['Gifts'] || 0,
          subtotal: 
            (parseInt(totals['Clothing']) || 0) +
            (parseInt(totals['Hair care and beauty']) || 0) +
            (parseInt(totals['Alcohol and tobacco']) || 0) +
            (parseInt(totals['Education (specify)']) || 0) +
            (parseInt(totals['Entertainment/recreation (including children)']) || 0) +
            (parseInt(totals['Gifts']) || 0)
        },
        other: {
          lifeInsurance: totals['Life Insurance premiums'] || 0,
          rrsp: totals['RRSP/RESP withdrawals'] || 0,
          vacations: totals['Vacations'] || 0,
          school: totals['School fees and supplies'] || 0,
          clothingForChildren: totals['Clothing for children'] || 0,
          childrenActivities: totals["Children's activities"] || 0,
          summerCamp: totals['Summer camp expenses'] || 0,
          debtPayments: totals['Debt payments'] || 0,
          supportPaidForOtherChildren: totals['Support paid for other children'] || 0,
          other: totals['Other expenses not shown above (specify)'] || 0,
          subtotal: 
            (parseInt(totals['Life Insurance premiums']) || 0) +
            (parseInt(totals['RRSP/RESP withdrawals']) || 0) +
            (parseInt(totals['Vacations']) || 0) +
            (parseInt(totals['School fees and supplies']) || 0) +
            (parseInt(totals['Clothing for children']) || 0) +
            (parseInt(totals["Children's activities"]) || 0) +
            (parseInt(totals['Summer camp expenses']) || 0) +
            (parseInt(totals['Debt payments']) || 0) +
            (parseInt(totals['Support paid for other children']) || 0) +
            (parseInt(totals['Other expenses not shown above (specify)']) || 0)
        },
        totalMonthlyExpenses: totalClientExpensesMonthlyTotal || 0,
        totalYearlyExpenses: totalClientExpensesYearly || 0

      },
    }


    return expenses
  }
  // formatNumberInThousands
  const opposingPartyExpensesDetails = () => {
    // Initialize an object to store the totals
    const totals = {}

    // Calculate totals for each type of income
    if (Array.isArray(opposingPartyExpenses)) {
    opposingPartyExpenses?.forEach(item => {
      if (!totals[item.type]) {
        totals[item.type] = 0
      }
      totals[item.type] += parseInt(item.monthlyAmount)
    })
  }else {}

    // Log the totals

    const sources = {
      // Automatic Deductions
      automaticDeductionsCPPContributions: totals['CPP contributions'] || 0,
      automaticDeductionsEIPremiums: totals['EI premiums'] || 0,
      automaticDeductionsIncomeTaxes: totals['Income taxes'] || 0,
      automaticDeductionsEmployeePensionContributions: totals['Employee pension contributions'] || 0,
      automaticDeductionsUnionDues: totals['Union dues'] || 0,
      // Housing
      housingRentOrMortgage: totals['Rent or mortgage'] || 0,
      housingPropertyTaxes: totals['Property taxes'] || 0,
      housingPropertyInsurance: totals['Property insurance'] || 0,
      housingCondominiumFees: totals['Condominium fees'] || 0,
      housingRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      //Utilities
      utilitiesWater: totals['Water'] || 0,
      utilitiesHeat: totals['Heat'] || 0,
      utilitiesElectricity: totals['Electricity'] || 0,
      utilitiesTelephone: totals['Telephone'] || 0,
      utilitiesCellPhone: totals['Cell Phone'] || 0,
      utilitiesCable: totals['Cable'] || 0,
      utilitiesInternet: totals['Internet'] || 0,
      // Household Expenses
      householdExpensesGroceries: totals['Groceries'] || 0,
      householdExpensesHouseholdSupplies: totals['Household supplies'] || 0,
      householdExpensesMealsOutsideTheHome: totals['Meals outside the home'] || 0,
      householdExpensesPetCare: totals['Pet care'] || 0,
      householdExpensesLaundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
      // Childcare Costs
      childcareCostsDaycareExpenses: totals['Daycare expenses'] || 0,
      childcareCostsBabysittingCosts: totals['Babysitting costs'] || 0,
      // Transportaion
      transportationPublicTransitTaxis: totals['Public transit, taxis'] || 0,
      transportationGasAndOil: totals['Gas and oil'] || 0,
      transportationCarInsuranceAndLicence: totals['Car insurance and licence'] || 0,
      transportationRepairsAndMaintenance: totals['Repairs and maintenance'] || 0,
      transportationParking: totals['Parking'] || 0,
      transportationCarLoanOrLeasePayments: totals['Car Loan or Lease Payments'] || 0,
      // Health
      healthHealthInsurancePremiums: totals['Health insurance premiums'] || 0,
      healthDentalExpenses: totals['Dental expenses'] || 0,
      healthMedicineAndDrugs: totals['Medicine and drugs'] || 0,
      healthEyeCare: totals['Eye care'] || 0,
      // Personal
      personalClothing: totals['Clothing'] || 0,
      personalHairCareAndBeauty: totals['Hair care and beauty'] || 0,
      personalAlcoholAndTobacco: totals['Alcohol and tobacco'] || 0,
      personalEducation: totals['Education (specify)'] || 0,
      personalEntertainmentAndRecreation: totals['Entertainment/recreation (including children)'] || 0,
      personalGifts: totals['Gifts'] || 0,
      // Other Expenses
      otherExpensesLifeInsurancePremiums: totals['Life Insurance premiums'] || 0,
      otherExpensesRRSPAndRESPWithdrawals: totals['RRSP/RESP withdrawals'] || 0,
      otherExpensesVacations: totals['Vacations'] || 0,
      otherExpensesSchoolFeesAndSupplies: totals['School fees and supplies'] || 0,
      otherExpensesClothingForChildren: totals['Clothing for children'] || 0,
      otherExpensesChildrensActivities: totals["Children's activities"] || 0,
      otherExpensesSummerCampExpenses: totals['Summer camp expenses'] || 0,
      otherExpensesDebtPayments: totals['Debt payments'] || 0,
      otherExpensesSupportPaidForOtherChildren: totals['Support paid for other children'] || 0,
      otherExpensesOtherExpensesNotShownAbove: totals['Other expenses not shown above (specify)'] || 0,

      totalMonthlyIncome: totalopposingPartyExpensesMonthlyTotal || 0, // Total monthly income (sum of all above incomes)
      totalAnnualIncome: totalopposingPartyExpensesYearly || 0 // Total annual income (multiply total monthly income by 12)
    }

    const expenses = {
      expenses: {
        automaticDeductions: {
          cppContributions: (totals['CPP contributions'] !== undefined ? totals['CPP contributions'].toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '') || 0,
          eiPremiums: totals['EI premiums'] || 0,
          incomeTaxes: totals['Income taxes'] || 0,
          employeePensionContributions: totals['Employee pension contributions'] || 0,
          unionDues: totals['Union dues'] || 0,
          subtotal: (parseInt(totals['CPP contributions']) || 0) +
            (parseInt(totals['EI premiums']) || 0) +
            (parseInt(totals['Income taxes']) || 0) +
            (parseInt(totals['Employee pension contributions']) || 0) +
            (parseInt(totals['Union dues']) || 0)
        },
        housing: {
          rentOrMortgage: totals['Rent or mortgage'] || 0,
          propertyTaxes: totals['Property taxes'] || 0,
          propertyInsurance: totals['Property insurance'] || 0,
          condominiumFees: totals['Condominium fees'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          subtotal: (parseInt(totals['Rent or mortgage']) || 0) +
            (parseInt(totals['Property taxes']) || 0) +
            (parseInt(totals['Property insurance']) || 0) +
            (parseInt(totals['Condominium fees']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0)
        },
        utilities: {
          water: totals['Water'] || 0,
          heat: totals['Heat'] || 0,
          electricity: totals['Electricity'] || 0,
          telephone: totals['Telephone'] || 0,
          cellPhone: totals['Cell Phone'] || 0,
          cable: totals['Cable'] || 0,
          internet: totals['Internet'] || 0,
          subtotal: (parseInt(totals['Water']) || 0) +
            (parseInt(totals['Heat']) || 0) +
            (parseInt(totals['Electricity']) || 0) +
            (parseInt(totals['Telephone']) || 0) +
            (parseInt(totals['Cell Phone']) || 0) +
            (parseInt(totals['Cable']) || 0) +
            (parseInt(totals['Internet']) || 0)
        },
        householdExpenses: {
          groceries: totals['Groceries'] || 0,
          householdSupplies: totals['Household supplies'] || 0,
          mealsOutsideTheHome: totals['Meals outside the home'] || 0,
          petCare: totals['Pet care'] || 0,
          laundryAndDryCleaning: totals['Laundry and Dry Cleaning'] || 0,
          subtotal: (parseInt(totals['Groceries']) || 0) +
            (parseInt(totals['Household supplies']) || 0) +
            (parseInt(totals['Meals outside the home']) || 0) +
            (parseInt(totals['Pet care']) || 0) +
            (parseInt(totals['Laundry and Dry Cleaning']) || 0)
        },
        childcare: {
          daycare: totals['Daycare expenses'] || 0,
          babysitting: totals['Babysitting costs'] || 0,
          subtotal: (parseInt(totals['Daycare expenses']) || 0) +
            (parseInt(totals['Babysitting costs']) || 0)
        },
        transportation: {
          publicTransit: totals['Public transit, taxis'] || 0,
          carPayments: totals['Car Loan or Lease Payments'] || 0,
          gasAndOil: totals['Gas and oil'] || 0,
          insurance: totals['Car insurance and licence'] || 0,
          repairsAndMaintenance: totals['Repairs and maintenance'] || 0,
          parking: totals['Parking'] || 0,
          subtotal: (parseInt(totals['Public transit, taxis']) || 0) +
            (parseInt(totals['Car Loan or Lease Payments']) || 0) +
            (parseInt(totals['Gas and oil']) || 0) +
            (parseInt(totals['Car insurance and licence']) || 0) +
            (parseInt(totals['Repairs and maintenance']) || 0) +
            (parseInt(totals['Parking']) || 0)
        },
        health: {
          insurance: totals['Health insurance premiums'] || 0,
          dental: totals['Dental expenses'] || 0,
          medicine: totals['Medicine and drugs'] || 0,
          eyecare: totals['Eye care'] || 0,
          subtotal: (parseInt(totals['Health insurance premiums']) || 0) +
            (parseInt(totals['Dental expenses']) || 0) +
            (parseInt(totals['Medicine and drugs']) || 0) +
            (parseInt(totals['Eye care']) || 0)
        },
        personal: {
          clothing: totals['Clothing'] || 0,
          haircare: totals['Hair care and beauty'] || 0,
          alcohol: totals['Alcohol and tobacco'] || 0,
          education: totals['Education (specify)'] || 0,
          entertainment: totals['Entertainment/recreation (including children)'] || 0,
          gifts: totals['Gifts'] || 0,
          subtotal: (parseInt(totals['Clothing']) || 0) +
            (parseInt(totals['Hair care and beauty']) || 0) +
            (parseInt(totals['Alcohol and tobacco']) || 0) +
            (parseInt(totals['Education (specify)']) || 0) +
            (parseInt(totals['Entertainment/recreation (including children)']) || 0) +
            (parseInt(totals['Gifts']) || 0)
        },
        other: {
          lifeInsurance: totals['Life Insurance premiums'] || 0,
          rrsp: totals['RRSP/RESP withdrawals'] || 0,
          vacations: totals['Vacations'] || 0,
          school: totals['School fees and supplies'] || 0,
          clothingForChildren: totals['Clothing for children'] || 0,
          childrenActivities: totals["Children's activities"] || 0,
          summerCamp: totals['Summer camp expenses'] || 0,
          debtPayments: totals['Debt payments'] || 0,
          supportPaidForOtherChildren: totals['Support paid for other children'] || 0,
          other: totals['Other expenses not shown above (specify)'] || 0,
          subtotal: (parseInt(totals['Life Insurance premiums']) || 0) +
            (parseInt(totals['RRSP/RESP withdrawals']) || 0) +
            (parseInt(totals['Vacations']) || 0) +
            (parseInt(totals['School fees and supplies']) || 0) +
            (parseInt(totals['Clothing for children']) || 0) +
            (parseInt(totals["Children's activities"]) || 0) +
            (parseInt(totals['Summer camp expenses']) || 0) +
            (parseInt(totals['Debt payments']) || 0) +
            (parseInt(totals['Support paid for other children']) || 0) +
            (parseInt(totals['Other expenses not shown above (specify)']) || 0)
        },
        totalMonthlyExpenses: totalClientExpensesMonthlyTotal || 0,
        totalYearlyExpenses: totalClientExpensesYearly || 0
      },
    }


    // // Calculate total monthly income
    // sources.totalMonthlyIncome =
    //   Object.values(totals).reduce((total, amount) => total + amount, 0) || 0

    // // Calculate total annual income
    // sources.totalAnnualIncome = sources.totalMonthlyIncome
    //   ? sources.totalMonthlyIncome * 12
    //   : ''

    return expenses
  }

  const ExpenseDetailsClient = ClientExpensesDetails();
  const ExpenseDetailsOpposingParty = opposingPartyExpensesDetails();

  return {
    ExpenseDetailsClient,
    ExpenseDetailsOpposingParty,
    clientSpecialExpenses,
    opposingPartySpecialExpenses
  }

}
