import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTextArea,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit'
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
const PostModifyDisplay = (_id) => {

    //Khai bao useState() cho error
    const [error, setError] = useState(null);

    //Khai bao useState() cho input
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //Khai bao postId
    const id = _id._id;

    //Khai bao useAuthContext()
    const {user} = useAuthContext();

    // Khai bao de thuc hien modal
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const handleModify = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.put('/api/user/postUpdate/' + id, {
                title: title,
                content: content
            }, 
            {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`  
                }
            })
            window.location.reload();
            //console.log(response.data);
        } catch (error) {
            const data = error.response.data.error;
            const stringAlert = JSON.stringify(data);
            setError(stringAlert);
        }
    }
    return ( 
        <>
            <MDBBtn onClick={toggleShow} color='success'>Modify</MDBBtn>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Post Modify</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <MDBModalBody>
                                <MDBInput wrapperClass='mb-4' label='title' id='form1' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                                <MDBTextArea label='Content' id='textAreaExample' rows={4} value={content} onChange={e => setContent(e.target.value)}/>
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleShow}>
                                    Close
                                </MDBBtn>
                                <MDBBtn onClick={handleModify}>Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
        </>
    );
}
 
export default PostModifyDisplay;