import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";


import {App} from "./app.jsx";

test.skip(`skip for now`, () => {
  it(`App component loads correctly`, () => {
    const tree = renderer.create(<Provider store={createStore(jest.fn())}><BrowserRouter><App onFormSubmit={jest.fn()} authRequire={false} /></BrowserRouter></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
