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
    let l = 0;
    animation.forEach(obj => {
        let block1 = document.getElementById(obj.index[0]);
        let block2 = document.getElementById(obj.index[1]);
        l+= 0.5;

        // Checking if the blocks are either comparing or Swapping
        if(obj.comparing){
            setTimeout(() =>{
                block1.style.backgroundColor = "red";
                block2.style.backgroundColor = "red";
                
                setTimeout(() =>{
                    block1.style.backgroundColor = "blue";
                    block2.style.backgroundColor = "blue";
                }, 20);

            }, 20*l);
        } else{
            setTimeout(() =>{
                block1.style.height = obj.weights[1] + "px";
                block2.style.height = obj.weights[0] + "px";
            }, 20*l);
        }
    });
}