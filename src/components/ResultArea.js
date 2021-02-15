import React, { useEffect } from 'react';
import Log from "../components/Log";
import { getTotal } from "../helpers";

function ResultArea({finished, logEnd, logList, go, currentExerciseNb, setPause, setLogList, setFinished, setCurrentExerciseNb}) {

    const logShow = () => {
		return (
			<div className="output" ref={logEnd}>
				{logList.map((log, index) => {
					return <Log key={index+"log"} type={log.type}>{log.children}</Log>;
				})}
			</div>
		);
	};

    const nextExercise = () => {
        if(getTotal() === currentExerciseNb) alert("fini!")
        else{
            setCurrentExerciseNb(currentExerciseNb+1)
            setPause(false)
            setLogList([])
            setFinished(false)
        }
    }

    const handleClickButton = () => {
        if(finished) nextExercise()
        else go()
    }

    const scrollToBottom = () => {
        if(logEnd && logEnd.scrollIntoView)
        logEnd.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
		scrollToBottom()
	}, [logList]);

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