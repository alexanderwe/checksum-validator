import React from 'react';
import ChecksumValidator from './Checksum.component.jsx';
import Container from './bulma/layout/Container.component.jsx';
import Hero from './bulma/layout/hero/Hero.component.jsx';

export default class Main extends React.Component {
    render() {
        return (
            <Hero isFullHeight>
                <Container fluid hasTextCentered isMarginless>
                    <ChecksumValidator />
                </Container>
            </Hero>
        );
    }
}
