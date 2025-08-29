const { askQuestion, closePrompt } = require('../cli/prompts');
const { credentialDefinition, issuerDid, schemaName, schemaVersion } = require('../config/env');

async function createOffer() {
  console.log('Enter credential details to create an offer');
  const offer = {
    "auto_issue": true, 
    "auto_remove": true,
    "comment": "string",
    "credential_preview": {
      "@type": "issue-credential/2.0/credential-preview",
      "attributes": [
        {
          "name": "last_name",
          "value": ""
        },
        {
          "name": "first_name",
          "value": ""
        },
        {
          "name": "dob_dateint",
          "value": ""
        }
      ]
    },
    "filter": {
      "indy": {
        "cred_def_id": credentialDefinition,
        "issuer_did": issuerDid,
        "schema_issuer_did": issuerDid,
        "schema_name": schemaName,
        "schema_version": schemaVersion
      }
    },
    "trace": true
  };

  // Define the attributes that need user input and their corresponding prompts.
  const attributesToUpdate = [
    { name: "first_name", prompt: "Enter your first name: " },
    { name: "last_name", prompt: "Enter your last name: " },
    { name: "dob_dateint", prompt: "Enter your date of birth (YYYYMMDD): " }
  ];

  // Loop through the defined attributes and prompt the user for their values.
  for (const attrConfig of attributesToUpdate) {
    const attribute = offer.credential_preview.attributes.find(
      (attr) => attr.name === attrConfig.name
    );
    if (attribute) {
      attribute.value = await askQuestion(attrConfig.prompt);
    }
  }

  let autoIssueInput;
  let isValidInput = false;

  while (!isValidInput) {
    autoIssueInput = await askQuestion("Enable auto issuance? (yes/no): ");
    const normalizedInput = autoIssueInput.toLowerCase().trim();

    if (normalizedInput === 'yes') {
      offer.auto_issue = true;
      isValidInput = true;
    } else if (normalizedInput === 'no') {
      offer.auto_issue = false;
      isValidInput = true;
    } else {
      console.log("Invalid input. Please enter 'yes' or 'no'.");
    }
  }

  closePrompt();
  return offer;
}

module.exports = { createOffer };
