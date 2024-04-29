
import dropdown from "../assets/Images/numberinputdown.png";
import dropup from "../assets/Images/numberinputup.png";
const InputNumberIcon = ({ onIncrement, onDecrement, py }) => {
  return (
    <div className={`border-[#FAC0D3] border-l-2 ${py}`}>
      <div className="flex flex-col items-center w-[20px]   gap-4 ml-2  ">
        <img
          src={dropup}
          alt="increment icon"
          className="hover:text-[#FAC0D3]"
          onClick={onIncrement}
        />
        <img src={dropdown} alt="decrement icon" onClick={onDecrement} />
      </div>
    </div>
  );
};

export default InputNumberIcon
