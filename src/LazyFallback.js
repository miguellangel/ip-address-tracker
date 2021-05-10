import { React } from 'react';
import logo from "./logo.svg";

const LazyFallback = () => {
    return (
        <div className="fallbackContainer">
            <img src={logo} className="App-logo" alt="ip-address-lookup-logo" />
            <p>Just a sec ...</p>
        </div>
    )
}

export default LazyFallback;