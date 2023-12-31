import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TelaHome from './telas/TelaHome';
import TelaConsulta from './telas/TelaConsulta';
import TelaContato from './telas/TelaContato';
import TelaNovoEvento from './telas/TelaNovoEvento';
import TelaCadastroIntegrante from './telas/TelaCadastroIntegrante';
import TelaCadastroMusica from './telas/TelaCadastroMusica';
import TelaCadastroFuncao from './telas/TelaCadastroFuncao';
import TelaCadastroMaterial from './telas/TelaCadastroMaterial';
import TelaCadastroCategoriaMaterial from './telas/TelaCadastroCategoriaMaterial';
import TelaLogin from './telas/loginPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<TelaLogin/>}/>
          <Route path='/home' exact element={<TelaHome/>}/>
          <Route path='/integrantes' exact element={<TelaCadastroIntegrante/>}/>
          <Route path='/funcoes' exact element={<TelaCadastroFuncao/>}/>
          <Route path='/musicas' exact element={<TelaCadastroMusica/>}/>
          <Route path='/materiais' exact element={<TelaCadastroMaterial/>}/>
          <Route path='/categoriamateriais' exact element={<TelaCadastroCategoriaMaterial/>}/>
          <Route path='/contato' exact element={<TelaContato/>}/>
          <Route path='/consultas' exact element={<TelaConsulta/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
