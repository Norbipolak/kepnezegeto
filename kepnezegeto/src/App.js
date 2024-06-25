import "./styles/style.scss";
import Gallery from './comonents/Gallery';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
library.add(
    faCircleRight, faCircleLeft
);

function App() {
    return(
        <Gallery/>
    );
}

export default App;

/*
fontos itt, hogy a sass fel legyen telepítve és majd be is kell importálni 
npm i sass 
import "./styles/style.scss";
*/
