import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow, mount} from "enzyme";
import App from "./App";
import { ValueInput } from "./ValueInput";

Enzyme.configure({adapter: new Adapter()});

it("testing title prop in App", () => {
    const titleText = "Testing title prop";
    const wrapper = shallow(<App title={titleText} />);

    const titleValue = wrapper.find("h5").text();
    const stateData  = wrapper.state("title");

    expect(titleValue).toBe(titleText);
    expect(stateData).toBe(titleText);
});

it('update states data', () => {
    const wrapper = shallow(<App />);
    const values = [10, 20, 30];

    values.forEach((value, index) => {
        wrapper.instance().updateFieldValue(index + 1, value);
    });
    wrapper.instance().updateTotal();

    expect(wrapper.state("total"))
    .toBe(values.reduce((total, val) => total += val, 0));
});

it('update state data with a button click', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find("button").first();
    const values = [10, 20, 30];

    values.forEach((val, index) => {
        wrapper.instance().updateFieldValue(index + 1, val);
    });

    button.simulate("click");

    expect(wrapper.state("total"))
    .toBe(values.reduce((total, val) => total += val, 0));
});

it('interaction between component and its child', () => {
    const wrapper = mount(<App />);
    const firstVal  = wrapper.find(ValueInput).first();
    const inputElem = wrapper.find("input").first();

    inputElem.simulate("change", {target: {value: "100"}});
    wrapper.instance().updateTotal();

    expect(firstVal.state("fieldValue")).toBe("100");
    expect(wrapper.state("total")).toBe(100);
});