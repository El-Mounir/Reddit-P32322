// const IDs = {
//     cID: "ZYWP2FoU6UN37Lwbq0FjwQ",
//     credID: "p1fgaDtPXf87c1qKJsIloDWwtwGE4w",
//     redirectUri: "http://localhost:3000/",
//     //state: uuidv4(),
//     state:"yguyef35r837gui3t78g",
//     accessCode: "",
// }

// const Reddit= {
    
//     getAccessCode() {  
//         if (IDs.accessCode) {
//             return IDs.accessCode;
//         };
//         const code = window.location.href.match(/code=([^&]*)#/);
//         const newState = window.location.href.match(/state=([^&]*)/);
//         if (newState && code) {
//             IDs.accessCode = code[1];
//             window.history.pushState('state', null, '/');
//             return IDs.accessCode;
//         } else {
//             window.location=`https://www.reddit.com/api/v1/authorize?client_id=${IDs.cID}&response_type=code&state=${IDs.state}&redirect_uri=${IDs.redirectUri}&duration=permanent&scope=read,submit,mysubreddits,save,subscribe`;
//         }
//     },

//     async getAccessToken() {
//         IDs.accessCode = Reddit.getAccessCode();
//         let headers = new Headers();
//         let bodyData = new FormData();
//         bodyData.append('grant_type', "authorization_code");
//         bodyData.append('code', IDs.accessCode);
//         bodyData.append('redirect_uri', IDs.redirectUri);
//         // headers.set('Authorization', 'Basic ' + Buffer.from(cID + ":" + credID).toString('base64'));
//         headers.set('Authorization', 'Basic ' + btoa(IDs.cID + ":" + IDs.credID));
//         try{
//             const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
//                 method:'POST',
//                 headers: headers,
//                 body: bodyData
//                 });
//                 if(response.ok){
//                   const jsonResponse = await response.json();
//                    IDs.accessToken = { token: jsonResponse.access_token,
//                                         expiry: jsonResponse.expires_in
//                                     }
//                    return IDs.accessToken;
//                 }
//             }catch(error){
//               console.log(error);
//             }
//         sessionStorage.setItem("tokenId", IDs.accessToken.token);
//         sessionStorage.setItem("timeleft", IDs.accessToken.expiry);
//     },

//     async searchSubreddits(subredditName) {
//         const token = "169767304991-XobSKh6aJdWAY4FOxx_oHmNIbJeRPQ";
//         // let headers = new Headers();
//         // headers.set('Authorization', 'Bearer ' + token);
//         // const bodyData="";
//         try{
//             const response = await fetch(`https://oauth.reddit.com/subreddits/search?q=${subredditName}`,{headers:{
//                                                                                                                             Authorization:`Bearer ${token}`
//                                                                                                                     }
//             });
//             if(response.ok){
//               const jsonResponse = await response.json();
//             //   return jsonResponse.data.children;
//             if (jsonResponse.data.children){
//                     return jsonResponse.data.children.map(subreddit => ({
//                                                     icon_image: subreddit.data.icon_img,
//                                                     name: subreddit.data.display_name,
//                                                     prefixed_name: subreddit.data.display_name_prefixed,
//                                                     subscriber_count: subreddit.data.subscribers,
//                                                     redditID: subreddit.data.id,
//                                                     description:subreddit.data.public_description,
//                                                     background_img: subreddit.data.banner_background_image,
//                                                 }));
//                 } else {
//                     return [];
//                 }
//          }
//         } catch(error){
//           console.log(error);
//         }
//     },

//     timeLeftToExpiry() {
//         const timeleft = sessionStorage.getItem("timeleft");
//         setTimeout(()=>{
//             timeleft-= 1000;
//         }, 1000)
//     }
// }
// const data = Reddit.searchSubreddits("gaming");
// console.log(data);

