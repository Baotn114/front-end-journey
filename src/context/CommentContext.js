import { 
    createContext,
    useReducer
} from "react";

export const CommentContext = createContext();

export const commentsReducer = (state, action) =>{
    switch (action.type){
        case 'SET_COMMENTS':
            return{
                userComments: action.payload
            }
        case 'CREATE_COMMENTS':
            return{
                userComments: [...state.userComments, action.payload]
            }
        case 'DELETE_COMMENTS':
            return{
                userComments: state.userComments.filter((comment) => comment._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const CommentContextProvider = ({children}) =>{
    //Khai bao initial value cho useReducer
    const [state, dispatch] = useReducer(commentsReducer, {
        userComments: null
    })

    return(
        <CommentContext.Provider value={{...state, dispatch}}>
            {children}
        </CommentContext.Provider>
    )
}