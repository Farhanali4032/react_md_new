import React, { useEffect, useState } from 'react'
import useSingleMatterData from '../../../utils/Apis/matters/CustomHook/DocumentViewData';
import { form13A } from '../../../utils/Apis/matters/CustomHook/PDFData';
import FormDetails from '../Components/FormDetails';

const CertificateOfFinancialDisclosure13A = ({targetRef, matterId,onFormDataSave }) => {

    const [dataCollected, setDataCollected] = useState(false);
    const [loading, setLoading] = useState(true);
    const pdfData = form13A(matterId)
  
    useEffect(() => {
      if (pdfData) {
        setDataCollected(true);
        setLoading(false)
        setFormData(pdfData)
      }
      if(!pdfData){
        setDataCollected(false);
        setLoading(true)
      }
    }, [])

    // const {
    //     selectCourt,
    //     selectBackground,
    //     selectRelationship,
    //   } = useSingleMatterData(matterId);
    //     
    
    //     useEffect(() => {

    //           const courtInfo = {
    //             courtName: selectCourt.body[0].court_name,
    //             courtFileNumber: selectCourt.body[0].file_number,
    //             courtOfficeAddress: selectCourt.body[0].address
    //           }
            
    //             const separatedData = selectBackground?.body.reduce((acc, cur) => {
    //                 if (cur.role === 'Client') {
    //                 acc.client = cur
    //                 } else if (cur.role === 'Opposing Party') {
    //                 acc.opposingParty = cur
    //                 }
    //                 return acc
    //             }, {})
    //             

    //             const applicant = {
    //                 applicant: {
    //                   fullLegalName: separatedData.client.name,
    //                   address: separatedData.client.address,
    //                   phoneAndFax: separatedData.client.phone,
    //                   email: separatedData.client.email
    //                 }
    //               }
            
    //               const applicantLawyer = {
    //                 applicantsLawyer: {
    //                   fullLegalName: separatedData.client.lawyerName,
    //                   address: separatedData.client.lawyerAddress,
    //                   phoneAndFax: separatedData.client.lawyerPhone,
    //                   email: separatedData.client.lawyerEmail
    //                 }
    //               }
            
    //               const respondent = {
    //                 respondent: {
    //                   fullLegalName: separatedData.opposingParty.name,
    //                   address: separatedData.opposingParty.address,
    //                   phoneAndFax: separatedData.opposingParty.phone,
    //                   email: separatedData.opposingParty.email
    //                 }
    //               }
            
    //               const respondentsLawyer = {
    //                 respondentsLawyer: {
    //                   fullLegalName: separatedData.client.lawyerName,
    //                   address: separatedData.client.lawyerAddress,
    //                   phoneAndFax: separatedData.client.lawyerPhone,
    //                   email: separatedData.client.lawyerEmail
    //                 }
    //               }

    //               const decleration = {
    //                 myName: separatedData.client.name,
    //                 valuationDate: '',
    //               }
            
    //         setFormData(prevState => ({
    //             ...prevState,
    //             ...courtInfo,
    //             ...applicant,
    //             ...applicantLawyer,
    //             ...respondent,
    //             ...respondentsLawyer,
    //             ...decleration
    //           }))
    //       }, [selectCourt,selectBackground ])


    const [formData, setFormData] = useState({
        courtName: '',
        courtFileNumber: '',
        courtOfficeAddress: '',

        applicant: {
            fullLegalName: '',
            address: '',
            phoneAndFax: '',
            email: '',
        },
        applicantsLawyer: {
            fullLegalName: '',
            address: '',
            phoneAndFax: '',
            email: '',
        },
        respondent: {
            fullLegalName: '',
            address: '',
            phoneAndFax: '',
            email: '',
        },
        respondentsLawyer: {
            fullLegalName: '',
            address: '',
            phoneAndFax: '',
            email: '',
        },

        filledBy: 'respondent',

        // part A
        sources: {
            taxReturns: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            assessment: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            employment: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            selfEmployment: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            partnership: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            corporation: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            trust: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            insurance: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            pensions: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            spousalSupport: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            rebates: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            investments: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            rental: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            other: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
        },

        // part B
        specialExpenses: {
            document1: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document2: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document3: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document4: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document5: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
        },

        // part C
        claim: {
            realEstate: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            savings: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            pensions: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            insurance: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            sole: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            partnership: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            corporation: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            trust: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            other: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
            liabilities: {
                document1: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document2: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document3: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document4: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
                document5: {
                    number: '',
                    description: '',
                    date: '',
                    dateProvided: '',
                },
            },
        },
        assets: {
            document1: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document2: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document3: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document4: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document5: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
        },
        liabilities: {
            document1: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document2: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document3: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document4: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document5: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
        },
        excluded: {
            document1: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document2: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document3: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document4: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
            document5: {
                number: '',
                description: '',
                date: '',
                dateProvided: '',
            },
        },

        // Acknowledgement
        acknowledgement: {
            city: '',
            date: '',
            signature: '',
        },
    });
    
    useEffect(() => {
        onFormDataSave({
          form_id: 'FORM_13_A',
          data: formData,
        })
      }, [formData])

    function fillFormData(key, defaultVal = null) {
        return (e) => {
            const updatedFormData = { ...formData };

            const keys = key.split('.');
            const value = e.target.value;

            let nestedObj = updatedFormData;
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                if (i === keys.length - 1) {
                    nestedObj[k] = defaultVal ? defaultVal : value;
                } else {
                    nestedObj[k] = { ...nestedObj[k] };
                    nestedObj = nestedObj[k];
                }
            }

            setFormData(updatedFormData);

        };
    }

    function changeFormCheck(key) {
        return (e) => {
            const updatedFormData = { ...formData };
            const value = e.target.checked;

            const keys = key.split('.');

            let nestedObj = updatedFormData;
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                if (i === keys.length - 1) {
                    nestedObj[k] = value;
                } else {
                    nestedObj[k] = { ...nestedObj[k] };
                    nestedObj = nestedObj[k];
                }
            }

            setFormData(updatedFormData);

        };
    }

    return (
        <div className="pdf-form pdf-form-12b" ref={targetRef}>
            {/* Form Name */}
            <div className="row text-center mb-4">
                <div className="col-12">
                    <div className="fw-bold fst-italic">
                        ONTARIO
                    </div>
                </div>
            </div>

            {/* Form Details */}
                <FormDetails
                formTitle={'Form 13.A - Certificate of Financial Disclosure'} 
                courtName={formData?.courtName} 
                courtFileNumber={formData?.courtFileNumber} 
                courtOfficeAddress={formData?.courtOfficeAddress} 
                applicationType={formData?.applicationType} 
                selectOptions={false}
                />
            {/* <div className="row">
                <div className="col-9">
                    <div className="row justify-content-end">
                        <div className="col-11">
                            <div className="form-group align-items-center">
                                <input type="text" className="form-control" id="at" name="at" value={formData.courtName}
                                       onChange={fillFormData('courtName')}/>
                                <div className="fst-italic">(Name of Court)</div>
                            </div>
                        </div>
                    </div>
                    <div className="row  justify-content-end">
                        <div className="col-1 fw-bold mt-2" style={{paddingLeft: '40px'}}>at</div>
                        <div className="col-11">
                            <div className="form-group align-items-center">
                                <input type="text" className="form-control" id="at" name="at"
                                       value={formData.courtOfficeAddress}
                                       onChange={fillFormData('courtOfficeAddress')}/>
                                <div className="fst-italic">Court Office Address</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group" style={{marginTop: '-25px'}}>
                                <span className="text-nowrap">Court File Number</span>
                                <input type="text" className="form-control" id="at" name="at"
                                       value={formData.courtFileNumber}
                                       onChange={fillFormData('courtFileNumber')}/>
                            </div>
                            <div className="fw-bolder text-end" style={{marginTop: '-15px'}}>Form 13A: Certificate of Financial Disclosure
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Applicants */}
            <div className="row pb-20px pl-40px">
                <div className="col-6">
                    <div className="fw-bolder">Applicant(s)</div>
                    <div className="data-group inputs">
                        <div className="data-input">
                            <div className="label">Full legal name:</div>
                            <input type="text" className="form-control" value={formData.applicant.fullLegalName}
                                   onChange={fillFormData('applicant.fullLegalName')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Address:</div>
                            <input type="text" className="form-control" value={formData.applicant.address}
                                   onChange={fillFormData('applicant.address')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Phone & fax:</div>
                            <input type="text" className="form-control" value={formData.applicant.phoneAndFax}
                                   onChange={fillFormData('applicant.phoneAndFax')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Email:</div>
                            <input type="text" className="form-control" value={formData.applicant.email}
                                   onChange={fillFormData('applicant.email')} />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="fw-bolder">Applicant(s) Lawyer</div>
                    <div className="data-group inputs">
                        <div className="data-input">
                            <div className="label">Full legal name:</div>
                            <input type="text" className="form-control" value={formData.applicantsLawyer.fullLegalName}
                                   onChange={fillFormData('applicantsLawyer.fullLegalName')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Address:</div>
                            <input type="text" className="form-control" value={formData.applicantsLawyer.address}
                                   onChange={fillFormData('applicantsLawyer.address')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Phone & fax:</div>
                            <input type="text" className="form-control" value={formData.applicantsLawyer.phoneAndFax}
                                   onChange={fillFormData('applicantsLawyer.phoneAndFax')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Email:</div>
                            <input type="text" className="form-control" value={formData.applicantsLawyer.email}
                                   onChange={fillFormData('applicantsLawyer.email')} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Respondents */}
            <div className="row pb-20px pl-40px">
                <div className="col-6">
                    <div className="fw-bolder">Respondent(s)</div>
                    <div className="data-group inputs">
                        <div className="data-input">
                            <div className="label">Full legal name:</div>
                            <input type="text" className="form-control" value={formData.respondent.fullLegalName}
                                   onChange={fillFormData('respondent.fullLegalName')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Address:</div>
                            <input type="text" className="form-control" value={formData.respondent.address}
                                   onChange={fillFormData('respondent.address')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Phone & fax:</div>
                            <input type="text" className="form-control" value={formData.respondent.phoneAndFax}
                                   onChange={fillFormData('respondent.phoneAndFax')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Email:</div>
                            <input type="text" className="form-control" value={formData.respondent.email}
                                   onChange={fillFormData('respondent.email')} />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="fw-bolder">Respondent(s) Lawyer</div>
                    <div className="data-group inputs">
                        <div className="data-input">
                            <div className="label">Full legal name:</div>
                            <input type="text" className="form-control" value={formData.respondentsLawyer.fullLegalName}
                                   onChange={fillFormData('respondentsLawyer.fullLegalName')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Address:</div>
                            <input type="text" className="form-control" value={formData.respondentsLawyer.address}
                                   onChange={fillFormData('respondentsLawyer.address')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Phone & fax:</div>
                            <input type="text" className="form-control" value={formData.respondentsLawyer.phoneAndFax}
                                   onChange={fillFormData('respondentsLawyer.phoneAndFax')} />
                        </div>
                        <div className="data-input">
                            <div className="label">Email:</div>
                            <input type="text" className="form-control" value={formData.respondentsLawyer.email}
                                   onChange={fillFormData('respondentsLawyer.email')} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filled By */}
            <div className="row pb-20px pl-40px">
                <div className="fw-bolder">This form is filled by:</div>
                <div className="d-flex flex-row gap-4 pb-10px">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="filledBy" value="applicant" id="applicant"
                               checked={formData.filledBy === 'applicant'}
                               onChange={fillFormData('filledBy')} />
                        <label className="form-check-label" htmlFor="applicant">
                            Applicant
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="filledBy" value="respondent" id="respondent"
                               checked={formData.filledBy === 'respondent'}
                               onChange={fillFormData('filledBy')}/>
                        <label className="form-check-label" htmlFor="respondent">
                            Respondent
                        </label>
                    </div>
                </div>
                {/* Separator */}
                <div className="row pb-10px ml-10px border-top border-2 border-dark" />
            </div>


            {/* To The Parties */}
            <div className="row pb-10px pl-40px">
                <p className="sub-heading">TO THE PARTIES</p>
                <p className="paragraph">
                    You must provide complete financial disclosure to the other parties in your case. A list of the
                    documents you must provide to the other party is set out in Rule 13 of the Family Law Rules. You
                    must list in this form all of the documents that you are providing to the other party in support of
                    the information set out in your financial statement and update it each time additional documents are
                    provided to the other party.
                </p>
                <p className="paragraph">
                    Once you have completed this form,
                </p>
                <div className="paragraph">
                    <ul>
                        <li>
                            <p className="paragraph">
                                if your case includes support with or without special expenses but does not include a
                                claim under Part I of the Family Law Act (Family Property), you must:
                            </p>
                            <ul>
                                <li>collect all required documentation.</li>
                                <li>prepare this certificate.</li>
                                <li>serve this certificate with attached documentation on the other party with your
                                    completed Financial Statement.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="paragraph">
                                if your case includes a claim under Part I of the Family Law Act (Family Property) with
                                or without a claim for support, you must:
                            </p>
                            <ul>
                                <li>collect all required documentation.</li>
                                <li>prepare this certificate.</li>
                                <li>serve this certificate with attached documentation on the other party within 30 days
                                    of the day that your Financial Statement was due to be served.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <p className="paragraph">
                    If all of your documents are not available within these timeframes, when the additional documents
                    are provided to the other party, you should also update this certificate and provide it to the other
                    party.
                </p>
                <p className="paragraph">
                    If you do not provide financial disclosure as required, a court may make an order against you.
                </p>
                <p className="paragraph">
                    You must file a copy of your most up to date certificate with the court. The documentation is not
                    filed with the court. If you are the applicant or moving party in your case, you must file this
                    certificate seven days before the case conference. If you are the respondent, you must serve it four
                    days before the case conference.
                </p>
                <p className="paragraph">
                    If you have served any additional or updated financial disclosure before the settlement conference,
                    you must prepare, serve and file an updated Certificate of Financial Disclosure.
                </p>
            </div>

            {/* Tables */}
            <div className="row pb-40px pl-40px">
                {/* Table 1 */}
                <table className='pb-40px form-13a'>
                    <thead>
                    <tr>
                        <th>Document Number</th>
                        <th className='text-center'>Document Description</th>
                        <th>Date of Document <small><i>(yyyy/mm/dd)</i></small></th>
                        <th>Date of Document was Provided to the Other Party <small><i>(yyyy/mm/dd)</i></small></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="sub-table-heading" colSpan={4}>Part A: Source of Income</th>
                    </tr>
                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Personal Income Tax Returns</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.taxReturns.document1.number}
                                   onChange={fillFormData('sources.taxReturns.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document1.description}
                                   onChange={fillFormData('sources.taxReturns.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document1.date}
                                   onChange={fillFormData('sources.taxReturns.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document1.dateProvided}
                                   onChange={fillFormData('sources.taxReturns.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.taxReturns.document2.number}
                                   onChange={fillFormData('sources.taxReturns.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document2.description}
                                   onChange={fillFormData('sources.taxReturns.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document2.date}
                                   onChange={fillFormData('sources.taxReturns.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document2.dateProvided}
                                   onChange={fillFormData('sources.taxReturns.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.taxReturns.document3.number}
                                   onChange={fillFormData('sources.taxReturns.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document3.description}
                                   onChange={fillFormData('sources.taxReturns.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document3.date}
                                   onChange={fillFormData('sources.taxReturns.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document3.dateProvided}
                                   onChange={fillFormData('sources.taxReturns.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.taxReturns.document4.number}
                                   onChange={fillFormData('sources.taxReturns.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document4.description}
                                   onChange={fillFormData('sources.taxReturns.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document4.date}
                                   onChange={fillFormData('sources.taxReturns.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document4.dateProvided}
                                   onChange={fillFormData('sources.taxReturns.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.taxReturns.document5.number}
                                   onChange={fillFormData('sources.taxReturns.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document5.description}
                                   onChange={fillFormData('sources.taxReturns.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document5.date}
                                   onChange={fillFormData('sources.taxReturns.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.taxReturns.document5.dateProvided}
                                   onChange={fillFormData('sources.taxReturns.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Notices of Assessment and Reassessment</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.assessment.document1.number}
                                   onChange={fillFormData('sources.assessment.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document1.description}
                                   onChange={fillFormData('sources.assessment.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document1.date}
                                   onChange={fillFormData('sources.assessment.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document1.dateProvided}
                                   onChange={fillFormData('sources.assessment.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.assessment.document2.number}
                                   onChange={fillFormData('sources.assessment.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document2.description}
                                   onChange={fillFormData('sources.assessment.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document2.date}
                                   onChange={fillFormData('sources.assessment.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document2.dateProvided}
                                   onChange={fillFormData('sources.assessment.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.assessment.document3.number}
                                   onChange={fillFormData('sources.assessment.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document3.description}
                                   onChange={fillFormData('sources.assessment.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document3.date}
                                   onChange={fillFormData('sources.assessment.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document3.dateProvided}
                                   onChange={fillFormData('sources.assessment.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.assessment.document4.number}
                                   onChange={fillFormData('sources.assessment.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document4.description}
                                   onChange={fillFormData('sources.assessment.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document4.date}
                                   onChange={fillFormData('sources.assessment.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document4.dateProvided}
                                   onChange={fillFormData('sources.assessment.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.assessment.document5.number}
                                   onChange={fillFormData('sources.assessment.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document5.description}
                                   onChange={fillFormData('sources.assessment.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document5.date}
                                   onChange={fillFormData('sources.assessment.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.assessment.document5.dateProvided}
                                   onChange={fillFormData('sources.assessment.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Employment Income</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.employment.document1.number}
                                   onChange={fillFormData('sources.employment.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document1.description}
                                   onChange={fillFormData('sources.employment.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document1.date}
                                   onChange={fillFormData('sources.employment.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document1.dateProvided}
                                   onChange={fillFormData('sources.employment.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.employment.document2.number}
                                   onChange={fillFormData('sources.employment.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document2.description}
                                   onChange={fillFormData('sources.employment.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document2.date}
                                   onChange={fillFormData('sources.employment.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document2.dateProvided}
                                   onChange={fillFormData('sources.employment.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.employment.document3.number}
                                   onChange={fillFormData('sources.employment.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document3.description}
                                   onChange={fillFormData('sources.employment.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document3.date}
                                   onChange={fillFormData('sources.employment.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document3.dateProvided}
                                   onChange={fillFormData('sources.employment.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.employment.document4.number}
                                   onChange={fillFormData('sources.employment.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document4.description}
                                   onChange={fillFormData('sources.employment.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document4.date}
                                   onChange={fillFormData('sources.employment.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document4.dateProvided}
                                   onChange={fillFormData('sources.employment.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.employment.document5.number}
                                   onChange={fillFormData('sources.employment.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document5.description}
                                   onChange={fillFormData('sources.employment.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document5.date}
                                   onChange={fillFormData('sources.employment.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.employment.document5.dateProvided}
                                   onChange={fillFormData('sources.employment.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Self-Employment Income</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document1.number}
                                   onChange={fillFormData('sources.selfEmployment.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document1.description}
                                   onChange={fillFormData('sources.selfEmployment.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document1.date}
                                   onChange={fillFormData('sources.selfEmployment.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document1.dateProvided}
                                   onChange={fillFormData('sources.selfEmployment.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document2.number}
                                   onChange={fillFormData('sources.selfEmployment.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document2.description}
                                   onChange={fillFormData('sources.selfEmployment.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document2.date}
                                   onChange={fillFormData('sources.selfEmployment.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document2.dateProvided}
                                   onChange={fillFormData('sources.selfEmployment.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document3.number}
                                   onChange={fillFormData('sources.selfEmployment.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document3.description}
                                   onChange={fillFormData('sources.selfEmployment.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document3.date}
                                   onChange={fillFormData('sources.selfEmployment.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document3.dateProvided}
                                   onChange={fillFormData('sources.selfEmployment.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document4.number}
                                   onChange={fillFormData('sources.selfEmployment.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document4.description}
                                   onChange={fillFormData('sources.selfEmployment.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document4.date}
                                   onChange={fillFormData('sources.selfEmployment.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document4.dateProvided}
                                   onChange={fillFormData('sources.selfEmployment.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document5.number}
                                   onChange={fillFormData('sources.selfEmployment.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document5.description}
                                   onChange={fillFormData('sources.selfEmployment.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document5.date}
                                   onChange={fillFormData('sources.selfEmployment.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.selfEmployment.document5.dateProvided}
                                   onChange={fillFormData('sources.selfEmployment.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Partnership Income and Interests in a
                            Partnership
                        </th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.partnership.document1.number}
                                   onChange={fillFormData('sources.partnership.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document1.description}
                                   onChange={fillFormData('sources.partnership.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document1.date}
                                   onChange={fillFormData('sources.partnership.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document1.dateProvided}
                                   onChange={fillFormData('sources.partnership.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.partnership.document2.number}
                                   onChange={fillFormData('sources.partnership.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document2.description}
                                   onChange={fillFormData('sources.partnership.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document2.date}
                                   onChange={fillFormData('sources.partnership.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document2.dateProvided}
                                   onChange={fillFormData('sources.partnership.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.partnership.document3.number}
                                   onChange={fillFormData('sources.partnership.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document3.description}
                                   onChange={fillFormData('sources.partnership.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document3.date}
                                   onChange={fillFormData('sources.partnership.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document3.dateProvided}
                                   onChange={fillFormData('sources.partnership.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.partnership.document4.number}
                                   onChange={fillFormData('sources.partnership.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document4.description}
                                   onChange={fillFormData('sources.partnership.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document4.date}
                                   onChange={fillFormData('sources.partnership.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document4.dateProvided}
                                   onChange={fillFormData('sources.partnership.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.partnership.document5.number}
                                   onChange={fillFormData('sources.partnership.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document5.description}
                                   onChange={fillFormData('sources.partnership.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document5.date}
                                   onChange={fillFormData('sources.partnership.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.partnership.document5.dateProvided}
                                   onChange={fillFormData('sources.partnership.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Income from a Privately Held Corporation</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.corporation.document1.number}
                                   onChange={fillFormData('sources.corporation.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document1.description}
                                   onChange={fillFormData('sources.corporation.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document1.date}
                                   onChange={fillFormData('sources.corporation.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document1.dateProvided}
                                   onChange={fillFormData('sources.corporation.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.corporation.document2.number}
                                   onChange={fillFormData('sources.corporation.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document2.description}
                                   onChange={fillFormData('sources.corporation.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document2.date}
                                   onChange={fillFormData('sources.corporation.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document2.dateProvided}
                                   onChange={fillFormData('sources.corporation.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.corporation.document3.number}
                                   onChange={fillFormData('sources.corporation.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document3.description}
                                   onChange={fillFormData('sources.corporation.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document3.date}
                                   onChange={fillFormData('sources.corporation.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document3.dateProvided}
                                   onChange={fillFormData('sources.corporation.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.corporation.document4.number}
                                   onChange={fillFormData('sources.corporation.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document4.description}
                                   onChange={fillFormData('sources.corporation.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document4.date}
                                   onChange={fillFormData('sources.corporation.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document4.dateProvided}
                                   onChange={fillFormData('sources.corporation.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.corporation.document5.number}
                                   onChange={fillFormData('sources.corporation.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document5.description}
                                   onChange={fillFormData('sources.corporation.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document5.date}
                                   onChange={fillFormData('sources.corporation.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.corporation.document5.dateProvided}
                                   onChange={fillFormData('sources.corporation.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Beneficial Income from, and Interest in, a
                            Trust
                        </th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.trust.document1.number}
                                   onChange={fillFormData('sources.trust.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document1.description}
                                   onChange={fillFormData('sources.trust.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document1.date}
                                   onChange={fillFormData('sources.trust.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document1.dateProvided}
                                   onChange={fillFormData('sources.trust.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.trust.document2.number}
                                   onChange={fillFormData('sources.trust.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document2.description}
                                   onChange={fillFormData('sources.trust.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document2.date}
                                   onChange={fillFormData('sources.trust.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document2.dateProvided}
                                   onChange={fillFormData('sources.trust.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.trust.document3.number}
                                   onChange={fillFormData('sources.trust.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document3.description}
                                   onChange={fillFormData('sources.trust.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document3.date}
                                   onChange={fillFormData('sources.trust.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document3.dateProvided}
                                   onChange={fillFormData('sources.trust.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.trust.document4.number}
                                   onChange={fillFormData('sources.trust.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document4.description}
                                   onChange={fillFormData('sources.trust.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document4.date}
                                   onChange={fillFormData('sources.trust.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document4.dateProvided}
                                   onChange={fillFormData('sources.trust.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.trust.document5.number}
                                   onChange={fillFormData('sources.trust.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document5.description}
                                   onChange={fillFormData('sources.trust.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document5.date}
                                   onChange={fillFormData('sources.trust.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.trust.document5.dateProvided}
                                   onChange={fillFormData('sources.trust.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Income from Employment Insurance or Social
                            Assistance
                        </th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.insurance.document1.number}
                                   onChange={fillFormData('sources.insurance.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document1.description}
                                   onChange={fillFormData('sources.insurance.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document1.date}
                                   onChange={fillFormData('sources.insurance.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document1.dateProvided}
                                   onChange={fillFormData('sources.insurance.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.insurance.document2.number}
                                   onChange={fillFormData('sources.insurance.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document2.description}
                                   onChange={fillFormData('sources.insurance.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document2.date}
                                   onChange={fillFormData('sources.insurance.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document2.dateProvided}
                                   onChange={fillFormData('sources.insurance.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.insurance.document3.number}
                                   onChange={fillFormData('sources.insurance.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document3.description}
                                   onChange={fillFormData('sources.insurance.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document3.date}
                                   onChange={fillFormData('sources.insurance.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document3.dateProvided}
                                   onChange={fillFormData('sources.insurance.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.insurance.document4.number}
                                   onChange={fillFormData('sources.insurance.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document4.description}
                                   onChange={fillFormData('sources.insurance.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document4.date}
                                   onChange={fillFormData('sources.insurance.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document4.dateProvided}
                                   onChange={fillFormData('sources.insurance.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.insurance.document5.number}
                                   onChange={fillFormData('sources.insurance.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document5.description}
                                   onChange={fillFormData('sources.insurance.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document5.date}
                                   onChange={fillFormData('sources.insurance.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.insurance.document5.dateProvided}
                                   onChange={fillFormData('sources.insurance.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Pensions and Annuities</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.pensions.document1.number}
                                   onChange={fillFormData('sources.pensions.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document1.description}
                                   onChange={fillFormData('sources.pensions.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document1.date}
                                   onChange={fillFormData('sources.pensions.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document1.dateProvided}
                                   onChange={fillFormData('sources.pensions.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.pensions.document2.number}
                                   onChange={fillFormData('sources.pensions.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document2.description}
                                   onChange={fillFormData('sources.pensions.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document2.date}
                                   onChange={fillFormData('sources.pensions.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document2.dateProvided}
                                   onChange={fillFormData('sources.pensions.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.pensions.document3.number}
                                   onChange={fillFormData('sources.pensions.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document3.description}
                                   onChange={fillFormData('sources.pensions.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document3.date}
                                   onChange={fillFormData('sources.pensions.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document3.dateProvided}
                                   onChange={fillFormData('sources.pensions.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.pensions.document4.number}
                                   onChange={fillFormData('sources.pensions.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document4.description}
                                   onChange={fillFormData('sources.pensions.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document4.date}
                                   onChange={fillFormData('sources.pensions.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document4.dateProvided}
                                   onChange={fillFormData('sources.pensions.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.pensions.document5.number}
                                   onChange={fillFormData('sources.pensions.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document5.description}
                                   onChange={fillFormData('sources.pensions.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document5.date}
                                   onChange={fillFormData('sources.pensions.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.pensions.document5.dateProvided}
                                   onChange={fillFormData('sources.pensions.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Income from Spousal Support</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document1.number}
                                   onChange={fillFormData('sources.spousalSupport.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document1.description}
                                   onChange={fillFormData('sources.spousalSupport.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document1.date}
                                   onChange={fillFormData('sources.spousalSupport.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document1.dateProvided}
                                   onChange={fillFormData('sources.spousalSupport.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document2.number}
                                   onChange={fillFormData('sources.spousalSupport.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document2.description}
                                   onChange={fillFormData('sources.spousalSupport.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document2.date}
                                   onChange={fillFormData('sources.spousalSupport.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document2.dateProvided}
                                   onChange={fillFormData('sources.spousalSupport.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document3.number}
                                   onChange={fillFormData('sources.spousalSupport.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document3.description}
                                   onChange={fillFormData('sources.spousalSupport.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document3.date}
                                   onChange={fillFormData('sources.spousalSupport.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document3.dateProvided}
                                   onChange={fillFormData('sources.spousalSupport.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document4.number}
                                   onChange={fillFormData('sources.spousalSupport.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document4.description}
                                   onChange={fillFormData('sources.spousalSupport.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document4.date}
                                   onChange={fillFormData('sources.spousalSupport.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document4.dateProvided}
                                   onChange={fillFormData('sources.spousalSupport.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document5.number}
                                   onChange={fillFormData('sources.spousalSupport.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document5.description}
                                   onChange={fillFormData('sources.spousalSupport.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document5.date}
                                   onChange={fillFormData('sources.spousalSupport.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.spousalSupport.document5.dateProvided}
                                   onChange={fillFormData('sources.spousalSupport.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Tax Benefits or Rebates</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rebates.document1.number}
                                   onChange={fillFormData('sources.rebates.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document1.description}
                                   onChange={fillFormData('sources.rebates.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document1.date}
                                   onChange={fillFormData('sources.rebates.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document1.dateProvided}
                                   onChange={fillFormData('sources.rebates.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rebates.document2.number}
                                   onChange={fillFormData('sources.rebates.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document2.description}
                                   onChange={fillFormData('sources.rebates.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document2.date}
                                   onChange={fillFormData('sources.rebates.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document2.dateProvided}
                                   onChange={fillFormData('sources.rebates.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rebates.document3.number}
                                   onChange={fillFormData('sources.rebates.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document3.description}
                                   onChange={fillFormData('sources.rebates.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document3.date}
                                   onChange={fillFormData('sources.rebates.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document3.dateProvided}
                                   onChange={fillFormData('sources.rebates.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rebates.document4.number}
                                   onChange={fillFormData('sources.rebates.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document4.description}
                                   onChange={fillFormData('sources.rebates.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document4.date}
                                   onChange={fillFormData('sources.rebates.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document4.dateProvided}
                                   onChange={fillFormData('sources.rebates.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rebates.document5.number}
                                   onChange={fillFormData('sources.rebates.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document5.description}
                                   onChange={fillFormData('sources.rebates.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document5.date}
                                   onChange={fillFormData('sources.rebates.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rebates.document5.dateProvided}
                                   onChange={fillFormData('sources.rebates.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Investment and Interest Income</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.investments.document1.number}
                                   onChange={fillFormData('sources.investments.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document1.description}
                                   onChange={fillFormData('sources.investments.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document1.date}
                                   onChange={fillFormData('sources.investments.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document1.dateProvided}
                                   onChange={fillFormData('sources.investments.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.investments.document2.number}
                                   onChange={fillFormData('sources.investments.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document2.description}
                                   onChange={fillFormData('sources.investments.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document2.date}
                                   onChange={fillFormData('sources.investments.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document2.dateProvided}
                                   onChange={fillFormData('sources.investments.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.investments.document3.number}
                                   onChange={fillFormData('sources.investments.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document3.description}
                                   onChange={fillFormData('sources.investments.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document3.date}
                                   onChange={fillFormData('sources.investments.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document3.dateProvided}
                                   onChange={fillFormData('sources.investments.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.investments.document4.number}
                                   onChange={fillFormData('sources.investments.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document4.description}
                                   onChange={fillFormData('sources.investments.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document4.date}
                                   onChange={fillFormData('sources.investments.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document4.dateProvided}
                                   onChange={fillFormData('sources.investments.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.investments.document5.number}
                                   onChange={fillFormData('sources.investments.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document5.description}
                                   onChange={fillFormData('sources.investments.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document5.date}
                                   onChange={fillFormData('sources.investments.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.investments.document5.dateProvided}
                                   onChange={fillFormData('sources.investments.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Rental Income</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rental.document1.number}
                                   onChange={fillFormData('sources.rental.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document1.description}
                                   onChange={fillFormData('sources.rental.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document1.date}
                                   onChange={fillFormData('sources.rental.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document1.dateProvided}
                                   onChange={fillFormData('sources.rental.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rental.document2.number}
                                   onChange={fillFormData('sources.rental.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document2.description}
                                   onChange={fillFormData('sources.rental.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document2.date}
                                   onChange={fillFormData('sources.rental.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document2.dateProvided}
                                   onChange={fillFormData('sources.rental.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rental.document3.number}
                                   onChange={fillFormData('sources.rental.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document3.description}
                                   onChange={fillFormData('sources.rental.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document3.date}
                                   onChange={fillFormData('sources.rental.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document3.dateProvided}
                                   onChange={fillFormData('sources.rental.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rental.document4.number}
                                   onChange={fillFormData('sources.rental.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document4.description}
                                   onChange={fillFormData('sources.rental.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document4.date}
                                   onChange={fillFormData('sources.rental.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document4.dateProvided}
                                   onChange={fillFormData('sources.rental.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.rental.document5.number}
                                   onChange={fillFormData('sources.rental.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document5.description}
                                   onChange={fillFormData('sources.rental.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document5.date}
                                   onChange={fillFormData('sources.rental.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.rental.document5.dateProvided}
                                   onChange={fillFormData('sources.rental.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Other Income</th>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.other.document1.number}
                                   onChange={fillFormData('sources.other.document1.number')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document1.description}
                                   onChange={fillFormData('sources.other.document1.description')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document1.date}
                                   onChange={fillFormData('sources.other.document1.date')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document1.dateProvided}
                                   onChange={fillFormData('sources.other.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.other.document2.number}
                                   onChange={fillFormData('sources.other.document2.number')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document2.description}
                                   onChange={fillFormData('sources.other.document2.description')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document2.date}
                                   onChange={fillFormData('sources.other.document2.date')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document2.dateProvided}
                                   onChange={fillFormData('sources.other.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.other.document3.number}
                                   onChange={fillFormData('sources.other.document3.number')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document3.description}
                                   onChange={fillFormData('sources.other.document3.description')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document3.date}
                                   onChange={fillFormData('sources.other.document3.date')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document3.dateProvided}
                                   onChange={fillFormData('sources.other.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.other.document4.number}
                                   onChange={fillFormData('sources.other.document4.number')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document4.description}
                                   onChange={fillFormData('sources.other.document4.description')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document4.date}
                                   onChange={fillFormData('sources.other.document4.date')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document4.dateProvided}
                                   onChange={fillFormData('sources.other.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.sources.other.document5.number}
                                   onChange={fillFormData('sources.other.document5.number')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document5.description}
                                   onChange={fillFormData('sources.other.document5.description')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document5.date}
                                   onChange={fillFormData('sources.other.document5.date')}/></td>
                        <td><input className="form-control" value={formData.sources.other.document5.dateProvided}
                                   onChange={fillFormData('sources.other.document5.dateProvided')}/></td>
                    </tr>


                    <tr>
                        <th className="sub-table-heading" colSpan={4}>Part B: Special and Extraordinary Expenses</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.specialExpenses.document1.number}
                                   onChange={fillFormData('specialExpenses.document1.number')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document1.description}
                                   onChange={fillFormData('specialExpenses.document1.description')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document1.date}
                                   onChange={fillFormData('specialExpenses.document1.date')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document1.dateProvided}
                                   onChange={fillFormData('specialExpenses.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.specialExpenses.document2.number}
                                   onChange={fillFormData('specialExpenses.document2.number')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document2.description}
                                   onChange={fillFormData('specialExpenses.document2.description')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document2.date}
                                   onChange={fillFormData('specialExpenses.document2.date')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document2.dateProvided}
                                   onChange={fillFormData('specialExpenses.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.specialExpenses.document3.number}
                                   onChange={fillFormData('specialExpenses.document3.number')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document3.description}
                                   onChange={fillFormData('specialExpenses.document3.description')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document3.date}
                                   onChange={fillFormData('specialExpenses.document3.date')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document3.dateProvided}
                                   onChange={fillFormData('specialExpenses.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.specialExpenses.document4.number}
                                   onChange={fillFormData('specialExpenses.document4.number')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document4.description}
                                   onChange={fillFormData('specialExpenses.document4.description')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document4.date}
                                   onChange={fillFormData('specialExpenses.document4.date')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document4.dateProvided}
                                   onChange={fillFormData('specialExpenses.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.specialExpenses.document5.number}
                                   onChange={fillFormData('specialExpenses.document5.number')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document5.description}
                                   onChange={fillFormData('specialExpenses.document5.description')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document5.date}
                                   onChange={fillFormData('specialExpenses.document5.date')}/></td>
                        <td><input className="form-control" value={formData.specialExpenses.document5.dateProvided}
                                   onChange={fillFormData('specialExpenses.document5.dateProvided')}/></td>
                    </tr>


                    <tr>
                        <th className="sub-table-heading" colSpan={4}>Part C: Claim for Equalization of Net Family
                            Property
                        </th>
                    </tr>
                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Assets and Liabilities at Valuation Date</th>
                    </tr>
                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Real Estate</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.realEstate.document1.number}
                                   onChange={fillFormData('claim.realEstate.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document1.description}
                                   onChange={fillFormData('claim.realEstate.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document1.date}
                                   onChange={fillFormData('claim.realEstate.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document1.dateProvided}
                                   onChange={fillFormData('claim.realEstate.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.realEstate.document2.number}
                                   onChange={fillFormData('claim.realEstate.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document2.description}
                                   onChange={fillFormData('claim.realEstate.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document2.date}
                                   onChange={fillFormData('claim.realEstate.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document2.dateProvided}
                                   onChange={fillFormData('claim.realEstate.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.realEstate.document3.number}
                                   onChange={fillFormData('claim.realEstate.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document3.description}
                                   onChange={fillFormData('claim.realEstate.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document3.date}
                                   onChange={fillFormData('claim.realEstate.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document3.dateProvided}
                                   onChange={fillFormData('claim.realEstate.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.realEstate.document4.number}
                                   onChange={fillFormData('claim.realEstate.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document4.description}
                                   onChange={fillFormData('claim.realEstate.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document4.date}
                                   onChange={fillFormData('claim.realEstate.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document4.dateProvided}
                                   onChange={fillFormData('claim.realEstate.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.realEstate.document5.number}
                                   onChange={fillFormData('claim.realEstate.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document5.description}
                                   onChange={fillFormData('claim.realEstate.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document5.date}
                                   onChange={fillFormData('claim.realEstate.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.realEstate.document5.dateProvided}
                                   onChange={fillFormData('claim.realEstate.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Savings and Investments</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.savings.document1.number}
                                   onChange={fillFormData('claim.savings.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document1.description}
                                   onChange={fillFormData('claim.savings.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document1.date}
                                   onChange={fillFormData('claim.savings.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document1.dateProvided}
                                   onChange={fillFormData('claim.savings.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.savings.document2.number}
                                   onChange={fillFormData('claim.savings.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document2.description}
                                   onChange={fillFormData('claim.savings.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document2.date}
                                   onChange={fillFormData('claim.savings.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document2.dateProvided}
                                   onChange={fillFormData('claim.savings.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.savings.document3.number}
                                   onChange={fillFormData('claim.savings.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document3.description}
                                   onChange={fillFormData('claim.savings.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document3.date}
                                   onChange={fillFormData('claim.savings.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document3.dateProvided}
                                   onChange={fillFormData('claim.savings.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.savings.document4.number}
                                   onChange={fillFormData('claim.savings.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document4.description}
                                   onChange={fillFormData('claim.savings.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document4.date}
                                   onChange={fillFormData('claim.savings.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document4.dateProvided}
                                   onChange={fillFormData('claim.savings.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.savings.document5.number}
                                   onChange={fillFormData('claim.savings.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document5.description}
                                   onChange={fillFormData('claim.savings.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document5.date}
                                   onChange={fillFormData('claim.savings.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.savings.document5.dateProvided}
                                   onChange={fillFormData('claim.savings.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Pensions</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.pensions.document1.number}
                                   onChange={fillFormData('claim.pensions.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document1.description}
                                   onChange={fillFormData('claim.pensions.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document1.date}
                                   onChange={fillFormData('claim.pensions.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document1.dateProvided}
                                   onChange={fillFormData('claim.pensions.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.pensions.document2.number}
                                   onChange={fillFormData('claim.pensions.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document2.description}
                                   onChange={fillFormData('claim.pensions.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document2.date}
                                   onChange={fillFormData('claim.pensions.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document2.dateProvided}
                                   onChange={fillFormData('claim.pensions.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.pensions.document3.number}
                                   onChange={fillFormData('claim.pensions.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document3.description}
                                   onChange={fillFormData('claim.pensions.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document3.date}
                                   onChange={fillFormData('claim.pensions.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document3.dateProvided}
                                   onChange={fillFormData('claim.pensions.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.pensions.document4.number}
                                   onChange={fillFormData('claim.pensions.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document4.description}
                                   onChange={fillFormData('claim.pensions.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document4.date}
                                   onChange={fillFormData('claim.pensions.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document4.dateProvided}
                                   onChange={fillFormData('claim.pensions.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.pensions.document5.number}
                                   onChange={fillFormData('claim.pensions.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document5.description}
                                   onChange={fillFormData('claim.pensions.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document5.date}
                                   onChange={fillFormData('claim.pensions.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.pensions.document5.dateProvided}
                                   onChange={fillFormData('claim.pensions.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Life Insurance Policies</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.insurance.document1.number}
                                   onChange={fillFormData('claim.insurance.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document1.description}
                                   onChange={fillFormData('claim.insurance.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document1.date}
                                   onChange={fillFormData('claim.insurance.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document1.dateProvided}
                                   onChange={fillFormData('claim.insurance.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.insurance.document2.number}
                                   onChange={fillFormData('claim.insurance.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document2.description}
                                   onChange={fillFormData('claim.insurance.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document2.date}
                                   onChange={fillFormData('claim.insurance.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document2.dateProvided}
                                   onChange={fillFormData('claim.insurance.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.insurance.document3.number}
                                   onChange={fillFormData('claim.insurance.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document3.description}
                                   onChange={fillFormData('claim.insurance.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document3.date}
                                   onChange={fillFormData('claim.insurance.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document3.dateProvided}
                                   onChange={fillFormData('claim.insurance.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.insurance.document4.number}
                                   onChange={fillFormData('claim.insurance.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document4.description}
                                   onChange={fillFormData('claim.insurance.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document4.date}
                                   onChange={fillFormData('claim.insurance.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document4.dateProvided}
                                   onChange={fillFormData('claim.insurance.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.insurance.document5.number}
                                   onChange={fillFormData('claim.insurance.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document5.description}
                                   onChange={fillFormData('claim.insurance.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document5.date}
                                   onChange={fillFormData('claim.insurance.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.insurance.document5.dateProvided}
                                   onChange={fillFormData('claim.insurance.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Interest in a Sole Proprietorship</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.sole.document1.number}
                                   onChange={fillFormData('claim.sole.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document1.description}
                                   onChange={fillFormData('claim.sole.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document1.date}
                                   onChange={fillFormData('claim.sole.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document1.dateProvided}
                                   onChange={fillFormData('claim.sole.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.sole.document2.number}
                                   onChange={fillFormData('claim.sole.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document2.description}
                                   onChange={fillFormData('claim.sole.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document2.date}
                                   onChange={fillFormData('claim.sole.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document2.dateProvided}
                                   onChange={fillFormData('claim.sole.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.sole.document3.number}
                                   onChange={fillFormData('claim.sole.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document3.description}
                                   onChange={fillFormData('claim.sole.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document3.date}
                                   onChange={fillFormData('claim.sole.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document3.dateProvided}
                                   onChange={fillFormData('claim.sole.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.sole.document4.number}
                                   onChange={fillFormData('claim.sole.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document4.description}
                                   onChange={fillFormData('claim.sole.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document4.date}
                                   onChange={fillFormData('claim.sole.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document4.dateProvided}
                                   onChange={fillFormData('claim.sole.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.sole.document5.number}
                                   onChange={fillFormData('claim.sole.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document5.description}
                                   onChange={fillFormData('claim.sole.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document5.date}
                                   onChange={fillFormData('claim.sole.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.sole.document5.dateProvided}
                                   onChange={fillFormData('claim.sole.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Interest in a Partnership</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.partnership.document1.number}
                                   onChange={fillFormData('claim.partnership.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document1.description}
                                   onChange={fillFormData('claim.partnership.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document1.date}
                                   onChange={fillFormData('claim.partnership.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document1.dateProvided}
                                   onChange={fillFormData('claim.partnership.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.partnership.document2.number}
                                   onChange={fillFormData('claim.partnership.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document2.description}
                                   onChange={fillFormData('claim.partnership.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document2.date}
                                   onChange={fillFormData('claim.partnership.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document2.dateProvided}
                                   onChange={fillFormData('claim.partnership.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.partnership.document3.number}
                                   onChange={fillFormData('claim.partnership.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document3.description}
                                   onChange={fillFormData('claim.partnership.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document3.date}
                                   onChange={fillFormData('claim.partnership.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document3.dateProvided}
                                   onChange={fillFormData('claim.partnership.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.partnership.document4.number}
                                   onChange={fillFormData('claim.partnership.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document4.description}
                                   onChange={fillFormData('claim.partnership.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document4.date}
                                   onChange={fillFormData('claim.partnership.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document4.dateProvided}
                                   onChange={fillFormData('claim.partnership.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.partnership.document5.number}
                                   onChange={fillFormData('claim.partnership.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document5.description}
                                   onChange={fillFormData('claim.partnership.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document5.date}
                                   onChange={fillFormData('claim.partnership.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.partnership.document5.dateProvided}
                                   onChange={fillFormData('claim.partnership.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Interest in a Publicly Held Corporation</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.corporation.document1.number}
                                   onChange={fillFormData('claim.corporation.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document1.description}
                                   onChange={fillFormData('claim.corporation.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document1.date}
                                   onChange={fillFormData('claim.corporation.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document1.dateProvided}
                                   onChange={fillFormData('claim.corporation.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.corporation.document2.number}
                                   onChange={fillFormData('claim.corporation.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document2.description}
                                   onChange={fillFormData('claim.corporation.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document2.date}
                                   onChange={fillFormData('claim.corporation.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document2.dateProvided}
                                   onChange={fillFormData('claim.corporation.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.corporation.document3.number}
                                   onChange={fillFormData('claim.corporation.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document3.description}
                                   onChange={fillFormData('claim.corporation.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document3.date}
                                   onChange={fillFormData('claim.corporation.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document3.dateProvided}
                                   onChange={fillFormData('claim.corporation.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.corporation.document4.number}
                                   onChange={fillFormData('claim.corporation.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document4.description}
                                   onChange={fillFormData('claim.corporation.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document4.date}
                                   onChange={fillFormData('claim.corporation.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document4.dateProvided}
                                   onChange={fillFormData('claim.corporation.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.corporation.document5.number}
                                   onChange={fillFormData('claim.corporation.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document5.description}
                                   onChange={fillFormData('claim.corporation.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document5.date}
                                   onChange={fillFormData('claim.corporation.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.corporation.document5.dateProvided}
                                   onChange={fillFormData('claim.corporation.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Trust Interest</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.trust.document1.number}
                                   onChange={fillFormData('claim.trust.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document1.description}
                                   onChange={fillFormData('claim.trust.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document1.date}
                                   onChange={fillFormData('claim.trust.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document1.dateProvided}
                                   onChange={fillFormData('claim.trust.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.trust.document2.number}
                                   onChange={fillFormData('claim.trust.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document2.description}
                                   onChange={fillFormData('claim.trust.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document2.date}
                                   onChange={fillFormData('claim.trust.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document2.dateProvided}
                                   onChange={fillFormData('claim.trust.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.trust.document3.number}
                                   onChange={fillFormData('claim.trust.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document3.description}
                                   onChange={fillFormData('claim.trust.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document3.date}
                                   onChange={fillFormData('claim.trust.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document3.dateProvided}
                                   onChange={fillFormData('claim.trust.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.trust.document4.number}
                                   onChange={fillFormData('claim.trust.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document4.description}
                                   onChange={fillFormData('claim.trust.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document4.date}
                                   onChange={fillFormData('claim.trust.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document4.dateProvided}
                                   onChange={fillFormData('claim.trust.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.trust.document5.number}
                                   onChange={fillFormData('claim.trust.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document5.description}
                                   onChange={fillFormData('claim.trust.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document5.date}
                                   onChange={fillFormData('claim.trust.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.trust.document5.dateProvided}
                                   onChange={fillFormData('claim.trust.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Property I own which does not belong in any of
                            the other categories
                        </th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.other.document1.number}
                                   onChange={fillFormData('claim.other.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document1.description}
                                   onChange={fillFormData('claim.other.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document1.date}
                                   onChange={fillFormData('claim.other.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document1.dateProvided}
                                   onChange={fillFormData('claim.other.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.other.document2.number}
                                   onChange={fillFormData('claim.other.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document2.description}
                                   onChange={fillFormData('claim.other.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document2.date}
                                   onChange={fillFormData('claim.other.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document2.dateProvided}
                                   onChange={fillFormData('claim.other.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.other.document3.number}
                                   onChange={fillFormData('claim.other.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document3.description}
                                   onChange={fillFormData('claim.other.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document3.date}
                                   onChange={fillFormData('claim.other.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document3.dateProvided}
                                   onChange={fillFormData('claim.other.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.other.document4.number}
                                   onChange={fillFormData('claim.other.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document4.description}
                                   onChange={fillFormData('claim.other.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document4.date}
                                   onChange={fillFormData('claim.other.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document4.dateProvided}
                                   onChange={fillFormData('claim.other.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.other.document5.number}
                                   onChange={fillFormData('claim.other.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document5.description}
                                   onChange={fillFormData('claim.other.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document5.date}
                                   onChange={fillFormData('claim.other.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.other.document5.dateProvided}
                                   onChange={fillFormData('claim.other.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Liabilities</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.claim.liabilities.document1.number}
                                   onChange={fillFormData('claim.liabilities.document1.number')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document1.description}
                                   onChange={fillFormData('claim.liabilities.document1.description')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document1.date}
                                   onChange={fillFormData('claim.liabilities.document1.date')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document1.dateProvided}
                                   onChange={fillFormData('claim.liabilities.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.liabilities.document2.number}
                                   onChange={fillFormData('claim.liabilities.document2.number')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document2.description}
                                   onChange={fillFormData('claim.liabilities.document2.description')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document2.date}
                                   onChange={fillFormData('claim.liabilities.document2.date')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document2.dateProvided}
                                   onChange={fillFormData('claim.liabilities.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.liabilities.document3.number}
                                   onChange={fillFormData('claim.liabilities.document3.number')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document3.description}
                                   onChange={fillFormData('claim.liabilities.document3.description')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document3.date}
                                   onChange={fillFormData('claim.liabilities.document3.date')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document3.dateProvided}
                                   onChange={fillFormData('claim.liabilities.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.liabilities.document4.number}
                                   onChange={fillFormData('claim.liabilities.document4.number')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document4.description}
                                   onChange={fillFormData('claim.liabilities.document4.description')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document4.date}
                                   onChange={fillFormData('claim.liabilities.document4.date')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document4.dateProvided}
                                   onChange={fillFormData('claim.liabilities.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.claim.liabilities.document5.number}
                                   onChange={fillFormData('claim.liabilities.document5.number')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document5.description}
                                   onChange={fillFormData('claim.liabilities.document5.description')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document5.date}
                                   onChange={fillFormData('claim.liabilities.document5.date')}/></td>
                        <td><input className="form-control" value={formData.claim.liabilities.document5.dateProvided}
                                   onChange={fillFormData('claim.liabilities.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Asset and Liabilities at Marriage Date</th>
                    </tr>
                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Assets</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.assets.document1.number}
                                   onChange={fillFormData('assets.document1.number')}/></td>
                        <td><input className="form-control" value={formData.assets.document1.description}
                                   onChange={fillFormData('assets.document1.description')}/></td>
                        <td><input className="form-control" value={formData.assets.document1.date}
                                   onChange={fillFormData('assets.document1.date')}/></td>
                        <td><input className="form-control" value={formData.assets.document1.dateProvided}
                                   onChange={fillFormData('assets.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.assets.document2.number}
                                   onChange={fillFormData('assets.document2.number')}/></td>
                        <td><input className="form-control" value={formData.assets.document2.description}
                                   onChange={fillFormData('assets.document2.description')}/></td>
                        <td><input className="form-control" value={formData.assets.document2.date}
                                   onChange={fillFormData('assets.document2.date')}/></td>
                        <td><input className="form-control" value={formData.assets.document2.dateProvided}
                                   onChange={fillFormData('assets.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.assets.document3.number}
                                   onChange={fillFormData('assets.document3.number')}/></td>
                        <td><input className="form-control" value={formData.assets.document3.description}
                                   onChange={fillFormData('assets.document3.description')}/></td>
                        <td><input className="form-control" value={formData.assets.document3.date}
                                   onChange={fillFormData('assets.document3.date')}/></td>
                        <td><input className="form-control" value={formData.assets.document3.dateProvided}
                                   onChange={fillFormData('assets.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.assets.document4.number}
                                   onChange={fillFormData('assets.document4.number')}/></td>
                        <td><input className="form-control" value={formData.assets.document4.description}
                                   onChange={fillFormData('assets.document4.description')}/></td>
                        <td><input className="form-control" value={formData.assets.document4.date}
                                   onChange={fillFormData('assets.document4.date')}/></td>
                        <td><input className="form-control" value={formData.assets.document4.dateProvided}
                                   onChange={fillFormData('assets.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.assets.document5.number}
                                   onChange={fillFormData('assets.document5.number')}/></td>
                        <td><input className="form-control" value={formData.assets.document5.description}
                                   onChange={fillFormData('assets.document5.description')}/></td>
                        <td><input className="form-control" value={formData.assets.document5.date}
                                   onChange={fillFormData('assets.document5.date')}/></td>
                        <td><input className="form-control" value={formData.assets.document5.dateProvided}
                                   onChange={fillFormData('assets.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-3" colSpan={4}>Liabilities</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.liabilities.document1.number}
                                   onChange={fillFormData('liabilities.document1.number')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document1.description}
                                   onChange={fillFormData('liabilities.document1.description')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document1.date}
                                   onChange={fillFormData('liabilities.document1.date')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document1.dateProvided}
                                   onChange={fillFormData('liabilities.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.liabilities.document2.number}
                                   onChange={fillFormData('liabilities.document2.number')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document2.description}
                                   onChange={fillFormData('liabilities.document2.description')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document2.date}
                                   onChange={fillFormData('liabilities.document2.date')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document2.dateProvided}
                                   onChange={fillFormData('liabilities.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.liabilities.document3.number}
                                   onChange={fillFormData('liabilities.document3.number')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document3.description}
                                   onChange={fillFormData('liabilities.document3.description')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document3.date}
                                   onChange={fillFormData('liabilities.document3.date')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document3.dateProvided}
                                   onChange={fillFormData('liabilities.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.liabilities.document4.number}
                                   onChange={fillFormData('liabilities.document4.number')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document4.description}
                                   onChange={fillFormData('liabilities.document4.description')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document4.date}
                                   onChange={fillFormData('liabilities.document4.date')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document4.dateProvided}
                                   onChange={fillFormData('liabilities.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.liabilities.document5.number}
                                   onChange={fillFormData('liabilities.document5.number')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document5.description}
                                   onChange={fillFormData('liabilities.document5.description')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document5.date}
                                   onChange={fillFormData('liabilities.document5.date')}/></td>
                        <td><input className="form-control" value={formData.liabilities.document5.dateProvided}
                                   onChange={fillFormData('liabilities.document5.dateProvided')}/></td>
                    </tr>

                    <tr>
                        <th className="sub-table-heading-2" colSpan={4}>Excluded Property</th>
                    </tr>
                   <tr>
                        <td><input className="form-control" value={formData.excluded.document1.number}
                                   onChange={fillFormData('excluded.document1.number')}/></td>
                        <td><input className="form-control" value={formData.excluded.document1.description}
                                   onChange={fillFormData('excluded.document1.description')}/></td>
                        <td><input className="form-control" value={formData.excluded.document1.date}
                                   onChange={fillFormData('excluded.document1.date')}/></td>
                        <td><input className="form-control" value={formData.excluded.document1.dateProvided}
                                   onChange={fillFormData('excluded.document1.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.excluded.document2.number}
                                   onChange={fillFormData('excluded.document2.number')}/></td>
                        <td><input className="form-control" value={formData.excluded.document2.description}
                                   onChange={fillFormData('excluded.document2.description')}/></td>
                        <td><input className="form-control" value={formData.excluded.document2.date}
                                   onChange={fillFormData('excluded.document2.date')}/></td>
                        <td><input className="form-control" value={formData.excluded.document2.dateProvided}
                                   onChange={fillFormData('excluded.document2.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.excluded.document3.number}
                                   onChange={fillFormData('excluded.document3.number')}/></td>
                        <td><input className="form-control" value={formData.excluded.document3.description}
                                   onChange={fillFormData('excluded.document3.description')}/></td>
                        <td><input className="form-control" value={formData.excluded.document3.date}
                                   onChange={fillFormData('excluded.document3.date')}/></td>
                        <td><input className="form-control" value={formData.excluded.document3.dateProvided}
                                   onChange={fillFormData('excluded.document3.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.excluded.document4.number}
                                   onChange={fillFormData('excluded.document4.number')}/></td>
                        <td><input className="form-control" value={formData.excluded.document4.description}
                                   onChange={fillFormData('excluded.document4.description')}/></td>
                        <td><input className="form-control" value={formData.excluded.document4.date}
                                   onChange={fillFormData('excluded.document4.date')}/></td>
                        <td><input className="form-control" value={formData.excluded.document4.dateProvided}
                                   onChange={fillFormData('excluded.document4.dateProvided')}/></td>
                    </tr>
                    <tr>
                        <td><input className="form-control" value={formData.excluded.document5.number}
                                   onChange={fillFormData('excluded.document5.number')}/></td>
                        <td><input className="form-control" value={formData.excluded.document5.description}
                                   onChange={fillFormData('excluded.document5.description')}/></td>
                        <td><input className="form-control" value={formData.excluded.document5.date}
                                   onChange={fillFormData('excluded.document5.date')}/></td>
                        <td><input className="form-control" value={formData.excluded.document5.dateProvided}
                                   onChange={fillFormData('excluded.document5.dateProvided')}/></td>
                    </tr>

                    </tbody>
                </table>
            </div>

            {/* Paragraph */}
            <div className="row pb-20px pl-40px">
                <p className="paragraph">
                    I am Applicant/Respondent in this case. I certify that I have provided the opposing party with all
                    of the documents that I have identified in the checklist.
                </p>
            </div>

            {/* Certify */}
            <div className="row pb-20px pl-40px">
                <div className="col-6">
                    <div className="data-input">
                        <div className="label">Certified at (City)</div>
                        <input type="text" className="form-control" value={formData.acknowledgement.city}
                               onChange={fillFormData('acknowledgement.city')}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="data-input">
                        <div className="label">on (Date)</div>
                        <input type="date" className="form-control" value={formData.acknowledgement.date}
                               onChange={fillFormData('acknowledgement.date')}/>
                    </div>
                </div>
            </div>

            {/* Signature */}
            <div className="row pb-40px pl-40px">
                <div className="col-8">
                    <div className="data-input">
                        <div className="label">Signature of Party</div>
                        <input type="text" className="form-control" value={formData.acknowledgement.signature}
                               onChange={fillFormData('acknowledgement.signature')}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CertificateOfFinancialDisclosure13A