import React, { Component } from 'react';
import {Container} from "semantic-ui-react";
import {Button, Input} from "semantic-ui-react";
import mqtt from "./mqtt";

class MqttClient extends Component {

    state = {
        pass: false,
        user: null,
        roles: [],
        topic: "",
    };

    componentDidMount() {
        this.initMQTT();
    }

    initMQTT = () => {
        mqtt.init( (data) => {
            console.log("[mqtt] init: ", data);
            mqtt.join("keycloak/events");
            mqtt.watch((message) => {
                //this.handleMessage(message);
            });
        });
    };

    sendMessage = () => {
        let msg = {text: "Group to day is you tomorrow!"};
        mqtt.send(JSON.stringify(msg), false, "test/in");
    }

    render() {

        const {topic} = this.state;

        return (
            <Container>
                <Input fluid type='text' placeholder='MQTT TOPIC...' action value={topic}
                       onChange={(v,{value}) => this.setState({topic: value})}>
                    <input />
                    <Button positive onClick={this.sendMessage}>Send</Button>
                </Input>
            </Container>

        );
    }
}

export default MqttClient;
