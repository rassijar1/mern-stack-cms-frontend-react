import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import './App.css';

/*=============================================
Componentes Login
=============================================*/

import Login from './components/login/Login';

/*=============================================
Componentes fijos
=============================================*/


import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';


/*=============================================
Componentes dinamicos
=============================================*/
import Slide from './components/contents/slide/Slide';
import Administradores from './components/contents/administradores/Administradores';
import Articulos from './components/contents/articulos/Articulos';
import Galeria from './components/contents/galeria/Galeria';
import Usuarios from './components/contents/usuarios/Usuarios';
import Error404 from './components/contents/error404/Error404';





export default function App() {

const auth=getAccessToken();
// const auth=false;

if (!auth) {

return (

<Login/>

  )

}



  return (


    <div className="sidebar-mini">

    <div className="wrapper">

    <Header/>
    <Sidebar/>

    <BrowserRouter>

    <Routes>

    <Route exact path="/" element={ <Administradores />} />
     <Route exact path="/slide"  element={ <Slide />} />
     <Route exact path="/galeria"  element={ <Galeria />}/>
      <Route exact path="/articulos"  element={ <Articulos />} />
       <Route exact path="/usuarios"  element={ <Usuarios />} />
        <Route exact path='*'  element={ <Error404 />} />


    </Routes>

    </BrowserRouter>


    <Footer/>

    </div>


    </div>
  );
}




/*=============================================
Funcion para tener acceso al token
=============================================*/

const getAccessToken=()=>{

const accessToken= localStorage.getItem("ACCESS_TOKEN");
const id= localStorage.getItem("ID");
const usuario=localStorage.getItem("USUARIO");

if(!accessToken || accessToken === null ||
  !id || id === null ||
  !usuario || usuario === null){



return false;


}


const metaToken= jwtDecode(accessToken);
if (!metaToken.data) {

  return false;




}
//console.log("metaToken", metaToken);

if (tokenExpira(accessToken, metaToken) || metaToken.data._id!== id || metaToken.data.usuario!== usuario ) {

  return false;

}else{

return true;

}



}




/*=============================================
Funcion para verificar fecha expiracion
=============================================*/


const tokenExpira=(accessToken, metaToken)=>{

const seconds = 60;

const { exp } = metaToken;
//console.log("exp", exp);

//const expCaducado= exp/2000;
//console.log("expCaducado", expCaducado);

const now =(Date.now()+seconds)/1000;
//console.log("now", now);

return exp < now;

}











