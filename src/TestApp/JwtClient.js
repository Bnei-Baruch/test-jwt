import React, { Component, Fragment } from 'react';
import {Button} from "semantic-ui-react";
import LoginPage from './LoginPage';
import {kc} from "./UserManager";

class JwtClint extends Component {

    state = {
        pass: false,
        user: null,
        roles: [],
    };

    checkPermission = (user) => {
        const trl_public = kc.hasRealmRole("bb_user");
        if(trl_public) {
            this.setState({user, roles: user.roles});
        } else {
            alert("Access denied!");
            kc.logout();
        }
    };

    render() {

        const {user, roles} = this.state;

        let opt = roles.map((role,i) => {
            if(role === "bb_user") return (<Button key={i} size='massive' color='green' onClick={() => window.open("https://link","_self")} >Chat</Button>);
            if(role === "trl_user") return (<Button key={i} size='massive' color='green' onClick={() => window.open("https://link","_self")} >Translate</Button>);
            if(role === "trl_admin") return (<Button key={i} size='massive' color='green' onClick={() => window.open("https://link","_self")} >Admin</Button>);
            return false
        });

        return (
            <Fragment>
                <LoginPage user={user} enter={opt} checkPermission={this.checkPermission} />
            </Fragment>

        );
    }
}

export default JwtClint;
