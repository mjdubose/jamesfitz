'use strict'
import React from 'react';


export default class BattleTag extends React.Component {

render () {

	
	return (

		<form>
			<label className='battle-tag-header'>Enter Battle Tag</label>
			<input placeholder='BattleTag' type='text'> </input>
			<button type='submit'>Request the hero</button>
		</form>
		)
}
	

}