import { DaoUsuarios } from "./DaoUsuarios.js";

/** @typedef {Object} UsuarioAutorizado
 * @property {string} email
 * @property {string} nombre
 * @property {string} urlFoto
 * @property {Set<string>} privilegios  */

export class CtrlSesión {
  /** @param {Object} auth Sistema de autenticación de Firebase.
   * @param {Object} provider Proveedor de autenticación de Firebase.
   * @param {DaoUsuarios} daoUsuarios */
  constructor(auth, provider, daoUsuarios) {
    this._auth = auth;
    this._provider = provider;
    this._daoUsuarios = daoUsuarios;
  }

  /**
   * @param {string} privilegio
   * @returns {Promise<UsuarioAutorizado>}  */
  async protege(privilegio) {
    return new Promise((resolve, reject) => {
      /* Escucha cambios de usuario. Recibe una función que se invoca cada que
       * hay un cambio en la autenticación y recibe el modelo con las
       * características del usuario o null si no ha iniciado sesión .*/
      this._auth.onAuthStateChanged(async usuarioAuth => {
        if (usuarioAuth && usuarioAuth.email) {
          // Usuario aceptado.
          /** @type {Set<string>} */
          let privilegios = new Set();
          const usuario = await this._daoUsuarios.busca(usuarioAuth.email);
          if (usuario) {
            const arrPrivilegios = usuario.privilegios.map(p => p.nombre);
            privilegios = new Set(arrPrivilegios);
            if (!privilegio) {
              resolve({
                email: usuarioAuth.email,
                nombre: usuarioAuth.displayName || "",
                urlFoto: usuario.urlDeAvatar || usuarioAuth.photoURL || "",
                privilegios
              });
            } else if (privilegios.has(privilegio)) {
              resolve({
                email: usuarioAuth.email,
                nombre: usuarioAuth.displayName || "",
                urlFoto: usuarioAuth.photoURL || "",
                privilegios
              });
            } else {
              reject(new Error("El usuario no está autorizado."));
            }
          } else {
            reject(new Error("El usuario no está registrado."));
          }
        } else {
          // No ha iniciado sesión. Pide datos para iniciar sesión.
          this._auth.signInWithRedirect(this._provider);
          //auth.signInWithPopup(provider);
          //auth.signInAnonymously();
        }
      },
        // Función que se invoca si hay un error al verificar el usuario.
        reject);
    });
  }

  async terminaSesión() {
    await this._auth.signOut();
  }
}
