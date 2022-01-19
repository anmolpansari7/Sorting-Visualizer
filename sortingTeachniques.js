 // ------------------------------- BubbleSort -------------------------------//

function swap(i,j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function bubbleSort(){
    for(let i=0;i<size;i++){
        for(let j=0;j<size-i-1;j++){
            let obj = {
                comparing: true,
                index: [j,j+1],
                weights: [array[j], array[j+1]]
            }

            animation.push(obj);

            if(array[j] > array[j+1]){
                
                obj = {
                    comparing: false,
                    index: [j,j+1],
                    weights: [array[j],array[j+1]]
                }

                animation.push(obj);
                swap(j,j+1);
            }
        }
    }

    console.log(array);  
}

function bubbleSortAnimation(){
    disableButtons();
    let l = 0;
    animation.forEach((obj,idx,animation) => {
        let block1 = document.getElementById(obj.index[0]);
        let block2 = document.getElementById(obj.index[1]);
        l+= 0.5;

        // Checking if the blocks are either comparing or Swapping
        if(obj.comparing){
            setTimeout(() =>{
                block1.style.backgroundColor = "red";
                block2.style.backgroundColor = "red";
                
                setTimeout(() =>{
                    block1.style.backgroundColor = barColor;
                    block2.style.backgroundColor = barColor;
                }, animationSpeed);

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }

            }, animationSpeed*l);
        } else{
            setTimeout(() =>{
                block1.style.height = obj.weights[1] + "px";
                block2.style.height = obj.weights[0] + "px";

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }
            }, animationSpeed*l);
        }
    });
}

// ------------------------------- mergeSort -------------------------------//
function merge(array,l,mid,r){

    let n1 = mid - l + 1;
    let n2 = r - mid;

    let a = [];
    let b = [];

    for(let i=0;i<n1;i++){
        a[i] = array[l+i];
    }

    for(let j=0;j<n2;j++){
        b[j] = array[mid+j+1];
    }

    let i=0, j=0, k=l;

    while(i<n1 && j<n2){
        let obj;
        
        obj = {
            comparing: true,
            index: [k, mid+j+1],
            weight: [array[l+i], array[mid+j+1]]
        }

        animation.push(obj);

        if(a[i] < b[j]){

            array[k] = a[i];
            i++; k++;
        } else{

            obj = {
                comparing: false,
                swapped: true,
                index: [k, mid+j+1],
                weight: [array[l+i], array[mid+j+1]]
            }

            animation.push(obj);

            array[k] = b[j];
            j++; k++;
        }
    }

    while(i<n1){
        array[k] = a[i];
        i++; k++;
    }
    
    while(j<n2){
        array[k] = b[j];
        j++; k++;
    }
}

function mergeSort(array,l,r){
    if(l<r){
        let mid = parseInt((l+r)/2); // It must be an integer not floating point.

        mergeSort(array,l,mid);
        mergeSort(array,mid+1,r);

        merge(array,l,mid,r);
    }
}


function mergeSortAnimation(){
    disableButtons();
    let l = 0;
    animation.forEach((obj,idx,animation) => {
        l+= 0.5;

        // Checking if the blocks are either comparing or Swapping
        if(obj.comparing){
            let mBlock1 = document.getElementById(obj.index[0]);
            let mBlock2 = document.getElementById(obj.index[1]);

            setTimeout(() =>{
                mBlock1.style.backgroundColor = "red";
                mBlock2.style.backgroundColor = "red";
                
                setTimeout(() =>{
                    mBlock1.style.backgroundColor = barColor;
                    mBlock2.style.backgroundColor = barColor;
                }, animationSpeed);

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }

            }, animationSpeed*l);
        } else if(obj.swapped){

            setTimeout(() =>{
                for(let i=obj.index[1]-1; i>=obj.index[0]; i--){
                    let mBlock1 = document.getElementById(i);
                    let mBlock2 = document.getElementById(i+1);
                    let mBlock1Height = parseInt(window.getComputedStyle(mBlock1).getPropertyValue("height"));
    
                    mBlock2.style.height = mBlock1Height + "px";
                }

                let startingBlock = document.getElementById(obj.index[0]);
                startingBlock.style.height = obj.weight[1] + "px";

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }
            }, animationSpeed*l);

        }
    });
}

// ------------------------------- QuickSort -------------------------------//


function partition(array,l,r){
    let pivot = array[l];
    let i=l;
    let j=r;
        while(i<j){
            let obj = {
                comparing: true,
                indexI: i,
                indexJ: j
            }
            animation.push(obj);

            while(array[i]<=pivot){
                i++;
            }

            while(array[j]>pivot){
                j--;
            }

            if(i<j){
                obj = {
                    comparing: false,
                    swaped: true,
                    index: [i,j],
                    weights: [array[i], array[j]]
                }
                animation.push(obj);

                swap(i,j)
            }
        }

        obj = {
            comparing: false,
            swaped: true,
            index: [l,j],
            weights: [array[l], array[j]]
        }

        animation.push(obj);

        swap(l,j);

        return j;
}

function quickSort(array,l,r){
    if(l<r){
        let pivot = partition(array,l,r);

        quickSort(array,l,pivot-1);
        quickSort(array,pivot+1,r);
    }
}

