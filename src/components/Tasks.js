import React from "react";
import { Link } from "react-router-dom";
import TableHeading from "../components/TableHeading";
import { AUTH_ROUTES } from "../routes/Routes.types";
import { determineColorOfTask, nameOfChecklist } from "../utils/helpers";

const Tasks = ({ allTasks, show }) => {
  const headings = [<span>Task Type</span>, <span>Time</span>, <span className="">Status</span>];

  if (!show)
    return null;

  return (
    <div className="col-lg-4">
      <div className="panel">
        <div className="pHead">
          <span className="h5"><svg width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.4" d="M5.03711 5.86914V32.922H30.9627C33.4529 32.922 35.4716 30.9033 35.4716 28.4132V5.86914H5.03711Z" fill="#73C3FD"/> <path d="M26.454 28.4131H0.52832C0.52832 30.9032 2.547 32.9219 5.03713 32.9219H30.9628C28.4726 32.9219 26.454 30.9032 26.454 28.4131Z" fill="#73C3FD"/> <path opacity="0.5" d="M13.7731 6.71413C15.3294 6.71413 16.5911 5.45247 16.5911 3.89613C16.5911 2.33979 15.3294 1.07812 13.7731 1.07812C12.2167 1.07812 10.9551 2.33979 10.9551 3.89613C10.9551 5.45247 12.2167 6.71413 13.7731 6.71413Z" fill="#F6BD3D"/> <path d="M15.1821 5.30546C13.6258 5.30546 12.3641 4.04377 12.3641 2.48745C12.3641 2.07405 12.4538 1.68185 12.6138 1.32812C11.6359 1.77027 10.9551 2.75354 10.9551 3.89645C10.9551 5.45277 12.2168 6.71446 13.7731 6.71446C14.916 6.71446 15.8993 6.03363 16.3414 5.05578C15.9877 5.2157 15.5955 5.30546 15.1821 5.30546Z" fill="#F6BD3D"/> <path d="M35.4716 5.34041H31.5203C31.2285 5.34041 30.9919 5.57698 30.9919 5.86879C30.9919 6.16059 31.2285 6.39716 31.5203 6.39716H34.9432V28.4128C34.9432 30.6076 33.1576 32.3932 30.9628 32.3932C28.768 32.3932 26.9824 30.6076 26.9824 28.4128C26.9824 28.121 26.7458 27.8844 26.454 27.8844H13.7669C13.4751 27.8844 13.2385 28.121 13.2385 28.4128C13.2385 28.7046 13.4751 28.9412 13.7669 28.9412H25.9532C26.0997 30.3415 26.8224 31.5727 27.8791 32.3932H5.03718C3.02146 32.3932 1.35088 30.8872 1.09169 28.9412H11.2368C11.5286 28.9412 11.7652 28.7046 11.7652 28.4128C11.7652 28.121 11.5286 27.8844 11.2368 27.8844H5.56556V6.39716H11.553C12.1442 6.92258 12.9217 7.24256 13.773 7.24256C14.5053 7.24256 15.1829 7.0055 15.7345 6.60492L18.7536 9.62399C18.8567 9.72713 18.992 9.77877 19.1272 9.77877C19.2624 9.77877 19.3977 9.7272 19.5008 9.62399C19.7071 9.41764 19.7071 9.08307 19.5008 8.87679L17.0212 6.39716H29.0392C29.331 6.39716 29.5676 6.16059 29.5676 5.86879C29.5676 5.57698 29.331 5.34041 29.0392 5.34041H16.7913C17.0014 4.90292 17.1194 4.41308 17.1194 3.89618C17.1194 2.05103 15.6182 0.549805 13.773 0.549805C11.9278 0.549805 10.4266 2.05103 10.4266 3.89618C10.4266 4.41308 10.5445 4.90292 10.7547 5.34041H5.03718C4.74538 5.34041 4.50881 5.57698 4.50881 5.86879V27.8844H0.528376C0.236571 27.8844 0 28.121 0 28.4128C0 31.1903 2.25969 33.45 5.03718 33.45H30.9628C33.7403 33.45 36 31.1903 36 28.4128V5.86879C36 5.57698 35.7634 5.34041 35.4716 5.34041ZM13.773 1.60656C15.0355 1.60656 16.0626 2.63372 16.0626 3.89618C16.0626 4.47345 15.8474 5.00105 15.4937 5.40424C15.4871 5.40783 15.481 5.41199 15.4746 5.41586C15.4671 5.4203 15.4596 5.42453 15.4523 5.42939C15.4442 5.43481 15.4366 5.4408 15.4288 5.44665C15.4228 5.45116 15.4166 5.45532 15.4107 5.46011C15.3838 5.48223 15.359 5.50696 15.3369 5.53394C15.332 5.54 15.3276 5.54634 15.323 5.55254C15.3173 5.56007 15.3114 5.56747 15.3061 5.57536C15.3011 5.5829 15.2967 5.59079 15.292 5.59854C15.2884 5.60467 15.2844 5.61052 15.281 5.61679C14.8779 5.97066 14.3503 6.18581 13.773 6.18581C12.5105 6.18581 11.4834 5.15865 11.4834 3.89618C11.4834 2.63372 12.5105 1.60656 13.773 1.60656Z" fill="#171D34"/> <path d="M14.0194 14.8868C14.0194 14.595 13.7828 14.3584 13.491 14.3584H10.1094C9.81763 14.3584 9.58105 14.595 9.58105 14.8868C9.58105 15.1786 9.81763 15.4151 10.1094 15.4151H11.2736C11.2728 15.4268 11.2719 15.4385 11.2719 15.4504V19.3956C11.2719 19.6874 11.5084 19.924 11.8002 19.924C12.092 19.924 12.3286 19.6874 12.3286 19.3956V15.4504C12.3286 15.4385 12.3276 15.4268 12.3268 15.4151H13.491C13.7828 15.4151 14.0194 15.1786 14.0194 14.8868Z" fill="#171D34"/> <path d="M16.309 19.924C17.5327 19.924 18.5282 18.6756 18.5282 17.1412C18.5282 15.6068 17.5327 14.3584 16.309 14.3584C15.0854 14.3584 14.0898 15.6068 14.0898 17.1412C14.0898 18.6756 15.0854 19.924 16.309 19.924ZM16.309 15.4151C16.9391 15.4151 17.4714 16.2056 17.4714 17.1412C17.4714 18.0768 16.9391 18.8672 16.309 18.8672C15.6789 18.8672 15.1466 18.0768 15.1466 17.1412C15.1466 16.2056 15.6789 15.4151 16.309 15.4151Z" fill="#171D34"/> <path d="M26.4893 17.1412C26.4893 18.6756 27.4848 19.924 28.7084 19.924C29.9321 19.924 30.9276 18.6756 30.9276 17.1412C30.9276 15.6068 29.9321 14.3584 28.7084 14.3584C27.4848 14.3584 26.4893 15.6068 26.4893 17.1412ZM29.8709 17.1412C29.8709 18.0768 29.3385 18.8672 28.7084 18.8672C28.0783 18.8672 27.546 18.0768 27.546 17.1412C27.546 16.2056 28.0783 15.4151 28.7084 15.4151C29.3385 15.4151 29.8709 16.2056 29.8709 17.1412Z" fill="#171D34"/> <path d="M25.2919 17.1403C25.2919 14.4691 21.6249 13.8271 21.4688 13.8011C21.3156 13.7756 21.1588 13.8187 21.0403 13.9191C20.9219 14.0195 20.8535 14.167 20.8535 14.3223V19.3947C20.8535 19.6865 21.0901 19.9231 21.3819 19.9231C22.7343 19.9231 25.2919 19.3415 25.2919 17.1403ZM21.9103 14.996C22.7726 15.2551 24.2351 15.8803 24.2351 17.1403C24.2351 18.3774 22.7351 18.7281 21.9103 18.8273V14.996Z" fill="#171D34"/> <path d="M26.9821 22.2129C26.9821 21.9211 26.7455 21.6846 26.4537 21.6846H15.1817C14.8899 21.6846 14.6533 21.9211 14.6533 22.2129C14.6533 22.5048 14.8899 22.7413 15.1817 22.7413H26.4537C26.7455 22.7413 26.9821 22.5048 26.9821 22.2129Z" fill="#171D34"/> <path d="M16.3096 24.5029C16.0178 24.5029 15.7812 24.7395 15.7812 25.0313C15.7812 25.3231 16.0178 25.5597 16.3096 25.5597H23.6364C23.9282 25.5597 24.1648 25.3231 24.1648 25.0313C24.1648 24.7395 23.9282 24.5029 23.6364 24.5029H16.3096Z" fill="#171D34"/> </svg> Tasks</span>
          <div className="control">
            {allTasks.length !== 0 && (
              <Link className="btn btnPrimary" to={AUTH_ROUTES.MONTHLY_CHECKLIST_TABLE}>View all</Link>
            )}
          </div>
        </div>
        <div className="pBody pb-0">
          <div className="tableOuter">
            {allTasks.length !== 0 ? (
              <table className="table customGrid">
                <TableHeading headings={headings}></TableHeading>
                <tbody>
                  {allTasks.map((e, key) => {
                    return (
                      <tr key={key}>
                        <td><span>{nameOfChecklist(e.task_type)}</span></td>
                        <td><span>{e.task_month}</span></td>
                        <td className={` ${determineColorOfTask(e.task_status)}`}><span>{e.task_status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="blankMsg">No Tasks Yet</div>
            )}
          </div>
        </div>
        <span className='moreBtn'><svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2.5625 1.625C2.5625 1.81042 2.50752 1.99168 2.4045 2.14585C2.30149 2.30002 2.15507 2.42018 1.98377 2.49114C1.81246 2.56209 1.62396 2.58066 1.4421 2.54449C1.26025 2.50831 1.0932 2.41902 0.962088 2.28791C0.830976 2.1568 0.741688 1.98975 0.705514 1.8079C0.669341 1.62604 0.687906 1.43754 0.758863 1.26623C0.829821 1.09493 0.949982 0.948511 1.10415 0.845498C1.25832 0.742484 1.43958 0.6875 1.625 0.6875C1.87364 0.6875 2.1121 0.786272 2.28791 0.962088C2.46373 1.1379 2.5625 1.37636 2.5625 1.625ZM8 0.6875C7.81458 0.6875 7.63332 0.742484 7.47915 0.845498C7.32498 0.948511 7.20482 1.09493 7.13386 1.26623C7.06291 1.43754 7.04434 1.62604 7.08051 1.8079C7.11669 1.98975 7.20598 2.1568 7.33709 2.28791C7.4682 2.41902 7.63525 2.50831 7.8171 2.54449C7.99896 2.58066 8.18746 2.56209 8.35877 2.49114C8.53007 2.42018 8.67649 2.30002 8.7795 2.14585C8.88252 1.99168 8.9375 1.81042 8.9375 1.625C8.9375 1.37636 8.83873 1.1379 8.66291 0.962088C8.4871 0.786272 8.24864 0.6875 8 0.6875ZM14.375 2.5625C14.5604 2.5625 14.7417 2.50752 14.8958 2.4045C15.05 2.30149 15.1702 2.15507 15.2411 1.98377C15.3121 1.81246 15.3307 1.62396 15.2945 1.4421C15.2583 1.26025 15.169 1.0932 15.0379 0.962088C14.9068 0.830976 14.7398 0.741688 14.5579 0.705514C14.376 0.66934 14.1875 0.687906 14.0162 0.758864C13.8449 0.829821 13.6985 0.949982 13.5955 1.10415C13.4925 1.25832 13.4375 1.43958 13.4375 1.625C13.4375 1.87364 13.5363 2.1121 13.7121 2.28791C13.8879 2.46373 14.1264 2.5625 14.375 2.5625ZM1.625 7.4375C1.43958 7.4375 1.25832 7.49248 1.10415 7.5955C0.949982 7.69851 0.829821 7.84493 0.758863 8.01624C0.687906 8.18754 0.669341 8.37604 0.705514 8.5579C0.741688 8.73975 0.830976 8.9068 0.962088 9.03791C1.0932 9.16903 1.26025 9.25831 1.4421 9.29449C1.62396 9.33066 1.81246 9.3121 1.98377 9.24114C2.15507 9.17018 2.30149 9.05002 2.4045 8.89585C2.50752 8.74168 2.5625 8.56042 2.5625 8.375C2.5625 8.12636 2.46373 7.8879 2.28791 7.71209C2.1121 7.53627 1.87364 7.4375 1.625 7.4375ZM8 7.4375C7.81458 7.4375 7.63332 7.49248 7.47915 7.5955C7.32498 7.69851 7.20482 7.84493 7.13386 8.01624C7.06291 8.18754 7.04434 8.37604 7.08051 8.5579C7.11669 8.73975 7.20598 8.9068 7.33709 9.03791C7.4682 9.16903 7.63525 9.25831 7.8171 9.29449C7.99896 9.33066 8.18746 9.3121 8.35877 9.24114C8.53007 9.17018 8.67649 9.05002 8.7795 8.89585C8.88252 8.74168 8.9375 8.56042 8.9375 8.375C8.9375 8.12636 8.83873 7.8879 8.66291 7.71209C8.4871 7.53627 8.24864 7.4375 8 7.4375ZM14.375 7.4375C14.1896 7.4375 14.0083 7.49248 13.8542 7.5955C13.7 7.69851 13.5798 7.84493 13.5089 8.01624C13.4379 8.18754 13.4193 8.37604 13.4555 8.5579C13.4917 8.73975 13.581 8.9068 13.7121 9.03791C13.8432 9.16903 14.0102 9.25831 14.1921 9.29449C14.374 9.33066 14.5625 9.3121 14.7338 9.24114C14.9051 9.17018 15.0515 9.05002 15.1545 8.89585C15.2575 8.74168 15.3125 8.56042 15.3125 8.375C15.3125 8.12636 15.2137 7.8879 15.0379 7.71209C14.8621 7.53627 14.6236 7.4375 14.375 7.4375Z" fill="#171D34"/> </svg></span>
      </div>
    </div>
  );
};

export default Tasks;
