import "../styles/Game.css";
import React, { useState, useEffect } from "react";
import Interpreter from "js-interpreter";
import { getExercise, getTotal } from "../helpers";
import { useHistory } from "react-router-dom";

import Banner from "../components/Banner";
import CodeArea from "../components/CodeArea";
import ResultArea from "../components/ResultArea";

function Game(props) {
	const [code, setCode] = useState("");
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [pause, setPause] = useState(false);
	const [lineCount, setLineCount] = useState(1);
	const [currentExercise, setCurrentExercise] = useState({});
	const [currentExerciseNb, setCurrentExerciseNb] = useState(1);
	const [logList, setLogList] = useState([]);
    const [finished, setFinished] = useState(false);
    
	const history = useHistory();

	const go = () => {
		setPause(!pause);
		let error = false;
        let tmp = logList;
        try{
            for (let testCases of currentExercise.testCases) {
                let test = code;
                let interpreter = new Interpreter(test);
                interpreter.appendCode(currentExercise.name + "(" + testCases.case + ");")
                const [value, infiniteLoop] = safeLaunch(interpreter)
                tmp.push({children: 'Testing "' + currentExercise.name + "(" + testCases.case + ');"...',type: "normal" })
                setLogList(tmp);
                if (value === testCases.expected){
                    tmp.push({children: "RIGHT: " + testCases.expected + " is the right answer",type: "good" } )
                    setLogList(tmp);
                } else{
                    if(infiniteLoop){
                        tmp.push({ children: "TIMEOUT: Your code took too long to execute. There might be an infinite loop in there.", type: "error" });
                    }else{
                        tmp.push({ children: "WRONG: Got " + value + " but expected " + testCases.expected + ". Try again!", type: "error" })
                    }
                    setLogList(tmp );
                    error = true;
                    setPause(false);
                    break;
                }
            }
        }catch(err){
            error = true;
            console.log(err)
            tmp.push({ children: "ERROR: "+err.message, type: "error" })
        }
        if (!error) {
            const secondMessage = seconds / 10 >= 1 ? seconds : "0" + seconds;
            setLogList([...logList,{ children:"SUCCESS! All tests passed. You've used " +minutes +":" +secondMessage +" so far. Well done!\nClick Go or hit Ctrl-Enter/⌘-Enter to move on to level " +currentExerciseNb +1 +"!", type: "success",} ]);
            setFinished(true);
            if(getTotal() === currentExerciseNb) endgame()
        }
	}

    const endgame = () => {
        history.push({pathname:"/victory", state: {minutes: minutes, seconds: seconds}})
    }

    const nextExercise = () => {
        setCurrentExerciseNb(currentExerciseNb+1);
        setPause(false);
        setLogList([]);
        setFinished(false);
        
    }

    const handleClickButton = () => {
        if(finished) nextExercise()
        else go()
    }

	
    const safeLaunch = (myInterpreter) => { 
		let count = 0;
        while (myInterpreter.step()) {
            if(count > 1000){
                return [myInterpreter.value, true]
            }
			count += 1;
            
        }
        return [myInterpreter.value, false] 
    }


    

	useEffect(() => {
		setCurrentExercise(getExercise(currentExerciseNb));
	}, [currentExerciseNb]);

	

	useEffect(() => {
		setCode(currentExercise.content);
		if (currentExercise.content !== undefined) {
			let lines = currentExercise.content.split("\n");
			setLineCount(lines.length);
		}
	}, [currentExercise]);

	return (
		<div className="mainContainer">
			<Banner
				minutes={minutes}
				seconds={seconds}
				setMinutes={setMinutes}
				setSeconds={setSeconds}
				pause={pause}
			/>
			<CodeArea 
				code={code}
				setCode={setCode}
				lineCount={lineCount}
				setLineCount={setLineCount}
				pause={pause}
			/>
			<ResultArea				
				logList={logList}
				handleClickButton={handleClickButton}
			/>
		</div>
	);
}

export default Game;
