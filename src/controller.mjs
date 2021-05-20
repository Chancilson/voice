//This class will be responsable of rules
export default class Controller {
    //Receiving all needed dependencies
    constructor({ view, media, recorder }) {
        this.view = view
        this.media = media
        this.recorder = recorder
    }

    //Start calling each class for work
    static initialize(dependencies) {
        const instance = new Controller(dependencies)
        return instance._init()
    }

    //Call events to be fired on pressed buttons
    _init() {
        //Defines what will happen when the user presses the record button
        this.view.configureStartRecordingButton(this.onStartRecording.bind(this));
        //Defines what will happen when the user presses the stop button
        this.view.configureStopRecordingButton(this.onStopRecording.bind(this));
    }

    //When user starts recording
    async onStartRecording() {
        //Active the microphone to start recording
        const audioStrean = await this.media.getAudio();
        //Start recording and save the recorded audio
        this.recorder.startRecording(audioStrean)
    }

    //When user stops recording
    async onStopRecording() {
        //Stop recording the user audio
        this.recorder.stopRecording()
        //Wait a moment
        setTimeout(() =>{
            //Get the recorded audio URL
            const audioURL = this.recorder.getRecordingURL()
            //Play the recorded audio
            this.view.playAudio(audioURL)
        });
    }

}