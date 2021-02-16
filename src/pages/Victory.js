import "../styles/Victory.css";
import logo from "../assets/youcan.png";
import React, { useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";

function Victory(props) {
    const location = useLocation();
    const {minutes, seconds} = location.state? location.state : {minutes: "", seconds: ""};
    const history = useHistory();

    useEffect(() => {
        if(location.state === undefined)
            history.push("/")   
    })

    return (
        <div className="victory">
            <div className="imageDiv">
                <img src={logo} className="successImage" alt="logo-success" />
            </div>
            <div className="victory_message">
                {minutes} minutes, {seconds} seconds for all 5 levels. Well done
            </div>
            <div className="buttons_share">
				<button className="share">Tweet your victory</button>
				<button className="share">Share on Facebook</button>
			</div>
        </div>
    );
}

export default Victory;