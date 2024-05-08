import { ChangeEvent, useState } from 'react';
import '/src/App.css'
interface Country {
  name: {
    common: string;
  };
  capital: string;
  region: string;
  population: number;
  latlng: [number, number];
  flags: {
    png: string;
  };
}

function CountrySearcher() {
  const url = 'https://restcountries.com/v3.1/name/';
  const [data, setData] = useState<Country[]>([]);
  const [pais, setPais] = useState('spain');
  const [toShow, setToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); 

  const fetchData = () => {
    fetch(url + pais)
      .then(response => response.json())
      .then((data: Country[]) => setData(data))
      .catch(error => console.log(error));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPais(event.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleShowCountries = (count: number) => {
    setToShow(count);
    setCurrentPage(1); 
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * toShow;
  const endIndex = startIndex + toShow;

  return (
    <div className="country-cards">
      <div className='fixed-buttons2'>
      <input type="text" value={pais} onChange={handleChange}  />
      <button type="button" onClick={handleSearch}>Buscar</button>
      </div>

      {data.length > 0 &&
        data.slice(startIndex, endIndex).map((country, index) => (
          <div key={index} className="country-card">
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Región: {country.region}</p>
            <p>Población: {country.population}</p>
            <p>Coordenadas: {country.latlng}</p>
            <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} />
          </div>
        ))}
      <div className='fixed-buttons'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage} disabled={endIndex >= data.length}>Siguiente</button>
        <button onClick={() => handleShowCountries(5)}>5</button>
        <button onClick={() => handleShowCountries(10)}>10</button>
        <button onClick={() => handleShowCountries(25)}>25</button>
      </div>
    </div>
  );
}

export default CountrySearcher;