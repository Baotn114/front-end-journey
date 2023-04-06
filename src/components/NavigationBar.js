import React from 'react';
import { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
const Navigationbar = () => {
    const [showNavRight, setShowNavRight] = useState(false);
    const navigate = useNavigate();

    //khai bao hook logout
    const {logout} = useLogout();
    
    // Khai bao AuthContext
    const {user} = useAuthContext();

    //Khai bao function chuc nang
    const handleClick = ()=>{
        logout();
        navigate("/");
    }

    return (
        <header>
            <MDBNavbar expand='lg' light bgColor='light' className='custom-Navbar'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>
                                <img
                                src='https://freepngimg.com/save/168111-travel-icon-free-png-hq/3206x3494'
                                height='30'
                                alt=''
                                loading='lazy'
                                />
                                Journey Experiences
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarRightAlignExample'
                        aria-controls='navbarRightAlignExample'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavRight(!showNavRight)}
                        >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNavRight}>
                        <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/post">Posts</MDBNavbarLink>
                            </MDBNavbarItem>
                            {!user && (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/sign-in">Sign In</MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                            {!user && (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/sign-up">Sign Up</MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                            {user && (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/user">User</MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                            {user && (
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/creation">Create Post</MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                            {user && (
                                <MDBNavbarItem>
                                    <MDBNavbarLink onClick={handleClick}>Sign out</MDBNavbarLink>
                                </MDBNavbarItem>
                            )}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header>
        
    );
}
 
export default Navigationbar;