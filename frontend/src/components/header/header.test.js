import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';
describe('Auth', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Header debug/>);

        expect(component).toMatchSnapshot();
    });
});