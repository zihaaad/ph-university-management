import {useFormContext} from "react-hook-form";
import {inputStyle} from "../../styles/loginForm.styles";

const PHInput = ({type, name, label}) => {
  const {register} = useFormContext();
  return (
    <>
      {label ? label : null}
      <input style={inputStyle} type={type} id={name} {...register(name)} />
    </>
  );
};

export default PHInput;
