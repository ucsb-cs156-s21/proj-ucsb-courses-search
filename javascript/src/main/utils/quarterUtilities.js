
const quarters = [
    "WINTER",
    "SPRING",
    "SUMMER",
    "FALL"
];

const shortQuarters = [
    "W",
    "S",
    "M",
    "F"
];

const yyyyqToQyy = (yyyyq) => { 
    return `${shortQuarters[parseInt(yyyyq.charAt(4)) - 1]}${yyyyq.substring(2, 4)}`;
}



const toFormat = (quarter, year) => {
    return year.toString() + (parseInt(quarter)).toString();
}

const fromFormat = (format) => {
    return `${quarters[parseInt(format.charAt(4)) - 1]} ${format.substring(0, 4)}`;
}

export { fromFormat, toFormat, yyyyqToQyy};
