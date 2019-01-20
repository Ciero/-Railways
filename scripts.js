"use strict";

class Railway {
    constructor(...items) {
        this.stations = [...items];
        this.terminal_station =  this.stations[this.stations.length - 1];
    }
}


class Train {
    constructor(name, actual_station, passengers, railway) {
        this.name = name;
        this.actual_station = actual_station;
        this.railway = railway;
        this.next_station = "";
        this.passengers = parseInt(passengers);
    }

    move_to_next_station() {
        if (this.actual_station == this.railway.terminal_station) {
            this.railway.stations = this.railway.stations.reverse()
            this.actual_station = this.railway.stations[1]
        } else {
            this.actual_station = this.railway.stations[this.railway.stations.indexOf(this.actual_station) + 1]
            this.next_station = this.railway.stations[this.railway.stations.indexOf(this.actual_station) + 1]
        }
    }

    get position () {
        return this.actual_station;
    }

    get next_position () {
        return this.next_station;
    }

    get passenger_number () {
        return this.passengers;
    }
}

const railway_one = new Railway ("Wollishofen", "Enge", "Thalwil", "Horgen", "Au", "Wadenswil", "Richterswil", "Pfäffikon");
const railway_two = new Railway ("Zürich", "Enge", "Oberrieden", "Baar", "Zug");
const railway_three = new Railway ("Hütten", "Schönenberg", "Au", "Oberrieden", "Adliswil", "Kilchberg" );

const train_one = new Train ("S2", "Wollishofen", 225, railway_one);
const train_two = new Train ("S45", "Zürich", 115, railway_two);
const train_three = new Train ("S60", "Hütten", 107, railway_three);


function transport() {
  if (train_one.next_position == train_two.next_position) {
      if (train_one.passenger_number > train_two.passenger_number) {
          train_one.move_to_next_station();
          train_three.move_to_next_station();
      } else {
          train_two.move_to_next_station();
          train_three.move_to_next_station();
      }
  } else if (train_one.next_position == train_three.next_position) {
      if (train_one.passenger_number > train_three.passenger_number) {
          train_one.move_to_next_station();
          train_two.move_to_next_station();
      } else {
          train_three.move_to_next_station();
          train_two.move_to_next_station();
      }
  } else if (train_two.next_position == train_three.next_position) {
      if (train_two.passenger_number > train_three.passenger_number) {
          train_two.move_to_next_station();
          train_one.move_to_next_station();
      } else {
          train_three.move_to_next_station();
          train_one.move_to_next_station();
      }
  } else {
      train_one.move_to_next_station();
      train_two.move_to_next_station();
      train_three.move_to_next_station();
  }
  console.log(train_one.name + " is in: "+ train_one.position + " with " + train_one.passenger_number + " passanger. Next station is: " +train_one.next_position + "\n" +
              train_two.name + " is in: "+ train_two.position + " with " + train_two.passenger_number + " passanger. Next station is: " +train_two.next_position + "\n" +
              train_three.name + " is in: "+ train_three.position +" with " + train_three.passenger_number + " passanger. Next station is: " +train_three.next_position)
}

console.log("We have three trains: \n" +
            train_one.name + " is starting from: " + train_one.position + "\n" +
            train_two.name + " is starting from: " + train_two.position + "\n" +
            train_three.name + " is starting from: " + train_three.position);

for (let i = 1; i < 10; i++) {
  console.log("After " + i + ". move:");
  transport();
}
