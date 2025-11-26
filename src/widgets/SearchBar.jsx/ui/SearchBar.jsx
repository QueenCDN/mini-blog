import Button from "../../../shared/ui/Button.jsx";

function SearchBar() {
  return (
    <div className="post-item w-full mb-4 p-3" style={{display: "flex", alignItems: "center"}}>
        <div className="w-full">
            <input type="text" placeholder="Search..." className="w-full input-field"/>
        </div>
        <div style={{marginLeft: "10px"}}>
            <Button text={"🔎"} className="login-button"/>
        </div>
    </div>   
  )
}

export default SearchBar