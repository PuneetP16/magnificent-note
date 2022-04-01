import { useEffect } from "react";
import "./Alert.css";

export const Alert = ({ alert, setAlert }) => {
	const onClickHandler = () => {
		setAlert((s) => ({
			...s,
			visibility: !s.visibility,
		}));
	};
	const { text, visibility, type } = alert;

	useEffect(() => {
		const timerVar = setTimeout(() => {
			setAlert((s) => ({
				...s,
				visibility: false,
			}));
		}, 2000);

		return () => clearInterval(timerVar);
	}, [setAlert]);

	return visibility ? (
		<div className="alerts flex-col-align-center fw">
			<div className={`alert ${type} alert--dismissable`}>
				{text}
				<button
					onClick={onClickHandler}
					className="btn btn--icon btn--close--transparent alert--btn__dismiss btn--circular"
				>
					<i className="bx bx-x"></i>
				</button>
			</div>
		</div>
	) : null;
};
