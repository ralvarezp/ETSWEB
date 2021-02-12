import { valida } from "../lib/util.js";

/** @typedef {Object} ParamPasatiempo
 * @property {string} id
 * @property {string} nombre */

export class InfoPasatiempo {
  /** @param {ParamPasatiempo} param0 */
  constructor({ id, nombre }) {
    this.id = id;
    this.nombre = nombre;
  }
  valida() {
    valida(this.nombre, "Falta proporcionar el nombre.");
  }
}
