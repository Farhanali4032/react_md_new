import { useEffect, useState, useCallback } from 'react'

import { useDropzone } from 'react-dropzone';
import { Table } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import CustomCheckbox from '../Form/CustomCheckbox';
import GeneralModal from '../Modals/GeneralModal';

import add_folder_linear from "../../../assets/images/add_folder_linear.svg";
import folder from "../../../assets/images/folder.svg";
import searchIcon from "../../../assets/images/search.svg";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FormsArray } from '../../../utils/matterData/MatterFormData';

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        console.log("🚀 ~ onDrop ~ acceptedFiles:", acceptedFiles)
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <>
                        <img className="icon" src={folder} alt="folder" />
                        <p className="label">Drag your document here to start uploading</p>
                        <div className="divider">
                            <span>OR</span>
                        </div>
                        <button className="btn btnDefault blue">Browse Files</button>
                    </>
            }
        </div>
    )
}

const Forms = ({ files, formsData, matterId, province }) => {
    const [showAddFormModal, setShowAddFormModal] = useState(false);
    const [showUploadFormModal, setShowUploadFormModal] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [search, setSearch] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
    const dispatch = useDispatch();
    let history = useHistory();
    const [selectedFiles, setSelectedFiles] = useState([])
    console.log("🚀 ~ Forms ~ selectedFiles:", selectedFiles)
    console.log("🚀 ~ Forms ~ selectedCheckboxes:", selectedCheckboxes)

    const [forms, setForms] = useState([]);

        useEffect(() => {
            const {formsArrayData} = FormsArray(province);
            setForms(formsArrayData)
        }, [])

    const handleContinueAddForm = () => {

        setShowAddFormModal(false);
        setSearch("");
        formsData(forms);

        // set all forms to unchecked
        const newForms = [...forms];
        newForms.forEach((category) => {
            category.forms.forEach((form) => {
                form.checked = false;
            });
        });
    }

    const openFiles = () => {
        const files = selectedCheckboxes;
        console.log("🚀 ~ openFiles ~ files:", files)

        dispatch({
            type: "UPDATE_SELECTED_FORMS",
            payload: selectedFiles,
        });

        let serializedCheckedForms = JSON.stringify(selectedFiles);
        console.log("🚀 ~ handleCreateNewFormSubmit ~ serializedCheckedForms:", selectedFiles)
        localStorage.setItem('checkedForms', selectedFiles)

        let formData = {
            clientName: "",
            matterNumber: matterId,
        }

        history.push({ pathname: "/forms/create-new/fill-pdf", state: { formData } });
    }

    const handleCheckboxChange = (id, isChecked, docId) => {
        if (isChecked) {
            setSelectedCheckboxes([...selectedCheckboxes, id]);
            setSelectedFiles([...selectedFiles, {
                folder_id: docId.folder_id,
                file_name: docId.file_name,
                file_id: docId.id,
                type: docId.type,
                status: docId.status,
                docId: docId.docId,
                title: docId.file_name,
                shortTitle: docId.docId,
                id: docId.docId,
                checked: true
            }])
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter((checkboxId) => checkboxId.id !== id));
        }
    };

    return (
        <div className="forms-container">
            <div className="info">
                <div className="title">1. Forms</div>
                <div className="description">Please complete the following pre-filled forms</div>
            </div>
            <div className="documents-table">
                <Table
                    hover
                    className="table reports-table reports-table-primary"
                >
                    <thead>
                        <tr>
                            <th scope="col">Document</th>
                            <th scope="col">Created On</th>
                            {/* <th scope="col">Status</th> */}

                            <th scope="col">Sign off</th>
                        </tr>
                    </thead>
                    <tbody>

                        {files.map((file, index) => (
                            <>
                                {/* {JSON.stringify(file)} */}
                                <tr key={index} >
                                    <td className="folder file">
                                        <CustomCheckbox id={file.id} docId={file} label={file.title || file.file_name} onChange={handleCheckboxChange} checked={selectedCheckboxes.includes(file.id)} />
                                    </td>
                                    <td>{moment(file.createdOn).format('D-MM-YYYY')}</td>
                                    {/* <td>
                                    {file.status === 'Open' ? (
                                         <span className="statusBadge statusBadge-success"
                                        >{file.status}</span>
                                    ):(
                                        <span className="statusBadge statusBadge-success"
                                    >{file.status}</span>
                                    )}
                                  
                                
                                </td> */}

                                    <td>{file.signOff}</td>
                                </tr>
                            </>
                        ))}

                    </tbody>
                </Table>
            </div>
            <div className="forms-actions">
                {selectedCheckboxes.length > 0 ? (
                    <>
                        <span className="statusBadge" onClick={""}>Add Support Calc</span>
                        <span className="statusBadge" onClick={""}>Download</span>
                        <span className="statusBadge" onClick={() => setShowUploadFormModal(true)}>Upload</span>
                        <span className="statusBadge" onClick={() => setShowAddFormModal(1)}>Add Forms</span>
                        <span className="statusBadge" onClick={""}>Complete Forms</span>
                        <span className="statusBadge" onClick={""}>Sign off</span>
                        <span className="statusBadge" onClick={() => openFiles()}>Open Files</span>
                    </>
                ) : (
                    <>
                        <span className="statusBadge" onClick={() => setShowUploadFormModal(true)}>Upload</span>
                        <span className="statusBadge" onClick={() => setShowAddFormModal(1)}>Add Forms</span>
                    </>
                )}
            </div>
            {/* BEGIN::Modals */}

            {/* BEGIN::Add Forms Modal */}
            <GeneralModal
                show={showAddFormModal}
                changeShow={() => setShowAddFormModal(false)}
                handleClick={() => setShowAddFormModal(false)}
                action=""
                handleContinue={() => handleContinueAddForm()}
                heading="Please select forms from below list"
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

            {/* BEGIN::Upload Forms Modal */}
            <GeneralModal
                show={showUploadFormModal}
                changeShow={() => setShowUploadFormModal(false)}
                handleClick={() => setShowUploadFormModal(false)}
                action=""
                // handleContinue={(state) => handleContinue(state)}
                handleContinue={() => handleContinueAddForm()}
                heading="Add File"
                size="sm"
                dialogClassName={"summaryModal upload-forms-modal"}
                actions={
                    [
                        {
                            label: "Confirm",
                            class: "btn btnDefault border-2",
                            action: () => handleContinueAddForm(),
                        },
                    ]
                }
            >
                <div className="upload-forms-modal-body">
                    <div className="form-group">
                        <label>Name the Document</label>
                        <input type="text" className="form-control" placeholder="Enter Document Name" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
                    </div>

                    <MyDropzone />
                </div>

            </GeneralModal>
            {/* END::Upload Forms Modal */}

            {/* END::Modals */}
        </div>
    )
}

export default Forms