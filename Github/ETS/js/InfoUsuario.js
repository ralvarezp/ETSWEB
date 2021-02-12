mport { valida } from "../lib/util.js";
import { InfoPasatiempo } from "./InfoPasatiempo.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";

/** @typedef {Object} ParamUsuario
 * @property {string} email
 * @property {File} IPN
 * @property {string} urlDeIPN
 * @property {InfoPasatiempo} pasatiempo
 * @property {InfoPrivilegio[]} privilegios */
export class InfoUsuario {
  /** @param {ParamUsuario} param0  */
  constructor({email, IPN, urlDeIPN, pasatiempo, privilegios}) {
    this.email = email;
    this.IPN = IPN;
    this.urlDeIPN = urlDeIPN;
    this.pasatiempo = pasatiempo;
    this.privilegios = privilegios;
  }
  validaAlAgregar() {
    valida(this.email, "Falta proporcionar el email.");
    valida(this.IPN && this.IPN.size > 0,
       "Falta proporcionar el IPN.");
  }
  validaAlModificar() {
    valida(this.email, "Falta proporcionar el email.");
  }
}
