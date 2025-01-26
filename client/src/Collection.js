
/*class Collection {
    constructor() {

        const click = () => {
            alert('CLICK!');
        }

        constructor(props); {
            super(props);
            this.state = { minutes: "5", cans: "5" };
        }

        return (

            <div>
                <p style="color: green; font-size: 20px">YOU ARE CURRENTLY COLLECTING</p>

                <p>This pickup is {this.state.minutes} minutes away with {this.state.cans} cans</p>
                <button type="button" color="red" onClick={click}>ACCEPT</button>
                <button type="button" color="red" onClick={click}>DENY</button>
            </div>
        );
    }
}*/
import './style.css';

function Collection(props){
    
    return (

        <div>
            <body>
                <t>YOU ARE CURRENTLY COLLECTING</t>
                <br />
                <br />
                <br />
                <p>This pickup is {props.minutes} minutes away with {props.cans} cans</p>
                <br />
                <br />
                <br />
                <button type="button" style={{ backgroundColor: 'green', color: 'white' }} onClick={click} >ACCEPT</button>
                <br />
                <button type="button" style={{ backgroundColor: 'red', color: 'white', margin: 20}} onClick={click}>DENY</button>

            </body>
            
        </div>
    );
}

const click = () => {
    alert('CLICK!');
}

export default Collection;
