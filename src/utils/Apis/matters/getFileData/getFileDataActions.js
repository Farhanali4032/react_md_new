import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { fetchRequest } from "../../../fetchRequest";
import { getUserSID } from "../../../helpers";
import * as types from './getFileDataConstants';




export const getFileDataRequest = () => ({
  type: types.GET_FILE_DATA_REQUEST,
});

export const getFileDataSuccess = (data) => ({
  type: types.GET_FILE_DATA_SUCCESS,
  payload: data,
});

export const getFileDataFailure = (error) => ({
  type: types.GET_FILE_DATA_FAIL,
  payload: error,
});

export const getFileDataResets = () => ({
  type: types.GET_FILE_DATA_RESET
});

export const getFileData = (saveData, state = {}, action) => async (dispatch) => {
  console.log("🚀 ~ getFileData ~ data:", `get_file_data/${getUserSID()}/${saveData.matterId}/${saveData.folder_id}/${saveData.file_id}`)
  try {
    // dispatch({ type: types.GET_FILE_DATA_REQUEST });
    dispatch(getFileDataRequest());
    const { data } = await fetchRequest("get", `get_file_data/${getUserSID()}/${saveData.matterId}/${saveData.folder_id}/${saveData.file_id}`);


    if (data.data.code === 200) {
      dispatch({ type: types.GET_FILE_DATA_SUCCESS, payload: data.data.body })
    } else {
      dispatch({ type: types.GET_FILE_DATA_FAIL, payload: "Error" })
    }

  } catch (err) {
    dispatch({ type: types.GET_FILE_DATA_FAIL, payload: "Error" })

  }
}

export const getFileDataReset = () => async dispatch => {
  console.log("🚀 ~ getFileDataReset ~ dispatch:")
  dispatch({ type: types.GET_FILE_DATA_RESET })
};

