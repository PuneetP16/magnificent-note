import { Link } from "react-router-dom";
import {
	InputTypeOne,
	InputTypeThree,
	InputTypeTwo,
} from "../../../components";
import { useDocumentTitle } from "../../../customHooks";
import "./SignUp.css";

export const SignUp = () => {
	useDocumentTitle("Signup | MS");

	return (
		<main>
			<div className="center">
				<form className="form flex" method="get">
					<h2 className="h3">Sign Up</h2>
					<InputTypeOne
						wrapperClassName="form__item form__first_name form__input_box"
						htmlFor="first_name"
						labelClassName="label"
						labelText="First Name"
						type="text"
						className="input_box"
						placeholder="John"
						name="firstName"
					/>
					<InputTypeOne
						wrapperClassName="form__item form__last_name form__input_box"
						htmlFor="last_name"
						labelClassName="label"
						labelText="Last Name"
						type="text"
						className="input_box"
						placeholder="Doe"
						name="lastName"
					/>
					<InputTypeOne
						wrapperClassName="form__item form__email form__input_box"
						htmlFor="email"
						labelClassName="label"
						labelText="Email Address"
						type="email"
						className="input_box"
						placeholder="JohnDoe@email.com"
						name="email"
					/>

					<InputTypeThree
						wrapperClassName="form__item form__password form__input_box"
						htmlFor="password"
						labelClassName="label"
						labelText="Password"
						type="password"
						className="input_box"
						placeholder="********"
						name="password"
					/>
					<section className="form__item form__actions">
						<InputTypeTwo
							wrapperClassName="form__item form__actions"
							type="checkbox"
							className="checkbox"
							placeholder=""
							id="consent"
							htmlFor="consent"
							labelText="I accept all Terms & Conditions"
						/>
					</section>
					<button className="form__signup_btn btn btn--primary">Sign Up</button>
					<Link className="btn btn--icon" to="/login">
						Already have an Account? Login
						<i className="bx bx-right-arrow-alt"></i>
					</Link>
				</form>
			</div>
		</main>
	);
};
