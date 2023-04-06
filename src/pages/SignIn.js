import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
from 'mdb-react-ui-kit';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
const SignIn = () => {
    // khai bao navigate
    const navigate = useNavigate();

    const signUp = () =>{
      navigate("/sign-up")
    }

    // Khai bao useState cac nut
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //Khai bao useAuthContext
    const {dispatch} = useAuthContext();

    // khai bao function chuc nang
    const handleClick = async (e) =>{
      e.preventDefault();

      //Gui data nguoi dang nhap vao server
      try {
        const response = await axios.post('https://journey-diary-api.onrender.com/api/user/signin', {
          email: email,
          password: password
        })

        //Luu token nguoi dung vao local storage
        localStorage.setItem('user', JSON.stringify(response.data))

        //Cap nhat auth context
        dispatch({type: "LOGIN", payload: response.data})

        //Chuyen huong sang Home
        navigate('/')
      } catch (error) {
        //console.error(error.response.data);
        const data = error.response.data.error;
        const stringAlert = JSON.stringify(data);
        setError(stringAlert);
      }
    }


    return (
      <div className='container-page'>
          <MDBContainer className="my-5 content">
            <MDBRow>

              <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column ms-5">

                  <div className="text-center">
                    <img src="https://freedesignfile.com/upload/2017/06/Adventure-tourist-icon.jpg"
                      style={{width: '185px'}} alt="logo" />
                    <h4 className="mt-1 mb-5 pb-1">You are only one step away from joining with us!</h4>
                  </div>

                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <p>Please login to your account</p>

                  <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>


                  <div className="text-center pt-1 mb-5 pb-1">
                    <MDBBtn className="mb-4 w-100 " style={{background: '#FFDAB9', color: '#8B4513'}} onClick={handleClick}>Sign in</MDBBtn>
                    <a className="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                    <p className="mb-0">Don't have an account?</p>
                    <MDBBtn outline className='mx-2' color='danger' onClick={signUp}>
                      Sign Up
                    </MDBBtn>
                  </div>

                </div>

              </MDBCol>

              <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column  justify-content-center h-100 mb-4" style={{background: '#FFDAB9'}}>

                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4" style={{color:'#8B4513'}}>A meaningful journey is a treasure to those who cherishes the present moments and grows the mindset over the course of time</h4>
                    <p className="small mb-0" style={{color:'#8B4513'}}>"The purpose of life is to live it, 
                    to taste experience to the utmost, to reach out eagerly and without fear for newer 
                    and richer experience." - Eleanor Roosevelt
                    </p>
                  </div>

                </div>

              </MDBCol>

            </MDBRow>
          </MDBContainer>
      </div>
        
      );
}
 
export default SignIn;