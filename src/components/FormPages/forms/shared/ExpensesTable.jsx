import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

const ExpensesTable = ({ formData, changeAmount, filler }) => {

    const expensesArray = [
        {
            automaticDeductions: [
                { id: 'cppContributions', name: 'cppContributions', value: formData?.expenses?.[filler].automaticDeductions.cppContributions, label: 'CPP Contributions', update: `expenses.${filler}.automaticDeductions.cppContributions`},
                { id: 'eiPremiums', name: 'eiPremiums', value: formData?.expenses?.[filler].automaticDeductions.eiPremiums, label: 'EI Premiums', update: `expenses.${filler}.automaticDeductions.eiPremiums`},
                { id: 'incomeTaxes', name: 'incomeTaxes', value: formData?.expenses?.[filler].automaticDeductions.incomeTaxes, label: 'Income Taxes', update: `expenses.${filler}.automaticDeductions.incomeTaxes`},
                { id: 'employeePensionContributions', name: 'employeePensionContributions', value: formData?.expenses?.[filler].automaticDeductions.employeePensionContributions, label: 'Employee Pension Contributions', update: `expenses.${filler}.automaticDeductions.employeePensionContributions`},
                { id: 'unionDues', name: 'unionDues', value: formData?.expenses?.[filler].automaticDeductions.unionDues, label: 'Union Dues', update: `expenses.${filler}.automaticDeductions.unionDues`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].automaticDeductions.subtotal, label: 'Subtotal', update: `expenses.${filler}.automaticDeductions.subtotal`}
            ]
        },
        {
            housing: [
                { id: 'rentOrMortgage', name: 'rentOrMortgage', value: formData?.expenses?.[filler].housing.rentOrMortgage, label: 'Rent or Mortgage', update: `expenses.${filler}.housing.rentOrMortgage`},
                { id: 'propertyTaxes', name: 'propertyTaxes', value: formData?.expenses?.[filler].housing.propertyTaxes, label: 'Property Taxes', update: `expenses.${filler}.housing.propertyTaxes`},
                { id: 'propertyInsurance', name: 'propertyInsurance', value: formData?.expenses?.[filler].housing.propertyInsurance, label: 'Property Insurance', update: `expenses.${filler}.housing.propertyInsurance`},
                { id: 'condominiumFees', name: 'condominiumFees', value: formData?.expenses?.[filler].housing.condominiumFees, label: 'Condominium Fees', update: `expenses.${filler}.housing.condominiumFees`},
                { id: 'repairsAndMaintenance', name: 'repairsAndMaintenance', value: formData?.expenses?.[filler].housing.repairsAndMaintenance, label: 'Repairs and Maintenance', update: `expenses.${filler}.housing.repairsAndMaintenance`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].housing.subtotal, label: 'Subtotal', update: `expenses.${filler}.housing.subtotal`}
            ]
        },
        {
            utilities: [
                { id: 'water', name: 'water', value: formData?.expenses?.[filler].utilities.water, label: 'Water', update: `expenses.${filler}.utilities.water`},
                { id: 'heat', name: 'heat', value: formData?.expenses?.[filler].utilities.heat, label: 'Heat', update: `expenses.${filler}.utilities.heat`},
                { id: 'electricity', name: 'electricity', value: formData?.expenses?.[filler].utilities.electricity, label: 'Electricity', update: `expenses.${filler}.utilities.electricity`},
                { id: 'telephone', name: 'telephone', value: formData?.expenses?.[filler].utilities.telephone, label: 'Telephone', update: `expenses.${filler}.utilities.telephone`},
                { id: 'cellPhone', name: 'cellPhone', value: formData?.expenses?.[filler].utilities.cellPhone, label: 'Cell Phone', update: `expenses.${filler}.utilities.cellPhone`},
                { id: 'cable', name: 'cable', value: formData?.expenses?.[filler].utilities.cable, label: 'Cable', update: `expenses.${filler}.utilities.cable`},
                { id: 'internet', name: 'internet', value: formData?.expenses?.[filler].utilities.internet, label: 'Internet', update: `expenses.${filler}.utilities.internet`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].utilities.subtotal, label: 'Subtotal', update: `expenses.${filler}.utilities.subtotal`}
            ]
        },
        {
            householdExpenses: [
                { id: 'groceries', name: 'groceries', value: formData?.expenses?.[filler].householdExpenses.groceries, label: 'Groceries', update: `expenses.${filler}.householdExpenses.groceries`},
                { id: 'householdSupplies', name: 'householdSupplies', value: formData?.expenses?.[filler].householdExpenses.householdSupplies, label: 'Household Supplies', update: `expenses.${filler}.householdExpenses.householdSupplies`},
                { id: 'mealsOutsideTheHome', name: 'mealsOutsideTheHome', value: formData?.expenses?.[filler].householdExpenses.mealsOutsideTheHome, label: 'Meals Outside The Home', update: `expenses.${filler}.householdExpenses.mealsOutsideTheHome`},
                { id: 'petCare', name: 'petCare', value: formData?.expenses?.[filler].householdExpenses.petCare, label: 'Pet Care', update: `expenses.${filler}.householdExpenses.petCare`},
                { id: 'laundryAndDryCleaning', name: 'laundryAndDryCleaning', value: formData?.expenses?.[filler].householdExpenses.laundryAndDryCleaning, label: 'Laundry and Dry Cleaning', update: `expenses.${filler}.householdExpenses.laundryAndDryCleaning`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].householdExpenses.subtotal, label: 'Subtotal', update: `expenses.${filler}.householdExpenses.subtotal`}
            ]
        },
        {
            childcare: [
                { id: 'daycare', name: 'daycare', value: formData?.expenses?.[filler].childcare.daycare, label: 'Daycare', update: `expenses.${filler}.childcare.daycare`},
                { id: 'babysitting', name: 'babysitting', value: formData?.expenses?.[filler].childcare.babysitting, label: 'Babysitting', update: `expenses.${filler}.childcare.babysitting`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].childcare.subtotal, label: 'Subtotal', update: `expenses.${filler}.childcare.subtotal`}
            ]
        },
        {
            transportation: [
                { id: 'publicTransit', name: 'publicTransit', value: formData?.expenses?.[filler].transportation.publicTransit, label: 'Public Transit', update: `expenses.${filler}.transportation.publicTransit`},
                { id: 'carPayments', name: 'carPayments', value: formData?.expenses?.[filler].transportation.carPayments, label: 'Car Payments', update: `expenses.${filler}.transportation.carPayments`},
                { id: 'gasAndOil', name: 'gasAndOil', value: formData?.expenses?.[filler].transportation.gasAndOil, label: 'Gas and Oil', update: `expenses.${filler}.transportation.gasAndOil`},
                { id: 'insurance', name: 'insurance', value: formData?.expenses?.[filler].transportation.insurance, label: 'Insurance', update: `expenses.${filler}.transportation.insurance`},
                { id: 'repairsAndMaintenance', name: 'repairsAndMaintenance', value: formData?.expenses?.[filler].transportation.repairsAndMaintenance, label: 'Repairs and Maintenance', update: `expenses.${filler}.transportation.repairsAndMaintenance`},
                { id: 'parking', name: 'parking', value: formData?.expenses?.[filler].transportation.parking, label: 'Parking', update: `expenses.${filler}.transportation.parking`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].transportation.subtotal, label: 'Subtotal', update: `expenses.${filler}.transportation.subtotal`}
            ]
        },
        {
            health: [
                { id: 'insurance', name: 'insurance', value: formData?.expenses?.[filler].health.insurance, label: 'Insurance', update: `expenses.${filler}.health.insurance`},
                { id: 'dental', name: 'dental', value: formData?.expenses?.[filler].health.dental, label: 'Dental', update: `expenses.${filler}.health.dental`},
                { id: 'medicine', name: 'medicine', value: formData?.expenses?.[filler].health.medicine, label: 'Medicine', update: `expenses.${filler}.health.medicine`},
                { id: 'eyecare', name: 'eyecare', value: formData?.expenses?.[filler].health.eyecare, label: 'Eyecare', update: `expenses.${filler}.health.eyecare`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].health.subtotal, label: 'Subtotal', update: `expenses.${filler}.health.subtotal`}
            ]
        },
        {
            personal: [
                { id: 'clothing', name: 'clothing', value: formData?.expenses?.[filler].personal.clothing, label: 'Clothing', update: `expenses.${filler}.personal.clothing`},
                { id: 'haircare', name: 'haircare', value: formData?.expenses?.[filler].personal.haircare, label: 'Haircare', update: `expenses.${filler}.personal.haircare`},
                { id: 'alcohol', name: 'alcohol', value: formData?.expenses?.[filler].personal.alcohol, label: 'Alcohol', update: `expenses.${filler}.personal.alcohol`},
                { id: 'education', name: 'education', value: formData?.expenses?.[filler].personal.education, label: 'Education', update: `expenses.${filler}.personal.education`},
                { id: 'entertainment', name: 'entertainment', value: formData?.expenses?.[filler].personal.entertainment, label: 'Entertainment', update: `expenses.${filler}.personal.entertainment`},
                { id: 'gifts', name: 'gifts', value: formData?.expenses?.[filler].personal.gifts, label: 'Gifts', update: `expenses.${filler}.personal.gifts`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].personal.subtotal, label: 'Subtotal', update: `expenses.${filler}.personal.subtotal`}
            ]
        },
        {
            otherExpenses: [
                { id: 'lifeInsurance', name: 'lifeInsurance', value: formData?.expenses?.[filler].other.lifeInsurance, label: 'Life Insurance', update: `expenses.${filler}.other.lifeInsurance`},
                { id: 'rrsp', name: 'rrsp', value: formData?.expenses?.[filler].other.rrsp, label: 'RRSP', update: `expenses.${filler}.other.rrsp`},
                { id: 'vacations', name: 'vacations', value: formData?.expenses?.[filler].other.vacations, label: 'Vacations', update: `expenses.${filler}.other.vacations`},
                { id: 'school', name: 'school', value: formData?.expenses?.[filler].other.school, label: 'School', update: `expenses.${filler}.other.school`},
                { id: 'clothingForChildren', name: 'clothingForChildren', value: formData?.expenses?.[filler].other.clothingForChildren, label: 'Clothing For Children', update: `expenses.${filler}.other.clothingForChildren`},
                { id: 'childrenActivities', name: 'childrenActivities', value: formData?.expenses?.[filler].other.childrenActivities, label: "Children's activities", update: `expenses.${filler}.other.childrenActivities`},
                { id: 'summerCamp', name: 'summerCamp', value: formData?.expenses?.[filler].other.summerCamp, label: 'Summer camp expenses', update: `expenses.${filler}.other.summerCamp`},
                { id: 'debtPayments', name: 'debtPayments', value: formData?.expenses?.[filler].other.debtPayments, label: 'Debt payments', update: `expenses.${filler}.other.debtPayments`},
                { id: 'supportPaidForOtherChildren', name: 'supportPaidForOtherChildren', value: formData?.expenses?.[filler].other.supportPaidForOtherChildren, label: 'Support paid for other children', update: `expenses.${filler}.other.supportPaidForOtherChildren`},
                { id: 'other', name: 'other', value: formData?.expenses?.[filler].other.other, label: 'Other expenses not shown above (specify)', update: `expenses.${filler}.other.other`},
                { id: 'subtotal', name: 'subtotal', value: formData?.expenses?.[filler].other.subtotal, label: 'Subtotal', update: `expenses.${filler}.other.subtotal`}
            ]
        },
        {
            grandTotal: [
                { id: 'grandTotal', name: 'grandTotal', value: formData?.expenses?.[filler].grandTotal, label: 'Grand Total', update: `expenses.${filler}.grandTotal`}
            ]
        }
    ];

    const calculateSubtotal = (items) => {
        return items.reduce((sum, item) => {
            if (item.id !== 'subtotal') {
                const cleanedValue = item.value !== undefined ? item.value.toString().replace(/,/g, '') : ''; // Remove commas
                const numericValue = parseFloat(cleanedValue) || 0; // Convert to number
                return sum + numericValue;
            }
            return sum;
        }, 0);
    };

    const calculateAllSubtotals = (expensesArray) => {
        let total = 0;

        expensesArray.forEach((category) => {
            const categoryName = Object.keys(category)[0];
            const categoryItems = category[categoryName];

            const subtotal = categoryItems.reduce((sum, item) => {
                if (item.id !== 'subtotal') {
                    const cleanedValue = item.value !== undefined ? item.value.toString().replace(/,/g, '') : ''; // Remove commas
                    const numericValue = parseFloat(cleanedValue) || 0; // Convert to number
                    return sum + numericValue;
                }
                return sum;
            }, 0);

            total += subtotal;
        });

        return total;
    };

    const totalMonthly = calculateAllSubtotals(expensesArray);
    const totalYearly = totalMonthly * 12;

    function capitalizeFirstLetter(name) {
        return name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
    }

    return (
        <>
            <div className='row'>
                <div className='col-6'>
                    <table className='pb-40px form-131-expenses expense-table'>
                        <thead>
                            <tr>
                                <th className='text-center col-lg-8'>Expense</th>
                                <th className='text-center col-lg-4'>Monthly Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expensesArray.slice(0, 5).map((category, categoryIndex) => {
                                const categoryName = Object.keys(category)[0];
                                const categoryItems = category[categoryName];
                                const subtotal = calculateSubtotal(categoryItems);

                                return (
                                    <>
                                        <tr key={`${categoryName}-heading`}>
                                            <th className='sub-table-heading-3' colSpan={2}>
                                                {capitalizeFirstLetter(categoryName)}
                                            </th>
                                        </tr>
                                        {categoryItems.filter(item => item.id !== 'subtotal').map((item, itemIndex) => (
                                            <tr key={item.id}>
                                                <td>{item.label}</td>
                                                <td>
                                                    <CurrencyFormat
                                                        className='form-control'
                                                        value={item.value}
                                                        displayType={'number'}
                                                        thousandSeparator={true}
                                                        prefix={'$'}
                                                        onValueChange={(values) => {
                                                            const { value } = values;
                                                            // handleChange(categoryIndex, itemIndex, value);
                                                        }}
                                                        onChange={changeAmount(`${item.update}`)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        <tr key={`${categoryName}-subtotal`} className='subtotal-border'>
                                            <td className='fw-bold'>SUBTOTAL</td>
                                            <td>
                                                <CurrencyFormat
                                                    className='form-control'
                                                    disabled={true}
                                                    value={subtotal}
                                                    thousandSeparator={true}

                                                    prefix={'$'}
                                                /></td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='col-6'>
                    <table className='pb-40px form-131-expenses expense-table'>
                        <thead>
                            <tr>
                                <th className='text-center col-lg-8'>Expense</th>
                                <th className='text-center col-lg-4'>Monthly Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expensesArray.slice(5, 9).map((category, categoryIndex) => {
                                const categoryName = Object.keys(category)[0];
                                const categoryItems = category[categoryName];
                                const subtotal = calculateSubtotal(categoryItems);

                                return (
                                    <>
                                        <tr key={`${categoryName}-heading`}>
                                            <th className='sub-table-heading-3' colSpan={2}>
                                                {capitalizeFirstLetter(categoryName)}
                                            </th>
                                        </tr>
                                        {categoryItems.filter(item => item.id !== 'subtotal').map((item, itemIndex) => (
                                            <tr key={item.id}>
                                                <td>{item.label}</td>
                                                <td>
                                                    <CurrencyFormat
                                                        className='form-control'
                                                        value={item.value}
                                                        displayType={'number'}
                                                        thousandSeparator={true}
                                                        prefix={'$'}
                                                        onValueChange={(values) => {
                                                            const { value } = values;
                                                            // handleChange(categoryIndex, itemIndex, value);
                                                        }}
                                                        onChange={changeAmount(`${item.update}`)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        <tr key={`${categoryName}-subtotal`} className='subtotal-border'>
                                            <td className='fw-bold'>SUBTOTAL</td>
                                            <td>
                                                <CurrencyFormat
                                                    className='form-control'
                                                    disabled={true}
                                                    value={subtotal}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Totals of Expenses */}
            <div className='row justify-content-end'>
                {/* Right Tables */}
                <div className='col-8'>
                    <table className='pb-40px form-131-expenses expense-table'>
                        <tbody>
                            <tr>
                                <td className='fw-bold'>
                                    Total Amount of Monthly Expenses
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        disabled={true}
                                        value={totalMonthly}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='fw-bold'>
                                    Total Amount of Yearly Expenses
                                </td>
                                <td>
                                    <CurrencyFormat
                                        className='form-control'
                                        disabled={true}
                                        value={totalYearly}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                    {/* <input
                                        className='form-control'
                                        value={formData?.expenses?.[filler].totalYearlyExpenses}
                                        onChange={changeAmount('expenses.totalYearlyExpenses')}
                                    /> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ExpensesTable;
