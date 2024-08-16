export enum AUTH_ROUTES {
  DASHBOARD = "/dashboard",
  REPORTS = "/reports",

  RUN_REPORT = "/runreport",
  CALCULATOR = "/calculator",
  PROD_CALCULATOR = "/prod_calculator",
  API_CALCULATOR = '/api_calculator',

  SUPPORT_CALCULATOR = "/SupportCalculator",
  PROD_SUPPORT_CALCULATOR = "/prod_supportCalculator",
  API_SUPPORT_CALCULATOR = '/Api_supportCalculator',
  CALCULATOR_REPORTS = "/calculatorreports",
  PROD_CALCULATOR_REPORTS = "/prod_calculatorreports",
  PROFILE = "/profile",
  PROFILE_EDIT = "/profile/edit",
  TASKS = "/tasks",
  CREATE_TASKS = "/tasks/create",
  SETUP = "/setup",
  SETUPWIZARD = "/setupwizard",
  LOGOUT = "/logout",
  SETTINGS = "/settings",

  TASKS_FORM = "/tasks/form",
  TASK_FORM_ID = "/task/:id",
  COMPLIANCE_CHECKLIST_TABLE = "/compliance-forms",
  MONTHLY_CHECKLIST_TABLE = "/monthly-checklists",
  COMPLIANCE_FORM = "/compliance/form",
  OPERATIONAL_DASHBOARD = '/operational-dashboard',
  YEARLY_CHECKLIST = '/yearly-checklist',
  QUATERLY_CHECKLIST = '/quaterly-checklist',
  FREE_CALCULATOR = '/freecalculator',
  FREE_CALCULATOR_API = '/freecalculator_api',

  REPORT_ISSUE = '/report-issue',
  IN_PROGRESS = "/inprogress",

  // Matter Routes
  MATTER_DASHBOARD = "/matters",
  FIVE_STEPS = "/5-steps/:id",
  SINGLE_MATTER = "/single-matter/:id",
  FORMS_CREATE_NEW = "/forms/create-new",
  FORMS_CREATE_NEW_FILL_INFORMATION = "/forms/create-new/fill-information",
  FORMS_CREATE_NEW_FILL_PDF = "/forms/create-new/fill-pdf",
}

export enum UN_AUTH_ROUTES {
  SIGNIN = "/signIn",
  CREATE_ACCOUNT = "/createAccount",
  CONFIRM_ACTIVATE = "/confirm/activate",
  OAUTH_APPROVAL = "/oauth/approval",
  CREATE_CLIENT = "/create/client",
  CREATE_CLIENT_AND_ASSOCIATE = "/create/clientAssociation",
  ACTIVATE_CLIENT_ACCOUNT = "/activate/client/account",
  FORGET_PASSWORD = "/forgetpassword",
  RESET_PASSWORD = "/resetpassword",
  NEW_PASSWORD_SET = "/newPasswordSet",
}
