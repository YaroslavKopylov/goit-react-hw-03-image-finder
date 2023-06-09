import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchImages from 'services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    images: [],
    // loading: false,
    largeImage: {},
    // error: null,
    // showModal: false,
    // isActive: false,
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      const { searchValue, page, images } = this.state;
      this.setState({ loading: true });
      try {
        await fetchImages(searchValue, page).then(data => {
          if (data.hits.length === 0) {
            this.setState({ loading: false, isActive: false });
            return Promise.reject(
              new Error(`Nothing found for "${searchValue}"`)
            );
          }
          if (images.length + 12 <= data.totalHits) {
            this.setState({ isActive: true });
          } else {
            this.setState({ isActive: false });
          }
          const searchedImages = data.hits;
          this.setState(prevState => ({
            images: [...prevState.images, ...searchedImages],
            loading: false,
          }));
        });
      } catch (error) {
        this.setState({ loading: false, error });
        toast.error(`${error.message}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
  }
  handleOpenModal = image => {
    const largeImage = { url: image.largeImageURL, alt: image.tags };
    this.setState({ largeImage, showModal: true });
  };
  handleFormSubmit = searchValue => {
    this.setState({ searchValue, page: 1, images: [] });
  };
  render() {
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.handleOpenModal} />
        <ToastContainer />
      </div>
    );
  }
}
