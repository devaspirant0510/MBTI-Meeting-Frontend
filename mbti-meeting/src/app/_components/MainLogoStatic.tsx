import {motion} from "framer-motion";
import "./SplashPage.css";




const MainLogoStatic = () => {
    return <div
        className="container"
    >
        {['M', 'B', 'T', 'I'].map((index) => (
            <div key={index} className="item" >
                {index}
            </div>
        ))}
    </div>
}
export default MainLogoStatic;
