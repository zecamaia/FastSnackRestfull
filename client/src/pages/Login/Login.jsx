import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";

const Login = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState('')
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    let formErros = false;

    if (email.length === 0 || senha.length === 0) {
      formErros = true;
      MySwal.fire({
        icon: "error",
        title: "Campos vazios",
        text: "Preencha os campos."
      })
    }

    if (formErros) return;
    try {
      console.log("inicio request")
      setIsLoading(true)
      const response = await axios.post('http://localhost:5000/api/token', {
        email: email,
        password: senha
      });
      setIsLoading(false)
      console.log("fim request")
      const {token, role} = response.data;
      localStorage.setItem('token', token)

      navigate('/eventos')
    } catch (error) {
      console.log(error)
      setErro(error.response?.data?.erro || "Erro ao cadastrar");
      MySwal.fire({
        icon: "error",
        title: "Erro",
        text: erro
      })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }

  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div>
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
                  Faça login
                </h1>
                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
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
                  <button type="submit"
                          className="w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crie
                    sua conta
                  </button>
                  <p className="text-sm font-light text-gray-500 ">
                    Não possui uma conta? <span
                    className="font-medium text-primary-600 hover:underline hover:text-orange-400"><Link
                    to='/cadastrar'>Cadastre-se</Link></span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Login;