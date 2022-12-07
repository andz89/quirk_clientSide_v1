import {Modal} from "./js_file/gwill.js";
import {Canvas} from "./js_file/canvas.js";
import {Open_file} from "./js_file/_open_file.js";

window.addEventListener('click', (e) => {
    console.log(e.target.id ? 'id:' + e.target.id : 'className:' + e.target.classList);
})
// ==================window height size=======================//
let header_size = document.querySelector('header').offsetHeight
let sub_header_size = document.querySelector('.sub_header').offsetHeight

document.querySelector('main').style.height = window.innerHeight - header_size - sub_header_size + 'px';

// inside canvas tools
document.querySelector('.box-tools-container').style.height = window.innerHeight - header_size - sub_header_size - 32 + 'px';


// window_height resize
window.addEventListener('resize', () => {
    let header_size = document.querySelector('header').offsetHeight
    let sub_header_size = document.querySelector('.sub_header').offsetHeight


    document.querySelector('main').style.height = window.innerHeight - header_size - sub_header_size + 'px';


})

// ==========================================================//

// ====================== canvas tools ========================//


let element = []
element.push(document.querySelector('#box-lock-objects-tools'))
element.push(document.querySelector('#box-insert-tools'))
element.push(document.querySelector('#box-properties-tools'))


document.querySelector('.btn-tools').addEventListener('click', (e) => {
    if (e.target.id == '') {
        return false
    }


    document.querySelectorAll('.btn-tools li').forEach((el) => {
        el.classList.remove('active')

    })

    e.target.classList.add('active')

    Array.from(element).forEach((el => {
        el.style.display = 'none'
    }))

    if (e.target.id === 'btn-lockObjects') {
        document.querySelector('#box-lock-objects-tools').style.display = 'block';


    }
    if (e.target.id === 'btn-insert') {
        document.querySelector('#box-insert-tools').style.display = 'block';
    }
    if (e.target.id === 'btn-properties') {

        document.querySelector('#box-properties-tools').style.display = 'block';
    }


})


// properties tab


let element_tab = []
element_tab.push(document.querySelector('.style-container'))
element_tab.push(document.querySelector('.crop-container'))
element_tab.push(document.querySelector('.canvas-contain'))
document.querySelector('.box-properties-tab ul').addEventListener('click', (e) => {
    if (e.target.id == '') {
        return false
    }
    Array.from(element_tab).forEach((el) => {
        el.style.display = 'none'
    })
    document.querySelectorAll('.box-properties-tab li').forEach((el) => {
        el.classList.remove('active')
    })

    if (e.target.id === 'crop-btn') {
        document.querySelector('.crop-container').style.display = 'block'
        document.querySelector('#crop-btn').classList.add('active')


    }
    if (e.target.id === 'style-btn') {
        document.querySelector('.style-container').style.display = 'block'
        document.querySelector('#style-btn').classList.add('active')

    }
    if (e.target.id === 'canvas-btn') {

        document.querySelector('.canvas-contain').style.display = 'flex'
        document.querySelector('#canvas-btn').classList.add('active')

    }
})


// ==================================================================//


// ===========create and select size of canvas modal===========//

const create_canvas_form_element = () => {
    return `
    <div class="createCanvasFormModal">

    <div class="size-content">
     <div>
    <label for="">Project Name<label>
    </div>
 
    <div>
    <input id="project_name" placeholder="Project Name"type="text">
    </div>
   
    <div>
    <label for="">Canvas Size<label>
    </div>

    <select id="canvas-size-select">
    <option value="A4-Landscape">A4 size / Landscape</option>
    <option value="A4-Portrait">A4 size / Portrait</option>
     
    <option value="letter-Landscape">Letter size  / Landscape</option>
    <option value="letter-Portrait">Letter size  / Portrait</option>

    <option value="2x2">2x2 in Picture</option>
    <option value="1x1">1x1 in Picture</option>
    <option value="Passport">Passport Size</option>

    <option value="custom-size">Custom size</option>
    </select>

    </div>
      <div>  </div>
    <div class="message_tips">
      <p>
      print is not available for this size.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos tempore labore animi iure, minima facere!
      </p>
    </div>

    <button id="createCanvasBtn" class="btn btn-primary">Create Project</button>
    </div>
    </div>
    `
}


let createCanvasModal = new Modal('#createCanvasModal', {
    backgroundColor: 'rgba(51, 51, 51, 0.705)',
    width: '480px',
    height: '380px',
    title: 'Create Canvas',
    showButton: '#showCreateCanvasModalBtn',
    modalHeaderColor: 'teal',
    windowClickClose: false,
    modalContentBackgroundColor: '#fff'
})

