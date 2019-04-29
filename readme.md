Snake AI
---
Project created to learn how neural networks and genetic algorithms works so everything is written from scratch (with some exceptions).

### Install
```
// to install dependencies
npm install
// to compile/run project
gulp
// to run tests
npm run test
```

Most of possible configuration is available in file [config.js](app/config.js).
Simple "game" configuration is available in [game-config.js](app/Game/game-config.json);


### Neural network explanation
First idea of network creation was **12 inputs** _(4 directions to walls, 4 directions to closest body and 4 directions to food)_ and **4 outputs** *(simple 4 directions)*, but there was huge amount of network decisions to go to opposite direction and no reasonable way of handling it.
So both inputs and outputs depends on actual direction of snake, because it allow to decrease size of network by reducing possible decisions from 4 to 3 and get rid of opposite direction.

#### Inputs
Neural network have 6 input neurons. 
First 3 neurons are responsible for left, up and right distance to closest collision.
Last 3 are responsible for distances to food.  

#### Outputs
Network has 3 output neurons which determines next direction chosen by network.

For example if actual direction of snake is **up** and network returns output `[0.7, 0.1, 0.2]` the chosen direction will be **left**.
If returns `[0.1, 0.7, 0.2]` it will stay on **up** direction and if returns `[0.1, 0.2, 0.7]` it snake will change direction to **right**.  

So Neural Network control snake more like car, instead of usual UP, DOWN, LEFT, RIGHT options. 


### Learning speed up
There is a way to speed up network learning time by using skip generations button.
It will run whole process without displaying scene and graphs, so it'is much faster.

**!Warning** It's implemented by simple while loop, without any async ways so freezes browser. Type less amounts of generations to prevent huge waiting time without any response.
You can open inspector to see some console.logs in the background.


### TODO
* Extend GUI
  * Stop button
  * Restart button
  * FPS setter
  * Disabling enabling graphs
  * Adding custom condition of learning.
  * More config changes from page.
* Add method to save best networks.
* Add method to display whole run of best snake during learning process
* Optimization of output calculations.
* Optimize config of network to decrease learning time.
* Create demo instance.
