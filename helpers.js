var deburr = require("lodash.deburr");
const nodeCache = require("node-cache");
const cache = new nodeCache();
const { SENDER_PHONE_NUMBER } = require("./constants");
const { getApiAccessToken } = require("./api");

/**
 *
 * ******* PRIVATE FUNCTIONS *******
 */

const cleanMessage = (message) => {
  return deburr(message);
};
const cacheApiToken = (token, ttl = 3600) => {
  cache.set("currentApiToken", token, ttl);
};

/**
 *
 * ******* PUBLIC FUNCTIONS ******
 */

const formatPhoneNumber = (phoneNumber) => {
  return `+225${phoneNumber}`;
};

const getAccessToken = async (authHearder) => {
  if (cache.has("currentApiToken")) return cache.get("currentApiToken");
  const { access_token: accessToken } = await getApiAccessToken(authHearder);
  cacheApiToken(accessToken);
  return accessToken;
};

const formatDataForApi = (
  recipientPhoneNumber = "",
  message = "test Default message",
  senderPhoneNumber = SENDER_PHONE_NUMBER
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

module.exports = {
  getAccessToken,
  formatPhoneNumber,
  formatDataForApi,
};