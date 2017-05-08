class Canvas {
    constructor(width, height) {
        const canvas = document.createElement("canvas");
        canvas.ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}

export default Canvas;