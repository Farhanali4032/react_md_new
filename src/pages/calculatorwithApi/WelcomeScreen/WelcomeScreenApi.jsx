import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Layout from "../../../components/LayoutComponents/Layout";
import RadioInput from "../../../components/LayoutComponents/RadioInput";
import { getAllUserInfo, getUserSID, isENVPROD } from "../../../utils/helpers";
import calculationImg from "../../../assets/images/calculationImg.svg";
import axios from "../../../utils/axios";
import {
  CHILD_SUPPORT_CAL,
  SPOUSAL_SUPPORT_CAL,
  CHILD_AND_SPOUSAL_SUPPORT_CAL,
  clearCookieForCalculatorLabel,
} from "../Calculator";
import ExistingCalculations from "../../../containers/Dashboard/ExistingCalculations";
import { AiOutlineFile } from "react-icons/ai";
import { AUTH_ROUTES } from "../../../routes/Routes.types";
import ComplianceSelector from "../../../components/Tasks/ComplianceSelector";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearClientDetailsFromFileAction,
  clientDetailsFromFileAction,
  matterClientsAction,
} from "../../../actions/matterActions";

const WelcomeScreenApi = ({
  currentUserRole,
}: {
  currentUserRole: string,
}): ReactJSXElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: matterClients } = useSelector((state) => state.matterClients);
  const [matterDisplayList, setMatterDisplayList] = useState([]);
  const userInfoStore = useSelector((state) => state.userProfileInfo.response);
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState({
    type: "Child Support",
    calculatorType: CHILD_SUPPORT_CAL,
  });
  const [selectedValues, setSelectedValues] = useState({
    typeOfTask: "",
    taskSelected: "",
    month: "",
    account: "",
    showError: "",
    clientNo: "",
    clientId: "",
    fileNo: "",
    province_form: "",
    clio_trust_account: "",
    clio_trust_account_id: null,
  });

  const typeOfCalculations = [
    {
      value: "Child Support",
      type: CHILD_SUPPORT_CAL,
    },
    {
      value: "Spousal Support",
      type: SPOUSAL_SUPPORT_CAL,
    },
    {
      value: "Child and Spousal Support",
      type: CHILD_AND_SPOUSAL_SUPPORT_CAL,
    },
  ];

  useEffect(() => {
    clearCookieForCalculatorLabel();
    dispatch(matterClientsAction());
    dispatch(clearClientDetailsFromFileAction());
  }, []);

  useEffect(() => {
    if (selectedValues.clientNo) {
      const getMatterDisplayNumbers = async () => {
        try {
          const {
            data: {
              data: { body },
            },
          } = await axios.get(
            `/matterdisplayNumber/${getUserSID()}/${selectedValues.clientId}`
          );

          if (body) {
            const flags = [];
            const filteredData = body.filter((item) => {
              if (flags[item.matter_display_nbr]) {
                return false;
              }
              flags[item.matter_display_nbr] = true;
              return true;
            });
            setMatterDisplayList(filteredData);
          }
        } catch (error) {
          alert("Error fetching matter display Number");
        }
      };
      getMatterDisplayNumbers();
    }
  }, [selectedValues.clientNo, selectedValues.clientId]);

  useEffect(() => {
    const getMatterDisplayTask = async () => {
      dispatch(clientDetailsFromFileAction(selectedValues.fileNo));
    };

    if (selectedValues.fileNo) {
      getMatterDisplayTask();
    }
  }, [selectedValues.fileNo]);

  const nextPage = () => {
    history.push(
      `${
        isENVPROD() ? AUTH_ROUTES.PROD_CALCULATOR : AUTH_ROUTES.API_CALCULATOR
      }?id=null&step=1&type=${selectedType.calculatorType}`
    );
  };

  const handleInputChange = (params, e) => {
    if (params === "ClientNo") {
      return setSelectedValues({
        ...selectedValues,
        clientNo: e.client_name,
        clientId: e.client_id,
        fileNo: "",
      });
    } else if (params === "FileNo") {
      return setSelectedValues({ ...selectedValues, fileNo: e });
    } else if (params === "cliotrustAccount") {
      return setSelectedValues({
        ...selectedValues,
        clio_trust_account: e.account_name,
        clio_trust_account_id: e.bank_account_id,
      });
    } else {
      return "";
    }
  };


  


  useEffect(() => {
    setName(
      `${
        userInfoStore?.first_name !== undefined ? userInfoStore?.first_name : ""
      } ${
        userInfoStore?.first_name !== undefined ? userInfoStore?.last_name : ""
      }`
    );
  }, [userInfoStore]);


  

  return (
    // <Layout title={`Welcome ${getAllUserInfo().username}`}>
      <Layout title={`Welcome ${name}`}>
      <h5 className="calcTitle">Family Law Calculator Api Version</h5>
      <div className="panel calculations">
        <div className="pBody">
          <div className="calInfo">
            <div className="pHead">
              <span className="h5">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_352_81451)">
                    <path
                      opacity="0.5"
                      d="M28.395 6.66033V27.9036C28.395 27.946 28.3943 27.9884 28.3922 28.0309C28.3257 29.4857 27.1247 30.6458 25.6522 30.6458H10.2331C8.71817 30.6458 7.49023 29.4179 7.49023 27.9036V3.30818C7.49023 2.00606 8.3972 0.916008 9.61381 0.635391C9.81315 0.589477 10.0203 0.56543 10.2331 0.56543H22.4809C22.8973 0.56543 23.3038 0.660141 23.6721 0.838313C24.413 1.19494 24.6217 1.64557 25.9533 3.0071C27.4852 4.67048 27.8509 4.84099 28.1631 5.56113C28.3151 5.90461 28.395 6.2779 28.395 6.66033Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      opacity="0.7"
                      d="M28.3943 6.6604V27.9037C28.3943 27.9461 28.3936 27.9885 28.3915 28.031C28.1922 28.077 27.985 28.1009 27.7723 28.1009H12.3532C10.8383 28.1009 9.61035 26.8731 9.61035 25.3588V0.763359C9.61035 0.720258 9.61106 0.677789 9.61316 0.635391C9.8125 0.589477 10.0196 0.56543 10.2324 0.56543H22.4803C22.8967 0.56543 23.3031 0.660141 23.6714 0.838312C23.974 0.98393 24.2504 1.18608 24.4844 1.43639L25.9527 3.00717L27.6337 4.76597C27.8578 4.99997 28.036 5.26927 28.1624 5.56127C28.3145 5.90468 28.3943 6.27797 28.3943 6.6604Z"
                      fill="#F5F9FF"
                    ></path>
                    <path
                      d="M35.4314 16.1738V31.5943C35.4314 32.4518 35.1529 33.245 34.6806 33.8868C33.9758 34.8468 32.8384 35.4703 31.5554 35.4703H21.4834C19.3429 35.4703 17.6074 33.7349 17.6074 31.5943V16.1738C17.6074 14.5741 18.5773 13.2006 19.9607 12.6089C20.428 12.4089 20.9426 12.2979 21.4834 12.2979H31.5555C33.6966 12.2979 35.4314 14.0333 35.4314 16.1738Z"
                      fill="#307FF4"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M35.4313 16.1738V31.5943C35.4313 32.4518 35.1528 33.245 34.6806 33.8868C34.2133 34.0869 33.6987 34.1979 33.1579 34.1979H23.0859C20.9454 34.1979 19.21 32.4624 19.21 30.3219V14.9014C19.21 14.0439 19.4885 13.2507 19.9607 12.6089C20.428 12.4089 20.9426 12.2979 21.4834 12.2979H31.5554C33.6966 12.2979 35.4313 14.0333 35.4313 16.1738Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M28.0046 26.3121V28.1232C28.0046 28.4434 27.7451 28.7028 27.4256 28.7028H25.6138C25.2936 28.7028 25.0342 28.4434 25.0342 28.1232V26.3121C25.0342 25.9919 25.2936 25.7324 25.6138 25.7324H27.4256C27.7451 25.7324 28.0046 25.9918 28.0046 26.3121Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M32.7672 15.8104V17.7508C32.7672 18.4408 32.208 19.0006 31.5174 19.0006H21.5203C20.8303 19.0006 20.2705 18.4407 20.2705 17.7508V15.8104C20.2705 15.1204 20.8304 14.5605 21.5203 14.5605H31.5174C32.208 14.5605 32.7672 15.1204 32.7672 15.8104Z"
                      fill="#F5F9FF"
                    ></path>
                    <path
                      opacity="0.9"
                      d="M32.7676 15.8104V17.7508C32.7676 18.4408 32.2084 19.0006 31.5178 19.0006H23.6414C22.9514 19.0006 22.3916 18.4407 22.3916 17.7508V15.8104C22.3916 15.1204 22.9515 14.5605 23.6414 14.5605H31.5177C32.2084 14.5605 32.7676 15.1204 32.7676 15.8104Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M23.2426 26.3121V28.1232C23.2426 28.4434 22.9832 28.7028 22.663 28.7028H20.8511C20.5316 28.7028 20.2715 28.4434 20.2715 28.1232V26.3121C20.2715 25.9919 20.5316 25.7324 20.8511 25.7324H22.663C22.9832 25.7324 23.2426 25.9918 23.2426 26.3121Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M28.0046 21.5757V23.3869C28.0046 23.7071 27.7451 23.9665 27.4256 23.9665H25.6138C25.2936 23.9665 25.0342 23.7071 25.0342 23.3869V21.5757C25.0342 21.2555 25.2936 20.9961 25.6138 20.9961H27.4256C27.7451 20.9961 28.0046 21.2555 28.0046 21.5757Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M32.8249 21.5757V23.3869C32.8249 23.7071 32.5655 23.9665 32.2453 23.9665H30.4341C30.1139 23.9665 29.8545 23.7071 29.8545 23.3869V21.5757C29.8545 21.2555 30.1139 20.9961 30.4341 20.9961H32.2453C32.5655 20.9961 32.8249 21.2555 32.8249 21.5757Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M23.2426 21.5757V23.3869C23.2426 23.7071 22.9832 23.9665 22.663 23.9665H20.8511C20.5316 23.9665 20.2715 23.7071 20.2715 23.3869V21.5757C20.2715 21.2555 20.5316 20.9961 20.8511 20.9961H22.663C22.9832 20.9961 23.2426 21.2555 23.2426 21.5757Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M28.0046 30.8153V32.6271C28.0046 32.9473 27.7451 33.2068 27.4256 33.2068H25.6138C25.2936 33.2068 25.0342 32.9473 25.0342 32.6271V30.8153C25.0342 30.4958 25.2936 30.2363 25.6138 30.2363H27.4256C27.7451 30.2363 28.0046 30.4958 28.0046 30.8153Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M23.2426 30.8153V32.6271C23.2426 32.9473 22.9832 33.2068 22.663 33.2068H20.8511C20.5316 33.2068 20.2715 32.9473 20.2715 32.6271V30.8153C20.2715 30.4958 20.5316 30.2363 20.8511 30.2363H22.663C22.9832 30.2363 23.2426 30.4958 23.2426 30.8153Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M32.8249 26.5935V32.2183C32.8249 32.7648 32.3824 33.2073 31.8367 33.2073H30.8427C30.297 33.2073 29.8545 32.7647 29.8545 32.2183V26.5935C29.8545 26.1177 30.2404 25.7324 30.7155 25.7324H31.9639C32.4397 25.7325 32.8249 26.1177 32.8249 26.5935Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M28.0046 26.3121V26.8507C28.0046 27.1709 27.7451 27.4304 27.4256 27.4304H25.6138C25.2936 27.4304 25.0342 27.1709 25.0342 26.8507V26.3121C25.0342 25.9919 25.2936 25.7324 25.6138 25.7324H27.4256C27.7451 25.7324 28.0046 25.9918 28.0046 26.3121Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M23.2426 26.3121V26.8507C23.2426 27.1709 22.9832 27.4304 22.663 27.4304H20.8511C20.5316 27.4304 20.2715 27.1709 20.2715 26.8507V26.3121C20.2715 25.9919 20.5316 25.7324 20.8511 25.7324H22.663C22.9832 25.7324 23.2426 25.9918 23.2426 26.3121Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M28.0046 21.5757V22.1144C28.0046 22.4346 27.7451 22.6941 27.4256 22.6941H25.6138C25.2936 22.6941 25.0342 22.4346 25.0342 22.1144V21.5757C25.0342 21.2555 25.2936 20.9961 25.6138 20.9961H27.4256C27.7451 20.9961 28.0046 21.2555 28.0046 21.5757Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M32.8249 21.5757V22.1144C32.8249 22.4346 32.5655 22.6941 32.2453 22.6941H30.4341C30.1139 22.6941 29.8545 22.4346 29.8545 22.1144V21.5757C29.8545 21.2555 30.1139 20.9961 30.4341 20.9961H32.2453C32.5655 20.9961 32.8249 21.2555 32.8249 21.5757Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M23.2426 21.5757V22.1144C23.2426 22.4346 22.9832 22.6941 22.663 22.6941H20.8511C20.5316 22.6941 20.2715 22.4346 20.2715 22.1144V21.5757C20.2715 21.2555 20.5316 20.9961 20.8511 20.9961H22.663C22.9832 20.9961 23.2426 21.2555 23.2426 21.5757Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M28.0046 30.8153V31.3546C28.0046 31.6749 27.7451 31.9343 27.4256 31.9343H25.6138C25.2936 31.9343 25.0342 31.6749 25.0342 31.3546V30.8153C25.0342 30.4958 25.2936 30.2363 25.6138 30.2363H27.4256C27.7451 30.2363 28.0046 30.4958 28.0046 30.8153Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M23.2426 30.8153V31.3546C23.2426 31.6749 22.9832 31.9343 22.663 31.9343H20.8511C20.5316 31.9343 20.2715 31.6749 20.2715 31.3546V30.8153C20.2715 30.4958 20.5316 30.2363 20.8511 30.2363H22.663C22.9832 30.2363 23.2426 30.4958 23.2426 30.8153Z"
                      fill="#FBFCFE"
                    ></path>
                    <path
                      d="M32.8249 26.5935V30.9459C32.8249 31.4924 32.3824 31.9348 31.8367 31.9348H30.8427C30.297 31.9348 29.8545 31.4923 29.8545 30.9459V26.5935C29.8545 26.1177 30.2404 25.7324 30.7155 25.7324H31.9639C32.4397 25.7325 32.8249 26.1177 32.8249 26.5935Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      opacity="0.5"
                      d="M28.1632 5.56162H24.7263C24.144 5.56162 23.6719 5.08954 23.6719 4.50721V0.838867C23.9746 0.984414 24.251 1.18649 24.4848 1.43652L25.9536 3.00745L27.6344 4.76652C27.8582 5.00038 28.0363 5.26975 28.1632 5.56162Z"
                      fill="#73C3FD"
                    ></path>
                    <path
                      d="M15.7984 33.8031C15.7984 34.1728 15.6471 34.5079 15.4039 34.7517C15.16 34.9949 14.825 35.1462 14.4553 35.1462H6.2269C5.4882 35.1462 4.88379 34.5418 4.88379 33.8031C4.88379 33.4334 5.0351 33.0983 5.27824 32.8544C5.52216 32.6113 5.8572 32.46 6.2269 32.46H14.4553C15.194 32.46 15.7984 33.0644 15.7984 33.8031Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M15.7984 31.1165C15.7984 31.4862 15.6471 31.8214 15.4039 32.0652C15.16 32.3083 14.825 32.4597 14.4553 32.4597H6.2269C5.4882 32.4597 4.88379 31.8552 4.88379 31.1165C4.88379 30.7468 5.0351 30.4117 5.27824 30.1679C5.52216 29.9247 5.8572 29.7734 6.2269 29.7734H14.4553C15.194 29.7734 15.7984 30.3778 15.7984 31.1165Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M15.7984 28.43C15.7984 28.7997 15.6471 29.1348 15.4039 29.3787C15.16 29.6219 14.825 29.7731 14.4553 29.7731H6.2269C5.4882 29.7731 4.88379 29.1687 4.88379 28.43C4.88379 28.0603 5.0351 27.7252 5.27824 27.4814C5.52216 27.2382 5.8572 27.0869 6.2269 27.0869H14.4553C15.194 27.0869 15.7984 27.6913 15.7984 28.43Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M15.7984 25.7445C15.7984 26.1142 15.6471 26.4494 15.4039 26.6932C15.16 26.9363 14.825 27.0877 14.4553 27.0877H6.2269C5.4882 27.0877 4.88379 26.4832 4.88379 25.7445C4.88379 25.4816 4.96085 25.2356 5.09304 25.0277C5.14605 24.9436 5.20828 24.8659 5.27824 24.7958C5.52216 24.5526 5.8572 24.4014 6.2269 24.4014H14.4553C15.194 24.4014 15.7984 25.0058 15.7984 25.7445Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M14.455 24.4011H6.2269C5.4882 24.4011 4.88379 23.7967 4.88379 23.058C4.88379 22.3192 5.4882 21.7148 6.2269 21.7148H14.455C15.1937 21.7148 15.7981 22.3192 15.7981 23.058C15.7981 23.7967 15.1937 24.4011 14.455 24.4011Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M11.0731 30.7407C10.9876 28.7359 9.56597 27.1037 7.70332 26.6668C7.32434 26.578 6.92715 26.5385 6.5187 26.5557V26.5556H4.80624C0.923652 26.7239 -0.88605 31.5598 2.08711 34.1983C2.90625 34.9266 3.99905 35.3503 5.18051 35.2996H6.51856V35.2981C6.64069 35.303 6.76381 35.3042 6.88812 35.2989C7.16733 35.2869 7.43881 35.2487 7.70107 35.188C9.59986 34.7447 11.0044 33.0729 11.0738 31.0858V31.0809C11.0781 30.9683 11.0781 30.8552 11.0731 30.7407Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M11.0733 31.08V31.0849C11.0041 33.072 9.59944 34.7439 7.70065 35.187C5.83934 34.7495 4.41776 33.118 4.33226 31.1138C4.33156 31.1039 4.33085 31.0948 4.33085 31.0849V31.08C4.2566 28.9593 5.70581 27.1326 7.70283 26.666C9.56555 27.1029 10.9871 28.7351 11.0726 30.7399C11.0776 30.8544 11.0776 30.9675 11.0733 31.08Z"
                      fill="#F6BD3D"
                    ></path>
                    <path
                      d="M31.5556 11.7672H28.9606V6.66049C28.9606 5.78602 28.6128 4.97095 28.0437 4.37505L26.3669 2.62048C24.944 1.15432 24.7644 0.740109 23.9168 0.328711C23.5231 0.132188 23.0042 0 22.4811 0H10.2332C8.4087 0 6.9249 1.48451 6.9249 3.30834V21.1493H6.22719C5.17461 21.1493 4.31855 22.0054 4.31855 23.0579C4.31855 23.5818 4.53062 24.0561 4.87276 24.401C4.53062 24.746 4.31855 25.2203 4.31855 25.7441C4.31855 25.9407 4.34612 26.0573 4.35603 26.1217C0.214204 26.543 -1.43575 31.6695 1.59549 34.4519C2.51096 35.2924 3.7261 35.7688 5.04376 35.7151C5.4792 35.7151 14.4442 35.7116 14.4555 35.7116C15.5074 35.7116 16.3641 34.8555 16.3641 33.8029C16.3641 33.2791 16.1521 32.8048 15.8099 32.4598C16.1315 32.1353 16.338 31.6978 16.3613 31.2114H17.0775V31.5939C17.0775 34.0235 19.0539 36 21.4836 36H31.5556C33.9853 36 35.9618 34.0235 35.9618 31.5939V16.1734C35.9619 13.7437 33.9853 11.7672 31.5556 11.7672ZM24.2377 1.99983C26.4588 4.34749 26.9593 4.87695 27.0533 4.97665C27.0533 4.97665 27.054 4.97665 27.0547 4.97806C27.0554 4.97806 27.0554 4.97806 27.0554 4.97806C27.0561 4.97946 27.0575 4.98087 27.0583 4.98157L27.059 4.98227C27.0604 4.98438 27.0618 4.98579 27.0632 4.98649C27.0639 4.9872 27.0646 4.9879 27.0653 4.9893C27.066 4.99001 27.0667 4.99001 27.0667 4.99071C27.0674 4.99141 27.0681 4.99141 27.0688 4.99282C27.0702 4.99352 27.0709 4.99493 27.0716 4.99563H24.2376L24.2377 1.99983ZM6.22719 22.2803H14.4556C14.884 22.2803 15.2332 22.6296 15.2332 23.0579C15.2332 23.487 14.8839 23.8355 14.4556 23.8355H6.22719C5.79877 23.8355 5.4496 23.487 5.4496 23.0579C5.44953 22.6295 5.79877 22.2803 6.22719 22.2803ZM6.22719 24.9666H14.4556C14.884 24.9666 15.2332 25.3158 15.2332 25.7441C15.2332 26.1733 14.8839 26.5217 14.4556 26.5217H8.77201C8.54082 26.4157 8.3012 26.3294 8.05588 26.263C7.68969 26.1633 7.31077 26.1068 6.92483 26.0968C6.81388 26.094 6.70285 26.0947 6.5919 26.0996H5.53651C5.48068 25.9929 5.44953 25.872 5.44953 25.7441C5.44953 25.3158 5.79877 24.9666 6.22719 24.9666ZM15.2332 28.4304C15.2332 28.8596 14.8839 29.208 14.4556 29.208H11.2907C11.0759 28.6361 10.7521 28.1095 10.3308 27.6529H14.4556C14.8839 27.6529 15.2332 28.002 15.2332 28.4304ZM3.47586 27.4153C3.13161 27.7419 2.82547 28.13 2.58514 28.5577H1.92631C2.35684 28.024 2.89198 27.6443 3.47586 27.4153ZM1.32472 29.618H2.14829C2.12994 29.6972 2.03656 30.0019 1.99416 30.4656H1.12398C1.15794 30.1744 1.22509 29.8902 1.32472 29.618ZM1.41591 32.421C1.29076 32.1367 1.20104 31.8364 1.15013 31.526H2.01399C2.16882 32.404 2.17726 32.2527 2.21614 32.421H1.41591ZM2.12143 33.4813C2.46849 33.4806 2.67001 33.4827 2.71733 33.4799C2.92869 33.8135 3.18315 34.1224 3.47797 34.4002C2.96546 34.1988 2.50956 33.8913 2.12143 33.4813ZM6.94677 34.6555C4.87768 34.7446 3.12591 33.142 3.03831 31.0679C2.8962 27.766 6.84003 25.8644 9.3234 28.1441C11.7715 30.3914 10.2813 34.5183 6.94677 34.6555ZM14.4556 34.5805H9.8911C10.3965 34.1528 10.8115 33.6234 11.1062 33.0254H14.4556C14.884 33.0254 15.2332 33.3746 15.2332 33.8029C15.2332 34.232 14.8839 34.5805 14.4556 34.5805ZM15.2268 31.2114C15.1801 31.596 14.8521 31.8943 14.4556 31.8943H11.4965C11.599 31.4037 11.628 30.8749 11.565 30.3391H14.4556C14.932 30.3391 15.2876 30.7654 15.2268 31.2114ZM17.0775 30.0803H16.0567C15.9853 29.9694 15.9025 29.8669 15.8099 29.7735C16.5486 29.0284 16.5493 27.8324 15.8099 27.0873C16.1521 26.7424 16.3641 26.268 16.3641 25.7442C16.3641 25.2204 16.1521 24.7461 15.8099 24.4011C16.9989 23.2022 16.1493 21.1494 14.4555 21.1494H8.05588V3.30834C8.05588 2.10804 9.0328 1.13105 10.2332 1.13105H23.1067V5.56123C23.1067 5.8737 23.3597 6.12675 23.6722 6.12675H27.7624C27.8804 6.58484 27.8076 6.43352 27.8295 11.7671H21.4836C19.0539 11.7671 17.0775 13.7436 17.0775 16.1733V30.0803ZM34.9015 31.5939C34.9015 33.4389 33.4007 34.9397 31.5556 34.9397H21.4837C19.6394 34.9397 18.1378 33.4389 18.1378 31.5939V16.1734C18.1378 14.3284 19.6393 12.8275 21.4837 12.8275H31.5557C33.4007 12.8275 34.9015 14.3283 34.9015 16.1734V31.5939H34.9015Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M23.4446 18.4704H21.5212C21.1254 18.4704 20.8015 18.1465 20.8015 17.7507V15.8102C20.8015 15.4144 21.1254 15.0906 21.5212 15.0906H31.5183C31.9155 15.0906 32.2379 15.4137 32.2379 15.8102V17.7507C32.2379 18.1473 31.9155 18.4704 31.5183 18.4704H25.7309C25.4381 18.4704 25.2007 18.7077 25.2007 19.0005C25.2007 19.2933 25.4381 19.5307 25.7309 19.5307H31.5183C32.5002 19.5307 33.2982 18.7319 33.2982 17.7507V15.8102C33.2982 14.829 32.5001 14.0303 31.5183 14.0303H21.5212C20.5381 14.0303 19.7412 14.8272 19.7412 15.8102V17.7507C19.7412 18.7338 20.5381 19.5307 21.5212 19.5307H23.4446C23.7374 19.5307 23.9748 19.2933 23.9748 19.0005C23.9748 18.7077 23.7374 18.4704 23.4446 18.4704Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M20.851 29.2329H22.6628C23.275 29.2329 23.7726 28.7352 23.7726 28.1231V26.312C23.7726 25.6998 23.275 25.2021 22.6628 25.2021H20.851C20.2395 25.2021 19.7412 25.6998 19.7412 26.312V28.1231C19.7411 28.7352 20.2395 29.2329 20.851 29.2329ZM20.8015 26.312C20.8015 26.2844 20.8242 26.2625 20.851 26.2625H22.6628C22.6897 26.2625 22.7123 26.2844 22.7123 26.312V28.1231C22.7123 28.1506 22.6897 28.1726 22.6628 28.1726H20.851C20.8242 28.1726 20.8015 28.1506 20.8015 28.1231V26.312Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M32.2451 20.4658H30.434C29.8218 20.4658 29.3242 20.9635 29.3242 21.5756V23.3867C29.3242 23.999 29.8219 24.4966 30.434 24.4966H32.2451C32.8574 24.4966 33.355 23.9989 33.355 23.3867V21.5756C33.355 20.9635 32.8573 20.4658 32.2451 20.4658ZM32.2946 23.3867C32.2946 23.4143 32.2727 23.4362 32.2451 23.4362H30.434C30.4072 23.4362 30.3845 23.4143 30.3845 23.3867C30.4065 21.5948 30.3385 21.5261 30.434 21.5261H32.2451C32.2727 21.5261 32.2946 21.5481 32.2946 21.5756V23.3867Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M20.851 24.4966H22.6628C23.275 24.4966 23.7726 23.9989 23.7726 23.3867V21.5756C23.7726 20.9634 23.275 20.4658 22.6628 20.4658H20.851C20.2395 20.4658 19.7412 20.9635 19.7412 21.5756V23.3867C19.7411 23.999 20.2395 24.4966 20.851 24.4966ZM20.8015 21.5756C20.8015 21.5481 20.8242 21.5261 20.851 21.5261H22.6628C22.6897 21.5261 22.7123 21.5481 22.7123 21.5756V23.3867C22.7123 23.4143 22.6897 23.4362 22.6628 23.4362H20.851C20.8242 23.4362 20.8015 23.4143 20.8015 23.3867V21.5756Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M23.4934 30.08C23.2898 29.851 22.9929 29.7061 22.6628 29.7061H20.851C20.5208 29.7061 20.2239 29.851 20.0211 30.08C19.6358 30.5119 19.7666 30.9827 19.7411 31.211V32.627C19.7411 33.2392 20.2395 33.7368 20.851 33.7368H22.6628C23.275 33.7368 23.7726 33.2391 23.7726 32.627V31.211C23.7471 30.9877 23.8765 30.5119 23.4934 30.08ZM22.6628 32.6765C20.8729 32.6545 20.8015 32.7224 20.8015 32.627C20.8015 30.7091 20.7802 30.7664 20.851 30.7664H22.6628C22.7497 30.7664 22.696 30.8872 22.7123 31.211C22.7123 31.211 22.7582 32.6765 22.6628 32.6765Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M31.9638 25.2021H30.7154C29.9485 25.2021 29.3242 25.8264 29.3242 26.5934V32.2182C29.3242 33.0559 30.0057 33.7374 30.8427 33.7374H31.8366C32.6743 33.7374 33.3551 33.0559 33.3551 32.2182V26.5934C33.355 25.8264 32.7316 25.2021 31.9638 25.2021ZM32.2947 32.2182C32.2947 32.4713 32.0897 32.677 31.8366 32.677H30.8427C30.5903 32.677 30.3846 32.4713 30.3846 32.2182V26.5934C30.3846 26.411 30.533 26.2625 30.7154 26.2625H31.9638C32.1462 26.2625 32.2946 26.411 32.2946 26.5934L32.2947 32.2182Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M13.6862 15.4007C13.0398 15.1631 12.5727 14.9916 12.5727 14.3927C12.5727 13.8468 12.9353 13.5701 13.6501 13.5701C14.409 13.5701 14.6134 13.9041 14.8807 13.9041C15.1716 13.9041 15.3326 13.5953 15.3326 13.3819C15.3326 12.9401 14.6121 12.7211 13.968 12.6633V12.2651C13.968 11.988 13.7427 11.7627 13.4656 11.7627C13.1886 11.7627 12.9633 11.988 12.9633 12.2651V12.7268C12.0826 12.9359 11.5987 13.5442 11.5987 14.4455C11.5987 15.6795 12.5071 16.0208 13.2373 16.2953C13.9521 16.5638 14.5167 16.776 14.5167 17.5922C14.5167 18.2662 14.1425 18.608 13.4041 18.608C12.3236 18.608 12.3134 17.8785 11.9013 17.8785C11.646 17.8785 11.4404 18.1642 11.4404 18.4008C11.4404 18.8186 12.0626 19.3677 12.9633 19.5102V19.895C12.9633 20.1721 13.1886 20.3974 13.4656 20.3974C13.7427 20.3974 13.968 20.1721 13.968 19.895V19.4999C14.9368 19.3176 15.4909 18.6062 15.4909 17.5394C15.4908 16.0637 14.4902 15.6961 13.6862 15.4007Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M27.4253 29.7061H25.6135C25.2834 29.7061 24.9865 29.851 24.7829 30.08C24.3991 30.5126 24.5292 30.9827 24.5037 31.211V32.627C24.5037 33.2392 25.0014 33.7368 25.6135 33.7368H27.4253C28.0368 33.7368 28.5344 33.2391 28.5344 32.627V30.8152C28.5344 30.502 28.4037 30.2186 28.1944 30.017C27.9951 29.8248 27.7237 29.7061 27.4253 29.7061ZM27.4253 32.6765C25.6355 32.6545 25.564 32.7224 25.564 32.627V30.8152C25.564 30.7883 25.5867 30.7664 25.6135 30.7664H27.4253C27.4522 30.7664 27.4741 30.7883 27.4741 30.8152C27.4529 32.6093 27.5193 32.6765 27.4253 32.6765Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M27.4255 20.4658H25.6137C25.0015 20.4658 24.5039 20.9635 24.5039 21.5756V23.3867C24.5039 23.999 25.0016 24.4966 25.6137 24.4966H27.4255C27.5683 24.4966 27.704 24.4697 27.8292 24.4202C28.242 24.2583 28.5347 23.8561 28.5347 23.3867V21.5756C28.5346 20.9613 28.0342 20.4658 27.4255 20.4658ZM27.4743 23.3867C27.4743 23.4143 27.4524 23.4362 27.4255 23.4362H25.6137C25.5869 23.4362 25.5642 23.4143 25.5642 23.3867V21.5756C25.5642 21.4802 25.63 21.5474 27.4255 21.5261C27.4524 21.5261 27.4743 21.5481 27.4743 21.5756V23.3867Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M27.8292 25.2785C27.704 25.229 27.5683 25.2021 27.4255 25.2021H25.6137C25.0015 25.2021 24.5039 25.6998 24.5039 26.312V28.1231C24.5039 28.7353 25.0016 29.2329 25.6137 29.2329H27.4255C28.037 29.2329 28.5346 28.7352 28.5346 28.1231V26.312C28.5346 25.8426 28.242 25.4404 27.8292 25.2785ZM27.4743 28.1231C27.4743 28.1506 27.4524 28.1726 27.4255 28.1726H25.6137C25.5869 28.1726 25.5642 28.1506 25.5642 28.1231V26.312C25.5642 26.2844 25.5869 26.2625 25.6137 26.2625H27.4255C27.4524 26.2625 27.4743 26.2844 27.4743 26.312V28.1231Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M23.0331 8.30543H24.3649C24.6575 8.30543 24.895 8.06862 24.895 7.77527C24.895 7.48263 24.6575 7.24512 24.3649 7.24512H23.0331C22.7404 7.24512 22.5029 7.48263 22.5029 7.77527C22.5029 8.06862 22.7404 8.30543 23.0331 8.30543Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M11.5106 8.30543H20.9125C21.2052 8.30543 21.4427 8.06862 21.4427 7.77527C21.4427 7.48263 21.2052 7.24512 20.9125 7.24512H11.5106C11.218 7.24512 10.9805 7.48263 10.9805 7.77527C10.9804 8.06862 11.218 8.30543 11.5106 8.30543Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M13.1959 10.9373C13.4885 10.9373 13.726 10.6997 13.726 10.4071C13.726 10.1145 13.4885 9.87695 13.1959 9.87695H11.5106C11.218 9.87695 10.9805 10.1145 10.9805 10.4071C10.9805 10.6997 11.218 10.9373 11.5106 10.9373H13.1959Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M24.8959 10.4071C24.8959 10.1145 24.6584 9.87695 24.3658 9.87695H15.3173C15.0246 9.87695 14.7871 10.1145 14.7871 10.4071C14.7871 10.6997 15.0246 10.9373 15.3173 10.9373H24.3657C24.6584 10.9373 24.8959 10.6997 24.8959 10.4071Z"
                      fill="#171D34"
                    ></path>
                    <path
                      d="M6.59166 29.8237C6.59166 29.6905 6.64073 29.6522 6.68665 29.6267C6.8291 29.5479 7.15591 29.5247 7.45523 29.6787C7.53476 29.7196 7.6249 29.7659 7.74218 29.7659C8.26509 29.7659 8.67867 28.7942 7.42957 28.5794V28.546C7.42957 28.2498 7.18854 28.0088 6.89231 28.0088C6.59609 28.0088 6.35505 28.2498 6.35505 28.546V28.648C5.83165 28.8378 5.53556 29.2695 5.53556 29.8554C5.53556 30.7596 6.19249 31.0065 6.6723 31.1867C7.12983 31.3586 7.28803 31.4339 7.28803 31.7451C7.28803 31.9396 7.23565 32.1197 6.85533 32.1197C6.30112 32.1197 6.3675 31.6816 5.95273 31.6816C5.65959 31.6816 5.44043 31.9715 5.44043 32.2308C5.44043 32.5981 5.82237 32.9467 6.35505 33.088V33.1282C6.35505 33.4245 6.59609 33.6655 6.89231 33.6655C7.18854 33.6655 7.42957 33.4245 7.42957 33.1282V33.074C8.00599 32.8887 8.34412 32.3924 8.34412 31.7134C8.34427 30.1023 6.59166 30.3442 6.59166 29.8237Z"
                      fill="#171D34"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_352_81451">
                      <rect width="36" height="36" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>{" "}
                New Calculations
              </span>
            </div>
            <span className="h4">
              What Type of Support do you want to Calculate?
            </span>
            {typeOfCalculations.map((e, index: number) => {
              return (
                <>
                  <RadioInput
                    isDisabled={false}
                    name={e.value}
                    onChangeFunc={() => {
                      setSelectedType({
                        type: e.value,
                        calculatorType: e.type,
                      });
                    }}
                    checked={selectedType.type === e.value}
                    label={e.value}
                  ></RadioInput>
                </>
              );
            })}
            <span className="text">
              Child support in Canada is determined according to the mandatory
              legislated federal Child Support Guidelines (CSG). This Calculator
              will provide both component of the child support under the CSG;
              the table amount and Special Expenses Contribution. <br />
              <br />
              Spousal support is determined according to the federal Spousal
              Support Advisory Guidelines ("SSAG") which are not mandated nor
              legislated. A range of the amount and duration of spousal support
              will be generated by this calculator.
            </span>

            <div>
              <h6 className="fw-bold mt-3">
                Please select the matter for which the calculation will be
                created:
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <Autocomplete
                      id="size-medium-outlined-multi"
                      options={matterClients ? matterClients : []}
                      value={{
                        client_id: selectedValues.clientId,
                        client_name: selectedValues.clientNo,
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return option === value;
                      }}
                      onChange={(event, value) => {
                        handleInputChange("ClientNo", value);
                      }}
                      getOptionLabel={(e) =>
                        e.client_name ? e.client_name : ""
                      }
                      defaultValue={{
                        client_id: selectedValues.clientId,
                        client_name: selectedValues.clientNo,
                      }}
                      // getopion={(option, value) => option === value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Matter Clients"
                          placeholder="Select Matter Clients"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <Autocomplete
                      id="size-medium-outlined-multi"
                      size="medium"
                      options={matterDisplayList.map(
                        ({ matter_display_nbr }) => matter_display_nbr
                      )}
                      onChange={(event, value) => {

                        handleInputChange("FileNo", value);
                      }}
                      // getopion={(option, value) => option === value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select File Number"
                          placeholder="Select File Number"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="calGrah">
            <img src={calculationImg} />
          </div>
          <div className="btnGroup">
            {
              <button onClick={nextPage} className="btn btnPrimary">
                Create
              </button>
            }
          </div>
        </div>
      </div>
      <ExistingCalculations />
      <div className="pb-4"></div>
    </Layout>
  );
};

export default WelcomeScreenApi;
