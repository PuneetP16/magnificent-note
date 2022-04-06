import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFilter } from "./filterContext";

export const ScrollToTopProvider = ({ children }) => {
	const location = useLocation();
	const { sortByDate, category, selectedLabel, byPriority } = useFilter();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location, sortByDate, category, selectedLabel, byPriority]);

	return <>{children}</>;
};
