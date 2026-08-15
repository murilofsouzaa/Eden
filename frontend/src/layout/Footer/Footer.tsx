import './Footer.css';
import instagramIconWhite from '../../../public/icons/instagram-white.png';
import githubIconWhite from '../../../public/icons/github-white.png';
import linkedinIconWhite from '../../../public/icons/linkedin-white.png';
import emailIconWhite from '../../../public/icons/email-white.png';
import edenLogo from '../../../public/logo/logo-inverted-removebg.png';

export function Footer() {
    return (
        <div className="bg-black ">
            <div className="flex flex-col gap-10 px-6 py-10 lg:flex-row lg:justify-between lg:items-center lg:py-10 lg:px-20">
                
                <div className="flex gap-10 lg:flex-row lg:gap-20">
                    <div>
                        <h2 className="footer-h2">Coisas Chatas</h2>
                        <ul className="footer-info lg:flex lg:flex-col lg:gap-0.5 lg:mt-1">
                            <li><a href="#">Políticas de Entrega</a></li>
                            <li><a href="#">Políticas de Pagamento</a></li>
                            <li><a href="#">Políticas de Privacidade</a></li>
                            <li><a href="#">Políticas de Trocas e Devoluções</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="footer-h2">Central de Atendimento</h2>
                        <ul className="footer-info lg:flex lg:flex-col lg:gap-0.5 lg:mt-1">
                            <li><a href="#">Sobre o Eden</a></li>
                            <li><a href="#">Cuidados com Produtos</a></li>
                            <li><a href="#">Perguntas Frequentes</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1 lg:max-w-lg">
                    <div>
                        <h2 className="footer-h2">Atendimento</h2>
                        <ul className="footer-info lg:flex lg:flex-col lg:gap-0.5 lg:mt-1">
                            <li>Sac Whatsapp: XXXX-XXXX</li>
                            <li>Segunda a Sexta - das 08:00 às 20:00</li>
                            <li>Sábado - das 08:00 às 12:00</li>
                        </ul>
                    </div>

                    <div className="my-6">
                        <h2 className="font-bold text-white">Desenvolvido por Murilo Freitas de Souza</h2>
                        <ul className="flex gap-4 mt-2">
                            <li>
                                <a href="https://github.com/murilofsouzaa" target="_blank" rel="noopener noreferrer">
                                    <img src={githubIconWhite} alt="GitHub" className="footer-icon" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/murilofsouza_/" target="_blank" rel="noopener noreferrer">
                                    <img src={instagramIconWhite} alt="Instagram" className="footer-icon" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/murilofsouzaa/?locale=en_US" target="_blank" rel="noopener noreferrer">
                                    <img src={linkedinIconWhite} alt="LinkedIn" className="footer-icon" />
                                </a>
                            </li>
                            <li>
                                <a href="mailto:seu-email@exemplo.com" target="_blank" rel="noopener noreferrer">
                                    <img src={emailIconWhite} alt="Email" className="footer-icon" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-white text-sm text-justify">
                            Não detenho os direitos autorais sobre as imagens utilizadas neste conteúdo. Todos os direitos pertencem aos seus respectivos proprietários. Este material é utilizado apenas para fins educativos. Se você é o proprietário dos direitos e deseja a sua remoção, entre em contato via email que o conteúdo será removido imediatamente.
                        </p>
                    </div>
                </div>

            </div>

            <div className="flex justify-center pb-6">
                <img src={edenLogo} alt="Eden Logo" className="w-10 h-10" />
            </div>
        </div>
    );
}