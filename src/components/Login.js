import { useState , useEffect, useContext} from "react";
import dotenv from "dotenv";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/userContext';
dotenv.config();

function LoginPage(){
    const navigate = useNavigate();
    const [dados, setDados] = useState({email:'', password: ''});
    const [carregando, setCarregando] = useState({
        loading: false,
        className: ''
    });
   
    const {user, setUser} = useContext(UserContext);

    const login = (e) => {
        e.preventDefault();

        setCarregando({
            ...carregando,
            loading: true,
            className: 'inputDesabilitado'
        });

        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up`;

        axios.post(URL, {email: dados.email, password: dados.password} ).then((response) => {
            localStorage.setItem('userdata', JSON.stringify({
                name: response.data.name,
                token: response.data.token
            })
            );
            const {data} = response;
            setUser({
                ...user,
                name: data.name,
                token: data.token
            });
            setCarregando({
                ...carregando,
                loading: false,
                className: ''
            });
            navigate('/registros')
        }).catch((erro)=>{
            console.log({message: 'erro no login'})
            setCarregando({
                ...carregando,
                loading: false,
                className: ''
            });
        });  
    }

    return(
        <LoginContainer>
            <h1>MyWallet</h1>
            <Form onSubmit={login}>
                <input
                    type="email"
                    disabled={carregando.loading}
                    className={carregando.className}
                    placeholder="E-mail"
                    required value={dados.email}
                    onChange={(e) => setDados({...dados, email: e.target.value})}
                />
                <input
                    type="password"
                    disabled={carregando.loading}
                    className={carregando.className}
                    placeholder="senha"
                    required value={dados.password}
                    onChange={(e) => setDados({...dados, password: e.target.value})}
                />

                {carregando.loading === false ? (
                    <button type="submit">Entrar</button>
                ): (
                    <button type="button" disabled>
                        <ThreeDots
                            color="rgba(255, 255, 255, 1)"
                            height={13}
                            width={51}
                        />
                    </button>
                )}
            </Form>
            <Link to="/">
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    h1 {
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #ffffff;
        margin-top: 160px;
        margin-bottom: 37px;
        text-align: center;
    }
    p {
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
        font-style: normal;
        text-align: center;
        margin-top: 36px;
    }
`;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    padding-left: 15px;
    margin-bottom: 13px;
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    &:focus {
        outline: none;
    }
    &::placeholder {
        font-style: regular;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    }
}
input:focus::placeholder {
    color: transparent;
}
.inputDesabilitado {
    background-color: rgba(212, 212, 212, 1);
    color: rgba(175, 175, 175, 1);
}
button {
    width: 326px;
    height: 46px;
    background-color: #a328d6;
    color: #ffffff;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
    border: 1px solid #a328d6;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

export default LoginPage;