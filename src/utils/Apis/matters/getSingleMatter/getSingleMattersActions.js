import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { fetchRequest } from "../../../fetchRequest";
import { getUserSID } from "../../../helpers";
import { GET_SINGLE_MATTERS_REQUEST,GET_SINGLE_MATTERS_SUCCESS,GET_SINGLE_MATTERS_FAIL } from "./getSingleMattersConstants";
import * as types from './getSingleMattersConstants';


export const fetchDataRequest = () => ({
    type: types.GET_SINGLE_MATTERS_REQUEST,
  });
  
  export const fetchDataSuccess = (data) => ({
    type: types.GET_SINGLE_MATTERS_SUCCESS,
    payload: data,
  });
  
  export const fetchDataFailure = (error) => ({
    type: types.GET_SINGLE_MATTERS_FAIL,
    payload: error,
  });

  export const fetchDataReset = () => (
    {
    type: types.GET_SINGLE_MATTERS_RESET
    }
    );


  export const getSingleMatter = (getData) => {

    return async (dispatch) => {

      dispatch(fetchDataRequest());
      try {
        const { data } = await fetchRequest("get", `get_single_matter/${getUserSID()}/${getData}`);
        // const data = await response.json();

        dispatch( {type: types.GET_SINGLE_MATTERS_SUCCESS, payload: data.data});
      } catch (error) {
      console.log("🚀 ~ return ~ error:", error)

        dispatch(fetchDataFailure(error));
      }
    };
  };

  export const getSingleMatterReset = () => async dispatch => {
    dispatch(fetchDataReset());
  };