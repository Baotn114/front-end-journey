import axios from "axios";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentsContext } from "../hooks/useCommentContext";
const CommentSection = (data_id) => {
    // Khai bao useState()
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    // Khai bao userAuth
    const {user} = useAuthContext();

    // //Khai bao post id
    const id = data_id.data_id;

    const {dispatch} = useCommentsContext();

    const handleClick = async (e) =>{
        e.preventDefault();
        // Dung POST de gui comment vao Db
        try {
            const response = await axios.post('https://journey-diary-api.onrender.com/api/user/comment/' + id, {
                comment: comment,
                user: `${user._id}`,
                post: id
            },
            {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`              
                } 
            })
            const data = response.data;
            if(data){
                dispatch({type: 'CREATE_COMMENTS', payload: data})
            }
            setComment('');
        } catch (error) {
            const data = error.response.data.error;
            const stringAlert = JSON.stringify(data);
            setError(stringAlert);
        }
    }
    return ( 
        <div className="d-flex flex-column" style={{marginTop: '30px'}}>
            {error && <div class="alert alert-danger" role="alert">{error}</div>}
            <MDBInput type="textarea" label="Add a comment" className="mb-2" value={comment} onChange={(e) => setComment(e.target.value)}/>

            <div className="d-flex align-items-center justify-content-between mb-3" style={{marginTop: '10px'}}>
                <MDBBtn color="primary" size="sm" onClick={handleClick}>Post</MDBBtn>
            </div>
        </div>
     );
}
 
export default CommentSection;