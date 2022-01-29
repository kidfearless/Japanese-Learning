const DEFAULT_LANGUAGE = "ja";
export class Canvas {
    canvas;
    cxt;
    lineWidth;
    width;
    height;
    drawing;
    handwritingX;
    handwritingY;
    trace;
    step;
    redo_step;
    redo_trace;
    allowUndo;
    allowRedo;
    ondraw;
    constructor(cvs, lineWidth = 3) {
        this.canvas = cvs;
        this.cxt = cvs.getContext("2d") || (() => { throw new Error("Canvas context is not supported"); })();
        this.cxt.lineCap = "round";
        this.cxt.lineJoin = "round";
        this.lineWidth = lineWidth;
        this.width = cvs.width;
        this.height = cvs.height;
        this.drawing = false;
        this.handwritingX = [];
        this.handwritingY = [];
        this.trace = [];
        this.step = [];
        this.redo_step = [];
        this.redo_trace = [];
        this.allowUndo = false;
        this.allowRedo = false;
        this.ondraw = null;
        cvs.addEventListener("mousedown", this.mouseDown.bind(this));
        cvs.addEventListener("mousemove", this.mouseMove.bind(this));
        cvs.addEventListener("mouseup", this.mouseUp.bind(this));
        cvs.addEventListener("touchstart", this.touchStart.bind(this));
        cvs.addEventListener("touchmove", this.touchMove.bind(this));
        cvs.addEventListener("touchend", this.touchEnd.bind(this));
    }
    clear() {
        this.cxt.clearRect(0, 0, this.width, this.height);
    }
    setUndoRedo(undo, redo) {
        this.allowUndo = undo;
        this.allowRedo = undo ? redo : false;
        if (!this.allowUndo) {
            this.step = [];
            this.redo_step = [];
            this.redo_trace = [];
        }
    }
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
    }
    mouseDown(e) {
        this.cxt.lineWidth = this.lineWidth;
        this.handwritingX = [];
        this.handwritingY = [];
        this.drawing = true;
        this.cxt.beginPath();
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        this.cxt.moveTo(x, y);
        this.handwritingX.push(x);
        this.handwritingY.push(y);
    }
    mouseMove(e) {
        if (!this.drawing) {
            return;
        }
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        this.cxt.lineTo(x, y);
        this.cxt.stroke();
        this.handwritingX.push(x);
        this.handwritingY.push(y);
    }
    mouseUp() {
        let w = [];
        w.push(this.handwritingX);
        w.push(this.handwritingY);
        w.push([]);
        this.trace.push(w);
        this.drawing = false;
        if (this.allowUndo) {
            this.step.push(this.canvas.toDataURL());
        }
        if (this.ondraw) {
            this.ondraw(this);
        }
    }
    ;
    touchStart(e) {
        e.preventDefault();
        this.cxt.lineWidth = this.lineWidth;
        this.handwritingX = [];
        this.handwritingY = [];
        let de = document.documentElement;
        let box = this.canvas.getBoundingClientRect();
        let top = box.top + window.pageYOffset - de.clientTop;
        let left = box.left + window.pageXOffset - de.clientLeft;
        let touch = e.changedTouches[0];
        let touchX = touch.pageX - left;
        let touchY = touch.pageY - top;
        this.handwritingX.push(touchX);
        this.handwritingY.push(touchY);
        this.cxt.beginPath();
        this.cxt.moveTo(touchX, touchY);
    }
    ;
    touchMove(e) {
        e.preventDefault();
        let touch = e.targetTouches[0];
        let de = document.documentElement;
        let box = this.canvas.getBoundingClientRect();
        let top = box.top + window.pageYOffset - de.clientTop;
        let left = box.left + window.pageXOffset - de.clientLeft;
        let x = touch.pageX - left;
        let y = touch.pageY - top;
        this.handwritingX.push(x);
        this.handwritingY.push(y);
        this.cxt.lineTo(x, y);
        this.cxt.stroke();
    }
    ;
    touchEnd(e) {
        let w = [];
        w.push(this.handwritingX);
        w.push(this.handwritingY);
        w.push([]);
        this.trace.push(w);
        if (this.allowUndo) {
            this.step.push(this.canvas.toDataURL());
        }
        if (this.ondraw) {
            this.ondraw(this);
        }
    }
    ;
    undo() {
        if (!this.allowUndo || this.step.length <= 0) {
            return;
        }
        if (this.step.length === 1) {
            if (this.allowRedo) {
                this.redo_step.push(this.step.pop());
                this.redo_trace.push(this.trace.pop());
                this.cxt.clearRect(0, 0, this.width, this.height);
            }
            return;
        }
        if (this.allowRedo) {
            this.redo_step.push(this.step.pop());
            this.redo_trace.push(this.trace.pop());
        }
        else {
            this.step.pop();
            this.trace.pop();
        }
        loadFromUrl(this.step.slice(-1)[0], this);
    }
    ;
    redo() {
        if (!this.allowRedo || this.redo_step.length <= 0) {
            return;
        }
        this.step.push(this.redo_step.pop());
        this.trace.push(this.redo_trace.pop());
        loadFromUrl(this.step.slice(-1)[0], this);
    }
    ;
    erase() {
        this.cxt.clearRect(0, 0, this.width, this.height);
        this.step = [];
        this.redo_step = [];
        this.redo_trace = [];
        this.trace = [];
    }
    ;
    async recognize(options = null) {
        if (options) {
            options.width = options.width || this.width;
            options.height = options.height || this.height;
            options.language = options.language || DEFAULT_LANGUAGE;
        }
        else {
            options = {
                height: this.height,
                width: this.width,
                language: DEFAULT_LANGUAGE,
            };
        }
        let data = JSON.stringify({
            "options": "enable_pre_space",
            "requests": [{
                    "writing_guide": {
                        "writing_area_width": options.width,
                        "writing_area_height": options.height
                    },
                    "ink": this.trace,
                    "language": options.language
                }]
        });
        let response = await fetch("https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        let json = new HandwritingResponse(await response.json());
        if (json.response === "SUCCESS") {
            if (options.callback) {
                options.callback(json);
            }
            return json;
        }
        throw new Error(json.response);
    }
}
export class HandwritingResponse {
    data;
    constructor(data) {
        this.data = data;
    }
    get response() {
        return this.data[0];
    }
    get traceID() {
        return this.data[1][0][0];
    }
    get characters() {
        return this.data[1][0][1];
    }
    get unk() {
        return this.data[1][0][2];
    }
    get unk_escaped() {
        return this.data[1][0][3];
    }
}
let HandWriting = {
    Canvas: Canvas,
    HandwritingResponse: HandwritingResponse,
    DEFAULT_LANGUAGE: DEFAULT_LANGUAGE
};
globalThis.HandWriting = HandWriting;
function loadFromUrl(url, cvs) {
    let imageObj = new Image();
    imageObj.onload = function () {
        let img = this;
        cvs.cxt.clearRect(0, 0, img.width, img.height);
        cvs.cxt.drawImage(imageObj, 0, 0);
    };
    imageObj.src = url;
}
//# sourceMappingURL=handwriting.js.map