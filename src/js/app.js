import '../css/main.scss';
import Noise from './noise';
import Display from './display';
if (window.requestAnimationFrame === undefined) {
    let ie9Warning = document.getElementById('ie9Warning');
    ie9Warning.style.display = 'block';
}else
main();

function main() {

    let forDisplay = document.getElementById('forDisplay');
    let forLoading = document.getElementById('forLoading');

    let display = new Display(640);
    display.setParent(forDisplay);
    var noise = new Noise(display, forLoading);
}
