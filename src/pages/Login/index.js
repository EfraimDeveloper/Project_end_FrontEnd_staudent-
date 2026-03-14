import React,{useState} from "react";
import './styles.css';
import logotipo from'../../assets/img/Login.png'
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    async function login(event) {
        event.preventDefault();

        const data  ={
            email,password
        };

        try{
            const response =await api.post('api/Account/LoginUser',data);

            localStorage.setItem('email',email);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('expiration',response.data.expiration);

            navigate('/alunos');

        }catch(error){
            alert('O login falhou',+ error);
        }
    }
    return(
            <div className="container1">
                <section className="from">
                    <img className="img" src={logotipo} alt="Login" id="img1" width={100} height={100}/>

                    <form onSubmit={login} className="formulario">
                        <h1>Cadastro de Alunos</h1>
                        <input placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/>

                        <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}/>

                        <button className="button1" type="submit">Login</button>
                    </form>

                </section>

            </div>

    )
}