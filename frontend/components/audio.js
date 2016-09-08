import React from 'react';


class Audio extends React.Component {

	render () {
	return <div>
			<audio control className='audio' autoPlay={this.props.autoplay}>
						{"<source src='/Public/20-heaven-s-gate.mp3' type='audio/mp3'>"}
		</audio>
	</div>
};
}
export default Audio
