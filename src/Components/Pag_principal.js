import React from "react"
import "../Components/Pag_principal.css"
import Busca from "./Busca";

function Pag_principal(){
    return(
        <div className="corpo">
            <div className="container">
                <h1 className="titulo">Verificador de CEP</h1>
                <p className="descricao">Digite o cep ou o nome da cidade que deseja encontrar</p>
            </div>

            <Busca/>
        </div>

    )
}
export default Pag_principal;