const API_BASE_URL_OCI = "https://api.orange.com";
const API_SEND_MESSAGE_URL = `${API_BASE_URL_OCI}/smsmessaging/v1`;
const SENDER_PHONE_NUMBER = "";
const API_PURCHASE_ORDERS_URL = `${API_BASE_URL_OCI}/sms/admin/v1/purchaseorders`;
const API_CONTRACTS_URL = `${API_BASE_URL_OCI}/sms/admin/v1/contracts`;
const API_OAUTH_TOKEN_V3_URL = `${API_BASE_URL_OCI}/oauth/v3/token`;
const API_SEND_SMS_URL = `${API_SEND_MESSAGE_URL}/outbound`;
const API_AUTHORIZATION_HEADERS = process.env.AUTHORIZATION_HEADERS;
module.exports = {
  API_BASE_URL_OCI,
  SENDER_PHONE_NUMBER,
  API_PURCHASE_ORDERS_URL,
  API_OAUTH_TOKEN_V3_URL,
  API_AUTHORIZATION_HEADERS,
  API_SEND_SMS_URL,
  API_CONTRACTS_URL,
};
