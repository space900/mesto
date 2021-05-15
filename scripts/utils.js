const keyHandler = (e) => {
    if (e.key === "Escape") {
        closeActivePopup(e);
    }
};

export const closeActivePopup = (e) => {
    e.preventDefault();
    const activePopup = document.querySelector(".popup_is-opened");
    closeModal(activePopup);
}

// export const openModal = (evt) => {
//     evt.classList.add("popup_is-opened");
//     document.addEventListener("keydown", keyHandler);
// }

export const closeModal = (evt) => {
    evt.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", keyHandler);
}

// export const popupPhoto = document.querySelector(".popup_photo");
// export const popupImage = popupPhoto.querySelector(".popup__image");
// export const popupImageCaption = popupPhoto.querySelector(".popup__caption");