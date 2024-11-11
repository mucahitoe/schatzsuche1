import { StoryTheme, StoryElements, Riddle } from '../types';

const generateIntro = (theme: string, age: number): string => {
  const intros = {
    pirates: {
      young: "Ahoy, kleine Seeräuber! Ein geheimnisvoller Brief ist mit einer Flaschenpost angekommen. Kapitän Blaubart braucht eure Hilfe! Seine wertvollsten Schätze wurden von seinem neidischen Bruder versteckt.",
      middle: "Arrr, tapfere Freibeuter! Eine mysteriöse Karte wurde an der Küste angespült. Sie stammt vom legendären Kapitän Blaubart, der seine Schätze vor Piratenfeinden in Sicherheit bringen musste.",
      old: "Eine uralte Piratenkarte ist aufgetaucht! Sie gehörte dem berüchtigten Kapitän Blaubart, der vor seinem letzten Gefecht seine legendären Schätze clever versteckte."
    },
    unicorns: {
      young: "Oh nein! Das kleine Einhorn Glitzerstaub hat seine magische Krone verloren! Ohne sie kann es keinen Regenbogen mehr zaubern. Könnt ihr dem Einhorn helfen?",
      middle: "Die Einhornprinzessin Stella braucht eure Hilfe! Der neidische Schattenzauberer hat ihre magischen Kristalle gestohlen und überall im Reich versteckt.",
      old: "Das magische Einhornreich ist in Gefahr! Ein dunkler Zauber hat die Kraft der Regenbogenkristalle geschwächt. Nur ihr könnt sie wiederfinden und ihre Magie erneuern."
    },
    space: {
      young: "Piep! Piep! Der kleine Roboter Blinky hat eine wichtige Nachricht von der Raumstation empfangen. Ein Meteoritenschauer hat alle Sternenkristalle verstreut!",
      middle: "ACHTUNG RAUMFAHRER! Die Weltraumstation Alpha braucht dringend eure Hilfe! Ein mysteriöses Signal deutet auf versteckte Alien-Artefakte hin.",
      old: "DRINGENDE WELTRAUMMISSION: Unsere Sensoren haben mehrere außerirdische Energiesignaturen entdeckt. Diese Technologie muss gefunden werden, bevor sie in falsche Hände gerät!"
    },
    dinosaurs: {
      young: "Brumm! Der kleine T-Rex Tommy hat eine aufregende Entdeckung gemacht! Er hat Spuren von einem geheimnisvollen Dinosauriernest gefunden.",
      middle: "SENSATIONELLE ENTDECKUNG! Professor Rex hat in seiner neuesten Expedition Hinweise auf einen bisher unbekannten Dinosaurier gefunden!",
      old: "PALÄONTOLOGISCHER DURCHBRUCH! Eine neue Ausgrabungsstätte verspricht bahnbrechende Erkenntnisse über eine unbekannte Dinosaurierart."
    }
  };

  const ageGroup = age <= 6 ? 'young' : age <= 10 ? 'middle' : 'old';
  return intros[theme as keyof typeof intros]?.[ageGroup] || intros.pirates[ageGroup];
};

