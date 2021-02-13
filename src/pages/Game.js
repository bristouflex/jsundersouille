import "../styles/Game.css";
import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Log from "../components/Log";
import Interpreter from "js-interpreter";
import { getExercise, getTotal } from "../helpers";

function Game(props) {
	const [lineCount, setLineCount] = useState(1);
	const [code, setCode] = useState("");
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [pause, setPause] = useState(false);
	const [currentExercise, setCurrentExercise] = useState({});
	const [currentExerciseNb, setCurrentExerciseNb] = useState(1);
	const [logList, setLogList] = useState([]);
    const [finished, setFinished] = useState(false);
    const [loopError, setLoopError] = useState(false);
    let logEnd;

	const go = async () => {
		setPause(!pause);
		let error = false;
        let tmp = logList;
        try{
            for (let testCases of currentExercise.testCases) {
                let test = code;
                setLoopError(false)
                let interpreter = new Interpreter(test);
                interpreter.appendCode(currentExercise.name + "(" + testCases.case + ");")
                setTimeout(() => {
                    setLoopError(true)
                    console.log("Timeuot!!!");
                  }, 1000);
                const [value, infiniteLoop] = await safeLaunch(interpreter)
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
        }
	}

    const safeLaunch = async (myInterpreter) => { 
        if (myInterpreter.step()) {
            if(loopError){
                console.log("here")
                return [myInterpreter.value, true]
            }
            var promise = new Promise(function(resolve, reject) {
                console.log("heure", loopError)
                let time = setTimeout(() =>  
                {
                    resolve( safeLaunch(myInterpreter))
                }
                , 0);
                
            });
            return promise;
            
        }else{
            console.log("hure")
            return [myInterpreter.value, false]
        } 
    }

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

	const handleKeyUp = (e) => {
		if (e.key == "Tab") {
			e.preventDefault();
		}
		if (e.key == "Enter") {
			setLineCount(lineCount + 1);
		}
		if (e.key == "Backspace") {
			let lines = code.split("\n");
			setLineCount(lines.length);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key == "Tab") {
			e.preventDefault();
		}
	};

	const handleChange = (e) => {
		setCode(e.target.value);
	};

	const lineShow = () => {
		let arrayNumbers = [];
		for (let i = 1; i < lineCount + 1; i++) arrayNumbers.push(i);
		return (
			<div className="gutter">
				{arrayNumbers.map((nb) => (
					<div key={nb} className="gutter-cell">
						{nb}
					</div>
				))}
			</div>
		);
	};

	const logShow = () => {
		return (
			<div className="output" ref={(el) => {logEnd = el;}}>
				{logList.map((log, index) => {
					return <Log key={index+"log"} type={log.type}>{log.children}</Log>;
				})}
			</div>
		);
	};

    const scrollToBottom = () => {
        if(logEnd && logEnd.scrollIntoView)
        logEnd.scrollIntoView({ behavior: "smooth" });
    }

	useEffect(() => {
		setCurrentExercise(getExercise(currentExerciseNb));
	}, [currentExerciseNb]);

	useEffect(() => {
		scrollToBottom()
	}, [logList]);

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
			<div className="codeArea">
				{lineShow()}
				<textarea
					onChange={handleChange}
					value={code}
					className="text_input"
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}></textarea>
			</div>
			<div className="resultArea">
				<button className="go" onClick={handleClickButton}>
					Go
				</button>
                {logShow()}
			</div>
		</div>
	);
}

export default Game;
