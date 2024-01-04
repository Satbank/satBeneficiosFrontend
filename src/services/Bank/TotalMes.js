import { Http } from "../../conf/GlobalConf";

class TotalMes {


  static async getTotalMes(obj) {
    let res = null;

    await Http.get("/api/totalmes").then((response) => {
      res = response.data;     
    });

    return res;
  }

  static async getTotalAno(obj) {
    let res = null;

    await Http.get("/api/totalano").then((response) => {
      res = response.data;     
    });

    return res;
  }

  static async getTotalCartoes(obj) {
    let res = null;

    await Http.get("/api/totalcartoes").then((response) => {
      res = response.data;     
    });

    return res;
  }

  static async getTotalClientesBase(obj) {
    let res = null;

    await Http.get("/api/totalclientesbase").then((response) => {
      res = response.data;     
    });

    return res;
  }

  static async getTotalComerciosBase(obj) {
    let res = null;

    await Http.get("/api/totalcomerciosbase").then((response) => {
      res = response.data;     
    });

    return res;
  }

}
export default TotalMes;