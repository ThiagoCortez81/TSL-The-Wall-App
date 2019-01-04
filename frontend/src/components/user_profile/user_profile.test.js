import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './user_profile';
describe('UserProfile', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<UserProfile debug/>);

        expect(component).toMatchSnapshot();
    });
});