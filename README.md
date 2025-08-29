# Credential Issuance CLI

## Overview
This project is a Node.js-based CLI tool for creating and issuing credentials through an API.  
It guides the user through providing credential details, sending them to the API, preparing an Out-of-Band (OOB) invitation, and generating a QR code for sharing.

---

## Features
- **Interactive CLI** prompts for credential details.
- **Offer Creation** using provided schema and credential definition.
- **API Communication** for sending offers and generating OOB invitations.
- **QR Code Generation** (displayed in terminal).
- **Environment Variable Validation** to prevent missing configuration issues.

---

## Basic Setup
- `.env` file configured with API and credential settings.
```
API_ENDPOINT=
TOKEN=          //optional if API_KEY and TENANT_ID are provided
API_KEY=        //optional if TOKEN is provided
TENANT_ID=      //optional if TOKEN is provided
CREDENTIAL_DEFINITION=
ISSUER_DID=
SCHEMA_NAME=
SCHEMA_VERSION=
```
- Node.js installed on your system.

---

## Installation

```bash
# Clone the repository
git clone <repository_url>

# Navigate into the project directory
cd <project_folder>

# Install dependencies
yarn install


# Development run
bash run.sh
```

## Example CLI Input

```bash
Enter your first name: John
Enter your last name: Doe
Enter your date of birth (YYYYMMDD): 20000219
Enable auto issuance? (yes/no): yes
```


