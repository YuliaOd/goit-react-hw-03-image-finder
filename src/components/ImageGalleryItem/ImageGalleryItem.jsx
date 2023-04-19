import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "../Modal/Modal";
import css from './ImageGalleryItem.module.css';


export class ImageGalleryItem extends Component {

    state = {
        isModalOpen: false,
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { webformatURL, tags, largeImageURL } = this.props;
        const { isModalOpen } = this.state;
            return  <li className={css.imageGalleryItem} >
                        <img src={webformatURL} alt={tags} className={css.imageGalleryItem__image} onClick={this.openModal} />
                        {isModalOpen && <Modal largeImageURL={largeImageURL} tags={tags} onClose={this.closeModal} />}
                    </li> 
    }
}


ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
}