// ================create the main canvas in modal================//

createCanvasModal.bodyContent(create_canvas_form_element(), () => {

    let canvasScale = 1;
    let SCALE_FACTOR = 1.1;


    let width = 3510;
    let height = 2460;

    document.querySelector('#canvas-size-select').onchange = (e) => {
        if (e.target.value === 'A4-Landscape') {

            width = 3510;
            height = 2460;
        };

        if (e.target.value === 'A4-Portrait') {
            width = 2490;
            height = 3510;
        };

        if (e.target.value === 'letter-Landscape') {
            width = 3300;
            height = 2550;
        };

        if (e.target.value === 'letter-Portrait') {
            width = 2550;
            height = 3300;
        };

        if (e.target.value === '2x2') {
            width = 600;
            height = 600;
        };

        if (e.target.value === '1x1') {
            width = 100;
            height = 100;

        };


    }

    // custom close button
    document.querySelector('#createCanvasBtn').onclick = () => {
        document.querySelector('#createCanvasModal').style.display = 'none';
        document.querySelector('.open_and_create_project').style.display = 'none'

        let fileName = document.querySelector('#project_name').value

        if (fileName) {
            document.querySelector('#file_name').innerHTML = fileName
        } else {
            document.querySelector('#file_name').innerHTML = 'untitled'
        }

        let fileHandle;
        const canvas = (width, height) => {
            let c = document.createElement("canvas")
            c.id = "canvas"
            document.querySelector('#canvas-background').appendChild(c)
            return new fabric.Canvas("canvas", {
                width: fabric.util.parseUnit(width),
                height: fabric.util.parseUnit(height),
                backgroundColor: "#fff",
                preserveObjectStacking: true,
                // selection:false
                // clipPath: new fabric.Circle({ radius: 500 , top:1111  , left:1111 ,   originX:"center", originY:"center" })
            })
        }

        let canvas_created = canvas(width, height)
        let canvasInit = new Canvas({
            canvas: canvas_created,
            width: fabric.util.parseUnit(width),
            height: fabric.util.parseUnit(height),
            canvasScale: canvasScale,
            SCALE_FACTOR: SCALE_FACTOR,
            fileHandle: fileHandle
        })


        canvasInit.create_main_canvas()


        function fitCanvasToScreen() {
            if (width >= 3000) {
                SCALE_FACTOR = 6;
            } else if (width <= 2999 && width >= 2000) {
                SCALE_FACTOR = 3.8;
            } else if (width <= 1999 && width >= 1000) {
                SCALE_FACTOR = 2.1;
            }
            canvasScale = canvasScale / SCALE_FACTOR;
            canvas_created.setHeight(height * (1 / SCALE_FACTOR));
            canvas_created.setWidth(width * (1 / SCALE_FACTOR));
            canvas_created.setZoom(canvasScale);


            canvas_created.current_canvasScale = canvasScale
            canvas_created.current_width = canvas_created.getWidth()
            canvas_created.current_height = canvas_created.getHeight()
            canvas_created.renderAll();

        }


        fitCanvasToScreen()


        function zoomIn(selector) {
            SCALE_FACTOR = 1.1

            let zoomIn = document.querySelector(selector)
            zoomIn.addEventListener('click', () => {
                canvasScale = canvasScale * SCALE_FACTOR;
                canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
                canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
                canvas_created.setZoom(canvasScale);


                canvas_created.current_canvasScale = canvasScale
                canvas_created.current_width = canvas_created.getWidth()
                canvas_created.current_height = canvas_created.getHeight()
                canvas_created.renderAll();


            })

        }
        zoomIn("#zoomIn")


        function zoomOut(selector) {
            let zoomOut = document.querySelector(selector)
            SCALE_FACTOR = 1.1
            // let canvasScale = 1;
            zoomOut.addEventListener('click', (e) => {
                canvasScale = canvasScale / SCALE_FACTOR;
                canvas_created.setHeight(canvas_created.getHeight() * (1 / SCALE_FACTOR));
                canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
                canvas_created.setZoom(canvasScale);

                canvas_created.current_canvasScale = canvasScale
                canvas_created.current_width = canvas_created.getWidth()
                canvas_created.current_height = canvas_created.getHeight()


                canvas_created.renderAll();
            })

        }

        zoomOut("#zoomOut")


        // function lock_image(object, bollean){
        // object.lockMovementX = bollean;
        // object.lockMovementY = bollean;
        // object.lockScalingX = bollean;
        // object.lockScalingY = bollean;


        // }


        //       let activeObj

        // // //dbclick upload
        // const upload_db= (o)=>{
        // activeObj = o.target;

        //       canvas_created.add_image_width = activeObj.getScaledWidth()
        //       canvas_created.add_image_height = activeObj.getScaledHeight()
        //       canvas_created.add_image_top = activeObj.top;
        //       canvas_created.add_image_left = activeObj.left
        // if( activeObj !== null && activeObj.name === 'aa'){

        //     upload_dbclick()

        // }


        // }
        // canvas_created.on({
        // 'mouse:dblclick':upload_db,
        // })


        // let canvas_2
        //    //dbclick upload
        //    const upload_dbclick = ()=>{


        //     // document.querySelector('.upload_and_clip_container').style.display = 'flex'

        //     const canvas = (width, height) => {
        //       let c = document.querySelector("#canvas-id-picture")
        //       return new fabric.Canvas(c, {
        //         width :fabric.util.parseUnit(width),
        //         height :fabric.util.parseUnit(height),
        //         backgroundColor:"#fff",
        //         preserveObjectStacking:true,
        //         selection:false

        //       })
        //       }


        //       canvas_2 = canvas(activeObj.getScaledWidth(),  activeObj.getScaledHeight())

        //       canvas_2.on({
        //         'mouse:up': mouseUp,
        //       })
        //       handleImage(canvas_2)
        // }
        // document.querySelector('.upload-clip').addEventListener('click',()=>{
        //     handleImage(canvas_2)
        // })
        //    async function  handleImage(canvas){

        //     const [fileHandle] = await window.showOpenFilePicker({
        //       types: [{
        //       description: 'Images',
        //       accept: {
        //       "image/jpeg": [".jpg", ".jpeg"],
        //       "image/png": [".png"],
        //       "image/svg+xml": [".svg"],
        //       }
        //       }],
        //       })

        //       const file = await fileHandle.getFile();
        //       let object = canvas_2.getObjects().length
        //     if(object === 1){
        //       let obj = canvas_2.getObjects()
        //       canvas_2.remove(obj[0]);
        //       canvas_2.discardActiveObject()
        //     }
        //     document.querySelector('.upload-clip').innerHTML = 'Change image'


        //       let reader = new FileReader();
        //       reader.readAsDataURL(file)

        //       reader.onload = () => {
        //       fabric.Image.fromURL(reader.result, (img)=>{
        //       img.name = img.type
        //       img.originX ='center',
        //       img.originY ='center',

        //       canvas.viewportCenterObject(img)
        //       img.scaleToWidth(canvas.getWidth() - 20)

        //       canvas.add(img)
        //       document.querySelector('.scale-input').value = img.scaleX
        //       })

        //       };
        //     document.querySelector('.upload_and_clip_container').style.display = 'flex'

        // }


        // const mouseUp = (o)=>{
        //     let activeObj = o.target;
        //     if(activeObj === null){
        //       return false
        // }
        //     document.querySelector('.scale-input').value = activeObj.scaleX
        // }

        // document.querySelector('.scale-input').oninput = (e)=>{

        //     let object = canvas_2.getObjects()

        //     if(object[0] === undefined){
        //         return false
        //     }

        //     object[0].scaleX = e.target.value;
        //     object[0].scaleY = e.target.value;


        //     canvas_2.renderAll()

        // }

        // //close modal
        //     document.querySelector('.upload_and_clip_container .btn-danger').addEventListener('click',(e)=>{

        //       canvas_2.dispose()
        //     document.querySelector('.upload-clip').innerHTML = 'Upload image'

        //       document.querySelector('.upload_and_clip_container').style.display = 'none'

        //     })
        //     document.querySelector('.upload_and_clip_container .save').addEventListener('click', (e)=>{

        //       document.querySelector('.upload_and_clip_container').style.display = 'none'
        //       let img_canvas = canvas_2.toDataURL()
        //       fabric.Image.fromURL(img_canvas, (img)=>{
        //         img.name = img.type
        //         // img.width = canvas_created.add_image_width
        //         // img.height = canvas_created.add_image_height;
        //         img.top = canvas_created.add_image_top ;
        //         img.left = canvas_created.add_image_left ;
        //         img.originX = 'center'
        //         img.originY = 'center'
        //         img.name = 'aa'
        //         lock_image(img,true)
        //         img.setControlsVisibility({
        //           mt: false,mb: false,ml: false, mr: false,tr: false,tl: false,br: false,bl: false, mtr: false
        //         });
        //         img.stroke = 'red'
        //         canvas_created.add(img)
        //         })
        //       canvas_2.dispose()
        //       if(activeObj.type == 'image'){
        //         canvas_created.remove(activeObj)

        //       }
        //     })


    }


})


// ================= open json file and create canvas ===========================//

let file = new Open_file();

file.get_file_json()


// ================================== end ==============================//
