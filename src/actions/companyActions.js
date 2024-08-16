import Cookies from "js-cookie";
import { COMPANY_INFO_FAIL, COMPANY_INFO_REQUEST, COMPANY_INFO_SUCCESS } from "../constants/companyConstants"
import { fetchRequest } from "../utils/fetchRequest";
import { getUserSID } from "../utils/helpers";
import CookiesParser from "../utils/cookieParser/Cookies";

export const companyInfoAction = (state = {}, action) => async (dispatch) => {
    try {
        dispatch({ type: COMPANY_INFO_REQUEST });

        const { data } = await fetchRequest("get", `companyInfo/${getUserSID()}`);

        console.log("company Info", data);

        if (data.data.code === 200 && data.data.status === "success") {
            console.log("compnay Info success");
            // Cookies.set("companyInfo", JSON.stringify(data.data.body), { path: "/",});
            CookiesParser.set("companyInfo" , data.data.body ,{ path: "/",} )
            dispatch({ type: COMPANY_INFO_SUCCESS, payload: data.data.body })
        } else {
            dispatch({ type: COMPANY_INFO_FAIL, payload: "Error" })
        }

    } catch (err) {
        dispatch({ type: COMPANY_INFO_FAIL, payload: "Error" })

    }
}