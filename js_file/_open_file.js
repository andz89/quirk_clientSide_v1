import {Canvas} from "./canvas.js";


export class Open_file {

    get_file_json() {

        let text = {
            "json": {
                "version": "5.2.0",
                "objects": [
                    {
                        "type": "textbox",
                        "version": "5.2.0",
                        "originX": "left",
                        "originY": "top",
                        "left": 1047,
                        "top": 416.64,
                        "width": 100,
                        "height": 13.56,
                        "fill": "rgb(0,0,0)",
                        "stroke": null,
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeDashOffset": 0,
                        "strokeLineJoin": "miter",
                        "strokeUniform": false,
                        "strokeMiterLimit": 4,
                        "scaleX": 12,
                        "scaleY": 12,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "skewX": 0,
                        "skewY": 0,
                        "fontFamily": "Times New Roman",
                        "fontWeight": "normal",
                        "fontSize": 12,
                        "text": "Your Text Here",
                        "underline": false,
                        "overline": false,
                        "linethrough": false,
                        "textAlign": "center",
                        "fontStyle": "normal",
                        "lineHeight": 1.16,
                        "textBackgroundColor": "",
                        "charSpacing": 0,
                        "styles": {},
                        "direction": "ltr",
                        "path": null,
                        "pathStartOffset": 0,
                        "pathSide": "left",
                        "pathAlign": "baseline",
                        "minWidth": 20,
                        "splitByGrapheme": true,
                        "borderColor": "#333",
                        "cornerColor": "#17a2b8",
                        "cornerSize": 13,
                        "cornerStyle": "circle",
                        "transparentCorners": false,
                        "_controlsVisibility": {
                            "mtr": false
                        },
                        "lockMovementX": false,
                        "lockMovementY": false,
                        "lockScalingX": false,
                        "lockScalingY": false,
                        "selectable": true,
                        "id": "202211715185015169",
                        "name": "textbox"
                    }, {
                        "type": "rect",
                        "version": "5.2.0",
                        "originX": "center",
                        "originY": "center",
                        "left": 836.18,
                        "top": 990.62,
                        "width": 238.1,
                        "height": 228.72,
                        "fill": "gray",
                        "stroke": null,
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeDashOffset": 0,
                        "strokeLineJoin": "miter",
                        "strokeUniform": false,
                        "strokeMiterLimit": 4,
                        "scaleX": 3.25,
                        "scaleY": 3.25,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "skewX": 0,
                        "skewY": 0,
                        "rx": 0,
                        "ry": 0,
                        "borderColor": "#333",
                        "cornerColor": "#17a2b8",
                        "cornerSize": 6,
                        "cornerStyle": "circle",
                        "transparentCorners": false,
                        "_controlsVisibility": {
                            "mtr": false
                        },
                        "lockMovementX": false,
                        "lockMovementY": false,
                        "lockScalingX": false,
                        "lockScalingY": false,
                        "selectable": true,
                        "id": "2022117152563155630",
                        "name": "aa"
                    }
                ],
                "background": "#fff"
            },
            "size": {
                "w": 3510,
                "h": 2460
            },
            "fileHandle": {
                "s": {}
            }
        }


        let canvas_saved = text
        let fileName = 'project.json'


        const run_json_file = (canvas_saved, fileName) => {


            let canvasScale = 1;
            let SCALE_FACTOR = 1.1;
            let width = canvas_saved.size.w;
            let height = canvas_saved.size.h;

            document.querySelector('#file_name').innerHTML = fileName.replace('.json', '') // file name

            const canvas = (width, height) => {
                let c = document.createElement("canvas")
                c.id = "canvas"
                document.querySelector('#canvas-background').appendChild(c)
                return new fabric.Canvas("canvas", {
                    width: width,
                    height: height,
                    backgroundColor: "#fff",
                    preserveObjectStacking: true,
                    // selection:false
                    willReadFrequently: true
                })
            }
            let canvas_created = canvas(width, height)

            canvas_created.loadFromJSON(canvas_saved.json);
            let obj = canvas_created.getObjects();
            obj.forEach((each) => {
                if (each.type === 'textbox') {
                    return false;
                }
                each.perPixelTargetFind = true;
                canvas_created.renderAll()
            })
            let canvasInit = new Canvas({
                canvas: canvas_created,
                width: fabric.util.parseUnit(width),
                height: fabric.util.parseUnit(height),
                canvasScale: canvasScale,
                SCALE_FACTOR: SCALE_FACTOR

            })
            canvasInit.create_main_canvas()


            function fitCanvasToScreen() { // this.canvasScale = 1;
                if (width >= 3000) {
                    SCALE_FACTOR = 5.2;
                } else if (width <= 2999 && width >= 2000) {
                    SCALE_FACTOR = 2.8;
                } else if (width <= 1999 && width >= 1000) {
                    SCALE_FACTOR = 2.1;
                } else {
                    SCALE_FACTOR = 1.1;
                } canvasScale = canvasScale / SCALE_FACTOR;
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


            function lock_image(object, bollean) {
                object.lockMovementX = bollean;
                object.lockMovementY = bollean;
                object.lockScalingX = bollean;
                object.lockScalingY = bollean;


            }


        };
        run_json_file(canvas_saved, fileName)

    }

}
