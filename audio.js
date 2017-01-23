import { GameObject } from './core';

/**
 * Class to play audio at specific points during gameplay
 *
 * This is a very basic implementaion which is limited to one sound effect at a time.
 * It is possible to enhance this class to provide multi-track playback.
 * @class
 */
export class AudioSystem extends GameObject {
    constructor () {
        super();

        // this.context = new AudioContext();
    }

    /**
     * Queue a sound to be played at the start of the next frame
     * @param {object} res - Audio "texture" containing Audio resource
     */
    playSound (res) {
        // Real implementation should add audio to queue to play at start of next frame etc.
        if(res.audio){
            res.audio.play();
        }
    }
}