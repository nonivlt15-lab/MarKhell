# Site Marc-Hell, version 3 (5 novembre 2026)

Faux e-commerce de la marque fictive Marc-Hell (oral d'anglais, IAE Nantes). 28 pages en anglais, mêmes fonctions que la V2, design repensé de zéro autour d'une seule idée.

## Voir le site

Double-clic sur `dist/index.html`. Pour modifier : changer `src/` ou `public/`, puis `node build.mjs`.

## L'idée : une descente du paradis vers l'enfer

L'accueil est une seule chute. Un marcel reste fixe au centre, les salles défilent derrière lui : Heaven, Marc-riage (l'autel), Loungewear (cloud nine), Limited (le purgatoire), Sport (la fournaise), Hell. Un altimètre en haut à droite descend de +9 000 m à -666 m. Le marcel porte l'auréole en haut et les cornes en bas : ce sont les deux moitiés du logo.

**Comment ça marche.** Chaque salle a son propre marcel en `position: fixed`, et la salle porte `clip-path: inset(0)`. Un élément fixe reste à sa place à l'écran, mais il n'est visible qu'à l'intérieur de sa salle. Quand le bord d'une salle traverse l'écran, le marcel change donc exactement sur cette ligne. Aucune animation JavaScript : c'est le navigateur qui fait tout, donc ça reste fluide.

## Ce qui a été retiré par rapport à la V2

Coins arrondis, boutons en pilule, ombres, dégradés, halo flou, carte en verre, bandeau défilant, loader, apparitions au scroll, surtitres en capitales, sections numérotées, rangées de chiffres clés, grilles de cartes, appel à l'action final, newsletter, footer avec mot géant. L'accueil passe de 9 sections à une descente et une liste de liens.

## Les choix de design

- **Une seule grande typo**, Six Caps, à une taille énorme. L'italique Bodoni n'apparaît qu'une fois sur l'accueil, sur « heavenly styled », et le × de la page Basic-Fit. La typo mono est réservée aux données (altitude, prix, caractéristiques).
- **Des aplats francs.** La page d'une gamme prend toute sa couleur. Une texture de grain couvre tout le site, comme du papier imprimé.
- **Des marcels en papier découpé** : formes plates, sans fausse 3D. Ils assument d'être des dessins au lieu d'imiter des photos.
- **Une composition par page** : boutique en bandes de couleur, Second Life en une phrase géante avec des notes, Meme Lab où la taille du texte dépend des votes, Basic-Fit en affiche, notre histoire en grandes années.
- **La descente continue partout** : le bas de chaque gamme mène à l'étage du dessous. La 404 affiche « -404 m ».

## Limites connues

- L'idée du marcel fixe en dessin reste moins forte qu'avec une vraie photo détourée.
- Les fun facts de Juliane et Tiago manquent toujours (`team` dans `src/data.mjs`).
- Le logo général « Marc-Hell Nantes » de l'exemple 3 est encore recomposé à partir du H.
- Testé sous Edge (desktop et 390 px en simulation), pas encore sur un vrai téléphone. L'effet de découpe est à vérifier sur iPhone avant l'oral.

## Mettre en ligne

Netlify lit `netlify.toml` : il lance `node build.mjs` et publie `dist/` à chaque push.
