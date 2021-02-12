class MiFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `Copyright &copy; ETS2021 Alvarez Parada Roberto Efraín.`;
    }
}
customElements.define("mi-footer", MiFooter);
