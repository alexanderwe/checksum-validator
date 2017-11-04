import { ipcRenderer } from 'electron';
import * as React from 'react'; // ES6
import Transition from 'react-transition-group/Transition';

import Button from './bulma/element/Button.component';
import Icon from './bulma/element/Icon.component';
import Notification from './bulma/element/Notification.component';
import Form from './bulma/form/Form.component';
import Container from './bulma/layout/Container.component';
import Hero from './bulma/layout/hero/Hero.component';
import Section from './bulma/layout/Section.component';
import FadeAndSlideDownTransition from './transition/FadeAndSlideDownTransition.component';

import Tag from './bulma/element/Tag.component';

interface IUpdateMsg {
    error: boolean;
    msg: string;
    updateAvailable: boolean;
}

interface IChecksumValidatorState {
    checksum: string;
    checksumResult: string;
    error: boolean;
    fileHover: boolean;
    fileName: string;
    filePath: string;
    loading: boolean;
    match: boolean;
    notificationOpen: boolean;
    saveChecksum: boolean;
    type: string;
    updateMsg: IUpdateMsg;
}

class ChecksumValidator extends React.Component<any, IChecksumValidatorState> {
    constructor(props: any) {
        super(props);
        this.state = {
            checksum: '',
            checksumResult: '',
            error: false,
            fileHover: false,
            fileName: '',
            filePath: '',
            loading: false,
            match: false,
            notificationOpen: false,
            saveChecksum: false,
            type: 'SHA256',
            updateMsg: null,
        };
    }

    public componentDidMount() {
        ipcRenderer.on('checksum-result', (event: any, data: any) => {
            this.setState(
                {
                    checksumResult: data.checksumResult,
                    error: data.error,
                    loading: false,
                    match: data.match,
                },
                this.openNotification(),
            );
        }).on('check', (event: any, data: any) => {
            this.check();
        }).on('update', (event: any, data: any) => {
            this.setState({
                updateMsg: data,
            });
        });

        document.body.ondrop = (event: any) => {
            this.setState({
                fileHover: false,
                fileName: event.dataTransfer.files[0].name,
                filePath: event.dataTransfer.files[0].path,
            });
            event.preventDefault();
        };

        document.ondragover = document.ondrop = (event: any) => {
            event.preventDefault();
            this.setState({
                fileHover: true,
            });
        };
        document.ondragend = document.ondrop = (event: any) => {
            event.preventDefault();
            this.setState({
                fileHover: false,
            });
        };

        document.ondragleave = (event: any) => {
            event.preventDefault();
            if (event.target.className === 'hero-body') {
                this.setState({
                    fileHover: false,
                });
            }
        };
    }

    public handleSelectChange = (event: any) => {
        this.setState({ type: event.target.value });
    }

    public handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    public handleFileChange = (event: any) => {
        this.setState(
            {
                fileName: event.target.files[0].name,
                filePath: event.target.files[0].path,
            },
        );
    }

    public handleCheckboxChange = (event: any) => {
        this.setState({
            saveChecksum: event.target.checked,
        });
    }

    public closeNotification = (): any => {
        this.setState({
            notificationOpen: false,
        });
    }

    public openNotification = (): any => {
        this.setState({
            notificationOpen: true,
        });
    }

    public updateApp = (): any => {
        ipcRenderer.send('update-app', {});
    }

    public check = () => {

        if (this.state.filePath !== '' && this.state.checksum !== '') {
            this.closeNotification();
            this.setState({
                loading: true,
            });
            setTimeout(() => {
                ipcRenderer.send('checksum', {
                    checksum: this.state.checksum,
                    filepath: this.state.filePath,
                    saveChecksum: this.state.saveChecksum,
                    type: this.state.type,
                });
            }, 1000);
        }
    }

    public render() {
        const button = <div>Button</div>;

        return (
            <div className='checksum-validator'>
                <FadeAndSlideDownTransition in={!!this.state.notificationOpen} duration={500}>
                    <Notification isSuccess={this.state.match} isDanger={!this.state.match || this.state.error} style={{ width: '100%', position: 'absolute', zIndex: '10' }} onCloseClick={() => this.closeNotification()}>
                        {!this.state.checksumResult ? <div>
                            <Icon name={'nc-alert-exc'} style={{ marginRight: '10px' }} /> Failed - did you try to compute the checksum of an directory ?
                            </div> : this.state.match ? (
                                <div>
                                    <Icon name={'nc-check-2'} style={{ marginRight: '10px' }} /> Checksum match
                            </div>
                            ) : (
                                    <div>
                                        <Icon name={'nc-alert-exc'} style={{ marginRight: '10px' }} /> Checksum mismatch
                            </div>
                                )}
                    </Notification>
                </FadeAndSlideDownTransition>
                <div className='dimmer' style={this.state.fileHover ? { display: 'block' } : { display: 'none' }}>
                    <Hero isMedium isFullHeight>
                        <Hero.Body>
                            <Container>
                                <h1 className='title' style={{ color: '#fff' }}>
                                    Drop your file here
                                </h1>
                                <Icon name={'nc-file-download-89'} isLarge />
                            </Container>
                        </Hero.Body>
                    </Hero>
                </div>
                <Section>
                    <Form.Field>
                        <Form.File isBoxed isPrimary isFullWidth label='Choose your file...' onChange={this.handleFileChange} fileName={this.state.fileName} />
                    </Form.Field>
                    <Form.Field hasIconsLeft>
                        <input className='input' type='text' name='checksum' placeholder='Checksum' value={this.state.checksum} onChange={this.handleInputChange} />
                        <Icon name={'nc-code'} isSmall isLeft />
                    </Form.Field>
                    <Form.Field hasIconsLeft>
                        <span className='select'>
                            <select value={this.state.type} onChange={this.handleSelectChange}>
                                <option value='SHA256'>SHA256</option>
                                <option value='SHA512'>SHA512</option>
                                <option value='SHA1'>SHA1</option>
                                <option value='MD5'>MD5</option>
                            </select>
                        </span>
                        <Icon name={'nc-security'} isSmall isLeft />
                    </Form.Field>
                    <Button isOutLined isPrimary onClick={() => this.check()} icon={this.state.loading ? <Icon name={'nc-dots'} isSmall spin style={{ marginRight: '10px' }} /> : null}>
                        Check
                    </Button>
                </Section>
                {this.state.updateMsg ?
                    <Tag
                        isPrimary={this.state.updateMsg.updateAvailable}
                        isDanger={this.state.updateMsg.error}
                        style={{ cursor: 'pointer' }}
                        onClick={this.state.updateMsg.updateAvailable ? () => this.updateApp() : null}>
                        {this.state.updateMsg.msg}
                    </Tag>
                    : null}

            </div >
        );
    }
}

export default ChecksumValidator;
