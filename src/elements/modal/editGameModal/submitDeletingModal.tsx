import crossIcon from "@/assets/images/cross-icon.png";
import Button from "@/elements/button/button";

type Props = {
  onClose: () => void;
  onDelete: () => void;
};

const SubmitDeletingModal: React.FC<Props> = (props) => (
  <div className="modal submit-deleting">
    <div className="wrapper">
      <h3 className="modal__title">Submit deleting</h3>
      <button type="button" onClick={props.onClose} className="cancel-button">
        <img className="cancel" src={crossIcon} alt="cancel" />
      </button>
    </div>
    <Button onClick={props.onDelete} title="Yes" />
    <Button onClick={props.onClose} title="No" />
  </div>
);

export default SubmitDeletingModal;
