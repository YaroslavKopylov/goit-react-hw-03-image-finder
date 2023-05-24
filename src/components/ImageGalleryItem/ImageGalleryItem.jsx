import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ image, tags, onClick }) => {
  return (
    <li onClick={onClick}>
      <img src={image} alt={tags} />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
