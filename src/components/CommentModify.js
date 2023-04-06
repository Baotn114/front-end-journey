import { 
    MDBTable, 
    MDBTableBody, 
    MDBTableHead, 
    MDBTypography, 
    MDBCardImage,
    MDBBtn,
 } from 'mdb-react-ui-kit';
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios'
import { useEffect} from 'react';
import { useCommentsContext } from "../hooks/useCommentContext";
import CommentModifyDisplay from './CommentModifyDisplay';
const CommentModify = () => {

    //Khai bao userAuth
    const {user} = useAuthContext();

    //Khai bao useCommentsContext
    const {userComments, dispatch} = useCommentsContext();


    //Su dung axios Get de lay tat ca comment tu user nay`
    useEffect(()=>{
        if(user){
            const userId = user._id;
                const userComments = async ()=> {
                    const response = await axios.get('/api/user/userComment/' + userId, {
                        headers: {
                            'Content-type' : 'application/json',
                            'Authorization': `Bearer ${user.token}`              
                        } 
                    })
                    //console.log(response.data);
                    const data = response.data;
                    dispatch({type: 'SET_COMMENTS', payload: data})
                }
                userComments();
        }
    }, [user])

    //Xu li function delete
    const handleDelete = async (id) =>{
        console.log(id);
        const response = await axios.delete('/api/user/commentDelete/' + id, {
            headers: {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${user.token}`              
            }
        })
        const data = response.data;
        dispatch({type: 'DELETE_COMMENTS', payload: data})
    }

    
    return (
        <div style={{ height: '300px', overflow: 'auto'}}>
            <h3>Comment section</h3>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                    <th>#</th>
                    <th>Comment</th>
                    <th>Post</th>
                    <th>Author</th>
                    <th>Modify</th>
                    <th>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {userComments && userComments.map(data=> (
                    <tr key={data._id}>
                        <td>
                            <div className="d-flex flex-start">
                                <MDBCardImage
                                    className="rounded-circle shadow-1-strong me-3"
                                    src={data && data.user.image ? data.user.image : 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg'}
                                    alt="avatar"
                                    width="40"
                                    height="40"
                                />
                            </div>
                        </td>
                        <td>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                <MDBTypography
                                    tag="h6"
                                    className="text-primary fw-bold mb-0"
                                >
                                    <span className="text-dark ms-2">
                                    {data.comment}
                                    </span>
                                </MDBTypography>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                <MDBTypography
                                    tag="h6"
                                    className="text-primary fw-bold mb-0"
                                >
                                    <span className="text-dark ms-2">
                                    {data.post.title}
                                    </span>
                                </MDBTypography>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                <MDBTypography
                                    tag="h6"
                                    className="text-primary fw-bold mb-0"
                                >
                                    <span className="text-dark ms-2">
                                    {data.post.userName}
                                    </span>
                                </MDBTypography>
                                </div>
                            </div>
                        </td>
                        <td>
                            <CommentModifyDisplay _id={data._id}/>
                        </td>
                        <td>
                            <MDBBtn className='me-1' color='danger' onClick={() => handleDelete(data._id)}>
                                Delete
                            </MDBBtn>
                        </td>
                    </tr>
                ))}
                    
                </MDBTableBody>
            </MDBTable>
        </div> 
        
    );
}
 
export default CommentModify;