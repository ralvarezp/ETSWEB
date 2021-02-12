import { DaoAbc } from "../lib/DaoAbc.js";
import { paraTodos, trims } from "../lib/util.js";
import { InfoPasatiempo } from "./InfoPasatiempo.js";


export class DaoPasatiempos {

  constructor(firestore) {
    this._colección = firestore.collection("PASATIEMPO");
  }
  _cargaPasatiempo(doc) {
    if (doc.exists) {
      const data = doc.data();
      return new InfoPasatiempo({
        id: doc.id,
        nombre: data.PAS_NOMBRE
      });
    } else {
      return null;
    }
  }

  consulta(callbackError, callback) {
    this._colección.orderBy("PAS_NOMBRE").onSnapshot(
      querySnapshot => callback(
        paraTodos(querySnapshot, doc => this._cargaPasatiempo(doc))),
      error => {
        callbackError(error);

        this.consulta(callbackError, callback);
      }
    );
  }
  async busca(id) {
    let doc = id ? await this._colección.doc(id).get() : { exists: false };
    return this._cargaPasatiempo(doc);
  }
  async agrega(modelo) {
    modelo.valida();
    await this._colección.add({
      PAS_NOMBRE: trims(modelo.nombre)
    });
  }
  async modifica(modelo) {
    modelo.valida();
    await this._colección.doc(modelo.id).set({
      PAS_NOMBRE: trims(modelo.nombre)
    });
  }
  async elimina(id) {
    await this._colección.doc(id).delete();
  }
}
