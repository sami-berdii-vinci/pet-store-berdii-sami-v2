
const generateDeterministicPets = () => {
  const names = [
    "Fido", "Milo", "Rex", "Luna", "Bella", "Charlie", "Max", "Simba", "Oreo", "Rocky",
    "Buddy", "Coco", "Rosie", "Teddy", "Chloe", "Daisy", "Lola", "Bailey", "Molly", "Lucy"
  ]; // 20 noms
  
  const tags = ["dog", "cat", "rabbit", "parrot", "hamster"]; // 5 types

  let pets = [];

  for (let i = 1; i <= 30; i++) {
    pets.push({
      id: i,
      // Utilise le reste de la division pour boucler sur les tableaux indéfiniment
      name: names[(i - 1) % names.length], 
      tag: tags[(i - 1) % tags.length]
    });
  }
  return pets;
};



export const db = {pets: generateDeterministicPets()};

