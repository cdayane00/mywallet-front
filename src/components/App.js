import react, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import EstiloGlobal from '../estilos/estiloGlobal';
import UserContext from '../contexts/userContext';
import CadastroPage from './Cadastro';
import LoginPage from './Login';
import RegistroPage from './Registro';
import RegistrosPage from './Registros';

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
                <Route path='/cadastro' element={<CadastroPage />}/>
                <Route path='/' element={<LoginPage />}/>
                <Route path='/registros' element={<RegistrosPage />}/>
                <Route path='/registro/:typeRegistro' element={<RegistroPage />}/>
            </Routes>
        </UserContext.Provider>
    );
}

export default App;