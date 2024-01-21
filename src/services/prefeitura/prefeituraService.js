import { Http } from "../../conf/GlobalConf";

class PrefeituraService {
  static async create(obj) {
    let res = null;
    await Http.post("/api/prefeitura", obj).then((response) => {
      res = response.data;
    });

    return res;
  }
  static async getPrefeitura() {
    let res = null;

    await Http.get("/api/prefeitura").then((response) => {
      res = response.data;   
  
     
    });
    return res;
  }
  static async edit(id) {
    let res = null;

    await Http.get(`/api/prefeitura/${id}`).then((response) => {
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
  
    await Http.put(`/api/prefeitura/${id}`, data).then((response) => {
      res = response.data;
    });
  
    return res;
  }

  static async Delete(id) {
    let res = null;
  

    await Http.delete(`/api/prefeitura/${id}`).then((response) => {
      res = response.data;
    });
  
    return res;
  }
}
export default PrefeituraService;