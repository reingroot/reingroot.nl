#reingroot.nl

[ ![Codeship Status for reingroot/reingroot.nl](https://www.codeship.io/projects/cc7e7bb0-f173-0131-4a7b-3a92238427f2/status)](https://www.codeship.io/projects/27602)

## Welcome @ ReinGroot.nl behind the scenes
This is my professional site as a freelance Web Development Consultant. The site itself speaks for itself.
However, the way I develop and maintain the website is just as much a piece of my portfolio as the website.
Therefore I decided to put my Develop and Master branch on GitHub for all to see.

In this form it will both serve as a 'look behind the scenes' of the development process I use. As well as a collection
of techniques, patterns and processes that serve me well when working on client projects.

Next to that I hope it can be a reference and point of discussion for my front-end colleagues. By also discussing the processes
that we use I believe we can further grow the front-end development craft.

## Techniques used
* HTML5
* CSS3
* OOP JS
* SASS

## Patterns used
* AMD
* Revealing Module
* Progressive Enhancement

## Modules used
* Require.js
* 

## Build process
* Grunt
  * jshint
  * mocha unit testing
  * (moving to Karma runner)
  * sass
  * uglify
* Git commit to Release branch pushes to GitHub
* Codeship runs tests and deploys to http://release.reingroot.nl
* Browser and device testing
* Git merge Release to Master pushes to GitHub
* Codeship runs tests and deploys to http://www.reingroot.nl
* LIVE!