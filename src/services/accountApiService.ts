import axios from "axios";
import Account from "../models/Account";

const baseURL = process.env.REACT_APP_API_URL || "";

export const getAllAccounts = (): Promise<Account[]> => {
  return axios.get(`${baseURL}/accounts`).then((res) => res.data);
};
