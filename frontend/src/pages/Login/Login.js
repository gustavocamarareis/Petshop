import React, { useState, useEffect } from 'react';

import api from '../../services/api'

import Button from '../../components/Button/Button'

import './Login.css'

export default function Login({ history }){
    const [ usuario, setUsuario ] = useState('')
    const [ senha, setSenha ] = useState('')

    useEffect( () => {
        let user_id = localStorage.getItem('user_id')
        if(user_id === null || (user_id !== '' && ! user_id.length >= 1) ) {
            localStorage.setItem('user_id', '')
            history.push('/')
        }
    }, [] )

    async function handleSubmit(e) {
        e.preventDefault()
        const resposta = await api.post('/login', { usuario, senha })

        if(!resposta.data.sucesso) {
            alert('Login ou senha inválidos')
            setUsuario('')
            setSenha('')
        } else {
            console.log(resposta)
            localStorage.setItem("user_id", resposta.data.user_id)
            history.push('/calendario')
        }
    }

    return(
        <>
            { localStorage.getItem('user_id') === '' ? (

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
            ) : history.push('/calendario') }
        </>
  );
}