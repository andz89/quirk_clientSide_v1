import {Modification} from "./_modification.js";

export class Right_tools extends Modification {


    fontSize(selector) {
        let fontSize = document.querySelector(selector)
        fontSize.oninput = (e) => {
            let object = this.canvas.getActiveObject();
            if (object) {

                if (object.getSelectedText() != "") {

                    object.setSelectionStyles({fontSize: e.target.value})
                    // fontSizeinput = e.target.value
                    object.dirty = true;
                    this.canvas.renderAll()
                    // object.set({fontSize: e.target.value })

                } else {

                    object.removeStyle('fontSize');
                    object.set({fontSize: e.target.value})
                    object.dirty = true;
                    this.canvas.renderAll()
                }

            }
        }
    }

    // background color
    backgroundColor() {
        let shapeFill = document.querySelector('#shapeFill')
        shapeFill.oninput = (e) => {
            let object = this.canvas.getActiveObject();
            if (object == null) {
                return false
            }

            // many objects
            if (object.type === "activeSelection" && object !== undefined) {
                object._objects.forEach((obj) => {
                    obj.type == 'textbox' ? obj.set("backgroundColor", e.target.value) : obj.set('fill', e.target.value)
                    obj.dirty = true;
                    this.canvas.renderAll()
                })
            }


            // one object
            if (object !== undefined && object.type !== "activeSelection") {

                if (object.type !== "textbox") {
                    object.set('fill', e.target.value)

                } else {
                    if (object.getSelectedText() == "") {
                        object.removeStyle('textBackgroundColor');
                        object.set("backgroundColor", e.target.value)

                    } else {
                        object.setSelectionStyles({textBackgroundColor: e.target.value})

                    }

                } object.dirty = true;
                this.canvas.renderAll()

            }

        }


    }

    // remove background color
    remove_fill_color() {
        let removeColor = document.querySelector('#removeColor')
        removeColor.onclick = () => {
            let object = this.canvas.getActiveObject()

            if (object !== undefined && object.type === "activeSelection") {
                object._objects.forEach((e) => {
                    if (e.type !== 'textbox') {
                        e.set('fill', null)

                    } else {
                        e.set("backgroundColor", null)

                    }

                    e.dirty = true;
                    this.canvas.renderAll()
                })

            }

            if (object !== undefined && object.type !== "activeSelection") {

                if (object.type !== "textbox") {
                    object.set('fill', null)


                } else {

                    object.removeStyle('textBackgroundColor');
                    object.set("backgroundColor", null)

                } object.dirty = true;
                this.canvas.renderAll()

            }

        }
    }

    // font color change
    fontColor(selector) {

        let color = document.querySelector(selector)
        color.addEventListener('input', (e) => {


            let object = this.canvas.getActiveObject();

            if (object != undefined) {

                if (window.getSelection().toString() != "") {
                    object.setSelectionStyles({fill: e.target.value})
                    canvas.renderAll()
                } else if (window.getSelection().toString() == "") {

                    object.removeStyle('fill');
                    object.set('fill', e.target.value)
                    object.dirty = true;
                    this.canvas.renderAll()
                }
            }
        })
    }

    bold_text() {

        document.querySelector('#bold').onclick = () => {
            let object = this.canvas.getActiveObject();

            if (object && object.bold === undefined) {

                if (object.getSelectedText() == "") { // empty
                    object.removeStyle('fontWeight')
                    object.set({fontWeight: "bold"})
                    object.dirty = true;
                    this.canvas.renderAll()
                    bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
                    object.bold = true
                } else {
                    object.setSelectionStyles({fontWeight: "bold"})
                    bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
                    object.bold = true
                    object.dirty = true;
                    this.canvas.renderAll()
                }
            } else {

                if (object.getSelectedText() == "") { // empty
                    object.removeStyle('fontWeight')

                    // to check if some text is normal and bold
                    if (object.fontWeight == 'normal') {
                        object.set({fontWeight: "bold"})
                        this.canvas.renderAll()
                    } else {
                        object.set({fontWeight: "normal"})
                        object.dirty = true;
                        this.canvas.renderAll()
                        bold.style.backgroundColor = ''
                        object.bold = undefined
                    }

                } else {
                    object.setSelectionStyles({fontWeight: "normal"})
                    object.dirty = true;
                    bold.style.backgroundColor = ''
                    this.canvas.renderAll()
                    object.bold = undefined
                }


            }

        }

    }

