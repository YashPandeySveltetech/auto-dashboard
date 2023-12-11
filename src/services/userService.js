import { STORAGES } from "constants/storageConstants";
import { setSingleUserDetail } from "store/auth/authActions";
import { getLocalStorage } from "utils/localStorageUtils";
import store from "../store/";
import getAxiosInst from "./axios";

export const signUpUsingGoogle = (
  first_name,
  last_name,
  username,
  email,
  password,
  google_auth_token,
  Ip,
  country,
  wallet_address
) => {
  return getAxiosInst("ipHeader", Ip).post("/users/create/google", {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password,
    google_auth_token: google_auth_token,
    country: country,
    wallet_address: wallet_address,
  });
};
export const signIn = (email, password, Ip) => {
  return getAxiosInst("ipHeader", Ip).post("/auth/login", {
    email: email,
    password: password,
  });
};

//login with google auth

export const loginWithGoogle = (email, password, ipAddress) => {
  return getAxiosInst("ipHeader", ipAddress).post("/auth/loginWithGoogle", {
    email: email,
    password: password,
  });
};

export const loginWithWallet = (signature, wallet_address, ipAddress) => {
  return getAxiosInst("ipHeader", ipAddress).post("/auth/loginWithWallet", {
    signature: signature,
    wallet_address: wallet_address,
  });
};

//to send otp for forgetpassword

export const sendForgetPassowordOtp = (email) => {
  return getAxiosInst().post("/otp/forgetpassword", {
    search: email,
  });
};

export const handlePasswordChange = (
  otp_token,
  search,
  password,
  confirm_password
) => {
  return getAxiosInst().post("/users/changePassword", {
    otp_token: otp_token,
    search: search,
    password: password,
    confirm_password: confirm_password,
  });
};
// first_name,
// last_name,
// username,
// email,
// validPhone?.value ? validPhone?.value : phoneno,
// authToken,
// bio,
// twitter_link,
// instagram_link,
// otpRequired.phoneOtp
export const updateUserProfile = (authToken, data) => {
  return getAxiosInst("authHeader", authToken).put("/users/update", data);
};

//returns secret key and secret key url
export const setUp2FA = (id, token) => {
  return getAxiosInst("authHeader", token).post("/2fa/setupAuth", {
    id: id,
  });
};
//takes token no after Qr scan and isAuth true in UserSchema
export const verifyAuth = (id, token, secretkey, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/2fa/verify", {
    id: id,
    token: token,
    secretKey: secretkey,
  });
};

export const updateUserDetails = async (dispatch) => {
  try {
    const token = getLocalStorage(STORAGES.token);
    const userId = getLocalStorage(STORAGES.userId);
    const { data: user } = await singleUserDetails(userId, token);
    dispatch(setSingleUserDetail(user));
  } catch (error) {
    console.log("catch erro", error);
  }
  return;
};

export const uploadProfileIamge = (image, auth_token) => {
  let formData = new FormData();
  formData.append("image", image);
  let config = {
    headers: {
      Authorization: "Bearer " + auth_token,
    },
  };
  return getAxiosInst().post("/users/upload-image", formData, config);
};

export const uploadCoverIamge = (image, auth_token) => {
  let formData = new FormData();
  formData.append("image", image);
  let config = {
    headers: {
      Authorization: "Bearer " + auth_token,
    },
  };
  return getAxiosInst().post("/users/upload-cover-image", formData, config);
};

export const validateAuth = (token, id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/2fa/validateAuth  ", {
    id: id,
    token: token,
  });
};

export const getUserData = (auth_token) => {
  return getAxiosInst("authHeader", auth_token).get("/users");
};
export const getAllRequest = (auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    "/operator-req/?status=pending"
  );
};

export const getAbiDetails = (auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(`/users/contract/abi`);
};

export const resetPassword = ({ apiBody, auth_token }) => {
  return getAxiosInst("authHeader", auth_token).post(
    "/users/resetPassword",
    apiBody
  );
};

export const disableAuth = (token, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/2fa/disable2Fa", {
    token: token,
  });
};

export const getAllUsers = (auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    "/users/getAllUsers?user=true&admin=false&operator=false&limit=10&offset=0"
  );
};

//for signup page validation

export const validateUser = (validate) => {
  if (validate.type === "email") {
    return getAxiosInst().post("/users/validate", {
      email: validate.value,
    });
  }
  if (validate.type === "tel" || validate.type === "phone") {
    return getAxiosInst().post("/users/validate", {
      phone_number: validate.value.trim(),
    });
  }
  if (validate.type === "username") {
    return getAxiosInst().post("/users/validate", {
      username: validate.value.trim(),
    });
  }
  if (validate.type === "wallet_address") {
    return getAxiosInst().post("/users/validate", {
      wallet_address: validate.value.trim(),
    });
  }
};

