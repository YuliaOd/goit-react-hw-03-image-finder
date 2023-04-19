import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchPhoto } from "service/picturesApi";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from './Loader/Loader';
import { Button } from "./Button/Button";
import css from './App.module.css'


export class App extends Component {

  state = {
    query: '',
    images: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    isVissible: false,
    error: false,
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.getPictures();
    }
  }

  getPictures = async () => {
    this.setState({isLoading: true})
    try {
      const { hits, totalHits } = await fetchPhoto(this.state.query, this.state.page)
      const {page, perPage } = this.state
      
      if (hits.length === 0) {
        this.setState({isVissible: false})
        return toast.error("Sorry, there are no images matching your search query. Please try again.");
      };

      if (page > Math.ceil(totalHits / perPage)) {
        this.setState({isVissible: false})
        return toast.warn("We're sorry, but you've reached the end of search results.");
      };

      this.setState(({ images }) => ({
        images: [...images, ...hits],
        isVissible: page < Math.ceil(totalHits / perPage)
      }))
    } catch (error) {
      this.setState({ error: error.message })
      
    }
    finally {
        this.setState({isLoading: false})
      }
  }

  handleFormSubmit = picture => {
    this.setState({ query: picture, images: [], page: 1, error: false });
  }

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { isLoading, images, isVissible } = this.state;

      return (
        <div className={css.container}>
                      
            <Searchbar onSubmit={this.handleFormSubmit} />
          
            {isLoading && <Loader />}

            <ImageGallery images={images} />
          
            {isVissible && (<Button disabled={isLoading} onLoadMoreButton={this.loadMoreButton}>
              {isLoading ? 'Loading...' : 'Load more'}
            </Button>)}
          
            <ToastContainer autoClose={3000}/>
          </div>
          );
      }
  
};