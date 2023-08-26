import Alert from 'react-bootstrap/Alert';

function Header(props){
    return (
        <div>
            <Alert variant="dark" className='text-center'>
                <h1>
                    {props.texto}
                </h1>
            </Alert>
        </div>
    );
}

export default Header