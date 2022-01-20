import "./footer.scss";
import blizzardLogo from "../../assets/images/Blizzard_Entertainment-Logo.wine.png";
import segaLogo from "../../assets/images/SEGA_logo.png";
import gscLogo from "../../assets/images/GSC_Game_World.png";

export const Footer = () => (
  <footer className="footer">
    <h2 className="footer__title">Incredible convenient</h2>
    <nav className="footer__nav">
      <ul>
        <li>
          <a href="http://blizzard.com/" target="_blank">
            <img src={blizzardLogo} alt="" />
          </a>
        </li>
        <li>
          <a href="https://www.sega.com/" target="_blank">
            <img src={segaLogo} alt="" />
          </a>
        </li>
        <li>
          <a href="https://gsc-game.com/" target="_blank">
            <img src={gscLogo} alt="" />
          </a>
        </li>
      </ul>
    </nav>
  </footer>
);
