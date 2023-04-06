import { 
    MDBTable, 
    MDBTableBody, 
    MDBTableHead, 
    MDBTypography, 
    MDBCardImage,
 } from 'mdb-react-ui-kit';
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios'
import { useEffect, useState} from 'react';
import DeletePost from './DeletePost';
import PostModifyDisplay from './PostModifyDisplay';
const PostModify = () => {

    //Khai bao userAuth
    const {user} = useAuthContext();

    //Khai bao useState();
    const [userPosts, setUserPosts]  = useState(null);
    
    //Su dung axios Get de lay tat ca posts tu user nay`
    useEffect(()=>{
        if(user){
            const userId = user._id;
                const userPosts = async ()=> {
                    const response = await axios.get('https://journey-diary-api.onrender.com/api/user/userPost/' + userId, {
                        headers: {
                            'Content-type' : 'application/json',
                            'Authorization': `Bearer ${user.token}`              
                        } 
                    })
                    const data = response.data;
                    setUserPosts(data);
                }
                userPosts();
        }
    }, [user])


    return (  
        <div style={{ height: '300px', overflow: 'auto', marginTop: '20px'}}>
            <h3>Post section</h3>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>Post title</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {userPosts && userPosts.map(data => (
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
                                        {data.title}
                                        </span>
                                    </MDBTypography>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <PostModifyDisplay _id={data._id}/>
                            </td>
                            <td>
                                <DeletePost _id={data._id}/>
                            </td>
                        </tr>
                    ))} 
                </MDBTableBody>
            </MDBTable>
        </div> 
    );
}
 
export default PostModify;