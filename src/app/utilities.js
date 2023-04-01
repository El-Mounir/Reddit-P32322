
export const toolKeys = {

    convertNumbers(num) {
        const number= num.toString();
        if( number.length >= 7) {
            switch (number.slice(-6,-5)) {
            case ("0"):
                return `${number.slice(0,-6)}m`;
            default:
                return `${number.slice(0,-6)}.${number.slice(-6,-5)}m`;
            }
        } else if(number.length >=4 ) {
            switch (number.slice(-3,-2)) {
                case ("0"):
                    return `${number.slice(0,-3)}k`;
                default:
                    return `${number.slice(0,-3)}.${number.slice(-3,-2)}k`;
            }
        }
        return number;
    
    },
    sliceImageIcon(image) {  
        if(image.match(/([^&]*)png/)) {
             const icon = image.match(/([^&]*)png/);
             return icon[0];
        } else if (image.match(/([^&]*)jpg/)) {
             const icon = image.match(/([^&]*)jpg/);
         return  icon[0];
        }
        return "";
    }
}

