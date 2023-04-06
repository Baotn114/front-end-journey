import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
} from 'mdb-react-ui-kit'
import { useState } from "react";
const DeletePost = (_id) => {
    //khai bao AuthContext();
    const {user} = useAuthContext();

    // khai bao post id
    const id = _id._id;

    // Khai bao de thuc hien modal
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => {
        setBasicModal(!basicModal);
    };

    //Xu li function delete
    const handleClick = async () =>{
        try {
            const response = await axios.delete('https://journey-diary-api.onrender.com/api/user/postDelete/' + id, {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`              
                }
            });
            if(response){
                window.location.reload();
            }
        } catch (error) {
            const data = error.response.data.error;
            const stringAlert = JSON.stringify(data);
            console.log(stringAlert);
        }
        //window.location.reload();
    }
    return ( 
        <>
            <MDBBtn onClick={toggleShow} color='danger'>Delete</MDBBtn>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle style={{color: 'red'}}>Warning</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <p>Do you really want to delete the post?</p>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={toggleShow}>
                                    Close
                                </MDBBtn>
                                <MDBBtn onClick={handleClick}>Yes, I want to delete</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
        </>
     );
}
 
export default DeletePost;