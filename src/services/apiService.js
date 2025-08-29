const axios = require('axios');
const { apiEndpoint, apiKey, tenantId, token } = require('../config/env');

let authToken = null;

const apiClient = axios.create({
  baseURL: apiEndpoint
});

async function getAuthToken() {
  if (authToken) {
    return authToken;
  }

  // If TOKEN is provided in .env use it
  if (token) {
    authToken = token;
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    return authToken;
  }

  // otherwise obtain token using API_KEY + TENANT_ID
  if (apiKey && tenantId) {
    try {
      const response = await apiClient.post(`/multitenancy/tenant/${tenantId}/token`, {
        api_key: apiKey,
      });
      authToken = response.data.token;
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      return authToken;
    } catch (err) {
      console.error("Error obtaining auth token:", err.message);
      if (err.response) {
        console.error("Status:", err.response.status, "Data:", err.response.data);
      }
      throw new Error('Failed to obtain authentication token');
    }
  }

  throw new Error('No valid authentication method available');
}

async function sendOfferToAPI(offer) {
  try {

    await getAuthToken();
    const res = await apiClient.post(`/issue-credential-2.0/create-offer`, offer);
    return res.data;  
  } catch (err) {
    console.error("Error sending to API:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status, "Data:", err.response.data);
    }
    throw err; 
  }
}

async function prepareURLAPI(payload) {
  try {
    await getAuthToken();
    const res = await apiClient.post(`/out-of-band/create-invitation`, payload);
    return res.data;
  } catch (err) {
    console.error("Error preparing OOB API:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status, "Data:", err.response.data);
    }
    throw err;
  }
}

async function getIssuanceStatus(cred_ex_id) {
  try {
    await getAuthToken(); 
    const res = await apiClient.get(`/issue-credential-2.0/records/${cred_ex_id}`);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error('Status',err.response.status , 'Data', err.response.data )
    }
    throw err;
  }
}

async function issueCredential(cred_ex_id) {
  try {
    await getAuthToken();
    const res = await apiClient.post(`/issue-credential-2.0/records/${cred_ex_id}/issue`);
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error('Status',err.response.status , 'Data', err.response.data )
    }
    throw err;
  }
}

module.exports = { sendOfferToAPI, prepareURLAPI, getIssuanceStatus, issueCredential, getAuthToken };
