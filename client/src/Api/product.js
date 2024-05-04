import axios from "../axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/product",
    method: "get",
    params,
  });
  
  export const apiGetProduct = (pid) =>
    axios({
      url: "/product/" + pid,
      method: "get",
    });
  export const apiCreateProduct = (pid) =>
    axios({
      url: "/product/" + pid,
      method: "get",
    });
  export const apiUpdateProduct = (data,pid) =>
    axios({
      url: "/product/" + pid,
      method: "put",
      data
    });