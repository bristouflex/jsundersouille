import React, { useEffect } from "react";
import logo from "../assets/youcant.png";

export default function Banner({minutes, seconds, pause, setMinutes, setSeconds}) {

    useEffect(() => {
        let interval;
        if(!pause){
            interval = setInterval(() => {
                if(!pause)
                setSeconds((seconds) => seconds + 1);

            }, 1000);
        }
        else clearInterval(interval)

		return () => clearInterval(interval);
	}, [pause]);

	useEffect(() => {
		if (seconds + 1 === 60) {
			setSeconds(0);
			setMinutes((minutes) => minutes + 1);
		}
	}, [seconds]);

	return (
		<div className="banner">
			<img src={logo} className="game-logo" alt="logo" />
			<div className="banner-right">
				<span className="clock">
					{minutes}:{seconds / 10 >= 1 ? seconds : "0" + seconds}
				</span>
				<div>
					<button className="btn_banner">Tweet your progess</button>
					<button className="btn_banner">Share on Facebook</button>
				</div>
			</div>
		</div>
	);
}
