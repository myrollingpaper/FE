// axios instance
import axios from "axios";

const instance = axios.create({
  baseURL: ` http://52.78.82.46:8080/api/`,
  // Bearer: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNjcxMDgxMTEzLCJpYXQiOjE2NzEwNzc1MTN9.IpXI8Re_VkJ0N8zhrzjdJZ1x1C3TYrC_xZkcLgdQl3I`,
});

instance.interceptors.request.use(
  (config) => {
    console.log("요청 보내기 전");
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
      return config;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

export default instance;
