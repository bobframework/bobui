export const link = () => {
    customElements.define("minibob-link", class Button extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
            const shadow = this.attachShadow({ mode: 'open' });

            const wrapper = document.createElement("a");
            wrapper.setAttribute('class', 'wrapper');

            const style = document.createElement("style");
            style.textContent = `
                .wrapper{
                    -webkit-font-smoothing: antialiased;
                    font-size: inherit;
                    font-weight: inherit;
                    outline: none;
                    margin:0;
                    padding:0;
                }
                [language="en-us"] {
                    font-family: Segoe UI;
                }
                
                [language="zh-cn"] {
                    font-family: Microsoft YaHei;
                }

                a[underline="false"]{
                    font-size:16px;
                    text-decoration: none;
                }

                a{
                    text-underline-offset: 10px;
                    text-decoration-thickness: 2px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    position: relative;
                }

                a:hover{
                    color:#0078d4 !important;
                    text-decoration: underline;
                    text-decoration-thickness: 2px;
                    text-underline-offset: 10px;
                    text-decoration-color: #0078d4;
                }

                a:hover[hover-underline="false"]{
                    color:#0078d4 !important;
                    text-decoration: none;
                }

                a[disabled="true"],a[disabled="true"]:hover{
                    color:rgb(161, 159, 157)!important;
                    text-decoration: none;
                    cursor: default;
                }
            `;

            shadow.appendChild(style);
            shadow.appendChild(wrapper);


            wrapper.classList.add(this.getAttribute("disabled") || "false");

            if (this.getAttribute("disabled") != "true") {
                wrapper.setAttribute("target", "_blank");
                wrapper.setAttribute("href", this.getAttribute("href"));
            }

            wrapper.innerHTML = `
                <slot></slot>
            `
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "color":
                    this.shadowRoot.querySelector('.wrapper').style.color = `${newValue}`;
                    break;
                case "size":
                    this.shadowRoot.querySelector('.wrapper').style.fontSize = `${newValue}px`;
                    break;
                default:
                    this.shadowRoot.querySelector('.wrapper').setAttribute(name, newValue);
                    break;
            }
        }
        static get observedAttributes() {
            return ["language", "href", "color", "underline", "hover-underline", "size", "disabled"];
        }
    });
}