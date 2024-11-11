export interface ScavengerHuntInput {
  childrenAge: number;
  numberOfChildren: number;
  theme: 'pirates' | 'unicorns' | 'space' | 'dinosaurs';
  spaceDetails: string;
}

export interface Riddle {
  text: string;
  location: string;
  order: number;
}

export interface StoryTheme {
  items: string[];
  vocabulary: string[];
  characters: string[];
  locations: string[];
}

export interface StoryElements {
  intro: string;
  mission: string;
  conclusion: string;
}

export interface GeneratedHunt {
  story: string;
  riddles: Riddle[];
  materials: string[];
  setupInstructions: string[];
}