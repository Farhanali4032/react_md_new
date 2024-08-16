import React from "react";
import Layout from "../components/LayoutComponents/Layout";
import BreadCrumb from "../components/BreadCrumb";
import TaskTypeForm from "../components/Tasks/TaskTypeForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const CreateTaskPage = ({ type }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const location = useLocation();

  const searchString = location.search.split("=")[1] || type;

  const includesMonthlyForm = searchString.includes("MONTHLY_FORM");

  const typeForm = includesMonthlyForm ? "MONTHLY_FORM" : "COMPLIANCE_FORM";

  const currPage = includesMonthlyForm
    ? "Add monthly review checklist"
    : "Add compliance form";

  return (
    <Layout title={`Welcome ${userInfo?.username ? userInfo?.username : ""}`}>
      <h5 className="calcTitle mb-0">Tasks / Add Monthly Review Checklist</h5>
      {/* <BreadCrumb options={[{ option: "Tasks", link: "/tasks" }]} currentPage={currPage}/> */}
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <TaskTypeForm type={typeForm} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateTaskPage;
