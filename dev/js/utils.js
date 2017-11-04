'use strict'

export function sortByAgeAsc(a, b) {

    let A = +a.age
    let B = +b.age
	return A-B

}

export function sortByAgeDesc(a, b) {

    let A = +a.age
    let B = +b.age
	return B-A

}