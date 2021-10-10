export const loadVideo = file => new Promise((resolve, reject) => {
    try {
        let video = document.createElement('video')
        video.preload = 'metadata'

        video.onloadedmetadata = function () {
            resolve(this)
        }

        video.onerror = function () {
            reject("Invalid video. Please select a video file.")
        }

        video.src = file;
    } catch (e) {
        reject(e)
    }
});