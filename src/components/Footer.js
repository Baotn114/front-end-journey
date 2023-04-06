import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon
} from 'mdb-react-ui-kit';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return ( 
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{marginTop: '100px'}}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with me on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/profile.php?id=100008694752347' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='https://www.linkedin.com/in/trịnh-ngọc-bảo-19993b24a/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='https://github.com/Baotn114' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Technology in use</h6>
              <p>
                Mongoose framework 
              </p>
              <p>
                ReactJs <MDBIcon color='secondary' fab icon='ReactJs'/>
              </p>
              <p>
                NodeJs Express
              </p>
              <p>
                MongoDb Database
              </p>
            </MDBCol>
            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Tan Binh, Ho Chi Minh, Viet Nam
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                trnhtommy@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 89 929689603
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {currentYear} Copyright :
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Sharing Journey
        </a>
      </div>
    </MDBFooter>
    );
}
 
export default Footer;