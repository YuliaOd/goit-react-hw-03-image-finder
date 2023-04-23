import { Component } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
            if (event.code === 'Escape') {
                this.props.onClose();
            }
    }

    handleBackDropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        const { largeImageURL, tags } = this.props;

        return createPortal (<div className={css.overlay} onClick={this.handleBackDropClick}>
                <div className={css.modal}>
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>, modalRoot)
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}