import React, {useState} from 'react'


export default function TextForm(props) {

    const [text, setText] = useState('');
    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    
    const handleUpClick = ()=>{
        //console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Uppercase!", "success");
    }

    const handleLoClick = ()=>{
        //console.log("Lowercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lowercase!", "success");
    }

    // const handleTitleClick = ()=>{
    //     let newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    //     setText(newText)
    // }

    const handleReverseClick = () => {
        let str="";
        for (let index = text.length-1; index >=0; index--) {
          str+= text[index];
          
        }
         return setText(str);
      }

    const handleCapitalize = () => {
        let newText = text.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ");
        setText(newText);
        props.showAlert("Converted to Capitalize!", "success");
     }

    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to Clipbord!", "success");
    }   

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra space removed!", "success")
    }

    const speak = () => {
            let msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
            props.showAlert("Speaker On!", "success");
        }
        
    const handleClearClick = () => {
        let newText = '';
        setText(newText)
        props.showAlert("Cleared Textarea!", "success");
    }

    const handleOnChange = (event)=>{
        //console.log("On Change");
        setText(event.target.value);
    }
      
  return (
    <>
    <div className="container" style={{color: props.mode === 'dark'?'white':'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark'?'grey':'white',color: props.mode === 'dark'?'white':'black'}} id="myBox" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button className="btn btn-primary mx-1" onClick={handleReverseClick}>Convert to Reverse case</button>
        <button className="btn btn-primary mx-1" onClick={handleCapitalize}>Convert to Capitalize case</button>
        <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy text</button>
        <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove space</button>
        <button className="btn btn-primary mx-1" onClick={speak}>Speaker Button</button>
        <button className="btn btn-primary mx-1" onClick={handleClearClick}>Clear text</button>

    </div>
    <div className="container my-3" style={{color: props.mode === 'dark'?'white':'black'}}>
        <h2>Your text summary</h2>
        <p>{text.split(" ").length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the textbox about to preview it here"}</p>
    </div>
    </>
  )
}
