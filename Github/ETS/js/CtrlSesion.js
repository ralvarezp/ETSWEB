import { DaoUsuarios } from "./DaoUsuarios.js";


export class CtrlSesión {
 
  constructor(auth, provider, daoUsuarios) {
    this._auth = auth;
    this._provider = provider;
    this._daoUsuarios = daoUsuarios;
  }


  async protege(privilegio) {
    return new Promise((resolve, reject) => {
     
      this._auth.onAuthStateChanged(async usuarioAuth => {
        if (usuarioAuth && usuarioAuth.email) {
         
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
         
          this._auth.signInWithRedirect(this._provider);
         
        }
      },
       
        reject);
    });
  }

  async terminaSesión() {
    await this._auth.signOut();
  }
}
