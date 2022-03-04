import { screen, render } from "@testing-library/react";
import Footer from "../footer";

describe("Footer", () => {
  it("number of images in footer test", () => {
    render(<Footer />);
    expect(screen.getAllByRole("img").length).toEqual(3);
  });
});
