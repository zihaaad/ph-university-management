import {Controller} from "react-hook-form";
import {Input} from "antd";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({type, name, label}: TInputProps) => {
  return (
    <div style={{marginBottom: "1rem"}}>
      {label ? label : null}
      <Controller
        name={name}
        render={({field}) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHInput;
