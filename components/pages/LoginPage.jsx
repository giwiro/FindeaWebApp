"use strict";

import React from 'react'

export default class LoginPage extends React.Component {

  render() {
    return (
    	<form action="/login" method="post">
    		<input type="text" name="email" /><br />
    		<input type="password" name="password" /><br/>
    		<input type="submit" value="entrar" />
    	</form>
    );
  }
}
