import Footer from "../footer";
import { screen, render } from "@testing-library/react";

describe("Footer", () => {
  it("number of images in footer test", () => {
    render(<Footer />);
    expect(screen.getAllByRole("img").length).toEqual(3);
  });
});
