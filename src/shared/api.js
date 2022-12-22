// axios instance
import axios from "axios";

const instance = axios.create({
  baseURL: ` http://52.78.82.46:8080/api/`,
  // Bearer: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNjcxMDgxMTEzLCJpYXQiOjE2NzEwNzc1MTN9.IpXI8Re_VkJ0N8zhrzjdJZ1x1C3TYrC_xZkcLgdQl3I`,
  // validateStatus: (status) => {
  //   return status < 500
  // }
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

const resInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  if (error.response.status === 401) {
    alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(resInterceptor, errorInterceptor);

export default instance;