function quickSortAnimation(){
    disableButtons();
    let l = 0;

    animation.forEach((obj,idx,animation) => {
        l+= 0.5;

        // Checking if the blocks are either comparing or Swapping
        if(obj.comparing){
            let indexI = document.getElementById(obj.indexI);
            let indexJ = document.getElementById(obj.indexJ);
            setTimeout(()=>{
                indexI.style.backgroundColor = "yellow";
                indexJ.style.backgroundColor = "red";

                setTimeout(() =>{
                    indexI.style.backgroundColor = barColor;
                    indexJ.style.backgroundColor = barColor;
                }, animationSpeed);

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }
                
            },animationSpeed*l);
        } else if(obj.swaped) {
            setTimeout(() =>{
                let qBlock1 = document.getElementById(obj.index[0]);
                let qBlock2 = document.getElementById(obj.index[1]);

                qBlock1.style.height = obj.weights[1] + "px";
                qBlock2.style.height = obj.weights[0] + "px";

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }
            }, animationSpeed*l);
        }

    });
}

// ------------------------------- SelectionSort -------------------------------//

function selectionSort(array, n){
    let i=0, j;

    while(i<n-1){
        j = i+1;
        let minIndex = i;
        let obj = {
            comparing: true,
            indexI: true,
            index: i
        }
        animation.push(obj);

        while(j<n){
            if(array[j] < array[minIndex]){
                minIndex = j;
                
                obj = {
                    comparing: true,
                    indexI: false,
                    min: true,
                    minIndex: minIndex
                }

                animation.push(obj);
            }

            if(j != minIndex){
                obj = {
                    comparing: true,
                    indexI: false,
                    min: false,
                    index: j
                }
                animation.push(obj);
            }

            j++;
        }
        
        obj = {
            comparing: false,
            swapped: true,
            index: [i, minIndex],
            weights: [array[i], array[minIndex]]
        }
        animation.push(obj);

        swap(i, minIndex);
        i++;
    }
}

function selectionSortAnimation(){
    disableButtons();

    let l=0;
    let iBlock = document.getElementById("0");
    let minIndexBlock = document.getElementById("0");

    animation.forEach((obj, idx, animation) =>{
        l+=0.5;

        if(obj.comparing){           
            setTimeout(()=>{
                if(obj.indexI){
                    iBlock.style.backgroundColor = barColor;

                    iBlock = document.getElementById(obj.index);
                    iBlock.style.background = "lightgreen";

                } else if(obj.min){

                    minIndexBlock.style.backgroundColor = barColor;

                    minIndexBlock = document.getElementById(obj.minIndex);
                    minIndexBlock.style.backgroundColor = "yellow";

                    // setTimeout(() =>{
                    //     minIndexBlock.style.backgroundColor = barColor;
                    // }, animationSpeed);
                } else {
                    let comparingBlock = document.getElementById(obj.index);
                    
                        comparingBlock.style.backgroundColor = "red";

                        setTimeout(() =>{
                            comparingBlock.style.backgroundColor = barColor;
                        }, animationSpeed);
                }

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }
                
            },animationSpeed*l);


        } else if(obj.swapped){
            setTimeout(() =>{
                let sBlock1 = document.getElementById(obj.index[0]);
                let sBlock2 = document.getElementById(obj.index[1]);
    
                sBlock1.style.height = obj.weights[1] + "px";
                sBlock2.style.height = obj.weights[0] + "px";
                sBlock1.style.backgroundColor = barColor;
                sBlock2.style.backgroundColor = barColor;

                if(idx == animation.length-1){
                    isSorted = true;
                    console.log(isSorted);
                    activateButtons();
                }
            }, animationSpeed*l);
        }
    });

}


// ------------------------------- InsertionSort -------------------------------//

function insertionSort(){
    let i = 0;
    let temp,j;

    while(i<size){
        temp = array[i+1];
        j = i+1;

        let obj = {
            comparing: true,
            indexI: true,
            index: i
        }
        animation.push(obj);

        while(j>0 && array[j-1]>temp){
            obj = {
                comparing: true,
                indexI: false,
                index:j,
                weight: array[j-1]
            }
            animation.push(obj);

            array[j] = array[j-1];
            j--;
        }

        obj = {
            comparing: false,
            index: j,
            weight: temp
        }
        animation.push(obj);
        
        array[j] = temp;
        i++;
    }
}

function insertionSortAnimation(){
    disableButtons();

    let l = 0;
    animation.forEach((obj,idx,animation) => {
        l+=0.5;
        if(obj.comparing){
            setTimeout(() => {
            let iBlock  = document.getElementById("0");
            let iComparingBlock = document.getElementById("1");

            if(obj.indexI){
                iBlock.style.backgroundColor = barColor;

                iBlock  = document.getElementById(obj.index);
                iBlock.style.backgroundColor = "lightgreen";
            } else{
                iComparingBlock.style.backgroundColor = barColor;

                iComparingBlock = document.getElementById(obj.index);
                iComparingBlock.style.backgroundColor = "red";

                setTimeout(() => {
                    iComparingBlock.style.backgroundColor = barColor;

                },animationSpeed);

                iComparingBlock.style.height = obj.weight + "px";
            }
            if(idx == animation.length-1){
                isSorted = true;
                console.log(isSorted);
                activateButtons();
            }

            }, animationSpeed*l);
            
        } else{
                setTimeout(() => {
                    let iBlock1 = document.getElementById(obj.index);
                    iBlock1.style.backgroundColor = "yellow";
                    iBlock1.style.height = obj.weight + "px";

                    setTimeout(() =>{
                        iBlock1.style.backgroundColor = barColor;
                    },animationSpeed);

                    if(idx == animation.length-1){
                        isSorted = true;
                        console.log(isSorted);
                        activateButtons();
                    }

                }, animationSpeed*l);
                
        }
    });
}