import "./profilePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEventHandler, FormEventHandler, memo, useState } from "react";
import useFetch from "use-http";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import Button from "@/elements/button/button";
import FormInput from "@/elements/formInput/formInput";
import ChangePasswordModal from "@/elements/modal/changePasswordModal";
import { userActions, userState } from "@/redux/slices/user";

const ProfilePage = memo(() => {
  const login = useSelector((state: { user: userState }) => state.user.login);
  const currentUserName = useSelector((state: { user: userState }) => state.user.username);
  const currentUserDescription = useSelector((state: { user: userState }) => state.user.description);

  const dispatch = useDispatch();

  const { post: saveUserInfo } = useFetch();

  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);

  const [usernameInputValue, setUsernameInputValue] = useState(currentUserName);
  const [descriptionInputValue, setDescriptionInputValue] = useState(currentUserDescription);

  const changeUsernameHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsernameInputValue(() => event.target.value);
  };

  const changeUserDescriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescriptionInputValue(() => event.target.value);
  };

  const changePasswordModalToggler = () => {
    setIsChangePasswordModalVisible((prevState) => !prevState);
  };

  const saveUserInfoHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    const user = await saveUserInfo("/api/saveProfile", {
      username: usernameInputValue,
      description: descriptionInputValue,
      login,
    });

    dispatch(userActions.updateUsername({ username: user.username }));
    dispatch(userActions.updateDescription({ description: user.description }));
  };

  return (
    <>
      {isChangePasswordModalVisible && <ChangePasswordModal changePasswordToggler={changePasswordModalToggler} />}
      <SectionContainer classname="profile-page" title={`Profile page: ${currentUserName}`}>
        <div className="user-profile">
          <div className="user-profile__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png" alt="profile" />
            <Button isSubmit title="Change profile image" />
          </div>
          <div>
            <form onSubmit={saveUserInfoHandler} className="user-profile__description">
              <FormInput
                label="Username"
                inputValue={usernameInputValue}
                onChange={changeUsernameHandler}
                errorMessage=""
                type="text"
              />
              <p>Profile description</p>
              <textarea
                value={descriptionInputValue}
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
});

export default ProfilePage;
