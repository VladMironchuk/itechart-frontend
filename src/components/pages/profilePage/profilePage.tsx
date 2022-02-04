import "./profilePage.scss";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import { useSelector } from "react-redux";
import { AppProps } from "@/redux/redux";
import Button from "@/elements/button/button";
import Input from "@/elements/formInput/formInput";
import { ChangeEventHandler, useState } from "react";
import ChangePasswordModal from "@/elements/modal/changePasswordModal";

const ProfilePage = () => {
  const login = useSelector((state: { user: AppProps }) => state.user.login);

  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

  const [username, setUsername] = useState("");

  const changeUsernameHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(() => event.target.value);
  };

  const changePasswordModalToggler = () => {
    setIsChangePasswordModalVisible((prevState) => !prevState);
  };

  return (
    <>
      {isChangePasswordModalVisible && <ChangePasswordModal changePasswordToggler={changePasswordModalToggler} />}
      <SectionContainer classname="profile-page" title={`Profile page: ${login}`}>
        <div className="user-profile">
          <div className="user-profile__image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
              alt="profile-picture"
            />
            <Button type="submit" title="Change profile image" />
          </div>
          <div>
            <form className="user-profile__description">
              <Input label="Username" inputValue={username} changeHandler={changeUsernameHandler} errorMessage="" />
              <label htmlFor="description">Profile description</label>
              <textarea name="description" id="description" cols={30} rows={10}></textarea>
              <Button className="profile-page__button" type="submit" title="Save profile" />
            </form>
            <Button
              onClick={changePasswordModalToggler}
              className="profile-page__button password"
              type="button"
              title="Change password"
            />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default ProfilePage;
