import { useState, useEffect } from 'react'

import Dropdown from "../../components/Matters/Form/Dropdown";
import InputCustom from "../../components/InputCustom";

import lawyer from "../../assets/images/lawyer.svg";
import { useDispatch, useSelector } from 'react-redux';
import { selectDataSingleMatterData, selectDataSingleMatterLoading } from '../../utils/Apis/matters/getSingleMatterData/getSingleMattersDataSelectors';
import { getSingleMatterData } from '../../utils/Apis/matters/getSingleMatterData/getSingleMattersDataActions';
import { childData } from '../../utils/matterData/sampleData';
import { ChildrenData } from '../../utils/Apis/matters/CustomHook/DocumentViewDataUpdate';
import Loader from '../../components/Loader';
import { calculateAge } from '../../utils/matterValidations/matterValidation';
const ChildrenInformationSimple = ({ matterId, onUpdateFormData }) => {

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(null);
    const [childrenNumber, setChildrenNumber] = useState(0);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch()

    const { selectChildrenData, selectChildrenDataLoading } = ChildrenData(matterId)

    useEffect(() => {

        if (selectChildrenData && !selectChildrenDataLoading) {
            setChildrenData(selectChildrenData.body)
            const childNumber = selectChildrenData?.body.length;
            setChildrenNumber(childNumber)
            setCount(childNumber)
            setActiveTab(1);
            setLoading(false)
        } else {
            setLoading(true)
        }

    }, [selectChildrenData, selectChildrenDataLoading])


    const [childrenData, setChildrenData] = useState([
        {
            childName: "",
            nowLivesWith: "",
            dateOfBirth: "",
            age: "",
            representedByLawyer: "",
            lawyerName: "",
            lawyerPhone: "",
            lawyerAddress: "",
            lawyerEmail: "",
        },
    ]);

    



    useEffect(() => {
        onUpdateFormData({
            type: 'children',
            children:
                Object.values(childrenData),
        })
    }, [childrenData])

    const handleChildrenNumberChange = (e) => {
        let value = e.target.value;

        value = parseInt(value);

        if (isNaN(value)) {
            value = 0;
        }

        if (value < 0) {
            value = 0;
        }

        if (value > 0) {
            setActiveTab(1);
        }



        setChildrenNumber(value);

        const numberOfProperties = Object.keys(childrenData).length;

        if (value > 0) {
            if (value > numberOfProperties) {
                let newChildrenData = childrenData;

                for (let i = numberOfProperties; i < value; i++) {
                    newChildrenData[i] = {
                        childName: "",
                        nowLivesWith: "",
                        dateOfBirth: "",
                        age: "",
                        representedByLawyer: "",
                        lawyerName: "",
                        lawyerPhone: "",
                        lawyerAddress: "",
                        lawyerEmail: "",
                    };
                }
                setChildrenData((prevState) => ({
                    ...prevState,
                    ...newChildrenData,
                }));
            } else if (value < numberOfProperties) {
                let newChildrenData = childrenData;

                for (let i = numberOfProperties; i > value; i--) {
                    delete newChildrenData[i - 1];
                }

                setChildrenData(newChildrenData);
            }
        }
    }

    const handleChildrenDataChange = (e) => {
        let key = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.key;
        let age;
        let value = e.target.value;

        if (e.target.name === 'dateOfBirth') {
            
            setChildrenData((prevState) => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    ['age']: calculateAge(value),
                },
            }));
        }

        setChildrenData((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                [e.target.name]: value,
            },
        }));
    }

    const handleNowLivesWithChange = (e, li) => {
        let key = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.key;

        setChildrenData((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                nowLivesWith: li.value,
            },
        }));
    }

    const handleRepresentedByLawyerChange = (e, li) => {
        let key = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.key;

        setChildrenData((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                representedByLawyer: li.value,
            },
        }));

        // remove the lawyer data if representedByLawyer is "No"
        if (li.value === "No") {
            setChildrenData((prevState) => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    lawyerName: "",
                    lawyerPhone: "",
                    lawyerAddress: "",
                    lawyerEmail: "",
                },
            }));
        }
    }

    const nowLivesWithList = [
        {
            name: "Mother",
            value: "Mother",
        },
        {
            name: "Father",
            value: "Father",
        },
        {
            name: "Both",
            value: "Both",
        },
        {
            name: "Other",
            value: "Other",
        },
    ];

    const yesNoList = [
        {
            name: "Yes",
            value: "Yes",
        },
        {
            name: "No",
            value: "No",
        },
    ];

    return (
        <>
            {loading ? (
                <Loader isLoading={loading} />
            ) : (
                <div className="accordion-body">
                    {childrenNumber > 0 && (
                        <div className="tab-actions pb-30px">
                            {[...Array(childrenNumber)].map((item, index) => (
                                <div
                                    key={index}
                                    className={`tab-action ${activeTab === index + 1 ? "active" : ""
                                        }`}
                                    onClick={() => setActiveTab(index + 1)}
                                >
                                    {`Child ${index + 1}`}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="d-flex flex-row gap-4 pb-4">
                        <InputCustom
                            label="Number of Children"
                            type="text"
                            placeholder="Enter number of children"
                            name="numberOfChildren"
                            value={childrenNumber || ''}
                            handleChange={handleChildrenNumberChange}
                            labelClassNames={"w-100"}
                            formGroupClassNames={"d-flex flex-row"}
                        />

                    </div>

                    {childrenNumber && childrenNumber > 0 && (
                        <div className="pb-30px matterType">
                            {[...Array(childrenNumber)].map((item, index) => (
                                activeTab === index + 1 && (
                                    <div className="tab-content" data-key={index} key={index}>
                                        <div className="inputs-group">
                                            <div className="inputs-row labeled pb-20px">
                                                <div className="inputs inputs-2-3">
                                                    <label className="form-label mb-0">
                                                        Full Legal Name
                                                    </label>
                                                    <InputCustom
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        name="childName"
                                                        value={childrenData[index].childName || ""}
                                                        handleChange={handleChildrenDataChange}
                                                    />
                                                </div>
                                                <div className="inputs inputs-2-3">
                                                    <label className="form-label mb-0">
                                                        Now lives with
                                                    </label>
                                                    <Dropdown
                                                        handleChange={handleNowLivesWithChange}
                                                        list={nowLivesWithList}
                                                        curListItem={childrenData[index].nowLivesWith || ""}
                                                    ></Dropdown>
                                                </div>
                                            </div>
                                            <div className="inputs-row labeled pb-20px">
                                                <div className="inputs inputs-2-3">
                                                    <label className="form-label mb-0">
                                                        Date of Birth
                                                    </label>
                                                    <InputCustom
                                                        type="date"
                                                        placeholder="Choose Date"
                                                        name="dateOfBirth"
                                                        value={childrenData[index].dateOfBirth || ""}
                                                        handleChange={handleChildrenDataChange}
                                                    />
                                                </div>
                                                <div className="inputs inputs-2-3">
                                                    <label className="form-label mb-0">Represented by Lawyer?</label>
                                                    <Dropdown
                                                        handleChange={handleRepresentedByLawyerChange}
                                                        list={yesNoList}
                                                        curListItem={childrenData[index].representedByLawyer || ""}
                                                    ></Dropdown>
                                                </div>
                                            </div>
                                            <div className="inputs-row labeled pb-20px">
                                                <div className="inputs inputs-2-3">
                                                    <label className="form-label mb-0">Age</label>
                                                    <InputCustom
                                                        type="text"
                                                        placeholder="Age"
                                                        name="age"
                                                        disabled={true}
                                                        value={calculateAge(childrenData[index].dateOfBirth)}
                                                        handleChange={handleChildrenDataChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {childrenData[index].representedByLawyer === "Yes" && (
                                            <>
                                                <div className="sub-heading pt-0">
                                                    <img src={lawyer} alt="Laywer" />
                                                    <span>Lawyer</span>
                                                </div>

                                                <div className="inputs-group pb-10px">
                                                    <div className="inputs-row labeled pb-20px">
                                                        <div className="inputs inputs-2-3">
                                                            <label className="form-label mb-0">
                                                                Full Name
                                                            </label>
                                                            <InputCustom
                                                                type="text"
                                                                placeholder="Enter Name"
                                                                name="lawyerName"
                                                                value={childrenData[index].lawyerName || ""}
                                                                handleChange={handleChildrenDataChange}
                                                            />
                                                        </div>
                                                        <div className="inputs inputs-2-3">
                                                            <label className="form-label mb-0">Phone</label>
                                                            <InputCustom
                                                                type="text"
                                                                placeholder="Write Phone"
                                                                name="lawyerPhone"
                                                                value={childrenData[index].lawyerPhone || ""}
                                                                handleChange={handleChildrenDataChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="inputs-row labeled pb-20px">
                                                        <div className="inputs inputs-2-3">
                                                            <label className="form-label mb-0">Address</label>
                                                            <InputCustom
                                                                type="text"
                                                                placeholder="Write Address"
                                                                name="lawyerAddress"
                                                                value={childrenData[index].lawyerAddress || ""}
                                                                handleChange={handleChildrenDataChange}
                                                            />
                                                        </div>
                                                        <div className="inputs inputs-2-3">
                                                            <label className="form-label mb-0">Email</label>
                                                            <InputCustom
                                                                type="text"
                                                                placeholder="Write Email"
                                                                name="lawyerEmail"
                                                                value={childrenData[index].lawyerEmail || ""}
                                                                handleChange={handleChildrenDataChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ChildrenInformationSimple