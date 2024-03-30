import { Http } from "../../conf/GlobalConf";

class ClientesService {
  static async create(obj) {
    let res = null;
    await Http.post("/api/cliente", obj).then((response) => {
      res = response.data;
    });
    return res;
  }
  static async trazerSaldoCartao(obj) {
    let res = null;
    await Http.post("/api/trazersaldocartao", obj).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async getClientes(searchString, page = 1, pageSize = 5) {
    let res = null;
    const params = searchString
      ? { params: { search: searchString, page, pageSize } }
      : { params: { page, pageSize } };
    try {
      const response = await Http.get("/api/cliente", params);
      res = response.data;     
    } catch (error) {
      // Lida com erros, se necessário     
    }
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