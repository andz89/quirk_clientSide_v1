export class Modification {

    constructor(property) {

        this.canvas = property.canvas
        this.canvasScale = property.canvasScale;
        this.SCALE_FACTOR = property.SCALE_FACTOR;
        this.fileHandle = property.fileHandle;
        this.width = property.width;
        this.height = property.height;

    }

    objectSizeOnCanvas(object) {
        if (this.width > 3000) {
            object.scaleToWidth(700);
        } else if (this.height > 2000) {

            object.scaleToWidth(450);
        } else if (this.height == 800 && this.width == 400) {
            object.scaleToWidth(200);
        } else {
            object.scaleToWidth(250);
        }
        object.originX = "center"
        object.originY = "center"
    }


    adding_object_style(object) {


        if (object.type === 'textbox') {
            object.perPixelTargetFind = false;
            this.canvas.setActiveObject(object);
            this.canvas.add(object);
            object.scaleToWidth(200)
            this.canvas.viewportCenterObject(object)


            this.canvas.renderAll()
            this.updateModifications(true)

        } else {
            object.perPixelTargetFind = false,
            this.canvas.setActiveObject(object);
            this.canvas.add(object);

            // set the size of an object in the canvas
            if (object.getScaledHeight() > object.getScaledWidth()) { // object.scaleToHeight(this.canvas.current_height-10)
                console.log('heigth')
            }
            if (object.getScaledWidth() > object.getScaledHeight()) { // object.scaleToWidth(this.canvas.current_width-10)

            }
            if (object.getScaledWidth() == object.getScaledHeight()) { // object.scaleToHeight(this.canvas.current_height-10)

            }
            // scale the corner size
            if (object.getScaledWidth() < 600) {
                object.set("cornerSize", 6);
            } else {
                object.set("cornerSize", 12);

            }
            this.canvas.viewportCenterObject(object)

            this.canvas.renderAll()
            this.updateModifications(true)
        }


    }


    loaderShow() {

        document.querySelector(".modal-loader").classList.add("spinner-1");
        document.querySelector(".modal-loader").style.display = "block";

    }
    loaderHide() {
        document.querySelector(".modal-loader").classList.remove("spinner-1");
        document.querySelector(".modal-loader").style.display = "none";
    }


    groupObjectStyle(object) {
        object.set("borderColor", "#333");
        object.set("cornerColor", "#17a2b8");
        object.set("cornerSize", 12);
        object.set("cornerStyle", "circle");
        object.set("transparentCorners", false);
        object.set("lockUniScaling", true);
    }

    uniqueId() {
        let d = new Date();
        let dateString = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getSeconds().toString() + d.getMilliseconds().toString()
        let random = Math.floor(Math.random() * 1000000).toString()
        return dateString + random
    }


    display_lockObjects(object) {

        if (object.length > 0) {

            object.forEach(e => {
                let li = document.createElement("li");
                li.className = "list_objects"
                li.id = e.id
                li.innerHTML = `
  <input spellcheck = false type="text" id="${
                    e.id
                }" class="object_name_input" value="${
                    e.name
                }">  <span class="unlock" style="font-style: italic">unlock </span>
  `

                let lockContainer = document.querySelector('.lock-object-container')

                lockContainer.prepend(li)
                document.querySelector('.object_name_input').disabled = true;

                lockContainer.scrollTop = 0;
            });


        } else {

            let li = document.createElement("li");
            li.className = "list_objects"
            li.id = object.id;
            li.innerHTML = `
  <input spellcheck = false type="text" id="${
                object.id
            }" class="object_name_input" value="${
                object.name
            }">  <span class="unlock" style="font-style: italic">unlock </span>
  `
            let lockContainer = document.querySelector('.lock-object-container')
            lockContainer.prepend(li)
            document.querySelector('.object_name_input').disabled = true;
            lockContainer.scrollTop = 0;

        }

        document.querySelector(".lock-object-container").onclick = (e) => {

            if (e.target.id) {
                let objects = this.canvas.getObjects();
                let obj = objects.filter((object) => {
                    return object.id === e.target.id
                })

                // if(obj[0]._objects){
                // let a =  obj.toActiveSelection();

                // }else{
                // console.log('isa')

                this.canvas.setActiveObject(obj[0]);
                // a.toActiveSelection();

                // }

                this.canvas.renderAll()
            }
            // unlock objects
            if (e.target.classList.contains('unlock')) {
                let parent_id = e.target.parentElement.id
                let objects = this.canvas.getObjects();

                let obj = objects.filter((object) => {
                    return object.id === parent_id
                })
                this.canvas.discardActiveObject(obj)
                obj[0].selectable = true;
                obj[0].set("lockMovementX", false)
                obj[0].set("lockMovementY", false)
                obj[0].set("lockScalingX", false)
                obj[0].set("lockScalingY", false)
                obj[0].set("lockRotation", false)
                this.canvas.setActiveObject(obj[0]);
                this.canvas.renderAll()
                e.target.parentElement.remove()
            }


        };


        document.querySelector('.lock-object-container').ondblclick = (e) => {
            if (e.target.classList.contains('object_name_input')) {
                e.target.disabled = false
                e.target.focus()
                e.target.addEventListener('blur', (e) => {
                    e.target.disabled = true

                    let objects = this.canvas.getObjects();
                    let obj = objects.filter((object) => {
                        return object.id === e.target.id
                    })

                    obj[0].name = e.target.value
                    this.canvas.renderAll()

                })
            }


        }

    }

    alert(text) {
        let alert_container = document.querySelector('#alert-header')
        alert_container.innerHTML = ''
        alert_container.style.display = 'flex'
        let span = document.createElement('span');
        span.innerHTML = `${text}`;
        alert_container.appendChild(span);


        setTimeout(() => {
            alert_container.removeChild(span)
            alert_container.style.display = 'none'
        }, 5000)


    }


    moveSelected(direction) {
        let STEP = 5;

        var Direction = {
            LEFT: 0,
            UP: 1,
            RIGHT: 2,
            DOWN: 3
        };
        var activeObject = this.canvas.getActiveObject();

        if (activeObject) {
            switch (direction) {
                case Direction.LEFT: activeObject.left = activeObject.left - STEP;
                    break;
                case Direction.UP: activeObject.top = activeObject.top - STEP;
                    break;
                case Direction.RIGHT: activeObject.left = activeObject.left + STEP;
                    break;
                case Direction.DOWN: activeObject.top = activeObject.top + STEP;
                    break;
            }
            activeObject.setCoords();
            this.canvas.renderAll();

        }

    }

    updateModifications(savehistory) {

        if (savehistory === true) {

            let json = this.canvas.toJSON([
                'borderColor',
                'cornerColor',
                'cornerSize',
                'cornerStyle',
                'transparentCorners',
                "lockMovementX",
                "lockMovementY",
                "lockScalingX",
                "lockScalingY",
                "selectable",
                "textAlign",
                "fontFamily",
                "id",
                "name"
            ])

            let myjson = JSON.stringify(json);
            this.canvas.state.push(myjson);
            if (this.canvas.state.length === 20) {
                this.canvas.state.shift()
            }

        }


    }
    lock_image(object, bollean) {
        object.lockMovementX = bollean;
        object.lockMovementY = bollean;
        object.lockScalingX = bollean;
        object.lockScalingY = bollean;
        if (object.lockScalingY === true) {
            object.selectable = false
        } else {
            object.selectable = true
        }

    }

    returnToOriginalSize() {
        this.canvas.setHeight(this.canvas.current_height);
        this.canvas.setWidth(this.canvas.current_width);
        this.canvas.setZoom(this.canvas.current_canvasScale);
    }

    scaleInCrop(object, element) {
        document.querySelector(element).value = object.scaleX
        document.querySelector(element).addEventListener('input', (e) => {
            object.scaleX = e.target.value;
            object.scaleY = e.target.value;
            this.canvas.renderAll()
            this.canvas.viewportCenterObject(object)

        })
    }


}
