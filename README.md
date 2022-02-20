
# SmsOci

[![Version](https://img.shields.io/badge/sms--oci-V1.0.3-blue)](https://github.com/agatapouglof/SmsOci)

Simple Node.js Sdk to send sms to a Number in CIV using Orange Côte d'ivoire (OCI) api



## Features

- Send Sms to a Phone Number in Ivory Coast
- See Sms Usage (TODO)
- See purchase histoy (TODO)


## Installation

```bash
  npm i --save sms-oci
```


## Usage/Examples

### Init SDK
```javascript
const SmsOciSdk = require("sms-oci");

// Authentication key to get from Orange developer Platform on Orange CIV  Sms Api
const authenticationHearder = "ababababababababababg==";

// phone number registered on Orange CIV developer api (Dev Phone Number)
const senderPhoneNumber = "070000000012" ;

const SmsOci = new SmsOciSdk(authenticationHearder, senderPhoneNumber);

```

### Basic send Sms

```javascript
const SmsOci = new SmsOciSdk(authenticationHearder, senderPhoneNumber);

const recipientPhoneNumber = "0233445566";

SmsOci.sendSmsOci(recipientPhoneNumber, "test message");

```