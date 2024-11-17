import React, { Component } from "react";
import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class AudioConverter extends Component {
  state = {
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  

  render() {
    return (
      <div>
        <>ok</>
      </div>
    );
  }
}
