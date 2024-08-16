import { useState } from 'react';
import './App.css';

function App() {
    // Estados para armazenar os valores dos inputs e os resultados da API
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [error, setError] = useState(null);

    // Função chamada quando o botão é clicado
    const handleClick = async () => {
        setError(null);

        try {
            // Função para buscar dados de um CEP
            const fetchData = async (cep) => {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const result = await response.json();
                if (result.erro) {
                    throw new Error('CEP não encontrado');
                }
                return result;
            };

            // Buscar dados usando o valor do input1
            const result = await fetchData(input1);

            // Preencher os outros inputs com os dados do resultado
            setInput2(result.logradouro || '');
            setInput3(result.bairro || '');
            setInput4(result.localidade || '');
            setInput5(result.uf || '');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>Busca com CEP</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="input1">CEP:</label>
                    <input
                        id="input1"
                        type="text"
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                        placeholder="Digite o CEP"
                        maxLength="8"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="input2">Logradouro:</label>
                    <input
                        id="input2"
                        type="text"
                        value={input2}
                        onChange={(e) => setInput2(e.target.value)}
                        placeholder="Logradouro"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="input3">Bairro:</label>
                    <input
                        id="input3"
                        type="text"
                        value={input3}
                        onChange={(e) => setInput3(e.target.value)}
                        placeholder="Bairro"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="input4">Cidade:</label>
                    <input
                        id="input4"
                        type="text"
                        value={input4}
                        onChange={(e) => setInput4(e.target.value)}
                        placeholder="Cidade"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="input5">UF:</label>
                    <input
                        id="input5"
                        type="text"
                        value={input5}
                        onChange={(e) => setInput5(e.target.value)}
                        placeholder="UF"
                        readOnly
                    />
                </div>
                <button type="button" onClick={handleClick}>
                    Buscar Dados do CEP
                </button>
            </form>

            {/* Exibir mensagens de erro */}
            {error && <p className="error">Error: {error}</p>}
        </div>
    );
}

export default App;
