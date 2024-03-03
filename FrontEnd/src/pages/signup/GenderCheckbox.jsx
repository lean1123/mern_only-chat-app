const GenderCheckbox = ({ onCheckboxGenderChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "checked" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => {
              onCheckboxGenderChange("male");
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "checked" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => {
              onCheckboxGenderChange("female");
            }}
          />
        </label>
      </div>
    </div>
  );
};

// Turned off proptypes to optimaze system in runtime

// GenderCheckbox.propTypes = {
//   onCheckboxGenderChange: PropTypes.func.isRequired,
//   selectedGender: PropTypes.string.isRequired,
// };

export default GenderCheckbox;
