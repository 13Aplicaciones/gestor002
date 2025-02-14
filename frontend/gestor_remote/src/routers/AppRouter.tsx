import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import Information from '../pages/Information';
import Module from '../pages/Module';
import User from '../pages/User';
import { NotFound } from 'api-fetch';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Dashboard/>} />
                <Route path="/module" element={<Module />} />
                <Route path="/error" element={<Error />} />
                <Route path="/information" element={<Information />} />
                <Route path="/user" element={<User />} />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;