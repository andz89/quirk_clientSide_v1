import { Modification } from "./_modification.js";


export class Utilities extends Modification{


     deleteObjects(){
         
    window.addEventListener("keydown", (e)=>{

    if(e.key === "Delete"){

    let objects = this.canvas.getActiveObjects()
      
    if(objects.length > 1){
    
    objects.forEach((obj)=>{
     
    this.canvas.remove(obj);
    this.canvas.discardActiveObject()
    })
    }else{

      if(this.canvas.getActiveObject().name === 'boxCropper'){
        return false;
      }
      if(this.canvas.getActiveObject().name === 'uploader'){
        return false;
      }
      if(this.canvas.getActiveObject().name === 'content'){
        return false;
      }
      if(this.canvas.getActiveObject().name === 'text-content'){
        return false;
      }
    this.canvas.remove(this.canvas.getActiveObject());

    }
    }

    })
    }


    discardActiveObject(){
 
    window.onclick = (e)=>{
   
      if(e.target.classList.contains('upper-canvas')){
         //sub header area
    // document.querySelector('.canvas-options').style.display = "none"
   document.querySelector('.align_canvas_container').style.display = "none"

      }
    if(e.target.id  === 'canvas-background' ){

      //sub header area
    // document.querySelector('.canvas-options').style.display = "none"
    document.querySelector('.align_canvas_container').style.display = "none"
   


    this.canvas.discardActiveObject()
    this.canvas.renderAll()
    }


    }




    }

 
    canvasOn(){
       const  select_object =(o)=>{
    var activeObj = o.selected[0];
 



    //bold text
    let bold =  document.querySelector('#bold')
    if(activeObj.type == "textbox" && activeObj.fontWeight === 'bold'){bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'}
    if(activeObj.type == "textbox" && activeObj.fontWeight === 'normal'){bold.style.backgroundColor = ''}
    if(activeObj.type !== "textbox"){bold.style.backgroundColor = ''}
    //-------------------------------------//

    //italic text
    let italic =  document.querySelector('#italic')
    if(activeObj.type == "textbox" && activeObj.fontStyle === 'italic'){italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'}
    if(activeObj.type == "textbox" && activeObj.fontStyle === 'normal'){italic.style.backgroundColor = ''}
    if(activeObj.type !== "textbox"){italic.style.backgroundColor = ''}
    //-------------------------------------//


    // fontSize 
    if(activeObj.type == "textbox"){
        document.querySelector("#fontSize").value = activeObj.fontSize
    }else{
       document.querySelector("#fontSize").value = ''
    }
    // -------------------------------------//
    
  //stroke_width
  document.querySelector('#strokeWidth').value = activeObj.strokeWidth
  //-------------------------------------//




      //opacity
    // let opacity =  document.querySelector('#opacity')

    // if(activeObj.opacity === 1){
    // opacity.value = 10
    // }
    // if(activeObj.opacity === 0.9){
    // opacity.value = 9
    // }
    // if(activeObj.opacity === 0.8){
    // opacity.value = 8
    // }
    // if(activeObj.opacity === 0.7){
    // opacity.value = 7
    // }
    // if(activeObj.opacity === 0.6){
    // opacity.value = 6
    // }
    // if(activeObj.opacity === 0.5){
    // opacity.value = 5
    // }
    // if(activeObj.opacity === 0.4){
    // opacity.value = 4
    // }
    // if(activeObj.opacity === 0.3){
    // opacity.value = 3
    // }
    // if(activeObj.opacity === 0.2){
    // opacity.value = 2
    // }
    //  if(activeObj.opacity === 0.1){
    // opacity.value = 1
    // }
    //  if(activeObj.opacity === 0){
    // opacity.value = 0
    // }
    //-------------------------------------//

   if(activeObj.group  !== undefined){

     let group = activeObj.group
    group.set("borderColor","#333");
    group.set("cornerColor","#17a2b8");
    group.set("cornerSize",12);
    group.set("cornerStyle","circle");
    group.set("transparentCorners",false);
    group.set("lockUniScaling",true);
    group.setControlsVisibility({ mtr: false })
    }
    



    activeObj.setControlsVisibility({ mtr: false })
    activeObj.set("borderColor","#333");
    activeObj.set("cornerColor","#17a2b8");
  
    activeObj.set("cornerStyle","circle");
    activeObj.set("transparentCorners",false);
    activeObj.set("lockUniScaling",true);
 
    //cropper box style
    if(activeObj.name == 'boxCropper'){
      activeObj.set("borderColor",'red');
      activeObj.set(" borderScaleFactor",2);
      activeObj.set("borderDashArray",[10]);
      activeObj.set('cornerStyle', 'rectangle')
      activeObj.setControlsVisibility({mtr: false})
      activeObj.set('cornerSize', 12)
      activeObj.set('cornerColor', "#333")
    }

    //cropper box style
    if(activeObj.name == 'boxCropper-clip'){
      activeObj.set("borderColor",'red');
      activeObj.set(" borderScaleFactor",2);
      activeObj.set("borderDashArray",[10]);
      activeObj.set('cornerStyle', 'rectangle')
      activeObj.setControlsVisibility({mt: false,mb: false,ml: false, mr: false, mtr: false})
      activeObj.set('cornerSize', 12)
      activeObj.set('cornerColor', "#333")
    }

   



    }


  
    const modify_object =(o)=>{
      var activeObj = o.target;
      if(activeObj.name === 'boxCropper'){
        return false;
      }
    this.updateModifications(true)
    }

    //font size change when scaling
    const scale_object = (o)=>{

      let activeObj = o.target;
      
      if(activeObj.type === 'textbox'){
        this.canvas.textbox_width_init = activeObj.getScaledWidth()
        let a = activeObj.fontSize * activeObj.scaleX
        activeObj.fontSize = a
        activeObj.width  = this.canvas.textbox_width_init
      }
      //resize corner size when scaling
      if(activeObj.getScaledWidth() < 600){
        activeObj.set("cornerSize",6);
       }else{
        activeObj.set("cornerSize",12);
 
       }
       
  

    }
    //font size change when scaling
    const mouseUp_object = (o)=>{
      let activeObj = o.target;
      if( activeObj !== null && activeObj.type === 'textbox'){
        document.querySelector("#fontSize").value = activeObj.fontSize
      }

     
    }
   


    //set the cropper always active
    const  mouseDown_object = (o)=>{
      let activeObj = o.target;

    if(activeObj == null){
        return false
      }
     if(activeObj.name == 'boxCropper-clip'){
    this.canvas.current_cropper_width = activeObj.getScaledWidth()
      this.canvas.current_cropper_height = activeObj.getScaledHeight()
      this.canvas.current_cropper_top = activeObj.top
      this.canvas.current_cropper_left = activeObj.left
     }
      
      if(activeObj.name == 'gray_background'){
      let cropper_object = this.canvas.getObjects()
      this.canvas.setActiveObject(cropper_object[cropper_object.length - 1])
      }
      if(activeObj.name == 'image_selected_for_crop' || activeObj.name == 'image_selected_for_clip'){
        let cropper_object = this.canvas.getObjects()
        this.canvas.setActiveObject(cropper_object[cropper_object.length - 1])
      }
     
    
    }

    //scaling boxCropper-clip //mouse up event
    const scale_clip_cropper_box =(o)=>{

      let activeObj = o.target;
      if(activeObj == null){
        return false
      }

    if(activeObj.name == 'boxCropper-clip'){

       let cropper_object = this.canvas.getObjects()
      let image =  cropper_object[cropper_object.length - 2]
      
   if(image.top > activeObj.top 
    // || image.left > activeObj.left ||
    //        image.left + image.getScaledWidth() < activeObj.left + activeObj.getScaledWidth()||
    //        image.top + image.getScaledHeight() < activeObj.top + activeObj.getScaledHeight()

           ){//labaw ang cropper sa taas   
            
            console.log("sobra")
   
      //     let image_left
      //     let image_width
      //    if(image.left > activeObj.left){
      //     image_left = image.left
      //     image_width = image.left - activeObj.left
      
      //    }else{
      //      image_left = this.canvas.current_cropper_left
      //     image_width = 0
      

      //    }
      //    let image_top
      //    let image_height
      //    if(image.top > activeObj.top){
      //     image_top = image.top
      //     image_height = image.top - activeObj.top

      //    }else{
      //      image_top = this.canvas.current_cropper_top
      //     image_height = 0

      //    }
      //    let sobra_right
      //     if(image.left + image.getScaledWidth() < activeObj.left + activeObj.getScaledWidth()){
      //       let a = image.left + image.getScaledWidth() - activeObj.left + activeObj.getScaledWidth()
      //   sobra_right = a
      //     }else{
      //       sobra_right = 0
      //     }
      //      let sobra_bottom
      //     if(image.top + image.getScaledHeight() < activeObj.top + activeObj.getScaledHeight()){
      //       let a = image.top + image.getScaledHeight() - activeObj.top + activeObj.getScaledHeight()
      //   sobra_bottom = a
      //   console.log('lol')
      //     }else{
      //       sobra_bottom = 0

      //     }
     
      //   this.canvas.remove(activeObj)
      //   this.canvas.discardActiveObject(activeObj)
      //   let cropper_box = new fabric.Circle({
      //   shape: 'square',
      //   fill: '#333',
      //   objectCaching: false,
      //   excludeFromExport: true,
      //   opacity: 0.5,
      //   name:'boxCropper-clip',
      //   radius:this.canvas.current_cropper_width /2 + image_width/2 + image_height/2 + sobra_right/2 + sobra_bottom/2 - 40,
      //   top: image_top + 30,
      //   left: image_left +  30
      //   });
       
      //   this.canvas.setActiveObject(cropper_box)
      //   this.canvas.add(cropper_box)
      //   this.canvas.renderAll()
       

     
      //  if(cropper_box.getScaledWidth()  > image.getScaledWidth()){
      //    cropper_box.radius = image.getScaledWidth() /2 - 40
      //    cropper_box.width = image.getScaledWidth()- 40
      //    cropper_box.height = image.getScaledHeight()- 40
      //    cropper_box.top = image.top + 30
      //    cropper_box.left = image.left+ 30
      //    console.log('7777777777')
      //    this.canvas.renderAll()
      //  }
      }
       
        // if(image.left > activeObj.left){//labaw ang cropper sa left
       
        // }
        //  if(image.left + image.getScaledWidth() < activeObj.left + activeObj.getScaledWidth()){//labaw ang cropper sa right
        // // let a =  image.left + image.getScaledWidth() - activeObj.left + activeObj.getScaledWidth()
        //           activeObj.scaleToWidth(image.getScaledWidth())

     
        //    this.canvas.viewportCenterObject(activeObj)


        //   // activeObj.width = activeObj.getScaledWidth() - a
        //   // activeObj.radius =activeObj.width / 2

        // }
      }
    }

    this.canvas.on({
    'selection:updated':select_object,
    'selection:created':select_object,
    'object:modified': modify_object,
   'object:scaling': scale_object,
   'mouse:up': mouseUp_object,
  'object:scaling': scale_clip_cropper_box,
  'mouse:down': mouseDown_object,


    });
  
    }


    //arrow movement
arrowMovement(){
var Direction = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3
};

fabric.util.addListener(document.body, 'keydown',(options)=> {
  if (options.repeat) {
    return;
  }
  let object = this.canvas.getActiveObject()
  if(object){
    if(object.lockMovementX !== true){
      var key = options.which || options.keyCode; // key detection
    if (key === 37) { // handle Left key
     this. moveSelected(Direction.LEFT);
    } else if (key === 38) { // handle Up key
      this.moveSelected(Direction.UP);
    } else if (key === 39) { // handle Right key
      this.moveSelected(Direction.RIGHT);
    } else if (key === 40) { // handle Down key
     this.moveSelected(Direction.DOWN);
    }
    }
  }

  
});

}


load_UI_lock_objects(){
          
  setTimeout(() => {
  let objects =  this.canvas.getObjects()
    let lock_objects = objects.filter((each_object)=>{
    if(each_object.lockMovementX === true && each_object.lockMovementY === true && each_object.name !== 'canvas_stroke'){ 
    return each_object
    }
    })
  if(lock_objects.length === 0){return false}
  this.display_lockObjects(lock_objects)
  },1000)
}

//drop menu
files_modal_button(element){

document.querySelector(element).onclick = (e)=>{

let el = document.querySelector(`${element} .dropdown-content`)

  if(el.style.display == 'block'){

    el.style.display = 'none'

  }else{
    el.style.display = 'block'


  }






}
window.onclick = (e)=>{

if (!e.target.matches('.dropbtn')) {

var dropdown_insert = document.querySelector(`.insert-shape .dropdown-content`);
if (dropdown_insert.style.display == 'block') {
  dropdown_insert.style.display = 'none';


}
let dropdown_subHeader = document.querySelector(`.sub_header .dropdown-content`)
if (dropdown_subHeader.style.display == 'block') {
  dropdown_subHeader.style.display = 'none';


}
let clip_menu = document.querySelector(`#clip-to .dropdown-content`)
if (clip_menu.style.display == 'block') {
  clip_menu.style.display = 'none';


}
}
}



document.querySelector('.align_canvas').addEventListener('click', ()=>{

if(document.querySelector('.align_canvas_container').style.display === 'block'){
  document.querySelector('.align_canvas_container').style.display = 'none'
}else{
  document.querySelector('.align_canvas_container').style.display = 'block'

}

})






}









}