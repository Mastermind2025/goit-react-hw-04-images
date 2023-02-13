import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, children}) {
    
    useEffect(() => {
        const handleEscClose = (evt) => {
            if (evt.code === "Escape") {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscClose);
        return () => {
            window.removeEventListener('keydown', handleEscClose);
        };

    }, [onClose]);
    
   

    const handleOverlayClose = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleOverlayClose}>
            <ModalContainer>
                {children}
            </ModalContainer>
        </Overlay>,
        modalRoot
    );
    
}
Modal.propTypes = {
    handleOverlayClose: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    
}