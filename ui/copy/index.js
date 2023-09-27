export const xxx = () => {
    customElements.define("minibob-xxx", class Button extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
            const shadow = this.attachShadow({ mode: 'open' });

            const wrapper = document.createElement("div");
            wrapper.setAttribute('class', 'wrapper');

            const style = document.createElement("style");
            style.textContent = `
                .wrapper{

                }
                /*  */
            `;

            wrapper.classList.add(this.getAttribute("minibob-attr-type") || "Standard");
            wrapper.classList.add(this.getAttribute("minibob-attr-radius") || "Default");


            shadow.appendChild(style);
            shadow.appendChild(wrapper);

            wrapper.innerHTML = `
                <slot />
            `
        }
    });
}