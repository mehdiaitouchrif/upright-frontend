import * as types from "../constants/uploadConstants";

export const singleUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPLOAD_SINGLE_REQUEST:
      return { loading: true, error: null };
    case types.UPLOAD_SINGLE_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case types.UPLOAD_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const multipleUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPLOAD_MULTIPLE_REQUEST:
      return { loading: true, error: null };
    case types.UPLOAD_MULTIPLE_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case types.UPLOAD_MULTIPLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
