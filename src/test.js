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
            const token = "169767304991-kagZ-AopYjR7GjFThjRxsi9rhCDbUQ";
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
            const token = "169767304991-kagZ-AopYjR7GjFThjRxsi9rhCDbUQ";
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
            const token = "169767304991-tqpW6gTvcOyLJb-YchfaNr1myijEfQ";
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
            const token = "169767304991-tqpW6gTvcOyLJb-YchfaNr1myijEfQ";
            let afterID;
            let SubbreditHot;
            let subredditAfter;
            try{
                const response = await fetch(`https://oauth.reddit.com/r${subreddit}/hot?g=GLOBAL&limit=90`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  afterID = jsonResponse.data.after;
                if (jsonResponse.data.children){
                        return SubbreditHot = jsonResponse.data.children.map(subreddit => ({
                                                        author: subreddit.data.author,
                                                        title: subreddit.data.title,
                                                        content: subreddit.data.url,
                                                        comment_count: subreddit.data.num_comments,
                                                        postID: subreddit.data.id,
                                                        time:subreddit.data.created,
                                                        votes: subreddit.data.ups,
                                                        after:afterID
                                                    }));
                    } else {
                        return [];
                    }
                }
            } catch(error){
              console.log(error);
            }
        },
        async getSubredditHotAfter(afterID,subreddit) {
            const token = "169767304991-tqpW6gTvcOyLJb-YchfaNr1myijEfQ";
            let newafterID;
            try {
                const responseAfter = await fetch(`https://oauth.reddit.com/r${subreddit}/hot?g=GLOBAL&after=${afterID}&limit=90`, {
                headers:{Authorization:`Bearer ${token}`}
                });
                if(responseAfter.ok){
                    const jsonResponse = await responseAfter.json();
                    newafterID = jsonResponse.data.after;
                    if (jsonResponse.data.children){
                        const subredditAfter = jsonResponse.data.children.map(subreddit => ({
                                                        author: subreddit.data.author,
                                                        title: subreddit.data.title,
                                                        content: subreddit.data.url,
                                                        comment_count: subreddit.data.num_comments,
                                                        postID: subreddit.data.id,
                                                        time:subreddit.data.created,
                                                        votes: subreddit.data.ups,
                                                        after: newafterID
                                                    }));
            
                        return subredditAfter;
                    }else {
                        return [];
                    }
                }
            }catch(error){
                console.log(error);
            }

        },
        async getPosts(type) {
            const token = "169767304991-pWADjG1OONl1QhK8gbKulz6R2U5r4A";
            let afterID;
            try{
                const response = await fetch(`https://oauth.reddit.com/${type}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  afterID = jsonResponse.data.after;
                if (jsonResponse.data.children){
                        return jsonResponse.data.children.map(subreddit => ({
                                                        author: subreddit.data.author,
                                                        title: subreddit.data.title,
                                                        content: subreddit.data.url,
                                                        comment_count: subreddit.data.num_comments,
                                                        postID: subreddit.data.id,
                                                        time:subreddit.data.created,
                                                        votes: subreddit.data.ups,
                                                        after: afterID,
                                                        type:type
                                                    }));
                    } else {
                        return [];
                    }
             }
            } catch(error){
              console.log(error);
            }
        },
        async getBestPostsAfter(afterID) {
            const token = "169767304991-tqpW6gTvcOyLJb-YchfaNr1myijEfQ";
            let newafterID;
            try{
                const response = await fetch(`https://oauth.reddit.com/best?after=${afterID}`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                  newafterID = jsonResponse.data.after;
                  if (jsonResponse.data.children){
                      const subredditAfter = jsonResponse.data.children.map(subreddit => ({
                                                      author: subreddit.data.author,
                                                      title: subreddit.data.title,
                                                      content: subreddit.data.url,
                                                      comment_count: subreddit.data.num_comments,
                                                      postID: subreddit.data.id,
                                                      time:subreddit.data.created,
                                                      votes: subreddit.data.ups,
                                                      after: newafterID
                                                  }));
          
                      return subredditAfter;
                  }else {
                      return [];
                    }
             }
            } catch(error){
              console.log(error);
            }
        },
        async getUserName() {
            const token = "169767304991-UfSWA8zIDhGJzv2sfGVI6GJ3md3lAw";
            try{
                const response = await fetch(`https://oauth.reddit.com/api/v1/me`,
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                    const jsonResponse = await response.json();
                    IDs.User = jsonResponse;
                }
            } catch(error){
              console.log(error);
            }
            try {
                IDs.userName = await IDs.User;
                return IDs.userName;
            }catch (error) {
                console.log(error);
            }
            sessionStorage.setItem("useNameId", IDs.User.user_name);
        },
    }
   
    const data = Reddit.searchSubredditsName("gaming");
    //const data = Reddit.getAccessToken();
