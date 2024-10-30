import axios from "axios";
import camelize from "camelize-ts";
import { AnyObject } from "yup";
const BASE_URL = "http://localhost:3000";

export const postData = async (data: AnyObject, url: string) => {
  const response = await axios.post(BASE_URL + url, data);
  return camelize(response.data);
};

export const getData = async (url: string) => {
  const response = await axios.get(BASE_URL + url);
  return camelize(response.data);
};

export const deleteData = async (url: string) => {
  await axios.delete(`${BASE_URL}${url}`);
};
