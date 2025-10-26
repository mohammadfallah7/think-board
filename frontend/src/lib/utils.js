import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
