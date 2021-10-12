import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "4c8d0bdade4295e2df3f73f43cf3c833";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        description: undefined,
        error: "Por favor, digite sua cidade"
      });
    }
    
  }

  render() {

    const dateBuilder = (d) => {
      let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Augusto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day}, ${date} de ${month} de ${year}`
    }

    const armazenar =(chave,valor) =>{
      localStorage.setItem(chave, valor);
    };
    const apagar =(chave) =>{
      localStorage.removeItem(chave);
    };

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <div className="date">{dateBuilder(new Date())}</div>

                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />

                  <button onClick={() => armazenar('ls_w', [new Date(),this.state.temperature, this.state.city,this.state.country])}>Armazenar</button>
                  <button onClick={() => apagar('ls_w')}>Apagar</button>
                    
                </div>
                <div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;