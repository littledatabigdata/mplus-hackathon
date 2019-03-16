# mplus-hackathon

Hackathon Information: https://www.westkowloon.hk/en/Hackathon
Hackathon related files:
• Curated Objects: https://github.com/mplusmuseum/collection-data
• MPlus Beta website: https://collections.mplus.org.hk/
• MPlus API Token: f6081d411087c7d6e14071193a20052e

Our Code will be stored here: https://github.com/littledatabigdata/mplus-hackathon

Codenames - Board game that utilizes MPLUS Beta images.

Rules of Engagement

Rules. Codenames is a game of guessing which code names (words) in a set are related to a hint-word given by another player. Players split into two teams: red and blue. One player of each team is selected as the team's spymaster; the others are field operatives.
Players: Recommended for at least 4; can be p...
Playing time: 15–30 minutes

Premise
Each Object ID on LINK directly relates to Object ID mentioned here LINK
RandomObjects is used to fetch 5x5 (25) objects (json). Below fields can be fetched
objectNumber
Title
displayDate
medium
classification
area
category
We run an image crawler to fetch .jpg images from their beta collection website https://collections.mplus.org.hk/en/
Each image is placed randomly on a 5x5 canvas (LxW) and has underlying object information (see example fetch below)


To run
npm install
node main.js
http-server
