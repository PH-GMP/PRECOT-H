import { Radio } from "antd";
const RadioCom = ({value, onChange, disabled}) => {
    return (<div>
        <Radio.Group onChange={onChange} value={value} disabled={disabled}>
            <Radio value={"YES"}>YES</Radio>
            <Radio value={"NO"}>NO</Radio>

        </Radio.Group>
    </div>)
}

export default RadioCom;