const generateRiddles = (theme: string, age: number, spaceDetails: string): Riddle[] => {
  const locations = spaceDetails.toLowerCase().split(' ').filter(word => 
    ['küche', 'wohnzimmer', 'garten', 'bad', 'schlafzimmer', 'keller', 'dachboden'].includes(word)
  );

  const difficultyByAge = (age: number) => {
    if (age <= 6) return 'easy';
    if (age <= 10) return 'medium';
    return 'hard';
  };

  const riddleTemplates = {
    pirates: {
      easy: [
        "Der erste Schatz ist dort versteckt, wo das Schiff vor Anker geht (LOCATION).",
        "Kapitän Blaubarts Kompass zeigt zum nächsten Schatz, dort wo die Mannschaft isst (LOCATION).",
        "Eine Schatzkiste wartet dort, wo die Piraten schlafen (LOCATION)."
      ],
      medium: [
        "Wo die Wellen rauschen und das Wasser fließt, dort findet ihr den ersten Hinweis (LOCATION).",
        "Im Unterschlupf der Seekarten und alten Geschichten liegt der nächste Schatz verborgen (LOCATION).",
        "Dort wo der Smutje seine Kombüse hat, wartet der goldene Schlüssel (LOCATION)."
      ],
      hard: [
        "In den Tiefen, wo selbst erfahrene Seebären selten hinabsteigen, liegt ein Teil der Schatzkarte (LOCATION).",
        "Wo das Steuerrad des Hausschiffs steht und der Kapitän seine Befehle gibt (LOCATION).",
        "Im geheimen Versteck, hoch über den Planken, wo der Ausguck die Segel sichtet (LOCATION)."
      ]
    },
    unicorns: {
      easy: [
        "Ein Regenbogen führt zum magischen Ort, wo die Einhörner essen (LOCATION).",
        "Glitzerstaub hat etwas Magisches dort versteckt, wo die Einhörner schlafen (LOCATION).",
        "Die Zauberblumen wachsen dort, wo das Wasser fließt (LOCATION)."
      ],
      medium: [
        "Folgt dem Sternenstaub zum Ort, wo magische Träume entstehen (LOCATION).",
        "Die Kristalle leuchten dort, wo das Einhorn seine Mahlzeiten zu sich nimmt (LOCATION).",
        "Ein Regenbogenportal erscheint dort, wo das Wasser magisch glitzert (LOCATION)."
      ],
      hard: [
        "Die uralte Einhornmagie führt euch zum Ort der Ruhe und Entspannung (LOCATION).",
        "Sucht nach dem magischen Kristall im Reich der nächtlichen Träume (LOCATION).",
        "Das Portal zur Zauberwelt öffnet sich im höchsten Punkt des Reiches (LOCATION)."
      ]
    },
    space: {
      easy: [
        "Blinky's Sensoren zeigen einen Sternenkristall dort, wo die Astronauten essen (LOCATION).",
        "Ein kleiner Meteorit ist dort gelandet, wo wir uns waschen (LOCATION).",
        "Weltraumstrahlen kommen aus dem Ort, wo wir schlafen (LOCATION)."
      ],
      medium: [
        "Die Alien-Technologie sendet Signale aus dem Versorgungsbereich der Station (LOCATION).",
        "Seltsame Energiewerte werden dort gemessen, wo die Crew ihre Mahlzeiten einnimmt (LOCATION).",
        "Ein mysteriöses Portal erscheint im Entspannungsbereich der Station (LOCATION)."
      ],
      hard: [
        "Die fortschrittliche Alien-Technologie versteckt sich im Maschinenraum der Station (LOCATION).",
        "Quantensignale werden aus dem Kommunikationsbereich empfangen (LOCATION).",
        "Das letzte Artefakt befindet sich in der geheimen Forschungseinrichtung (LOCATION)."
      ]
    },
    dinosaurs: {
      easy: [
        "Kleine Dinosaurierspuren führen zum Ort, wo wir essen (LOCATION).",
        "Ein Dinosaurier-Ei wurde dort gesichtet, wo wir schlafen (LOCATION).",
        "Der kleine T-Rex hat etwas im Wasserloch versteckt (LOCATION)."
      ],
      medium: [
        "Fossile Fußabdrücke führen zum Aufenthaltsbereich der Forscher (LOCATION).",
        "Ein verstecktes Nest wurde im Versorgungsbereich entdeckt (LOCATION).",
        "Mysteriöse Dinosaurier-Artefakte befinden sich im Ruhebereich (LOCATION)."
      ],
      hard: [
        "Die Ausgrabungsstätte enthält Hinweise im unterirdischen Labor (LOCATION).",
        "Seltene Fossilien wurden im Forschungsbereich gefunden (LOCATION).",
        "Das letzte Puzzleteil der Expedition liegt im höchsten Punkt der Station (LOCATION)."
      ]
    }
  };

  const difficulty = difficultyByAge(age);
  const themeRiddles = riddleTemplates[theme as keyof typeof riddleTemplates] || riddleTemplates.pirates;
  const selectedRiddles = themeRiddles[difficulty as keyof typeof themeRiddles];
  
  return selectedRiddles.map((riddle, index) => ({
    text: riddle.replace('LOCATION', locations[index % locations.length] || 'einem geheimen Ort'),
    location: locations[index % locations.length] || 'geheimer Ort',
    order: index + 1
  }));
};

export const generateHunt = (params: {
  childrenAge: number;
  numberOfChildren: number;
  theme: string;
  spaceDetails: string;
}): string => {
  const { childrenAge, numberOfChildren, theme, spaceDetails } = params;
  
  const intro = generateIntro(theme, childrenAge);
  const riddles = generateRiddles(theme, childrenAge, spaceDetails);
  
  const missionBrief = `
${intro}

${numberOfChildren > 1 ? `Gemeinsam als Team von ${numberOfChildren} mutigen ${theme === 'pirates' ? 'Seeräubern' : theme === 'unicorns' ? 'Einhornrettern' : theme === 'space' ? 'Astronauten' : 'Forschern'}` : 'Als mutiger Abenteurer'} müsst ihr die folgenden Rätsel lösen:

${riddles.map(riddle => `
Rätsel ${riddle.order}:
${riddle.text}
`).join('\n')}

${childrenAge <= 6 ? 'Viel Glück bei eurer aufregenden Mission!' : 
  childrenAge <= 10 ? 'Das Schicksal liegt in euren Händen! Macht euch bereit für das Abenteuer!' :
  'Eine epische Quest erwartet euch. Seid clever und arbeitet zusammen!'}
`;

  return missionBrief;
};