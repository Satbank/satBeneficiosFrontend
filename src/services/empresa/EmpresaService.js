import { Http } from "../../conf/GlobalConf";

class EmpresaService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/comercio", obj).then((response) => {
      res = response.data;
    });

    return res;
  }
  static async getEmpresas() {
    let res = null;
    await Http.get("/api/comercio").then((response) => {
      res = response.data;   
     
    });
    return res;
  }
  static async edit(id) {
    let res = null;

    await Http.get(`/api/comercio/${id}`).then((response) => {
      res = response.data;     
    
    });
    return res;
  }
  static async Update(id, categoria) {
    let res = null;
  
    const data = {
      id: id,
      categoria: categoria,
    };
  
    await Http.put(`/api/comercio/${id}`, data).then((response) => {
      res = response.data;
    });
  
    return res;
  }

  static async Delete(id) {
    let res = null;
  

    await Http.delete(`/api/comercio/${id}`).then((response) => {
      res = response.data;
    });
  
    return res;
  }
}
export default EmpresaService;