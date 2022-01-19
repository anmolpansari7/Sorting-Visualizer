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
    let l = 0;
    animation.forEach(obj => {
        l+= 0.5;

        // Checking if the blocks are either comparing or Swapping
        if(obj.comparing){
            let mBlock1 = document.getElementById(obj.index[0]);
            let mBlock2 = document.getElementById(obj.index[1]);

            setTimeout(() =>{
                mBlock1.style.backgroundColor = "red";
                mBlock2.style.backgroundColor = "red";
                
                setTimeout(() =>{
                    mBlock1.style.backgroundColor = "blue";
                    mBlock2.style.backgroundColor = "blue";
                }, 20);

            }, 20*l);
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
            }, 20*l);

        }
    });
}