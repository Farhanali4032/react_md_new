import React from 'react'
import { Link } from 'react-router-dom'

const ClaimingText = ({ onChange }) => {
    const claimsList = [
        {
            text: 'If you want to make a claim for support but do not want to make a claim for property or exclusive possession of the matrimonial home and its contents, you MUST fill out a Financial Statement (Form 13), serve a copy on the applicant(s) and file a copy in the court office.',
        },
        {
            text: 'However, if your only claim for support is for child support in the table amount specified under the Child Support Guidelines, you do not need to fill out, serve or file a Financial Statement.',
        },
        {
            text: 'If you want to make a claim for property or exclusive possession of the matrimonial home and its contents, whether or not it includes a claim for support, you MUST fill out a Financial Statement (Form 13.1, not Form 13), serve a copy on the applicant(s), and file a copy in the court office.',
        },
    ];
    return (
        <>
            <div>
                <div className='border border-2 border-dark mb-5 p-3'>

                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='divorce_type2'
                            value='simple'
                            id='simple2'
                            onChange={onChange('applicationClaim')}
                        //   checked={formData.applicationClaim === 'simple'}
                        />
                        <label className='form-check-label fw-bold' htmlFor='simple2'>
                            IN THIS CASE, THE APPLICANTE IS CLAIMING A DIVORCE ONLY.
                        </label>
                    </div>

                    <p className='paragraph fw-bold mb-3'>
                        TO THE RESPONDENT(S): A COURT CASE FOR DIVORCE HAS BEEN STARTED
                        AGAINST YOU IN THIS COURT. THE DETAILS ARE SET OUT ON THE ATTACHED
                        PAGES.
                    </p>

                    <p className='paragraph mb-3'>
                        <span className='fw-bold'>
                            THIS CASE IS ON THE STANDARD TRACK OF THE CASE MANAGEMENT SYSTEM.
                            No court date has been set for this case
                        </span>
                        but, if you have been served with a notice of motion, it has a court
                        date and you or your lawyer should come to court for the motion. A
                        case management judge will not be assigned until one of the parties
                        asks the clerk of the court to schedule a case conference or until a
                        motion is scheduled, whichever comes first.
                    </p>

                    <p className='paragraph mb-3'>
                        <span className='fw-bold'>
                            IF, AFTER 365 DAYS, THE CASE HAS NOT BEEN SCHEDULED FOR TRIAL,
                        </span>
                        the clerk of the court will send out a warning that the case will be
                        dismissed within 60 days unless the parties file proof that the case
                        has been settled or one of the parties asks for a case or a
                        settlement conference.
                    </p>

                    <p className='paragraph mb-3'>
                        <span className='fw-bold'>
                            IF YOU WANT TO OPPOSE ANY CLAIM IN THIS CASE,
                        </span>
                        you or your lawyer must prepare an Answer (Form 10 - a blank copy
                        should be attached), serve a copy on the applicant and file a copy
                        in the court office with an Affidavit of Service (Form 6B).
                        <span className='fw-bold'>
                            YOU HAVE ONLY 30 DAYS AFTER THIS APPLICATION IS SERVED ON YOU (60
                            DAYS IF THIS APPLICATION IS SERVED ON YOU OUTSIDE CANADA OR THE
                            UNITED STATES) TO SERVE AND FILE AN ANSWER. IF YOU DO NOT, THE
                            CASE WILL GO AHEAD WITHOUT YOU AND THE COURT MAY MAKE AN ORDER AND
                            ENFORCE IT AGAINST YOU.
                        </span>
                    </p>

                    <p className='paragraph mb-3'>
                        <span className='fw-bold'>
                            IF YOU WANT TO MAKE A CLAIM OF YOUR OWN,
                        </span>
                        you or your lawyer must fill out the claim portion in the Answer,
                        serve a copy on the applicant(s) and file a copy in the court office
                        with an Affidavit of Service.
                        <ul>
                            {claimsList.map((item, index) => (
                                <li key={index}>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </p>

                    <p className='paragraph'>
                        <span className='fw-bold'>
                            YOU SHOULD GET LEGAL ADVICE ABOUT THIS CASE RIGHT AWAY.
                        </span>
                        If you cannot afford a lawyer, you may be able to get help from your
                        local Legal Aid Ontario office.
                        <Link
                            to={{ pathname: 'https://www.legalaid.on.ca/' }}
                            target='_blank'
                            className='fst-italic'
                        >
                            (Go to www.legalaid.on.ca/.)
                        </Link>
                    </p>
                </div>

                <div className='border border-2 border-dark p-3'>
                    <div className='form-check mb-3'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='divorce_type2'
                            value='joint'
                            id='joint2'
                            onChange={onChange('applicationClaim')}
                        //   checked={formData.applicationClaim === 'joint'}
                        />
                        <label className='form-check-label' htmlFor='joint2'>
                            <span className='fw-bold'>
                                THIS CASE IS A JOINT APPLICATION FOR DIVORCE. THE DETAILS ARE
                                SET OUT ON THE ATTACHED PAGES.
                            </span>
                            The application and affidavits in support of the application will
                            be presented to a judge when the materials have been checked for
                            completeness.
                        </label>
                    </div>

                    <p className='paragraph'>
                        If you are requesting anything other than a simple divorce, such as
                        support or property or exclusive possession of the matrimonial home
                        and its contents, then refer to page 1 for instructions regarding
                        the Financial Statement you should file.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ClaimingText