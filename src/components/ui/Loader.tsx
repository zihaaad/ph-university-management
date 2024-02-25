import {Spin} from "antd";

export default function Loader() {
  return (
    <div style={{textAlign: "center", scale: "2", marginTop: "3rem"}}>
      <Spin />
    </div>
  );
}
