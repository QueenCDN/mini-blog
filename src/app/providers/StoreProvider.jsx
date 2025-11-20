import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
// import { store } from "../store"

function StoreProvider({ children }) {
    return (
        <BrowserRouter>
            { children }
        </BrowserRouter>    
    )
}

export default StoreProvider