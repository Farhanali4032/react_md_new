import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userChangeAction } from "../../actions/userActions";
import ProfilePic from "../../assets/images/profile_pic.jpeg";
import { changeInfoInUserInfo } from "../../actions/userActions";
import { getCurrentUserFromCookies, getUserSID } from "../../utils/helpers";
import { momentFunction } from "../../utils/moment";
import axios from "../../utils/axios";
import Dropdown from "../Dropdown";
import Menu from "../Menu";

const InfoHeader = ({ title }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { userRole } = useSelector((state) => state.userChange);
  const { userInfo } = useSelector((state) => state.userLogin);
  const userProfileInfo = useSelector(
    (state) => state.userProfileInfo.response
  );
  const [open, setopenNotify] = useState(false);
  const onClickNotify = () => setopenNotify(!open);

  useEffect(() => {
    getRefreshState();
  }, []);

  const getRefreshState = (OptionalChange = null) => {
    axios
      .get(`/services/status/${getUserSID()}`)
      .then((res) => {
        if (res.data.data.code === 200) {
          const { authClio, authIntuit, updated_at } = res.data.data.body;
          dispatch(
            changeInfoInUserInfo({
              updated_at: updated_at,
              authClio: authClio,
              authIntuit: authIntuit,
              ...OptionalChange,
            })
          );
          if (authClio !== undefined) {
            Cookies.set("authClio", authClio);
          } else {
            Cookies.set("authClio", false);
          }

          if (authIntuit !== undefined) {
            Cookies.set("authIntuit", authIntuit);
          } else {
            Cookies.set("authIntuit", false);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const curClientList = userInfo.role;
  const menuList = [
    {
      option: "Profile",
      link: "/profile/edit",
    },
    {
      option: "divider",
      link: "",
    },
  ];

  const onClientChange = (e, list, type) => {
    const text = e.target.innerText;
    const role = e.target.dataset.role;
    const filter = list.filter((e) => {
      return e.display_firmname.trim() === text && e.role.trim() === role;
    });

    if (
      filter[0].display_firmname !== userRole.display_firmname ||
      filter[0].role !== userRole.role
    ) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        window.location.reload();
      }, 3000);
    }

    return filter[0];
  };

  const pageTitle = () => {
    switch (location.pathname) {
      case "/runreport":
        return "Law society compliance reports";
      case "/tasks/form":
        return "Tasks";
      default:
        break;
    }
  };

  return (
    <>
      {showLoading && <div className="loader">Changing Client</div>}
      <header className="mainHeader">
        <span className="title">
          {title}
          <div>
            <text>{pageTitle()}</text>
          </div>
          {["/runreport", "/reports"].includes(location.pathname) && (
            <text>
              Clio & QuickBooks were last refreshed on:{" "}
              <span>
                {userInfo.updated_at
                  ? momentFunction.formatDate(
                      userInfo.updated_at,
                      "MMM D, YYYY hh:mm A"
                    )
                  : "Sep 13, 2023 08:40 AM"}
              </span>
            </text>
          )}
        </span>
        <div className="controls">
          <Dropdown
            type="Firmname"
            addClassName={"bg-transparent"}
            list={curClientList}
            curClient={
              getCurrentUserFromCookies() &&
              getCurrentUserFromCookies().display_firmname
            }
            handleClientChange={(e, list, type) =>
              onClientChange(e, list, type)
            }
            stateToChange={(e) => dispatch(userChangeAction(e))}
          ></Dropdown>

          {/* hide for now uncomment when you need to use notification part */}

          {/* <div class="dropdown notificationDrop unread">
            <button
              onClick={onClickNotify}
              className={`${open ? "show" : ""}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M6 19V10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10V19M6 19H18M6 19H4M18 19H20M11 22H13"
                  stroke="#171D34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4Z"
                  stroke="#171D34"
                  stroke-width="1.5"
                />{" "}
              </svg>
            </button>
            <div className={`notifications ${open ? "show" : ""}`}>
              <span className="title">
                Notification <span className="count">2</span>
              </span>
              <div className="notifcationInner">
                <a href="#" className="unread">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                  </span>
                </a>
                <a href="#" className="unread">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                  </span>
                </a>
                <a href="#">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                    <span className="blueColor">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M1.08398 4.525L2.9174 6.625L7.50065 1.375"
                          stroke="#307FF4"
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </svg>{" "}
                      read
                    </span>
                  </span>
                </a>
                <a href="#">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                    <span className="blueColor">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M1.08398 4.525L2.9174 6.625L7.50065 1.375"
                          stroke="#307FF4"
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </svg>{" "}
                      read
                    </span>
                  </span>
                </a>
                <a href="#">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                    <span className="blueColor">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M1.08398 4.525L2.9174 6.625L7.50065 1.375"
                          stroke="#307FF4"
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </svg>{" "}
                      read
                    </span>
                  </span>
                </a>
                <a href="#">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                    <span className="blueColor">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M1.08398 4.525L2.9174 6.625L7.50065 1.375"
                          stroke="#307FF4"
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </svg>{" "}
                      read
                    </span>
                  </span>
                </a>
                <a href="#">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                    <span className="blueColor">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M1.08398 4.525L2.9174 6.625L7.50065 1.375"
                          stroke="#307FF4"
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </svg>{" "}
                      read
                    </span>
                  </span>
                </a>
                <a href="#">
                  <span className="thumb">
                    <img
                      src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                      alt="unknown"
                    />
                  </span>
                  <span className="nameInfo">
                    <strong>{`${
                      userProfileInfo?.first_name != undefined
                        ? userProfileInfo?.first_name
                        : ""
                    } ${
                      userProfileInfo?.last_name != undefined
                        ? userProfileInfo?.last_name
                        : ""
                    }`}</strong>
                    5m ago
                  </span>
                  <span className="notifyInfo">
                    <span>
                      assigned a <strong>Report</strong>
                    </span>
                    <span className="blueColor">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M1.08398 4.525L2.9174 6.625L7.50065 1.375"
                          stroke="#307FF4"
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </svg>{" "}
                      read
                    </span>
                  </span>
                </a>
              </div>
              <a className="allRead" href="#">
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M1 6.9L4.143 10.5L12 1.5M17 1.563L8.428 10.563L8 10"
                    stroke="#307FF4"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </svg>{" "}
                Mark all as read
              </a>
            </div>
          </div> */}
          
          {/* {userRole.company_profile_pic && (<img alt="Company Profile" src={userRole.company_profile_pic}/>)} */}
          <div
            onClick={(e) => {
              setOpenMenu((state) => !state);
            }}
            className="dropdown profile"
          >
            <button className="dropdownBtn">
              <img src={userInfo.profile_pic || ProfilePic} alt="unknown" />
              <span>
                <strong>
                  {" "}
                  {`${
                    userProfileInfo?.first_name != undefined
                      ? userProfileInfo?.first_name
                      : ""
                  } ${
                    userProfileInfo?.last_name != undefined
                      ? userProfileInfo?.last_name
                      : ""
                  }`}
                </strong>
                {userRole.role === "ADMIN" ? "Administrator" : userRole.role}
              </span>
            </button>
            <Menu open={openMenu} menuList={menuList} />
          </div>
        </div>
      </header>
    </>
  );
};

export default InfoHeader;
