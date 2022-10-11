import {Modification} from "./_modification.js";

export class Menu_tools extends Modification{


    //textbox
insertText(selector){
let insert_text = document.querySelector(selector)
insert_text.addEventListener('click', ()=>{
let object = new fabric.Textbox('Your Text Here', {
textAlign: "center",
width:200,

fontSize: 30,
scaleY: 5,
scaleX: 5,
id:this.uniqueId(),
dirty :true,
})

object.name = object.type



this.adding_object_style(object);


})


}


uploadImageLocalFile(selector){

document.querySelector(selector).addEventListener('click',  async ()=>{
const [fileHandle] = await window.showOpenFilePicker({
types: [{
description: 'Images',
accept: {
"image/jpeg": [".jpg", ".jpeg"],
"image/png": [".png"],
"image/svg+xml": [".svg"],
}
}],
})
this.loaderShow()
const file = await fileHandle.getFile();

let reader = new FileReader();
reader.readAsDataURL(file)

reader.onload = () => {
fabric.Image.fromURL(reader.result, (img)=>{
img.name = img.type
img.id = this.uniqueId()
this.adding_object_style(img)

this.loaderHide()


})

};
})

}   

dragAndDrop_image(){
const dropZoneElement = document.querySelector(".drop-zone__input").closest(".canvas-container");

dropZoneElement.addEventListener("drop", (e) => {
e.preventDefault();
let file = e.dataTransfer.files
if(file[0].type == 'image/jpeg' || file[0].type == 'image/png' ){


Array.from(file).forEach((e)=>{

let reader = new FileReader();
reader.readAsDataURL(e)

reader.onload = () => {

fabric.Image.fromURL(reader.result, (img)=>{
img.name = img.type
img.id = this.uniqueId()
// img.originX ='center',
// img.originY ='center'
this.adding_object_style(img)
})

};
})
}else{
return false;
}





})

}

paste_image(){

window.addEventListener('paste', (e)=>{


var items= e.clipboardData.items;


if(items.length === 3){
if(items[1].type === 'text/html'){

return true;
}
}



//  console.log(items.length)
if(items.length === 1){
let local_image = items[0].getAsFile()

  if(local_image.type === 'image/png' || local_image.type === 'image/jpeg'){

let reader = new FileReader();
reader.readAsDataURL(local_image)

reader.onload = () => {
fabric.Image.fromURL(reader.result, (img)=>{
img.name = img.type
img.id = this.uniqueId()
this.adding_object_style(img)
})

};
}
}



// if gikan sa web brower ang file
if(items.length > 1){
let imageData = items[1].getAsFile()

    if(imageData.type === 'image/png' || imageData.type === 'image/jpeg'){
let reader = new FileReader();


reader.readAsDataURL(imageData)

reader.onload = () => {

fabric.Image.fromURL(reader.result, (img)=>{
img.name = img.type
img.id = this.uniqueId()
this.adding_object_style(img)
})

};

}else{
return false;
}
}






})
}


insert_shape(selector, cb){
let element = document.querySelector(selector)
element.onclick = ()=>{
cb()
}
}

  
async save_file_json(){

document.getElementById('save_json').addEventListener('click', async ()=>{




let json = this.canvas.toJSON([ 'borderColor','cornerColor','cornerSize','cornerStyle','transparentCorners',
"lockMovementX","lockMovementY","lockScalingX","lockScalingY","selectable","textAlign","fontFamily", "id", "name",'clip_image_src_org',"orig_url"])



if(this.fileHandle == undefined){

let suggest_name = document.querySelector('#file_name').innerHTML

this.fileHandle = await window.showSaveFilePicker({
startIn: 'desktop',
suggestedName: `${suggest_name}.json`,
types: [{
description: 'Text documents',
accept: {
'text/plain': ['.json'],
},
}],

});
var size = {w:this.width, h:this.height};
let fileHandle = {s:this.fileHandle}
let merge ={json,size, fileHandle}
let stream =  await this.fileHandle.createWritable();
await stream.write(JSON.stringify(merge))
await stream.close();
document.querySelector('#file_name').innerHTML = this.fileHandle.name.replace('.json', ' ')

}else{

var size = {w:this.width, h:this.height};
let fileHandle = {s:this.fileHandle}
let merge ={json,size, fileHandle}
let stream =  await this.fileHandle.createWritable();
await stream.write(JSON.stringify(merge))
await stream.close();


}

})


}
  

canvasBackgroundColor(){

let canvasBackground = document.querySelector('#canvas_background')
canvasBackground.oninput = (e)=>{


this.canvas.setBackgroundColor(e.target.value)
this.canvas.renderAll()
}
let transparent = document.querySelector('#transparent')
transparent.onclick = ()=>{


this.canvas.setBackgroundColor(null)
this.canvas.renderAll()


}
}

bringToFront_object(){

let bringToFront  =   document.querySelector('#bringToFront_object')
bringToFront.onclick = (e)=>{

let object = this.canvas.getActiveObject();
if(object.name === 'boxCropper'){
return false;
}
this.canvas.bringForward(object)

}
}


bringToBack_object(){
let bringToBack  =   document.querySelector('#bringToBack_object')
bringToBack.onclick = (e)=>{
let object = this.canvas.getActiveObject();

if(object.name === 'boxCropper'){
  return false;
}
this.canvas.sendBackwards(object)
}
}

   
clip(){
class Clip{
static     objectSizeOnCanvas(object, width, height){
if(width > 3000){
object.scaleToWidth(700);
}else if(height > 2000){

object.scaleToWidth(450);
}
else if(height == 800 && width == 400){
object.scaleToWidth(200);
}
else{
object.scaleToWidth(250);
}
} 

static  objectStyle(object){
object.set("borderColor","#333");
object.set("cornerColor","#17a2b8");
object.set("cornerSize",15);
object.set("cornerStyle","circle");
object.set("transparentCorners",false);
object.set("lockUniScaling",true);
}

}


document.querySelector('#clip_circle').addEventListener('click', ()=>{
let object = this.canvas.getActiveObject();

let shape_object =  new fabric.Circle({radius: 250, fill: null,stroke:'#333',strokeWidth:20,lockMovementX: true,lockMovementY: true,lockScalingX: true,lockScalingY: true,lockRotation: true,selectable: false,originY:"center",originX:"center",
});

let clipPath =  new fabric.Circle({ radius: 250 , top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
if(object === undefined){return false}//to check if object is selected
if(object.lockMovementX == true && object.lockMovementY == true){
this.alert('The object you selected is locked. Unlocked firts the object')

return false;
}
let width = 500;
let height = 500;
clip_circle(object, clipPath, shape_object,width, height)
})


document.querySelector('#clip_square').addEventListener('click', ()=>{
let object = this.canvas.getActiveObject();

let shape_object =  new fabric.Rect({width: 500,height: 500, fill: null,stroke:'#333',strokeWidth:20,lockMovementX: true,lockMovementY: true,lockScalingX: true,lockScalingY: true,lockRotation: true,selectable: false,originY:"center",originX:"center",
});

let clipPath =  new fabric.Rect({ width: 500,height: 500, top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
if(object === undefined){return false}//to check if object is selected
if(object.lockMovementX == true && object.lockMovementY == true){ return false}
let width = 500;
let height = 500;
clip_circle(object, clipPath, shape_object, width, height)

})



const clip_circle = (object, clipPath, shape_object, clip_width, clip_height) =>{


let image_to_clip;

//checking if image is new in clip
if(object.clip_image_src_org == null){
image_to_clip = object._originalElement.currentSrc;
}else{
image_to_clip = object.clip_image_src_org;
}

let width = clip_width
let height = clip_height

//function to create canvas
const canvas = (width, height) => {
let c = document.createElement("canvas")
c.id = "canvas_2"
document.querySelector('.modal-clip-content').appendChild(c)
document.querySelector('#modal-clip').style.display = "flex"

return new fabric.Canvas("canvas_2", {
width : width,
height :height,
backgroundColor:"#fff",
preserveObjectStacking:true,
perPixelTargetFind:true, 
clipPath: clipPath
})
}

//init and create canvas
let   canvas_clip = canvas(width, height)

//to check if naa naka save na canvas background color
if(object.clip_image_src_org != null){
canvas_clip.backgroundColor = object.canvas_backgroundColor
}

//create image from image selected
fabric.Image.fromURL(image_to_clip, (img)=>{
//to check if naa naka save na properties 'example: scaleY....' sa image
if(object.clip_image_src_org != null) {
img.scaleX = object.image_value_in_canvas.scaleX;
img.scaleY = object.image_value_in_canvas.scaleY;
img.top = object.image_value_in_canvas.top;
img.left = object.image_value_in_canvas.left;
Clip.objectStyle(img)
canvas_clip.add(img)
canvas_clip.sendToBack(img)
canvas_clip.renderAll()
}else{
Clip.objectStyle(img)
Clip.objectSizeOnCanvas(img, width, height)
canvas_clip.viewportCenterObject(img)
canvas_clip.add(img)
canvas_clip.sendToBack(img)
canvas_clip.renderAll()
}

})


//to check if naa naka save na properties 'example: stroke....' sa shape
let shape = shape_object
if(object.clip_image_src_org != null) {
shape.stroke = object.shape_value_in_canvas.stroke;
shape.strokeWidth = object.shape_value_in_canvas.strokeWidth;
canvas_clip.viewportCenterObject(shape)
canvas_clip.add(shape)
canvas_clip.renderAll()
}else{
canvas_clip.viewportCenterObject(shape)
canvas_clip.add(shape)
canvas_clip.renderAll()
}



//save or create new image and export to canvas
document.querySelector('#clip-save').onclick = () => {

let objects_properties_in_canvas = canvas_clip.getObjects()


let shape_value_in_canvas = {}
let image_value_in_canvas = {}
let canvas_backgroundColor =    canvas_clip.backgroundColor

objects_properties_in_canvas.forEach((obj)=>{
if(obj.type === "circle"){
shape_value_in_canvas.scaleX = obj.scaleX;
shape_value_in_canvas.scaleY = obj.scaleY;
shape_value_in_canvas.strokeWidth = obj.strokeWidth;
shape_value_in_canvas.stroke = obj.stroke;
}
if(obj.type === "rect"){
shape_value_in_canvas.scaleX = obj.scaleX;
shape_value_in_canvas.scaleY = obj.scaleY;
shape_value_in_canvas.strokeWidth = obj.strokeWidth;
shape_value_in_canvas.stroke = obj.stroke;
}
if(obj.type === 'image'){
image_value_in_canvas.scaleX = obj.scaleX;
image_value_in_canvas.scaleY = obj.scaleY;
image_value_in_canvas.top = obj.top;
image_value_in_canvas.left = obj.left;
}

})

let clip_image_url =   canvas_clip.toDataURL('png')
fabric.Image.fromURL(clip_image_url, (img)=>{

img.clip_image_src_org = image_to_clip
img.shape_value_in_canvas = shape_value_in_canvas
img.image_value_in_canvas = image_value_in_canvas
img.canvas_backgroundColor = canvas_backgroundColor
img.left = object.left;
img.top = object.top
img.name = object.type
img.id = this.uniqueId()
this.objectSizeOnCanvas(img)
this.canvas.add(img);
this.canvas.renderAll()
this.canvas.remove(this.canvas.getActiveObject());
canvas_clip.clear()
document.querySelector('.modal-clip-content').innerHTML = ''
document.querySelector('#modal-clip').style.display = "none"
})

}

document.querySelector('#clip-cancel').onclick = () =>{
canvas_clip.clear()
document.querySelector('.modal-clip-content').innerHTML = ''
document.querySelector('#modal-clip').style.display = "none"
}

document.querySelector('#clip-stroke-size').oninput = (e) =>{

shape.strokeWidth = parseInt(e.target.value) 
shape.dirty = true
shape.objectCaching = false,
canvas_clip.renderAll()

}

document.querySelector('#clip-stroke-color').oninput = (e) =>{
shape.stroke = e.target.value;
shape.objectCaching = false,
shape.dirty = true;
canvas_clip.renderAll()
}
document.querySelector('#clip-background-color').oninput = (e) =>{
canvas_clip.backgroundColor = e.target.value
canvas_clip.renderAll()
}
}

}


horizontal_object(){
document.querySelector('#horizontal').onclick = () =>{
if(this.canvas.getActiveObject().name === 'boxCropper'){
return false;
}
if(this.canvas.getActiveObject().type === 'activeSelection'){
let obj = this.canvas.getActiveObject().toGroup()
this.canvas.viewportCenterObjectH(obj)

let selected_objects = this.canvas.getActiveObject().toActiveSelection();
selected_objects.set("borderColor","#333");
selected_objects.set("cornerColor","#17a2b8");
selected_objects.set("cornerSize",15);
selected_objects.set("cornerStyle","circle");
selected_objects.set("transparentCorners",false);
selected_objects.set("lockUniScaling",true);

this.canvas.renderAll();
}else{
let object = this.canvas.getActiveObject();
this.canvas.viewportCenterObjectH(object)
this.canvas.setActiveObject(object)
}


}

}

vertical_object(){
document.querySelector('#vertical').onclick = ()=>{
if(this.canvas.getActiveObject().name === 'boxCropper'){
return false;
}
if(this.canvas.getActiveObject().type === 'activeSelection'){
let obj = this.canvas.getActiveObject().toGroup()
this.canvas.viewportCenterObjectV(obj)
let selected_objects = this.canvas.getActiveObject().toActiveSelection();
selected_objects.set("borderColor","#333");
selected_objects.set("cornerColor","#17a2b8");
selected_objects.set("cornerSize",15);
selected_objects.set("cornerStyle","circle");
selected_objects.set("transparentCorners",false);
selected_objects.set("lockUniScaling",true);

this.canvas.renderAll();
}else{
let object = this.canvas.getActiveObject();
this.canvas.viewportCenterObjectV(object)
this.canvas.setActiveObject(object)
}
}


}

center_object(){
  document.querySelector('#center').onclick = () =>{
    if(this.canvas.getActiveObject().name === 'boxCropper'){
      return false;
    }
  if(this.canvas.getActiveObject().type === 'activeSelection'){
  let obj = this.canvas.getActiveObject().toGroup()
  this.canvas.viewportCenterObject(obj)
let selected_objects = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(selected_objects)


  this.canvas.renderAll();

  }else{
  let object = this.canvas.getActiveObject();  
  this.canvas.viewportCenterObject(object)

  this.canvas.setActiveObject(object)

  }
  }

}

align_left(){
  let align_left = document.querySelector('#align_left')
  align_left.onclick = ()=> {
  let object =  this.canvas.getActiveObjects()
    if(object.length < 2){return false};

  let group_objects =  this.canvas.getActiveObject().toGroup()

  var groupWidth = group_objects.width

  object.forEach((obj)=> {

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

align_center(){
  let align_center = document.querySelector('#align_center')
  align_center.onclick = ()=> {
    
  let object =  this.canvas.getActiveObjects()
    if(object.length < 2){return false};


  let group_objects =  this.canvas.getActiveObject().toGroup()

  var groupWidth = group_objects.width

  object.forEach((obj)=> {

var itemWidth = obj.getBoundingRect().width;
obj.set({
left: (0 - itemWidth/2),
originX: 'left'
  });


  });
  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  };


}

align_right(){
  let align_right = document.querySelector('#align-right')
  align_right.onclick = ()=> {
  let object =  this.canvas.getActiveObjects()
    if(object.length < 2){return false};

  let group_objects =  this.canvas.getActiveObject().toGroup()

  var groupWidth = group_objects.width

object.forEach((obj)=> {
var itemWidth = obj.getBoundingRect().width;
obj.set({
left: (groupWidth/2 - itemWidth/2),
originX: 'center'
});
});

  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  };


}

align_top(){
  document.querySelector('#align-top').onclick = () =>{
  let object =  this.canvas.getActiveObjects()
    if(object.length < 2){return false};

  let group_objects =  this.canvas.getActiveObject().toGroup()
  var groupHeight = group_objects.height

  object.forEach((obj)=> {
  obj.set({
  top:(0 - groupHeight / 2),
  originY: 'top'
  });
  });

  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  }

}

align_middle(){

    document.querySelector('#align-middle').onclick = () =>{

    let object =  this.canvas.getActiveObjects();
 
    if(object.length < 2){return false};
    object.forEach((obj)=> {

    let  itemHeight = obj.getBoundingRect().height;

    obj.set({
    top:(0 - itemHeight/2),
    originY: 'top',
    });
    });

   
    this.canvas.renderAll();
    
    }

}

align_bottom(){
  
    document.querySelector('#align-bottom').onclick = () =>{
    let object =  this.canvas.getActiveObjects();
    if(object.length < 2){return false};

      let group_objects =  this.canvas.getActiveObject().toGroup()
    var groupHeight = group_objects.height

    object.forEach((obj)=> {
    var itemHeight = obj.getBoundingRect().height;
    obj.set({
    top:(groupHeight/2 - itemHeight/2),
    originY: 'center',
    });


    });
    let each_object = this.canvas.getActiveObject().toActiveSelection();
    this.groupObjectStyle(each_object);
    this.canvas.renderAll();
  }

}


download_as_image(){
const download_image = document.querySelector("#download-image")
download_image.onclick = () =>{
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
a.download =  `${display_name}.png`;
a.click();
document.body.removeChild(a)


this.canvas.setHeight(this.canvas.current_height);
this.canvas.setWidth(this.canvas.current_width);
this.canvas.setZoom(this.canvas.current_canvasScale); 
}
}

print() {
let printCanvas = document.querySelector('#printCanvas')
console.log(this.canvas.width)
console.log(this.width)

printCanvas.onclick = () =>{
let scaleFactor = 1;
this.canvas.setWidth(this.width * scaleFactor);
this.canvas.setHeight(this.height * scaleFactor);
this.canvas.setZoom(scaleFactor);
this.canvas.renderAll()

const dataUrl = this.canvas.toDataURL(); 

printJS({
printable: [dataUrl],
type: 'image',
imageStyle: `
display:flex; 
justify-content:center;
align-items: center;
margin: auto;
max-width: 100%; 
`
})


this.canvas.setHeight(this.canvas.current_height);
this.canvas.setWidth(this.canvas.current_width);
this.canvas.setZoom(this.canvas.current_canvasScale);     
this.canvas.renderAll();






}
}


log(){
  let log = document.querySelector('#log')
  log.onclick = () =>{
    let obj = this.canvas.getActiveObject()
    console.log(obj.orig_image)
  }
}
crop(){

  const lock_image = (object, bollean)=>{
    object.lockMovementX = bollean;
    object.lockMovementY = bollean;
    object.lockScalingX = bollean;
    object.lockScalingY = bollean;
    if(object.lockScalingY === true){
      object.selectable = false
    }else{
      object.selectable = true
    }

    }

  
    let test_crop_btn = document.querySelector('#test_crop');
    test_crop_btn.onclick = () => {
      let image_object;
     image_object = this.canvas.getActiveObject()
     
    
      if(image_object === undefined){
        return false
      }
      
      if(image_object.orig_image !== undefined){
        let a_top = image_object.original_top_cropper_box  - image_object.original_image_top
        let a_left = image_object.original_left_cropper_box - image_object.original_image_left
        let original_top_of_image = image_object.original_top_cropper_box  - a_top
        let original_left_of_image = image_object.original_left_cropper_box - a_left;


        let b_top = original_top_of_image - image_object.original_top_cropper_box
        let b_left = original_left_of_image - image_object.original_left_cropper_box

        image_object.orig_image.top =  image_object.top + b_top;
        image_object.orig_image.left = image_object.left + b_left;
        // image_object.orig_image.width = image_object.getScaledWidth()
        // image_object.orig_image.height = image_object.getScaledHeight()
        // image_object.orig_image.scaleX = image_object.scaleX
        // image_object.orig_image.scaleY = image_object.scaleY
        image_object.orig_image.scaleToWidth(image_object.getScaledWidth())
        image_object.orig_image.scaleToHeight(image_object.getScaledHeight())
     
          this.canvas.add(image_object.orig_image)
          image_object = image_object.orig_image
          this.canvas.renderAll()
          
      }
    


      // hide button in UI header
      
      let buttons = document.querySelectorAll('.dropdown')
      buttons.forEach((e)=>{
      e.style.display = 'none'
      })
      document.querySelector('.save_cancel_crop').style.display = 'flex'

      //modify selected image
      this.canvas.orig_index =  this.canvas.getObjects().indexOf(image_object)
      // this.canvas.viewportCenterObject(image_object)
      this.canvas.bringToFront(image_object)

    
    //create box cropper
      let cropper_box = new fabric.Rect({
     
        width :image_object.getScaledWidth() - 200,
        height :image_object.getScaledHeight() - 200,
        shape: 'square',
        fill: 'gray',
        stroke: 'red',
        objectCaching: false,
        excludeFromExport: true,
        left:  image_object.left + 100,
        top:image_object.top + 100,
        // originX: 'center',
        // originY:'center',
        opacity: 0.6,
        name:'boxCropper',
       

        });
     
        if(image_object.original_image !== undefined){
          cropper_box.width = image_object.original_image_width_cropper_box;
          cropper_box.height = image_object.original_image_height_cropper_box;
          cropper_box.top = image_object.top;
          cropper_box.left = image_object.left;

        }
        cropper_box.setControlsVisibility({ mtr: false })
        this.canvas.add(cropper_box)
        this.canvas.setActiveObject(cropper_box)
        this.canvas.renderAll()

        
        //create dark background when cropping mode
      let dark_background = new fabric.Rect({
        width :this.width,
        height :this.height,
        fill: '#000',
        objectCaching: false,
        excludeFromExport: true,
        opacity: 0.6,
        
        });
      
        this.canvas.add(dark_background)
        this.canvas.viewportCenterObject(dark_background)
        this.canvas.bringToFront(dark_background)
        dark_background.moveTo(this.canvas.getObjects().indexOf(image_object))
        this.canvas.renderAll()

    
        let all_objects = this.canvas.getObjects()
        all_objects.forEach((obj)=>{
          if(obj.name === 'boxCropper'){
            return false;
          }
      
          lock_image(obj, true)
        })
          
     
        //save crop
       
        document.querySelector('.save_cancel_crop #save').onclick = ()=>{

        //display header
        buttons.forEach((e)=>{
        e.style.display = 'block'
        })
        document.querySelector('.save_cancel_crop').style.display = 'none'


        let scaleFactor = 1;
        this.canvas.setWidth(this.width * scaleFactor);
        this.canvas.setHeight(this.height * scaleFactor);
        this.canvas.setZoom(scaleFactor);


        let b = image_object.toDataURL({
          width : cropper_box.getScaledWidth(),
          left : cropper_box.getBoundingRect().left - image_object.getBoundingRect().left ,
          height : cropper_box.getScaledHeight(),
          top : cropper_box.getBoundingRect().top - image_object.getBoundingRect().top,

        })
  
  
  
  
        fabric.Image.fromURL(b, (img)=>{
          this.canvas.setActiveObject(img);
          img.left = image_object.left,
          img.top = image_object.top
    
          if(image_object.orig_image == undefined){
            img.orig_image= image_object

            img.original_top_cropper_box = cropper_box.top;
            img.original_left_cropper_box = cropper_box.left;
            img.original_image_width_cropper_box = cropper_box.getScaledWidth()
            img.original_image_height_cropper_box = cropper_box.getScaledHeight()
           
            img.original_image_top = image_object.top;
            img.original_image_left = image_object.left;
         
       
     
          }else{
            img.orig_image= image_object.orig_image

          }
          
          img.objectCaching = false;
          this.canvas.add(img)
          img.moveTo(this.canvas.orig_index)
        });
          //delete objects which is not neccesary
          this.canvas.remove(image_object,b, cropper_box, dark_background);
  
          this.canvas.setHeight(this.canvas.current_height);
          this.canvas.setWidth(this.canvas.current_width);
          this.canvas.setZoom(this.canvas.current_canvasScale);   
          this.canvas.renderAll()

          let all_objects = this.canvas.getObjects()
          all_objects.forEach((obj)=>{
            if(obj.name === 'boxCropper'){
              return false;
            }
            lock_image(obj, false)
          })

      }
      //cancel crop
      document.querySelector('.save_cancel_crop #cancel').onclick = ()=>{
          //display header
          buttons.forEach((e)=>{
            e.style.display = 'block'
            })
            document.querySelector('.save_cancel_crop').style.display = 'none'
            this.canvas.remove(cropper_box, dark_background);
            image_object.moveTo(this.canvas.orig_index)
            let all_objects = this.canvas.getObjects()

            all_objects.forEach((obj)=>{
              if(obj.name === 'boxCropper'){
                return false;
              }
              lock_image(obj, false)
            })
         
            
      }

       

  }
}




}