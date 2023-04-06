import { useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput
  }
from 'mdb-react-ui-kit';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const SignUp = () => {

    // khai bao useState cac nut
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState(null);

    //khai bao navigate
    const navigate = useNavigate();

    // khai bao function chuc nang
    const handleSubmit = async (e) =>{
        e.preventDefault();

        //Gui data nguoi dung dang ki toi server
        try {
            await axios.post('https://journey-diary-api.onrender.com/api/user/signup', {
                name: name,
                email: email,
                password: password,
                repassword: repassword
            })
            navigate("/sign-in");
        } catch (error) {
            //console.error(error.response.data);
            const data = error.response.data.error;
            const stringAlert = JSON.stringify(data);
            setError(stringAlert);
        }
    }



    return ( 
        <div className='container-page'>
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://cdn.wallpapersafari.com/26/83/6aMtgn.jpg)', height: '100vh'}}>
            <div className='mask'></div>
                <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                    <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                
                    <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
                    <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
}
 
export default SignUp;