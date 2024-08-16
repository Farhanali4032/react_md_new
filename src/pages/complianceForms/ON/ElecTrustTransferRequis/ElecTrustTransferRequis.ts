export interface StateForFormElectronicTrustRequis {
    requisition: string,
    amountOfFunds: string,
    Re: string,
    client: string,
    fileNo: string,
    reasonForPayment: string,
    trustAccountToBeDebited: string,
    nameOfFinancialInst: string,
    accountNumber: string,
    nameOfRecipient: string,
    accountToBeCredited: string,
    nameOfFinancialInst2: string,
    branchNameAndAddress: string,
    accountNumber2: string,
    personRequisElecTrustTransfer: string,
    date: string,
    signature: string,
}

export interface StateForForm9A extends StateForFormElectronicTrustRequis {
    additionalTransactionParticulars: string,
    personEnteringDetailsOfTransfer: string,
    namePreparer: string,
    personAuthorizingTransferAtComputerTerminal: string,
    nameReviewer: string,
}

export interface StateForClosingFunds extends StateForFormElectronicTrustRequis {
    personCarryingOutElectronicTrustTransfer: string,
    nameReviewerAdmin: string,
}


