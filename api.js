const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const { API_OAUTH_TOKEN_V3_URL } = require("./constants");

const sendRequest = async (
  url = "",
  headers = {},
  method = "GET",
  data = {}
) => {
  try {
    const response = await axios({ method, url, data, headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


const getApiAccessToken = async (authHearder) => {
  const data = { grant_type: "client_credentials" };
  const options = {
    method: "POST",
    url: API_OAUTH_TOKEN_V3_URL,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authHearder}`,
    },
    data: qs.stringify(data),
  };
  try {
    const apiRespnse = await axios(options);
    return apiRespnse.data;
  } catch (error) {
    console.error(error);
    return "token retrieving error";
  }
};

module.exports = { getApiAccessToken, sendRequest };