    italic_text() {
        let italic = document.querySelector('#italic')
        italic.onclick = () => {

            let object = this.canvas.getActiveObject();

            if (object.italic === undefined) {

                if (object.getSelectedText() == "") {
                    object.removeStyle('fontStyle')

                    object.set({fontStyle: 'italic'})

                    object.dirty = true;
                    this.canvas.renderAll()
                    object.italic = true;
                    italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
                } else {

                    object.setSelectionStyles({fontStyle: 'italic'})
                    object.dirty = true;
                    this.canvas.renderAll()
                    object.italic = true;
                    italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
                }
            } else {


                if (object.getSelectedText() == "") {
                    object.removeStyle('fontStyle')

                    // to check if some text is normal and italic
                    if (object.fontStyle == 'normal') {
                        object.set({fontStyle: "italic"})
                        this.canvas.renderAll()
                    } else {
                        object.set({fontStyle: ""})
                        object.dirty = true;
                        this.canvas.renderAll()
                        italic.style.backgroundColor = ''
                        object.italic = undefined;
                    }

                } else {

                    object.setSelectionStyles({fontStyle: "normal"})

                    object.dirty = true;
                    this.canvas.renderAll()
                    object.italic = undefined;
                    italic.style.backgroundColor = ''
                }


            }


        }
    }

    stroke_color() {


        let strokeColor = document.querySelector('#strokeColor');
        strokeColor.oninput = (e) => {
            let object = this.canvas.getActiveObject();
            object.stroke = e.target.value;
            if (object.type == 'rect' && object.strokeWidth == 1) {
                object.strokeWidth = 30
                document.querySelector('#stroke_width').value = object.strokeWidth
            }

            if (object.type == 'image' && object.strokeWidth == 0) {

                object.strokeWidth = 10
                document.querySelector('#strokeWidth').value = object.strokeWidth
            }

            // clip stroke
            if (object.type == 'group') {
                let a = object._objects[0]
                if (a.name == 'clip-stroke') {
                    a.set('stroke', e.target.value);

                }

            }

            object.objectCaching = false,
            object.dirty = true;
            object.paintFirst = "stroke";
            this.canvas.renderAll()

        }
    }
    stroke_width() {
        let strokeWidth = document.querySelector('#strokeWidth');
        strokeWidth.oninput = (e) => {

            let value = e.target.value
            if (e.target.value == '') {
                value = 0
            }
            let object = this.canvas.getActiveObject();

            if (object.stroke == null) {
                object.stroke = '#207e7e';
            }

            if (object.type !== "activeSelection") {
                object.strokeWidth = parseInt(value, 10);
                object.objectCaching = false,
                object.dirty = true;
                object.paintFirst = "stroke";


            } else { // more objects selected
                object._objects.forEach((e) => {
                    if (e.stroke == null) {
                        e.stroke = '#207e7e';
                    }
                    e.strokeWidth = parseInt(value, 10);
                    e.objectCaching = false,
                    e.dirty = true;
                    e.paintFirst = "stroke";
                })

            }

            // clip stroke
            // console.log( object._objects[0])
            if (object.type == 'group') {
                if (object._objects[0].name == 'clip-stroke') {
                    console.log(object._objects[0].name)
                    let a = object._objects[0]
                    a.strokeWidth = parseInt(value, 10);
                    a.objectCaching = false,
                    a.dirty = true;
                    a.paintFirst = "stroke";


                    this.canvas.renderAll()
                }

            }


            this.canvas.renderAll()


        }
    }


