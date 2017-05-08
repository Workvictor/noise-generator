class FpsCounter {
    constructor(output) {
        this.output = output;
        this.frame = 0;
        this.time = Date;
        this.fps = 0;
        this.startTime = this.time.now();
        this.curTime = this.time.now();
    }
    update(){
        if (this.frame == 0) {
            this.startTime = this.time.now();
        }
        this.curTime = this.time.now();        
        if (this.curTime - this.startTime >= 1000) {
            this.startTime = this.time.now();
            this.fps = this.frame;
            this.frame = 0;
        }
        this.frame++;
        this.output.innerHTML = 'FPS: ' + this.fps;
    }
}

export default FpsCounter;