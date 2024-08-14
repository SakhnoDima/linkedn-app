class ErrorList {
  constructor() {
    this.errors = [];
  }
  addError(id, message) {
    const index = this.errors.findIndex((obj) => obj.id === id);

    if (index === -1) {
      this.errors.push({ id, message });
    } else {
      this.errors[index].message = message;
    }
  }
  removeError(id) {
    const index = this.errors.findIndex((obj) => obj.id === id);

    if (index !== -1) {
      this.errors.splice(index, 1);
    }
  }
  getErrorById(id) {
    const foundObject = this.errors.find((obj) => obj.id === id);

    return foundObject || false;
  }
}
export const errorList = new ErrorList();
