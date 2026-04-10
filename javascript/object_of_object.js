var foodnaMe={
    veg:{
        r:"rice",
        c:"chese",
    },
    nonveg:{
        e:'egg',
        c:"chicken"
    }
}
console.log(foodnaMe)
console.log(foodnaMe.nonveg.e)
foodnaMe.nonveg.b="butterchicken"
console.log(foodnaMe)
delete foodnaMe.nonveg.e
console.log(foodnaMe)