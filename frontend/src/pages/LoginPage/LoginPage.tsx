import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edenLogo from '../../../public/logo/logo.png';
import { Eye, EyeClosed } from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';
import { useCart } from '../../context/CartContext';

type LoginPageProps = {
    email: string;
    password:  string;
};

interface JwtAuthenticationResponse {
    accessToken: string;
    tokenType: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { fetchCart } = useCart();

    useEffect(() => {
        document.title = "Log In | Eden";
    }, []);

    const [active, setActive] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const [formData, setFormData] = useState<LoginPageProps>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await api.post<JwtAuthenticationResponse>('/auth/signin', {
                username: formData.email,
                password: formData.password,
            });

            localStorage.setItem('token', response.data.accessToken);
            await fetchCart();
            // notify UI about auth change (Header listens for this event)
            window.dispatchEvent(new Event('authChanged'));
            toast.success('Login efetuado com sucesso!');
            navigate('/');
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'response' in err) {
                const serverMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message;
                setError(serverMessage || 'Email ou senha inválidos.');
            } else {
                setError('Ocorreu um erro inesperado.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return ( 
        <div className="flex flex-col justify-center items-center h-screen"> 
            <Link to="/"><img src={edenLogo} alt="Eden" className="h-22 w-auto" /></Link>
            <div className="flex flex-col justify-center items-center">   
                <h2 className=" text-2xl font-bold m-5">EDEN LOGIN</h2>
                <p className="text-sm font-sans text-black/70 mb-5 w-[80%] text-center">Compre seus estilos, sinta-se confiante e treine conosco.</p>

                {error && <p className="text-red-500 text-sm mb-4 font-bold">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        className="outline-0 border border-black/10 py-3 px-4"
                        required
                    />
                    <div>
                        <div className="flex border border-black/10">
                            <input 
                                type={active ? `text` : `password`} 
                                name="password"
                                id="password" 
                                value={formData.password}
                                onChange={handleChange}
                                className="outline-0 py-3 px-6" 
                                placeholder="Senha*"
                                required
                            />
                            <button type="button" onClick={() => setActive((prev) => !prev)}
                            className="flex justify-center items-center py-3 px-6 hover:cursor-pointer hover:bg-gray-100">
                                {active === true ? (
                                    <Eye className="text-black/40 h-5 w-auto hover:text-black/60"></Eye>
                                ) : (
                                    <EyeClosed className="text-black/40 h-5 w-auto hover:text-black/60"></EyeClosed>
                                )}
                            </button>
                        </div> 
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button type="button" className="text-sm underline font-bold hover:cursor-pointer">Esqueceu a senha?</button>
                        <button type="submit" disabled={isSubmitting} className="m-5 text-md font-bold text-white bg-black rounded-4xl py-3 w-full
                        cursor-pointer active:scale-[0.97] transition-all disabled:cursor-not-allowed disabled:opacity-70">
                            {isSubmitting ? 'ENTRANDO...' : 'LOGIN'}
                        </button>
                        <p className="text-sm text-black/80">Não possui conta? <Link to="/u/signup"><span className="font-bold text-sm text-black hover:cursor-pointer hover:underline">Criar Conta</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default LoginPage;