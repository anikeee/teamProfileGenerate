// Remove the import statement at the top of the file
// import Employee from './Employee.js';

class Engineer {
    constructor(name, id, email, github) {
        (async () => {
            const { default: Employee } = await import('./Employee.js');
            this.prototype = Object.create(Employee.prototype);
            this.constructor = Employee.constructor;
            Employee.call(this, name, id, email);
        })();
        this.github = github;
    }

    getRole() {
        return 'Engineer';
    }

    getGithub() {
        return this.github;
    }
}

// Export the Engineer class
export default Engineer;
