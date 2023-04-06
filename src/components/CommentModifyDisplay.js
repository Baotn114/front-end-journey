import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTextArea,
    MDBBtn
} from 'mdb-react-ui-kit'
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
const CommentModifyDisplay = (_id) => {

    // Khai bao useAuthContext
    const {user} = useAuthContext();

    // Khai bao useState() cho modal
    const [modify, setModify] = useState('');
    const [error, setError] = useState(null);

    // Khai bao id cua comment
    const id = _id._id;

    // Khai bao de thuc hien modal
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const handleModify = async ()=>{
        console.log(id);
        try {
            await axios.put('/api/user/commentUpdate/' + id, {
                modify : modify
            }, 
            {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`  
                }
            })
            window.location.reload();
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
                                <MDBModalTitle>Comment Modify</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <MDBModalBody>
                                <MDBTextArea label='Comment' id='textAreaExample' rows={4} value={modify} onChange={e => setModify(e.target.value)}/>
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
 
export default CommentModifyDisplay;