import Canvas from './canvas';
class Display {
    constructor(width = 640, pixelRatio = 16 / 10) {
        this.width = width;
        this.height = width/pixelRatio;
        this.display = new Canvas(this.width, this.height); 
    }
    setParent(parent = document.getElementsByTagName('body')[0]) {
        parent.appendChild(this.display);
    }
    getResolution(){
        return{
            width:this.width,
            height:this.height
        };
    }
    
    getCtx(){
        return this.display.ctx; 
    }
}
export default Display;
