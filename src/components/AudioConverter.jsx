import React, { useState, useRef, useEffect } from 'react';
import { Mp3Encoder } from 'lamejs';

const AudioRecorder = () => {
    const encoder = new Mp3Encoder(2, 44100, 128);

console.log(encoder)
    return;

}

export default AudioRecorder;