// const array=[data
//     : 
//     {user_flair_background_color: null, submit_text_html: '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;h1&…&gt;\n&lt;/ol&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;', restrict_posting: true, user_is_banned: false, free_form_reports: false, …}
//     kind
//     : 
//     "t5"]

    const IDs = {
        cID: "ZYWP2FoU6UN37Lwbq0FjwQ",
        credID: "p1fgaDtPXf87c1qKJsIloDWwtwGE4w",
        redirectUri: "http://localhost:3000/",
        state:"yguyef35r837gui3t78g",
        accessCode: "",
    }
    
    const Reddit= {
        
        getAccessCode() {  
            if (IDs.accessCode) {
                return IDs.accessCode;
            };
            const code = window.location.href.match(/code=([^&]*)#/);
            const newState = window.location.href.match(/state=([^&]*)/);
            if (newState && code) {
                IDs.accessCode = code[1];
                window.history.pushState('state', null, '/');
                return IDs.accessCode;
            } else {
                window.location=`https://www.reddit.com/api/v1/authorize?client_id=${IDs.cID}&response_type=code&state=${IDs.state}&redirect_uri=${IDs.redirectUri}&duration=permanent&scope=read,submit,mysubreddits,save,subscribe`;
            }
        },
    
        async getAccessToken() {
            IDs.accessCode = Reddit.getAccessCode();
            let headers = new Headers();
            let bodyData = new FormData();
            bodyData.append('grant_type', "authorization_code");
            bodyData.append('code', IDs.accessCode);
            bodyData.append('redirect_uri', IDs.redirectUri);
            // headers.set('Authorization', 'Basic ' + Buffer.from(cID + ":" + credID).toString('base64'));
            headers.set('Authorization', 'Basic ' + btoa(IDs.cID + ":" + IDs.credID));
            try{
                const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
                    method:'POST',
                    headers: headers,
                    body: bodyData
                    });
                    if(response.ok){
                      const jsonResponse = await response.json();
                       IDs.accessToken = { token: jsonResponse.access_token,
                                            expiry: jsonResponse.expires_in
                                        }
                       return IDs.accessToken;
                    }
                }catch(error){
                  console.log(error);
                }
            sessionStorage.setItem("tokenId", IDs.accessToken.token);
            sessionStorage.setItem("timeleft", IDs.accessToken.expiry);
        },
    
        async searchSubreddits(subredditName) {
            const token = "169767304991-1RgDjExBeCoH2c5dNUTyPMXAc9nQ4g";
            let headers = new Headers();
            headers.set('Authorization', 'Bearer ' + token);
            const bodyData="";
            try{
                const response = await fetch(`https://oauth.reddit.com/api/search_subreddits?query=${subredditName}&include_over_18=true&include_unadvertisable=true&typeahead_active=true`,{
                method:'POST',
                body: bodyData,
                headers:headers
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  if (jsonResponse.subreddits){
                        return jsonResponse.subreddits.map(subreddit => ({
                                                        icon_image: subreddit.icon_img,
                                                        name: subreddit.name,
                                                        subscriber_count: subreddit.subscriber_count,
                                                    }));
                    } else {
                        return [];
                    }
                }
            } catch(error){
              console.log(error);
            }
        },
        async searchSubredditsName(subredditName) {
            const token = "169767304991-1RgDjExBeCoH2c5dNUTyPMXAc9nQ4g";
            try{
                const response = await fetch(`https://oauth.reddit.com/subreddits/search?q=${subredditName}&limit=100`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  return jsonResponse;
                // if (jsonResponse.data.children){
                //         return jsonResponse.data.children.map(subreddit => ({
                //                                         icon_image: subreddit.data.icon_img,
                //                                         name: subreddit.data.display_name,
                //                                         prefixed_name: subreddit.data.display_name_prefixed,
                //                                         subscriber_count: subreddit.data.subscribers,
                //                                         redditID: subreddit.data.id,
                //                                         description:subreddit.data.public_description,
                //                                         background_img: subreddit.data.banner_background_image,
                //                                     }));
                //     } else {
                //         return [];
                //     }
             }
            } catch(error){
              console.log(error);
            }
        },
        async getMySubreddits() {
            const token = "169767304991-1RgDjExBeCoH2c5dNUTyPMXAc9nQ4g";
            try{
                const response = await fetch(`https://oauth.reddit.com/subreddits/mine/subscriber`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  //return jsonResponse;
                if (jsonResponse.data.children){
                        return jsonResponse.data.children.map(subreddit => ({
                                                        icon_image: subreddit.data.community_icon.match(/([^&]*)png/)[0],
                                                        name: subreddit.data.display_name,
                                                        prefixed_name: subreddit.data.display_name_prefixed,
                                                        subscriber_count: subreddit.data.subscribers,
                                                        redditID: subreddit.data.id,
                                                        description:subreddit.data.public_description,
                                                        background_img: subreddit.data.banner_background_image,
                                                    }));
                    } else {
                        return [];
                    }
             }
            } catch(error){
              console.log(error);
            }
        },
        async getSubredditHot(subreddit) {
            const token = "169767304991-1RgDjExBeCoH2c5dNUTyPMXAc9nQ4g";
            try{
                const response = await fetch(`https://oauth.reddit.com/r${subreddit}/hot?g=GLOBAL`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  return jsonResponse;
                // if (jsonResponse.data.children){
                //         return jsonResponse.data.children.map(subreddit => ({
                //                                         author: subreddit.data.author,
                //                                         title: subreddit.data.title,
                //                                         content: subreddit.data.url,
                //                                         comment_count: subreddit.data.num_comments,
                //                                         postID: subreddit.data.id,
                //                                         time:subreddit.data.created,
                //                                         votes: subreddit.data.ups,
                //                                     }));
                //     } else {
                //         return [];
                //     }
             }
            } catch(error){
              console.log(error);
            }
        },
    }
    //const data = Reddit.searchSubredditsName("gaming");
