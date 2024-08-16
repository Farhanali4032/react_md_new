import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import { changeInfoInUserInfo } from "../actions/userActions";
import ResetPassNotification from "../components/SignUser/ResetPassNotification";
import QuaterlyChecklist from "../containers/QuaterlyChecklist/QuaterlyChecklist";
import YearlyChecklist from "../containers/YearlyChecklist/YearlyChecklist";
import { AuthUser } from "../HOC/AuthUser.jsx";
import ActivateClientAccount from "../pages/ActivateClientAccount";
import Calculator from "../pages/calculator/Calculator.tsx";
import CalculatorReports from "../pages/calculator/reports/Reports";
import WelcomeScreen from "../pages/calculator/WelcomeScreen/WelcomeScreen.jsx";
import ComplianceForm from "../pages/complianceForms/ComplianceForm";
import Confirmation from "../pages/Confirmation";
import CreateAccount from "../pages/CreateAccount";
import CreateClientAndAssociatePage from "../pages/CreateClientAndAssociatePage";
import CreateClientPage from "../pages/CreateClientPage";
import CreateTaskPage from "../pages/CreateTaskPage";
import Dashboard from "../pages/Dashboard";
import ForgetPassword from "../pages/ForgetPassword";
import Logout from "../pages/Logout";
import ComplianceTable from "../pages/MonthlyChecklist/ComplianceTable.jsx";
import MonthlyCheckList from "../pages/MonthlyChecklist/MonthlyCheckList.jsx";
import MonthlyChecklistTable from "../pages/MonthlyChecklist/MonthlyChecklistTable.jsx";
import NewPasswordDoneNotification from "../pages/NewPasswordDoneNotification";
import NewPasswordPage from "../pages/NewPasswordPage";
import NotFound from "../pages/NotFound";
import OauthApproval from "../pages/OauthApproval";
import OperationalDashboard from "../pages/operation-dashboard/operational-dashboard.jsx";
import ProfileEdit from "../pages/ProfileEdit";
import ProfilePage from "../pages/ProfilePage";
import ReportsPage from "../pages/ReportsPage";
import FiveStepsPage from "../pages/fiveSteps/FiveStepsPage";
import RunReport from "../pages/runReport/RunReport";
import Setup from "../pages/Setup.jsx";
import Setupwizard from "../pages/Setupwizard";
import SignUser from "../pages/SignUser";
import TasksId from "../pages/TasksId.page.jsx";
import TasksPage from "../pages/TasksPage";
// Matter Routes
import MatterDashboard from "../pages/matters/matterDashboard.jsx";

import { IaccessPagesAuthData, Store } from "../store/store";
import clioIntuitRefresh from "../utils/Apis/clioIntuitRefresh/clioIntuitRefresh";
import {
  clioConnectedOrNot,
  getCurrentUserFromCookies,
  intuitConnectedOrNot,
  isENVPROD,
} from "../utils/helpers";
import { Roles } from "./Role.types";
import { AUTH_ROUTES, UN_AUTH_ROUTES } from "./Routes.types";
import FreCal  from "../pages/freeCalculator/Calculator.tsx";
import FreeCalApi from "../pages/freeCalculatorApi/Calculator.tsx"
import InProgressCalc from "../pages/InProgressCalc/index";
import SingleMatter from "../pages/matters/SingleMatter";
import FillPdf from "../pages/formPages/FillPdf";
import FillInformation from "../pages/formPages/FillInformation";
import CreateNewFormPage from "../pages/formPages/CreateNewFormPage";
import Noreportpage from "../pages/Noreportpage";
import ReportIssue from "../pages/ReportIssue";
import DemoApi from "../pages/calculator/screen4/DemoApi";



