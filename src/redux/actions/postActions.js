import {FETCH_POSTS, NEW_POSTS} from './types'

export const fetchPosts = (idlistdatt, sortid) => dispatch =>{
    // console.log("gotcat", iddatat)
    console.log("gotid", idlistdatt)
    console.log("sortid", sortid)
    // let datacategory = iddatat
    let datachannel = idlistdatt
    console.log("got")
    fetch("https://newsapi.org/v2/top-headlines?sources="+idlistdatt+"&sortBy="+sortid+"&apiKey=a2ce1ec1b28e498da9c7d295dd2c22a9")
    
    .then(res => res.json())
    .then(posts => 
        dispatch({
            type: FETCH_POSTS,
            payload: posts
        })
    
    )
  
}