import { 
    MDBContainer, 
    MDBRow
} from 'mdb-react-ui-kit';
import CommentModify from '../components/CommentModify';
import Profile from '../components/Profile';
import PostModify from '../components/PostModify';
const User = () => {
    return (
        <div className="container-page" style={{backgroundImage: `url( https://wallpaperset.com/w/full/f/a/4/38616.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>    
            <MDBContainer style={{marginTop: '20px', maxWidth: '30%'}}>
                <Profile />
                <MDBRow>
                    <CommentModify />
                </MDBRow>
                <MDBRow>
                    <PostModify />
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
 
export default User;