import { FC, PropsWithChildren, useState } from "react";
import { useTimeout, useLocalStorage } from "usehooks-ts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../components/SplashScreen/index.module.css";
import { ButtonPrimary } from "../components/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";

export interface SplashScreenProps { }

const WelCome: FC<PropsWithChildren<SplashScreenProps>> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [splash, setSplash] = useLocalStorage("splash", true);
    const [visitedLogIn, setVisitedLogIn] = useLocalStorage("visitedLogIn", false);
    const navigate = useNavigate();

    useTimeout(() => {
        setVisible(true);
        if (visitedLogIn) {
            setVisitedLogIn(true);
            // navigate("/connect/phone");
            navigate("/home");
        }
    }, 1000);

    const getStartHandler = () => {
        setSplash(false);
        setVisitedLogIn(true);
        //navigate("/connect/phone");
        navigate("/home");
    };
    if (!visible) {
        return (
            <div className="w-screen h-screen text-primaryColorText bg-primaryColor flex items-center justify-center">
                <div className="font-black text-[2.315rem] welcome-redtab">Redtab</div>
            </div>
        );
    }

    if (splash) {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        };

        return (
            <div className="w-screen h-screen text-primaryColor bg-[#B9B9B9] flex items-center justify-center">
                <div className={styles.splash}>
                    <Slider {...settings}>
                        <div className="h-screen relative">
                            <img
                                src="https://i.pinimg.com/originals/ff/22/2b/ff222b39ce362572d46bc8d90eafb76b.jpg"
                                className="w-full h-full object-cover"
                            />

                        </div>
                        <div className="h-screen relative">
                            <img
                                src="https://i.pinimg.com/564x/c8/45/27/c845271ba544a9c5196af4723ae50422.jpg"
                                className="w-full h-full object-cover "
                            />
                        </div>
                        <div className="h-screen relative">
                            <img
                                src="https://i.pinimg.com/564x/ad/c7/4f/adc74ff55d6936eb61dda2e4235431f0.jpg"
                                className="w-full h-full object-cover "
                            />
                        </div>
                    </Slider>
                    <div className="absolute bottom-0 left-0 right-0 flex items-end p-5 pt-0">
                        <ButtonPrimary className="w-full" onClick={getStartHandler}>
                            Get started
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default WelCome;
