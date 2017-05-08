import '../css/main.scss';
import Noise from './noise';
import Display from './display';

main();

function main() {
    let forDisplay = document.getElementById('forDisplay');
    let forLoading = document.getElementById('forLoading');

    let display = new Display(640);
    display.setParent(forDisplay);
    var noise = new Noise(display,forLoading);
}
