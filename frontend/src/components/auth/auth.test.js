import React from 'react';
import { shallow } from 'enzyme';
import Auth from './auth';
import TestUtils from 'react-dom/test-utils';

describe('Auth', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Auth debug/>);

        expect(component).toMatchSnapshot();
    });


    it('shoud return success during a login', () => {
        const auth = TestUtils.renderIntoDocument(<Auth/>);

        auth.setState({
            username: 'thiagocortez81',
            password: '123'
        });

        const form = TestUtils.findRenderedDOMComponentWithClass(auth, 'loginForm');

        TestUtils.Simulate.submit(form);
    });


    it('shoud return success during a signup', () => {
        const auth = TestUtils.renderIntoDocument(<Auth/>);

        window.alert = jest.fn();

        auth.setState({
            username: 'test123',
            password: '123',
            first_name: 'Test',
            last_name: 'TSL',
            email: 'test@test.com',
            redirect: true
        });

        const form = TestUtils.findRenderedDOMComponentWithClass(auth, 'authForm');

        TestUtils.Simulate.submit(form);

        expect(window.alert);
    });
});