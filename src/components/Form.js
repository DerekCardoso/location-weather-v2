import React from "react";

const Form = props => (
	<form onSubmit={props.getWeather}>
		<input type="text" name="city" placeholder="Cidade..."/>
		<button>Como está o tempo?</button>
	</form>
);

export default Form;