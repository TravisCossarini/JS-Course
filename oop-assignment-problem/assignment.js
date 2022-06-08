class Course {
    #price;

    constructor(course_title, course_length, course_price) {
        this.title = course_title;
        this.length = course_length;
        this.price = course_price;
    }

    set price(value) {
        if(value > 0){
            this.#price = value
        } else {
            throw 'Invalid price';
        }
    }

    get price() {
        return `\$${this.#price}`;
    }

    calculateValue() {
        const value = this.length / this.#price;
        console.log(value);
    }

    outputDesc() {
        const desc = `This ${this.title} course is ${this.length} minutes long and costs \$${this.price}`;
        console.log(desc);
    }
}

class PracticalCourse extends Course {
    constructor(title, length, price, numOfExcercises) {
        super(title, length, price);
        this.numOfExcercises = numOfExcercises;
    }
}

class TheoreticalCourse extends Course {
    constructor(title, length, price) {
        super(title, length, price);
    }

    publish() {
        console.log('Publishing...');
    }
}

const course1 = new Course('Test1', 60, 60.0);
const course2 = new Course('Test2', 70, 70.0);
const course3 = new PracticalCourse('Test3', 80, 80.0, 6)
const course4 = new TheoreticalCourse('Test4', 90, 90.0)

console.log(course1, course2);
course1.calculateValue();
course1.outputDesc();

course3.calculateValue();
course3.outputDesc();
console.log(course3.numOfExcercises)

course4.calculateValue();
course4.outputDesc();
course4.publish();

course4.price = -10
console.log(course4.price);
