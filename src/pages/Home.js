import { 
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
const Home = () => {
    return (
        <div className='container-page'>
            <MDBContainer fluid 
                className='p-5 text-center bg-image'
                style={{ backgroundImage: "url('https://wallpapers.com/images/featured/wnxju2647uqrcccv.jpg')", height: '600px' }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                        <h1 className='mb-3'>Have you exprerienced any amazing Journey before?</h1>
                        <h4 className='mb-3'>Mind sharing with us?</h4>
                        </div>
                    </div>
                </div>
            </MDBContainer>
            <MDBContainer>
                <MDBRow >
                    <MDBCol size='md' className='p-5' >
                        <MDBCard>
                            <MDBCardImage src='https://source.unsplash.com/random/300x350/?lanscape' alt='...' position='top'/>
                            <MDBCardBody>
                                <MDBCardText>
                                You can tell us about the Journey that you never forget and let people cheer with your joy.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size='md' className='p-5'>
                        <MDBCard>
                            <MDBCardImage src='https://source.unsplash.com/random/300x350/?animal' alt='...' position='top'/>
                            <MDBCardBody>
                                <MDBCardText>
                                Maybe you can tell us an animal that you love, it's exciting to know about the type of best friend you want to have!! 
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size='md' className='p-5' >
                        <MDBCard>
                            <MDBCardImage src='https://source.unsplash.com/random/300x350/?people happy' alt='...' position='top'/>
                            <MDBCardBody>
                                <MDBCardText>
                                Or maybe it's just a member of your family or the person whom you have a crush on? Tell us your feelings towards to them. It's nice to
                                have an affection for someone and be loved by people around you!!
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer> 
        </div>
        
     );
}
 
export default Home;
