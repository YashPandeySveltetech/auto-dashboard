import getAxiosInst from "./axios";

const BASE_ENDPOINT = "/auth";

export const loginService = (Ip, { email, password } = {}) => {
  return getAxiosInst("ipHeader", Ip).post(`${BASE_ENDPOINT}/login`, {
    email: email,
    password: password,
  });
};

export const validateAuthTokenService = (token, id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/2fa/validateAuth  ", {
    id: id,
    token: token,
  });
};

export const signUpService = (
  Ip,
  { emailToken, phoneToken, walletAddress, ...restFields } = {}
) => {
  return getAxiosInst("ipHeader", Ip).post("/users/create?role=user", {
    ...restFields,
    verifiy_email_token: emailToken,
    verifiy_phone_token: phoneToken,
    wallet_address: walletAddress,
  });
};
