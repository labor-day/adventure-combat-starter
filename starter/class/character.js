class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;

  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0) {this.die()}
  }

  die() {
    // Fill this in
    this.items.forEach(
      item => this.currentRoom.items.push(item)
    );
    this.items = [];
    this.currentRoom = null;
  }

  getItemByName(itemName) {

  }

  dropItem(itemName) {

  }

  dropAllItems() {
    let inventory = this.items;
    inventory.forEach()
  }

}

module.exports = {
  Character,
};
