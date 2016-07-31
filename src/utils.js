import config from '../config.json'


export function randomPick(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}


export function getVideoInfo(videoId) {
    return fetch(`${config.bridgeServerURL}/info/${videoId}`)
    .then(response => response.json())
}
