import React from 'react';
import { shallow } from 'enzyme';
import MakePost from './makePost';
import TestUtils from "react-dom/test-utils";

describe('MakePost', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<MakePost debug/>);

        expect(component).toMatchSnapshot();
    });

    it('shoud return success during making a post', () => {
        const component = shallow(<MakePost/>);

        component.instance().postToWall();
    });
});