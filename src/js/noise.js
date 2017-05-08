import Canvas from './canvas';
import FpsCounter from './fps_counter';
import {randomRange} from './utils';

//генератор статического шума, для усиления эффекта кинематографичности

class Noise {
    constructor(display, forLoading) {
        this.ctx = display.getCtx();        
        this.width = display.width;
        this.height = display.height;
        this.noise = new Canvas(this.width, this.height);
        // настройки шумоф
        this.framesMax = 16;
        this.noise.radius = 1; //не использовать меньше 1, лучший вариант 1, при значении выше шум выглядит плохо
        this.noise.alpha = 0.25;
        this.noise.period = 2;
        this.maxChunk = 200;
        this.emptyLine = null;
        this.linesMax = Math.ceil(this.noise.height / this.noise.period);
        this.lines = new Array();
        this.frames = new Array();
        this.frameIndex = 0;
        this.noise.ready = false;
        this.progressMax = Math.ceil(this.noise.height / this.noise.period) + this.framesMax;
        this.loadingOutput = forLoading;

        this.init();

    }

    init() {
        //инициализируем счетчик кадров и запускаем главный цикл шума
        this.fpsCounter = new FpsCounter(document.getElementById('forFpsCounter'));
        this.run();
    }

    run() {
        this.update();
        window.requestAnimationFrame(this.run.bind(this))
    }

    update() {
        this
            .fpsCounter
            .update();

        switch (this.noise.ready) {
                //массив создан
            case true:
                //
                this.drawFrames();
                break;
                //массив не создан
            case false:
                //
                this.updateProgress();
                this.fillNoise();
                break;
        }

    }

    updateProgress() {
        let progress = this.getProgress();
        if (progress < 100) {
            this.loadingOutput.innerHTML = 'Generating ' + progress + '%';
        } else {
            this.loadingOutput.innerHTML = 'All is done!';
            this
                .loadingOutput
                .classList
                .add('fade');
        }
    }
    getProgress() {
        return Math.floor(((this.lines.length + this.frames.length) / this.progressMax) * 100);
    }
    drawFrames() {
        if (this.frameIndex < this.framesMax) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.frames[this.frameIndex], 0, 0);
            this.frameIndex++
        } else {
            this.frameIndex = 0;
        }
    };
    fillNoise() {
        if (this.lines.length < this.linesMax) {
            this.pushLine();
        } else if (this.emptyLine === null) {
            this.emptyLine = this.generateLine('empty')
        } else if (this.frames.length < this.framesMax) {
            this.pushFrame();
        } else {
            this.noise.ready = true;
        }
    }

    generateFrame() {
        //создаем фрэйм
        let frame = new Canvas(this.width, this.height);
        let linesHold = this
            .lines
            .slice();
        for (let lineIndex = 0; lineIndex < frame.height; lineIndex++) {
            if (lineIndex % this.noise.period == 0) {
                frame
                    .ctx
                    .drawImage(this.emptyLine, 0, lineIndex);
            } else {
                let randomLine = linesHold.splice(randomRange(0, linesHold.length), 1);
                frame
                    .ctx
                    .drawImage(randomLine[0], 0, lineIndex);
            }
        }

        return frame;
    }
    pushFrame() {
        //заполняем массив фрэймов
        this
            .frames
            .push(this.generateFrame());
    };
    pushLine() {
        //пушим линии в массив линий
        this
            .lines
            .push(this.generateLine());
    }

    generateLine(key) {
        let row = 0;
        let line = new Canvas(this.noise.width, this.noise.radius);
        if (this.noise.width > this.maxChunk) {
            //при необходимости разбить на чанки
        }
        for (let i = 0; i < this.noise.width; i += this.noise.radius) {
            switch (key) {
                case 'empty':
                    //
                    line.ctx.fillStyle = this.emptyColor();
                    break;
                case undefined:
                    //
                    line.ctx.fillStyle = this.randomColor();
                    break;
            }
            line
                .ctx
                .fillRect(i, row, this.noise.radius, this.noise.radius);
        }
        return line;
    }

    randomColor() {
        return 'hsla(0,0%,' + Math.floor((Math.random() * 100)) + '%, ' + this.noise.alpha + ')';
    }

    emptyColor() {
        return 'hsla(0,0%,' + 0 + '%, ' + this.noise.alpha * 2 + ')';
    }
}
export default Noise;