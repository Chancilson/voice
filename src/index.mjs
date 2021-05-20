//Link all files
import Controller from "./controller.mjs";
import View from "./view.mjs";
import Media from "./util/media.mjs";
import Recorder from "./util/recorder.mjs";

//Instances of classes.
const view = new View();
const media = new Media();
const recorder = new Recorder();

//Passing dependencies to Controller.
Controller.initialize({
    view,
    media,
    recorder
}) 

