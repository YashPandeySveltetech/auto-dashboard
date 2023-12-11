import getAxiosInst from "./axios";

export const getConvertedCurrency = (currency = "usd", id = "ethereum") => {
  return getAxiosInst({ withAuth: true }).get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`
  );
};

export const getIPAddress = () => {
  return getAxiosInst({ withAuth: false }).get(
    "https://geolocation-db.com/json/"
  );
};
