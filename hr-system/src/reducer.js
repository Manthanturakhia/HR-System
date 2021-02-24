export const initialState={
    user : null,
    userDetails: [],
    AllUsersDetails: [],
    
}

const reducer = (state,action) =>{
    console.log(action)
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user : action.user
            }
        case 'SET_USER_DETAILS':
            return{
                ...state,
                userDetails: action.userDetails
            }
       
        case 'SET_ALL_USER_DETAILS':
            return{
                ...state,
                AllUsersDetails: action.AllUsersDetails
            }
        default:
            return state;
    }
}

export default reducer