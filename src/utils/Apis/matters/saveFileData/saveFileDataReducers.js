import { SAVE_FILE_DATA_FAIL, SAVE_FILE_DATA_REQUEST, SAVE_FILE_DATA_SUCCESS,SAVE_FILE_DATA_RESET } from "./saveFileDataConstants";


const initialState = {
    loading: true,
    data: null,
    error: null,
  };

export const saveFileDataReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SAVE_FILE_DATA_REQUEST:
            return {...state, loading: true, error: null};

        case SAVE_FILE_DATA_SUCCESS:
            return {...state, loading: false, response: action.payload, error: null};

            case SAVE_FILE_DATA_RESET:
            return {...state, loading: false, response: null, error: null};

        case SAVE_FILE_DATA_FAIL:
            console.log(action.type)
            return {...state, loading: false, response:null, error: null};

        default:
            return state;
    }

}


