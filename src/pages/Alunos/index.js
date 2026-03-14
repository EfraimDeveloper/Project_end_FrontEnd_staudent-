import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import'./styles.css';                 
import {FiXCircle, FiEdit, FiUser } from "react-icons/fi";
import api from "../../services/api";
import { FaUber } from "react-icons/fa";

export default function Alunos() {

    //Filtrar dados
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);


    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchAlunos = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const dadosFiltrados = alunos.filter((item) => {
                return Object.values(item).join('').toLocaleLowerCase().includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        } else {
            setFiltro(alunos);
        }
    }
    useEffect(() => {
        api.get('api/alunos', authorization).then(
            response => {
                setAlunos(response.data)

            }, token)
    })

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            navigate('/');

        } catch (error) {
            alert('Não foi possivel fazer o logout', +error);
        }

    }

    async function editAluno(id) {
        try {
            navigate(`/aluno/novo/${id}`);
        } catch (error) {
            alert('Não foi possível editar o aluno');
        }
    }

    async function deleteAluno(id){
        try{
            if(window.confirm('Deseja deletar o aluno de id='+ id +'?')){
                await api.delete(`api/alunos/${id}`,authorization);
                setAlunos(alunos.filter(aluno=> aluno.id !==id));
                setFiltro(alunos.filter(aluno=> aluno.id !==id));
            }
        }catch(error){
            alert('Não foi possível excluir o aluno');
        }
    }
    return (
        <div className="container">
            <header>
                <span className="text1">Bem-Vindo, <strong>{email}</strong>!</span>
                <Link className="button_new" to="/aluno/novo/0"> Novo aluno</Link>

                <button type="button" onClick={logout}>
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>

            <form>
                <input type="text" placeholder="Filtrar por nome" onChange={(e) => searchAlunos(e.target.value)} />

            </form>

            <h1>Relação de Alunos</h1>
            {searchInput.length > 1 ? (
                <ul>
                    {filtro.map(aluno => (

                        <li key={aluno.id}>
                            <b>Nome:{aluno.nome}</b><br></br>
                            <b>Email: {aluno.email}</b><br></br>
                            <b>Idade:{aluno.idade}</b><br></br>

                            <button type="button" onClick={() => editAluno(aluno.id)}>
                                <FiEdit size={25} color="#17202a" />
                            </button>
                            
                            <button type="button" onClick={()=>deleteAluno(aluno.id)}>
                                <FiUser size={25} color="#17202a" />
                            </button>
                        </li>

                    ))}

                </ul>
            ) : (

                 <ul>
                    {alunos.map(aluno => (

                        <li key={aluno.id}>
                            <b>Nome:{aluno.nome}</b><br></br>
                            <b>Email: {aluno.email}</b><br></br>
                            <b>Idade:{aluno.idade}</b><br></br>

                            <button type="button" onClick={() => editAluno(aluno.id)}>
                                <FiEdit size={25} color="#17202a" />
                            </button>

                            <button type="button" onClick={()=>deleteAluno(aluno.id)}>
                                <FiUser size={25} color="#17202a" />
                            </button>
                        </li>

                    ))}

                </ul>
                )}
            
        </div>
    )
}