function compareArrays(arr1, arr2) {
	if (arr1.length === arr2.length) {
		arr1.every((element, i) => element === arr2[i]);
	} else {
		return false;
	}
}


function getUsersNamesInAgeRange(arr, gender) {
    let result = arr.filter(element => element.gender == gender);
	if (result.length > 0) {
		result = result.reduce((acc, item, index) => (acc + item.age), 0) / result.length;
		return result;
	} else {
		return 0;
	}
}