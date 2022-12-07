import {Modification} from "./_modification.js";

export class Menu_tools extends Modification { // textbox
    insertText(selector) {
        let insert_text = document.querySelector(selector)
        insert_text.addEventListener('click', () => {
            let object = new fabric.Textbox('Your Text Here', {
                textAlign: "center",

                fontSize: 12, // this.canvas.getWidth() * .17,
                id: this.uniqueId(),
                dirty: true,
                // width: 400,//this.canvas.getWidth() * .80
                width: 100,
                splitByGrapheme: true
            })
            object.name = object.type


            this.adding_object_style(object);


        })


    }


    uploadImageLocalFile(selector) {

        document.querySelector(selector).addEventListener('click', async () => {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: 'Images',
                        accept: {
                            "image/jpeg": [
                                ".jpg", ".jpeg"
                            ],
                            "image/png": [".png"],
                            "image/svg+xml": [".svg"]
                        }
                    }
                ]
            })
            this.loaderShow()
            const file = await fileHandle.getFile();

            let reader = new FileReader();
            reader.readAsDataURL(file)

            reader.onload = () => {
                fabric.Image.fromURL(reader.result, (img) => {
                    img.name = img.type
                    img.id = this.uniqueId()
                    this.adding_object_style(img)

                    this.loaderHide()


                })

            };
        })

    }

    dragAndDrop_image() {
        const dropZoneElement = document.querySelector(".drop-zone__input").closest(".canvas-container");

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();
            let file = e.dataTransfer.files
            if (file[0].type == 'image/jpeg' || file[0].type == 'image/png') {


                Array.from(file).forEach((e) => {

                    let reader = new FileReader();
                    reader.readAsDataURL(e)

                    reader.onload = () => {

                        fabric.Image.fromURL(reader.result, (img) => {
                            img.name = img.type
                            img.id = this.uniqueId()
                            // img.originX ='center',
                            // img.originY ='center'
                            this.adding_object_style(img)
                        })

                    };
                })
            } else {
                return false;
            }


        })

    }

    paste_image() {

        window.addEventListener('paste', (e) => {


            let items = e.clipboardData.items;


            if (items.length === 0) {
                return false
            }

            if (items.length === 1) {
                let local_image = items[0].getAsFile()

                if (local_image.type === 'image/png' || local_image.type === 'image/jpeg') {

                    let reader = new FileReader();
                    reader.readAsDataURL(local_image)

                    reader.onload = () => {
                        fabric.Image.fromURL(reader.result, (img) => {
                            img.name = img.type
                            img.id = this.uniqueId()
                            this.adding_object_style(img)
                        })

                    };
                }
            }


            // if gikan sa web brower ang file
            if (items.length > 1) {
                let imageData = items[1].getAsFile()

                if (imageData.type === 'image/png' || imageData.type === 'image/jpeg') {
                    let reader = new FileReader();


                    reader.readAsDataURL(imageData)

                    reader.onload = () => {

                        fabric.Image.fromURL(reader.result, (img) => {
                            img.name = img.type
                            img.id = this.uniqueId()
                            this.adding_object_style(img)
                        })

                    };

                } else {
                    return false;
                }
            }


        })
    }


    insert_square() {

        let element = document.querySelector("#square")
        element.onclick = () => {
            let object = new fabric.Rect({
                // 240.10051968360946 width
                // 228.71676505318098 height
                width: 238.10051968360946,
                height: 228.71676505318098,

                fill: 'gray',
                originX: 'center',
                originY: 'center'

            });
            object.dirty = true;
            object.name = "aa";
            object.id = this.uniqueId()
            // object.opacity = .5

            this.adding_object_style(object)
        }


    }
    insert_circle() {
        let element = document.querySelector("#circle")
        element.onclick = () => {
            let object = new fabric.Circle({radius: 200, originX: 'center', originY: 'center'});
            object.dirty = true;

            object.name = "circle";
            object.id = this.uniqueId()
            this.adding_object_style(object)
        }
    }


    async save_file_json() {

        document.getElementById('save_json').addEventListener('click', async () => {


            let json = this.canvas.toJSON([
                'borderColor',
                'cornerColor',
                'cornerSize',
                'cornerStyle',
                'transparentCorners',
                "_controlsVisibility",
                "lockMovementX",
                "lockMovementY",
                "lockScalingX",
                "lockScalingY",
                "selectable",
                "textAlign",
                "fontFamily",
                "id",
                "name",
                'clip_image_src_org',
                "orig_url"
            ])


            if (this.fileHandle == undefined) {

                let suggest_name = document.querySelector('#file_name').innerHTML

                this.fileHandle = await window.showSaveFilePicker({
                    startIn: 'desktop',
                    suggestedName: `${suggest_name}.json`,
                    types: [
                        {
                            description: 'Text documents',
                            accept: {
                                'text/plain': ['.json']
                            }
                        }
                    ]

                });
                let size = {
                    w: this.width,
                    h: this.height
                };
                let fileHandle = {
                    s: this.fileHandle
                }
                let merge = {
                    json,
                    size,
                    fileHandle
                }
                let stream = await this.fileHandle.createWritable();
                await stream.write(JSON.stringify(merge))
                await stream.close();
                document.querySelector('#file_name').innerHTML = this.fileHandle.name.replace('.json', ' ')

            } else {

                let size = {
                    w: this.width,
                    h: this.height
                };
                let fileHandle = {
                    s: this.fileHandle
                }
                let merge = {
                    json,
                    size,
                    fileHandle
                }
                let stream = await this.fileHandle.createWritable();
                await stream.write(JSON.stringify(merge))
                await stream.close();


            }

        })


    }


    canvasBackgroundColor() {

        let canvasBackground = document.querySelector('#canvas_background')
        canvasBackground.oninput = (e) => {


            this.canvas.setBackgroundColor(e.target.value)
            this.canvas.renderAll()
        }
        let transparent = document.querySelector('#transparent')
        transparent.onclick = () => {
            this.canvas.setBackgroundColor(null)
            this.canvas.renderAll()

        }
    }

    bringToFront_object() {

        let bringToFront = document.querySelector('#bringToFront_object')
        bringToFront.onclick = (e) => {

            let object = this.canvas.getActiveObject();
            if (object.name === 'boxCropper') {
                return false;
            }
            this.canvas.bringForward(object)

        }
    }


    bringToBack_object() {
        let bringToBack = document.querySelector('#bringToBack_object')
        bringToBack.onclick = (e) => {
            let object = this.canvas.getActiveObject();

            if (object.name === 'boxCropper') {
                return false;
            }
            this.canvas.sendBackwards(object)
        }
    }

    horizontal_object() {
        document.querySelector('#horizontal').onclick = () => {

            if (this.canvas.getActiveObject().name === 'boxCropper') {
                return false;
            }
            if (this.canvas.getActiveObject().type === 'activeSelection') {
                let obj = this.canvas.getActiveObject().toGroup()
                this.canvas.viewportCenterObjectH(obj)

                let selected_objects = this.canvas.getActiveObject().toActiveSelection();
                selected_objects.set("borderColor", "#333");
                selected_objects.set("cornerColor", "#17a2b8");
                selected_objects.set("cornerSize", 15);
                selected_objects.set("cornerStyle", "circle");
                selected_objects.set("transparentCorners", false);
                selected_objects.set("lockUniScaling", true);

                this.canvas.renderAll();
            } else {
                let object = this.canvas.getActiveObject();
                this.canvas.viewportCenterObjectH(object)
                this.canvas.setActiveObject(object)
            }


        }

    }

    vertical_object() {
        document.querySelector('#vertical').onclick = () => {
            if (this.canvas.getActiveObject().name === 'boxCropper') {
                return false;
            }
            if (this.canvas.getActiveObject().type === 'activeSelection') {
                let obj = this.canvas.getActiveObject().toGroup()
                this.canvas.viewportCenterObjectV(obj)
                let selected_objects = this.canvas.getActiveObject().toActiveSelection();
                selected_objects.set("borderColor", "#333");
                selected_objects.set("cornerColor", "#17a2b8");
                selected_objects.set("cornerSize", 15);
                selected_objects.set("cornerStyle", "circle");
                selected_objects.set("transparentCorners", false);
                selected_objects.set("lockUniScaling", true);

                this.canvas.renderAll();
            } else {
                let object = this.canvas.getActiveObject();
                this.canvas.viewportCenterObjectV(object)
                this.canvas.setActiveObject(object)
            }
        }


    }

    center_object() {
        document.querySelector('#center').onclick = () => {
            if (this.canvas.getActiveObject().name === 'boxCropper') {
                return false;
            }
            if (this.canvas.getActiveObject().type === 'activeSelection') {
                let obj = this.canvas.getActiveObject().toGroup()
                this.canvas.viewportCenterObject(obj)
                let selected_objects = this.canvas.getActiveObject().toActiveSelection();
                this.groupObjectStyle(selected_objects)


                this.canvas.renderAll();

            } else {
                let object = this.canvas.getActiveObject();
                this.canvas.viewportCenterObject(object)

                this.canvas.setActiveObject(object)

            }
        }

    }

    align_left() {
        let align_left = document.querySelector('#align_left')
        align_left.onclick = () => {
            let object = this.canvas.getActiveObjects()
            if (object.length < 2) {
                return false
            };

            let group_objects = this.canvas.getActiveObject().toGroup()

            var groupWidth = group_objects.width

            object.forEach((obj) => {

                obj.set({
                    left: -(groupWidth / 2),
                    originX: 'left'
                });


            });
            let each_object = this.canvas.getActiveObject().toActiveSelection();
            this.groupObjectStyle(each_object)
            this.canvas.renderAll();
        };


    }

    align_center() {
        let align_center = document.querySelector('#align_center')
        align_center.onclick = () => {

            let object = this.canvas.getActiveObjects()
            if (object.length < 2) {
                return false
            };


            let group_objects = this.canvas.getActiveObject().toGroup()

            var groupWidth = group_objects.width

            object.forEach((obj) => {

                var itemWidth = obj.getBoundingRect().width;
                obj.set({
                    left: (0 - itemWidth / 2),
                    originX: 'left'
                });


            });
            let each_object = this.canvas.getActiveObject().toActiveSelection();
            this.groupObjectStyle(each_object)
            this.canvas.renderAll();
        };


    }

    align_right() {
        let align_right = document.querySelector('#align-right')
        align_right.onclick = () => {
            let object = this.canvas.getActiveObjects()
            if (object.length < 2) {
                return false
            };

            let group_objects = this.canvas.getActiveObject().toGroup()

            var groupWidth = group_objects.width

            object.forEach((obj) => {
                var itemWidth = obj.getBoundingRect().width;
                obj.set({
                    left: (groupWidth / 2 - itemWidth / 2),
                    originX: 'center'
                });
            });

            let each_object = this.canvas.getActiveObject().toActiveSelection();
            this.groupObjectStyle(each_object)
            this.canvas.renderAll();
        };


    }

    align_top() {
        document.querySelector('#align-top').onclick = () => {
            let object = this.canvas.getActiveObjects()
            if (object.length < 2) {
                return false
            };

            let group_objects = this.canvas.getActiveObject().toGroup()
            var groupHeight = group_objects.height

            object.forEach((obj) => {
                obj.set({
                    top: (0 - groupHeight / 2),
                    originY: 'top'
                });
            });

            let each_object = this.canvas.getActiveObject().toActiveSelection();
            this.groupObjectStyle(each_object)
            this.canvas.renderAll();
        }

    }

    align_middle() {

        document.querySelector('#align-middle').onclick = () => {

            let object = this.canvas.getActiveObjects();

            if (object.length < 2) {
                return false
            };
            object.forEach((obj) => {

                let itemHeight = obj.getBoundingRect().height;

                obj.set({
                    top: (0 - itemHeight / 2),
                    originY: 'top'
                });
            });


            this.canvas.renderAll();

        }

    }

    align_bottom() {

        document.querySelector('#align-bottom').onclick = () => {
            let object = this.canvas.getActiveObjects();
            if (object.length < 2) {
                return false
            };

            let group_objects = this.canvas.getActiveObject().toGroup()
            var groupHeight = group_objects.height

            object.forEach((obj) => {
                var itemHeight = obj.getBoundingRect().height;
                obj.set({
                    top: (groupHeight / 2 - itemHeight / 2),
                    originY: 'center'
                });


            });
            let each_object = this.canvas.getActiveObject().toActiveSelection();
            this.groupObjectStyle(each_object);
            this.canvas.renderAll();
        }

    }


    download_as_image() {
        const download_image = document.querySelector("#download-image")
        download_image.onclick = () => {
            var scaleFactor = 1;
            this.canvas.setWidth(this.width * scaleFactor);
            this.canvas.setHeight(this.height * scaleFactor);
            this.canvas.setZoom(scaleFactor);


            this.canvas.renderAll()


            let display_name = document.querySelector("#file_name").innerHTML
            const a = document.createElement("a");
            document.body.appendChild(a)
            a.href = this.canvas.toDataURL({
                format: 'png',
                // quality:  1
            })
            a.download = `${display_name}.png`;
            a.click();
            document.body.removeChild(a)


            this.canvas.setHeight(this.canvas.current_height);
            this.canvas.setWidth(this.canvas.current_width);
            this.canvas.setZoom(this.canvas.current_canvasScale);
        }
    }

    print() {
        let printCanvas = document.querySelector('#printCanvas')


        printCanvas.onclick = () => {
            let scaleFactor = 1;
            this.canvas.setWidth(this.width * scaleFactor);
            this.canvas.setHeight(this.height * scaleFactor);
            this.canvas.setZoom(scaleFactor);
            this.canvas.renderAll()

            const dataUrl = this.canvas.toDataURL();

            printJS({printable: [dataUrl], type: 'image', imageStyle: `
display:flex; 
justify-content:center;
align-items: center;
margin: auto;
max-width: 100%; 
`})


            this.canvas.setHeight(this.canvas.current_height);
            this.canvas.setWidth(this.canvas.current_width);
            this.canvas.setZoom(this.canvas.current_canvasScale);
            this.canvas.renderAll();

        }
    }


    crop() {
        let crop_btn = document.querySelector('#crop-image');
        crop_btn.onclick = () => {

            let image_object = this.canvas.getActiveObject()


            if (! image_object) { // return false if no selected object
                return false
            }
            if (image_object.name == 'boxCropper') {
                return false
            }
            if (image_object.type !== 'image') {
                return false
            }

            document.querySelector('.save_cancel_crop').style.display = 'flex'
            document.querySelector('.sub_header').style.display = 'none'

            this.canvas.orig_index = this.canvas.getObjects().indexOf(image_object) // get the current index of target object
            this.canvas.current_name = image_object.name
            this.canvas.current_left = image_object.left;
            this.canvas.current_top = image_object.top

            image_object.name = 'image_selected_for_crop';

            let background = new fabric.Rect({
                width: this.width,
                height: this.height,
                fill: 'gray',
                opacity: 0.5,
                name: 'gray_background'
            });

            this.canvas.add(background)
            this.lock_image(background, true)

            // create box cropper
            let cropper_box = new fabric.Rect({
                width: image_object.getScaledWidth() - 200,
                height: image_object.getScaledHeight() - 200,
                shape: 'square',
                fill: '#333',
                // stroke: 'red',
                objectCaching: false,
                excludeFromExport: true,
                opacity: 0.5,
                name: 'boxCropper'
            });


            cropper_box.setControlsVisibility({mtr: false})
            this.canvas.setActiveObject(cropper_box)
            this.canvas.add(cropper_box)


            // lock all objects
            let all_objects = this.canvas.getObjects()
            all_objects.forEach((obj) => {
                if (obj.name === 'boxCropper') {
                    return false;
                }
                this.lock_image(obj, true)
            })


            if (image_object.original_image !== undefined) {
                let image_display;
                fabric.Image.fromURL(image_object.original_image, (img) => { // img.original_image = image_object.original_image//save the original image
                    img.scaleToWidth(image_object.original_image_width)
                    image_object.visible = false // hide image_object or selected object

                    image_display = img
                    this.scaleInCrop(image_display, '#scale-crop')
                    this.canvas.viewportCenterObject(image_display)

                    this.canvas.bringToFront(image_display) // bring object to front
                    this.canvas.bringToFront(cropper_box) // bring the cropper box to top of other objects
                    this.lock_image(image_display, true) // lock the new created object

                    cropper_box.width = image_object.original_image_width_cropper_box;
                    cropper_box.height = image_object.original_image_height_cropper_box;
                    cropper_box.top = image_object.original_top_cropper_box;
                    cropper_box.left = image_object.original_left_cropper_box;
                })

                // save crop
                document.querySelector('.save_cancel_crop #save').onclick = () => {
                    document.querySelector('.save_cancel_crop').style.display = 'none'
                    document.querySelector('.sub_header').style.display = 'flex'
                    // no target top
                    var a = cropper_box.top + cropper_box.getScaledHeight()
                    if (a < image_object.top) {

                        cancel_cropping()
                        return false
                    }
                    // no target bottom
                    var a = cropper_box.top - image_display.top
                    if (a > image_display.getScaledHeight()) {

                        cancel_cropping()
                        return false
                    }
                    // no target right
                    var a = cropper_box.left - image_display.left
                    if (a > image_display.getScaledWidth()) {

                        cancel_cropping()
                        return false
                    }
                    // no target left
                    var a = cropper_box.left + cropper_box.getScaledWidth()
                    if (a < image_display.left) {
                        cancel_cropping()
                        return false
                    }


                    // exist in left
                    if (image_display.left > cropper_box.left) {
                        this.canvas.exist_left = image_display.left - cropper_box.left
                    } else {
                        this.canvas.exist_left = 0
                    }

                    // exist in right
                    var a = image_display.left + image_display.getScaledWidth()
                    var b = cropper_box.left + cropper_box.getScaledWidth()

                    if (b > a) {
                        this.canvas.exist_right = b - a
                    } else {
                        this.canvas.exist_right = 0
                    }

                    // exist in top
                    if (image_display.top > cropper_box.top) {
                        console.log('exist')
                        this.canvas.exist_top = image_display.top - cropper_box.top
                    } else {
                        this.canvas.exist_top = 0
                    }

                    // exist in bottom
                    var a = image_display.top + image_display.getScaledHeight()
                    var b = cropper_box.top + cropper_box.getScaledHeight()
                    if (b > a) {

                        this.canvas.exist_bottom = b - a
                    } else {
                        this.canvas.exist_bottom = 0
                    } fabric.Image.fromURL(image_display.original_image, (img) => {
                        img.scaleToWidth(image_display.getScaledWidth())
                        let image = img.toDataURL()
                        fabric.Image.fromURL(image, (img) => {

                            img.cropX = cropper_box.left - image_display.left
                            img.width = cropper_box.getScaledWidth() - this.canvas.exist_right - this.canvas.exist_left
                            img.cropY = cropper_box.top - image_display.top
                            img.height = cropper_box.getScaledHeight() - this.canvas.exist_top - this.canvas.exist_bottom

                            img.left = this.canvas.current_left
                            img.top = this.canvas.current_top

                            img.original_top_cropper_box = cropper_box.top;
                            img.original_left_cropper_box = cropper_box.left;
                            img.original_image_width_cropper_box = cropper_box.getScaledWidth()
                            img.original_image_height_cropper_box = cropper_box.getScaledHeight()
                            img.original_image = image_display._originalElement.currentSrc;
                            img.original_image_top = image_display.top;
                            img.original_image_left = image_display.left;

                            img.original_image_height = image_display.getScaledHeight();
                            img.original_image_width = image_display.getScaledWidth();


                            this.canvas.add(img)
                            this.canvas.setActiveObject(img);
                            img.moveTo(this.canvas.orig_index)
                            img.name = this.canvas.current_name
                            img.id = this.uniqueId()

                            // delete objects which is not neccesary
                            this.canvas.remove(image_display, image, cropper_box, image_object);

                            let all_objects = this.canvas.getObjects()
                            this.canvas.remove(all_objects[all_objects.length - 1]) // delete background gray
                            all_objects.forEach((obj) => {
                                this.lock_image(obj, false)
                            })

                            // canvas.dispose()//delete the created canvas for cropping
                        });

                    })

                }

                // cancel crop
                document.querySelector('.save_cancel_crop #cancel').onclick = () => {

                    cancel_cropping()
                }

                const cancel_cropping = () => {
                    document.querySelector('.save_cancel_crop').style.display = 'none'
                    document.querySelector('.sub_header').style.display = 'flex'
                    this.canvas.remove(cropper_box, image_display); // remove helper cropper objects

                    let all_objects = this.canvas.getObjects()
                    all_objects.forEach((obj) => {
                        this.lock_image(obj, false)
                    })
                    // image_original
                    image_object.name = this.canvas.current_name
                    image_object.moveTo(this.canvas.orig_index)
                    image_object.visible = true
                    // show hide object
                    // image_object.width = this.canvas.orig_width_of_display_image//return original width of object
                    image_object.moveTo(this.canvas.orig_index) // return orginal index of selected object
                    this.canvas.setActiveObject(image_object)

                    image_object.top = this.canvas.current_top;
                    image_object.left = this.canvas.current_left
                    // remove gray background
                    let objects = this.canvas.getObjects()
                    this.canvas.remove(objects[objects.length - 1])
                }
            }


            // if selected object its original image is undefined
            if (image_object.original_image == undefined) {
                this.scaleInCrop(image_object, '#scale-crop')
                this.canvas.viewportCenterObject(cropper_box)
                this.canvas.bringToFront(image_object) // bring created image to front
                this.canvas.bringToFront(cropper_box) // bring the cropper box to top of other objects
                this.canvas.viewportCenterObject(image_object)
                // save crop
                document.querySelector('.save_cancel_crop #save').onclick = () => { // no target top
                    var a = cropper_box.top + cropper_box.getScaledHeight()
                    if (a < image_object.top) {

                        cancel_cropping()
                        return false
                    }
                    // no target bottom
                    var a = cropper_box.top - image_object.top
                    if (a > image_object.getScaledHeight()) {

                        cancel_cropping()
                        return false
                    }
                    // no target right
                    var a = cropper_box.left - image_object.left
                    if (a > image_object.getScaledWidth()) {

                        cancel_cropping()
                        return false
                    }
                    // no target left
                    var a = cropper_box.left + cropper_box.getScaledWidth()
                    if (a < image_object.left) {
                        cancel_cropping()
                        return false
                    }

                    // exist in left
                    if (image_object.left > cropper_box.left) {
                        this.canvas.exist_left = image_object.left - cropper_box.left
                    } else {
                        this.canvas.exist_left = 0
                    }

                    // exist in right
                    var a = image_object.left + image_object.getScaledWidth()
                    var b = cropper_box.left + cropper_box.getScaledWidth()
                    if (b > a) {
                        this.canvas.exist_right = b - a
                    } else {
                        this.canvas.exist_right = 0
                    }


                    // exist in top
                    if (image_object.top > cropper_box.top) {
                        console.log('exist')
                        this.canvas.exist_top = image_object.top - cropper_box.top
                    } else {
                        this.canvas.exist_top = 0
                    }

                    // exist in bottom
                    var a = image_object.top + image_object.getScaledHeight()
                    var b = cropper_box.top + cropper_box.getScaledHeight()
                    if (b > a) {
                        this.canvas.exist_bottom = b - a
                    } else {
                        this.canvas.exist_bottom = 0
                    }


                    let image_cropped = image_object.toDataURL({
                        left: cropper_box.left - image_object.left + this.canvas.exist_left,
                        top: cropper_box.top - image_object.top + this.canvas.exist_top,
                        width: cropper_box.getScaledWidth() - this.canvas.exist_left - this.canvas.exist_right,
                        height: cropper_box.getScaledHeight() - this.canvas.exist_top - this.canvas.exist_bottom,
                        format: 'png'
                    })

                    fabric.Image.fromURL(image_cropped, (img) => {
                        img.left = this.canvas.current_left
                        img.top = this.canvas.current_top

                        img.original_top_cropper_box = cropper_box.top;
                        img.original_left_cropper_box = cropper_box.left;
                        img.original_image_width_cropper_box = cropper_box.getScaledWidth()
                        img.original_image_height_cropper_box = cropper_box.getScaledHeight()
                        img.original_image = image_object._originalElement.currentSrc
                        img.original_image_top = image_object.top;
                        img.original_image_left = image_object.left;
                        img.original_image_height = image_object.getScaledHeight();
                        img.original_image_width = image_object.getScaledWidth();

                        this.canvas.setActiveObject(img);
                        this.canvas.remove(image_object, image_cropped, cropper_box, background);
                        this.canvas.add(img)
                        img.moveTo(this.canvas.orig_index)
                        img.name = this.canvas.current_name
                        img.id = this.uniqueId()

                        this.canvas.renderAll()

                    })

                    document.querySelector('.save_cancel_crop').style.display = 'none'
                    document.querySelector('.sub_header').style.display = 'flex'

                    this.canvas.getObjects().forEach((obj) => {
                        this.lock_image(obj, false)
                    }) // unclock all objects
                }

                // cancel crop
                document.querySelector('.save_cancel_crop #cancel').onclick = () => {
                    cancel_cropping()

                }
                const cancel_cropping = () => {
                    document.querySelector('.save_cancel_crop').style.display = 'none'
                    document.querySelector('.sub_header').style.display = 'flex'
                    image_object.moveTo(this.canvas.orig_index)
                    image_object.name = this.canvas.current_name

                    this.canvas.setActiveObject(image_object);
                    this.canvas.remove(cropper_box); // remove cropper object
                    let all_objects = this.canvas.getObjects()
                    this.canvas.remove(all_objects[all_objects.length - 1]) // remove background
                    all_objects.forEach((obj) => {
                        this.lock_image(obj, false)
                    }) // unclock all objects
                    image_object.top = this.canvas.current_top;
                    image_object.left = this.canvas.current_left
                }
            }

        }
    }


    trim() {
        let trim_btn = document.querySelector('#trim-image')
        trim_btn.onclick = () => {

            let object = this.canvas.getActiveObject()

            if (! object) {
                return false
            }

            if (object.type == 'activeSelection') {
                return false
            }
            if (object.name === 'boxCropper') {
                return false
            }
            this.canvas.discardActiveObject(object)
            object.hoverCursor = 'crosshair'
            this.canvas.renderAll()


            const lock = (bollean) => {
                this.canvas.getObjects().forEach((obj) => {
                    if (obj.name === 'trimmer') {
                        return false;
                    }
                    // if(obj.name === 'bg_trim'){
                    // return false
                    // }
                    this.lock_image(obj, bollean)
                    if (bollean === true) { // obj.hoverCursor = 'crosshair'
                        this.canvas.hoverCursor = 'crosshair'
                        this.canvas.defaultCursor = 'crosshair'


                    } else {
                        this.canvas.defaultCursor = 'default'
                        this.canvas.hoverCursor = 'all-scroll'


                    }
                })
            };

            lock(true)

            // create dark background
            let background = new fabric.Rect({
                width: this.width,
                height: this.height,
                fill: 'gray',
                opacity: 0.9,
                name: 'bg_trim'
            });

            this.canvas.add(background)
            this.canvas.viewportCenterObject(background)
            this.lock_image(background, true)


            // dark_background.moveTo(this.canvas.getObjects().indexOf(image_object))


            this.canvas.selection = false
            let trimmer_box;
            let mouseDown = false;
            let stopDrawing = false
            let origX;
            let origY;


            let current_index = this.canvas.getObjects().indexOf(object)
            this.canvas.bringToFront(object)
            background.moveTo(this.canvas.getObjects().indexOf(object) - 1)

            const start_add = (o) => {
                if (stopDrawing === false) {

                    let pointer = this.canvas.getPointer(o.e)
                    origX = pointer.x
                    origY = pointer.y


                    mouseDown = true

                    trimmer_box = new fabric.Rect({
                        fill: 'gray',
                        left: pointer.x,
                        top: pointer.y,
                        stroke: '#F51720',
                        strokeWidth: 3,
                        name: 'trimmer',
                        objectCaching: false,
                        excludeFromExport: true,
                        opacity: 0.5

                    });
                    // trimmer_box.setControlsVisibility({
                    // mt: false,mb: false,ml: false, mr: false,tr: false,tl: false,br: false,bl: false, mtr: false
                    // });

                    this.canvas.add(trimmer_box)

                    this.canvas.renderAll()


                }
            }
            let delete_trimmer;
            const start_draw = (o) => {
                let pointer = this.canvas.getPointer(o.e)

                if (mouseDown === true && pointer.x > origX && pointer.y > origY) {
                    trimmer_box.width = pointer.x - origX
                    trimmer_box.height = pointer.y - origY


                    this.canvas.renderAll()
                    delete_trimmer = true
                }


            }
            let cut_out = true
            const stop_draw = () => {
                if (cut_out === true) {


                    let scaleFactor = 1;
                    this.canvas.setWidth(this.width * scaleFactor);
                    this.canvas.setHeight(this.height * scaleFactor);
                    this.canvas.setZoom(scaleFactor);
                    mouseDown = false
                    trimmer_box.setCoords()
                    stopDrawing = true
                    this.canvas.selection = true
                    // kung nagsugod  ang trimmer sa gawas ng object sa bottom//bottom
                    let trimmer_height_onObject = trimmer_box.getBoundingRect().top - object.getBoundingRect().top
                    if (trimmer_height_onObject > object.getScaledHeight()) {

                        this.returnToOriginalSize()
                        lock(false)
                        this.canvas.remove(trimmer_box)
                        object.hoverCursor = 'all-scroll'
                        cut_out = false
                        this.canvas.remove(background)
                        this.canvas.renderAll()
                        return false
                    }
                    // kung nagsugod  ang trimmer sa gawas ng object sa right//width
                    let trimmer_width_onObject = trimmer_box.getBoundingRect().left - object.getBoundingRect().left
                    if (trimmer_width_onObject > object.getScaledWidth()) {
                        this.returnToOriginalSize()

                        lock(false)
                        this.canvas.remove(trimmer_box)
                        object.hoverCursor = 'all-scroll'
                        cut_out = false
                        this.canvas.remove(background)
                        this.canvas.renderAll()
                        return false
                    }

                    // kung ang tumoy mo sa trimmer box ing abot ba sa sugdanan ng object sa left//hint start
                    let width_of_trimmer = trimmer_box.getBoundingRect().left + trimmer_box.getScaledWidth()
                    if (width_of_trimmer < object.getBoundingRect().left) {
                        this.returnToOriginalSize()
                        lock(false)
                        this.canvas.remove(background)
                        this.canvas.remove(trimmer_box)
                        object.hoverCursor = 'all-scroll'
                        cut_out = false

                        this.canvas.renderAll()
                        return false
                    }

                    // kung ang tumoy mo sa trimmer box ing abot ba sa sugdanan ng object sa top//top
                    let height_of_trimmer = trimmer_box.getBoundingRect().top + trimmer_box.getScaledHeight()
                    if (height_of_trimmer < object.getBoundingRect().top) {
                        this.returnToOriginalSize()
                        lock(false)
                        this.canvas.remove(background)
                        this.canvas.remove(trimmer_box)
                        object.hoverCursor = 'all-scroll'
                        cut_out = false
                        this.canvas.renderAll()
                        return false
                    }

                    // asa ng start ang left
                    let start_of_trimmer_onObject_left = trimmer_box.getBoundingRect().left - object.getBoundingRect().left
                    let width_ng_trimmer_sa_left = trimmer_box.getBoundingRect().left + trimmer_box.getScaledWidth()
                    let sobra_sa_left = 0
                    let ang_nabilin = width_ng_trimmer_sa_left - start_of_trimmer_onObject_left

                    if (ang_nabilin > width_ng_trimmer_sa_left) {
                        sobra_sa_left = ang_nabilin - width_ng_trimmer_sa_left

                    } else {
                        start_of_trimmer_onObject_left = 0
                    }

                    let start_of_trimmer_onObject_right = trimmer_box.getBoundingRect().left - object.getBoundingRect().left
                    let get_entire_width_viaTrimmer = start_of_trimmer_onObject_right + trimmer_box.getScaledWidth()
                    let labaw
                    if (get_entire_width_viaTrimmer > object.getScaledWidth()) {
                        labaw = get_entire_width_viaTrimmer - object.getScaledWidth()
                    } else {
                        labaw = 0
                    }
                    // top
                    let start_of_trimmer_onObject_top = trimmer_box.getBoundingRect().top - object.getBoundingRect().top
                    let width_ng_trimmer_sa_top = trimmer_box.getBoundingRect().top + trimmer_box.getScaledHeight()
                    let sobra_sa_top = 0
                    let ang_nabilin_top = width_ng_trimmer_sa_top - start_of_trimmer_onObject_top

                    if (ang_nabilin_top > width_ng_trimmer_sa_top) {
                        sobra_sa_top = ang_nabilin_top - width_ng_trimmer_sa_top

                    } else {
                        start_of_trimmer_onObject_top = 0

                    }

                    // bottom
                    let start_of_trimmer_onObject_bottom = trimmer_box.getBoundingRect().top - object.getBoundingRect().top
                    let get_entire_width_viaTrimmer_bottom = start_of_trimmer_onObject_bottom + trimmer_box.getScaledHeight()
                    let labaw_bottom
                    if (get_entire_width_viaTrimmer_bottom > object.getScaledHeight()) {
                        labaw_bottom = get_entire_width_viaTrimmer_bottom - object.getScaledHeight()
                    } else {
                        labaw_bottom = 0
                    }


                    let b = object.toDataURL({
                        left: trimmer_box.getBoundingRect().left - object.getBoundingRect().left - start_of_trimmer_onObject_left,
                        top: trimmer_box.getBoundingRect().top - object.getBoundingRect().top - start_of_trimmer_onObject_top,
                        width: trimmer_box.getScaledWidth() - sobra_sa_left - labaw,
                        height: trimmer_box.getScaledHeight() - sobra_sa_top - labaw_bottom,
                        format: 'png'
                    })


                    fabric.Image.fromURL(b, (img) => {

                        if (sobra_sa_left > 0 || sobra_sa_top > 0) {
                            img.left = trimmer_box.left + sobra_sa_left
                            img.top = trimmer_box.top + sobra_sa_top

                        } else {
                            img.left = trimmer_box.left
                            img.top = trimmer_box.top
                        }

                        img.objectCaching = false;
                        this.canvas.setActiveObject(img);


                        if (delete_trimmer == true) {
                            this.canvas.add(img)
                        }
                    });

                    cut_out = false
                    lock(false)

                    this.canvas.remove(trimmer_box)
                    this.canvas.remove(background)
                    object.moveTo(current_index)


                }
                this.returnToOriginalSize()
                object.hoverCursor = 'all-scroll'
                this.canvas.renderAll()
            }
            this.canvas.on('mouse:down', start_add)
            this.canvas.on('mouse:move', start_draw)
            this.canvas.on('mouse:up', stop_draw)

        }


    }


    sample_crop() {
        let sample = document.querySelector('#sample-crop')
        let cropper_box = new fabric.Rect({
            width: 600,
            height: 600,
            shape: 'square',
            fill: 'gray',

            objectCaching: false,
            excludeFromExport: true,
            left: 600,
            top: 600,
            opacity: 0.6

        });
        this.canvas.add(cropper_box)
        sample.onclick = () => {
            let object = this.canvas.getActiveObject()
            let canvas = new fabric.Canvas("canvas-3", {
                width: object.getScaledWidth(),
                height: object.getScaledHeight()

            });


            fabric.Image.fromURL(object._originalElement.currentSrc, (img) => {
                img.scaleToWidth(object.getScaledWidth());
                canvas.viewportCenterObject(img)
                canvas.add(img)
                canvas.renderAll()
                let a = img.toDataURL()

                fabric.Image.fromURL(a, (img) => {
                    // img.left = cropper_box.left
                    // img.top = cropper_box.top

                    // exist in left
                    if (object.left > cropper_box.left) {
                        this.canvas.exist_left = object.left - cropper_box.left
                    } else {
                        this.canvas.exist_left = 0
                    }

                    // exist in right
                    var a = object.left + object.getScaledWidth()
                    var b = cropper_box.left + cropper_box.getScaledWidth()

                    if (b > a) {
                        this.canvas.exist_right = b - a
                    } else {
                        this.canvas.exist_right = 0
                    }

                    img.cropX = cropper_box.left - object.left

                    // img.cropY =object.top
                    img.width = cropper_box.getScaledWidth() - this.canvas.exist_right - this.canvas.exist_left

                    // exist in top
                    if (object.top > cropper_box.top) {
                        console.log('exist')
                        this.canvas.exist_top = object.top - cropper_box.top
                    } else {
                        this.canvas.exist_top = 0
                    }

                    // exist in bottom
                    var a = object.top + object.getScaledHeight()
                    var b = cropper_box.top + cropper_box.getScaledHeight()
                    if (b > a) {

                        this.canvas.exist_bottom = b - a
                    } else {
                        this.canvas.exist_bottom = 0
                    }


                    img.cropY = cropper_box.top - object.top
                    img.height = cropper_box.getScaledHeight() - this.canvas.exist_top - this.canvas.exist_bottom
                    this.canvas.add(img)
                    this.canvas.renderAll()
                })

                canvas.dispose()
            })


        }

    }

    clip() { // clip image

        let btn_clip = document.querySelector('#sample_clip')

        let image_object;

        btn_clip.onclick = () => {
            document.querySelector('.save_cancel_clip').style.display = 'flex'
            document.querySelector('.sub_header').style.display = 'none'
            image_object = this.canvas.getActiveObject()

            this.canvas.orig_index = this.canvas.getObjects().indexOf(image_object) // get the current index of target object
            this.canvas.current_name = image_object.name

            image_object.name = 'image_selected_for_clip';
            this.lock_image(image_object, true) // lock the new created object


            if (image_object._objects) { // create box cropper
                let cropper_box = new fabric.Circle({
                    width: image_object.original_image_width_cropper_box,
                    height: image_object.original_image_height_cropper_box,
                    shape: 'square',
                    fill: '#333',
                    objectCaching: false,
                    excludeFromExport: true,
                    opacity: 0.5,
                    name: 'boxCropper-clip',
                    radius: image_object.original_radius,
                    top: image_object.original_top_cropper_box,
                    left: image_object.original_left_cropper_box
                });


                this.canvas.setActiveObject(cropper_box)
                // cropper_box.scaleToWidth(image_object.original_image_width_cropper_box)
                this.canvas.add(cropper_box)

                let image_display;
                fabric.Image.fromURL(image_object.original_image, (img) => {

                    img.scaleToWidth(image_object.original_image_width)
                    image_object.visible = false // hide image_object or selected object
                    this.canvas.discardActiveObject(image_object)
                    this.canvas.add(img)
                    image_display = img
                    this.scaleInCrop(image_display, '#scale-clip')
                    this.canvas.viewportCenterObject(image_display)

                    this.canvas.bringToFront(image_display) // bring object to front
                    this.canvas.bringToFront(cropper_box) // bring the cropper box to top of other objects
                    this.lock_image(image_display, true)
                    // lock the new created object

                    // cropper_box.top = image_object.original_top_cropper_box;
                    // cropper_box.left = image_object.original_left_cropper_box;
                    this.canvas.setActiveObject(cropper_box)
                    this.canvas.renderAll()

                })


                document.querySelector('.save_cancel_clip #save').onclick = () => {
                    document.querySelector('.save_cancel_clip').style.display = 'none'
                    document.querySelector('.sub_header').style.display = 'flex'

                    let a = cropper_box.top - image_display.top
                    let b = cropper_box.left - image_display.left
                    let canvas = new fabric.Canvas("canvas-3", {
                        width: image_display.getScaledWidth(),
                        height: image_display.getScaledHeight(),
                        clipPath: new fabric.Circle(
                            {
                                radius: cropper_box.getScaledWidth() / 2,
                                top: a,
                                left: b,
                                absolutePositioned: true
                            }
                        )
                    });


                    fabric.Image.fromURL(image_object.original_image, (img) => {
                        img.scaleToWidth(image_display.getScaledWidth());
                        canvas.viewportCenterObject(img)
                        canvas.add(img)
                        canvas.renderAll()

                        let image = canvas.toDataURL({format: 'png'})
                        fabric.Image.fromURL(image, (img) => {


                            img.cropX = cropper_box.left - image_display.left
                            img.width = cropper_box.getScaledWidth()
                            img.cropY = cropper_box.top - image_display.top
                            img.height = cropper_box.getScaledHeight()
                            // img.original_image = image_display.original_image

                            let shape = new fabric.Circle({
                                radius: cropper_box.getScaledWidth() / 2 - 2,
                                name: 'clip-stroke',
                                fill: null
                            })


                            img.originX = 'center'
                            img.originY = 'center'

                            shape.originX = 'center'
                            shape.originY = 'center'

                            var group = new fabric.Group([shape, img]);
                            this.canvas.add(group)
                            group.moveTo(this.canvas.orig_index)

                            this.canvas.setActiveObject(group)

                            group.left = cropper_box.left
                            group.top = cropper_box.top
                            group.original_image_width = image_display.getScaledWidth()
                            group.original_image_width_cropper_box = cropper_box.width;
                            group.original_image_height_cropper_box = cropper_box.height;
                            group.original_top_cropper_box = cropper_box.top;
                            group.original_left_cropper_box = cropper_box.left;
                            group.original_image = image_object.original_image
                            group.original_radius = image_object.original_radius
                            this.canvas.remove(image_object, cropper_box, image_display)
                            // this.lock_image(image_display, false)//release object

                            this.canvas.renderAll()
                            canvas.dispose()
                        })


                    })

                }

            } else {


                this.canvas.bringToFront(image_object)
                // bring created image to front
                // create box cropper
                this.scaleInCrop(image_object, '#scale-clip')

                let cropper_box = new fabric.Circle({
                    width: image_object.getScaledWidth() - 200,
                    height: image_object.getScaledHeight() - 200,
                    shape: 'square',
                    fill: '#333',
                    objectCaching: false,
                    excludeFromExport: true,
                    opacity: 0.5,
                    name: 'boxCropper-clip',

                    radius: image_object.getScaledWidth() / 2 - 100
                });
                this.canvas.viewportCenterObject(cropper_box)
                this.canvas.setActiveObject(cropper_box)
                this.canvas.add(cropper_box)
                this.canvas.renderAll()
                this.canvas.viewportCenterObject(image_object)

                document.querySelector('.save_cancel_clip #save').onclick = () => {

                    document.querySelector('.save_cancel_clip').style.display = 'none'
                    document.querySelector('.sub_header').style.display = 'flex'


                    let a = cropper_box.top - image_object.top
                    let b = cropper_box.left - image_object.left
                    let canvas = new fabric.Canvas("canvas-3", {
                        width: image_object.getScaledWidth(),
                        height: image_object.getScaledHeight(),
                        clipPath: new fabric.Circle(
                            {
                                radius: cropper_box.getScaledWidth() / 2,
                                top: a,
                                left: b,
                                absolutePositioned: true
                            }
                        )
                    });
                    fabric.Image.fromURL(image_object._originalElement.currentSrc, (img) => {

                        img.scaleToWidth(image_object.getScaledWidth());
                        canvas.viewportCenterObject(img)
                        canvas.add(img)
                        canvas.renderAll()

                        let image = canvas.toDataURL({format: 'png'})
                        fabric.Image.fromURL(image, (img) => {
                            img.cropX = cropper_box.left - image_object.left
                            img.width = cropper_box.getScaledWidth()
                            img.cropY = cropper_box.top - image_object.top
                            img.height = cropper_box.getScaledHeight()

                            let shape = new fabric.Circle({
                                radius: cropper_box.getScaledWidth() / 2 - 2,
                                name: 'clip-stroke',
                                fill: null
                            })


                            img.originX = 'center'
                            img.originY = 'center'
                            shape.originX = 'center'
                            shape.originY = 'center'

                            var group = new fabric.Group([shape, img]);
                            this.canvas.add(group)
                            group.moveTo(this.canvas.orig_index)
                            this.canvas.setActiveObject(group)

                            group.left = cropper_box.left
                            group.top = cropper_box.top

                            group.original_image_width = image_object.getScaledWidth()
                            group.original_image_width_cropper_box = cropper_box.width;
                            group.original_image_height_cropper_box = cropper_box.height;
                            group.original_top_cropper_box = cropper_box.top;
                            group.original_left_cropper_box = cropper_box.left;
                            group.original_image = image_object._originalElement.currentSrc
                            group.original_radius = img.getScaledWidth() / 2
                            group.name = this.canvas.current_name

                            this.canvas.remove(image_object, cropper_box)
                            this.canvas.renderAll()
                            canvas.dispose()
                        })


                    })


                }
            }


        }

    }

    upload_and_clip() {

        // const  handleImage = async ()=>{
        // const [fileHandle] = await window.showOpenFilePicker({
        //     types: [{
        //     description: 'Images',
        //     accept: {
        //     "image/jpeg": [".jpg", ".jpeg"],
        //     "image/png": [".png"],
        //     "image/svg+xml": [".svg"],
        //     }
        //     }],
        //     })
        //     this.loaderShow()
        //     const file = await fileHandle.getFile();

        //     let reader = new FileReader();
        //     reader.readAsDataURL(file)

        //     reader.onload = () => {
        //     fabric.Image.fromURL(reader.result, (img)=>{
        //     img.name = img.type
        //     img.id = this.uniqueId()
        //     this.adding_object_style(img)

        //     this.loaderHide()


        //     })

        //     };
        // }

        // document.querySelector('.upload').addEventListener('click',handleImage)

    }

}
