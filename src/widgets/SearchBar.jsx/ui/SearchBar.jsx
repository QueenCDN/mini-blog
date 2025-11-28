import Button from "../../../shared/ui/Button.jsx";
import Input from "../../../shared/ui/Input.jsx";

function SearchBar() {
  return (
    <div className="post-item w-full mb-4 p-3" style={{display: "flex", alignItems: "center"}}>
        <div className="w-full">
            <Input type="text" ph="Search..." className="w-full" />
        </div>
        <div style={{marginLeft: "10px"}}>
            <Button text={"🔎"} variant={"outlineBtn"}/>
        </div>
    </div>   
  )
}

export default SearchBar