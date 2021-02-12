import { DaoAbc } from "../lib/DaoAbc.js";
import { paraTodos } from "../lib/util.js";
import { DaoPasatiempos } from "./DaoPasatiempos.js";
import { DaoPrivilegios } from "./DaoPrivilegios.js";
import { DaoStorage } from "./DaoStorage.js";
import { InfoUsuario } from "./InfoUsuario.js";

/** @implements {DaoAbc<InfoUsuario>} */
export class DaoUsuarios {
  /** @param {{collection: (col: string) => any;}} firestore
   * @param {DaoPasatiempos} daoPasatiempos
   * @param {DaoPrivilegios} daoPrivilegios
   * @param {DaoStorage} daoStorage */
  constructor(firestore, daoPasatiempos, daoPrivilegios, daoStorage) {
    this._colección = firestore.collection("USUARIO");
    this._daoPasatiempos = daoPasatiempos;
    this._daoPrivilegios = daoPrivilegios;
    this._daoStorage = daoStorage;
  }
  /** Crea un usuario a partir de un documento.
 * @return {Promise<InfoUsuario>} */
  async _cargaUsuario(doc) {
    if (doc.exists) {
      const data = doc.data();
      return new InfoUsuario({
        email: doc.id,
        IPN: null,
        urlDeIPN: await this._daoStorage.url(doc.id),
        pasatiempo: await this._daoPasatiempos.busca(data.PAS_ID),
        privilegios: await this._daoPrivilegios.buscaMuchos(data.PRIV_IDS)
      });
    } else {
      return null;
    }
  }

  /** @param {(error: Error)=>void} callbackError
   * @param {(modelos:InfoUsuario[])=>void} callback */
  consulta(callbackError, callback) {
    this._colección.onSnapshot(
      async querySnapshot => callback(await Promise.all(
        paraTodos(querySnapshot, doc => this._cargaUsuario(doc)))),
      /** @param {Error} error */
      error => {
        callbackError(error);
        // Intenta reconectarse.
        this.consulta(callbackError, callback);
      });
  }
  /** @param {string} id
   * @returns {Promise<InfoUsuario>} */
  async busca(id) {
    let doc = id ? await this._colección.doc(id).get() : { exists: false };
    return this._cargaUsuario(doc);
  }
  /** @param {InfoUsuario} modelo
   * @returns {Promise<void>} */
  async _modificaInterno(modelo) {
    await this._colección.doc(modelo.email).set({
      PAS_ID: modelo.pasatiempo ? (modelo.pasatiempo.id || null) : "",
      PRIV_IDS: modelo.privilegios.map(p => p.nombre)
    });
    if (modelo.IPN && modelo.IPN.size > 0) {
      await this._daoStorage.sube(modelo.email, modelo.IPN);
    }
  }
  /** @param {InfoUsuario} modelo
   * @returns {Promise<void>} */
  async agrega(modelo) {
    modelo.validaAlAgregar();
    await this._modificaInterno(modelo);
  }
  /** @param {InfoUsuario} modelo
   * @returns {Promise<void>} */
  async modifica(modelo) {
    modelo.validaAlModificar();
    await this._modificaInterno(modelo);
  }
  /** @param {string} id
   * @returns {Promise<void>} */
  async elimina(id) {
    await this._colección.doc(id).delete();
    await this._daoStorage.elimina(id);
  }
}
