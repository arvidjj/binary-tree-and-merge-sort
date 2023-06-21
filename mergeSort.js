
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}


function merge(n, m) {
    let i = 0;
    let j = 0;
    let k = 0;
    let newArr = [];

    while (i < n.length && j < m.length) {
        if (n[i] <= m[j]) {
            newArr[k++] = n[i++];
        } else if (n[i] > m[j]) {
            newArr[k++] = m[j++];
        }
    }

    while (i < n.length) {
        newArr[k++] = n[i++];
    }

    while (j < m.length) {
        newArr[k++] = m[j++];
    }

    return newArr;
}

const arr = [3, 2, 1, 7, 8, 6, 5, 9]
console.log(mergeSort(arr));