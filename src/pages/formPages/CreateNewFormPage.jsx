import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "../../components/LayoutComponents/Layout";
import GeneralModal from "../../components/Matters/Modals/GeneralModal";
import Dropdown from "../../components/Matters/Form/Dropdown";
import CustomCheckbox from "../../components/Matters/Form/CustomCheckbox";

import new_form from "../../assets/images/new_form.svg";
import laptop_gears from "../../assets/images/laptop_gears.svg";
import add_folder_linear from "../../assets/images/add_folder_linear.svg";
import searchIcon from "../../assets/images/search.svg";
import cross from "../../assets/images/cross.svg";
import { getAllMatters } from "../../utils/Apis/matters/getMatters/getMattersActions";
import { selectMattersData, selectMattersLoading } from "../../utils/Apis/matters/getMatters/getMattersSelectors";
import Loader from "../../components/Loader";
import CustomDropDown from "../../components/Matters/Form/CustomDropdown";
import { FormsArray } from "../../utils/matterData/MatterFormData";
import { selectSingleMatterData, selectSingleMatterLoading } from "../../utils/Apis/matters/getSingleMatter/getSingleMattersSelectors";
import { getSingleMatter, getSingleMatterReset } from "../../utils/Apis/matters/getSingleMatter/getSingleMattersActions";
import { Col, Row } from "react-bootstrap";

