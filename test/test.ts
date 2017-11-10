
import * as chai from 'chai';
import { assert, expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as electron from 'electron';
import * as mocha from 'mocha';
import { Application } from 'spectron';

chai.use(chaiAsPromised);
chai.should();

beforeEach(() => {
    this.app = new Application({
        args: ['app/build/main.js'],
        path: 'node_modules/.bin/electron',
    });

    return this.app.start().then((app) => {
        return app;
    });
});

afterEach(() => {
    if (this.app && this.app.isRunning()) {
        return this.app.stop();
    }
});

describe('Base tests', () => {
    it('shows an initial window', () => {
        return this.app.client.getWindowCount().then((count) => {
            assert.equal(count, 1);
        });
    });
});
