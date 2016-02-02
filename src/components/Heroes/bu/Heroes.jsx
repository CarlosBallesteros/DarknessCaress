import React, { Component, PropTypes } from 'react';

import HeroSearch from './HeroSearch';
import HeroList from './HeroList';

export default class Heroes extends Component{

	constructor(props){
		super(props);
	}

	render(){
		const { heroes, searchBy } = this.props;
 		return(	
 			<div>
 				<HeroSearch searchBy={searchBy} />
 				<HeroList heroes={heroes} />
 			</div>
    );    
	}
}

Heroes.propTypes = {
  heroes: PropTypes.array,
  searchBy: PropTypes.func
};