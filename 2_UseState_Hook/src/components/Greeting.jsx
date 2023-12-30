// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";

function Greeting() {
    const [greeting, setGreeting] = useState(0);

    const handleChange = (event) => {
        setGreeting(event.target.value);
    };

    return (
        <div>
             <hr />
            <h1 className= "mt-10">Greeting</h1>
            <Input value={greeting} onChange={handleChange}/>
            <Button label="Toggle" text= {greeting || "Bir Sayı Yok"}/>
        </div>
    );
}


const Button = ({label, text}) => {

    const [isShow, setShow] = useState(true);

    const handleToggle = () => {
        setShow(!isShow);
    };

    return (
        <div>
            <button className = "buttonStyle" onClick={handleToggle} type="button">
                {label}
            </button>
            {isShow && <Welcome text={text}/>}
        </div>
    );
}

const Welcome = ({text}) => {
    return <p className="mt-5 mb-7">Sonuç: {text}</p>;
}

const Input = ({value, onChange}) => {
    return (
        <input className= "inputStyle" type="text" value={value} onChange={onChange}/>
    );
}


export default Greeting;
