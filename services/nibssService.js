const axios = require("axios");

const verifyBVN = async (bvn) => {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/verify-bvn`,
      { bvn },
      {
        headers: {
          clientid: process.env.NIBSS_CLIENT_ID,
          secret: process.env.NIBSS_CLIENT_SECRET
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const verifyNIN = async (nin) => {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/verify-nin`,
      { nin },
      {
        headers: {
          clientid: process.env.NIBSS_CLIENT_ID,
          secret: process.env.NIBSS_CLIENT_SECRET
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

module.exports = {
  verifyBVN,
  verifyNIN
};