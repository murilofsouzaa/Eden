import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import edenLogo from '../../../public/logo/logo.png'
import { Eye, EyeClosed } from 'lucide-react'
import { DatePicker, registerLocale } from  "react-datepicker";
import {ptBR} from 'date-fns/locale/pt-BR';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('pt-BR', ptBR);

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    useEffect(() => {
            document.title = "Cadastro | Eden"
        }, [window]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            <Link to="/">
                <img src={edenLogo} alt="Eden" className="h-20 w-auto mb-4" />
            </Link>
            
            <div className="flex flex-col justify-center items-center w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2">EDEN CADASTRO</h2>
                <p className="text-sm font-sans text-black/70 mb-8 w-[80%] text-center">
                    Crie sua conta fácil e rápido.
                </p>

                <form className="flex flex-col gap-4 w-full">
                    <div className="border border-black/10 py-3 px-4 focus-within:border-black transition-colors">
                        <input type="text" name="name" id="name" placeholder="Nome*" className="outline-0 w-full" />
                    </div>

                    <div className="border border-black/10 py-3 px-4 focus-within:border-black transition-colors">
                        <input type="text" name="lastName" id="lastName" placeholder="Sobrenome*" className="outline-0 w-full" />
                    </div>

                    <div className="border border-black/10 py-3 px-4 focus-within:border-black transition-colors">
                        <DatePicker
                            selected={birthDate}
                            onChange={(date:Date | null) => setBirthDate(date)}
                            locale="pt-BR"
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={new Date()}
                            placeholderText="Data de Nascimento*"
                            className="outline-0 w-full bg-transparent cursor-pointer"
                            wrapperClassName="w-full"
                        />
                    </div>

                    <div className="border border-black/10 py-3 px-4 focus-within:border-black transition-colors">
                        <input type="email" name="email" id="email" placeholder="Email*" className="outline-0 w-full" />
                    </div>

                    <div className="flex border border-black/10 focus-within:border-black transition-colors">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            className="outline-0 py-3 px-4 flex-1" 
                            placeholder="Senha*" 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex justify-center items-center px-4 hover:bg-gray-50 transition-colors"
                        >
                            {showPassword ? (
                                <Eye size={20} className="text-black/40" />
                            ) : (
                                <EyeClosed size={20} className="text-black/40" />
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-4">
                        <button type="submit" className="text-md font-bold text-white bg-black rounded-full py-3.5 w-full
                        cursor-pointer active:scale-[0.97] hover:bg-black/90 transition-all shadow-lg">
                            CRIAR CONTA
                        </button>
                        
                        <p className="text-sm text-black/80 mt-6">
                            Já possui conta? 
                            <Link to="/u/login">
                                <span className="font-bold ml-1 hover:underline cursor-pointer">Entrar</span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;