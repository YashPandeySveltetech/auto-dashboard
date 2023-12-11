import getAxiosInst from "./axios";

const BASE_ENDPOINT = "/drop";

export const purchase = (auth_token, data) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/purchase`,
    data
  );
};

export const getDropDetails = (drop_id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/detail?id=${drop_id}`
  );
};
export const whitelistDrop = (auth_token, drop_id) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/whitelist`,
    { drop_id }
  );
};

export const getDropList = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/detail/?id=${id}`
  );
};

export const initialDropService = (auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/initialzeDrop`
  );
};
export const operatorDropsSearch = (id, auth_token, search = "") => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/user/${id}?status=SaleCreated&name=${search}`
  );
};
export const operatorDrops = (auth_token, search) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/user?status=SaleCreated`
  );
};

export const getDropDraftService = (auth_token, id, search = "") => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/user/${id}?status=draft&name=${search}`
  );
};
export const setDropTokensService = (data, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/setToken`,
    data
  );
};
export const getDefenderTransactionService = (search, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/defender/txn?search=${search}`
  );
};
export const getDropTransactionService = (drop_id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/dropData?id=${drop_id}`
  );
};

export const get = (drop_id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/dropData?id=${drop_id}`
  );
};

// export const updateDropTokensService = (dropId, data, auth_token) => {
//   return getAxiosInst("authHeader", auth_token).put(
//     `${BASE_ENDPOINT}/updateToken?drop_id=${dropId}`,
//     data
//   );
// };
export const deleteDraftService = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).delete(
    `${BASE_ENDPOINT}/delete?id=${id}`
  );
};
export const updateDropService = (data, auth_token, type = "") => {
  return getAxiosInst("authHeader", auth_token).put(
    `${BASE_ENDPOINT}/update?type=${type}`,
    data
  );
};

export const paymentDropbyPaypal = (data, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/payment`,
    { order: data }
  );
};

export const getDropDetailById = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/detail?id=${id}`
  );
};

export const getHomePageData = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(`${BASE_ENDPOINT}/feature`);
};
export const paymentTransaction = (data, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/payment`,
    { order: data }
  );
};

export const transactionCapture = (orderID, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/payment/${orderID}/capture`
  );
};
