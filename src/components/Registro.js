import { useState , useEffect, useContext} from "react";
import dotenv from "dotenv";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/userContext';
import dayjs from 'dayjs';
import { IoMdReturnLeft } from 'react-icons/io';
dotenv.config();

function RegistroPage(){
    const navigate = useNavigate();
    const {typeRegistro} = useParams();
    const { user } = useContext(UserContext);
    const [dados, setDados] = useState({
        value: '',
        description: '',
        date: dayjs().format('DD/MM'),
        type: typeRegistro,
    });
    const [carregando, setCarregando] = useState({
        loading: false,
        className: '',
    });

    const novoRegistro = (e) => {
        e.preventDefault();

        setCarregando({
            ...carregando,
            loading: true,
            className: 'inputDesabilitado'
        });

        const {token } = user;

        const URL = `http://localhost:5000/registros`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.post(URL, dados, config).then(() => {
            setCarregando({
                ...carregando,
                loading: true,
                className: 'inputDesabilitado'
            });
            setDados({
                ...dados,
                value: '',
                description: ''
            });
            navigate('/registros');
        }).catch((erro) => {
            console.log({message: 'erro',erro})
            setCarregando({
                ...carregando,
                loading: true,
                className: 'inputDesabilitado'
            });
        });
    };

    return(
        <RegistroContainer>
            <HeaderRegistro>
                {typeRegistro === 'entrada' ? (
                    <h1>Nova Entrada</h1>
                ) : (
                    <h1>Nova Saída</h1>
                )}
                <IoMdReturnLeft
                    className="back-registers-button"
                    onClick={() => navigate('/registros')}
                />
            </HeaderRegistro>
            <Form onSubmit={novoRegistro}>
                <input
                    type="number"
                    disabled={carregando.loading}
                    className={carregando.className}
                    placeholder="Valor"
                    value={dados.value}
                    onChange={(e) => setDados({...dados, value: e.target.value})}
                />
                <input
                    type="text"
                    disabled={carregando.loading}
                    className={carregando.className}
                    placeholder="Descrição"
                    value={dados.description}
                    onChange={(e) => setDados({...dados, description: e.target.value})}
                />
                {typeRegistro === 'entrada' ? (
                    <button type="submit">
                        {carregando.loading === true ? (
                            <ThreeDots
                                color="rgba(255, 255, 255, 1)"
                                height={13}
                                width={51}
                            />
                        ) : (
                            'Salvar Entrada'
                        )}
                    </button>
                ) : (
                    <button type="submit">
                        {carregando.loading === true ? (
                            <ThreeDots
                                color="rgba(255, 255, 255, 1)"
                                height={13}
                                width={51}
                            />
                        ) : (
                            'Salvar Saída'
                        )}
                    </button>
                )}
            </Form>
        </RegistroContainer>
    )
    
}

const RegistroContainer = styled.div``;
const HeaderRegistro = styled.header`
display: flex;
justify-content: space-between;
h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
    margin: 25px 0 40px 25px;
}
.back-registers-button {
    cursor: pointer;
    color: #ffffff;
    font-size: 25px;
    margin: 25px 25px 0px 0px;
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
.input-disabled {
    background-color: rgba(212, 212, 212, 1);
    color: rgba(175, 175, 175, 1);
}
`;

export default RegistroPage;

