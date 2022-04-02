import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext";
import { LoaderProvider } from "./loaderContext";
import { NoteProvider } from "./noteContext";
import { ScrollToTopProvider } from "./scrollToTopContext";
import { ThemeProvider } from "./themeContext";
import { UserProvider } from "./userContext";

const MagnificentContext = createContext();

export const useMagnificent = () => useContext(MagnificentContext);

export const MagnificentProvider = ({ children }) => {
	const value = "";
	return (
		<MagnificentContext.Provider value={value}>
			<BrowserRouter>
				<ScrollToTopProvider>
					<AuthProvider>
						<UserProvider>
							<NoteProvider>
								<ThemeProvider>
									<LoaderProvider>{children}</LoaderProvider>
								</ThemeProvider>
							</NoteProvider>
						</UserProvider>
					</AuthProvider>
				</ScrollToTopProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
