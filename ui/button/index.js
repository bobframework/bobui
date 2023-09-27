export const button = () => {
    customElements.define("minibob-button", class Button extends HTMLElement {
        constructor() {
            // Always call super first in constructor
            super();
            const shadow = this.attachShadow({ mode: 'open' });

            const wrapper = document.createElement("div");
            wrapper.setAttribute('class', 'wrapper');

            const style = document.createElement("style");
            style.textContent = `
                .wrapper{
                    display: flex;
                    align-items: center;
                    outline: transparent;
                    position: relative;
                    -webkit-font-smoothing: antialiased;
                    box-sizing: border-box;
                    cursor: pointer;
                    margin: 0;
                    text-decoration: none;
                    text-align: center;
                    user-select: none;
                    text-overflow: ellipsis;
                    text-align: center;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    text-align:center;
                    height:100%;
                    justify-content: center;
                }
                .button{
                    flex-wrap: nowrap;
                    justify-content: center;
                    align-items: center;
                }

                .wrapper[type="Standard"]{
                    border: 1px solid rgb(138, 136, 134);
                    background-color: rgb(255, 255, 255);
                    color: rgb(50, 49, 48);
                }
                .wrapper[type="Ghost"]{
                    border: 2px solid #FFF;
                    background-color: transparent;
                    color: #fff;
                }
                .wrapper[type="Primary"]{
                    border: 1px solid rgb(0, 120, 212);
                    background-color: rgb(0, 120, 212);
                    color: rgb(255, 255, 255);
                }
                .wrapper[type="Primary"]:hover{
                    border: 1px solid #058EFF;
                    background-color: #058EFF;
                }
                .wrapper[type="Warning"]{
                    border: 1px solid #D83B01;
                    background-color: #D83B01;
                    color: rgb(255, 255, 255);
                }
                .wrapper[type="Warning"]:hover{
                    border: 1px solid #F47119;
                    background-color: #F47119;
                }

                .wrapper[type="Disabled"]{
                    border: 1px solid #ccc;
                    background-color: #ccc;
                    color: rgb(255, 255, 255);
                    cursor: default;
                }

                .wrapper[type="Link"]{
                    cursor: default;
                }

                .dino{
                    border:solid 1px #ccc;
                    margin:0;
                    padding:0;
                }
                .dino canvas{
                    display:block;
                    background:#E6E6E6;
                }
            `;

            wrapper.setAttribute("type", (this.getAttribute("type") || "Standard"));

            shadow.appendChild(style);
            shadow.appendChild(wrapper);
            wrapper.innerHTML = `
                <slot />
            `
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "type") {
                this.shadowRoot.querySelector(".wrapper").setAttribute("type", newValue);
            }
            if (name === "type" && newValue === "dino") {
                const bg = new Image();
                const cactus = new Image();
                cactus.src = "data:image/jpeg;base64,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";
                const dino = new Image();
                dino.src = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAyHpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDBDcMwCPx7io5gOOyYcZwmkbpBxy8OJEqinsQZc+iMSev3s6XXAJMkKVOrWms2iIpyt6RlR9+Zsuy8A1NodK+nU2ArYXT6tdXoP+p0GvjRLSsXo/YOYb4LKuHfHkbxEMZEbMkSRhpGYBcoDLp/K1dt0/UL85rvaB5p0PZmHbUyu/a8y2TbW4q9A+YVhGwMiA+AEUjolqgxo1ojoVpeIMYAxSS2kH97OpB+jvtaYXohijMAAAGFaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1ulVSoOdpDikKEKQruoiGOpYhEslLZCqw4ml35Bk4YkxcVRcC04+LFYdXBx1tXBVRAEP0BcXZwUXaTE/yWFFjEeHPfj3b3H3TvA26oxxeiLA4pq6plkQsgXVgX/KwYQRgBRTIrM0FLZxRxcx9c9PHy9i/Es93N/jiG5aDDAIxDHmaabxBvEs5umxnmfOMQqokx8ThzV6YLEj1yXHH7jXLbZyzNDei4zTxwiFso9LPUwq+gK8QxxRFZUyvfmHZY5b3FWag3WuSd/YbCormS5TnMMSSwhhTQESGigihpMxGhVSTGQof2Eiz9s+9PkkshVBSPHAupQINp+8D/43a1Rmp5ykoIJoP/Fsj7GAf8u0G5a1vexZbVPAN8zcKV2/fUWMPdJerOrRY6A4W3g4rqrSXvA5Q4w+qSJumhLPpreUgl4P6NvKgAjt8DgmtNbZx+nD0COulq+AQ4OgYkyZa+7vDvQ29u/Zzr9/QD7EXLd/HypUQAADlVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6NzExNjBiYTktYmQwZi00N2E0LTg1ZjctM2U4OTdiMjI4ZGM4IgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNmYmM5ZGVjLWQ3ZWMtNDBlZS1hMGE2LWE4ZjI4NTQ5N2I5OSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjkyMTllY2Y3LTNmMTYtNGYzMy1iNWQyLTZhODY1NWQ1OGU0MyIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjk1NzE4NDcxNDM1ODI4IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzQiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzOjA5OjI2VDE2OjU0OjMxKzA4OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMzowOToyNlQxNjo1NDozMSswODowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIyNGJjYzYzLTUzZGYtNDMzNC1hMDRjLTdkMDkxN2M4NTI2YiIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOS0yNlQxNjo0ODoyNyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzU5NzFiZS1jZjk5LTRhMDEtYTZiYi03MmY0YTVjODJhM2YiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjMtMDktMjZUMTY6NTQ6MzEiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+FwWJGAAAAAZiS0dEAFMAUwBTGmiewwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+cJGgg2H/8mmSgAAADiSURBVGje7ZgxFoQgDETRxw2pOV1qzqiVjbv7XFYTQvZbWiDjnyQDKQV+lhEfLaVsT67XWnurY41MbsWWTu14ZdHh5EQkiQi27H3y6A3UWmkoiEMc4hCHOK0AnWfaLLaMEpyvyJItZ6u1F3GHZZ5a2Pocx5yj5pza8D/n3Plv9zQW64sfyM0w5+64In9jtU+W8NI4aCjR4hcJBXGzHFZH1x81N9MQ1zhHLl7SvYY4br8sKGqQy9HqDFtq2lObGOR+pXgmc+cKA3LEL6VGcby3DuSQ89LaIYc4hnjfcLYe5qHJ7WQKYYHoGqVvAAAAAElFTkSuQmCC";
                const canvas = document.createElement("canvas");
                this.shadowRoot.querySelector(".wrapper").innerHTML = '';
                this.shadowRoot.querySelector(".wrapper").appendChild(canvas);
                this.shadowRoot.querySelector(".wrapper").className = "dino";
                const _w = 200;
                const _h = 50;
                canvas.width = _w;
                canvas.height = _h;
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "green";
                ctx.fillRect(10, 10, 150, 100);

                const _store = {
                    _es: [],
                    _score: 0,
                    _state: 'processing'//processing,paused,ready_for_restart
                }

                class P {
                    constructor() {
                        this.tox = 0;
                        this.toy = 0;
                        this.x = 0;
                        this.y = 0;
                        this.die = false;
                    }
                    at(_x, _y) {
                        this.x = _x;
                        this.y = _y;
                    }
                    set_img(_img) {
                        this.img = _img;
                        this.w = _img.width / 3;
                        this.h = _img.height / 3;
                    }
                    up(_t) {
                        this.x += this.tox;
                        this.y += this.toy;
                    }
                    draw() {
                        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
                    }
                }

                class p extends P {
                    constructor() {
                        super();
                        this.set_img(dino);
                        this.at(10, 32);
                    }
                    up(_t) {
                        super.up(_t);
                        if (this.y <= 1) {
                            this.toy = 1;
                        }
                        if (this.y >= 32) {
                            this.toy = 0;
                            this.y = 32;
                        }
                        if (_t % 100 == 0) {
                            _store._es.push(new e());
                        }
                    }
                }

                class e extends P {
                    constructor(_p) {
                        super();
                        this.at(200, 30);
                        this.tox = -2;
                        this.set_img(cactus);
                    }
                    up(_t) {
                        super.up(_t);
                        if (this.x <= -40) {
                            this.die = true;
                        }
                    }
                }

                let _t = 0;

                const _loop = (_p) => {

                    ctx.clearRect(0, 0, _w, _h);

                    _store._es.map((e, i) => {
                        if (!e.die) {
                            e.draw();
                        }
                    });
                    _p.draw();

                    ctx.font = "10px Microsoft YaHei";
                    ctx.textAlign = "left";
                    ctx.fillStyle = "#000";
                    ctx.fillText(`${_store._score.toFixed(2)} m`, 5, 15);

                    if (_store._state === "paused") {
                        ctx.font = "14px Microsoft YaHei";
                        ctx.textAlign = "center";
                        ctx.fillStyle = "#000";
                        ctx.fillText("Paused", 100, 30);
                    }

                    if (_store._state === "ready_for_restart") {
                        ctx.font = "14px Microsoft YaHei";
                        ctx.textAlign = "center";
                        ctx.fillStyle = "#000";
                        ctx.fillText("Game Over", 100, 30);
                    }

                    if (_store._state === "processing") {
                        _t += 1;
                        _store._score += 0.01;

                        _p.up(_t);

                        _store._es.map((e, i) => {
                            if (!e.die) {
                                e.up(_t);
                                if (
                                    e.x < _p.x + _p.w * 0.75 &&
                                    e.x + e.w * 0.75 > _p.x &&
                                    e.y < _p.y + _p.h * 0.75 &&
                                    e.y + e.h * 0.75 > _p.y
                                ) {
                                    _store._state = "ready_for_restart";
                                }
                            } else {
                                _store._es.splice(i, 1);
                            }
                        });


                    }

                    requestAnimationFrame(() => {
                        _loop(_p);
                    });
                }



                dino.onload = () => {
                    const _p = new p();
                    document.addEventListener("keyup", ({ code }) => {
                        if (code === "KeyJ") {
                            if (_p.y == 32) {
                                _p.toy = -1;
                            }
                        }
                        if (code === "KeyP") {
                            if (_store._state === "processing") {
                                _store._state = "paused";
                                return false;
                            }

                            if (_store._state === "paused") {
                                _store._state = "processing";
                                return false;
                            }
                        }
                        if (code === "KeyR") {
                            if (_store._state === "ready_for_restart") {
                                //reset
                                _store._score = 0;
                                _p.y = 32;
                                _p.toy = 0;
                                _store._es.map((item, index) => { _store._es.splice(index, 1) });
                                _store._state = "processing";
                            }
                        }
                    });
                    _loop(_p);
                }
            }
        }
        static get observedAttributes() {
            return ["type"];
        }
    });
}