import { useState , useEffect, useContext} from "react";
import dotenv from "dotenv";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/userContext';
import dayjs from 'dayjs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';


dotenv.config();

function RegistrosPage(){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const typeRegistro = ['entrada', 'saida'];
    const [registros, setRegistros] = useState([]);
    const [total, setTotal] = useState(0);

    const getRegistros = () => {
        const URL = `http://localhost:5000/registros`;
        const {token } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get(URL, config).then((response) => {
            setRegistros(response.data);
        }).catch((erro) => {
            console.log({message: 'erro', erro});
        });
    };

    const saldo = () => {
        let total = 0;
        registros.forEach((registro) => {
            if(registro.type === 'entrada'){
                total += parseFloat(registro.value);
            }
            else{
                total -= parseFloat(registro.value);
            }
        });
        return total;
    }

    const sair = () => {
        const URL = `http://localhost:5000/sair`;
        const {token } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.post(URL, {}, config).then(() => {
            localStorage.removeItem('userdata');
            navigate('/');
        }).catch((erro) => {
            console.log(erro);
        });
    }

    useEffect(() => {
        getRegistros();
    },[]);

    useEffect(() => {
        setTotal(saldo());
    },[registros]);

    return(
        <>
            <HeaderRegistros>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine className="logout" onClick={() => sair()}/>
            </HeaderRegistros>
            <RegistrosContainer>
                <div className="values-scroll">
                    {registros.length > 0 ? (
                        registros.map((registro) => (
                            <RegistroContainer type={registro.type} key={registro._id} >
                                <div className="register-container-date-description">
                                    <span className="date">
                                        {registro.date}
                                    </span>
                                    <div className="description">
                                        <span>{registro.description}</span>
                                    </div>
                                </div>
                                <div className="register-container-value">
                                    <h2>
                                        {parseFloat(registro.value)
                                            .toFixed(2)
                                            .replace('.', ',')}
                                    </h2>
                                </div>
                            </RegistroContainer>
                        ))
                    ) : (
                        <div className="no-registers-container">
                            <p>Não há registros de entrada ou saída</p>
                        </div>
                    )}
                </div>
                {registros.length > 0 ? (
                    <Footer saldo={total}>
                        <div className="total-value">
                            <h1 className="balance">SALDO</h1>
                            <h1 className="amount">
                                R$ {total.toFixed(2).replace('.', ',')}
                            </h1>
                        </div>
                    </Footer>
                ) : (
                    <Footer />
                )}
            </RegistrosContainer>
            <NovoRegistro>
                <NovoRegistroBotao onClick={() => navigate(`/registro/${typeRegistro[0]}`)}>
                    <AiOutlinePlusCircle className="new-register-icon" />
                        <div className="new-register-text">
                            <h1>Nova Entrada</h1>
                        </div>
                </NovoRegistroBotao>
                <NovoRegistroBotao onClick={() => navigate(`/registro/${typeRegistro[1]}`)}>
                    <AiOutlineMinusCircle className="new-register-icon" />
                    <div className="new-register-text">
                        <h1>Nova Saída</h1>
                    </div>

                </NovoRegistroBotao>
            </NovoRegistro>
        </>
    );
}

const HeaderRegistros = styled.div`
display: flex;
justify-content: space-between;
margin: 28px 24px 0 24px;
h1 {
    color: #ffffff;
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
}
.logout {
    cursor: pointer;
    color: #ffffff;
    font-size: 25px;
}
`;

const RegistrosContainer = styled.header`
width: 87vw;
height: 446px;
background: #ffffff;
border-radius: 5px;
margin: 0 auto;
margin-top: 22px;
/* overflow-y: scroll; */
position: relative;
.values-scroll {
    overflow-y: scroll;
    width: 87vw;
    height: 446px;
}
.no-registers-container {
    width: 326px;
    height: 446px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}
p {
    width: 180px;
    height: 46px;
    text-align: center;
    font-style: normal;
    line-height: 23px;
    font-weight: 400;
    font-size: 20px;
    color: #868686;
}
`;

const RegistroContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 12px 0 12px;
:last-child {
    margin-bottom: 50px;
}
.register-container-value h2 {
    color: ${(props) => props.type === 'incoming' && '#03AC00'};
    color: ${(props) => props.type === 'outgoing' && '#C70000'};
}
.register-container-date-description {
    word-wrap: break-word;
    display: flex;
    .date {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #c6c6c6;
    }
    .description {
        padding-left: 10px;
    }
}
.register-container-value {
    display: flex;
    .delete-icon {
        font-size: 16px;
        color: #c6c6c6;
        margin-left: 5px;
    }
}
`;

const Footer = styled.footer`
.total-value {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: 10px 15px;
    background: #ffffff;
    margin-top: 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    .balance {
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        color: #000000;
    }
    .amount {
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        color: ${(props) => (props.balance > 0 ? '#03AC00' : '#C70000')};
    }
}
`;

const NovoRegistro = styled.div`
width: 87vw;
display: flex;
align-items: center;
margin: 0 auto;
`;

const NovoRegistroBotao = styled.div`
:first-child {
    margin-right: 10px;
}
width: 87%;
height: 87%;
background: #a328d6;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
margin-top: 12px;
.new-register-icon {
    width: 25px;
    height: 25px;
    color: #ffffff;
    margin: 8px;
}
.new-register-text {
    width: 64px;
    height: 40px;
    margin: 10px;
}
h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    color: #ffffff;
}`

export default RegistrosPage;