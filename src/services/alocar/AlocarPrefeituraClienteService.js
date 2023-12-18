import { Http } from "../../conf/GlobalConf";

class AlocarPrefeituraClienteService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/movimentacaoPrefeituraCliente", obj).then((response) => {
      res = response.data;
    });

    return res;
  }

  static async getSaldo() {
    let res = null;
    await Http.get("/api/movimentacaoPrefeituraCliente").then((response) => {
      res = response.data;     
       });
    return res;
  }

  static async edit(id) {
    let res = null;

    await Http.get(`/api/movimentacaoPrefeituraCliente/${id}`).then((response) => {
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

    await Http.put(`/api/movimentacaoPrefeituraCliente/${id}`, data).then((response) => {
      res = response.data;
    });

    return res;
  }

  static async Delete(id) {
    let res = null;


    await Http.delete(`/api/movimentacaoPrefeituraCliente/${id}`).then((response) => {
      res = response.data;
    });

    return res;
  }
}
export default AlocarPrefeituraClienteService;