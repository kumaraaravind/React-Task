import React, { useState } from 'react';
import data from './data';
import './App.css'

function MovieCard({ name, duration, date, rating, img }) {
  return (
  <div className='movie-card'>
  <img src={img} alt={name} />
  <p> {rating} Rate</p>
  <h2>{name}</h2>
  <p>{duration}</p>
  <div className='date'><p>{date}</p></div>
  
  </div>
  );
  }
  
  function App() {
        const [filteredMovies, setFilteredMovies] = useState(data);
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const handleDateFilter = (event) => {
        event.preventDefault();
  
        const filteredData = data.filter(movie => {
        const movieDateParts = movie.date.split('/');
        const movieYear = parseInt(movieDateParts[2], 10);
        const movieMonth = parseInt(movieDateParts[1], 10);
        const movieDay = parseInt(movieDateParts[0], 10);
        const startParts = startDate.split('-');
  
        const startYear = parseInt(startParts[0], 10);
        const startMonth = parseInt(startParts[1], 10);
        const startDay = parseInt(startParts[2], 10);
        const endParts = endDate.split('-');
        
        const endYear = parseInt(endParts[0], 10);
        const endMonth = parseInt(endParts[1], 10);
        const endDay = parseInt(endParts[2], 10);
        const movieDate = new Date(movieYear, movieMonth - 1, movieDay);
        const startDateObj = new Date(startYear, startMonth - 1, startDay);
        const endDateObj = new Date(endYear, endMonth - 1, endDay);
        
        return movieDate >= startDateObj && movieDate <= endDateObj;
  
  });
  
  setFilteredMovies(filteredData);
  
  };
  
  return (
  <div>
  <form onSubmit={handleDateFilter}>
  <input
  type='date' placeholder='Start Date' value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
  
  <input
  type='date' placeholder='End Date' value={endDate} onChange={(e) => setEndDate(e.target.value)}
  />
  
  <button type='submit'>Submitt</button>

  </form>
  <div className='movie-list'>
      {filteredMovies.map((movie, index) => (
      <MovieCard key={index} {...movie} />
      ))}
  </div>
  </div>
  
  );
  
  }
  
  export default App;