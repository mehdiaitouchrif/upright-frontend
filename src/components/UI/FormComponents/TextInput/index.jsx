import "./TextInput.scss";
import PropTypes from "prop-types";

function TextInput({
  value,
  className,
  type,
  onChange,
  name,
  placeholder,
  disabled,
}) {
  return (
    <input
      type={type}
      className={`textInput ${className}`}
      value={value}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete=''
    />
  );
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TextInput;
