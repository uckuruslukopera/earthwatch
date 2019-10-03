export default () => {
    let g_shouldContinue = false;
    let g_timeBucket = 0;
    let g_lastTime = 0;
    let g_yieldMS = 1;

    self.addEventListener("message", event => { // eslint-disable-line no-restricted-globals
        if (!event || !event.data) return;

        if (event.data.msg === "start") {
            g_yieldMS = event.data.yieldms;
            g_shouldContinue = true;
            g_lastTime = new Date().getTime();
            keepTime(); 
        }
        if (event.data.msg === "stop") {
            g_shouldContinue = false;
        }
        if (event.data.msg === "reset") {
            g_timeBucket = 0;
            postMessage(g_timeBucket / 1000);
        }

    });

    //this updates the time
    function keepTime() {
        //calculate our new time and tell the main thread about it
        const newTime = new Date().getTime();
        if (newTime !== g_lastTime) {
            g_timeBucket += newTime - g_lastTime;
            g_lastTime = newTime;

            postMessage(g_timeBucket / 1000);
        }

        //if we should continue, do so, but yield the thread (hopefully this yields so new messages can come in!)
        if (g_shouldContinue) {
            setTimeout(keepTime, g_yieldMS);
        }
    }

}



