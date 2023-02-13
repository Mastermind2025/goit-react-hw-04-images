import Modal from 'components/Modal';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
    const [showModal, setShowModal] = useState(false);
        // console.log({ id, webformatURL, tags, largeImageURL });
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <GalleryItem key={id}>
                <GalleryItemImg
                    src={webformatURL}
                    alt={tags}
                    loading="lazy" 
                    onClick={toggleModal}   
                />
            </GalleryItem>
                
            {showModal && (
                < Modal onClose={toggleModal}>
                    <LazyLoadImage src={largeImageURL} alt={tags} />
                </Modal>
            )}
        </>
    )
}

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
    showModal: PropTypes.bool,
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
    toggleModal: PropTypes.func,
    onClose: PropTypes.func,
}
