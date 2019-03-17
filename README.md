# mplus-hackathon

# Project Title

MPlus Hackathon - https://www.westkowloon.hk/en/Hackathon

M+ presents its second hackathon, on 16–17 March. During this two-day event, we invite designers, artists, technologists, and cultural enthusiasts to use M+ Collections open data as raw material for creative and artistic projects. Participants are encouraged to examine, interpret, and activate the M+ Collections through design, code, or other mediums.

# Hackathon related files
Curated Objects: https://github.com/mplusmuseum/collection-data
MPlus Beta website: https://collections.mplus.org.hk/
MPlus API Token: f6081d411087c7d6e14071193a20052e
HK Nova Private Repository: https://github.com/littledatabigdata/mplus-hackathon

## Getting Started

We, HK Nova, aim to combine the powerful images and objects from MPlus's repository with an interactive all-ages board game called 'Codenames' (https://en.wikipedia.org/wiki/Codenames_(board_game). Instead of using 'words' to provide clues to our spies, we will be using images from MPlus Beta Collection website to make the entire interaction more interesting. 

At the same time, we believe this exercise will help the users/players retain information for longer and have a meaningful interaction with the images when compared to visiting the museum only. 

### Prerequisites

What things you need to install the software and how to install them

```
http-server
```

### Installing

A step by step series of examples that tell you how to get a development env running


## To Run

npm install (node package manager)
node main.js
http-server (to run this is a local application)

## Built With

* [Material by Google](https://material.io/develop/web/components) - To design the UI interface

# How does this work ?
Premise
Each Object ID on LINK directly relates to Object ID mentioned here LINK
RandomObjects is used to fetch 5x5 (25) objects (json). Below fields can be fetched
*objectNumber*
-- Title
-- displayDate
-- medium
-- classification
-- area
-- category

We run an image crawler to fetch .jpg images from their beta collection website https://collections.mplus.org.hk/en/
Each image is placed randomly on a 5x5 canvas (LxW) and has underlying object information (see example fetch below)

# Example of a fetch

Random Object returns an image objectID

objectNumber: 9994
Title: Cop and Baby / 警察和嬰兒
displayDate: 2017
Medium: digital chromogenic print on gloss paper / 數碼彩色照片、光粉紙
classification
area: Visual Art / 視覺藝術
category: Photography / 攝影

https://github.com/mplusmuseum/collection-data/blob/master/objects_JSON/9000/09994.json
https://collections.mplus.org.hk/en/objects/9994

![alt text](https://res.cloudinary.com/mplustms//image/upload/w_600/v1550183929/j5kxiaglrpdscnirueg7.jpg)


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Future Work
* Convert this into an iOS or Android app so it can be played between multiple users at the MPlus Museum West Kowloon Cultural District using tablets.
* Expand capabilities of the app to include connecting to multiple nodes (using peer discovery).
* Allow iOS / Android apps with users to interact with iPads/Android tablets at the museums.
* Ability to add Chinese (both Mandarin and Cantonese) as languages.
* Ability to pivot this game into 'Jeopardy' game which has similar rules of engagement and gameplay.
* Perform Machine-Learning tasks to generate missing titles from the description, classification and other fields provided as part of thhe object data (JSON/CSV).


## Authors

*Michael Guo*, 
*Terence Yeung*, &
*Abhishek P*

## License

Created for the purposes of MPlus Hackathon. 

## Acknowledgments

https://github.com/jbowens/codenames
https://github.com/JamieSteveLee/codenames





