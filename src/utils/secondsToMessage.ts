const secondsToMessage = (seconds) => {
    const messages = [{
        type: "tree",
        perSecond: 2.3,
        text: "tane ağaç kesildi",
    }, {
        type: "whale",
        perSecond: 0.2,
        text: "tane balina öldü",
    }, {
        type: "tree",
        perSecond: 5.8,
        text: "metreküp buzul eridi"
    }, {
        type: "plastic",
        perSecond: 0.02,
        text: "kamyon plastik denizlere karıştı"
    }];
    const random = Math.floor(Math.random() * Math.floor(messages.length));
    const message = messages[random];
    let numbers = seconds * message.perSecond;
    if (message.type === "plastic") numbers = Math.ceil(numbers);
    return `Konuştuğumuz süre boyunca ${numbers} ${message.text}`;
}

export default secondsToMessage;