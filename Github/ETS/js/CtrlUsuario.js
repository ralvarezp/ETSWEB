import { CtrlAbc } from "../lib/CtrlAbc.js";
import { DaoPasatiempos } from "./DaoPasatiempos.js";
import { DaoPrivilegios } from "./DaoPrivilegios.js";
import { DaoUsuarios } from "./DaoUsuarios.js";
import { InfoPasatiempo } from "./InfoPasatiempo.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";
import { InfoUsuario } from "./InfoUsuario.js";

export class CtrlUsuarios extends CtrlAbc {
  constructor(mensajeNoEncontrado, daoUsuarios, daoPasatiempos,
    daoPrivilegios) {
    super(mensajeNoEncontrado, daoUsuarios);
    this._daoPasatiempos = daoPasatiempos;
    this._daoPrivilegios = daoPrivilegios;
  }
  foráneas(callbackError, callbackPasatiempos, callbackPrivilegios) {
    this._daoPasatiempos.consulta(callbackError, callbackPasatiempos);
    this._daoPrivilegios.consulta(callbackError, callbackPrivilegios);
  }
}
