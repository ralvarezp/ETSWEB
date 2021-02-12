import { DaoAbc } from "./DaoAbc.js";

/** Controlador de catálogo.
 * Es un ejemplo de Business Process (Proceso de Negocio).
 * @template T */
export class CtrlAbc {
  /** @param {string} mensajeNoEncontrado 
   * @param {DaoAbc<T>} daoAbc */
  constructor(mensajeNoEncontrado, daoAbc) {
    this.mensajeNoEncontrado = mensajeNoEncontrado;
    this.daoAbc = daoAbc;
  }
  /** @param {(error:Error)=>void} callbackError
   * @param {(modelos:T[])=>void} callback */
  consulta(callbackError, callback) {
    this.daoAbc.consulta(callbackError, callback);
  }
  /** @param {string} id
   * @returns {Promise<T>} */
  async busca(id) {
    const modelo = await this.daoAbc.busca(id);
    if (modelo) {
      return modelo;
    } else {
      throw new Error(this.mensajeNoEncontrado);
    }
  }
  /** @param {T} modelo */
  async agrega(modelo) {
    await this.daoAbc.agrega(modelo);
  }
  /** @param {T} modelo */
  async modifica(modelo) {
    await this.daoAbc.modifica(modelo);
  }
  /** @param {string} id */
  async elimina(id) {
    await this.daoAbc.elimina(id);
  }
}
