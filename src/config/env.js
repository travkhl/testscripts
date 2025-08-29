require('dotenv').config();

if (!process.env.API_ENDPOINT) {
  throw new Error("Missing API_ENDPOINT in .env file");
}

// Accept either TOKEN or API_KEY + TENANT_ID
if (!process.env.TOKEN) {
  if (!process.env.API_KEY || !process.env.TENANT_ID) {
    throw new Error("Missing authentication: provide either TOKEN or both API_KEY and TENANT_ID in .env file");
  }
}

if (!process.env.CREDENTIAL_DEFINITION) {
  throw new Error("Missing CREDENTIAL_DEFINITION in .env file");
}
if (!process.env.ISSUER_DID) {
  throw new Error("Missing ISSUER_DID in .env file");
}
if (!process.env.SCHEMA_NAME) {
  throw new Error("Missing SCHEMA_NAME in .env file");
}
if (!process.env.SCHEMA_VERSION) {
  throw new Error("Missing SCHEMA_VERSION in .env file");
}

module.exports = {
  apiKey: process.env.API_KEY,
  tenantId: process.env.TENANT_ID,
  token: process.env.TOKEN,
  apiEndpoint: process.env.API_ENDPOINT,
  credentialDefinition: process.env.CREDENTIAL_DEFINITION,
  issuerDid: process.env.ISSUER_DID,
  schemaName: process.env.SCHEMA_NAME,
  schemaVersion: process.env.SCHEMA_VERSION
};
