import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import isEmail from "validator/es/lib/isEmail.js";
import Spinner from "../../components/Spinner.jsx";

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const handleRegister = async (e) => {
    e.preventDefault();
    let formErros = false;
    if (nome.length === 0 || email.length === 0 || senha.length === 0 || confirmarSenha.length === 0) {
      formErros = true
      MySwal.fire({
        icon: "error",
        title: "Campos vazios",
        text: "Preencha os campos."
      });
    }
    if (nome.length < 3) {
      formErros = true;
      MySwal.fire({
        icon: 'error',
        title: "Nome inválido",
        text: "Nome precisa ter mais de 3 caracteres."
      });
    }
    if (!isEmail(email)) {
      formErros = true;
      MySwal.fire({
        icon: 'error',
        title: "Email inválido",
        text: "Insira um email válido."
      });
    }

    if (senha !== confirmarSenha) {
      formErros = true;
      MySwal.fire({
        icon: 'error',
        title: "Senha inválida",
        text: "Senhas não coincidem"
      });
    }
    if (formErros) return;
    try {
      setIsLoading(true)
      await axios.post('http://localhost:5000/api/users', {
        username: nome,
        email,
        password: senha
      });
      setIsLoading(false)
      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Usuário criado com sucesso."
        });
      navigate('/login');
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao cadastrar");
      MySwal.fire({
        icon: "error",
        title: "Erro",
        text: erro
      })
      setIsLoading(false)
    }
  }

  if (isLoading) return <Spinner/>

  return (
    <div>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            FastSnack
          </a>
          <div
            className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Crie sua conta
              </h1>
              <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="nome"
                         className="block mb-2 text-sm font-medium text-gray-900 ">Nome:</label>
                  <input type="text"
                         value={nome}
                         onChange={(e) => setNome(e.target.value)}
                         name="nome" id="nome"
                         className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                         placeholder="Digite seu nome"
                         required=""/>
                </div>
                <div>
                  <label htmlFor="email"
                         className="block mb-2 text-sm font-medium text-gray-900 ">Email:</label>
                  <input type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         name="email" id="email"
                         className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                         placeholder="seuemail@email.com"
                         required=""/>
                </div>
                <div>
                  <label htmlFor="password"
                         className="block mb-2 text-sm font-medium text-gray-900">Senha:</label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password"
                         className="block mb-2 text-sm font-medium text-gray-900 ">Confirmar
                    senha:</label>
                  <input
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""/>
                </div>

                <button type="submit"
                        className="w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crie
                  sua conta
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Já possui uma conta? <span className="font-medium text-primary-600 hover:underline hover:text-orange-400"><Link to='/login'>Faça login</Link></span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


export default Registro;