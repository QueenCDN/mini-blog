import { Provider } from "react-redux";
import { store } from "../store";

import { RouterProvider } from "react-router-dom";
import { AppRouter } from "../../shared/config/routes.jsx";

function StoreProvider({ children }) {
    return (
        <Provider store={store}>
            <RouterProvider router={AppRouter}>
                { children }
            </RouterProvider>     
        </Provider>     
    )
}

export default StoreProvider