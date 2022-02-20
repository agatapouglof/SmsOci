require("dotenv").config();
const nodeCache = require("node-cache");
const cache = new nodeCache();
const { API_SEND_SMS_URL } = require("./constants");
const { sendRequest } = require("./api");

const {
  formatDataForApi,
  getAccessToken,
  formatPhoneNumber,
} = require("./helpers");

class SmsOci {
  #authHeaderOci;
  #senderPhoneNumber;

  constructor(authHeaderOci, senderPhoneNumber) {
    this.#authHeaderOci = authHeaderOci;
    this.#senderPhoneNumber = senderPhoneNumber;
  }

  async sendSmsOci(recipientPhoneNumber, smsMessage) {
    const data = formatDataForApi(recipientPhoneNumber, smsMessage);
    const accessToken = await getAccessToken(this.#authHeaderOci);

    const apiUrl = `${API_SEND_SMS_URL}/tel:${formatPhoneNumber(
      this.#senderPhoneNumber
    )}/requests`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await sendRequest(apiUrl, "POST", data, headers);
      console.log("message sended ok");
      return response;
    } catch (error) {
      console.error(error);
      cache.del("currentApiToken");
    }
  }
  smsHistory() {}

  smsStatistics() {}

  smspurchaseOrders() {}
}

module.exports = SmsOci;
