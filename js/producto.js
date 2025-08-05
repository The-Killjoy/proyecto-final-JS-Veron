export class Card {
  constructor({ id, name, type, price, image }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.image = image;
  }

  getInfo() {
    return `${this.name} (${this.type}) - $${this.price}`;
  }
}