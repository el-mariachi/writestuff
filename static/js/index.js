function init() {
    // menu opn section
    const menu = document.querySelector('.menu');
    const menuBtn = document.querySelector('.burger');
    const menuOpener = function (ev) {
        menu.classList.toggle('menu--open');
    }
    menuBtn.addEventListener('click', menuOpener);

    // categories scrolling
    const categories = document.querySelector('.categories');
    const categoriesBody = document.querySelector('.categories__body');
    const backButton = document.querySelector('.categories--scroll-back');
    const forwardButton = document.querySelector('.categories--scroll-forward');

    let catRect;
    let bodyRect;
    let bodyShouldStartAt;
    let bodyShouldEndtAt;

    let scrollIntervalID;

    const scrollBody = function (offset) {
        const left = categoriesBody.style.left || getComputedStyle(categoriesBody).left;
        const currentOffset = parseInt(left, 10);
        const newOffset = currentOffset + offset;

        bodyRect = categoriesBody.getBoundingClientRect();
        if ((offset > 0 && bodyRect.left > bodyShouldStartAt) || (offset < 0 && bodyRect.right < bodyShouldEndtAt)) {
            return;
        }

        categoriesBody.style.left = `${newOffset}px`;
    }
    const finishScroll = function (ev) {
        clearInterval(scrollIntervalID);
    }
    const buttonHandler = function (ev) {
        let offset = 0;
        if (this.classList.contains('categories--scroll-forward')) {
            offset = -10;
        } else if (this.classList.contains('categories--scroll-back')) {
            offset = 10;
        }
        this.addEventListener('mouseup', finishScroll);
        this.addEventListener('touchend', finishScroll);
        scrollIntervalID = setInterval(() => {
            scrollBody(offset);
            setTimeout(() => {
                clearInterval(scrollIntervalID);
            }, 500); // safety catch
        }, 10);

    }

    backButton.addEventListener('mousedown', buttonHandler);
    backButton.addEventListener('touchstart', buttonHandler);
    forwardButton.addEventListener('mousedown', buttonHandler);
    forwardButton.addEventListener('touchstart', buttonHandler);

    const activateButton = function (button) {
        button.style.display = 'flex';
    }

    const deactivateButton = function (button) {
        button.style.display = 'none';
    }

    const activateButtons = function (evt) {
        catRect = categories.getBoundingClientRect();
        bodyRect = categoriesBody.getBoundingClientRect();
        bodyShouldStartAt = catRect.left + parseInt(getComputedStyle(categories).paddingLeft, 10);
        bodyShouldEndtAt = catRect.right - parseInt(getComputedStyle(categories).paddingRight, 10);
        if (bodyRect.left < bodyShouldStartAt) {
            activateButton(backButton);
        } else {
            deactivateButton(backButton);
        }
        if (bodyRect.right > bodyShouldEndtAt) {
            activateButton(forwardButton);
        } else {
            deactivateButton(forwardButton);
        }
    }
    categoriesBody.addEventListener('transitionend', activateButtons);
    window.addEventListener('resize', activateButtons);
    activateButtons();
}

document.addEventListener('DOMContentLoaded', init);

/* TODO
implement movement
stop movement when reached the end

*/