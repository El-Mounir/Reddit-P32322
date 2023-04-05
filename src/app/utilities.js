import React from "react"
import ContentLoader from "react-content-loader"

export const toolKeys = {

    convertNumbers(num) {
        if (num === null) {
            return "0";
        }
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
    },
    epochConverter(tnumber) {
        const inSeconds = [0,60,3600,86400,604800,2419200,31536000];
        const inUnit = ["second","minute","hour","day","week","month","year"]
        let creationTime = Math.floor((Date.now()/1000) - tnumber);

        for (let t=0; t < inSeconds.length;t++) {
            if (( creationTime >= inSeconds[t])  && ( creationTime < inSeconds[t+1])) {        
                ((creationTime - inSeconds[t] ) == 0 ? creationTime = `${Math.floor(creationTime/inSeconds[t])} ${inUnit[t]}` : creationTime = `${Math.floor(creationTime/inSeconds[t])} ${inUnit[t]}s`);

            return creationTime;
            }          
        }
    },
    addMorelists(list1,list2) {
        for (let item in list2) {
            list1[item] = list2[item]
        }
        return list1
    },
    getArticleType() {
        return  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    }
}

export const ResultLoader = () => (
    <ContentLoader 
        speed={2}
        width={638}
        height={64}
        viewBox="0 0 638 64"
        backgroundColor="#481f16"
        foregroundColor="#e3d8ca"
        >
        <rect x="62" y="29" rx="3" ry="3" width="88" height="6" /> 
        <rect x="61" y="13" rx="3" ry="3" width="52" height="6" /> 
        <circle cx="30" cy="27" r="20" />
  </ContentLoader>
)
export const UserNameLoader = () => (
    <ContentLoader 
        speed={2}
        width={120}
        height={40}
        viewBox="0 0 120 40"
        backgroundColor="#f3f3f3"
        foregroundColor="#e3d8ca"
    >
        <rect x="54" y="15" rx="3" ry="3" width="52" height="6" /> 
        <circle cx="24" cy="18" r="17" />
  </ContentLoader>
)
export const ArticleLoader = () => (
    <ContentLoader 
        speed={2}
        width={638}
        height={570}
        viewBox="0 0 640 570"
        backgroundColor="#481f16"
        foregroundColor="#e3d8ca"
    >
        <rect x="9" y="18" rx="2" ry="2" width="361" height="27" /> 
        <rect x="10" y="540" rx="2" ry="2" width="64" height="19" /> 
        <rect x="0" y="60" rx="2" ry="2" width="600" height="461" /> 
        <rect x="192" y="541" rx="2" ry="2" width="140" height="18" /> 
        <rect x="505" y="542" rx="2" ry="2" width="85" height="17" />
  </ContentLoader>
)





