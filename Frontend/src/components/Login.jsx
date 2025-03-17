import {useState,useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {navigate} from 'react-router-dom';
function Login(){
const [username,setUsername]=useState('');  
const [password,setPassword]=useState('');
const {login, error,isLoading}=useContext(AuthContext); 

const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/notes');
    }
  };
return(
    <div className="">

    </div>
)
}
export default Login;