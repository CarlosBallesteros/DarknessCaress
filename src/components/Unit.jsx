import React, { Component, PropTypes } from 'react';
const apiUrl = 'http://img.pokemondb.net/sprites/black-white/anim/normal/';

export default class Unit extends Component{
  render(){
    return( <div className="Pokemon">
              <figure>
                <a href={`/#pokemon/${this.props.pokemon.name}`}>
                  <img src={`${apiUrl}${this.props.pokemon.name}.gif`} width="80"/>
                </a>
              </figure>
              <div>
                <span>{this.props.pokemon.id}</span> - {this.props.pokemon.name}
              </div>  
           </div>
          ); 
  }
}
Unit.propTypes = {
  pokemon: PropTypes.Object
};