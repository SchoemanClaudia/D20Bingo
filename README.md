# D20 Bingo

D20 Bingo is a game of chance, with a twist on the classic bingo. Combining bingo mechanics with the unpredictability of a 20 sided die, the user will race against the clock in this solo adventure. The goal is to complete a pattern on a 4x4 game card, with each number determined by the roll of a D20. 

![Responsive Mockup](assets/images/responsive-mockup.webp)

Live Link: https://schoemanclaudia.github.io/D20Bingo/

## Features 

### Existing Features

- __Header with sound buttons__

  - The site logo and emblem sets the main colour theme: 
  - 
  - 

![Header Desktop]()
![Header Mobile]()


- __About Game__

  -  
  -  

![About panel Desktop]()
![About panel Mobile]()


- __Game Rules__

  - 

![Rules Panel Desktop]()
![Rules Panel Mobile]()


- __D20 Dice Roll__

  - 
  - 

![D20 Dice Roll Desktop]()
![D20 Dice Roll Mobile]()

- __Message Panel__

  - 
  - 

![Bingo Message]()
![No win Mssage]()
![TimeupMessage]()

- __Countdown Timer__

  - 
  - 

![Countdown Before Roll]()
![Countdown During Game]()
![Countdown Timeup]()

- __Previous Roll Panel__

  - 
  - 

![Previous Roll Desktop]()
![Previous Roll Mobile]()

- __Bingo Grid__

  - 
  - 

![Bingo Grid Desktop]()
![Bingo Grid Mobile]()


- __The Footer__ 

  - The footer section includes a link to a site called The Roarbots, which explains a brief history of the D20. The link will open to a new tab to allow easy navigation for the user. 

![Footer]()


- __404 Error Page__

  - 
  - 

![404 Error Desktop]()
![404 Error Mobile]()


### UX/UI Wireframing

