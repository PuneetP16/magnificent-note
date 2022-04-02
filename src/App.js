import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { MockBee } from "./backend/mockdocs/MockBee";
import { MockAPI } from "./backend/mockdocs/MockMan";
import { Aside, Footer, Header, Loader } from "./components";
import { useAuth, useLoader } from "./contexts";
import {
	Archive,
	Home,
	Label,
	Landing,
	Login,
	NotFound,
	Profile,
	SignUp,
	Trash,
} from "./pages";

function App() {
	const { pathname } = useLocation();
	const { isAuth } = useAuth();
	const { loader } = useLoader();

	const isLandingPage = pathname === "/";

	const isAuthPage = pathname === "/login" || pathname === "/signup";

	const injectPageCss = isLandingPage ? "landing" : isAuthPage ? "auth" : "";

	return (
		<div className={`App body ${injectPageCss}`}>
			{pathname !== "/pagenotfound" && !isLandingPage && <Header />}
			{isAuthPage || isLandingPage ? null : <Aside />}
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
				<Route path="/label" element={<Label />} />
				<Route path="/archive" element={<Archive />} />
				<Route path="/trash" element={<Trash />} />
				<Route path="/profile" element={<Profile />} />

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