    opacity() {
        let opacity = document.querySelector('#opacity')
        opacity.oninput = (e) => {

            let object = this.canvas.getActiveObject();

            if (! object) {
                return false;
            }
            if (e.target.value == 10) {
                object.opacity = 1;
            }
            if (e.target.value == 9) {
                object.opacity = 0.9;
            }
            if (e.target.value == 8) {
                object.opacity = 0.8;
            }
            if (e.target.value == 7) {
                object.opacity = 0.7;
            }
            if (e.target.value == 6) {
                object.opacity = 0.6;
            }
            if (e.target.value == 5) {
                object.opacity = 0.5;
            }
            if (e.target.value == 4) {
                object.opacity = 0.4;
            }
            if (e.target.value == 3) {
                object.opacity = 0.3;
            }
            if (e.target.value == 2) {
                object.opacity = 0.2;
            }
            if (e.target.value == 1) {
                object.opacity = 0.1;
            }
            if (e.target.value == 0) {
                object.opacity = 0;
            }


            this.canvas.renderAll()
        }
    }

    duplicate() {
        document.querySelector('#duplicate').onclick = (e) => {

            let object = this.canvas.getActiveObject()

            object.clone((cloned) => {
                let newCloned = cloned
                newCloned.clone((clonedObj) => {
                    this.canvas.discardActiveObject();
                    clonedObj.set({
                        left: clonedObj.left + 10,
                        top: clonedObj.top + 10
                    });

                    if (clonedObj.type == 'group') {

                        clonedObj._objects.forEach((e) => {
                            e.name = e.type
                            e.id = this.uniqueId();
                        })

                    };

                    if (clonedObj.type === 'activeSelection') { // active selection needs a reference to the canvas.
                        clonedObj.canvas = this.canvas;
                        clonedObj.forEachObject((obj) => {

                            obj.name = object.type
                            obj.id = this.uniqueId();
                            this.groupObjectStyle(obj)
                            this.canvas.add(obj);

                        });
                        // this should solve the unselectability
                    } else {
                        clonedObj.name = object.type
                        clonedObj.id = this.uniqueId(),
                        this.canvas.add(clonedObj);
                    } newCloned.top += 10;
                    newCloned.left += 10;
                    clonedObj.setCoords();
                    // objectStyle(clonedObj)
                    this.canvas.setActiveObject(clonedObj);
                    this.canvas.requestRenderAll();

                });
            })

            // clone again, so you can do multiple copies.


        }

    }

    lock() {
        let lock = document.querySelector('#lock')
        lock.onclick = () => {
            let objects = this.canvas.getActiveObjects();

            if (objects.length > 1) {

                let lockObjects = []

                objects.forEach((obj) => {
                    lockObjects.push({'id': obj.id, 'name': obj.name})


                    obj.selectable = false;
                    obj.set("lockMovementX", true)
                    obj.set("lockMovementY", true)
                    // obj.set("lockScalingX", true)
                    obj.set("lockScalingY", true)
                    obj.set("lockRotation", true)
                    this.canvas.discardActiveObject()
                    this.canvas.renderAll();
                    obj.setControlsVisibility({
                        mt: false,
                        mb: false,
                        ml: false,
                        mr: false,
                        tr: false,
                        tl: false,
                        br: false,
                        bl: false,
                        mtr: false
                    });
                })
                this.display_lockObjects(lockObjects)


            } else {
                let object = this.canvas.getActiveObject();

                let lockObjects = {}
                lockObjects.id = object.id;
                lockObjects.name = object.name;

                this.display_lockObjects(lockObjects)


                this.canvas.discardActiveObject();
                object.selectable = true;
                object.set("lockMovementX", true)
                object.set("lockMovementY", true)
                // object.set("lockScalingX", true)
                object.set("lockScalingY", true)
                object.set("lockRotation", true)
                this.canvas.renderAll();

                object.setControlsVisibility({
                    mt: false,
                    mb: false,
                    // ml: false,
                    // mr: false,
                    tr: false,
                    tl: false,
                    br: false,
                    bl: false,
                    mtr: false
                });
            }

        }

    }

    group_objects() {
        let group = document.querySelector('#group')
        group.onclick = () => {
            let obj = this.canvas.getActiveObject().toGroup();
            obj.name = obj.type;
            obj.id = this.uniqueId();
            this.groupObjectStyle(obj)


        }
    }

