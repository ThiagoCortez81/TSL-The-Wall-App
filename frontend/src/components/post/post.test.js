import React from 'react';
import { shallow } from 'enzyme';
import Post from './post';
describe('Post', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Post debug/>);

        expect(component).toMatchSnapshot();
    });
});