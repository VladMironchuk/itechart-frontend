import "./profilePage.scss";
import { useSelector } from "react-redux";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { User } from "webpack.mock";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import { AppProps } from "@/redux/redux";
import Button from "@/elements/button/button";
import Input from "@/elements/formInput/formInput";
import ChangePasswordModal from "@/elements/modal/changePasswordModal";
import useHttp from "@/hooks/useHttp";

const ProfilePage = () => {
  const login = useSelector((state: { user: AppProps }) => state.user.login);

  const { sendRequest } = useHttp();

  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const changeUsernameHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(() => event.target.value);
  };

  const changeUserDescriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescription(() => event.target.value);
  };

  const changePasswordModalToggler = () => {
    setIsChangePasswordModalVisible((prevState) => !prevState);
  };

  const saveUserInfoHandler: FormEventHandler = (event) => {
    event.preventDefault();

    sendRequest(
      {
        url: "/api/saveProfile",
        method: "POST",
        body: {
          username,
          description,
          login,
        },
      },
      () => {}
    );
  };

  useEffect(() => {
    sendRequest(
      {
        url: `/api/getProfile/${login}`,
      },
      (user: User) => {
        setUsername(user.username);
        setDescription(user.description);
      }
    );
  }, [sendRequest]);

  return (
    <>
      {isChangePasswordModalVisible && <ChangePasswordModal changePasswordToggler={changePasswordModalToggler} />}
      <SectionContainer classname="profile-page" title={`Profile page: ${login}`}>
        <div className="user-profile">
          <div className="user-profile__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png" alt="profile" />
            <Button isSubmit title="Change profile image" />
          </div>
          <div>
            <form onSubmit={saveUserInfoHandler} className="user-profile__description">
              <Input label="Username" inputValue={username} changeHandler={changeUsernameHandler} errorMessage="" />
              <p>Profile description</p>
              <textarea
                value={description}
                onChange={changeUserDescriptionHandler}
                name="description"
                id="description"
                cols={30}
                rows={10}
              />
              <Button className="profile-page__button" isSubmit title="Save profile" />
            </form>
            <Button
              onClick={changePasswordModalToggler}
              className="profile-page__button password"
              isSubmit
              title="Change password"
            />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default ProfilePage;
