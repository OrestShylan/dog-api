import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
  };
  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  selectBreed = async option => {
    console.log(option.value);
    try {
      const response = await axios.get(
        `/images/search?:breed_id=${option.value}`
      );
      this.setState({ dog: response.data[0] });
      console.log(response.data);
    } catch (error) {}
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const options = this.buildSelectOptions();

    return (
      <>
        <Select options={options} onChange={this.selectBreed} />
        {/* option = породи собак
        onChange = статистика про породу однієї собаки */}
        {this.state.dog && (
          <div style={{ display: 'flex', gap: 16 }}>
            <img src={this.state.dog.url} width="480" alt="dog" />
            <div>
              <p>Name: {this.state.dog.breeds[0].name}</p>
              <p> Breed for: {this.state.dog.breeds[0].bred_for}</p>
              <p> Temperament: {this.state.dog.breeds[0].temperament} </p>
            </div>
          </div>
        )}
      </>
    );
  }
}
