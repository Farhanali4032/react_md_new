import { useEffect, useState } from 'react'
import add_folder_linear from "../../assets/images/add_folder_linear.svg";

export function FormsArray(province) {

    let formsArrayData;

    if (province === 'Alberta') {
        formsArrayData = [
            {
                category: "Divorce",
                categoryId: "DIVORCE",
                icon: add_folder_linear,
                forms: [],
            },
            {
                category: "Completed",
                categoryId: "GENERAL",
                icon: add_folder_linear,
                forms: []
            },
            {
                category: "Working On",
                categoryId: "GENERAL",
                icon: add_folder_linear,
                forms: []
            },
            {
                category: "Child Protection",
                categoryId: "CHILD_PROTECTION",
                icon: add_folder_linear,
                forms: [],
            }]
    } 

    else if (province === 'Ontario') {
        formsArrayData = [
            {
                category: "Divorce",
                categoryId: "DIVORCE",
                icon: add_folder_linear,
                forms: [
                    {
                        title: "Form 8A - Application (Divorce)",
                        shortTitle: "Form 8A",
                        id: "FORM_8A",
                        checked: false,
                        footer_text: 'FLR-8-E (2016/04)',
                        status: 'active',
                    },
                    {
                        title: "Form 13 - Financial Statement (Support Claims)",
                        shortTitle: "Form 13",
                        id: "FORM_13",
                        checked: false,
                        status: 'active',
                    },
                    {
                        title: "Form 13.1 - Financial Statement (Property and Support Claims)",
                        shortTitle: "Form 13.1",
                        id: "FORM_13_1",
                        checked: false,
                        status: 'active',
                    },
                    {
                        title: "Form 13.A - Certificate of Financial Disclosure",
                        shortTitle: "Form 13.A",
                        id: "FORM_13_A",
                        checked: false,
                        status: 'active',
                    },
                    {
                        title: "Form 13.B - Net Family Property Statement",
                        shortTitle: "Form 13.B",
                        id: "FORM_13_B",
                        checked: false,
                        status: 'active',
                    },
                ],
            },
            {
                category: "Completed",
                categoryId: "GENERAL",
                icon: add_folder_linear,
                forms: []
            },
            {
                category: "Working On",
                categoryId: "GENERAL",
                icon: add_folder_linear,
                forms: [
                    {
                        "title": "Form 6: Acknowledgement of Service",
                        "shortTitle": "Form 6",
                        "id": "ONTFORM6",
                        "checked": false,
                        "footer_text": "FLR-6-E (2005/09)",
                        "status": "active"
                    },
                    {
                        "title": "Form 6B : Affidavit of Service",
                        "shortTitle": "Form 6B",
                        "id": "ONTFORM6B",
                        "checked": false,
                        "footer_text": "FLR-6B-E (2016/04)",
                        "status": "active"
                    },
                    {
                        "title": "Form 8: Application (General)",
                        "shortTitle": "Form 8",
                        "id": "ONTFORM8",
                        "checked": false,
                        "footer_text": "FLR-8-E (2016/04)",
                        "status": "active"
                    },
                    {
                        "title": "Form 10: Answer",
                        "shortTitle": "Form 10",
                        "id": "ONTFORM10",
                        "checked": false,
                        "footer_text": "FLR 10 (February 1, 2022)",
                        "status": "active"
                    },
                    {
                        "title": "Form 10A: Reply",
                        "shortTitle": "Form 10A",
                        "id": "ONTFORM10A",
                        "checked": false,
                        "footer_text": "FLR-10A-E (2005/09)",
                        "status": "active"
                    },
                    {
                        "title": "Form 14: Notice of Motion",
                        "shortTitle": "Form 14",
                        "id": "ONTFORM14",
                        "checked": false,
                        "footer_text": "FLR 14 (March 1, 2018)",
                        "status": "active"
                    },
                    {
                        "title": "Form 14A: Affidavit (General - Case Reports)",
                        "shortTitle": "Form 14A",
                        "id": "ONTFORM14A",
                        "checked": false,
                        "footer_text": "FLR-14A-E (2005/09)",
                        "status": "active"
                    },
                    {
                        "title": "Form 14B: Motion Form",
                        "shortTitle": "Form 14B",
                        "id": "ONTFORM14B",
                        "checked": false,
                        "footer_text": "FLR 14B (September 1, 2021)",
                        "status": "active"
                    },
                    {
                        "title": "Form 14C : Confirmation of motion",
                        "shortTitle": "Form 14C",
                        "id": "ONTFORM14C",
                        "checked": false,
                        "footer_text": "FLR 14C (March 1, 2018)",
                        "status": "active"
                    },
                    {
                        "title": "Form 15: Motion to Change",
                        "shortTitle": "Form 15",
                        "id": "ONTFORM15",
                        "checked": false,
                        "footer_text": "FLR 15 (September 1, 2021)",
                        "status": "active"
                    },
                    {
                        "title": "Form 15B: Response to Motion to Change",
                        "shortTitle": "Form 15B",
                        "id": "ONTFORM15B",
                        "checked": false,
                        "footer_text": "FLR 15B December 1, 2020)",
                        "status": "active"
                    },
                    {
                        "title": "Form 15C: Consent Motion to Change",
                        "shortTitle": "Form 15C",
                        "id": "ONTFORM15C",
                        "checked": false,
                        "footer_text": "FLR 15C (December 1, 2020)",
                        "status": "active"
                    },
                    {
                        "title": "Form 17A: Case Conference Brief - General",
                        "shortTitle": "Form 17A",
                        "id": "ONTFORM17A",
                        "checked": false,
                        "footer_text": "FLR 17A (December 1, 2020)",
                        "status": "active"
                    },
                    {
                        "title": "Form 17C: Settlement Conference Brief - General",
                        "shortTitle": "Form 17C",
                        "id": "ONTFORM17C",
                        "checked": false,
                        "footer_text": "FLR 17C (December 1, 2020)",
                        "status": "active"
                    },
                    {
                        "title": "Form 17E: Trial management conference brief",
                        "shortTitle": "Form 17E",
                        "id": "ONTFORM17E",
                        "checked": false,
                        "footer_text": "FLR 17E (December 1, 2020)",
                        "status": "active"
                    },
                    {
                        "title": "Form 23: Summons to Witness",
                        "shortTitle": "Form 23",
                        "id": "ONTFORM23",
                        "checked": false,
                        "footer_text": "FLR-23-E (2005/09)",
                        "status": "active"
                    },
                    {
                        "title": "Form 25: Order (General)",
                        "shortTitle": "Form 25",
                        "id": "ONTFORM25",
                        "checked": false,
                        "footer_text": "FLR 25 (December 1, 2020)",
                        "status": "active"
                    },
                    {
                        "title": "Form 25A: Divorce Order",
                        "shortTitle": "Form 25A",
                        "id": "ONTFORM25A",
                        "checked": false,
                        "footer_text": "FLR-25A-E (2005/09)",
                        "status": "active"
                    },
                    {
                        "title": "Form 26B: Affidavit for Filing Domestic Contract with Court",
                        "shortTitle": "Form 26B",
                        "id": "ONTFORM26B",
                        "checked": false,
                        "footer_text": "FLR 26B (April 12, 2016)",
                        "status": "active"
                    },
                    {
                        "title": "Form 36: Affidavit for Divorce",
                        "shortTitle": "Form 36",
                        "id": "ONTFORM36",
                        "checked": false,
                        "footer_text": "FLR 36 (December 1, 2020)",
                        "status": "active"
                    },
                ]
            },
            {
                category: "Child Protection",
                categoryId: "CHILD_PROTECTION",
                icon: add_folder_linear,
                forms: [
                    {
                        title: "Child Protection",
                        id: "CHILD_PROTECTION_FORM_1",
                        checked: false,
                        footer_text: 'FLR-6B-E (2016/04)',
                        status: 'inactive',
                    },
                    {
                        title: "Child Protection 2",
                        id: "CHILD_PROTECTION_FORM_2",
                        checked: false,
                        footer_text: 'FLR-6B-E (2016/04)',
                        status: 'inactive',
                    },
                    {
                        title: "Child Protection 3",
                        id: "CHILD_PROTECTION_FORM_3",
                        checked: false,
                        footer_text: 'FLR-6B-E (2016/04)',
                        status: 'inactive',
                    },
                    {
                        title: "Child Protection 3",
                        id: "CHILD_PROTECTION_FORM_3",
                        checked: false,
                        footer_text: 'FLR-6B-E (2016/04)',
                        status: 'inactive',
                    },
                    {
                        title: "Ontario Components",
                        id: "ONTCOMPONENTS",
                        shortTitle: "Ontario Components",
                        checked: false,
                        footer_text: 'FLR-6B-E (2016/04)',
                        status: 'active',
                    },
                ],
            }]
    } 
    else {
        formsArrayData = [
            {
                category: "Divorce",
                categoryId: "DIVORCE",
                icon: add_folder_linear,
                forms: []
            },
            {
                category: "Child Protection",
                categoryId: "CHILD_PROTECTION",
                icon: add_folder_linear,
                forms: [],
            }]
    }



    return { formsArrayData }
}