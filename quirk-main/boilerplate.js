
  function uploadImageLocalFile(selector){

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
    // const arrayBuffer = await file.arrayBuffer();
    // const arrayBufferView = new Uint8Array(arrayBuffer);
    // const blob = new Blob([arrayBufferView], { type: file });
    // const urlCreator = window.URL || window.webkitURL;
    // const mediaUrl =  urlCreator.createObjectURL(blob);

    console.log(file)
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
        fabric.Image.fromURL(reader.result, (img)=>{
        img.name = img.type

        this.adding_object_style(img)
        // new_image_element.remove()
        this.loaderHide()
        })

        };

    // let new_image_element = document.createElement('img')
    //  new_image_element.src = mediaUrl;
    //  document.querySelector('body').appendChild(new_image_element)
    //  new_image_element.style.display = 'none';
    // setTimeout(()=>{
    //     let dataURL =   this.getDataUrl(new_image_element)
    //     fabric.Image.fromURL(dataURL, (img)=>{
    //     img.name = img.type
      
    //     this.adding_object_style(img)
    //     new_image_element.remove()
    //      this.loaderHide()
    // })
    
    // }, 100);

    })
    
}   

function crop_image_init(){
    document.querySelector('#crop_init').addEventListener('click', ()=>{

    let image = this.canvas.getActiveObject()
    if(image.type !== 'image'){return false;}
    this.loaderShow()
    let top = image.top;
    let left = image.left;

    let crop_image_element =   document.createElement('img')

    if(image.orig_url === undefined){
    crop_image_element.src = image._originalElement.currentSrc;

    document.querySelector(".modal-content-cropper").appendChild(crop_image_element)
    setTimeout(() => {
    document.querySelector(".modal-cropper").style.visibility = "visible"
    this.loaderHide()

    })


    let cropper = new Cropper(crop_image_element);

    this.crop_image(cropper, image._originalElement.currentSrc,  top, left)
    this.crop_canceled()
    }else{

    crop_image_element.src = image.orig_url;

    document.querySelector(".modal-content-cropper").appendChild(crop_image_element)

    let cropper = new Cropper(crop_image_element);


    setTimeout(() => {
    document.querySelector(".modal-cropper").style.visibility = "visible"

    cropper.setCropBoxData(image.cropBoxData)
    this.loaderHide()
    }, 1000);

    this.crop_image(cropper, image.orig_url, top, left)
    this.crop_canceled()
    }


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
              this.canvas.remove(image_object)
              if(image_object.original_image !== undefined){
            
                fabric.Image.fromURL(b, (img)=>{
                  this.canvas.setActiveObject(img);
                  img.left = this.canvas.cancel_image_left,
                  img.top = this.canvas.cancel_image_top
                  // img.width = cropper_box.getScaledWidth()
                  if(img.original_image == undefined){
                    console.log('1')
                    img.original_top_cropper_box = cropper_box.top;
                    img.original_left_cropper_box = cropper_box.left;
                    img.original_image_width_cropper_box = cropper_box.getScaledWidth()
                    img.original_image_height_cropper_box = cropper_box.getScaledHeight()
                    img.original_image = image_object._originalElement.currentSrc;
                    img.original_image_top = image_object.top;
                    img.original_image_left = image_object.left;
                    img.original_image_height = image_object._originalElement.height;
                    img.original_image_width = image_object._originalElement.width;
                    img.original_image_scaleX = image_object.scaleX;
                    img.original_image_scaleY = image_object.scaleY
                    }
                  img.objectCaching = false;
                  this.canvas.add(img)
                  img.moveTo(this.canvas.orig_index)
                });
  
              }
              // this.canvas.remove(image_object)
              // fabric.Image.fromURL(this.canvas.cancel_image._originalElement.currentSrc, (img)=>{
              // img.left = this.canvas.cancel_image_left,
              // img.top = this.canvas.cancel_image_top,
              // img.width = this.canvas.cancel_image.width
              // img.scaleX = this.canvas.cancel_image.scaleX
              // img.scaleY = this.canvas.cancel_image.scaleY
              
  
              // this.canvas.setActiveObject(img);
  
              //   this.canvas.add(img)
              //   this.canvas.renderAll()
              // })
              
        }
        imitate(){
          // var canvas = new fabric.Canvas('c');
        let evented = false;
        let rect1 = new fabric.Rect({
          left: 50,
          top: 60,
          fill: 'blue',
          width: 150,
          height: 150,
        });
        
        let rect2 = new fabric.Rect({
          left: 210,
          top: 60,
          fill: 'magenta',
          width: 150,
          height: 150,
          selectable: false
        });
        this.canvas.add(rect1,rect2);
        
        function rect1MouseDown(option){
         this.mousesDownLeft = this.left;
         this.mousesDownTop = this.top;
         this.rect2Left = rect2.left;
         this.rect2Top = rect2.top;
        }
        
        function rect1Move(option){
         rect2.left = this.rect2Left+ this.left - this.mousesDownLeft ;
         rect2.top = this.rect2Top+ this.top- this.mousesDownTop;
         rect2.setCoords();
        }
        
        function rect1Rotating(options){
         rect2.set('angle',this.angle);
        
        }
        function rect1Scale(options){
          console.log('scalling')
          rect2.set('fill',this.fill);
         
         }
        
        register();
        function register(){
         if(evented) return;
         rect1.on('moving', rect1Move);
         rect1.on('mousedown', rect1MouseDown);
         rect1.on('rotating', rect1Rotating);
         rect1.on('modified', rect1Scale);
        
         evented = true;
        }
        function unRegister(){
         rect1.off('moving');
         rect1.off('mousedown');
         rect2.on('rotating');
         evented = false;
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
        
          
            let crop_btn = document.querySelector('#crop-image');
            crop_btn.onclick = () => {
              
            let image_object = this.canvas.getActiveObject()
           
            this.canvas.orig_index =  this.canvas.getObjects().indexOf(image_object)//get the current index of target object
              
              if(image_object === undefined){//return false if no selected object
                return false
              }
              if(image_object.type !== 'image'){
                return false
              }
        
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
              opacity: 0.6,
              name:'boxCropper',
            
              });
             
              // if image has  save previous image this will execute
              if(image_object.original_image !== undefined){
                cropper_box.width = image_object.getScaledWidth() ;
                cropper_box.height = image_object.getScaledHeight();
                cropper_box.top = image_object.top;
                cropper_box.left = image_object.left ;
              }
                cropper_box.setControlsVisibility({ mtr: false })
                this.canvas.setActiveObject(cropper_box)
                this.canvas.add(cropper_box)
                this.canvas.renderAll()
        
              
              //   cropper_box.on(
              //     // 'mouseup', scaleCropper,
              //     'moving', scaleCropper,
                
              //   )
              
               
              //   function scaleCropper(){
              //  let a = image_object.left + image_object.getScaledWidth()
              //   let b = cropper_box.left + cropper_box.getScaledWidth()
              //   if(b > a){
        
              //    let c = b - a;
             
              //    cropper_box.left = cropper_box.left - c;
              //   }
        
                
              //   }
        
        
               
           
             
        
              // hide button in UI header
              
              let buttons = document.querySelectorAll('.dropdown')
              buttons.forEach((e)=>{
                 e.style.display = 'none'
              })
        
              //lock all objects
              document.querySelector('.save_cancel_crop').style.display = 'flex'
              let all_objects = this.canvas.getObjects()
              all_objects.forEach((obj)=>{
                if(obj.name === 'boxCropper'){
                  return false;
                }
                lock_image(obj, true)
              })
        
              if(image_object.original_image !== undefined){
        
                let image_display;
                fabric.Image.fromURL(image_object.original_image, (img)=>{
        
                let a_top = image_object.original_top_cropper_box  - image_object.original_image_top
                let a_left = image_object.original_left_cropper_box - image_object.original_image_left
                let original_top_of_image = image_object.original_top_cropper_box  - a_top
                let original_left_of_image = image_object.original_left_cropper_box - a_left;
                let b_top = original_top_of_image - image_object.original_top_cropper_box
                let b_left = original_left_of_image - image_object.original_left_cropper_box
        
                img.top =  image_object.top + b_top ;
                img.left = image_object.left + b_left - this.canvas.sobra_sa_left;
                this.canvas.sobra_sa_left = 0
                this.canvas.orig_width_of_display_image = image_object.width
                let def_w = image_object.original_image_width - image_object.width
                image_object.width = def_w + image_object.width
                img.scaleToWidth(image_object.getScaledWidth())//s
        
                img.original_image = image_object.original_image//save the original image
                
                this.canvas.add(img)
              
                image_object.visible = false//hide image_object or selected object
        
                // get the created object to display
                let last_object = this.canvas.getObjects()
                let index = last_object.length
                image_display = last_object[index -1]
        
                this.canvas.bringToFront(image_display)//bring created image to front
        
                this.canvas.bringToFront(cropper_box)//bring the cropper box to top of other objects
        
                lock_image(image_display, true)//lock the new created object
        
                this.canvas.renderAll()
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
        
                let b = image_display.toDataURL({
                  width : cropper_box.getScaledWidth(),
                  left : cropper_box.getBoundingRect().left - image_display.getBoundingRect().left ,
                  height : cropper_box.getScaledHeight(),
                  top : cropper_box.getBoundingRect().top - image_display.getBoundingRect().top,
                })
        
                fabric.Image.fromURL(b, (img)=>{
                  
                  img.left = cropper_box.left,
                  img.top = cropper_box.top
                  img.original_top_cropper_box = cropper_box.top;
                  img.original_left_cropper_box = cropper_box.left;
                  img.original_image_width_cropper_box = cropper_box.getScaledWidth()
                  img.original_image_height_cropper_box = cropper_box.getScaledHeight()
                  img.original_image = image_display._originalElement.currentSrc;
                  img.original_image_top = image_display.top;
                  img.original_image_left = image_display.left;
        
                  img.original_image_height = image_display.getScaledHeight();
                  img.original_image_width = image_display.getScaledWidth();
                  img.original_image_scaleX = image_display.scaleX;
                  img.original_image_scaleY = image_display.scaleY
                  img.copy_object = image_object
        
                  this.canvas.setActiveObject(img);
                  img.objectCaching = false;
                  this.canvas.add(img)
                  img.moveTo(this.canvas.orig_index)
                });
        
                  //delete objects which is not neccesary
                  this.canvas.remove(image_display,b, cropper_box, image_object);
                  
                  this.returnToOriginalSize()
        
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
                this.canvas.remove(cropper_box);
                image_object.moveTo(this.canvas.orig_index)
                let all_objects = this.canvas.getObjects()
        
                all_objects.forEach((obj)=>{
                if(obj.name === 'boxCropper'){
                 return false;
                }
        
                lock_image(obj, false)
              })
                // image_original
                this.canvas.remove(image_display)
                image_object.visible = true
                image_object.width = this.canvas.orig_width_of_display_image
                image_object.moveTo(this.canvas.orig_index)
                this.canvas.setActiveObject(image_object)
        
              }
              }else{
        
        //===================permero pag crop sa image=======================//
        
        this.canvas.bringToFront(image_object)//bring created image to front
        this.canvas.bringToFront(cropper_box)//bring the cropper box to top of other objects
        
        
            const cancelCrop = ()=>{
              //display header
        buttons.forEach((e)=>{
          e.style.display = 'block'
          })
          document.querySelector('.save_cancel_crop').style.display = 'none'
          
          this.canvas.remove(cropper_box);
          
          image_object.moveTo(this.canvas.orig_index)
          
          this.canvas.setActiveObject(image_object);
          
          this.canvas.renderAll()
          let all_objects = this.canvas.getObjects()
          
          all_objects.forEach((obj)=>{
          if(obj.name === 'boxCropper'){
          return false;
          }
          
          lock_image(obj, false)
        })
            }    
              
        
        
        //save crop
          document.querySelector('.save_cancel_crop #save').onclick = ()=>{
        
        //display header
        buttons.forEach((e)=>{e.style.display = 'block'})
        document.querySelector('.save_cancel_crop').style.display = 'none'
        this.canvas.getObjects().forEach((obj)=>{lock_image(obj, false)})
        
        //kung nagsugod  ang cropper sa gawas ng object sa bottom
        //bottom
        var a = cropper_box.top - image_object.top
        if(a > image_object.getScaledHeight()){
        this.returnToOriginalSize()
        this.canvas.remove(cropper_box)
        return false
        }
        //kung nagsugod  ang trimmer sa gawas ng object sa right
        //width
        var a = cropper_box.left - image_object.left
        if(a  > image_object.getScaledWidth()){
        this.returnToOriginalSize()
        this.canvas.remove(cropper_box)
        return false
        }
        //kung ang tumoy mo sa trimmer box ing abot ba sa sugdanan ng object sa left
        //hint start
        var a =  cropper_box.left + cropper_box.getScaledWidth()
        if(a < image_object.left){
        this.returnToOriginalSize()
        this.canvas.remove(cropper_box)
        return false
        }
        
        //exist in left or left part of object
        var ay = cropper_box.left 
        var by = image_object.left 
        
        var a =  cropper_box.left - image_object.left
        let b =  cropper_box.left + cropper_box.getScaledWidth()
        let sobra_sa_left = 0
        let ang_nabilin = b - a
        if(ay < by){
        let c = cropper_box.getScaledWidth() - cropper_box.width
        this.canvas.exist_in_width = c
        console.log('runiing')
        }else{
        
        this.canvas.exist_in_width = 0
        }
        
        if(ang_nabilin > b){
        sobra_sa_left =  ang_nabilin - b  - this.canvas.exist_in_width
        
        }else{
        a = 0
        
        }
        
        this.canvas.sobra_sa_left = sobra_sa_left + this.canvas.exist_in_width
        
        //exist in right or right part of object
        var h = cropper_box.left + cropper_box.getScaledWidth()
        var i = image_object.left + image_object.getScaledWidth()
        
        let d =  cropper_box.left -image_object.left
        let e =  d + cropper_box.getScaledWidth()
        if(h > i){
        let f = cropper_box.getScaledWidth() - cropper_box.width
        this.canvas.exist_in_right = f
        
        }else{
          this.canvas.exist_in_right = 0 
        }
        let g
        if(e > image_object.getScaledWidth()){
        g =  e -image_object.getScaledWidth() - this.canvas.exist_in_right
        }else{
        g = 0
        }
        
        
        let scaleFactor = 1;
        this.canvas.setWidth(this.width * scaleFactor);
        this.canvas.setHeight(this.height * scaleFactor);
        this.canvas.setZoom(scaleFactor);
        
        
        let image_cropped = image_object.toDataURL({
        left : cropper_box.getBoundingRect().left - image_object.getBoundingRect().left - a ,
        top : cropper_box.getBoundingRect().top - image_object.getBoundingRect().top,
        width : cropper_box.getScaledWidth() - sobra_sa_left - this.canvas.exist_in_width - g- this.canvas.exist_in_right,
        height : cropper_box.getScaledHeight()
        
        })
        
        
        
        
            fabric.Image.fromURL(image_cropped , (img)=>{
              
              img.left = cropper_box.left + this.canvas.sobra_sa_left 
              img.top = cropper_box.top
          
                img.original_top_cropper_box = cropper_box.top;
                img.original_left_cropper_box = cropper_box.left;
                img.original_image_width_cropper_box = cropper_box.getScaledWidth()
                img.original_image_height_cropper_box = cropper_box.getScaledHeight()
                img.original_image = image_object._originalElement.currentSrc;
                img.original_image_top = image_object.top;
                img.original_image_left = image_object.left;
                
                img.original_image_height = image_object.getScaledHeight();
                img.original_image_width = image_object.getScaledWidth();
                img.original_image_scaleX = image_object.scaleX;
                img.original_image_scaleY = image_object.scaleY
                img.copy_object = image_object
                  
                
              img.objectCaching = false;
              this.canvas.setActiveObject(img);
        
              this.canvas.add(img)
              img.moveTo(this.canvas.orig_index)
             
            });
              //delete objects which is not neccesary
              this.canvas.remove(image_object,image_cropped, cropper_box);
        
              this.returnToOriginalSize()
            
            
        
          }
        //cancel crop
        document.querySelector('.save_cancel_crop #cancel').onclick = ()=>{cancelCrop()}   
              }
        
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

  
    let crop_btn = document.querySelector('#crop-image');
    crop_btn.onclick = () => {
      
    let image_object = this.canvas.getActiveObject()
   
    this.canvas.orig_index =  this.canvas.getObjects().indexOf(image_object)//get the current index of target object
      
      if(image_object === undefined){//return false if no selected object
        return false
      }
      if(image_object.type !== 'image'){
        return false
      }

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
      opacity: 0.6,
      name:'boxCropper',
    
      });
     
      // if image has  save previous image this will execute
      if(image_object.original_image !== undefined){
        cropper_box.width = image_object.getScaledWidth() ;
        cropper_box.height = image_object.getScaledHeight();
        cropper_box.top = image_object.top;
        cropper_box.left = image_object.left ;
      }
        cropper_box.setControlsVisibility({ mtr: false })
        this.canvas.setActiveObject(cropper_box)
        this.canvas.add(cropper_box)
        this.canvas.renderAll()


      // hide button in UI header
      
      let buttons = document.querySelectorAll('.dropdown')
      buttons.forEach((e)=>{
         e.style.display = 'none'
      })

      //lock all objects
      document.querySelector('.save_cancel_crop').style.display = 'flex'
      let all_objects = this.canvas.getObjects()
      all_objects.forEach((obj)=>{
        if(obj.name === 'boxCropper'){
          return false;
        }
        lock_image(obj, true)
      })

      if(image_object.original_image !== undefined){

        let image_display;
        fabric.Image.fromURL(image_object.original_image, (img)=>{

        let a_top = image_object.original_top_cropper_box  - image_object.original_image_top
        let a_left = image_object.original_left_cropper_box - image_object.original_image_left
        let original_top_of_image = image_object.original_top_cropper_box  - a_top
        let original_left_of_image = image_object.original_left_cropper_box - a_left;
        let b_top = original_top_of_image - image_object.original_top_cropper_box
        let b_left = original_left_of_image - image_object.original_left_cropper_box

        img.top =  image_object.top + b_top  - this.canvas.exist_top;
        img.left = image_object.left + b_left - this.canvas.exist_left;
        this.canvas.sobra_sa_left = 0
        this.canvas.orig_width_of_display_image = image_object.width
        let def_w = image_object.original_image_width - image_object.width
        image_object.width = def_w + image_object.width
        img.scaleToWidth(image_object.getScaledWidth())//s

        img.original_image = image_object.original_image//save the original image
        
        this.canvas.add(img)
      
        image_object.visible = false//hide image_object or selected object

        // get the created object to display
        let last_object = this.canvas.getObjects()
        let index = last_object.length
        image_display = last_object[index -1]

        this.canvas.bringToFront(image_display)//bring created image to front

        this.canvas.bringToFront(cropper_box)//bring the cropper box to top of other objects

        lock_image(image_display, true)//lock the new created object

        this.canvas.renderAll()
        }) 
      
        
        //save crop
        document.querySelector('.save_cancel_crop #save').onclick = ()=>{
        //display header
        buttons.forEach((e)=>{
          e.style.display = 'block'
        })

          document.querySelector('.save_cancel_crop').style.display = 'none'

                  
        // no target bottom
        var a = cropper_box.top - image_display.top
        if(a > image_display.getScaledHeight()){

        this.canvas.remove(cropper_box)
        return false
        }
        // no target right
        var a = cropper_box.left - image_display.left
        if(a  > image_display.getScaledWidth()){

        this.canvas.remove(cropper_box)
        return false
        }
        //no target left
        var a =  cropper_box.left + cropper_box.getScaledWidth()
        if(a < image_display.left){
        // this.returnToOriginalSize()
        this.canvas.remove(cropper_box)
        return false
        }



      //exist in left
      if(image_display.left > cropper_box.left){
        this.canvas.exist_left = image_display.left - cropper_box.left
      }else{
        this.canvas.exist_left = 0
      }

      //exist in right
      var a  = image_display.left + image_display.getScaledWidth()
      var b  = cropper_box.left + cropper_box.getScaledWidth()

      if(b > a){
        this.canvas.exist_right = b - a
      }else{
        this.canvas.exist_right = 0
      }

      //exist in top
      if(image_display.top > cropper_box.top){
      console.log('exist')
      this.canvas.exist_top = image_display.top - cropper_box.top
      }else{
        this.canvas.exist_top = 0
      }

      //exist in bottom
      var a = image_display.top + image_display.getScaledHeight()
      var b = cropper_box.top + cropper_box.getScaledHeight()
      if(b > a){

      this.canvas.exist_bottom = b - a
      }else{
        this.canvas.exist_bottom = 0
      }

        // let c = document.createElement('canvas')
        // c.id = 'canvas-crop';
        // document.querySelector('#template-canvas').innerHTML = ''
        // document.querySelector('#template-canvas').append(c)
        let canvas = new fabric.Canvas("canvas-crop", {
        width: image_display.getScaledWidth(),
        height: image_display.getScaledHeight(),
        });

        

        fabric.Image.fromURL(image_display.original_image, (img)=>{

          img.scaleToWidth(image_display.getScaledWidth())
          canvas.viewportCenterObject(img)
          canvas.add(img)
          canvas.renderAll()

        let image_cropped =  canvas.toDataURL({
          left : cropper_box.left - image_display.left +  this.canvas.exist_left ,
          top : cropper_box.top - image_display.top + this.canvas.exist_top ,
          width : cropper_box.getScaledWidth() -  this.canvas.exist_left - this.canvas.exist_right,
          height : cropper_box.getScaledHeight() - this.canvas.exist_top - this.canvas.exist_bottom,
          format: 'png',
        })
    
          
       
        fabric.Image.fromURL(image_cropped, (img)=>{
          
          img.left = cropper_box.left +  this.canvas.exist_left  
          img.top = cropper_box.top + this.canvas.exist_top

          img.original_top_cropper_box = cropper_box.top;
          img.original_left_cropper_box = cropper_box.left;
          img.original_image_width_cropper_box = cropper_box.getScaledWidth()
          img.original_image_height_cropper_box = cropper_box.getScaledHeight()
          img.original_image = image_display._originalElement.currentSrc;
          img.original_image_top = image_display.top;
          img.original_image_left = image_display.left;

          img.original_image_height = image_display.getScaledHeight();
          img.original_image_width = image_display.getScaledWidth();
          img.original_image_scaleX = image_display.scaleX;
          img.original_image_scaleY = image_display.scaleY
          img.copy_object = image_object

          this.canvas.setActiveObject(img);
          // img.objectCaching = false;
          this.canvas.add(img)
          img.moveTo(this.canvas.orig_index)
          //delete objects which is not neccesary
          this.canvas.remove(image_display,b, cropper_box, image_object);
        });
         canvas.dispose()
        })


        
          
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
        this.canvas.remove(cropper_box);
        image_object.moveTo(this.canvas.orig_index)
        let all_objects = this.canvas.getObjects()

        all_objects.forEach((obj)=>{
        if(obj.name === 'boxCropper'){
         return false;
        }

        lock_image(obj, false)
      })
        // image_original
        this.canvas.remove(image_display)
        image_object.visible = true
        image_object.width = this.canvas.orig_width_of_display_image
        image_object.moveTo(this.canvas.orig_index)
        this.canvas.setActiveObject(image_object)

        }
      }else{

//=================== permero pag crop sa image =======================//

this.canvas.bringToFront(image_object)//bring created image to front
this.canvas.bringToFront(cropper_box)//bring the cropper box to top of other objects  
 
//save crop
  document.querySelector('.save_cancel_crop #save').onclick = ()=>{

//display header
buttons.forEach((e)=>{e.style.display = 'block'})
document.querySelector('.save_cancel_crop').style.display = 'none'
this.canvas.getObjects().forEach((obj)=>{lock_image(obj, false)})


// no target bottom
var a = cropper_box.top - image_object.top
if(a > image_object.getScaledHeight()){

this.canvas.remove(cropper_box)
return false
}
// no target right
var a = cropper_box.left - image_object.left
if(a  > image_object.getScaledWidth()){

this.canvas.remove(cropper_box)
return false
}
//no target left
var a =  cropper_box.left + cropper_box.getScaledWidth()
if(a < image_object.left){
// this.returnToOriginalSize()
this.canvas.remove(cropper_box)
return false
}



//exist in left
if(image_object.left > cropper_box.left){
  this.canvas.exist_left = image_object.left - cropper_box.left
}else{
  this.canvas.exist_left = 0
}

//exist in right
var a  = image_object.left + image_object.getScaledWidth()
var b  = cropper_box.left + cropper_box.getScaledWidth()

if(b > a){
  this.canvas.exist_right = b - a
}else{
  this.canvas.exist_right = 0
}

//exist in top
if(image_object.top > cropper_box.top){
console.log('exist')
this.canvas.exist_top = image_object.top - cropper_box.top
}else{
  this.canvas.exist_top = 0
}

//exist in bottom
var a = image_object.top + image_object.getScaledHeight()
var b = cropper_box.top + cropper_box.getScaledHeight()
if(b > a){

this.canvas.exist_bottom = b - a
}else{
  this.canvas.exist_bottom = 0
}




let canvas = new fabric.Canvas("canvas-3", {
  width: image_object.getScaledWidth(),
  height: image_object.getScaledHeight(),

});
    

    fabric.Image.fromURL(image_object._originalElement.currentSrc, (img)=>{
      img.scaleToWidth(image_object.getScaledWidth());
      canvas.viewportCenterObject(img)
      canvas.add(img)
      canvas.renderAll()

    let image_cropped =  canvas.toDataURL({
      left : cropper_box.left - image_object.left +  this.canvas.exist_left ,
      top : cropper_box.top - image_object.top + this.canvas.exist_top ,
      width : cropper_box.getScaledWidth() -  this.canvas.exist_left - this.canvas.exist_right,
      height : cropper_box.getScaledHeight() - this.canvas.exist_top - this.canvas.exist_bottom,
      format: 'png',
    })

    fabric.Image.fromURL(image_cropped , (img)=>{
      
      img.left = cropper_box.left +  this.canvas.exist_left  
      img.top = cropper_box.top + this.canvas.exist_top
  
        img.original_top_cropper_box = cropper_box.top;
        img.original_left_cropper_box = cropper_box.left;
        img.original_image_width_cropper_box = cropper_box.getScaledWidth()
        img.original_image_height_cropper_box = cropper_box.getScaledHeight()
        img.original_image = image_object._originalElement.currentSrc;
        img.original_image_top = image_object.top;
        img.original_image_left = image_object.left;
        
        img.original_image_height = image_object.getScaledHeight();
        img.original_image_width = image_object.getScaledWidth();
        img.original_image_scaleX = image_object.scaleX;
        img.original_image_scaleY = image_object.scaleY
        img.copy_object = image_object
          
        
      img.objectCaching = false;
      this.canvas.setActiveObject(img);

      this.canvas.add(img)
      img.moveTo(this.canvas.orig_index)
  
      this.canvas.remove(image_object, cropper_box);
    });

     canvas.dispose()

    })

 

  }
//cancel crop
document.querySelector('.save_cancel_crop #cancel').onclick = ()=>{cancelCrop()}   
      }

  }
}
path(){
  let path =  document.querySelector('#path')
  path.onclick= ()=>{
   let object = this.canvas.getActiveObject()
   var clipPath = new fabric.Rect({width: 600, height: 600, top: -200, left: -200,originX: 'center', originY: 'center'});
   // var clipPath2 = new fabric.Circle({ radius: 100, top: 0, left: 0 });
   // var clipPath3 = new fabric.Circle({ radius: 100, top: 0, left: -200 });
   // var clipPath4 = new fabric.Circle({ radius: 100, top: -200, left: 0 });
   // var g = new fabric.Group([clipPath, clipPath2, clipPath3, clipPath4]);
   clipPath.inverted = true;
   
   fabric.Image.fromURL(object._originalElement.currentSrc, (img)=> {
     img.clipPath = clipPath;
     console.log(img.clipPath.width)
     img.scaleToWidth(object.getScaledWidth());
     this.canvas.add(img);
     img.name = 'sample'
   });
 
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