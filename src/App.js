import React from 'react';
import './index.scss';
import { Collection } from './Collection'
import {Skeleton} from './Skeleton'


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(0)
  const [categoryId, setCategoryId] = React.useState(0)
  const [collection, setCollection] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    setIsLoading(true)
    const category = categoryId ? `category=${categoryId}` : ''
    fetch(`https://634bdb48317dc96a308c1d66.mockapi.io/photoGallery?page=${page+1}&limit=3&${category}`).then(res => res.json())
      .then(json => {
        setCollection(json)
        console.log(json)
      }).catch(error => {
        console.warn(error)
        alert('Не удалось получить фото')
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i)=> <li 
          className={categoryId === i ? 'active' : ''} 
          key={obj.name}
          onClick={()=> {setCategoryId(i); setPage(0)}} >{obj.name}</li>)}
        </ul>
        <input className="search-input" placeholder="Поиск по названию"
        value={searchValue}
        onChange={(e)=> setSearchValue(e.target.value)} />
      </div>
      <div className="content">
        {isLoading 
        ? [...new Array(3)].map((_,  i)=><Skeleton key={i} />)
        : collection
        .filter(obj=> obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        .map(obj =>
          <Collection
            key={obj.id}
            name={obj.name}
            images={obj.photos}
          />
        )
        }
      </div>
      <ul className="pagination">
        {[...new Array(categoryId !== 0 ? 3 : 5)].map((_, i) => <li
        key={i}
        className={page === i ? "active" : ""}
        onClick={()=> {setPage(i)}}
        >{i+1}</li>)}
      </ul>
    </div>
  );
}

export default App;
