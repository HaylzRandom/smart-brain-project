import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

// Pure Function
const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt
				className='Tilt br2 shadow-2'
				gyroscope={true}
				tiltMaxAngleX={45}
				tiltMaxAngleY={45}>
				<div className='Tilt-inner pa3'>
					<img src={brain} alt='Brain Logo' style={{ paddingTop: '5px' }} />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
