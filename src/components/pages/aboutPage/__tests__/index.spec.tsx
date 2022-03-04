import { screen, render } from "@testing-library/react";
import AboutPage from "../aboutPage";

describe("About Page", () => {
  it("just small test", () => {
    render(<AboutPage />);
    expect(screen.getByText("About Page")).toBeTruthy();
  });
});
