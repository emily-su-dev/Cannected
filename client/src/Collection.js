

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
                <t>COLLECTIONS</t>
                <br />
                <h1>YOU ARE CURRENTLY COLLECTING</h1>
                <br />
                <br />
                <br />
                <h2>This pickup is {props.minutes} minutes away with {props.cans} cans</h2>
                <br />
                <br />
                <br />
                <button1 type="button" onClick={click} >ACCEPT</button1>

            </body>
            
        </div>
    );
}

const click = () => {
    alert('CLICK!');
}

export default Collection;
