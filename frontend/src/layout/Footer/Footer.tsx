import './Footer.css';
import instagramIconWhite from '../../../public/icons/instagram-white.png';
import githubIconWhite from '../../../public/icons/github-white.png';
import linkedinIconWhite from '../../../public/icons/linkedin-white.png';
import edenLogo from '../../../public/logo/logo-inverted-removebg.png'

export function Footer(){
    return (
        <div className="bg-black">
            <div className="flex flex-col gap-10 px-6 py-10 lg:flex-row lg:justify-center lg:items-center">
                <div className="flex gap-10 lg:flex-row lg:w-full lg:h-full lg:gap-20 lg:ml-10">
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
                            <li><a href="#">Perguntas Frenqunte</a></li>
                        </ul>
                    </div>
                </div>


                <div className="flex flex-col items-start gap-6 lg:items-start lg:w-auto lg:m-20">
                    <div>
                        <h2 className="footer-h2">Atendimento</h2>
                        <ul className="footer-info lg:flex lg:flex-col lg:gap-0.5 lg:mt-1">
                            <li>Sac Whatsapp: XXXX-XXXX</li>
                            <li>Segunda a Sexta - das 08:00 às 20:00</li>
                            <li>Sábado - das 08:00 às 12:00</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-white">Este projeto utiliza imagens de terceiros, podendo estar protegidas por direitos autorais. Não reivindico qualquer direito sobre elas e, caso haja solicitação, removo imediatamente.</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-white">Desenvolvido por Murilo Freitas de Souza</h2>
                        <ul className="flex gap-4 mt-2">
                            <li><a href="https://github.com/murilofsouzaa" target="on_blank"><img src={githubIconWhite} alt="email-icon" className="footer-icon"/></a></li>
                            <li><a href="https://www.instagram.com/murilofsouza_/" target="on_blank"><img src={instagramIconWhite} alt="instagram-icon" className="footer-icon"/></a></li>
                            <li><a href="https://www.linkedin.com/in/murilofsouzaa/?locale=en_US" target="on_blank"><img src={linkedinIconWhite} alt="linkedin-icon" className="footer-icon"/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-5"><img src={edenLogo} className="w-10 h-10"></img></div>
        </div>
    )
}