export const usernameValidation = (username) => {
  return getAxiosInst().post("/users/validate", {
    username: username,
  });
};

export const forgetValidation = (otp, search) => {
  return getAxiosInst().post("/otp/forgetpassword/validate", {
    search: search,
    otp: otp,
  });
};

export const userEmailVerification = (userEmail) => {
  const token = store.getState().auth.authToken;

  return getAxiosInst("authHeader", token).post("/otp/email/send", {
    email: userEmail,
  });
};

export const userPhoneVerification = (userPhone) => {
  const token = store.getState().auth.authToken;
  return getAxiosInst("authHeader", token).post("/otp/phone/send", {
    phone_number: userPhone,
  });
};

export const userEmailOtpVerification = (userEmail, inputOtp) => {
  const token = store.getState().auth.authToken;
  return getAxiosInst("authHeader", token).post("/otp/email/validate", {
    email: userEmail,
    verifiy_email_otp: inputOtp,
  });
};

export const userPhoneOtpVerification = (userPhone, inputOtp) => {
  const token = store.getState().auth.authToken;
  return getAxiosInst("authHeader", token).post("/otp/phone/validate", {
    phone_number: userPhone,
    verifiy_phone_otp: inputOtp,
  });
};

export const loginHistory = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    "/history/loginHistory?limit=10&offset=0",
    {
      user_id: id,
    }
  );
};

export const updateWallet = (address, auth_token) => {
  return getAxiosInst("authHeader", auth_token).put("/users/update/wallet", {
    wallet_address: address,
  });
};

export const singleUserDetails = (id, auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(`/users/?id=${id}`);
};

export const getAllRequests = (auth_token) => {
  return getAxiosInst("authHeader", auth_token).get(
    `/operator-req/?status=pending`
  );
};

export const operatorRequest = () => {
  const token = store.getState().auth.authToken;
  return getAxiosInst("authHeader", token).post(`/operator-req/create`, {});
};

export const blockRequest = (id, status, reason, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/users/enableDisable", {
    id: id,
    status: status,
    reason: reason,
  });
};
export const operatorRequestAccepOrReject = (
  id,
  status,
  reason,
  auth_token
) => {
  return getAxiosInst("authHeader", auth_token).put("/operator-req/update", {
    id: id,
    reason: reason,
    status: status,
  });
};

export const revoke = (id, status, reason, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/users/enableDisable", {
    id: id,
    status: status,
    reason: reason,
  });
};

export const resonForRevokeRole = (txn_hash, reason, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post(
    "/users/updateRevokeReason",
    {
      txnhash: txn_hash,
      reason: reason,
    }
  );
};

export const requestCount = () => {
  const token = getLocalStorage("token");
  return getAxiosInst("authHeader", token).get("/operator-req/count");
};

export const hideEmail = (target, type) => {
  var email = target;

  var hiddenEmail = "";
  if (type === "email") {
    for (let i = 0; i < email.length; i++) {
      if (i < email.indexOf("@") - 3) {
        hiddenEmail += "x";
      } else {
        hiddenEmail += email[i];
      }
    }
  } else {
    for (let i = 0; i < email.length; i++) {
      if (i < email.length - 5) {
        hiddenEmail += "x";
      } else {
        hiddenEmail += email[i];
      }
    }
  }
  return hiddenEmail;
};
export const updateUserOperatorRequest = ({ apiBody, auth_token }) => {
  return getAxiosInst("authHeader", auth_token).put(
    "/users/updateUserOperatorRequest",
    apiBody
  );
};
export const operatorNftcollectables = (id, auth_token, search) => {
  return getAxiosInst("authHeader", auth_token).get(
    `/nft/?id=${id}&name=${search}`
  );
};
export const operatorNft = (id, auth_token, search = "") => {
  return getAxiosInst("authHeader", auth_token).get(
    `/nft/?id=${id}&name=${search}`
  );
};

export const subscribe = (subscription) => {
  return getAxiosInst().post("/notification/subscribe", {
    subscription,
  });
};
export const getAllOperators = () => {
  const token = getLocalStorage("token");
  return getAxiosInst("authHeader", token).get(
    `/users/operators?limit=10&offset=0`
  );
};

export const eventRoleGranted = (event, auth_token) => {
  return getAxiosInst("authHeader", auth_token).post("/users/contract-event", {
    event: event,
  });
};
