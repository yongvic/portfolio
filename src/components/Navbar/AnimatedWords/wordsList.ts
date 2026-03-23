// Liste des mots
export const wordsList = [
  "CREER",
  "DESIGN",
  "CONCEVOIR",
  "IMAGINER",
  "INSPIRER",
  "MARQUE",
  "TYPO",
  "UX",
  "UI",
  "PERFORMANCE",
  "WEB",
  "AUTOMATISER",
  "STRATEGIE",
  "IMPACT",
  "PRECISION",
  "DETAIL",
  "VISION",
  "PROCESSUS"
];

// Fonction pour obtenir un mot aléatoire différent du précédent
export const getRandomWord = (previousWord?: string): string => {
  let newWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  
  // Éviter de répéter le même mot
  while (newWord === previousWord && wordsList.length > 1) {
    newWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  }
  
  return newWord;
};