- The site was developed with a mobile-first approach.
- Main colour theme hex for rust (#) and (#).
- Wireframe drawn up pre-development to assist with structure of elements on each page, panels are based on mobile view. As development commenced, elements on pages were adjusted for the best user experience.

![Main Colour Palette](assets/images/hex-palette.webp)
![Wireframe Sketch](assets/images/wireframe.webp)


### Future Features to Implement

-  

- 

-  


## Testing 

### Accessibility

- Ran the pages through Lighthouse, performance with initial load passed, and the site is accessible.

![Lighthouse score for mobile](assets/images/lighthouse-score.webp)

- Tested color contrast and its affect on different visual impairments via [WhoCanUse.com](https://www.whocanuse.com/)

![Who Can Use](assets/images/whocanuse.webp)

-   Tested and confirmed that the site works in different browsers; Chrome, Safari and Firefox.
-   Tested and confirmed that all internal links are working 
-   Tested that all external links are woking and opening in a separate tab.
-   

![Screenshot]()

## Technologies Used

### Languages

- HTML5
- CSS3
- JavaScript

### Other Sites and Softwares

- Image editing:
  - Dabber mark for grid marking, D20 and 404 die face images were edited with Adobe Creative Cloud software. The editing was done in Illustrator and photoshop to make changes to elements to suit site branding and functionality.

- Image assets reduced with online platfroms:
  - Tinypng: https://tinypng.com/ 
  - XConvert: https://www.xconvert.com/

- Problem solving and video tutorials:
  - Show active button: https://www.reddit.com/r/twinegames/comments/tn4hhi/help_keeping_an_element_active_after_clicking_on/
  - Dropdown on text sections: https://www.w3schools.com/howto/howto_js_accordion.asp
  - Dice Roll functionality: https://www.youtube.com/watch?v=UkmNL7eJqsU
  - Set the final dice img after animation: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
  - Dice loop pause time delay - https://developer.mozilla.org/en-US/docs/Web/API/setInterval
  - Countdown timer: https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript
  - Validating bingo on marked grid: https://stackoverflow.com/questions/36840363/three-in-a-row-check-bingo and https://www.geeksforgeeks.org/create-a-bingo-game-using-javascript/

### Validator Testing 

- HTML
  - There was an errors when running html through [W3C HTML Validator](https://validator.w3.org/):
    - Stray closing tag for main section in body, by removing the extra closing tag the error was solved.
  - After fixing above attributes, no errors found when running the code through the [W3C HTML Validator](https://validator.w3.org/)

![Screenshot of HTML Validator error](assets/images/html-validator.webp)
![Screenshot of HTML Validator result](assets/images/html-validator.webp)

- CSS
  - No errors were found when running the code through the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

![Screenshot of CSS validator result](assets/images/css-validator.webp)

- JavaScript
  - There were 2 errors when running script through [JSHint](https://jshint.com/):
    - Undefined display variable, after declaring variable within js the error was corrected.
    - Unused mark variable, this needed some modification to the code that displays the uniqueNumbers to the bingo grid. After adjusting the html used to call on click within the forEach statement, the best solution was to then add a seperate event listener to add on click to bingo grid. In turn this solved the error by calling mark(num) within the event listener.

  - After fixing above attributes, no errors were found when running the code through the [JSHint](https://jshint.com/)

![Screenshot of JSHint errors]()

### Bugs Encountered

- While testing the game play through on mobile, the random number array within the bingo grid would underline some of the integers within the grid. When the grid box is clicked to mark rolled number, the mobile device would recognise the array as a telephone number and prompt a call pop-up onto screen.
  - The CSS already specified no decoration on anchor tags within global styling, but after adding a meta tag within html that specifies the telephone format detection as =no, solved the problem when testing on mobile again.
- 
  - Low contrast error and possible heading warning when passing through the official [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
  - 

![Wave]()
![Wave]()

### Unfixed Bugs

-   No unfixed bugs, [WAVE Tool](https://wave.webaim.org/) returned with no errors.

![Wave Final Result](assets/images/wave-validator.webp)


## Deployment

### Version Control
-   The site was created using Gitpod editor and pushed to Github to the remote repository 'D20Bingo'.
-   Git commands were used throughout the development to push the code to the remote repository. The following git commands were used:
    -   git add . - to add the files to the staging area before being committed.
    -   git commit -m "commit message" - to commit changes to the local repository queue that are ready for the final step.
    -   git push - to push all committed code to the remote repository on Github.

### Deployment to Github Pages
-   The site was deployed to Github pages as follows:
    -   In the Github repository, navigate to Settings tab
    -   From the source section drop-down menu, select the Master branch and Save
    -   Once the Master branch was selected, the page provided the link to the website
- The site was deployed to GitHub pages, the live link can be found here: https://schoemanclaudia.github.io/D20Bingo/index.html

### Cloning of the Repository Code locally
-   Go to the Github repository that you want to clone
-   Click on the Code button located above all the project files
-   Click on HTTPS and copy the repository link
-   Open the IDE of your choice and and paste the copied git url into the IDE terminal
-   The project is now created as a local clone


## Credits 

- Slack channel learn-javascript peers, for assisting with adding a meta tag telephone=no to eliminate grid numbers that were recognised as phone number prompt when clicked on.
- Shoutout to henna.s_5P for the support when it all seemed to become overwhelming.
- My mentor for the support and knowledge shared.
- Slack channel peers for breadcrumbs left to problem solve my own project, while testing and fixing bugs.

### Content 

- Fonts used for site content imported from [Google Fonts](https://fonts.google.com/)
  - Logo and main headings: [Archivo Black](https://fonts.google.com/specimen/Archivo+Black)
  - Body content: [Inter](https://fonts.google.com/specimen/Inter)
- The icons throughout site were taken from [Font Awesome](https://fontawesome.com/) 
- Game content was inspired by catch phrases used when playing the classic Dungeons and Dragons [Adobe Stock](https://stock.adobe.com/)  
-   Background image is a licensed download from [Adobe Stock](https://stock.adobe.com/)

![Background licence]()

### Media Source Links

- Background music: https://pixabay.com/music/main-title-battle-of-the-dragons-8037/
- Dice roll sound effect: https://pixabay.com/sound-effects/rpg-dice-rolling-95182/
- Background image: https://stock.adobe.com/ie/images/underground-dungeon-fantasy-adventure-tabletop-role-play-game-setting-dark-and-creepy-background-created-with-generative-ai/766587031
- D20 and 404 dice face images, screenshots taken and backgrounds removed in Adobe CC: https://g.co/kgs/RjNcAcV
- Animate dice roll - https://learn.newmedia.dog/tutorials/p5-js/remainder/
