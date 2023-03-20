// Remove the import statement at the top of the file
// import Employee from './Employee.js';

class Intern {
    constructor(name, id, email, school) {
        (async () => {
            const { default: Employee } = await import('./Employee.js');
            this.prototype = Object.create(Employee.prototype);
            this.constructor = Employee.constructor;
            Employee.call(this, name, id, email);
        })();
        this.school = school;
    }
    getRole() {
        return 'Intern';
    }

    getSchool() {
        return this.school;
    }
}

export default Intern;
