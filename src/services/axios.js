import Axios from "axios";
import { STORAGES } from "constants/storageConstants";
import { getLocalStorage } from "utils/localStorageUtils";

// stagin URL
// let baseURL = "https://nft.neurologically.com/api/v1";

// let baseURL = "http://localhost:8080/api/v1";

// dev URL
let baseURL = process.env.REACT_APP_API_KEY

// if (process.env.NODE_ENV === "production") {
//   baseURL = "https://nft.neurologically.com/api/v1";
// }

export { baseURL };

export default function getAxiosInst(header = "", headerData) {
  const options = {
    baseURL,
  };
  if (header === "ipHeader") {
    let data = getLocalStorage("ipAddress");
    options.headers = {
      address: data.IPv4,
      country_name: data.country_name,
      postal_code: data.postal,
      city: data.city,
    };
  }
  if (header === "authHeader") {
    const token = getLocalStorage(STORAGES.token);
    options.headers = {
      Authorization: "Bearer " + (headerData ?? token),
    };
  }

  return Axios.create(options);
}

export const apiHandler = async (
  apiCall,
  { onSuccess, onError, onFinally } = {},
  options = { sync: false, allowdStatus: [200, 201, 204] }
) => {
  let response;
  try {
    response = await apiCall();
    const data = response?.data;

    if (options.allowdStatus.includes(response?.status)) {
      if (onSuccess && options.sync) onSuccess(data);
      else if (onSuccess) await onSuccess(data);
    } else {
      const error = new Error("Some Error");
      error.code = response?.status;
      throw error;
    }
  } catch (error) {
    if (Axios.isCancel(error)) {
    } else {
      response = error.response;
      onError && onError(error, response);
    }
  } finally {
    onFinally && onFinally();
    return response;
  }
};
