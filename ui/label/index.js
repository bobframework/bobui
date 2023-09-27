export const label = () => {
    customElements.define("minibob-label", class Button extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
            const shadow = this.attachShadow({ mode: 'open' });

            const wrapper = document.createElement("div");
            wrapper.setAttribute('class', 'wrapper');

            const style = document.createElement("style");
            style.textContent = `
                .wrapper{
                    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 14px;
                    font-weight: 600;
                    color: rgb(50, 49, 48);
                    box-sizing: border-box;
                    box-shadow: none;
                    margin: 0px;
                    display: block;
                    padding: 5px 0px;
                    overflow-wrap: break-word;
                }

                /* disabled */

                span.true{
                    color: rgb(161, 159, 157);
                }

                div.true::after{
                    content: " *";
                    color: rgb(164, 38, 44);
                    padding-right: 12px;
                }
            `;

            wrapper.classList.add(this.getAttribute("required") || "false");



            shadow.appendChild(style);
            shadow.appendChild(wrapper);

            const span = document.createElement("span");
            span.classList.add(this.getAttribute("disabled") || "false");

            span.innerHTML = `
                <slot />
            `
            wrapper.appendChild(span);
        }
    });
}