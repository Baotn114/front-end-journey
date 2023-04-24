import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBSpinner
  } from 'mdb-react-ui-kit';
import Comments from './Comments';
import CommentSection from './CommentSection';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const PostDetails = () => {
    // Khai bao useAuthContext
    const {user} = useAuthContext();

    // Khai bao lay ID
    const {id} = useParams();

    // Khai bao useState()
    const [details, setDetails] = useState(null);

    
    // Lay du lieu tu database thong qua id
    const getPostDetails = async (req, res) =>{
        await axios.get('https://journey-diary-api.onrender.com/api/post/details/' + id)
            .then(response =>{
                setDetails(response.data);
                //console.log(response.data);
            })
            .catch(error =>{
                console.log(error.response.data.error)
            })
    }

    //useEffect
    useEffect(()=>{
        getPostDetails();
    }, [])


    return ( 
        <div className="container-page">
            {!details

            ?   <div className='custom-post' style={{marginTop: '20%'}}>
                    <MDBSpinner grow className='mx-2' size="sm" color='info'>
                        <span className=''></span>
                    </MDBSpinner>
                    <MDBSpinner grow className='mx-2' size="sm" color='info'>
                        <span className=''></span>
                    </MDBSpinner>  
                    <MDBSpinner grow className='mx-2' size="sm" color='info'>
                        <span className=''></span>
                    </MDBSpinner>
                    <MDBSpinner grow className='mx-2' size="sm" color='info'>
                        <span className=''></span>
                    </MDBSpinner>
                </div>
            :   <div className="custom-post">
                    <MDBCard className='mb-3' style={{marginTop: '30px'}}>
                        <MDBCardBody>
                        <MDBCardTitle>{details && details.title}</MDBCardTitle>
                        <MDBCardText>
                            <strong>
                                Name: {details && details.userName}
                            </strong>
                        </MDBCardText>
                        <MDBCardText>
                            {details && details.content}
                        </MDBCardText>
                        <MDBCardText>
                            <small className='text-muted'>{details && formatDistanceToNow(new Date(details.createdAt), {addSuffix: true})}</small>
                        </MDBCardText>
                        </MDBCardBody>
                        <MDBCardImage position='bottom' src={details && details.image} alt='post' />
                    </MDBCard>
                    <Comments data_id={`${id}`}/>
                    {user && <CommentSection data_id={details && details._id}/>}
                </div>
            }
        </div>
    );
}
 
export default PostDetails;