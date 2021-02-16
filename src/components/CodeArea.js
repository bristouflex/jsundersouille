import React, {useRef} from 'react';

function CodeArea({code, setCode, lineCount, setLineCount, pause}) {
    const textAreaCode = useRef() 

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

	const handleChange = (e) => {
		if(!pause)
		setCode(e.target.value);
	};

    const handleKeyUp = (e) => {
		if (e.key == "Tab") {
			e.preventDefault();
			const { selectionStart, selectionEnd } = e.target;
            const newValue = code.substring(0, selectionStart) + "    " + code.substring(selectionEnd);
            setCode(newValue);
            if (textAreaCode.current) {
              textAreaCode.current.value = newValue;
              textAreaCode.current.selectionStart = textAreaCode.current.selectionEnd = selectionStart + 4;
            }              
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
        if (e.key == "Tab")
			e.preventDefault();
    }

    return (
        <div className="codeArea">
            {lineShow()}
            <textarea
                ref={textAreaCode}
                onChange={handleChange}
                value={code}
                className="text_input"
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                ></textarea>
	    </div>
    );
}

export default CodeArea;