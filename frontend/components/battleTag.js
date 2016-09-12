'use strict'
import React from 'react';
import Audio from './audio.js'


export default class BattleTag extends React.Component {

render () {	
	return (
		<div>
			<form>
				<label className='battle-tag-header'>Enter Battle Tag</label>
				<input placeholder='BattleTag: example "name#1234"' type='text' className='tag-name'/>
				<button type='submit'>Request the hero</button>
			</form>
			<Audio />
		</div>
		)
}
}
