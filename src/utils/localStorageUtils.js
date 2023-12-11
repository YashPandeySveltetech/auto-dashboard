/**
 * a function to get the value of a key from local storage
 * @param key the key to get the value of
 * @returns the value of the key
 */

import { STORAGES } from "constants/storageConstants";

export function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return "";
}

/**
 * a function to set the value of a key in local storage
 * @param key the key to set the value of
 * @param value the value to set
 * @returns {boolean} true if the value was set, false otherwise
 */

export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * a function to remove a key from local storage
 * @param key the key to remove
 * @returns {boolean} true if the key was removed, false otherwise
 *
 */

export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

export function clearLocalStorage() {
  try {
    localStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}

// export const setLoginLocalStorage = ({ id, token, loginType }) => {
//   setLocalStorage(STORAGES.isLogin, true);
//   setLocalStorage(STORAGES.loginType, loginType);
//   setLocalStorage(STORAGES.userId, id);
//   setLocalStorage(STORAGES.token, token);
// };

// export const removeLoginLocalStorage = () => {
//   removeLocalStorage(STORAGES.userId);
//   removeLocalStorage(STORAGES.token);
//   removeLocalStorage(STORAGES.isLogin);
//   removeLocalStorage(STORAGES.loginType);
// };
