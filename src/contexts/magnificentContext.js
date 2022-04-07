import { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext";
import { FilterProvider } from "./filterContext";
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
				<FilterProvider>
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
				</FilterProvider>
			</BrowserRouter>
		</MagnificentContext.Provider>
	);
};
