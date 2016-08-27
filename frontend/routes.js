'use strict'

import React from 'react';
import BattleTag from './components/battleTag.js';
import { Route, IndexRoute } from 'react-router';



export default(
				<Route path="/" component={BattleTag}>
					<IndexRoute component={BattleTag} />
				</Route>
)
					// <Route path="/Package/:package_name" component={CardBox} />
					// <Route path="/HowItWorks" component={MissionStatement} />
					// <Route path="/MeetTheDevs" component={MeetTheDevs} />
					// <Route path="/Preferences" component={UserForm} />