import axios from "axios";

const tokenServices = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete axios.defaults.headers.common.Authorization;
  },
};

export default tokenServices;
