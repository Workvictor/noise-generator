export function randomSeed() {
	return Date.now();
}
export function randomRange(min, max) {
	return Math.floor(min + (Math.random() * (max - min)));
}