import axios from "axios";
import { useAuth, useLoader } from "../contexts";

export const useAxios = () => {
	const { token } = useAuth();
	const { toggleLoader } = useLoader();
	let headers = {};
	let output;

	const axiosRequest = async ({ method, url, resKey, data = {} }) => {
		headers = {
			authorization: token,
		};
		try {
			toggleLoader();

			const res = await axios({ url, method, data, headers });
			if (res.status === 200 || res.status === 201) {
				output = res.data[resKey];

				toggleLoader();
			}
		} catch (error) {
			console.error(error.message);
			toggleLoader();
		}
		return { output };
	};

	return { axiosRequest };
};
