export default class Media{
    //This asyncronous member will turn on browser's microphone
    async getAudio() {
        //This line of code will active the browser microfone
        return navigator.mediaDevices.getUserMedia({
            audio: true
        })
    }
}