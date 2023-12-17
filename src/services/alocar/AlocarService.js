import { Http } from "../../conf/GlobalConf";

class AlocarService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/movimentacaoPrefeitura", obj).then((response) => {
      res = response.data;
    });

    return res;
  }

  static async getSaldo() {
    let res = null;
    await Http.get("/api/movimentacaoPrefeitura").then((response) => {
      res = response.data;     
       });
    return res;
  }

  static async edit(id) {
    let res = null;

    await Http.get(`/api/movimentacaoPrefeitura/${id}`).then((response) => {
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

    await Http.put(`/api/movimentacaoPrefeitura/${id}`, data).then((response) => {
      res = response.data;
    });

    return res;
  }

  static async Delete(id) {
    let res = null;


    await Http.delete(`/api/movimentacaoPrefeitura/${id}`).then((response) => {
      res = response.data;
    });

    return res;
  }
}
export default AlocarService;