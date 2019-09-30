const secondsToMessage = (seconds: number) => {
    const messages = [
        {
            type: "bottle",
            perSecond: 15000,
            text: "tane plastik şişe satıldı.",
        }, {
            type: "seabird",
            perSecond: 0.031,
            text: "tane deniz kuşu plastik nedeniyle öldü.",
        }, {
            type: "sealife",
            perSecond: 0.0031,
            text: "tane deniz canlısı plastik nedeniyle öldü."
        },
        {
            type: "plastic",
            perSecond: 0.02,
            text: "kamyon plastik denizlere karıştı."
        }
    ];
    const random = Math.floor(Math.random() * Math.floor(messages.length));
    const message = messages[random];
    let numbers = seconds * message.perSecond;
    numbers = Math.ceil(numbers);
    return `Konuştuğumuz süre boyunca ${numbers} ${message.text}`;
}

export default secondsToMessage;