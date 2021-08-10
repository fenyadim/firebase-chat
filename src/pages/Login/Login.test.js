import { shallow } from "enzyme";
import Login from "./Login"

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('should tset', () => {
  const login = shallow(<Login />)
  expect(login.find('input'))
});