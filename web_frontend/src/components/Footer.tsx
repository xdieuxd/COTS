import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div className="flex items-center justify-center flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white 
                    border-t border-gray-300 dark:border-gray-700 
                    shadow-[0_-2px_6px_rgba(0,0,0,0.2)] 
                    text-lg">
            <div className="p-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faCopyright} />
                <span>2025 BookNest All rights reserved</span>
            </div>
            <div className="flex gap-2 text-2xl mb-2">
                <a href="#" className="hover:scale-120 transition-all duration-300">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" className="hover:scale-120 transition-all duration-300">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#" className="hover:scale-120 transition-all duration-300">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
        </div>
    );
}


export default Footer;