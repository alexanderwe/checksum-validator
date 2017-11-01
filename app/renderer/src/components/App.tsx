import * as React from 'react';
import Container from './bulma/layout/Container.component';
import Hero from './bulma/layout/hero/Hero.component';
import ChecksumValidator from './Checksum.component';

function App() {
    return (
        <Hero isFullHeight>
            <Container isFluid hasTextCentered isMarginless>
                <ChecksumValidator />
            </Container>
        </Hero>
    );
}

export default App;
