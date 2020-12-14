class Animal {
  name: string;
  sound: string;
  food: string;
  constructor(name: string, sound: string, food: string) {
    this.name = name;
    this.sound = sound;
    this.food = food;
  }
  soundOff(): string {
    return `The ${this.name} makes the sound "${this.sound}".`;
  }
}

class Fish extends Animal {
  saltwater: boolean;
  constructor(name: string, food: string, saltwater: boolean) {
    super(name, null, food);
    this.saltwater = saltwater;
  }
  soundOff(): string {
    return `The ${this.name} is a fish and does not make sounds.`;
  }
  habitat(): string {
    return `The ${this.name} is a ${
      this.saltwater ? "saltwater" : "freshwater"
    } fish.`;
  }
}

class Bird extends Animal {
  flightSpeed: number;
  constructor(name: string, sound: string, food: string, flightSpeed: number) {
    super(name, sound, food);
    this.flightSpeed = flightSpeed;
  }
  fly(): string {
    if (this.flightSpeed > 0)
      return `The ${this.name} flies at speeds of up to ${this.flightSpeed} meters per second!`;
    else return `The ${this.name} is a flightless bird.`;
  }
}

describe("Testing animals", () => {
  test("a basic animal works as expected", () => {
    let lion = new Animal("lion", "roar", "meat");
    animalCheck(lion);
    expect(lion.soundOff()).toBe('The lion makes the sound "roar".');
  });
  describe("Fish", () => {
    let goldfish = new Fish("goldfish", "pellets", false);
    let shark = new Fish("shark", "fish", true);
    it("are animals", () => {
      animalCheck(goldfish);
    });
    it("doesn't make sound", () => {
      expect(goldfish.soundOff()).toBe(
        "The goldfish is a fish and does not make sounds."
      );
    });
    it("can be saltwater or freshwater", () => {
      expect(goldfish.habitat()).toBe("The goldfish is a freshwater fish.");
      expect(shark.habitat()).toBe("The shark is a saltwater fish.");
    });
  });
  describe("Birds", () => {
    let swallow = new Bird("swallow", "chattering chirp", "insects", 11);
    let emu = new Bird("emu", "grunt", "plants and insects", 0);
    it("are animals", () => {
      animalCheck(swallow);
    });
    it("make sounds", () => {
      expect(swallow.soundOff()).toBe(
        'The swallow makes the sound "chattering chirp".'
      );
    });
    it("might be able to fly", () => {
      expect(swallow.fly()).toBe(
        "The swallow flies at speeds of up to 11 meters per second!"
      );
      expect(emu.fly()).toBe("The emu is a flightless bird.");
    });
  });
});

function animalCheck(animal: Animal) {
  expect(animal).toHaveProperty("name");
  expect(animal).toHaveProperty("sound");
  expect(animal).toHaveProperty("food");
  expect(animal).toHaveProperty("soundOff");
}