    ungroup_objects() {
        let ungroup = document.querySelector('#ungroup')
        ungroup.onclick = () => {
            let object = this.canvas.getActiveObject()
            if (! object._objects) {
                return false
            }
            if (object.type == 'activeSelection') {
                return false
            }


            if (object.lockMovementX == true) {
                return false;
            } // to check if object is lock

            let a = object.toActiveSelection();
            this.groupObjectStyle(a)

        }
    }

    textAlign_left() {
        document.querySelector('#alignLeftText')
        alignLeftText.onclick = () => {
            console.log(window.getSelection().toString());
            let object = this.canvas.getActiveObject();
            if (! object) {
                return false;
            }
            object.set("textAlign", "left")

            object.dirty = true;
            this.canvas.renderAll()
        }

    }

    textAlign_center() {
        let alignCenterText = document.querySelector('#alignCenterText')
        alignCenterText.onclick = () => {
            let object = this.canvas.getActiveObject();
            if (! object) {
                return false
            }
            object.set("textAlign", "center")
            object.dirty = true;
            this.canvas.renderAll()


        }
    }

    textAlign_right() {
        let alignRightText = document.querySelector('#alignRightText')
        alignRightText.onclick = () => {
            let object = this.canvas.getActiveObject();
            if (! object) {
                return false;
            }
            object.set("textAlign", "right")
            this.canvas.setActiveObject(object)
            object.dirty = true;
            this.canvas.renderAll()


        }
    }

    fontStyle() { // fonts
        var fonts = [
            "Roboto",
            'Scope One',
            "Zen Kurenaido",
            'Rubik Mono One',
            'Annie Use Your Telescope',
            'Dancing Script',
            'Work Sans'
        ];

        fonts.unshift('Times New Roman');
        // Populate the fontFamily select
        let fontFamilySelect = document.querySelector('#fontFamilySelect')
        fonts.forEach((font) => {
            var option = document.createElement('option');
            option.innerHTML = font;
            option.value = font;
            option.style.fontFamily = font;
            option.style.fontSize = "1rem";

            fontFamilySelect.appendChild(option);
        });

        // Apply selected font on change
        fontFamilySelect.onchange = (e) => {
            let object = this.canvas.getActiveObject()
            if (e.target.value !== 'Times New Roman') {
                loadAndUse(e.target.value);
                console.log('1')
            } else {
                object.set("fontFamily", e.target.value);
                this.canvas.renderAll();


            }
        };

        const loadAndUse = (font) => {
            let object = this.canvas.getActiveObject()

            var myfont = new FontFaceObserver(font)
            myfont.load().then(() => { // when font is loaded, use it.

                object.set("fontFamily", font);
                this.canvas.renderAll();
            }).catch((e) => {

                this.alert('unstable internet connection. cannot load google fonts')


            });
        }
    }


    undo() {

        let mods = 0


        let undo_btn = document.querySelector("#undo")
        undo_btn.onclick = () => {

            if (mods < this.canvas.state.length) {
                this.canvas.clear().renderAll();
                this.canvas.loadFromJSON(this.canvas.state[this.canvas.state.length - 1]);

                this.canvas.state.pop();
                this.canvas.renderAll();


            }


            this.canvas.lockObjects = []
            let objects = this.canvas.getObjects()
            let lock_objects = objects.filter((each_object) => {
                if (each_object.name === 'standard_crop') {
                    this.canvas.remove(each_object)
                    console.log(each_object)
                    this.canvas.renderAll()
                }
                if (each_object.lockMovementX === true && each_object.lockMovementY === true && each_object.name !== 'canvas_stroke') {
                    return each_object
                }
            })

            lock_objects.forEach((object) => {

                let lockObjects = {}
                lockObjects.id = object.id;
                lockObjects.name = object.name;
                this.canvas.lockObjects.push(lockObjects);
            })

            document.querySelector('.lock-object-container').innerHTML = ''

            this.canvas.lockObjects.forEach((e) => {
                this.display_lockObjects(e)
            })


        }
    }

    scale_object() {

        document.querySelector('#scale-image').oninput = (e) => {

            let object = this.canvas.getActiveObject()

            if (object === undefined) {
                return false
            }

            object.scaleX = e.target.value;
            object.scaleY = e.target.value;

            // object.originY = 'center'
            // object.originY = 'center'
            this.canvas.renderAll()

        }
    }


}
