import { useState, useEffect } from 'react';

function Form() {
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [pwValid, setPwValid] = useState({
    lengthMin: false,
    lengthMax: false,
    letrasENumeros: false,
    especialChar: false,
    isValid: false,
  });

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  const [hidePw, setHidePw] = useState(true);

  const classPwValid = 'valid-password-check';
  const classPwInvalid = 'invalid-password-check';

  useEffect(() => {
    function verificaSenha() {
      const regex = () => {
        const lengthMin = senha.length >= 8;
        const lengthMax = senha.length <= 16;
        const letrasENumeros = /[a-zA-Z]/.test(senha) && /\d/.test(senha);
        const especialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(senha);
        const isValid = lengthMin && lengthMax && letrasENumeros && especialChar;
        return ({ lengthMin, lengthMax, letrasENumeros, especialChar, isValid }
        );
      };

      setPwValid(regex());
    }
    verificaSenha();
  }, [senha]);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function cadastrarPerfil() {
    const novoPerfil = {
      nome, login, senha, url,
    };
    setData([...data, novoPerfil]);
    toggleShowForm();
  }

  function deleteItem(e) {
    const newData = [...data];
    newData.splice(e.target.value, 1);
    setData([...newData]);
  }

  function toggleHidePw() {
    setHidePw(!hidePw);
  }

  return (
    <div>
      {!showForm && (
        <button onClick={ toggleShowForm }>Cadastrar nova senha</button>
      )}
      {showForm && (
        <>
          <label>
            Nome do serviço
            <input
              onChange={ (e) => setNome(e.target.value) }
              value={ nome }
              type="text"
            />
          </label>
          <label>
            Login
            <input
              onChange={ (e) => setLogin(e.target.value) }
              value={ login }
              type="text"
            />
          </label>
          <label>
            Senha
            <input
              value={ senha }
              onChange={ (e) => setSenha(e.target.value) }
              type="password"
            />
          </label>
          <ul>
            <li
              className={ pwValid.lengthMin
                ? classPwValid : classPwInvalid }
            >
              Possuir 8 ou mais caracteres
            </li>
            <li
              className={ pwValid.lengthMax
                ? classPwValid : classPwInvalid }
            >
              Possuir até 16 caracteres

            </li>
            <li
              className={ pwValid.letrasENumeros
                ? classPwValid : classPwInvalid }
            >
              Possuir letras e números

            </li>
            <li
              className={ pwValid.especialChar
                ? classPwValid : classPwInvalid }
            >
              Possuir algum caractere especial

            </li>
          </ul>
          <label>
            url
            <input
              value={ url }
              onChange={ (e) => setUrl(e.target.value) }
              type="text"
            />
          </label>
          <button
            onClick={ cadastrarPerfil }
            disabled={ !(nome && login && pwValid.isValid) }
          >
            Cadastrar

          </button>
          <button onClick={ toggleShowForm }>Cancelar</button>
        </>
      )}
      {data.length === 0 ? (
        <h3>nenhuma senha cadastrada</h3>
      ) : (
        <>
          <label>
            Esconder senhas
            <input
              onChange={ toggleHidePw }
              type="checkbox"
            />
          </label>
          <table>
            <thead>
              <tr>
                <th>Nome do serviço</th>
                <th>Login</th>
                <th>Senha</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={ item.nome }>
                    <td><a href={ item.url }>{item.nome}</a></td>
                    <td>{item.login}</td>
                    <td>{hidePw ? item.senha : '******'}</td>
                    <td>
                      <button
                        value={ index }
                        onClick={ deleteItem }
                        data-testid="remove-btn"
                      >
                        X
                      </button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Form;
