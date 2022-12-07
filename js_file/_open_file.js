import {Canvas} from "./canvas.js";


export class Open_file{


  get_file_json(){

  document.querySelector('#open_file').addEventListener('click', async function(){
  let [fileHandle] = await window.showOpenFilePicker({
  types: [{
  description: 'Text documents',
  accept: {
  'text/json': ['.json'],
  },
  }],
  excludeAcceptAllOption: true,
  });

  let fileData = await fileHandle.getFile();

  let text = await fileData.text()
  let fileName = fileData.name
 
  let canvas_saved =  await JSON.parse(text)

run_json_file(canvas_saved, fileHandle, fileName)
document.querySelector('.open_and_create_project').style.display = 'none';
})

window.addEventListener('dragover', (e)=>{
 e = e || window.event;
e.preventDefault()
},false)
window.addEventListener('drop', (e)=>{
 e = e || window.event;
e.preventDefault()
},false)
        document.querySelectorAll(".drop-zone__input_json").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone__input_json_container");

  
    dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("drop-zone--over");
    });
    });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
  
       let file = e.dataTransfer.files
  
    if(file[0].type === 'application/json' ){

    let first_file = file[0];
    let reader = new FileReader();
    reader.readAsText(first_file)
    let fileName =  first_file.name;
    let fileHandle = null;
    reader.onload = () => {
    let canvas_saved =  JSON.parse(reader.result)
   
    run_json_file(canvas_saved, fileHandle, fileName)
    document.querySelector('.open_and_create_project').style.display = 'none';
            
        };
        
      }else{
    dropZoneElement.classList.remove("drop-zone--over");

        return false;
      }

    dropZoneElement.classList.remove("drop-zone--over");
  }); 

    })



const  run_json_file = (canvas_saved, fileHandle, fileName)=>{
  console.log(canvas_saved.json.objects[1])

  let canvasScale = 1;
  let SCALE_FACTOR = 1.1;
  let width =  canvas_saved.size.w;
  let height = canvas_saved.size.h;

document.querySelector('#file_name').innerHTML = fileName.replace('.json', '')  //file name
 
const canvas = (width, height) => {
let c = document.createElement("canvas")
c.id = "canvas"
document.querySelector('#canvas-background').appendChild(c)
return new fabric.Canvas("canvas", {
width : width,
height :height,
backgroundColor:"#fff",
preserveObjectStacking:true,
// selection:false
})
}
let canvas_created = canvas(width, height)

canvas_created.loadFromJSON(canvas_saved.json);
let obj = canvas_created.getObjects();
 obj.forEach((each)=>{
  if(each.type === 'textbox'){
    return false;
  }
  each.perPixelTargetFind = true;
  canvas_created.renderAll()
 })
let canvasInit = new Canvas({
canvas: canvas_created,
width :fabric.util.parseUnit(width),
height :fabric.util.parseUnit(height),
canvasScale: canvasScale,
SCALE_FACTOR:SCALE_FACTOR,
fileHandle: fileHandle
})
canvasInit.create_main_canvas()




function fitCanvasToScreen(){
// this.canvasScale = 1; 
if(width >= 3000){
SCALE_FACTOR =5.2;
}
else if(width <= 2999 && width >= 2000){
SCALE_FACTOR= 2.8;
}
else if(width <= 1999 && width >= 1000){
SCALE_FACTOR= 2.1;
}
else{
SCALE_FACTOR= 1.1;
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
zoomIn.addEventListener('click', ()=>{
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




function zoomOut(selector){
let zoomOut = document.querySelector(selector)
SCALE_FACTOR = 1.1

zoomOut.addEventListener('click', (e)=>{
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




function lock_image(object, bollean){
  object.lockMovementX = bollean;
  object.lockMovementY = bollean;
  object.lockScalingX = bollean;
  object.lockScalingY = bollean;
 

  }



//       let activeObj 

//   // //dbclick upload
// const upload_db= (o)=>{
// activeObj = o.target;

//       canvas_created.add_image_width = activeObj.getScaledWidth()
//       canvas_created.add_image_height = activeObj.getScaledHeight()
//       canvas_created.add_image_top = activeObj.top;
//       canvas_created.add_image_left = activeObj.left
//   if( activeObj !== null && activeObj.name === 'uploader'){
 
//     upload_dbclick()
  
    
//   }


// }

// canvas_created.on({
//   'mouse:down':upload_db,
// })


//   let canvas_2
//    //dbclick upload
//    const upload_dbclick = ()=>{


//     // document.querySelector('.upload_and_clip_container').style.display = 'flex'
 
//     const canvas_init = (width, height) => {
//       let c = document.querySelector("#canvas-id-picture")
//       return new fabric.Canvas(c, {
//         width :fabric.util.parseUnit(width),
//         height :fabric.util.parseUnit(height),
//         backgroundColor:"#fff",
//         preserveObjectStacking:true,
//         selection:false
        
//       })
//       }
  
    
//       canvas_2 = canvas_init(activeObj.getScaledWidth(),  activeObj.getScaledHeight())
  
//       canvas_2.on({
//         'mouse:up': mouseUp,
//       })
//       handleImage(canvas_2)
//   }
//   document.querySelector('.upload-clip').addEventListener('click',()=>{
//     handleImage(canvas_2)
//   })
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

//   }
 

//   const mouseUp = (o)=>{
//     let activeObj = o.target;
//     if(activeObj === null){
//       return false
//   }
//     document.querySelector('.scale-input').value = activeObj.scaleX
//   }

//   document.querySelector('.scale-input').oninput = (e)=>{
          
//     let object = canvas_2.getObjects()

//     if(object[0] === undefined){
//         return false
//     }

//     object[0].scaleX = e.target.value;
//     object[0].scaleY = e.target.value;

    
//     canvas_2.renderAll()

// }

//   //close modal
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

 


}

}


    // const dropZoneElement = document.querySelector(".drop-zone__input_json").closest(".canvas-container");
    // dropZoneElement.addEventListener("drop", (e) => {
    // e.preventDefault();
    //    let file = e.dataTransfer.files
    //   if(file[0].type == 'application/json' ){
 
          
    //   }else{
    //     return false;
    //   }
    
 
    
      

    // })