import { Http } from "../../conf/GlobalConf";

class TotalMes {


  static async getTotalMes(obj) {
    let res = null;

    await Http.get("/api/totalmes").then((response) => {
      res = response.data;     
    });

    return res;
  }

}
export default TotalMes;