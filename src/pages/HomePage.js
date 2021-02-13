import React from "react";
import logo from "../assets/youcant.png";
import { useHistory } from "react-router-dom";

export default function HomePage() {
    const history = useHistory();

	const startGame = () => {
        history.push("/game")
    };

	return (
		<div className="mainContainer">
			<img src={logo} className="App-logo" alt="logo" />
			<h2 className="App-subtitle">
				Five functions to fill. One ticking clock.{" "}
				<b>How fast can you code?</b>
			</h2>
			<button className="launch_btn" onClick={startGame}>Start the game</button>
		</div>
	);
}
