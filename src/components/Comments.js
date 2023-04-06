import axios from "axios";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
    MDBCardText
  } from "mdb-react-ui-kit";
import { useEffect} from "react";
import { useCommentsContext } from "../hooks/useCommentContext";
const Comments = (data_id) => {

    //Khai bao blog id
    const id = data_id.data_id;

    //Khai bao useCommentsContext
    const {userComments, dispatch} = useCommentsContext();
    

    //Su dung axios Get de lay tat ca comment
    const getComments = async () =>{
      await axios.get('https://journey-diary-api.onrender.com/api/user/comments/' + id)
        .then(response =>{
          //console.log(response.data)
          const data = response.data;
          dispatch({type: 'SET_COMMENTS', payload: data})
          //console.log(data);
        })
        .catch(error =>{
          console.log(error);
        })
    }

    useEffect(() =>{
      getComments()
    }, [])


    return ( 
    <section style={{ backgroundColor: "#D3E8F5" }}>
          <MDBContainer className="py-5" style={{ maxWidth: "1000px", marginTop: '20px'}}>
            <MDBRow className="justify-content-center">
              <MDBCol md="12" lg="10">
                    <MDBTypography tag="h4" className="mb-0">
                      Recent comments
                    </MDBTypography>
                    <p className="fw-light mb-4 pb-2">
                      Latest Comments section by users
                    </p>
            {userComments && userComments.map(data => (
                <MDBCard className="text-dark" style={{marginTop: '10px'}} key={data._id}>
                  <MDBCardBody className="p-4">
                    <div className="d-flex flex-start">
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src={data && data.user.image ? data.user.image : 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg'}
                        alt="avatar"
                        width="60"
                        height="60"
                      />
                      <div>
                          <MDBTypography tag="h6" className="fw-bold mb-1">
                              {data.user.name}
                          </MDBTypography>
                        <MDBCardText>
                          <small className='text-muted'> {data.user.email} </small>
                        </MDBCardText>
                        <p className="mb-0">
                              {data.comment}
                        </p>
                      </div>
                    </div>
                  </MDBCardBody>
                  <hr className="my-0" />
                </MDBCard>
        ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
    </section>
    );
}
 
export default Comments;