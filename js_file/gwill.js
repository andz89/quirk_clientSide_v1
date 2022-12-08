class Modal {
    constructor(id, property) {
        this.id = id
        this.width = property.width;
        this.height = property.height;
        this.backgroundColor = property.backgroundColor;
        this.title = property.title;
        this.showButton = property.showButton;
        this.modalHeaderColor = property.modalHeaderColor;
        this.windowClickClose = property.windowClickClose;
        this.modalContentBackgroundColor = property.modalContentBackgroundColor;
        this.createModal();

    }
    createModal() {

        let element = `
    <div class="modal-content">
            <div class="modal-header" >
                <div class="modal-title">This is a modal</div>
                <button id="modal-btn-close">X</button>
            </div>
            <div class="modal-body">
            
            </div>
    </div>
    `
        // element create by user
        let divElementCreatedByUser = document.querySelector(` ${
            this.id
        }`)
        divElementCreatedByUser.style.display = 'none'

        // create new div inside the element create by user
        let newDiv = document.createElement('div')
        newDiv.id = 'modal';
        newDiv.innerHTML = element;
        divElementCreatedByUser.appendChild(newDiv);


        // css style of new modal
        // modal backgroundColor
        document.querySelector(` ${
            this.id
        } #modal`).style.backgroundColor = this.backgroundColor ? this.backgroundColor : 'rgba(51, 51, 51, 0.705)';

        let modalContent = document.querySelector(`${
            this.id
        } .modal-content`)
        // modal-content backgroundColor color
        modalContent.style.backgroundColor = this.modalContentBackgroundColor ? this.modalContentBackgroundColor : 'rgb(231, 223, 223)'
        // modal-content width
        modalContent.style.width = this.width ? this.width : '400px';
        // modal-content height
        modalContent.style.height = this.height ? this.height : '200px';
        // modal-header background color
        document.querySelector(` ${
            this.id
        } .modal-header`).style.backgroundColor = this.modalHeaderColor ? this.modalHeaderColor : 'rgb(240, 71, 71)'
        // red color;
        // modal title innerHTML
        document.querySelector(` ${
            this.id
        } .modal-title`).innerHTML = this.title ? this.title : 'Modal';


        // close-click on backgroundColor
        if (this.windowClickClose === undefined || this.windowClickClose === true) {
            window.addEventListener('click', (e) => {
                if (e.target.id == 'modal') {
                    document.querySelector(this.id).style.display = 'none';
                }
            })
        }


        // close button
        document.querySelector(`${
            this.id
        } #modal-btn-close`).onclick = () => {
            document.querySelector(this.id).style.display = 'none';

        }

        // show modal button
        document.querySelector(this.showButton).onclick = () => {
            document.querySelector(this.id).style.display = 'flex'
        }


    }

    bodyContent(element, callback) {
        let div = document.createElement('div');
        div.innerHTML = element;
        document.querySelector(` ${
            this.id
        } .modal-body`).appendChild(div)

        callback()
    }


}

export {
    Modal
}
