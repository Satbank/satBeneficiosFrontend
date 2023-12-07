import { Http } from "../../conf/GlobalConf";

class ClientesService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/cliente", obj).then((response) => {
      res = response.data;
    });

    return res;
  }
  static async getClientes() {
    let res = null;
    await Http.get("/api/cliente").then((response) => {
      res = response.data; 
      console.log(res)  
  
     
    });
    return res;
  }
  static async edit(id) {
    let res = null;

    await Http.get(`/api/cliente/${id}`).then((response) => {
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
  
    await Http.put(`/api/cliente/${id}`, data).then((response) => {
      res = response.data;
    });
  
    return res;
  }

  static async Delete(id) {
    let res = null;
  

    await Http.delete(`/api/cliente/${id}`).then((response) => {
      res = response.data;
    });
  
    return res;
  }
}
export default ClientesService;