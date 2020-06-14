import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const AdvertsInfo = {
  advertsCount: 10,
  advertsDescription: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
};

it(`Render Main`, () => {
  const tree = renderer
  .create(
      <Main
        advertsInfo={AdvertsInfo}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
