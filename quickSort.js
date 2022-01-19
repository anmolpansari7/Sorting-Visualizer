function swap(array,i,j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

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

                swap(array,i,j)
            }
        }

        obj = {
            comparing: false,
            swaped: true,
            index: [l,j],
            weights: [array[l], array[j]]
        }

        animation.push(obj);

        swap(array,l,j);

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
    let l = 0;
    animation.forEach(obj => {
        l+= 0.5;

        // Checking if the blocks are either comparing or Swapping
        if(obj.comparing){
            let indexI = document.getElementById(obj.indexI);
            let indexJ = document.getElementById(obj.indexJ);
            setTimeout(()=>{
                indexI.style.backgroundColor = "yellow";
                indexJ.style.backgroundColor = "red";

                setTimeout(() =>{
                    indexI.style.backgroundColor = "blue";
                    indexJ.style.backgroundColor = "blue";
                }, 20);
                
            },20*l);
        } else if(obj.swaped) {
            setTimeout(() =>{
                let qBlock1 = document.getElementById(obj.index[0]);
                let qBlock2 = document.getElementById(obj.index[1]);

                qBlock1.style.height = obj.weights[1] + "px";
                qBlock2.style.height = obj.weights[0] + "px";
            }, 20*l);
        }
    });
}