import { SHOW_ERROR, SHOW_LOADING } from "../utils/constants";

const showLoading = (isLoading) => {
  return {
    type: SHOW_LOADING,
    payload: isLoading,
  };
};

const showError = (errMessage) => {
  return {
    type: SHOW_ERROR,
    payload: errMessage,
  };
};

export { showLoading, showError };
