# mplus-hackathon

# Codenames by HK NOVA

MPlus Hackathon - https://www.westkowloon.hk/en/Hackathon

**M+** presents its second hackathon, on **16–17 March**. During this two-day event, we invite designers, artists, technologists, and cultural enthusiasts to use M+ Collections open data as raw material for creative and artistic projects. Participants are encouraged to examine, interpret, and activate the M+ Collections through design, code, or other mediums.

# Hackathon related files
```
Curated Objects: https://github.com/mplusmuseum/collection-data
MPlus Beta website: https://collections.mplus.org.hk/
MPlus API Token: f6081d411087c7d6e14071193a20052e
HK Nova Private Repository: https://github.com/littledatabigdata/mplus-hackathon
```

## Getting Started

We, **HK Nova**, aim to combine the powerful images and objects from MPlus's repository with an interactive all-ages board game called **'Codenames'** (https://en.wikipedia.org/wiki/Codenames_(board_game). Instead of using 'words' to provide clues to our spies, we will be using images from MPlus Beta Collection website to make the entire interaction more interesting. 

At the same time, we believe this exercise will help the users/players retain information for longer and have a meaningful interaction with the images when compared to visiting the museum only. 

You can view the rules of the game Codenames here: https://www.youtube.com/watch?v=zQVHkl8oQEU

- [x] Board game
- [x] Guess code names (words/images) in a set related to hint word
- [x] Players split into two teams: red and blue
- [x] One player of each team is selected as the team's spymaster 
- [x] The others are field operatives

### Prerequisites

What things you need to install the software and how to install them

```
http-server
```

### Installing

A step by step series of examples that tell you how to get a development env running


## To Run
```
npm install (node package manager)
```
```
node main.js
```
```
npm http-server -g
```
```
cd to directory where clone is present
```
```
http-server (to run this is a local application)
```

## Built With

* [Material by Google](https://material.io/develop/web/components) - To design the UI interface

# How does this work ?
Each Object ID on (https://github.com/mplusmuseum/collection-data/blob/master/objects_JSON/0/00001.json) directly relates to Object ID mentioned here (https://collections.mplus.org.hk/en/objects/1)
RandomObjects is used to fetch 5x5 (25) objects (json). Below fields can be fetched

```
*objectNumber*
-- Title
-- displayDate
-- medium
-- classification
-- area
-- category
```

We run an image crawler to fetch .jpg / .png images from MPlus's beta collection website https://collections.mplus.org.hk/en/. Each image is placed randomly on a 5x5 canvas (LxW) and has underlying object information (see example fetch below). 

# Example of a fetch

Random Object returns an image objectID

```
objectNumber: 9994
Title: Cop and Baby / 警察和嬰兒
displayDate: 2017
Medium: digital chromogenic print on gloss paper / 數碼彩色照片、光粉紙
classification
area: Visual Art / 視覺藝術
category: Photography / 攝影
```
Example of object 9994 (links)

https://github.com/mplusmuseum/collection-data/blob/master/objects_JSON/9000/09994.json
https://collections.mplus.org.hk/en/objects/9994

![alt text](https://res.cloudinary.com/mplustms//image/upload/w_600/v1550183929/j5kxiaglrpdscnirueg7.jpg)

## Screenshots from the game

![alt text](https://i.ibb.co/BtvtB4n/Start-Game.png)
![alt text](https://i.ibb.co/1Ln1RdW/Select-Img-Category.png)
![alt text](https://i.ibb.co/qFmN541/Play.png)


## Future Work
* Convert this into an **iOS** or **Android** app so it can be played between multiple users at the MPlus Museum West Kowloon Cultural District using tablets.
* Expand capabilities of the app to include connecting to **multiple nodes/players** (using peer discovery).
* Allow iOS / Android apps with users to interact with iPads/Android tablets at the museums.
* Ability to add **Chinese characters** (both Mandarin and Cantonese) as languages.
* Ability to pivot this game into **'Jeopardy'** game which has similar rules of engagement and gameplay.
* Perform **Machine-Learning** tasks to generate missing titles from the description, classification and other fields provided as part of thhe object data (JSON/CSV).
* Provide **specific themes** (like Black and White, Visual Art, Paintings, etc.) to users so they can customize their games according to their input.


## Authors

*Michael Guo*, <br/>
*Terence Yeung*, & <br/>
*Abhishek P*

## License

Created for the purposes of MPlus Hackathon. 

## Acknowledgments
:+1: https://collections.mplus.org.hk/ <br/>
:+1: https://dashboard.mplus.org.hk/en/developer/graphql <br/>
:+1: https://github.com/JamieSteveLee/codenames <br/>
