// 定义表示积分牌的类
class ScorePanel {
    score: number = 0 
    level = 1
    // 分数和等级所在的元素,在构造函数中进行初始仫
    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 设置变量来限制等级
    maxLevel: number
    // 设置多少分可以升级
    upScore: number

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score') !
        this.levelEle = document.getElementById('level') !
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    // 设置一个加分的方法
    addScore() {
        // 使分数自增
        this.scoreEle.innerHTML = ++this.score + ''
        if(this.score % this.upScore === 0) {
            this.levelUp()
        }
    }
    // 提升等级的方法
    levelUp() {
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

// 测试积分
// const scorePanel = new ScorePanel()
// const scorePanel = new ScorePanel(100,2)
// for(let i = 0; i< 200; i++) {
//     scorePanel.addScore()
// }


export default ScorePanel