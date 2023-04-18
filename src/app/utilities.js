import React from "react"
import ContentLoader from "react-content-loader"

export const toolKeys = {

    convertNumbers(num) {
        let isNegatif;
        if (num === null) {
            return "0";
        }
        let number= num.toString();
        (number[0] === "-" ? isNegatif = true && (number = number.slice(1)) : isNegatif = false);
            if( number.length >= 7) {
                switch (number.slice(-6,-5)) {
                case ("0"):
                    return (isNegatif ? `-${number.slice(0,-6)}m` : `${number.slice(0,-6)}m`);
                default:
                    return (isNegatif ? `-${number.slice(0,-6)}.${number.slice(-6,-5)}m` : `${number.slice(0,-6)}.${number.slice(-6,-5)}m`);
                }
            } else if(number.length >=4 ) {
                switch (number.slice(-3,-2)) {
                    case ("0"):
                        return (isNegatif ? `-${number.slice(0,-3)}k`: `${number.slice(0,-3)}k`);
                    default:
                        return (isNegatif ? `-${number.slice(0,-3)}.${number.slice(-3,-2)}k` : `${number.slice(0,-3)}.${number.slice(-3,-2)}k`);
                }
            }
            return (isNegatif ? `-${number}` : `${number}`);
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
                ((creationTime - inSeconds[t] ) == 0 ? 
                creationTime = `${Math.floor(creationTime/inSeconds[t])} ${inUnit[t]}` : 
                creationTime = `${Math.floor(creationTime/inSeconds[t])} ${inUnit[t]}s`);

            return creationTime;
            }          
        }
    },
    getArticleType() {
        return  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    },
    replaceText(text){
        return text.replaceAll(".", ".\n\n")
    },
    embedYoutube(youtubeVideo) {
        (youtubeVideo.match(/v=([^&]*)/) ? youtubeVideo = youtubeVideo.replace("watch?v=","embed/") : youtubeVideo = `https://www.youtube.com/embed/${youtubeVideo.slice(-11)}`)
        return youtubeVideo;
    },
    getSelectedSubreddit(searchResults,mySubreddits,subreddit) {
        const searchReddit = Object.values(searchResults).find(search=> search.name === subreddit);
        const mySubreddit = Object.values(mySubreddits).find(mysubreddit => mysubreddit.name === subreddit);
        if (searchReddit) {
            return searchReddit;
        } else {
            return mySubreddit;
        }
    },
    countArray(number) {
        let array = []
        while (number >0) {
            array.push(number);
            number--;
        }
        return array;
    }
}

export const ResultLoader = () => (
    <ContentLoader 
        speed={2}
        width={638}
        height={64}
        viewBox="0 0 638 64"
        backgroundColor="#e3d8ca"
        foregroundColor="#481f16"
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
        backgroundColor="#e3d8ca"
        foregroundColor="#481f16"
    >
        <rect x="54" y="15" rx="3" ry="3" width="52" height="6" /> 
        <circle cx="24" cy="18" r="17" />
  </ContentLoader>
)
export const ArticleLoader = () => (
    <ContentLoader 
        speed={2}
        width={640}
        height={570}
        viewBox="0 0 640 570"
        backgroundColor="#e3d8ca"
        foregroundColor="#481f16"
    >
        <rect x="34" y="18" rx="2" ry="2" width="361" height="27" /> 
        <rect x="48" y="538" rx="2" ry="2" width="64" height="19" /> 
        <rect x="33" y="58" rx="2" ry="2" width="570" height="461" /> 
        <rect x="249" y="541" rx="2" ry="2" width="140" height="18" /> 
        <rect x="505" y="542" rx="2" ry="2" width="85" height="17" />
  </ContentLoader>
)
export const CommentLoader = () => (
    <ContentLoader 
        speed={2}
        width={480}
        height={123}
        viewBox="0 0 480 123"
        backgroundColor="#e3d8ca"
        foregroundColor="#481f16"
    >
        <rect x="28" y="7" rx="2" ry="2" width="82" height="18" /> 
        <rect x="48" y="538" rx="2" ry="2" width="64" height="19" /> 
        <rect x="249" y="541" rx="2" ry="2" width="140" height="18" /> 
        <rect x="505" y="542" rx="2" ry="2" width="85" height="17" /> 
        <rect x="31" y="41" rx="2" ry="2" width="287" height="48" /> 
        <rect x="110" y="100" rx="2" ry="2" width="51" height="11" /> 
        <rect x="34" y="100" rx="2" ry="2" width="59" height="13" />
  </ContentLoader>
)
export const SubredditLoader = () => (
    <ContentLoader 
        speed={2}
        width={312}
        height={65}
        viewBox="0 0 312 65"
        backgroundColor="#e3d8ca"
        foregroundColor="#481f16"
    >
        <rect x="76" y="39" rx="3" ry="3" width="88" height="6" /> 
        <rect x="78" y="23" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="41" cy="33" r="20" />
    </ContentLoader>
)





