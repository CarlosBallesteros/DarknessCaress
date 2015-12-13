import React, { Component, PropTypes } from 'react';

export default class UnitSearch extends Component{
	render(){
		return( <div className="Search">
            	<input type="text" placeholder="Buscar Pokémon" onChange={this.props.searchBy}/>
            	<img src="images/search.png"/>
           </div>
          ); 
	}
}
UnitSearch.propTypes = {
  searchBy: PropTypes.func
};