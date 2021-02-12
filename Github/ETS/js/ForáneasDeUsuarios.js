import { cod } from "../lib/util.js";
import { InfoPasatiempo } from "./InfoPasatiempo.js";
import { InfoPrivilegio } from "./InfoPrivilegio.js";

const SIN_PASATIEMPO = /* html */
  `<option value="">-- Sin Pasatiempo --</option>`;

export class ForáneasDeUsuarios {
  /**@param {InfoPrivilegio} privilegio */
  renderPrivilegio(privilegio) {
    return (/* html */
      `<em>${cod(privilegio.nombre)}</em><br>
      ${cod(privilegio.descripción)}`);
  }
  /** @param {HTMLSelectElement} select
   * @param {string} valor
   * @param {InfoPasatiempo[]} pasatiempos */
  muestraPasatiempos(select, valor, pasatiempos) {
    select.innerHTML = SIN_PASATIEMPO +
      pasatiempos.map(p => {
        const selected = p.id === valor ? "selected" : "";
        return (/* html */
          `<option value="${cod(p.id)}" ${selected}>${cod(p.nombre)}</option>`);
      }).join("");
  }
  /** @param {HTMLElement} elemento
   * @param {string[]} valor
   * @param {InfoPrivilegio[]} privilegios */
  muestraPrivilegios(elemento, valor, privilegios) {
    const set = new Set(valor || []);
    elemento.innerHTML = privilegios.map(p => {
      const checked = set.has(p.nombre) ? "checked" : "";
      return (/* html */
        `<li>
          <label>
            <input type="checkbox" name="privilegios"
                value="${cod(p.nombre)}" ${checked}>
            <span>${this.renderPrivilegio(p)}</span>
          </label>
        </li>`)
    }).join("");
  }
}
