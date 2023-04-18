
        const IDs = {
            cID: "ZYWP2FoU6UN37Lwbq0FjwQ",
            credID: "p1fgaDtPXf87c1qKJsIloDWwtwGE4w",
            redirectUri: "http://localhost:3000/",
            state:"yguyef35r837gui3t78g",
            accessCode: "",
        }
        const token = "169767304991-sK92lilyEKWvFgfQF3Nj1Sgo2kZjNQ";
        
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
                    window.location=`https://www.reddit.com/api/v1/authorize?client_id=${IDs.cID}&response_type=code&state=${IDs.state}&redirect_uri=${IDs.redirectUri}&duration=permanent&scope=read,submit,mysubreddits,subscribe,vote`;
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
                                                            icon_image: subreddit.data.community_icon,
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
            async getPosts(subreddit,type) {
                let afterID;
                let postsWithVideos;
                if(subreddit) {
                    try {
                        const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/${type}?g=GLOBAL`,
                        {
                            headers:{Authorization:`Bearer ${token}`}
                        });
                        if(response.ok){
                        const jsonResponse = await response.json();
                        return jsonResponse;
                        afterID = jsonResponse.data.after;
                        // if (jsonResponse.data.children){
                        //         postsWithVideos= jsonResponse.data.children.map(subreddit => ({
                        //                                         author: subreddit.data.author,
                        //                                         title: subreddit.data.title,
                        //                                         content: subreddit.data.url,
                        //                                         comment_count: subreddit.data.num_comments,
                        //                                         postID: subreddit.data.id,
                        //                                         time:subreddit.data.created,
                        //                                         votes: subreddit.data.ups,
                        //                                         after: afterID,
                        //                                         type:type,
                        //                                         postType: subreddit.data.post_hint,
                        //                                     }));
                        //                                     for (item in postsWithVideos) {
                        //                                         if (postsWithVideos[item].postType == "hosted:video") {
                        //                                             postsWithVideos[item].video = jsonResponse.data.children[item].data.media.reddit_video.fallback_url;
                        //                                             // console.log(postsWithVideos[item]);
                        //                                             // console.log(jsonResponse.data.children[item].data.media.reddit_video.fallback_url)
                        //                                         }
                        //                                     }
                        //                                     console.log(postsWithVideos);
                        //     return postsWithVideos;
                            
                        //     } else {
                        //         return [];
                        //     }
                    }
                    } catch(error){
                    console.log(error);
                    }
                } else {
                    try {
                        const response = await fetch(`https://oauth.reddit.com/${type}`,
                        {
                            headers:{Authorization:`Bearer ${token}`}
                        });
                        if(response.ok){
                        const jsonResponse = await response.json();
                        afterID = jsonResponse.data.after;
                        return jsonResponse
                        // if (jsonResponse.data.children){
                        //         jsonResponse.data.children.map(subreddit => ({
                        //                                         author: subreddit.data.author,
                        //                                         title: subreddit.data.title,
                        //                                         content: subreddit.data.url,
                        //                                         comment_count: subreddit.data.num_comments,
                        //                                         postID: subreddit.data.id,
                        //                                         time:subreddit.data.created,
                        //                                         votes: subreddit.data.ups,
                        //                                         after: afterID,
                        //                                         type:type,
                        //                                         postType: subreddit.data.post_hint,
                        //                                     }));
                                                        
                        //     } else {
                        //         return [];
                        //     }
                    }
                    } catch(error){
                    console.log(error);
                    }
                }   
                // window.location.reload();
            },
            async getMorePosts(subreddit,type,afterID) {
                let newAfterID;
                let postsWithVideos;
                if(subreddit) {
                    try {
                        const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/${type}?g=GLOBAL&after=${afterID}`,
                        {
                            headers:{Authorization:`Bearer ${token}`}
                        });
                        if(response.ok){
                        const jsonResponse = await response.json();
                        newAfterID = jsonResponse.data.after;
                        if (jsonResponse.data.children){
                                postsWithVideos= jsonResponse.data.children.map(subreddit => ({
                                                                author: subreddit.data.author,
                                                                title: subreddit.data.title,
                                                                content: subreddit.data.url,
                                                                comment_count: subreddit.data.num_comments,
                                                                postID: subreddit.data.id,
                                                                time:subreddit.data.created,
                                                                votes: subreddit.data.ups,
                                                                after: newAfterID,
                                                                type:type,
                                                                postType: subreddit.data.post_hint,
                                                            }));
                                                            for (item in postsWithVideos) {
                                                                if (postsWithVideos[item].postType == "hosted:video") {
                                                                    postsWithVideos[item].video = jsonResponse.data.children[item].data.media.reddit_video.fallback_url;
                                                                    // console.log(postsWithVideos[item]);
                                                                    // console.log(jsonResponse.data.children[item].data.media.reddit_video.fallback_url)
                                                                }
                                                            }
                                                            console.log(postsWithVideos);
                            return postsWithVideos;
                            
                            } else {
                                return [];
                            }
                    }
                    } catch(error){
                    console.log(error);
                    }
                } else {
                    try {
                        const response = await fetch(`https://oauth.reddit.com/${type}?after=${afterID}`,
                        {
                            headers:{Authorization:`Bearer ${token}`}
                        });
                        if(response.ok){
                        const jsonResponse = await response.json();
                        newAfterID = jsonResponse.data.after;
                        if (jsonResponse.data.children){
                                postsWithVideos= jsonResponse.data.children.map(subreddit => ({
                                                                author: subreddit.data.author,
                                                                title: subreddit.data.title,
                                                                content: subreddit.data.url,
                                                                comment_count: subreddit.data.num_comments,
                                                                postID: subreddit.data.id,
                                                                time:subreddit.data.created,
                                                                votes: subreddit.data.ups,
                                                                after: newAfterID,
                                                                type:type,
                                                                postType: subreddit.data.post_hint,
                                                            }));
                                                            for (item in postsWithVideos) {
                                                                if (postsWithVideos[item].postType == "hosted:video") {
                                                                    postsWithVideos[item].video = jsonResponse.data.children[item].data.media.reddit_video.fallback_url;
                                                                    // console.log(postsWithVideos[item]);
                                                                    // console.log(jsonResponse.data.children[item].data.media.reddit_video.fallback_url)
                                                                }
                                                            }
                                                            console.log(postsWithVideos);
                            return postsWithVideos;
                            
                                                        
                            } else {
                                return [];
                            }
                    }
                    } catch(error){
                    console.log(error);
                    }
                }   
            },
            async manageSubscriptions(subscription,subreddit) {
                const bodyData="";
                if (subscription) {
                try{
                    const response = await fetch(`https://oauth.reddit.com/api/subscribe?action=sub&sr_name=${subreddit}&skip_initial_defaults=true&action_source=o`,
                    {
                        method:'POST',
                        body: bodyData,
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    if(response.ok){
                      const jsonResponse = await response.json();
                      return jsonResponse;
                //       afterID = jsonResponse.data.after;
                //     if (jsonResponse.data.children){
                //             return jsonResponse.data.children.map(subreddit => ({
                //                                             author: subreddit.data.author,
                //                                             title: subreddit.data.title,
                //                                             content: subreddit.data.url,
                //                                             comment_count: subreddit.data.num_comments,
                //                                             postID: subreddit.data.id,
                //                                             time:subreddit.data.created,
                //                                             votes: subreddit.data.ups,
                //                                             after: afterID,
                //                                             type:type
                //                                         }));
                //         } else {
                //             return [];
                //         }
                 }
                } catch(error){
                  console.log(error);
                }
            }  else {
                try{
                    const response = await fetch(`https://oauth.reddit.com/api/subscribe?action=unsub&sr_name=${subreddit}&action_source=o`,
                    {
                        method:'POST',
                        body: bodyData,
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    if(response.ok){
                      const jsonResponse = await response.json();
                      return jsonResponse;
                    }
                } catch(error){
                  console.log(error);
                }
            }
            },
            async getBestPostsAfter(afterID) {
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
            async postVotes(id,vote) {
                let voteDetail;
                const bodyData="";
                try{
                    const response = await fetch(`https://oauth.reddit.com/api/vote?dir=${vote}&id=${id}&rank=2`,
                    {
                        method:'POST',
                        body: bodyData,
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    if(response.ok){
                      const jsonResponse = await response.json();
                      return voteDetail = {id:id,vote:vote}
                    }
                } catch(error){
                    console.log(error);
                }
            },
            async getComments(subreddit,commentID) {
                try {
                    const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/comments/${commentID}?limit=500&depth=50`,
                    {
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    if(response.ok){
                    const jsonResponse = await response.json();
                    if (jsonResponse[1].data.children){
                            return jsonResponse[1].data.children.map(subreddit => ({
                                                                author: subreddit.data.author,
                                                                title: subreddit.data.title,
                                                                comment_count: subreddit.data.num_comments,
                                                                commentID: subreddit.data.id,
                                                                time:subreddit.data.created,
                                                                votes: subreddit.data.score,
                                                                vote: subreddit.data.likes,
                                                                comment: subreddit.data.body,                                                       
                                                            }));
                            
                            } else {
                                return [];
                            }                          
                }
                } catch(error){
                console.log(error);
                }
            },
            async sendComments(comment,postID){
                const time = Date.now();
                let newComment;
                try {
                    const response = await fetch(`https://oauth.reddit.com/api/comment?thing_id=${postID}&text=${comment}`,
                    {                      
                        method:'POST',
                        headers:{Authorization:`Bearer ${token}`}                  
                    });
                    if(response.ok){
                        return newComment = { author: "Numedian",
                                            commentID: "",
                                            time:time,
                                            votes: 0,
                                            vote:null,
                                            comment: comment
                        }
                            
                    } else {
                        return "";
                    }                          
                } catch(error){
                console.log(error);
                }
            }
        }
    
    
        // const data = Reddit.searchSubredditsName("gaming");
        //const data = Reddit.getAccessToken();
    //     const data = Reddit.getMySubreddits();
    // const data = Reddit.getUserName();
    // const data = Reddit.getPosts("witcher","new");
    // const data = Reddit.getComments("anothtestcommunity","12qe770");
    // const data = Reddit.manageSubscriptions(false,"gaming");
    // const data = Reddit.postVotes("t3_12jjqar",0)
    const data = Reddit.sendComments("test nr 1 comment","t3_12qe770",);
    console.log(data)
// // console.log(dataNew)

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
    "Gamestar63": {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    "Gamehbhfstar63": {author:"Gamehbhfstar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    "Gakbknr gkjr63": {author:"Gakbknr gkjr63",
    title:"Healinkjbkjrgbjgbable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    "Gakjbhjrbghjb3": {author:"Gakjbhjrbghjb3",
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


const obj10=[
    {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    {author:"Gamestar63",
    title:"Healing in PVP is miserable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    {author:"Gakbknr gkjr63",
    title:"Healinkjbkjrgbjgbable",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    },
    {author:"Gakjbhjrbghjb3",
    title:"Healinkjbvjbjhrbe",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_1299pdw",
    }
    ]

const obj2= {author:"Gakjbhj8",
    title:"Healinkjbvjbjhrbe",
    content:"https://www.reddit.com/r/wow/comments/1299pdw/healing_in_pvp_is_miserable/",
    comment_count:157,
    postID:"1299pdw",
    time:1680409056,
    votes:150,
    after:"t3_noice",
    }
// obj1[obj2.author] = obj2;
// console.log(obj1)

function convertNumbers(num) {
    let isNegatif;
    if (num === null) {
        return "0";
    }
    let number= num.toString();
    (number[0] === "-" ? isNegatif = true && (number = number.slice(1)) : isNegatif = false);
    console.log(isNegatif)
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
}


// const countVote = 288;
// console.log(countVote+1)
// // const numero = -4009
// const numeroString = numero.toString();
// console.log(numeroString[0])
// console.log(convertNumbers(numero))

function countArray(number) {
    let array = []
    while (number >0) {
        array.push(number);
        number--;
    }
    return array;
}


const newComment = {author:"Numedian",
commentID:"jgqglao",
time:1681819436,
votes:1,
vote:true,
comment:"test3"
};

const comments = [{author:"Numedian",
commentID:"jgqglao",
time:1681819437,
votes:1,
vote:true,
comment:"test"},
{author:"Numedian",
commentID:"jgqglao",
time:1681819437,
votes:1,
vote:true,
comment:"test2"}]

comments.push(newComment);
console.log(comments)