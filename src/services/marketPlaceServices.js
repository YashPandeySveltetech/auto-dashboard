import getAxiosInst from "./axios";

const BASE_ENDPOINT = "/drop";

export const getAllDrops = (auth_token, limit, offset) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}?status=SaleCreated&limit=${limit}&offset=${offset}`
  );
};

export const getLiveDrops = (auth_token, limit, offset) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/live?status=SaleCreated&limit=${limit}&offset=${offset}`
  );
};

export const getWhitelistStatus = (auth_token, id) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/whitelist?drop_id=${id}`
  );
};
