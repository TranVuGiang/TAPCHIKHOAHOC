import Footer from '@/components/footer';
import Header from '@/components/header';
import { publicRoutes } from '@/Routes';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App bg-blue-100">
                <Header />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        );
                    })}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;