import React, { useState } from 'react';

import api from '../services/api'

import Button from '../components/Button/Button'

import './Login.css'

export default function Login({ history }){
    const [ usuario, setUsuario ] = useState('')
    const [ senha, setSenha ] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const resposta = await api.post('/login', { usuario, senha })

        if(!resposta.data.sucesso) {
            alert('Login ou senha inválidos')
            setUsuario('')
            setSenha('')
        } else {
            history.push('/calendario')
        }
    }

    return(
        <div className="login-container">
            <div className="login-content">
                <form  onSubmit={ handleSubmit } className="login-form">
                    <label id="usuario">Usuário</label>
                    <input 
                        id="usuario" 
                        required placeholder="Insira seu usuário" 
                        value={ usuario } 
                        onChange={ (e) => setUsuario(e.target.value) }></input>

                    <label id="senha">Senha</label>
                    <input 
                        id="senha"
                        type="password"
                        required placeholder="Insira sua senha"
                        value={ senha }
                        onChange={ (e) => setSenha(e.target.value) }></input>

                    <Button 
                        text="Enviar" 
                        type="submit"
                        style={{ width: '200px', height: '60px' }}
                        className="login-submit-button"
                    />
                </form>
            </div>
        </div>
  );
}