import {useState} from 'react'
import {Link} from 'react-router-dom'
import edenLogo from '../../../public/logo/logo.png'
import {Eye, EyeClosed} from 'lucide-react'


const LoginPage = () => {
    const [active, setActive] = useState(false)

    return ( 
        <div className="flex flex-col justify-center items-center h-screen"> 
            <Link to="/"><img src={edenLogo} alt="Eden" className="h-22 w-auto mb-10" /></Link>
            <div className="flex flex-col justify-center items-center">   
                <h2 className=" text-2xl font-bold">EDEN LOGIN</h2>
                <p className="text-sm text-black/70 mb-5 mt-1">Compre seus estilos e treine conosco.</p>

                <form className="flex flex-col gap-5">
                    <input type="text" name="email" id="email" placeholder="Email*"
                    className="outline-0 border border-black/30 py-3 px-4"/>
                    <div>
                        <div className="flex border border-black/30 py-3 px-6">
                            <input type="password" id="password" className="outline-0" placeholder="Senha*"/>
                            <button type="button" className="flex justify-center items-center hover:cursor-pointer"
                            onClick={() => setActive((prev) => !prev)}>
                                {active == true ? (
                                    <EyeClosed className="text-black/40 h-5 w-auto hover:text-black/60"></EyeClosed>
                                ) : (
                                    <Eye className="text-black/40 h-5 w-auto hover:text-black/60"></Eye>
                                )}
                            </button>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default LoginPage;