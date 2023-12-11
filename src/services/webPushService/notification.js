// /notification/user/:id

import getAxiosInst from "services/axios";

const BASE_ENDPOINT = "/notification";
// http://localhost:8080/api/v1/notification/subscribe

export const getNotifications = (id, auth_token, limit, offset) => {
  return getAxiosInst("authHeader", auth_token).get(
    `${BASE_ENDPOINT}/user/${id}?limit=${limit}&offset=${offset}`
  );
};

export const subscribeNotification = (auth_token, subscription) => {
  return getAxiosInst("authHeader", auth_token).post(
    `${BASE_ENDPOINT}/subscribe/`,
    subscription
  );
};
