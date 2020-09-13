import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import { ValueInput } from "./ValueInput";

Enzyme.configure({adapter: new Adapter()});

it('Producing 3 ValueInputs', () => {
    const wrapper = shallow(<App />);
    const valCount = wrapper.find(ValueInput).length;
    expect(valCount).toBe(3);
});