const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  applyDamage(amount) {
    super.applyDamage(amount);
    if (this.health <= 0) {
      this.die();
    }
  }

  takeItem(itemName) {
    let item = this.currentRoom.getItemByName(itemName);
    this.items.push(item);
    this.currentRoom.removeItem(itemName);
    console.log(`you took the ${itemName}.`);

  }

  dropItem(itemName) {
    // Fill this in
    this.currentRoom.items.push(this.getItemByName(itemName));
    let index = this.findItemInInventory(itemName);
    this.items.splice(index, 1);
    console.log(`you dropped the ${itemName}.`);

  }

  eatItem(itemName) {

    // Fill this in
    let item = this.getItemByName(itemName);
    if (item instanceof Food) {
      this.items.splice(this.findItemInInventory(itemName), 1);
      console.log(`you ate the ${itemName}.`);
    } else {
      console.log(`you can\'t eat that.`);
    }

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

  hit(name) {

    // Fill this in
    let target = this.currentRoom.getEnemyByName(name);
    target.attackTarget = this;
    target.applyDamage(this.strength);
    console.log(`you hit the ${name}`);
    console.log(`${name} has ${target.health} health`);
    target.act();
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
