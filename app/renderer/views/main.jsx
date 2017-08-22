"use babel";

import React from "react";
import ChecksumValidator from "./components/Checksum.component.jsx";
import Container from "./components/bulma/layout/Container.component.jsx";
import Hero from "./components/bulma/layout/hero/Hero.component.jsx";

export default class Main extends React.Component {
    render() {
        return (
            <Container isFluid>
                <Hero isFullHeight hasTextCentered>
                    <ChecksumValidator />
                </Hero>
            </Container>
        );
    }
}
