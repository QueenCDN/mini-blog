import Button from "../../../shared/ui/Button.jsx";
import Input from "../../../shared/ui/Input.jsx";

function SearchBar({ value, onChange, onClear }) {
  return (
    <form
      className="post-item w-full mb-4 p-3"
      style={{ display: "flex", alignItems: "center" }}
      onSubmit={(e) => e.preventDefault()} 
    >
      <div className="w-full">
        <Input
          type="text"
          ph="Search..."
          className="w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div style={{ marginLeft: "10px" }}>
        <Button
          text={"✖"}
          variant={"outlineBtn"}
          type="button"
          onClick={onClear}
        />
      </div>
    </form>
  );
}

export default SearchBar;
