import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
const { ipcRenderer } = require('electron');

import Container from './bulma/layout/Container.component.jsx';
import Section from './bulma/layout/Section.component.jsx';
import Hero from './bulma/layout/hero/Hero.component.jsx';
import Form from './bulma/form/Form.component.jsx';
import Icon from './bulma/element/Icon.component.jsx';
import Button from './bulma/element/Button.component.jsx';
import Notification from './bulma/element/Notification.component.jsx';

class ChecksumValidator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'SHA256',
            filePath: '',
            fileName: '',
            checksum: '',
            checksumResult: '',
            fileHover: false,
            notificationOpen: false,
            saveChecksum: false,
            loading: false
        };
    }

    componentDidMount() {
        ipcRenderer.on('checksum-result', (event, data) => {
            this.setState(
                {
                    checksumResult: data.checksumResult,
                    match: data.match,
                    loading: false
                },
                this.openNotification()
            );
        });

        document.body.ondrop = ev => {
            console.log('ondrop');
            console.log(ev.dataTransfer.files[0].path);
            this.setState({
                filePath: ev.dataTransfer.files[0].path,
                fileName: ev.dataTransfer.files[0].name,
                fileHover: false
            });
            ev.preventDefault();
        };

        document.ondragover = document.ondrop = ev => {
            ev.preventDefault();
            this.setState({
                fileHover: true
            });
        };
        document.ondragend = document.ondrop = ev => {
            ev.preventDefault();
            this.setState({
                fileHover: false
            });
        };

        document.ondragleave = ev => {
            ev.preventDefault();
            if (ev.target.className == 'hero-body') {
                this.setState({
                    fileHover: false
                });
                console.log(ev.target.className);
            }
        };
    }

    handleSelectChange = event => {
        this.setState({ type: event.target.value });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleFileChange = event => {
        console.log('handle file change');
        this.setState(
            {
                filePath: event.target.files[0].path,
                fileName: event.target.files[0].name
            },
            console.log(this.state)
        );
    };

    handleCheckboxChange = event => {
        this.setState({
            saveChecksum: event.target.checked
        });
    };

    closeNotification = () => {
        this.setState({
            notificationOpen: false
        });
    };

    openNotification = () => {
        this.setState({
            notificationOpen: true
        });
    };

    check = () => {
        this.closeNotification();
        this.setState({
            loading: true
        });
        setTimeout(() => {
            ipcRenderer.send('checksum', {
                filepath: this.state.filePath,
                type: this.state.type,
                checksum: this.state.checksum,
                saveChecksum: this.state.saveChecksum
            });
        }, 1000);
    };

    render() {
        const button = <div>Button</div>;

        return (
            <div className="checksum-validator">
                {this.state.notificationOpen ? (
                    <Notification isSuccess={this.state.match} isDanger={!this.state.match} style={{ width: '100%', position: 'absolute', zIndex: '10' }} onCloseClick={() => this.closeNotification()}>
                        {this.state.match ? (
                            <div>
                                <Icon name={'nc-check-2'} style={{ marginRight: '10px' }} /> Checksum match
                            </div>
                        ) : (
                            <div>
                                <Icon name={'nc-alert-exc'} style={{ marginRight: '10px' }} /> Checksum mismatch
                            </div>
                        )}
                    </Notification>
                ) : null}
                <div className="dimmer" style={this.state.fileHover ? { display: 'block' } : { display: 'none' }}>
                    <Hero isMedium isFullHeight>
                        <Hero.Body>
                            <Container>
                                <h1 className="title" style={{ color: '#fff' }}>
                                    Drop your file here
                                </h1>
                                <Icon name={'nc-file-download-89'} isLarge />
                            </Container>
                        </Hero.Body>
                    </Hero>
                </div>
                <Section>
                    <Form.Field>
                        <Form.File isBoxed isPrimary isFullWidth label="Choose your file..." onChange={this.handleFileChange} fileName={this.state.fileName} />
                    </Form.Field>
                    <Form.Field hasIconsLeft>
                        <input className="input" type="text" name="checksum" placeholder="Checksum" value={this.state.checksum} onChange={this.handleInputChange} />
                        <Icon name={'nc-code'} isSmall isLeft />
                    </Form.Field>
                    <Form.Field hasIconsLeft>
                        <span className="select">
                            <select value={this.state.type} onChange={this.handleSelectChange}>
                                <option value="SHA256">SHA256</option>
                                <option value="SHA512">SHA512</option>
                                <option value="SHA1">SHA1</option>
                                <option value="MD5">MD5</option>
                            </select>
                        </span>
                        <Icon name={'nc-security'} isSmall isLeft />
                    </Form.Field>
                    <Button isPrimary onClick={() => this.check()} icon={this.state.loading ? <Icon name={'nc-dots'} isSmall spin style={{ marginRight: '10px' }} /> : null}>
                        Check
                    </Button>
                </Section>
            </div>
        );
    }
}

export default ChecksumValidator;
