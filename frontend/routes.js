'use strict';

import React from 'react';
import BattleTag from './components/battleTag.js';
import { Route, IndexRoute } from 'react-router';



export default(
				<Route path="/" component={BattleTag}>
					<IndexRoute component={BattleTag} />
				</Route>
)
				