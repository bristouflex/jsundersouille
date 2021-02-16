import React, { useEffect } from 'react';
import Log from "../components/Log";
import { animateScroll } from "react-scroll"


function ResultArea( { logList, handleClickButton}) {


	const scrollToBottom = () => {
        animateScroll.scrollToBottom({
			containerId: "logEnd"
		});
    }

    useEffect(() => {
		
		scrollToBottom()
	}, [logList]);

    const logShow = () => {
		return (
			<div className="output" id="logEnd">
				{logList.map((log, index) => {
					return <Log key={index+"log"} type={log.type}>{log.children}</Log>;
				})}
			</div>
		);
	};

    return (
        <div className="resultArea">
				<button className="go" onClick={handleClickButton}>
					Go
				</button>
                {logShow()}
		</div>
    );
}

export default ResultArea;