import Notiflix from 'notiflix';

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem";

import { getImages, PER_PAGE } from '../services/pixabayAPI';
import { useEffect, useState } from 'react';


export const App = () => {

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [isLoadMore, setIsLoadMore] = useState(true);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    const takeImages = async () => {
      
      const data = await getImages(query, page);
      const newImages = await data.hits;

      if (newImages.length === 0) {
        return Notiflix.Notify.warning('Please, enter new search!');
      }

      if (!isThereImagesOnPage(data.total, page)) {
        setIsLoadMore(false);
        Notiflix.Notify.info('The end');
      }
      
      setImages(prev => [...prev, ...newImages]);
      setStatus('success');
    }

    try {
      takeImages();
    } catch (error) {
      Notiflix.Notify.failure('Sorry ;-(');
      console.log(error);
      setStatus('rejected');
    }
  }, [page, query]);

  const isThereImagesOnPage = (total, page) => {
    const totalPages = Math.floor(total / PER_PAGE);
    
    return page < totalPages;
    
  }
      
  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoadMore(true);
    setStatus('pending');
  };
     
  const loadMore = () => {
    setPage(prev => prev + 1)
    console.log('hi, this is load more, page', page);
  };
  

    return (
      <div>
        <Searchbar onSearch={handleSearch} />
        
        {images.length !== 0 &&
          <ImageGallery
            status={status}
            onClickLoadMore={loadMore}
            isLoadMore={isLoadMore}
          >
            {images.map(image => 
              <ImageGalleryItem
                key={image.id}
                id={image.id}
                webformatURL={image.webformatURL}
                tags={image.tags}
                largeImageURL={image.largeImageURL}
              />
            )}
          </ImageGallery>
        }
      </div>
    );
};
  
  
//installed

//npm i styled-components
//npm i notiflix
//npm i formik
//npm install react-loader-spinner --save
//npm install basiclightbox
//npm install react-icons --save
//npm i react-lazy-load-image-component
//npm i axios