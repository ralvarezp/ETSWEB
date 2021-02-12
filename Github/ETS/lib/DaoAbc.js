/** @interface
 * @template T */
export class DaoAbc {
  /** @param {(error:Error)=>void} _callbackError
   * @param {(modelos:T[])=>void} _callback */
  consulta(_callbackError, _callback) {
    throw new Error("interface");
  }
  /** @param {string} _id
   * @returns {Promise<T>} */
  busca(_id) {
    throw new Error("interface");
  }
  /** @param {T} _modelo
   * @returns {Promise<void>} */
  agrega(_modelo) {
    throw new Error("interface");
  }
  /** @param {T} _modelo
   * @returns {Promise<void>} */
  modifica(_modelo) {
    throw new Error("interface");
  }
  /** @param {string} _id
   * @returns {Promise<void>} */
  elimina(_id) {
    throw new Error("interface");
  }
}
