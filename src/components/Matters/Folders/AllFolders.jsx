import React from 'react'
import { Table } from "react-bootstrap";

import folder_outline from "../../../assets/images/folder_outline.svg";

const AllFolders = ({
    dirState,
    handleDirClick,

}) => {

    return (
        <div className="docs-container">
            <div className="documents-table">
                <Table
                    hover
                    className="reports-table reports-table-primary"
                >
                    <thead>
                        <tr>
                            <th>Folder</th>
                            <th>Created On</th>
                            <th>Type</th>
                            <th>Status</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {dirState && dirState.map((folder, index) => (
                            <tr key={index}>
                            <td className="folder" onClick={() => handleDirClick(folder)}>
                                <span className="folder-icon" style={{ backgroundImage: `url(${folder_outline})` }}></span>
                                <span className="folder-name">{folder.title}</span>
                            </td>
                            <td>{folder.created}</td>
                            <td>{folder.type}</td>
                            <td>
                                <span onClick={() => handleDirClick(folder)} className="statusBadge">Open</span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AllFolders