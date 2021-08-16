import { configure, shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Login from "./Login"
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

configure({adapter: new Adapter()});

describe('Login', () => {
  it('should render correctly', function () {
    const output = shallow(<Login/>)
    expect(shallowToJson(output)).toMatchSnapshot()
  });
})