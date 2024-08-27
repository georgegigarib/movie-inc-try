import React from "react";
import { render } from "@testing-library/react-native";
import VoteAverage from "@/src/infrastructure/components/vote-average-meter/VoteAverage";
import { getColorForVote } from "@/src/infrastructure/utils/colotMeter";

jest.mock("@/src/infrastructure/utils/colotMeter", () => ({
  getColorForVote: jest.fn().mockImplementation((vote) => `color-for-vote-${vote}`),
}));

describe("VoteAverage", () => {
  test.each([
    [1, 'color-for-vote-1'],
    [5, 'color-for-vote-5'],
    [8, 'color-for-vote-8'],
    [10, 'color-for-vote-10']
  ])(
    "renders correctly for voteAverage = %i",
    (voteAverage, expectedColor) => {
      const { toJSON } = render(<VoteAverage voteAverage={voteAverage} />);
      expect(toJSON()).toMatchSnapshot();

      expect(getColorForVote).toHaveBeenCalledWith(voteAverage);
    }
  );
});
