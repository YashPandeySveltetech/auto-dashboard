const { default: getAxiosInst } = require("./axios");

const BASE_ENDPOINT = "/nft";

export const NFTCreateService = (nftData, auth_token) => {
  console.log(nftData, "nftdata");

  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/create`,
    nftData
  );
};

export const getMetadetaById = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/metadata/${id}`
  );
};

export const getNftDetails = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `/drop/nftDetails?id=${id}`
  );
};
