export function clearError(){
    return {
        type : "CLEAR_EDIT_USER_ERROR"
    }
}


export function editUser(userId){
    return {
        type : "EDIT_USER_EMAIL_ID",
        userId
    }
}