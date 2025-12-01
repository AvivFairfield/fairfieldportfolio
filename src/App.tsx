import Dock from "./components/Dock";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import { Draggable } from "gsap/Draggable";
import Terminal from "./windows/Terminal";

gsap.registerPlugin(Draggable);

const App = () => {
	return (
		<main>
			<Navbar />
			<Welcome />
			<Dock />
			<Terminal />
		</main>
	);
};

export default App;
