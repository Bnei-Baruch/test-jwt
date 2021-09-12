import React, { Component, Fragment } from 'react';
import {Button, Input} from "semantic-ui-react";
import LoginPage from './LoginPage';
import {kc} from "./UserManager";
import mqtt from "./mqtt";

class MqttClient extends Component {

    state = {
        pass: false,
        user: null,
        roles: [],
        topic: "",
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
            mqtt.join("test/in");
            mqtt.watch((message) => {
                //this.handleMessage(message);
            });
        });
    };

    sendMessage = () => {
        const {user: {id}, topic} = this.state;
        let msg = {user: {id, role: "user", display: "Test Message"}, type: "client-chat", text: "Group to day is you tomorrow!"};
        mqtt.send(JSON.stringify(msg), false, topic);
    }

    render() {

        const {user, roles, topic} = this.state;

        let opt = roles.map((role,i) => {
            if(role === "bb_user") {
                return (<Fragment>
                    <Input fluid type='text' placeholder='MQTT TOPIC...' action value={topic}
                           onChange={(v,{value}) => this.setState({topic: value})}>
                        <input />
                        <Button positive onClick={this.sendMessage}>Send</Button>
                    </Input>
                </Fragment>);
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

export default MqttClient;
