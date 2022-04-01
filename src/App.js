import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { MockBee } from "./backend/mockdocs/MockBee";
import { MockAPI } from "./backend/mockdocs/MockMan";
import { Footer, Header, Loader } from "./components";
import { useAuth, useLoader } from "./contexts";
import { Home, Landing, Login, NotFound, SignUp } from "./pages";

function App() {
	
	const { pathname } = useLocation();
	const { isAuth } = useAuth();
	const { loader } = useLoader();
	const isLandingPage = pathname === "/";
	const injectLanding = isLandingPage ? "landing" : "";

	return (
		<div className={`App body ${injectLanding}`}>
			{pathname !== "/pagenotfound" && !isLandingPage && <Header />}

			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/mockbee" element={<MockBee />} />
				<Route path="/mockman" element={<MockAPI />} />
				<Route
					path="/login"
					element={isAuth ? <Navigate to="/" replace /> : <Login />}
				/>
				<Route
					path="/signup"
					element={isAuth ? <Navigate to="/" replace /> : <SignUp />}
				/>
				<Route path="/loader" element={<Loader />} />
				<Route path="/home" element={<Home />} />

				<Route path="/pagenotfound" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/pagenotfound" replace />} />
			</Routes>
			{(pathname !== "/pagenotfound" || (pathname !== "/login" && loader)) &&
				!isLandingPage && <Footer />}
			{loader && <Loader />}
		</div>
	);
}

export default App;
