export default () => {
    let shouldContinue = false;
    let timeBucket = 0;
    let lastTime = 0;
    let yieldMS = 1;

    self.addEventListener("message", event => { // eslint-disable-line no-restricted-globals
        if (!event || !event.data) return;

        if (event.data.msg === "start") {
            yieldMS = event.data.yieldms;
            shouldContinue = true;
            lastTime = new Date().getTime();
            keepTime(); 
        }
        if (event.data.msg === "stop") {
            shouldContinue = false;
        }
        if (event.data.msg === "reset") {
            timeBucket = 0;
            postMessage(timeBucket / 1000);
        }

    });

    //this updates the time
    function keepTime() {
        //calculate our new time and tell the main thread about it
        const newTime = new Date().getTime();
        if (newTime !== lastTime) {
            timeBucket += newTime - lastTime;
            lastTime = newTime;

            postMessage(timeBucket / 1000);
        }

        //if we should continue, do so, but yield the thread (hopefully this yields so new messages can come in!)
        if (shouldContinue) {
            setTimeout(keepTime, yieldMS);
        }
    }

}



