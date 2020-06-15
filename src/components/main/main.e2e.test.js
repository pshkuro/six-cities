import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import Main from "./main.jsx";
import React from "react";

const AdvertsInfo = {
  advertsCount: 10,
  advertsDescription: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`AdvertCard`, () => {
  it(`Advert card titles should be clicked`, () => {
    const onAdvertCardTitleMockClick = jest.fn();

    const mainComponent = shallow(
        <Main advertsInfo={AdvertsInfo}
          onAdvertCardTitleClick={onAdvertCardTitleMockClick}
        />
    );

    const advertCardTitles = mainComponent.find(`.place-card__name`);
    advertCardTitles.forEach((advertCardTitle) => advertCardTitle.simulate(`click`));

    expect(onAdvertCardTitleMockClick).toHaveBeenCalledTimes(advertCardTitles.length);

  });
});
