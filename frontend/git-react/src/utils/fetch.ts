import axios from "axios";
import { API_BASE_URL } from "../constants";

export const url = (endpoint: string) => `${API_BASE_URL}${endpoint}`

export const get = async (endpoint: string) => (await axios.get(url(endpoint))).data