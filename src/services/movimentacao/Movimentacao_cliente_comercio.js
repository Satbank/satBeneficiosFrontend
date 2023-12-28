import { Http } from "../../conf/GlobalConf";

class Movimentacao_cliente_comercio {
  static async create(obj) {
    let res = null;
    await Http.post("/api/movimentacaoClienteComercio", obj).then((response) => {
      res = response.data;
    });
    return res;
  }
  
  static async estornar(obj) {
    let res = null;
    await Http.post("/api/estorno", obj).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async getRelatorios(quantidadeDias) {
    let res = null;    
    await Http.get(`/api/relatorioComercio?dias=${quantidadeDias}`).then((response) => {
      res = response.data;
    });
    return res;
  }
  
  static async edit(id) {
    let res = null;

    await Http.get(`/api/movimentacaoClienteComercio/${id}`).then((response) => {
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


    await Http.delete(`/api/movimentacaoClienteComercio/${id}`).then((response) => {
      res = response.data;
    });

    return res;
  }
}
export default Movimentacao_cliente_comercio;