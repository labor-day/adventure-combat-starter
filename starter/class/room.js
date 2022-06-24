// const { World } = require('./world');
const { Player } = require('./player');

class Room {

  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = [];
  }

  getEnemies() {
    const { World } = require('./world');
    return World.getEnemiesInRoom(this);
  }

  printRoom() {
    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");
    if (this.getEnemies().length > 0) {
      console.log(`Enemies: ${this.getEnemies().map(enemy => enemy.name).join(", ")}`);
    }
    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
  }

  getExits() {
    return Object.keys(this.exits);
  }

  getExitsString() {
    return `Exits: ${this.getExits().join(", ")}`
  }

  connectRooms(direction, connectingRoom) {

    // Check if the direction and connecting room are valid
    if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction) {
    return this.exits[direction];
  }

  findItemInInventory(name) {
    let inventory = this.items;
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].name === name) {
        return i;
      }
    }
  }

  getItemByName(name) {

    // Fill this in
    return this.items[this.findItemInInventory(name)];

  }

  removeItem(name) {
    let index = this.findItemInInventory(name);
    this.items.splice(index, 1);

  }

  getEnemyByName(name) {

    // Fill this in
    let enemies = this.getEnemies();
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].name === name) {
        return enemies[i];
      }
    }
  }

}

module.exports = {
  Room,
};
