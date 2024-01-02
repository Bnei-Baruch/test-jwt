import React, { Component, Fragment } from 'react';
import {Button} from "semantic-ui-react";
import LoginPage from './LoginPage';
import {kc} from "./UserManager";
import mqtt from "./mqtt";

class JwtClient extends Component {

    state = {
        pass: false,
        user: null,
        roles: [],
    };

    checkPermission = (user) => {
        const trl_public = kc.hasRealmRole("bb_user");
        if(trl_public) {
            this.setState({user, roles: user.roles});
            this.initMQTT(user);
        } else {
            alert("Access denied!");
            kc.logout();
        }
    };

    initMQTT = (user) => {
        mqtt.init(user, (data) => {
            console.log("[mqtt] init: ", data, user);
            mqtt.join("janus/gxy5/to-janus");
            mqtt.watch((message) => {
                //this.handleMessage(message);
            });
        });
    };

    sendMessage = () => {
        let msg = {type: "test", text: "content"};
        mqtt.send(JSON.stringify(msg), false, "test/in");
    }

    render() {

        const {user, roles} = this.state;

        let opt = roles.map((role,i) => {
            if(role === "bb_user") {
                return (
                    <Button key={i} size='massive' color='green' onClick={this.sendMessage} >
                        Message
                    </Button>);
            }
            return null
        });

        return (
            <Fragment>
                <LoginPage user={user} enter={opt} checkPermission={this.checkPermission} />
            </Fragment>

        );
    }
}

export default JwtClient;
