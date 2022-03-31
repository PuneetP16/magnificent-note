import "./Landing.css";
import { useDocumentTitle } from "../../customHooks";
import { ThemeToggle } from "../../components";
import { Content, Hero } from "./Sections";
export const Landing = () => {
	useDocumentTitle("Landing | MS");

	return (
		<div className="landing_page main">
			<Content />
			<Hero />
			<div className="theme_Btn">
				<ThemeToggle />
			</div>
		</div>
	);
};