const CreateNewFormPage = ({ currentUserRole }) => {
    const dispatch = useDispatch();

    const { response } = useSelector((state) => state.userProfileInfo);
    const [showAddFormModal, setShowAddFormModal] = useState(false);
    const [matterData, setMatterData] = useState(null);

    const [formData, setFormData] = useState({
        clientName: "",
        matterNumber: "",
    });

    useEffect(() => {
        const { formsArrayData } = FormsArray(matterData?.province);
        setForms(formsArrayData)
    }, [matterData])

    useEffect(() => {
        if (formData.matterNumber) {
            dispatch(getSingleMatter(formData?.matterNumber))
        }

        return () => {
            // Reset the matter data when the component unmounts
            dispatch(getSingleMatterReset());
            setMatterData(null)
        };
    }, [dispatch, formData])

    const selectSingleMatter = useSelector(selectSingleMatterData);

    useEffect(() => {
        if (selectSingleMatter && selectSingleMatter.body[0] && matterData === null) {
            setMatterData(selectSingleMatter.body[0])
        }
    }, [selectSingleMatter, matterData])

    const [search, setSearch] = useState("");

    let history = useHistory();

    const [forms, setForms] = useState([]);

    const handleContinueAddForm = () => {
        setShowAddFormModal(false);
        setSearch("");
    }

    useEffect(() => {
        dispatch(getAllMatters())
    }, [])

    const selectAllMatters = useSelector(selectMattersData);

    const selectAllMattersLoading = useSelector(selectMattersLoading);

    const mattersList = selectAllMatters?.body.map(item => ({

        name: item.matterNumber,
        value: item.matterNumber,
    }));

    const handleClientNumberChange = (e, li) => {

        setMatterData(null)
        dispatch(getSingleMatterReset())

        setFormData({
            ...formData,
            matterNumber: li.value,
        });
    }

    const handleCreateNewFormSubmit = (e) => {
        e.preventDefault();

        let checkedForms = [];

        forms.map((form) => (
            form.forms.map((form) => (
                form.checked && checkedForms.push(form)
            ))
        ));

        dispatch({
            type: "UPDATE_SELECTED_FORMS",
            payload: checkedForms,
        });

        let serializedCheckedForms = JSON.stringify(checkedForms);

        localStorage.setItem('checkedForms', serializedCheckedForms)

        history.push({ pathname: "/forms/create-new/fill-pdf", state: { formData } });
    }


    return (
        <Layout title={`Welcome ${response.username ? response.username : ""}`}>
            {selectAllMattersLoading ? (
                <Loader isLoading={selectAllMattersLoading} />
            ) : (
                <div className="create-new-form-page panel trans">
                    <div className="pBody">

                        <div className="row matterType">
                            <div className="col-12">
                                <div className="new-form-container">

                                    <div className="head">
                                        <img src={new_form} alt="" />
                                        <div>New Form</div>
                                    </div>
                                    <div className="body py-4">
                                        <div className="content-container">
                                            <div className="content">
                                                <div className="input-row mb-3">
                                                    <label className="label">
                                                        What is the Matter Number of the client?
                                                    </label>
                                                    <div className="inputs">

                                                        <div className="input-item">
                                                            <label className="form-label mb-0">
                                                                Matter Number
                                                            </label>
                                                            <CustomDropDown
                                                                handleChange={handleClientNumberChange}
                                                                // list={selectAllMatters.body}
                                                                list={mattersList}
                                                                curListItem={formData.matterNumber}
                                                            ></CustomDropDown>
                                                        </div>
                                                    </div>
                                                </div>
                                                {matterData && (
                                                    <>
                                                        <p>Selected Matter Province: <strong>{matterData.province}</strong></p>
                                                        <p>Client Name: <strong>{matterData.client_id}</strong></p>
                                                        <p>Please select the forms you want to create from following folders</p>
                                                        {forms.map((form, index) => (
                                                            <div className="folder" key={index} onClick={() => {
                                                                setSearch("");
                                                                setShowAddFormModal(index + 1);
                                                            }}>
                                                                <span className="folder-icon" style={{ backgroundImage: `url(${form.icon})` }} />
                                                                <span className="folder-name">{form.category}</span>
                                                            </div>
                                                        ))}
                                                        <div className="output-forms">
                                                            {forms.map((form, index) => (
                                                                form.forms.map((form, index_form) => (
                                                                    form.checked && (
                                                                        <div className="form" key={`${index}-${index_form}`}>
                                                                            <span className="name">{form.title}</span>
                                                                            <span className="icon" style={{ backgroundImage: `url(${cross})` }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    e.preventDefault();

                                                                                    const newForms = [...forms];
                                                                                    newForms[index].forms[index_form].checked = false;
                                                                                    setForms(newForms);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )
                                                                ))
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="img" style={{ backgroundImage: `url(${laptop_gears})` }}></div>
                                        </div>
                                        <div className="action">
                                            <button
                                                className="btn btnPrimary rounded-pill"
                                                onClick={handleCreateNewFormSubmit}
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Modals */}

                        {/* BEGIN::Add Forms Modal */}
                        <GeneralModal
                            show={showAddFormModal}
                            changeShow={() => setShowAddFormModal(false)}
                            handleClick={() => setShowAddFormModal(false)}
                            action=""
                            // handleContinue={(state) => handleContinue(state)}
                            handleContinue={() => handleContinueAddForm()}
                            heading={`Please select forms from - ${matterData?.province}`}
                            size="sm"
                            dialogClassName={"newFormModal"}
                            actions={
                                [
                                    {
                                        label: "Continue",
                                        class: "btn btnPrimary rounded-pill",
                                        action: () => handleContinueAddForm(),
                                    },
                                ]
                            }
                        >
                            <div className="add-forms-modal-body">
                                <div className="content">
                                    <div className="left">
                                        <div className="search">
                                            <input type="text" placeholder="Search"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                }}
                                            />
                                            <div className="icon" style={{ backgroundImage: `url(${searchIcon})` }} />
                                        </div>
                                        <div className="navbar">
                                            {forms.map((form, index) => (

                                                <div
                                                    className={showAddFormModal === index + 1 ? "folder active" : "folder"}
                                                    key={index} onClick={() => {
                                                        setShowAddFormModal(index + 1);
                                                        setSearch("");
                                                    }}>
                                                    <span className="folder-icon" style={{ backgroundImage: `url(${form.icon})` }} />
                                                    <span className="folder-name">{form.category}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="right">
                                        {search !== "" ? (
                                            forms.map((form, index) => (
                                                <div className="forms" key={index}>
                                                    {form.forms.filter((form) => form.title.toLowerCase().includes(search.toLowerCase())).map((form, index_form) => (
                                                        <div className="form-checkbox" key={`${index}-${index_form}`} onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();

                                                            const newForms = [...forms];
                                                            newForms[index].forms[index_form].checked = !newForms[index].forms[index_form].checked;
                                                            setForms(newForms);
                                                        }}>

                                                            <CustomCheckbox label={form.title} checked={form.checked} />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            forms.map((form, index) => (
                                                showAddFormModal === index + 1 && (

                                                    <div className="forms" key={index}>
                                                        {form.forms.map((form, index_form) => (
                                                            form.status == 'active' && (
                                                                <div className="form-checkbox" key={`${index}-${index_form}`} onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();

                                                                    const newForms = [...forms];
                                                                    newForms[index].forms[index_form].checked = !newForms[index].forms[index_form].checked;
                                                                    setForms(newForms);
                                                                }}>

                                                                    <CustomCheckbox label={form.title} checked={form.checked} />
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                )
                                            ))
                                        )}

                                    </div>
                                </div>
                            </div>

                        </GeneralModal>
                        {/* END::Add Forms Modal */}

                    </div>
                </div>
            )
            }

        </Layout >
    );
};



export default CreateNewFormPage;
