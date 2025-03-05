import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from '../pages/Error';
import Information from '../pages/Information';
import Module from '../pages/Module';
import User from '../pages/User';
import { NotFound } from 'ux-ui';

const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: false }}>
            <Routes>
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