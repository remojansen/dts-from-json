interface Pokedex {
  pokemon: Pokemon[];
}
interface Pokemon {
  id: number;
  num: string;
  name: string;
  img: string;
  type: string[];
  height: string;
  weight: string;
  candy: string;
  candy_count?: number;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers: number[] | null;
  weaknesses: string[];
  next_evolution?: Nextevolution[];
  prev_evolution?: Nextevolution[];
}
interface Nextevolution {
  num: string;
  name: string;
}
