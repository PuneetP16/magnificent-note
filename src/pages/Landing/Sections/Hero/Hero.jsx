import hero from "../../../../data/image/hero.svg";
import "./Hero.css";

export const Hero = () => {
	return (
		<section className="hero_section hero__desktop">
			<img className="hero_img" src={hero} alt="hero" />
		</section>
	);
};
