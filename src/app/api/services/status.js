export class StatusService {
  constructor() {
    this.objects = [];
  }

  setStatusTrueById(id) {
    this.objects.push({ id, status: true });
    console.log(`Объект добавлен`);
  }

  setStatusFalseById(id) {
    const foundObject = this.objects.find((obj) => obj.id === id);
    if (foundObject) {
      foundObject.status = false;
      console.log(`Статус объекта с id ${id} установлен в false.`);
    } else {
      console.log(`Объект с id ${id} не найден.`);
    }
  }

  findStatusById(id) {
    const foundObject = this.objects.find((obj) => obj.id === id);
    if (foundObject) {
      console.log(`Статус объекта с id ${id}: ${foundObject.status}`);
      return foundObject.status;
    } else {
      console.log(`Объект с id ${id} не найден.`);
      return null;
    }
  }

  removeStatusById(id) {
    const initialLength = this.objects.length;
    this.objects = this.objects.filter((obj) => obj.id !== id);
    if (this.objects.length < initialLength) {
      console.log(`Объект с id ${id} удален.`);
    } else {
      console.log(`Объект с id ${id} не найден для удаления.`);
    }
  }
}