//     const data = Reddit.getMySubreddits();
const data = Reddit.getSubredditHot("/witcher");
console.log(data);

// // const convertNumbers=(num)=>{
// //     const number= num.toString();
// //     if( number.length >= 7) {
// //         const sliceOne = number.slice(-6,-5);
// //         const sliceTwo = number.slice(0,-6);
// //         switch (sliceOne) {
// //         case ("0"):
// //             return `${sliceTwo}m`;
// //         default:
// //             return `${sliceTwo}.${sliceOne}m`;
// //         }
// //     } else if(number.length >=4 ) {
// //         const sliceOne = number.slice(-3,-2);
// //         const sliceTwo = number.slice(0,-3);
// //         console.log(sliceOne);
// //         switch (sliceOne) {
// //             case ("0"):
// //                 return `${sliceTwo}k`;
// //             default:
// //                 return `${sliceTwo}.${sliceOne}k`;
// //         }
// //     }
// //     return number;
// // }


// // const number1 = 4098;
// // console.log(convertNumbers(number1));

// const subreddits= [{
//     icon_image:"https://b.thumbs.redditmedia.com/77QmBLkIJRXDC4NTOxfMRua93CAzejPQm4gb8jqgV4Y.png",
// name:"wow",
// prefixed_name:"r/wow",
// subscriber_count:2322767,
// redditID:"2qio8",
// description:"World of Warcraft on Reddit!",
// background_img:"https://styles.redditmedia.com/t5_2qio8/styles/bannerBackgroundImage_smf1oyd5dzv91.jpg?width=4000&amp;v=enabled&amp;s=f587e1c36b82123febf5a7277d645611fb46666f"
// },
// {
//     icon_image:"https://b.thumbs.redditmedia.com/77QmBLkIJRXDC4NTOxfMRua93CAzejPQm4gb8jqgV4Y.png",
// name:"wow",
// prefixed_name:"r/wow",
// subscriber_count:2322767,
// redditID:"2qio8",
// description:"World of Warcraft on Reddit!",
// background_img:"https://styles.redditmedia.com/t5_2qio8/styles/bannerBackgroundImage_smf1oyd5dzv91.jpg?width=4000&amp;v=enabled&amp;s=f587e1c36b82123febf5a7277d645611fb46666f"
// },
// {
//     icon_image:"https://b.thumbs.redditmedia.com/77QmBLkIJRXDC4NTOxfMRua93CAzejPQm4gb8jqgV4Y.png",
// name:"wow",
// prefixed_name:"r/wow",
// subscriber_count:2322767,
// redditID:"2qio8",
// description:"World of Warcraft on Reddit!",
// background_img:"https://styles.redditmedia.com/t5_2qio8/styles/bannerBackgroundImage_smf1oyd5dzv91.jpg?width=4000&amp;v=enabled&amp;s=f587e1c36b82123febf5a7277d645611fb46666f"
// }
// ]

const state = {};

// const fnc =(state,subreddits)=> {
//     for (let subreddit in subreddits) {
//         console.log(subreddits[subreddit]);
//         state[subreddits[subreddit].redditID] = subreddits[subreddit];
//     }
//     return state
// }

console.log(Object.values(state).length);

const image= "https://styles.redditmedia.com/t5_2sebi/styles/communityIcon_ap4y66hwdara1.jpg?width=256&amp;v=enabled&amp;s=d96732986afb427fec4867eda0f55451ecd0bd38";
// const icon =  image.match(/([^&]*)jpg/)[0];
// console.log(icon);

function sliceImageIcon(image) {  
    if(image.match(/([^&]*)png/)) {
         const icon = image.match(/([^&]*)png/);
         return icon[0];
    } else if (image.match(/([^&]*)jpg/)) {
         const icon = image.match(/([^&]*)jpg/);
     return  icon[0];
    }
    return "";
 }

 console.log(sliceImageIcon(image));