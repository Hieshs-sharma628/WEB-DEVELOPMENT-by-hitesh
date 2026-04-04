var foodname={
    veg:{
        r:"rice",
        c:"chese",
    },
    nonveg:{
        e:'egg',
        c:"chicken"
    }
}
console.log(foodname)
console.log(foodname.nonveg.e)
foodname.nonveg.b="butterchicken"
console.log(foodname)
delete foodname.nonveg.e
console.log(foodname)