//     const data = Reddit.getMySubreddits();
//const data = Reddit.getUserName();
//const data = Reddit.getPosts();
console.log(data)
//console.log(dataNew)

// const test =(obj,obj1) => {

// for (i in obj1) {
//     obj[i]=obj1[i]
// }
// return obj
// }

// const obj = test();

// const test1 = () => {
//     for (i in obj) {
//         console.log(i)
// }
// };

// test1();
const obj1={
    name1: {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    name2: {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    name3: {author:"Gakbknr gkjr63",
    title:"Healinkjbkjrgbjgbable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    name4: {author:"Gakjbhjrbghjb3",
    title:"Healinkjbvjbjhrbe",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    }
        }
const obj = {
    name5: {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    name6: {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    name7: {author:"Gakbknr gkjr63",
    title:"Healinkjbkjrgbjgbable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    name8: {author:"Gakjbhjrbghjb3",
    title:"Healinkjbvjbjhrbe",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_noice",
    }
}

// // const dataNr0908= test(obj1,obj);
// // // console.log(Object.keys(dataNr0908));
// // //console.log(Object.keys(dataNr0908).length())
// // //console.log(Object.values(dataNr0908)[Object.keys(dataNr0908)-1].after);
// // // const longeur = Object.keys(dataNr0908)
// // // console.log(longeur);
// // // console.log(longeur.length)
// // console.log(Object.values(dataNr0908)[(Object.keys(dataNr0908).length)-1].after);
// // //console.log(Object.values(dataNr0908).length)

 
// objet = {
// icon_image: "https://styles.redditmedia.com/t5_oaek3/styles/profileIcon_snooadff3dde-2dfb-48ea-a321-b5d2f8715d6c-headshot.png?width=256&amp;height=256&amp;crop=256:256,smart&amp;v=enabled&amp;s=d42dd1c082c087c35addc7f082f32f67eb0ce181",
// id: "25zn2ivz",
// user_name: "Numedian",
// num_friends
// : 
// 0,
// oauth_client_id
// : 
// "ZYWP2FoU6UN37Lwbq0FjwQ",
// over_18
// : 
// true,
// password_set
// : 
// true,
// pref_autoplay
// : 
// true,
// pref_clickgadget
// : 
// 5,
// pref_geopopular
// : 
// "",
// pref_nightmode
// : 
// true,
// pref_no_profanity
// : 
// true,
// pref_show_presence
// : 
// true,
// pref_show_snoovatar
// : 
// false,
// pref_show_trending
// : 
// true,
// pref_show_twitter
// : 
// false,
// pref_top_karma_subreddits
// : 
// true,
// pref_video_autoplay
// : 
// true,
// seen_give_award_tooltip
// : 
// false,
// seen_layout_switch
// : 
// true,
// seen_premium_adblock_modal
// : 
// false,
// seen_redesign_modal
// : 
// true,
// seen_subreddit_chat_ftux
// : 
// false,
// }

// // 
// const data2 = objet.id;
// console.log(data2)
// const fetchUserI = async () => {
//                 const response= await Reddit.getUserName();
//                 return response;
//             }

//             const data3 = fetchUserI();
//             console.log(data3)


// const type= window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
// console.log(type)

