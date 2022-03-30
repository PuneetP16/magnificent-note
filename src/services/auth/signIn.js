import axios from "axios";

export const signIn = async ({
	loginData,
	dispatch,
	initialFormState,
	toggleAuth,
	toggleShow,
	setStatusMsg,
	rememberMe,
	toggleLoader,
}) => {
	try {
		toggleLoader();

		const res = await axios.post("/api/auth/login", loginData);
		if (res.status === 200) {
			localStorage.setItem("noteToken", res.data.encodedToken);
			toggleAuth();
			const currentUserData = {
				loginData: { ...loginData },

				userData: {
					[res.data.foundUser.email]: {
						firstName: res.data.foundUser.firstName,
						lastName: res.data.foundUser.lastName,
						email: res.data.foundUser.email,
					},
				},
			};

			dispatch({
				type: "HANDLE_SUBMIT",
				initialFormState: rememberMe
					? { loginData: { ...loginData } }
					: initialFormState,
				payload: currentUserData,
			});
			toggleLoader();
		}

		// if (res.status === 201) {
		// 	setStatusMsg("Invalid Password, Try Again");
		// 	toggleShow();
		// 	toggleLoader();
		// 	return;
		// }
	} catch (error) {
		console.log(error, "Invalid Credentials");
		let msg = JSON.stringify(error);
		let parsedMsg = JSON.parse(msg);
		console.log(parsedMsg.status);
		const something =
			parsedMsg.status === 404
				? "Email Address doesn't Exist, Please Signup"
				: "Server Error, Try Again";

		toggleShow();
		setStatusMsg(something);
		// "Invalid Details / Server Error, Try Again"
		toggleLoader();
	}
};
