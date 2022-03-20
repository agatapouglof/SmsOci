const { formatPhoneNumber, formatDataForApi } = require("../helpers");

describe("Test helpers ", () => {
  test("Format phone number", () => {
    expect(formatPhoneNumber("0908775544")).toBe("+2250908775544");
  });

  test("Format data for api", () => {
    const recipient = "090909090909";
    const message = "message to send";
    const sender = "010101010101";

    const apiData = formatDataForApi(recipient, message, sender);
    expect(apiData).toBeDefined();
  });
});
