import AboutPage from "../aboutPage";
import { screen, render } from "@testing-library/react";

describe("About Page", () => {
  it("just small test", () => {
    render(<AboutPage />);
    expect(screen.getByText("About Page")).toBeTruthy();
  });
});
