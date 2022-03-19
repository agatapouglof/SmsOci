const deburr = require("lodash.deburr");
const nodeCache = require("node-cache");

const cache = new nodeCache();
const { SENDER_PHONE_NUMBER } = require("./constants");
const { getApiAccessToken } = require("./api");

/**
 *
 * ******* PRIVATE FUNCTIONS *******
 */

const cleanMessage = (message) => deburr(message);

const cacheApiToken = (token, ttl = 3600) => {
  cache.set("currentApiToken", token, ttl);
};

/**
 *
 * ******* PUBLIC FUNCTIONS ******
 */

const formatPhoneNumber = (phoneNumber) => `+225${phoneNumber}`;

const getAccessToken = async (authHearder) => {
  if (cache.has("currentApiToken")) return cache.get("currentApiToken");
  const { access_token: accessToken } = await getApiAccessToken(authHearder);
  cacheApiToken(accessToken);
  return accessToken;
};

const formatDataForApi = (
  recipientPhoneNumber = "",
  message = "test Default message",
  senderPhoneNumber = SENDER_PHONE_NUMBER,
) => {
  const formatedMessage = cleanMessage(message);
  return {
    outboundSMSMessageRequest: {
      address: `tel:${formatPhoneNumber(recipientPhoneNumber)}`,
      senderAddress: `tel:${formatPhoneNumber(senderPhoneNumber)}`,
      outboundSMSTextMessage: {
        message: formatedMessage,
      },
    },
  };
};

const buildRequestHeaders = async (authHeader) => {
  const accessToken = await getAccessToken(authHeader);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return headers;
};

const getCivSmsData = (apiResponse) => {
  const smsService = apiResponse.partnerContracts.contracts.find((e) => e.service === "SMS_OCB");
  const civSmsData = smsService.serviceContracts.find((e) => e.country === "CIV");

  return civSmsData;
};

module.exports = {
  getAccessToken,
  formatPhoneNumber,
  formatDataForApi,
  buildRequestHeaders,
  getCivSmsData,
};
