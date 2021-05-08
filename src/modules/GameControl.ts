// 引入其他的类
import Food from './Food'
import Snake from './Snake'
import ScorePanel from './ScorePanel'

// 游戏控制器类，控制其他所有的类
class GameControl {
    food: Food
    snake: Snake
    scorePanel: ScorePanel
    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = ''
    // 记录游戏是否结束（撞墙等）
    isLive = true

    constructor() {
        this.food = new Food()
        this.snake = new Snake() 
        this.scorePanel = new ScorePanel(100,1)
        this.init()
    }

    // 游戏的初始化方法，调用后游戏就开始了；
    init() {
        // 绑定键盘按下的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        // 调用run 方法，使蛇移动
        this.run()
    }

    /* 
    上下左右键对应的key
    chrome      IE
    ArrowUp     Up
    ArrowDown   Down 
    ArrowLeft   Left
    ArrowRight  Right
     */

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key)
        // console.log(event.keyCode)
        // 修改direction
        this.direction = event.key  
    }
    
    // 创建一个控制移动方向的方法
    run() {
        /* 
            根据方向（this.direction）来使蛇的位置改变
            向上 top--
            向下 top++
            向左 left--
            向右 left++
        */
        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键方向来设置X值和Y值
        switch(this.direction) {
            case 'ArrowUp': 
            case 'Up': 
                Y -= 10
                break;
            case 'ArrowDown': 
            case 'Down': 
                Y += 10
                break;
            case 'ArrowLeft': 
            case 'Left': 
                X -= 10
                break;
            case 'ArrowRight': 
            case 'Right': 
                X += 10
                break;
        }

        // 检查蛇是否吃到食物
        this.check(X,Y)

        // 修改蛇的X和Y值
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error) {
            // 进入catch表示蛇撞墙，说明出现了错误，给出提示信息
            alert(error.message + ' GAME OVER!')
            this.isLive = false
        }
        
        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定义一个方法，用来检测蛇是否吃到食物
    check(x: number,y: number) {
        if( x === this.food.X && y === this.food.Y ) {
            // console.log('吃到食物了')
            // 改变位置
            this.food.change();
            // 增加分数
            this.scorePanel.addScore();
            // 增加一截蛇
            this.snake.addBody();
        }
    }
}

export default GameControl