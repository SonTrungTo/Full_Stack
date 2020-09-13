import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import { ValueInput } from "./ValueInput";

Enzyme.configure({adapter: new Adapter()});

it('Producing 3 ValueInputs', () => {
    const wrapper = shallow(<App />);
    const valCount = wrapper.find(ValueInput).length;
    expect(valCount).toBe(3);
});

it('Fully renders three inputs', () => {
    const wrapper = mount(<App title="Test three inputs" />);
    const count = wrapper.find("input.form-control").length;
    expect(count).toBe(3);
});

it('Shallow renders zero inputs', () => {
    const wrapper  = shallow(<App />);
    const valCount = wrapper.find("input.form-control").length;
    expect(valCount).toBe(0);
});