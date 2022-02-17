import axios from "axios";
import * as types from "../constants/uploadConstants";

// Set axios config
let config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const uploadSingle = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.UPLOAD_SINGLE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    config = {
      headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/upload/profile`,
      formData,
      config
    );
    dispatch({ type: types.UPLOAD_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.UPLOAD_SINGLE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const uploadMultiple = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.UPLOAD_MULTIPLE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    config = {
      headers: { ...config.headers, Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/upload/post`,
      formData,
      config
    );
    dispatch({ type: types.UPLOAD_MULTIPLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.UPLOAD_MULTIPLE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
