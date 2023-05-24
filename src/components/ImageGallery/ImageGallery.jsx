import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  onItemClick = image => {
    this.props.onClick(image);
  };
  render() {
    const images = this.props.images;
    return (
      <ul class="gallery">
        {images.map(image => (
          <ImageGalleryItem
            onClick={() => this.onItemClick(image)}
            key={image.id}
            image={image.webformatURL}
            tags={image.tags}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
