const UnauthorizedVerifiedToken = () => {
    return (
        <div className='container-page'>
            <div className="custom-post" style={{marginTop: '10%'}}>
                <h1>401 Unauthorized</h1>
                <h2>This error occurs due to the link that you want to verify is expired!. If your email is still not verified, you can try signing up again!</h2>          
            </div>
        </div>
    );
}
 
export default UnauthorizedVerifiedToken;