// 引入样式
import './style/index.less'

/* import Food from './modules/Food'
import ScorePanel from './modules/ScorePanel'

const food = new Food()
console.log(food.X,food.Y)
food.change()
console.log(food.X,food.Y)

const scorePanel = new ScorePanel(100,2)
for(let i = 0; i < 200; i++) {
    scorePanel.addScore()
} */

import GameControl from './modules/GameControl'
const gameControl = new GameControl()