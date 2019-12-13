import React from 'react';
import * as ROUTES from "../../Constants/routes";
import {Link} from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <div className="Navigation">
            <nav>
                <ul>
                    <li>
                        <Link style={{ textDecoration: 'none' }} to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SIGN_IN} style={{textDecoration: 'none'}}>Sign In</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;