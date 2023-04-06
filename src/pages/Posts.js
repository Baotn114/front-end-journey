import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const Posts = () => {

    // Khai bao useState() de lay cac blog
    const [post, setPost] = useState(null);

    // Khai bao get Blogs
    const getPost = async () =>{
        await axios.get('/api/post/')
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }

    useEffect(()=>{
        getPost();
    }, [])

    return ( 
        <div className="container-page" style={{backgroundImage: `url(https://wallpaperset.com/w/full/9/f/b/38639.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
            <div className="custom-post">
                <div className="row" style={{marginTop: '30px'}}>
                    {post && post.map((data)=>(
                        <div className="col-sm-3" style={{width: '300px', marginTop: '30px'}}>
                            <Link to={`/details/${data._id}`} key={data._id}>
                                <MDBCard>
                                    <MDBCardImage src={data.image} alt='...' position='top' />
                                    <MDBCardBody>
                                    <MDBCardTitle>{data.title}</MDBCardTitle>
                                    <MDBCardText><strong>Name: {data.userName}</strong></MDBCardText>
                                    <MDBCardText>
                                        <small className='text-muted'>{formatDistanceToNow(new Date(data.createdAt), {addSuffix: true})}</small>
                                    </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Posts;