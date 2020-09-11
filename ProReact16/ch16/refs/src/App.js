import React, { Component } from "react";
import { Editor } from "./Editor";
import { ProductTable } from "./ProductTable";
import { ColorInvalidElements } from "./jQueryColorizer";
import { FormField } from "./FormField";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.editorRef = React.createRef();
    this.fieldRef  = React.createRef();
  }

  addProduct = (product) => {
    if (this.state.products.map(p => p.name).indexOf(product.name) === -1) {
      this.setState({products: [...this.state.products, product]});
    }
  };

  colorFields = () => {
    ColorInvalidElements(this.editorRef.current);
  };

  handleClick = () => {
    this.fieldRef.current.focus();
  };

  render() {
    return (
      <div>
        <div className="text-center m-2">
          <button className="btn btn-primary" onClick={this.colorFields}>
            jQuery
          </button>
        </div>
        <div ref={this.editorRef}>
          <Editor callback={this.addProduct} />
        </div>
        <div className="m-2">
          <FormField label="Name" fieldRef={this.fieldRef} />
          <div className="text-center m-2">
            <button className="btn btn-primary" 
            onClick={this.handleClick}>
              Focus
            </button>
          </div>
        </div>
        <h6 className="bg-secondary text-white m-2 p-2">Products</h6>
        <div className="m-2">
          {
            this.state.products.length === 0 ?
            <div className="text-center">No Products</div> :
            <ProductTable products={this.state.products} />
          }
        </div>
      </div>
    );
  }
}