import react, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import EstiloGlobal from '../estilos/estiloGlobal';
import UserContext from '../contexts/userContext';
import CadastroPage from './Cadastro';
import LoginPage from './Login';

function App(){

    const [user, setUser] = useState(
        localStorage.getItem('userdata')
        ? JSON.parse(localStorage.getItem('userdata'))
        : null
    );

    return(
        <UserContext.Provider value={{user, setUser}}>
            <EstiloGlobal/>
            <Routes>
                <Route path='/' element={<CadastroPage />}/>
                <Route path='/login' element={<LoginPage />}/>
            </Routes>
        </UserContext.Provider>
    );
}

export default App;