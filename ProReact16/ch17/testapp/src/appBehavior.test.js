import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import App from "./App";

Enzyme.configure({adapter: new Adapter()});

it("testing title prop in App", () => {
    const titleText = "Testing title prop";
    const wrapper = shallow(<App title={titleText} />);

    const titleValue = wrapper.find("h5").text();
    const stateData  = wrapper.state("title");

    expect(titleValue).toBe(titleText);
    expect(stateData).toBe(titleText);
});