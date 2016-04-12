"use strict";

import React from 'react'

export default class MainPage extends React.Component {

  render() {
    return (
    	<div>
    		<h1>MainPage</h1>
    		<p>Props: {this.props.foo} </p>
    	</div>
    );
  }
}
