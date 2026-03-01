class Student {
    name: string;
    grades: number[];

    constructor(name: string) {
        this.name = name;
        this.grades = [];
    }

    addGrade(grade: number): void {
        this.grades.push(grade);
    }

    getAverage(): number {
        const sum = this.grades.reduce((total, grade) => total + grade, 0);
        return sum / this.grades.length;
    }

    getFinalResult(): string {
        const average = this.getAverage();

        if (average >= 90) {
            return "Excellent";
        } else if (average >= 75) {
            return "Good";
        } else if (average >= 50) {
            return "Pass";
        } else {
            return "Fail";
        }
    }
}

// Demo
const student1 = new Student("Anna");

student1.addGrade(85);
student1.addGrade(78);
student1.addGrade(92);

console.log("Student:", student1.name);
console.log("Average:", student1.getAverage());
console.log("Final Result:", student1.getFinalResult());

// made with the help of AI