const Routes = () => {

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-toggle="tooltip"]');
    console.log("tooltipTriggerList", window)

    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });


    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);


  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: Store) => state.userLogin);
  const [isLinkConfirmed, setisLinkConfirmed] = useState(false);
  const [isClioConnected, setIsClioConnected] = useState(false);
  const [isQBOConnected, setIsQBOConnected] = useState(false);
  const fullRefreshState = useSelector((state: Store) => state.fullRefresh);
  const userChangeState = useSelector((state: Store) => state.userChange);
  const accessPagesState: IaccessPagesAuthData = useSelector(
    (state: Store) => state?.accessPages?.response
  );

  const history = useHistory();

  useEffect(() => {
    if (fullRefreshState.error && !fullRefreshState.loading) {
      console.log("full refresh with error");
    }
    // alert("Full Refresh failed with error ", fullRefreshState.error);
    if (fullRefreshState.message && !fullRefreshState.loading) {
      console.log("full refresh completed");
    }
    // alert("Full Refresh Completed", fullRefreshState.message);

    console.log("user change state", userChangeState.userRole);
  }, [
    fullRefreshState.error,
    fullRefreshState.loading,
    fullRefreshState.message,
    userChangeState,
  ]);

  useEffect(() => {
    history.listen(async (location, t) => {
      if (window.location.pathname !== "/signIn" && userInfo) {
        clioIntuitRefresh()
          .then((body) => {
            const { authClio, authIntuit, updated_at } = body;
            dispatch(
              changeInfoInUserInfo({ authClio, authIntuit, updated_at })
            );
          })
          .catch((err) => {
            console.log("cannot refresh Clio and intuit details");
          });
      }
    });
  }, []);

  const changeClioConnected = (e) => {
    setIsClioConnected(e);
  };

  const changeQBOConnected = (e) => {
    setIsQBOConnected(e);
  };

  const changeLinkConfirmed = (e) => {
    setisLinkConfirmed(e);
  };

  const rl_revr = [Roles.REVIEWER];
  const rl_prep = [Roles.PREPARER];
  const rl_adm = [Roles.ADMIN];
  const rl_all = [...rl_revr, ...rl_prep, ...rl_adm];

  return (
    <Switch>
      <Route path={AUTH_ROUTES.FIVE_STEPS}>
        <AuthUser
          usersAuth={rl_all}
          sidAccess={accessPagesState?.accessPagesState?.auth_five_steps}
        >
          <FiveStepsPage currentUserRole={userChangeState.userRole} />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.REPORTS}>
        <AuthUser
          usersAuth={rl_all}
          sidAccess={accessPagesState?.accessPagesState?.auth_report_history}
        >
          <ReportsPage currentUserRole={userChangeState.userRole} />
        </AuthUser>
      </Route>

      <Route path={'/cal_demo'}>
          <DemoApi  />
      </Route>


      

      <Route path={AUTH_ROUTES.REPORT_ISSUE}>
        <AuthUser
          usersAuth={rl_all}
          sidAccess={accessPagesState?.accessPagesState?.auth_report_history}
        >
          <ReportIssue currentUserRole={userChangeState.userRole} />
        </AuthUser>
      </Route>

      

      <Route path={AUTH_ROUTES.TASK_FORM_ID} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <TasksId />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.TASKS} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <TasksPage currentUserRole={userChangeState.userRole} />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.COMPLIANCE_CHECKLIST_TABLE} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <ComplianceTable />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.MONTHLY_CHECKLIST_TABLE} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <MonthlyChecklistTable />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.CREATE_TASKS} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <CreateTaskPage />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.SETUP}>
        {userInfo &&
          getCurrentUserFromCookies() !== null &&
          getCurrentUserFromCookies().role === Roles.ADMIN &&
          !clioConnectedOrNot() &&
          !intuitConnectedOrNot() ? (
          <Redirect to={AUTH_ROUTES.SETUPWIZARD} />
        ) : userInfo &&
          getCurrentUserFromCookies() !== null &&
          getCurrentUserFromCookies().role === Roles.ADMIN &&
          clioConnectedOrNot() &&
          intuitConnectedOrNot() ? (
          <Setup userInfo={userInfo} />
        ) : (
          <Redirect to={UN_AUTH_ROUTES.SIGNIN} />
        )}
      </Route>

      <Route path={AUTH_ROUTES.SETUPWIZARD}>
        <AuthUser
          usersAuth={rl_adm}
          sidAccess={accessPagesState?.auth_settings}
        >
          <Setupwizard
            isClioConnected={isClioConnected}
            isQBOConnected={isQBOConnected}
            changeClioConnected={changeClioConnected}
            changeQBOConnected={changeQBOConnected}
          />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.RUN_REPORT}>
        <AuthUser
          usersAuth={rl_all}
          sidAccess={accessPagesState?.auth_run_report}
        >
          <RunReport currentUserRole={userChangeState.userRole} />
        </AuthUser>
      </Route>

      <Route path={UN_AUTH_ROUTES.CREATE_ACCOUNT} exact>
        <CreateAccount />
      </Route>

      <Route path={UN_AUTH_ROUTES.CONFIRM_ACTIVATE}>
        <Confirmation changeLinkConfirmed={changeLinkConfirmed} />
      </Route>

      <Route path={UN_AUTH_ROUTES.OAUTH_APPROVAL}>
        <OauthApproval
          changeClioConnected={changeClioConnected}
          changeQBOConnected={changeQBOConnected}
        />
      </Route>

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.OPERATIONAL_DASHBOARD}>
          <AuthUser
            sidAccess={accessPagesState?.auth_dashboard}
            usersAuth={rl_all}
          >
            <OperationalDashboard />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.MATTER_DASHBOARD}>
          <AuthUser
            sidAccess={accessPagesState?.auth_dashboard}
            usersAuth={rl_all}
          >
            <MatterDashboard />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.SINGLE_MATTER}>
          <AuthUser
            sidAccess={accessPagesState?.auth_dashboard}
            usersAuth={rl_all}
          >
            <SingleMatter />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.FORMS_CREATE_NEW_FILL_PDF}>
          <AuthUser
            sidAccess={accessPagesState?.auth_dashboard}
            usersAuth={rl_all}
          >
            <FillPdf />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.FORMS_CREATE_NEW_FILL_INFORMATION}>
          <AuthUser
            sidAccess={accessPagesState?.auth_dashboard}
            usersAuth={rl_all}
          >
            <FillInformation />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.FORMS_CREATE_NEW}>
          <AuthUser
            sidAccess={accessPagesState?.auth_dashboard}
            usersAuth={rl_all}
          >
            <CreateNewFormPage />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.CALCULATOR}>
          <AuthUser
            usersAuth={rl_all}
            sidAccess={accessPagesState?.auth_calculator}
          >
            <Calculator />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.CALCULATOR_REPORTS}>
          <AuthUser
            usersAuth={rl_all}
            sidAccess={accessPagesState?.auth_calculator}
          >
            <CalculatorReports />
          </AuthUser>
        </Route>
      )}

      {!isENVPROD() && (
        <Route path={AUTH_ROUTES.SUPPORT_CALCULATOR}>
          <AuthUser
            usersAuth={rl_all}
            sidAccess={accessPagesState?.auth_calculator}
          >
            <WelcomeScreen currentUserRole={userChangeState.userRole} />
          </AuthUser>
        </Route>
      )}

      {/* //only for client testing and temporary */}
      {isENVPROD() && (
        <Route path={AUTH_ROUTES.PROD_CALCULATOR}>
          <Calculator />
        </Route>
      )}
      {isENVPROD() && (
        <Route path={AUTH_ROUTES.PROD_CALCULATOR_REPORTS}>
          <CalculatorReports />
        </Route>
      )}
      {isENVPROD() && (
        <Route path={AUTH_ROUTES.PROD_SUPPORT_CALCULATOR}>
          <WelcomeScreen currentUserRole={userChangeState.userRole} />
        </Route>
      )}

      <Route path={UN_AUTH_ROUTES.CREATE_CLIENT}>
        <CreateClientPage />
      </Route>

      <Route path={UN_AUTH_ROUTES.CREATE_CLIENT_AND_ASSOCIATE}>
        <CreateClientAndAssociatePage />
      </Route>

      <Route path={UN_AUTH_ROUTES.ACTIVATE_CLIENT_ACCOUNT}>
        <ActivateClientAccount changeLinkConfirmed={changeLinkConfirmed} />
      </Route>

      <Route path={UN_AUTH_ROUTES.SIGNIN}>
        <SignUser
          isLinkConfirmed={isLinkConfirmed}
          changeLinkConfirmed={changeLinkConfirmed}
          userInfo={userInfo}
          changeClioConnected={changeClioConnected}
          changeQBOConnected={changeQBOConnected}
        />
      </Route>

      <Route path={AUTH_ROUTES.LOGOUT}>
        {userInfo ? <Logout /> : <Redirect to={UN_AUTH_ROUTES.SIGNIN} />}
      </Route>
      <Route path={UN_AUTH_ROUTES.FORGET_PASSWORD}>
        <ForgetPassword />
      </Route>
      <Route path={UN_AUTH_ROUTES.RESET_PASSWORD}>
        <ResetPassNotification />
      </Route>
      <Route path={AUTH_ROUTES.SETTINGS}>
        <NewPasswordPage />
      </Route>
      <Route path={UN_AUTH_ROUTES.NEW_PASSWORD_SET}>
        <NewPasswordDoneNotification />
      </Route>

      <Route path={AUTH_ROUTES.QUATERLY_CHECKLIST}>
        <QuaterlyChecklist />
      </Route>

      <Route path={AUTH_ROUTES.YEARLY_CHECKLIST}>
        <YearlyChecklist />
      </Route>

      <Route exact path={AUTH_ROUTES.PROFILE}>
        <ProfilePage />
      </Route>
      <Route exact path={AUTH_ROUTES.PROFILE_EDIT}>
        <ProfileEdit />
      </Route>

      <Route path={AUTH_ROUTES.TASKS_FORM} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <MonthlyCheckList />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.COMPLIANCE_FORM} exact>
        <AuthUser usersAuth={rl_all} sidAccess={accessPagesState?.auth_tasks}>
          <ComplianceForm />
        </AuthUser>
      </Route>

      <Route path="/" exact>
        {userInfo ? (
          clioConnectedOrNot() && intuitConnectedOrNot() ? (
            <Redirect to={AUTH_ROUTES.DASHBOARD} />
          ) : (
            <Redirect to={AUTH_ROUTES.SETUPWIZARD} />
          )
        ) : userInfo ? (
          <Redirect to={AUTH_ROUTES.DASHBOARD} />
        ) : (
          <Redirect to={UN_AUTH_ROUTES.SIGNIN} />
        )}
      </Route>

      <Route path={AUTH_ROUTES.DASHBOARD}>
        <AuthUser usersAuth={rl_all} sidAccess={true}>
          <Dashboard
            currentUserRole={userChangeState.userRole}
            userInfo={userInfo}
          />
        </AuthUser>
      </Route>

      <Route path={AUTH_ROUTES.FREE_CALCULATOR} >
        <FreCal />

      </Route>


      <Route path={AUTH_ROUTES.IN_PROGRESS} >
        <InProgressCalc />

      </Route>

      <Route path={AUTH_ROUTES.FREE_CALCULATOR_API}>
        <FreeCalApi />
      </Route>

      


      <Route path="**">
        {userInfo ? <NotFound /> : <Redirect to={UN_AUTH_ROUTES.SIGNIN} />}
      </Route>
    </Switch>
  );
};

export default Routes;
