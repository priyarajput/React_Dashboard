const initialState = {
    username: '',
    isLoggingIn: false,
    isLoggedIn: false,
    error: null,
    redirectUrl: '',
    isAuthenticated: false,
    languageList:[]
};

function user(state=initialState,action){
    switch(action.type){
        case "LOGGED_FAILED" :
            return Object.assign({},state,{
                isLoggingIn : true,
                isLoggedIn : false,
                error : action.error
            });
        case "IS_AUTHENTICATED" :
            return Object.assign({},state,{
                isAuthenticated :  action.status
            });
        case "SET_REDIRECT_URL" :
            return Object.assign({},state,{
                redirectUrl : action.currentUrl
            });
        case "LOGGED_SUCCESSFULLY" :
            return Object.assign({},state,{
                username : action.user.email,
                roles : action.user.propertyRoleMap[Object.keys(action.user.propertyRoleMap)[0]],
                propertyId : Object.keys(action.user.propertyRoleMap)[0],
                userId : action.user.userId,
                error: null,
                isLoggingIn: false,
                isLoggedIn: true,
                languageList:action.user.languageList
            });
        default:
            return state;
    }
}

function siteData(state=initialState,action){
    switch(action.type){
        case "PAGEVIEWS_PISTATS" :
            return Object.assign({},state,{
                pageViews:action.pageViews
            });
        default:
            return state;
    }
}

module.exports={
    user,siteData
};