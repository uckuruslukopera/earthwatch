
const backgrounds = [
    "linear-gradient(#D3CCE3, #E9E4F0)",
    "linear-gradient(#D3CCE3, #E9E4F0)",
    "linear-gradient(#DEDDF0, #B6BCF2)",
    "linear-gradient(#FFCFC5, #F2F3BC)",
    "linear-gradient(#20E4A4, #2CC9CC)",
    "linear-gradient(#95D8F7, #4491FF)",
    "linear-gradient(#A8FF78, #78FFD6)",
    "linear-gradient(#F3BAE3, #9CBAED)",
    "linear-gradient(#64C8BD, #094A6F)",


    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)",
    // "linear-gradient(#D3CCE3, #E9E4F0)"
];

const randomBackground = () => {
    const random = Math.floor(Math.random() * Math.floor(backgrounds.length));
    return backgrounds[random];
}

export default randomBackground;