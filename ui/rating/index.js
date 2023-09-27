export const rating = () => {
    customElements.define("minibob-rating", class Button extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
            const _self = this;

            const shadow = this.attachShadow({ mode: 'open' });

            const wrapper = document.createElement("div");
            wrapper.setAttribute('class', 'wrapper');

            const style = document.createElement("style");
            style.textContent = `
            rating {
                display: inline-flex;
            }

            input {
                appearance: none;
                margin: 0;
                box-shadow: none;
            }

            input::after {
                content: '\\2605';
                font-size: 32px;
            }

            rating:hover input:invalid::after,
            rating:focus-within input:invalid::after {
                color: #888;
            }

            input:invalid::after,
            rating:hover input:hover~input:invalid::after,
            input:focus~input:invalid::after {
                color: #ddd;
            }

            input:valid {
                color: orange;
            }

            input:checked~input:not(:checked)::after {
                color: #ccc;
                content: '\\2606';
            }
            `;


            shadow.appendChild(style);
            shadow.appendChild(wrapper);

            wrapper.innerHTML = `
                <slot name="star-rating-legend">
                    <legend>Rate your experience:</legend>
                </slot>
                <rating>
                    <input type="radio" name="rating" value="1" aria-label="1 star" required />
                    <input type="radio" name="rating" value="2" aria-label="2 stars" />
                    <input type="radio" name="rating" value="3" aria-label="3 stars" />
                    <input type="radio" name="rating" value="4" aria-label="4 stars" />
                    <input type="radio" name="rating" value="5" aria-label="5 stars" />
                </rating>
            `
            const inputs = wrapper.querySelectorAll("input");
            for (let index = 0; index < inputs.length; index++) {
                const input = inputs[index];
                console.log(input)
                input.addEventListener("change", (e) => {
                    _self.setAttribute("value", e.target.value);
                })
            }

        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "value") {
                if (newValue >= 1) {
                    this.shadowRoot.querySelectorAll("input")[newValue - 1].click();
                }
            }
        }
        static get observedAttributes() {
            return ["value"]
        }
    });
}