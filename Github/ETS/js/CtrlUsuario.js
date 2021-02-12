import { CtrlAbc } from "../lib/CtrlAbc.js";
import { DaoPasatiempos } from "./DaoPasatiempos.js";
import { DaoPrivilegios } from "./DaoPrivilegios.js";
import { DaoUsuarios } from "./DaoUsuarios.js";
import { InfoPasatiempo } from "./InfoPasatiempo.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";
import { InfoUsuario } from "./InfoUsuario.js";

/** @extends {CtrlAbc<InfoUsuario>} */
export class CtrlUsuarios extends CtrlAbc {
  /** @param {string} mensajeNoEncontrado
   * @param {DaoUsuarios} daoUsuarios
   * @param {DaoPasatiempos} daoPasatiempos
   * @param {DaoPrivilegios} daoPrivilegios */
  constructor(mensajeNoEncontrado, daoUsuarios, daoPasatiempos,
    daoPrivilegios) {
    super(mensajeNoEncontrado, daoUsuarios);
    this._daoPasatiempos = daoPasatiempos;
    this._daoPrivilegios = daoPrivilegios;
  }
  /** @param {(error: Error)=>void} callbackError
   * @param {(pasatiempos:InfoPasatiempo[])=>void} callbackPasatiempos
   * @param {(privilegios:InfoPrivilegio[])=>void} callbackPrivilegios */
  foráneas(callbackError, callbackPasatiempos, callbackPrivilegios) {
    this._daoPasatiempos.consulta(callbackError, callbackPasatiempos);
    this._daoPrivilegios.consulta(callbackError, callbackPrivilegios);
  }
}
