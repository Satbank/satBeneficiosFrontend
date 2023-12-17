import { Http } from "../../conf/GlobalConf";

class CartaoService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/cartao", obj).then((response) => {
      res = response.data;
    });

    return res;
  }

  static async getCartoes(searchString, page = 1, pageSize = 5) {
    let res = null;
    const params = searchString
      ? { params: { search: searchString, page, pageSize } }
      : { params: { page, pageSize } };

    try {
      const response = await Http.get("/api/cartao", params);
      res = response.data;
      
     
    } catch (error) {
    
     
    }

    return res;
  }


  static async edit(id) {
    let res = null;

    await Http.get(`/api/cartao/${id}`).then((response) => {
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

    await Http.put(`/api/cartao/${id}`, data).then((response) => {
      res = response.data;
    });

    return res;
  }

  static async Delete(id) {
    let res = null;


    await Http.delete(`/api/cartao/${id}`).then((response) => {
      res = response.data;
    });

    return res;
  }
}
export default CartaoService;