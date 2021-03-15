import "./app.css"
import React from "react";

export default class AppHeader extends React.Component {
    render() {
        return (
            <div className="AppHeader">
                <h1>SUFST Amazing Web App of Doom</h1> 
                <hr></hr>
                <p> SUFST Amazing Web App of Doom is licensed under the GNU General Public License v3.0. </p>
                <hr></hr>
            </div>
        );
    }
}