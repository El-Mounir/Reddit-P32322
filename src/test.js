

const IDs = {
    cID: "ZYWP2FoU6UN37Lwbq0FjwQ",
    credID: "p1fgaDtPXf87c1qKJsIloDWwtwGE4w",
    redirectUri: "http://localhost:3000/",
    state:"yguyef35r837gui3t78g",
    accessCode: "",
}
const endpoints = {
    subreddits: "https://oauth.reddit.com/subreddits/",
    getPosts: "https://oauth.reddit.com",
    subscription: "https://oauth.reddit.com/api/subscribe?"
}

const token = "169767304991-Mp0C3lJn4eWDffe2SjRd34U0s_Pt0Q";

const  getReplies = (replies) => {
    return replies.data.children.map(comment=> ({
                                         author: comment.data.author,
                                         title: comment.data.title,
                                         comment_count: comment.data.num_comments,
                                         commentID: comment.data.id,
                                         time:comment.data.created,
                                         votes: comment.data.score,
                                         vote: comment.data.likes,
                                         comment: (comment.data.body ? comment.data.body : ""),   
                                         replies: (comment.data.replies ? getReplies(comment.data.replies) : "")  ,                                                  
                                     }));
                                      
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
            window.location=`https://www.reddit.com/api/v1/authorize?client_id=${IDs.cID}&response_type=code&state=${IDs.state}&redirect_uri=${IDs.redirectUri}&duration=permanent&scope=read,submit,mysubreddits,save,subscribe,identity,vote`;
        }
    },
    async getAccessToken() {
        IDs.accessCode = Reddit.getAccessCode();
        let headers = new Headers();
        let bodyData = new FormData();
        bodyData.append('grant_type', "authorization_code");
        bodyData.append('code', IDs.accessCode);
        bodyData.append('redirect_uri', IDs.redirectUri);
        headers.set('Authorization', 'Basic ' + btoa(IDs.cID + ":" + IDs.credID));
        try{
            const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
                method:'POST',
                headers: headers,
                body: bodyData
                });
                if(response.ok){
                  const jsonResponse = await response.json();
                   return IDs.accessToken = { token: jsonResponse.access_token,
                                                expiry: jsonResponse.expires_in
                                            }
                }
            }catch(error){
              console.log(error);
            }
        sessionStorage.setItem("tokenId", IDs.accessToken.token);
        sessionStorage.setItem("timeleft", IDs.accessToken.expiry);
        window.location.reload();
    },
    async getUserName() {
        try{
            const response = await fetch(`https://oauth.reddit.com/api/v1/me`,
            {
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.ok){
                const jsonResponse = await response.json();
                return IDs.User = { user_name: jsonResponse.name,
                                    id: jsonResponse.id,
                                    icon_img: jsonResponse.icon_img
                                }
            }
        } catch(error){
          console.log(error);
        }
    },
    async getSubreddits(subredditName,afterId) {
        let afterID;
        let newAfterID;
        let subreddits;
        if(!afterId) {
            try {
                const response = await fetch((subredditName ? `${endpoints.subreddits}search?q=${subredditName}&limit=100`: `${endpoints.subreddits}mine/subscriber?limit=8`),
            {
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.ok){
                subreddits = await response.json();
                afterID = subreddits.data.after;
            }
            }catch(error){
                console.log(error);
            }
        } else {
            try{
                const response = await fetch((subredditName ? `${endpoints.subreddits}search?q=${subredditName}&limit=100&after=${afterId}`: `${endpoints.subreddits}mine/subscriber?limit=8&after=${afterId}`),
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                    subreddits = await response.json();
                    newAfterID = subreddits.data.after;
                }
            } catch(error){
                console.log(error);
            }
        }
        if (subreddits.data.children){
            // return subreddits.data.children;
            return subreddits.data.children.map(subreddit => ({
                                            icon_image: subreddit.data.community_icon,                                                    
                                            name: subreddit.data.display_name,
                                            prefixed_name: subreddit.data.display_name_prefixed,
                                            subscriber_count: subreddit.data.subscribers,
                                            redditID: subreddit.data.id,
                                            description:subreddit.data.public_description,
                                            background_img: subreddit.data.banner_background_image,
                                            after: (newAfterID ? newAfterID : afterID),
                                        }));
        } else {
            return [];
        }
    },
    async getPosts(subreddit,type,afterId) {
        let afterID;
        let newAfterID;
        let posts;
        let postsWithVideos;
        if(!afterId) {
            try {
                const response = await fetch((subreddit ? `${endpoints.getPosts}/r/${subreddit}/${type}?g=GLOBAL` : `${endpoints.getPosts}/${type}`),
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                posts = await response.json();
                afterID = posts.data.after;
            }
            } catch(error){
                console.log(error);
            }
        } else {
            try{
                const response = await fetch((subreddit ? `${endpoints.getPosts}/r/${subreddit}/${type}?g=GLOBAL&after=${afterId}` : `${endpoints.getPosts}/${type}?after=${afterId}`),
                {
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                    posts = await response.json();
                    newAfterID = posts.data.after;
                } 
            } catch(error){
                console.log(error);
            }
        }
        if (posts.data.children){
            return posts.data.children;
            // postsWithVideos= posts.data.children.map(subreddit => ({
            //                                                 author: subreddit.data.author,
            //                                                 subreddit: subreddit.data.subreddit,
            //                                                 title: subreddit.data.title,
            //                                                 content: subreddit.data.url,
            //                                                 comment_count: subreddit.data.num_comments,
            //                                                 postID: subreddit.data.id,
            //                                                 time:subreddit.data.created,
            //                                                 votes: subreddit.data.ups,
            //                                                 vote: subreddit.data.likes,
            //                                                 after: (newAfterID ? newAfterID : afterID),
            //                                                 type:type,
            //                                                 url: subreddit.data.url,
            //                                                 selftext: subreddit.data.selftext,
            //                                                 postType: subreddit.data.post_hint,
            //                                             }));
            //                                             for (let item in postsWithVideos) {
            //                                                 if (postsWithVideos[item].postType == "hosted:video") {
            //                                                     postsWithVideos[item].video = posts.data.children[item].data.media.reddit_video.fallback_url;
            //                                                     console.log(postsWithVideos[item].video);
            //                                                 }
            //                                             }
        // return postsWithVideos;   
        } else {
            return [];
        }   
    },
    async manageSubscriptions(subscription,subreddit) {
        try{
            const response = await fetch((subscription ? `${endpoints.subscription}action=sub&sr_name=${subreddit}&skip_initial_defaults=true&action_source=o` : 
                                                        `${endpoints.subscription}action=unsub&sr_name=${subreddit}&action_source=o`),
            {
                method:'POST',
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
        }
        } catch(error){
            console.log(error);
        }
    },
    async postVotes(id,vote) {
        try{
            const response = await fetch(`https://oauth.reddit.com/api/vote?dir=${vote}&id=${id}`,
            {
                method:'POST',
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.ok){
              const jsonResponse = await response.json();
              return jsonResponse;
            }
        } catch(error){
            console.log(error);
        }
    },
    async getComments(subreddit,commentID,children) {
        try {
            const response = await fetch((!children ? `https://oauth.reddit.com/r/${subreddit}/comments/${commentID}?showmedia=true&showmore=true&sort=top&threaded=true&depth=100` :
                                        `https://oauth.reddit.com/api/morechildren?link_id=t3_${commentID}&limit_children=true&api_type=json&sort=top&children=${children}`),
            {
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.ok){
            const jsonResponse = await response.json();
            if (jsonResponse){
                    //return jsonResponse.json.data;
                    return (!children ? jsonResponse[1].data.children : jsonResponse.json.data.things).map(subreddit => ({
                                                        author: subreddit.data.author,
                                                        title: subreddit.data.title,
                                                        comment_count: subreddit.data.num_comments,
                                                        commentID: subreddit.data.id,
                                                        time:subreddit.data.created,
                                                        votes: subreddit.data.score,
                                                        vote: subreddit.data.likes,
                                                        comment: (subreddit.data.body ? subreddit.data.body : ""), 
                                                        replies: (subreddit.data.replies ? getReplies(subreddit.data.replies) : ""),
                                                        children:(subreddit.kind === "more" ? subreddit.data.children : null ),

                                                    }));
                    } else {
                        return [];
                    }                          
        }
        } catch(error){
        console.log(error);
        }
    },
    async getMoreComments(commentID,children) {
        try {
            const response = await fetch(`https://oauth.reddit.com/api/morechildren?link_id=t3_${commentID}&limit_children=false&api_type=json&sort=top&children=${children}`,
            {
                headers:{Authorization:`Bearer ${token}`}
            });
            if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse
            }
        } catch(error){
            console.log(error);
            }
    },
    async sendComments(comment,postID){
        try {
            const response = await fetch(`https://oauth.reddit.com/api/comment?thing_id=${postID}&text=${comment}`,
            {                      
                method:'POST',
                headers:{Authorization:`Bearer ${token}`}                  
            });
            if(response.ok){
                const newComment = { author: "Numedian",
                                    commentID: Math.floor(Math.random()*1000),
                                    time:"just now",
                                    votes: 1,
                                    vote:null,
                                    comment: comment
                                    }  
            return newComment;
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
        // const data = Reddit.getSubreddits("mandalorian","t5_a9sau");
    // const data = Reddit.getUserName();
    // const data = Reddit.getPosts("gaming","hot");
    // const data= Reddit.getMorePosts("witcher","new","t3_12qoi0v");
    const data = Reddit.getComments("witcher","12xscca");
    // const data = Reddit.getMoreComments('t3_12xscca');
    // const data = Reddit.manageSubscriptions(false,"gaming");
    // const data = Reddit.postVotes("t3_12jjqar",0)
    // const data = Reddit.sendComments("test nr 1 comment","t3_12qe770",);
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

function replaceText(text){
    return text.replaceAll("&amp;", "&")
}

const text1 = "https://youtube.com/watch?v=3MYC83xN9Ko&amp;feature=share";
// console.log(replaceText(text1))


// function epochConverter(creationTime) {
//     const inSeconds = [1,60,3600,86400,604800,2419200,31536000];
//     const inUnit = ["second","minute","hour","day","week","month","year"]
//     for (let t=0; t < inSeconds.length;t++) {
//         if (( creationTime >= inSeconds[t])  && ( creationTime < inSeconds[t+1])) {        
//             ((creationTime - inSeconds[t] ) == 0 ? 
//             creationTime = `${Math.floor(creationTime/inSeconds[t])} ${inUnit[t]}` : 
//             creationTime = `${Math.floor(creationTime/inSeconds[t])} ${inUnit[t]}s`);
//         return creationTime;
//         } 
//     }
// };

// console.log(epochConverter(120));



const video = "https://www.nottube.com/embed/D3WV8iDoPAY";

// console.log(video.match("youtube"));