import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import edenLogo from '../../../public/logo/logo.png'
import {Eye, EyeClosed} from 'lucide-react'


const LoginPage = () => {

    useEffect(() => {
        document.title = "Log In | Eden"
    }, [window]);

    const [active, setActive] = useState(false);
    return ( 
        <div className="flex flex-col justify-center items-center h-screen"> 
            <Link to="/"><img src={edenLogo} alt="Eden" className="h-22 w-auto" /></Link>
            <div className="flex flex-col justify-center items-center">   
                <h2 className=" text-2xl font-bold m-5">EDEN LOGIN</h2>
                <p className="text-sm font-sans text-black/70 mb-5 w-[80%] text-center">Compre seus estilos, sinta-se confiante e treine conosco.</p>

                <form className="flex flex-col gap-5">
                    <input type="text" name="email" id="email" placeholder="Email*"
                    className="outline-0 border border-black/10 py-3 px-4"/>
                    <div>
                        <div className="flex border border-black/10">
                            <input type={active ? `text` : `password`} id="password" className="outline-0 py-3 px-6" placeholder="Senha*"/>
                            <button type="button" onClick={() => setActive((prev) => !prev)}
                            className="flex justify-center items-center py-3 px-6 hover:cursor-pointer hover:bg-gray-100">
                                {active == true ? (
                                    <Eye className="text-black/40 h-5 w-auto hover:text-black/60"></Eye>
                                ) : (
                                    <EyeClosed className="text-black/40 h-5 w-auto hover:text-black/60"></EyeClosed>
                                )}
                            </button>
                        </div> 
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button type="button" className="text-sm underline font-bold hover:cursor-pointer">Esqueceu a senha?</button>
                        <button type="button" className="m-5 text-md font-bold text-white bg-black rounded-4xl py-3 w-full
                        cursor-pointer active:scale-[0.97] transition-all">LOGIN</button>
                        <p className="text-sm text-black/80">Não possui conta? <Link to="/u/signup"><span className="font-bold text-sm text-black hover:cursor-pointer hover:underline">Criar Conta</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default LoginPage;