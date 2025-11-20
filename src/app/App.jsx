import { Routes, Route } from "react-router-dom";
import Header from "../widgets/Header/ui/Header";
import { appRoutes } from "../shared/config/routes";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                {appRoutes.map(({path, element}) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </div>
    )
}

export default App