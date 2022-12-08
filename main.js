import {Modal} from "./js_file/gwill.js";
import {Canvas} from "./js_file/canvas.js";
import {Open_file} from "./js_file/_open_file.js";

window.addEventListener('click', (e) => {
    console.log('id:' + e.target.id);
    console.log('className:' + e.target.className);

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

let file = new Open_file();

file.get_file_json()
