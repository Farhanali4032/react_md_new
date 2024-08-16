type ReactAppEnvironment = "DEV" | "QA" | "PROD" | "LOCAL";


export const REACT_APP_ENVIRONMENT: ReactAppEnvironment = "QA";

type POWERBIEnvironment = {
  POWER_BI_API: string;
  AUTHORITY: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope: string[];
  tenant_id: string;
  report_id: string;
  group_id: string;
};

export const APIS = {
  local: "http://localhost:3000/v1",
  // local: "http://192.168.29.5:3000/v1",
  dev: "https://dev-cloudact.infoset.ca/v1",
  QA: "https://apicloudact.infoset.ca/v1",
  prod: "https://api.cloudforlawfirms.com/v1",
};

export const POWERBI : POWERBIEnvironment = {
  POWER_BI_API: "api.powerbi.com",
  AUTHORITY: "https://login.microsoftonline.com/",
  client_id: "be6482f1-88b7-4caa-a167-df3184523cb0",
  client_secret: "Z3V8Q~w3jiQIlQyyfB2JDlCQ4ybeRPSvJ7K9Aap4",
  grant_type: "client_credentials",
  scope: ["https://analysis.windows.net/powerbi/api/.default"],
  tenant_id: "aaab56df-1af4-4cf1-8f67-3588ada9721c",
  report_id: "e0c68650-237c-420a-a0c2-161a716f8525",
  group_id: "b1064549-cfa8-4aeb-a5f5-5d70fb99692f",
};

export const scopes: string[] = [
  "https://analysis.windows.net/powerbi/api/Report.Read.All",
];

// // Client Id (Application Id) of the AAD app.
// export const clientId: string = "";

// // Id of the workspace where the report is hosted
// export const workspaceId: string = "";

// // Id of the report to be embedded
// export const reportId: string = "";
