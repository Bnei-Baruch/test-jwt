import React, { Component } from 'react';
import { Container, Message, Button, Dropdown, List } from 'semantic-ui-react';
import {getData} from "./tools";
import {language_options, WEB_URL} from "./consts";

class DemuxFiles extends Component {

    state = {
        disabled: false,
        loading: false,
        files: [],
        language: "",
        video: "nhd"
    };

    componentDidMount() {
        this.getFiles();
    };

    getFiles = () => {
        getData(`${WEB_URL}/rest/files/list`, files => {
            this.setState({files})
        })
    };

    selectLanguage = (language) => {
        this.setState({language});
    };

    startRemux = () => {
        const {video, language} = this.state;
        if(language === "") return

        getData(`${WEB_URL}/rest/${video}/remux/${language}?file=multi.mp4`, data => {
            console.log(data)
        })

        this.setState({disabled: true, loading: true});
        setTimeout(() => {
            this.setState({disabled: false, loading: false});
            this.getFiles();
        }, 10000)
    }


    render() {

        const {disabled, loading, files, language, video} = this.state;

        const list = files.map(file => {
            return (
                <List bulleted>
                    <List.Item as='a' onClick={() => window.open(`${WEB_URL}/rest/get/`+file, "_blank")}>{file}</List.Item>
                </List>
            )
        })

        return (
            <Container textAlign='center' >
                <br />
                <Message size='massive'>
                    {list}
                    <Dropdown
                        error={!language}
                        placeholder="Language:"
                        selection
                        options={language_options}
                        language={language}
                        onChange={(e,{value}) => this.selectLanguage(value)}
                        value={language} >
                    </Dropdown>
                    <p />
                    <Dropdown
                        error={!video}
                        placeholder="Video:"
                        selection
                        options={[
                            { key: '0', value: 'fhd', text: '1080p' },
                            { key: '1', value: 'hd', text: '720p' },
                            { key: '2', value: 'nhd', text: '360p' },
                        ]}
                        language={video}
                        onChange={(e,{value}) => this.setState({video: value})}
                        value={video} >
                    </Dropdown>
                    <p><Button color='orange' disabled={disabled} loading={loading}
                               onClick={this.startRemux}>Demux</Button></p>
                </Message>
            </Container>
        );
    }
}

export default DemuxFiles;
