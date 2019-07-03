import React from 'react';
import renderer from 'react-test-renderer';
import {movie} from "../../mocks/movie.js";

import {Player} from "./player.jsx";

it(`Player component loads correctly`, () => {
  function mockGetRef(ref) {
    const contentRef = {ontimeupdate: () => {}, currentTime: 0};
    this.contentRef = contentRef;

    return contentRef;
  }

  const func = jest.fn();
  const component = <Player movie={movie} secondsPlayed={0} playing={false} onClosePlayer={func} onProgress={func} onStatusUpdate={func} />;
  jest.spyOn(Player.prototype, `getNode`).mockImplementation(mockGetRef);
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
