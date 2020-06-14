import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const AdvertsInfo = {
  advertsCount: 10,
  advertsDescription: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
};

it(`Render App`, () => {
  const tree = renderer
  .create(
      <App
        advertsInfo={AdvertsInfo}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
