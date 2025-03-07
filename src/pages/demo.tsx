import { InputText } from "../components/Input";


const Demo = () => {
  return (
    <div className="p-24">
      <InputText
        label="OK" placeholder="okax" multiline rows={3} removable 
        helper="xyz"
        error="error"
      />
    </div>
  );
}

export default Demo