// 面向对象编程
// 定义食物类
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!
        // console.log(this.element)
    }
    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }
    // 修改食物位置的方法
    change() {
        // 生成一个随机的位置
        // 食物的位置最小是0，最大是290 
        // 蛇一次移动一次就是一格，大小为10，所以要求食物的坐标必须是整10
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

// 测试代码
// const food = new Food()
// console.log(food.X,food.Y)
// food.change()
// console.log(food.X,food.Y)


export default Food