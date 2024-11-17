import { Mp3Encoder } from '@breezystack/lamejs';

export async function encodeAudioBufferLame(audioBuffer) {
    const sampleRate = audioBuffer.sampleRate;
    const mp3Encoder = new Mp3Encoder(2, sampleRate, 128); // 2 channels (stereo), sample rate from AudioBuffer

    const mp3Data = [];
    const left = audioBuffer.getChannelData(0); // Left channel data
    const right = audioBuffer.getChannelData(1); // Right channel data

    // Check if both channels exist in the AudioBuffer (stereo)
    if (!left || !right) {
        throw new Error("AudioBuffer must have at least 2 channels (stereo).");
    }

    // Convert Float32 to Int16 (scaled)
    const l = new Int16Array(left.length);
    const r = new Int16Array(right.length);

    for (let i = 0; i < left.length; i++) {
        l[i] = Math.max(-32768, Math.min(32767, left[i] * 32767.5)); // Prevent overflow
        r[i] = Math.max(-32768, Math.min(32767, right[i] * 32767.5)); // Prevent overflow
    }

    const sampleBlockSize = 1152; // Block size for encoding, should be a multiple of 576

    for (let i = 0; i < l.length; i += sampleBlockSize) {
        const leftChunk = l.subarray(i, i + sampleBlockSize);
        const rightChunk = r.subarray(i, i + sampleBlockSize);

        const mp3Buf = mp3Encoder.encodeBuffer(leftChunk, rightChunk);
        if (mp3Buf.length > 0) {
            mp3Data.push(mp3Buf);
        }
    }

    const mp3Buf = mp3Encoder.flush(); // Finalize the MP3 encoding
    if (mp3Buf.length > 0) {
        mp3Data.push(mp3Buf);
    }

    // Combine all the MP3 data chunks into one Blob
    const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' });

    return mp3Blob;
}
