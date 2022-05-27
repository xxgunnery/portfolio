import React from "react"

class Lesson {
    constructor(name, description, code, example) {
        this.name = name
        this.description = description
        this.code = code
        this.example = example
    }
    hide(e) {
        e.preventDefault()
        console.log(this.name)
        if(e.currentTarget.children[1].children[0].style.visibility === "visible") {
            e.currentTarget.children[1].children[0].style.visibility = "hidden"
            e.currentTarget.children[1].children[0].style.height = "0"
        } else {
            this.example()
            e.currentTarget.children[1].children[0].style.visibility = "visible"
            e.currentTarget.children[1].children[0].style.height = "auto"
        }
    }
    writeReturn() {
        return(  
            <div className="example" onClick={this.hide.bind(this)}>
                <div className="exampleHeader">{this.name + "()"}</div>
                <div className = "exampleWrapper">
                    <div className="hideExample">
                        <div className="description">
                            {this.description}
                        </div>
                        <pre className="prettyprint">
                            {this.code}
                        </pre>
                    </div>
                </div>
            </div>
        )
    }
}

export const MoshES6 = {
    varReplacements(name) {
        const description = "Mosh demonstrates the new keywords for defining variables and constants!"

        const code = 
`                //when a variable is declared with let, it is only available within that block
                //var is scoped to the function (scope is too wide)
                //const is like let, however it is not reassignable. Use let only when you need to reassign variables.

                for(let i = 0; i < 5; i++) {
                    console.log(i)
                }
                //i is not accessible here

                const x = 5;`

        function example() {
            function sayHello() {
                //when a variable is declared with let, it is only available within that block
                //var is scoped to the function (scope is too wide)
                //const is like let, however it is not reassignable. Use let only when you need to reassign variables.

                for(let i = 0; i < 5; i++) {
                    console.log(i)
                }
                //i is not accessible here

                // const x = 5; (example)
            }
            sayHello()
        }

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    objects(name) {
        const description = "Mosh demonstrates objects within ES6!"

        const code = 
`            const person = {
                name: "Mosh",
                //walk is a "METHOD" inside the person object
                //NEW -> we don't need to write key: function example(), etc... we can just write example()
                walk() {},
                talk() {}
            }
            person.talk()

            const targetMember = 'name'
            //We could dynamically change the property accessed in the object by assigning a variable inside the brackets
            person[targetMember] = "John"
            console.log(person.name)`

        function example() {
            const person = {
                name: "Mosh",
                //walk is a "METHOD" inside the person object
                //NEW -> we don't need to write key: function example(), etc... we can just write example()
                walk() {},
                talk() {}
            }
            person.talk()

            const targetMember = 'name'
            //We could dynamically change the property accessed in the object by assigning a variable inside the brackets
            person[targetMember] = "John"
            console.log(person.name)
        }

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    thisKeyword(name) {
        const description = "Mosh demonstrates the 'this' keyword within ES6!"

        function example() {
            const person = {
                name: "Mosh",
                walk() {
                    //'this' always returns a reference to the current object
                    console.log(this)
                },
            }
            person.walk()

            //Not calling walk method, just getting reference to the function
            const walk = person.walk
            console.log(walk)

            //walk() returns undefined... 'this' when called within an object, returns reference to the object
            //BUT in this case below, 'this' when called as a function outside of an object returns undefined --- when you are in 'strict mode'
            //If 'strict' is not enabled, it returns the window object
            walk()
        }
        
        const code = 
`            const person = {
                name: "Mosh",
                walk() {
                    //'this' always returns a reference to the current object
                    console.log(this)
                },
            }
            person.walk()

            //Not calling walk method, just getting reference to the function
            const walk = person.walk
            console.log(walk)

            //walk() returns undefined... 'this' when called within an object, returns reference to the object
            //BUT in this case below, 'this' when called as a function outside of an object returns undefined --- when you are in 'strict mode'
            //If 'strict' is not enabled, it returns the window object
            walk()`

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    binding(name) {
        const description = "Mosh demonstrates the use of the bind() function to make sure that 'this' always returns a reference to the object that your function is owned by."

        function example() {
            const person = {
                name: "Mosh",
                walk() {
                    console.log(this)
                },
            }
            person.walk()

            //FUNCTIONS ARE OBJECTS IN JAVASCRIPT... they have the bind method
            //When we call bind, the first argument is used to determine which object we refer to for the value of 'this'
            const walk = person.walk.bind(person)
            walk()
        }
        
        const code = 
`            const person = {
                name: "Mosh",
                walk() {
                    console.log(this)
                },
            }
            person.walk()

            //FUNCTIONS ARE OBJECTS IN JAVASCRIPT... they have the bind method
            //When we call bind, the first argument is used to determine which object we refer to for the value of 'this'
            const walk = person.walk.bind(person)
            walk()`

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    arrow(name) {
        const description = "Mosh demonstrates the use arrow functions (favorite functionality)."

        function example() {
            //These two functions are exactly the same
            const square = function(number) {
                return number * number
            }
            const square2 = (number) => number*number

            console.log(square(5))
            console.log(square2(5))

            const jobs = [
                { id: 1, isActive: true},
                { id: 2, isActive: true},
                { id: 3, isActive: false}
            ]
            //Filter iterates over the array. It takes each element in the job object and returns true or false. Made easy with arrow functions.
            const activeJobs = jobs.filter(job => job.isActive)

            console.log(activeJobs)
        }
        
        const code = 
`            //These two functions are exactly the same
            const square = function(number) {
                return number * number
            }
            const square2 = (number) => number*number

            console.log(square(5))
            console.log(square2(5))

            const jobs = [
                { id: 1, isActive: true},
                { id: 2, isActive: true},
                { id: 3, isActive: false}
            ]
            //Filter iterates over the array. It takes each element in the job object and returns true or false. Made easy with arrow functions.
            const activeJobs = jobs.filter(job => job.isActive)

            console.log(activeJobs)`

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    arrowThis(name) {
        const description = "Mosh demonstrates how arrow functions work with the 'this' keyword."

        function example() {
            //Arrow functions do not rebind 'this'
            const person = {
                talk() {
                    //The function in the setTimeout function is not attached to the person object
                    //OLD way is to set the following variable:
                    var self = this;
                    setTimeout(function() {
                        console.log("self", self)
                    }, 1000)
                }
            }
            const person2 = {
                talk() {
                    //Arrow functions do not rebind 'this' - in other words, if we change the callback function to an arrow function
                    //It will inherit the 'this' keyword. Returns 'this' in the context where the code was called
                    setTimeout(() =>
                        console.log("this", this)
                    , 1000)
                }
            }
            person.talk()
            person2.talk()
        }
        
        const code = 
`            //Arrow functions do not rebind 'this'
            const person = {
                talk() {
                    //The function in the setTimeout function is not attached to the person object
                    //OLD way is to set the following variable:
                    var self = this;
                    setTimeout(function() {
                        console.log("self", self)
                    }, 1000)
                }
            }
            const person2 = {
                talk() {
                    //Arrow functions do not rebind 'this' - in other words, if we change the callback function to an arrow function
                    //It will inherit the 'this' keyword. Returns 'this' in the context where the code was called
                    setTimeout(() =>
                        console.log("this", this)
                    , 1000)
                }
            }
            person.talk()
            person2.talk()`

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    arrayMap(name) {
        const description = "Mosh demonstrates how to use the new array method map()."

        function example() {
            //In React, we used map() to render lists
            const colors = ['red','green','blue']
            //Pass a callback function into map() and transform each element in the array (does not modify original array)
            //We also utilize template literals using the ` key (back tick)
            const items = colors.map(color =>   `<li>${color}</li>`)
            console.log(items)
        }
        
        const code = 
`            //In React, we used map() to render lists
            const colors = ['red','green','blue']
            //Pass a callback function into map() and transform each element in the array (does not modify original array)
            //We also utilize template literals using the key next to 1 (back tick) **literals not working here
            const items = colors.map(color => <li>$color}</li>)
            console.log(items)`

        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    objDest(name) {
        const description = "Mosh demonstrates how object destructuring works in JS."

        function example() {
            const address = {
                street: 'HI',
                city: 'MY',
                country: 'NAME'
            }
            // //These 3 lines are directly equivalent
            // const street = address.street
            // const city = address.city
            // const country = address.country

            // //To this 1 line!
            // const {street,city,country} = address

            // //Targets the street key
            // const {street} = address

            //Changes the name of the street key for use later
            const {street: st} = address

            console.log(st)

        }
        
        const code = 
`            const address = {
                street: 'HI',
                city: 'MY',
                country: 'NAME'
            }
            // //These 3 lines are directly equivalent
            // const street = address.street
            // const city = address.city
            // const country = address.country

            // //To this 1 line!
            // const {street,city,country} = address

            // //Targets the street key
            // const {street} = address

            //Changes the name of the street key for use later
            const {street: st} = address

            console.log(st)`
        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    spread(name) {
        const description = "Mosh demonstrates how the spread operator works in JS."

        function example() {
            let first = [1,2,3]
            let second = [4,5,6]

            //Old way of doing things
            let combined = first.concat(second)

            //New way! Spread operator ... Shortens code and also lets you view the array as if it will look
            combined = [...first,'a',...second,'b']

            //Easily clone an array
            let clone = [...first]

            console.log(first)
            console.log(clone)

            //Apply spread operator on object
            first = { name: 'Mosh' }
            second = { job: 'Instructor' }
            combined = {...first,...second, location: 'Australia'}

            console.log(combined)

            clone = {...first}

            console.log(clone)

        }
        
        const code = 
`            let first = [1,2,3]
            let second = [4,5,6]

            //Old way of doing things
            let combined = first.concat(second)

            //New way! Spread operator ... Shortens code and also lets you view the array as if it will look
            combined = [...first,'a',...second,'b']

            //Easily clone an array
            let clone = [...first]

            console.log(first)
            console.log(clone)

            //Apply spread operator on object
            first = { name: 'Mosh' }
            second = { job: 'Instructor' }
            combined = {...first,...second, location: 'Australia'}

            console.log(combined)

            clone = {...first}

            console.log(clone)`
        
        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    },
    classes(name) {
        const description = "Mosh demonstrates how classes work in JS."

        function example() {
            //Classes are useful because duplicating objects reuses methods
            class Person {
                constructor(name) {
                    this.name = name
                }

                walk() {
                    console.log("walk")
                }
            }
            const person = new Person("Paul")
        }
        
        const code = 
`            //Classes are useful because duplicating objects reuses methods
            class Person {
                constructor(name) {
                    this.name = name
                }

                walk() {
                    console.log("walk")
                }
            }
            const person = new Person("Paul")`
        
        let lesson = new Lesson(name, description, code, example)

        return (
            lesson.writeReturn()
        )
    }
}