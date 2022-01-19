const sortingArea = document.getElementById("sorting_blocks");
const sortingAreaWidth = parseInt(window.getComputedStyle(sortingArea).getPropertyValue("width"));
const sortingAreaHeight = parseInt(window.getComputedStyle(sortingArea).getPropertyValue("height"));

let selectedSortingTechnique = "bubble";
let array = [];
let size = 6;
let blockWidth = 0;
let animation = [];
let barColor = "#6616e7";
let animationSpeed = 50;
let isSorted = false;

function createArray(){
    animation = [];
    array= [];
    isSorted = false;
    
    while (sortingArea.firstChild) {
        sortingArea.removeChild(sortingArea.firstChild);
    }

    size = document.getElementById("size_bar").value;
    animationSpeed = size < 40 ? 1000 : size < 80 ? 300 : size < 120 ? 250 : size < 150 ? 150 : size < 200 ? 100: size < 250 ? 50 : size < 300 ? 50 : 10;
    blockWidth = (sortingAreaWidth - 100)/size;

    for(let i=0;i<size;i++){
        array[i] = Math.floor(Math.random()*500);
    }

    console.log("unsorted : " + array);
    console.log("size :"+size);

    for(let i=0;i<size;i++){
        let block = document.createElement("div");
        block.id = i;
        block.style.height = array[i] + "px";
        block.style.width = blockWidth + "px";
        block.style.marginLeft = "3px";
        block.style.backgroundColor = barColor;
        sortingArea.appendChild(block);
    }
}

function whichSort() {
    let ele = document.getElementsByName('technique');      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            selectedSortingTechnique = ele[i].value + "Sort";
            console.log(selectedSortingTechnique);
            ele[i].parentElement.classList.add("active_one");
        } else {
            ele[i].parentElement.classList.remove("active_one");
        }
    }
}

function disableButtons(){
    let whichBtns = document.querySelectorAll(".which_btn");
    let speedSize = document.querySelector(".size");
    let newArr = document.querySelector(".new_arr_btn");
    let startBtn =  document.querySelector(".start_btn");
    let disabledColor = "grey";

    whichBtns.forEach(btn => {
        btn.style.pointerEvents = "none";
        btn.style.color = disabledColor;
    });

    speedSize.style.pointerEvents = "none";
    speedSize.style.color = disabledColor;

    newArr.style.pointerEvents = "none";
    newArr.style.color = disabledColor;

    startBtn.style.pointerEvents = "none";
    startBtn.style.color = disabledColor;
}

function activateButtons(){
    let whichBtns = document.querySelectorAll(".which_btn");
    let speedSize = document.querySelector(".size");
    let newArr = document.querySelector(".new_arr_btn");
    let startBtn =  document.querySelector(".start_btn");
    let activatedColor = "#fff";

    whichBtns.forEach(btn => {
        btn.style.pointerEvents = "all";
        btn.style.color = activatedColor;
    });

    speedSize.style.pointerEvents = "all";
    speedSize.style.color = activatedColor;

    newArr.style.pointerEvents = "all";
    newArr.style.color = activatedColor;

    startBtn.style.pointerEvents = "all";
    startBtn.style.color = activatedColor;
}


whichSort();
createArray();

function start(){

    if(!isSorted){
        switch(selectedSortingTechnique) {
            case "bubbleSort":
              bubbleSort();
              bubbleSortAnimation();
              break;
    
            case "mergeSort":
                mergeSort(array,0,size-1);
                mergeSortAnimation();
                break;
    
            case "quickSort":
                quickSort(array,0,size-1);
                quickSortAnimation();
                break;
            
            case "selectionSort":
                selectionSort(array,size);
                selectionSortAnimation();
                console.log(array);
                break;
    
            case "insertionSort":
                insertionSort();
                insertionSortAnimation();
                console.log("sorted:" + array);
                break;
    
            default:
              bubbleSort();
              bubbleSortAnimation();
          }
    }


    setTimeout(console.log(animation), 10000);
}
