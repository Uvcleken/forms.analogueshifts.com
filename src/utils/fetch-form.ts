type fetchFormsParams = (
  url: string,
  token: string,
  handleSuccess: (response: any) => void,
  handleError: (error: any) => void
) => void;

export const fetchForms: fetchFormsParams = (
  url,
  token,
  handleSuccess,
  handleError
) => {
  const axios = require("axios");
  let config = {
    method: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  axios.request(config).then(handleSuccess).catch(handleError);
};
