import {
    MDBBtn,
    MDBCard,
    MDBCardImage,
    MDBInput,
    MDBTextArea
} from 'mdb-react-ui-kit'
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
const PostCreate = () => {

    // Khai bao useState cac nut
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    //Khai bao useState() cho image
    const [image, setImage] = useState(null);

    //Khai bao useNavigate
    const navigate = useNavigate();

   // Khai bao AuthContext
   const {user} = useAuthContext();


    // khai bao function chuc nang
    const handleClick = async (e)=>{
        e.preventDefault();
        // Su dung POST de luu data vao database
        try {
            const response = await axios.post('/api/post/', {
                title: title,
                userName: `${user.name}`,
                content: content,
                user: `${user._id}`,
                image: image
            }
            ,{
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`              
                } 
            })
            console.log(response.data);
            navigate('/posts')
        } catch (error) {
            const data = error.response.data.error;
            const stringAlert = JSON.stringify(data);
            setError(stringAlert);
        }
    }

    // function convertTo64
    const convertToBase64 = (e)=>{
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () =>{
            setImage(fileReader.result);
        }
    }

    return ( 
        <div className="container-page" style={{backgroundImage: `url(https://images.pexels.com/photos/415368/pexels-photo-415368.jpeg?cs=srgb&dl=pexels-pixabay-415368.jpg&fm=jpg)`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
            <div style={{marginTop: '100px'}}></div>
            <MDBCard className='mb-3' style={{marginTop: '100px', maxWidth: '40%', display: 'block', margin: '0 auto', padding: '10px'}}>

                {!image ? (<MDBCardImage position='top' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU51fiaftKaMUphbigtdClPF_yQca4qw2iBQ&usqp=CAU' alt='post' />) : (<MDBCardImage position='top' src={image} alt='post' />)}

                {error && <div class="alert alert-danger" role="alert" style={{marginTop: '6px'}}>{error}</div>}
                <MDBInput label='Post title' id='typeText' type='text' style={{marginTop: '20px'}} value={title} onChange={(e)=> setTitle(e.target.value)}/>
                <MDBTextArea label='Message' id='textAreaExample' rows={4} style={{marginTop: '20px'}} value={content} onChange={(e) => setContent(e.target.value)}/>
                <MDBInput type='file' style={{marginTop: '20px'}} accept=".jpg,.jpeg,.png" onChange={convertToBase64}/>
                <MDBBtn style={{marginTop: '20px'}} onClick={handleClick}>Share</MDBBtn>
            </MDBCard>
        </div>
    );
}
 
export default PostCreate;