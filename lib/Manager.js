class Manager {
    constructor(name, id, email, officeNumber) {
        (async () => {
            const { default: Employee } = await import('./Employee.js');
            this.prototype = Object.create(Employee.prototype);
            this.constructor = Employee.constructor;
            Employee.call(this, name, id, email);
        })();
        this.officeNumber = officeNumber;
    }
    getRole() {
        return 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

// Export the Manager class
export default Manager;
