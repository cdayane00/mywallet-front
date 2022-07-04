import { useState , useEffect} from "react";
import dotenv from "dotenv";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

dotenv.config();

function CadastroPage(){

    const [dados, setDados] = useState({
        name: '',
        email: '',
        password: '',
        confirmaPassword: '',
        erro: false
    });

    const [botaoCadastro, setbotaoCadastro] = useState({
        desabilitado: true,
        className: 'botaoDesabilitado'
    });

    const [carregando, setcarregando] = useState({
        loading: false,
        className: ''
    });

    const navigate = useNavigate();

    const cadastrar = (e) => {
        e.preventDefault();

        setcarregando({
            ...carregando,
            loading: true,
            className: 'inputDesabilitado'
        });

        const URL = `http://localhost:5000/cadastro`;

        axios.post(URL,{
            name: dados.name,
            email: dados.email,
            password: dados.password
        }).then((response) => {
            console.log(response.data);
            setcarregando({
                ...carregando,
                loading: false,
                className: ''
            });
            navigate('/');
        }).catch((erro) => {
            console.log({message: 'Deu ruim', erro});
            setcarregando({
                ...carregando,
                loading: false,
                className: ''
            });
        });
    };

    useEffect(()=>{
        if(dados.confirmaPassword !== '' && dados.password !== dados.confirmaPassword){
            setDados({...dados, erro: true});
            setbotaoCadastro({
                ...botaoCadastro, 
                desabilitado: true,
                className: 'botaoDesabilitado'
            });
        }
        if(dados.confirmaPassword !== '' && dados === dados.confirmaPassword){
            setDados({
                ...dados,
                erro: false
            });
            setbotaoCadastro({
                ...botaoCadastro,
                desabilitado: false,
                className: ''
            });
        }
    }, [dados.confirmaPassword, dados.password]);

    return(
        <CadastroContainer>
            <h1>MyWallet</h1>
            <Form onSubmit={cadastrar}>
                <input
                    type="text"
                    disabled={carregando.loading}
                    className={carregando.className}
                    placeholder="Nome"
                    required value={dados.name}
                    onChange={(e) => setDados({...dados, name: e.target.value})}
                />
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
                    placeholder="Senha"
                    required value={dados.password}
                    onChange={(e) => setDados({...dados, password: e.target.value})}
                />
                <input
                    type="password"
                    disabled={carregando.loading}
                    className={carregando.className}
                    placeholder="Confirme a senha"
                    required value={dados.confirmaPassword}
                    onChange={(e) => setDados({...dados, confirmaPassword: e.target.value})}
                />

                {/* {dados.erro ? (
                    <span className="msg">As senhas não são iguais</span>
                ) : null} */}

                {carregando.loading === false ? (
                    <button type="submit" className={botaoCadastro.className}>
                        Cadastrar
                    </button>
                ) : (
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
            <p>já tem conta? Entre agora!</p>
            </Link>
        </CadastroContainer>
    )

}

const CadastroContainer =  styled.div`
    h1 {
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #ffffff;
        margin-top: 95px;
        margin-bottom: 42px;
        text-align: center;
    }
    p {
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
        font-style: normal;
        text-align: center;
        margin-top: 32px;
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

button {
    width: 326px;
    height: 46px;
    background-color: rgb(163, 40, 214);
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

.botaoDesabilitado {
    background-color: rgba(93, 93, 94, 0.5);
}

.inputDesabilitado {
    background-color: rgba(212, 212, 212, 1);
    color: rgba(175, 175, 175, 1);
}

.msg {
    color: #ffffff;
    margin-bottom: 13px;
}
`;

export default CadastroPage;