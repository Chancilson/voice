//This class will be manipulating all elements on screen
export default class View{
    constructor(){
        //Elements to manipulate
        this.btnStart = document.getElementById('btnStart')
        this.btnStop = document.getElementById('btnStop')
        this.audioElement = document.getElementById('audio');
    }
    
    //Starts recording
    onRecordClick(command){
        return () => {
            command()
            //Hides the audio element from the screen
            this.toggleAudioElement({ visible: false})
        }
    }

    //Stops recording
    onStopRecordClick(command){
        return () => {
            command()
        }
    }

    //This function will be fired when the user clicks on start button.
    configureStartRecordingButton(command){
        //Adds an action to be fired when the user clicks on the start recording button
        this.btnStart.addEventListener('click', this.onRecordClick(command));
    }

    //This function will be fired when the user clicks on start button.
    configureStopRecordingButton(command){
        //Adds an action to be fired when the user clicks on the stop recording button
        this.btnStop.addEventListener('click', this.onStopRecordClick(command));
    }

    //Turns hidden ou visible the audio tag when is needed.
    toggleAudioElement({ visible }) {
        const classList = this.audioElement.classList
        visible ? classList.remove('hidden') : classList.add('hidden')
    }

    //This function will play the recorded audio
    playAudio(url) {
        const audio = this.audioElement;
        //Sets the recorded audo's url into the tag audio's attribute "src" 
        audio.src = url;
        //Turns the volume up
        audio.muted = false;
        //this line of code will turn visible the audio element
        this.toggleAudioElement({ visible: true})
        //This line of code will play the audio when is already loaded
        audio.addEventListener("loadedmetadata", _ => audio.play())
    }
}