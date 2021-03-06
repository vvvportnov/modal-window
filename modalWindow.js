"use strict";
var Keys;
(function (Keys) {
    Keys["Esc"] = "Escape";
    Keys["Ctrl"] = "Ctrl";
})(Keys || (Keys = {}));
var ModalWindow = /** @class */ (function () {
    function ModalWindow() {
        this.initElements();
        this.initEvents();
        this.showed = false;
    }
    ModalWindow.getInstance = function () {
        if (!ModalWindow.instance) {
            ModalWindow.instance = new ModalWindow();
        }
        return ModalWindow.instance;
    };
    ModalWindow.prototype.initElements = function () {
        //Create elements
        this.modalWindow = document.createElement('div');
        this.modalWindow.setAttribute('class', 'modal');
        this.modalDialog = document.createElement('div');
        this.modalDialog.setAttribute('class', 'modal-dialog');
        this.modalContent = document.createElement('div');
        this.modalContent.setAttribute('class', 'modal-content');
        this.modalHeader = document.createElement('div');
        this.modalHeader.setAttribute('class', 'modal-header');
        this.modalTitle = document.createElement('h3');
        this.modalTitle.setAttribute('class', 'modal-title');
        this.modalClose = document.createElement('a');
        this.modalClose.title = "Close";
        this.modalClose.innerHTML = "x";
        this.modalClose.setAttribute('href', '#close');
        this.modalClose.setAttribute('class', 'modal-close');
        this.modalBody = document.createElement('div');
        this.modalBody.setAttribute('class', 'modal-body');
        //Combine elements
        this.modalWindow.appendChild(this.modalDialog);
        this.modalDialog.appendChild(this.modalContent);
        this.modalContent.appendChild(this.modalHeader);
        this.modalHeader.appendChild(this.modalTitle);
        this.modalHeader.appendChild(this.modalClose);
        this.modalContent.appendChild(this.modalBody);
        var head = document.querySelector('head');
        var body = document.querySelector('body');
        var styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = 'modalWindow.css';
        head.appendChild(styleLink);
        body.appendChild(this.modalWindow);
    };
    ModalWindow.prototype.initEvents = function () {
        var _this = this;
        var body = document.querySelector('body');
        body.addEventListener('keydown', function (e) {
            if (e.key == Keys.Esc) { // TODO: add to enum
                _this.hide();
            }
        });
        // TODO: check native events
        this.modalClose.addEventListener('click', function (e) {
            _this.hide();
        });
        this.modalWindow.addEventListener('click', function (e) {
            if (!_this.modalDialog.contains(e.target)) {
                _this.hide();
            }
        });
    };
    ModalWindow.prototype.show = function () {
        if (this.showed == false) {
            this.modalWindow.style.opacity = '1';
            this.showed = true;
        }
    };
    ModalWindow.prototype.hide = function () {
        if (this.showed == true) {
            this.modalWindow.style.opacity = '0';
            this.modalWindow.style.pointerEvents = 'none';
            this.showed = false;
        }
    };
    ModalWindow.prototype.disableCloseButton = function () {
        this.modalClose.style.pointerEvents = 'none';
        this.modalClose.style.opacity = '0';
    };
    ModalWindow.prototype.addContent = function (content) {
        this.modalBody.appendChild(content);
    };
    ModalWindow.prototype.changeTitle = function (str) {
        this.modalTitle.innerText = str;
    };
    return ModalWindow;
}());
var ModalWindowInstance = ModalWindow.getInstance();
export default ModalWindowInstance;
