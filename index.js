require("dotenv").config();
const nodeCache = require("node-cache");

const cache = new nodeCache();
const { API_SEND_SMS_URL, API_CONTRACTS_URL } = require("./constants");
const { sendRequest } = require("./api");

const {
  formatDataForApi,
  getAccessToken,
  formatPhoneNumber,
  buildRequestHeaders,
  getCivSmsData,
} = require("./helpers");

class SmsOci {
  #authHeaderOci;

  #senderPhoneNumber;

  constructor(authHeaderOci, senderPhoneNumber) {
    this.#authHeaderOci = authHeaderOci;
    this.#senderPhoneNumber = senderPhoneNumber;
  }

  async sendSmsOci(recipientPhoneNumber, smsMessage) {
    const data = formatDataForApi(
      recipientPhoneNumber,
      smsMessage,
      this.#senderPhoneNumber,
    );
    const accessToken = await getAccessToken(this.#authHeaderOci);
    const apiUrl = `${API_SEND_SMS_URL}/tel:${formatPhoneNumber(
      this.#senderPhoneNumber,
    )}/requests`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await sendRequest(apiUrl, headers, "POST", data);
      console.log(
        `Sms Sended to ${recipientPhoneNumber} \ncontent : ${smsMessage}`,
      );
      return response;
    } catch (error) {
      console.error(error);
      cache.del("currentApiToken");
      return error;
    }
  }

  smsHistory() {}

  smsStatistics() {}

  smsPurchaseOrders() {}

  async smsRemaining() {
    const apiUrl = `${API_CONTRACTS_URL}`;
    const headers = await buildRequestHeaders(this.#authHeaderOci);

    try {
      const response = await sendRequest(apiUrl, headers);
      const civData = getCivSmsData(response);

      return civData;
    } catch (error) {
      console.error(error);
      // TODO: Better management of cache invalidation
      cache.del("currentApiToken");
      return error;
    }
  }
}

module.exports = SmsOci;
