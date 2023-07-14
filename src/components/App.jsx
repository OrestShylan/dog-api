import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { fetchBreeds, fetchDogByBreed } from './api';
import { Dog } from './Dog';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
  };
  async componentDidMount() {
    try {
      const breeds = await fetchBreeds();
      this.setState({ breeds: breeds });
    } catch (error) {
      console.log(error);
    }
  }

  selectBreed = async option => {
    console.log(option.value);
    try {
      const getBreed = await fetchDogByBreed(option.value);
      this.setState({ dog: getBreed });
      console.log(getBreed);
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
        {this.state.dog && <Dog dog={this.state.dog}> </Dog>}
      </>
    );
  }
}
