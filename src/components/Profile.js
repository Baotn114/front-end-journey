import { 
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBCardTitle,
    MDBCardText
} from 'mdb-react-ui-kit';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const Profile = () => {

    //Khai bao fileInputRef
    const fileInputRef = React.createRef();

    //Khai bao user AuthContext()
    const {user} = useAuthContext();

    //Khai bao Id user
    const id = `${user._id}`;

    //Khai bao useState()
    const [profile, setProfile] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [showComponent, setShowComponent] = useState(false);

    const getUserInfo = async () =>{
        const response = await axios.get('https://journey-diary-api.onrender.com/api/user/profile/' + id,{
            headers: {
                'Content-type' : 'application/json',
                'Authorization': `Bearer ${user.token}`  
            }
        })
        const data = response.data;
        setProfile(data);
        //console.log(data.image);
    }

    useEffect(()=>{
        getUserInfo();
    }, [])

    //Chon anh avatar cho user cua ban
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        // Do something with the file, such as upload it to a server
        if(file){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () =>{
                setImage(fileReader.result);
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
        setShowComponent(true);
    };

    //Nhan nut de apply hinh anh
    const handleClick = async () =>{
        try {
            const response = await axios.put('https://journey-diary-api.onrender.com/api/user/profile/' + id, {
                image: image
            }, 
            {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`  
                }
            })
            if(response){
                window.location.reload();
            }
        } catch (error) {
            const data = error.response.data.error;
            const stringAlert = JSON.stringify(data);
            setError(stringAlert);
        }
    }

    //Nhan nut de xac nhan
    const handleConfirm =() =>{
        setShowComponent(false);
    }
    return ( 
        <>
            <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                    
                    {profile && 
                        <MDBCardImage
                            src={profile && profile.image ? profile.image : 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg'}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '150px' }}
                            fluid 
                        />
                    }
                    
                    <MDBCardTitle style={{marginTop: '5px'}}>{profile && profile.name}</MDBCardTitle>
                    <MDBCardText><strong>Email: {profile && profile.email}</strong></MDBCardText>
                    <div className="d-flex justify-content-center mb-2" style={{marginTop: '16px'}}>
                        <MDBBtn onClick={handleButtonClick} color='success'>
                            Choose your avatar
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                            accept=".jpg,.jpeg,.png"
                        />
                        </MDBBtn>
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                </MDBCardBody>
            </MDBCard>
            {showComponent && 
                <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                            <MDBCardImage
                                src={image}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '150px' }}
                                fluid 
                            />
                        <MDBCardTitle style={{marginTop: '5px'}}>{profile && profile.name}</MDBCardTitle>
                        <MDBCardText><strong>Email: {profile && profile.email}</strong></MDBCardText>
                        <MDBCardText>Do you want to look like this?</MDBCardText>
                    </MDBCardBody>
                    <div className="d-flex justify-content-center mb-2">
                        <MDBBtn onClick={handleClick} color='success'>
                                Yes
                        </MDBBtn>
                        <MDBBtn onClick={handleConfirm} color='danger' style={{marginLeft: '6px'}}>
                                No
                        </MDBBtn>
                    </div>
                </MDBCard>
            }
        </>
    );
}
 
export default Profile;