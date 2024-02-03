import React, { useState } from "react";
import "../Components/Busca.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Busca() {
  const [searchResults, setSearchResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const search = () => {
    console.log("Realizar pesquisa...");
    const cepInput = document.getElementById("searchInput").value;

    // Função para buscar informações de uma cidade através do CEP
    function buscarCidadePorCEP(cep) {
      // Construa a URL da API do ViaCEP
      var url = `https://viacep.com.br/ws/${cep}/json/`;

      // Faça uma requisição HTTP utilizando XMLHttpRequest ou fetch
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Verifique se houve erro na consulta
          if (data.erro) {
            console.error("CEP não encontrado");
            setSearchResults(null); // Limpa os resultados em caso de erro
            setErrorMessage("CEP não encontrado. Por favor, verifique o CEP e tente novamente.");
          } else {
            // Limpa a mensagem de erro se houver resultados
            setErrorMessage(null);
            // Atualize os resultados no estado
            setSearchResults({
              cidade: data.localidade,
              estado: data.uf,
              bairro: data.bairro,
              logradouro: data.logradouro
            });
          }
        })
        .catch(error => {
          console.error("Erro na busca por CEP: " + error);
          setSearchResults(null); // Limpa os resultados em caso de erro
          setErrorMessage("Erro na busca por CEP. Por favor, tente novamente mais tarde.");
        });
    }

    // Chame a função de busca com o CEP fornecido pelo usuário
    buscarCidadePorCEP(cepInput);
  };

  return (
    <>
      <div className="pesquisar">
        <div className="search-container">
          <input type="text" id="searchInput" placeholder="Digite o cep..."></input>
          <button onClick={search}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div id="searchResults">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {searchResults && (
          <div>
            <p>Cidade: {searchResults.cidade}</p>
            <p>Estado: {searchResults.estado}</p>
            <p>Bairro: {searchResults.bairro}</p>
            <p>Logradouro: {searchResults.logradouro}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Busca;
