export class DaoStorage {
  constructor(storage) {
    this._storage = storage;
  }
  /** @param {string} nombre nombre con que se sube el archivo.
   * @param {FormDataEntryValue} archivo archivo a subir.
   * @returns {Promise<void>} */
  async sube(nombre, archivo) {
    await this._storage.ref(nombre).put(archivo);
  }
  /** @param {string} nombre nombre del archivo.
   * @returns {Promise<string>} */
  async url(nombre) {
    try {
      return await this._storage.ref(nombre).getDownloadURL();
    } catch (e) {
      console.log(e);
      return "";
    }
  }
  /** @param {string} nombre nombre del archivo.
   * @returns {Promise<void>} */
  async elimina(nombre) {
    return await this._storage.ref(nombre).delete();
  }
}
