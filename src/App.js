import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

// Components
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';

// CSS
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
	apiKey: '8a03eb6a0bf3439abfb4e13fda6565ea',
});

const particlesOptions = {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		};
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;

		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({ box: box });
	};

	onInputChange = (e) => {
		this.setState({ input: e.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });

		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) =>
				this.displayFaceBox(this.calculateFaceLocation(response))
			)
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false });
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className='App'>
				<Particles className='particles' params={particlesOptions} />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{this.state.route === 'home' ? (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === 'signin' || route === 'signout' ? (
					<SignIn onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
