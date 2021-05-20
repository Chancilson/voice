//This class will be recording audio
export default class Recorder {
    constructor() {
        //The most universal audio type.
        this.audioType = 'audio/webm;codecs=opus'
        //Store recorded audios
        this.mediaRecorder = {}
        this.recordedBlobs = []
    }
    //Verify if the browser is compatible
    _setup() {
        const options = {mimeType: this.audioType}
        const isSupported = MediaRecorder.isTypeSupported(options.mimeType)
        if (!isSupported) {
            const msg = `the codec ${options.mimeType} isn't supported`
            alert(msg)

            throw new Error(msg)
        }

        return options;
    }
    //Starts recording process
    startRecording(stream){
        const options = this._setup()
        this.mediaRecorder = new MediaRecorder(stream, options)
        //When the recording process is stoped
        this.mediaRecorder.onstop = (event) => {
            console.log('Recorded Blobs', this.recordedBlobs)
        }
        //Save the recorded audio if is available
        this.mediaRecorder.ondataavailable = (event) => {
            //Verifies if there is a recorded audio
            if(!event.data || !event.data.size) return;
            //saves for a while the recording audio until the user refreshes the browser
            this.recordedBlobs.push(event.data) 
        }
        //Starts recording
        this.mediaRecorder.start();
        console.log('Media Recorded started', this.mediaRecorder)
    }

    //Stops the recording process
    async stopRecording() {
        //Verifies if for some reason the recording process stops.
        if(this.mediaRecorder.state === "inactive") return;
        //stops recording
        this.mediaRecorder.stop();
        console.log('media recorded stopped!');
    }

    //This function will get the audio recorded's URL 
    getRecordingURL() {
        const blob = new Blob(this.recordedBlobs, {type: this.audioType})
        //Returns the recorded audio's URL
        return window.URL.createObjectURL(blob);
    }
}