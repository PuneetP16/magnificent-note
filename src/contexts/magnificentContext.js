import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext";
import { LoaderProvider } from "./loaderContext";
import { ThemeProvider } from "./themeContext";
import { UserProvider } from "./userContext";

const MagnificentContext = createContext();

export const useMagnificent = () => useContext(MagnificentContext);

export const MagnificentProvider = ({ children }) => {
	const value = "";
	return (
		<MagnificentContext.Provider value={value}>
			<BrowserRouter>
				<UserProvider>
					<AuthProvider>
						<ThemeProvider>
							<LoaderProvider>{children}</LoaderProvider>
						</ThemeProvider>
					</AuthProvider>
				</UserProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
