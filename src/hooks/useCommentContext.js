import { CommentContext } from "../context/CommentContext";
import { useContext } from "react"
export const useCommentsContext = () =>{
    const context = useContext(CommentContext);
    return context
}