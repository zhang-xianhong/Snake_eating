class Snake {
    // 表示蛇头的元素
    head: HTMLElement
    // 表示蛇身体的元素(包括蛇头) 为一个集合
    bodies: HTMLCollection
    // 获取蛇的容器
    element: HTMLElement
    constructor() {
        this.element = document.getElementById('snake') !
        this.head = document.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }
    
    // 设置蛇头的坐标
    set X(value: number) {
        // 如果新值与旧值相同，则直接返回，没有必要再做修改操作
        if(this.X == value) return
        // X的合法范围 0-290 之间
        if(value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        // 修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向发生了改变')
            // 如果发生了掉头，就往反方向继续移动
            if(value > this.X) {
                // 如果新值大于X，则说明蛇在向右走，此时发生掉头，应该继续使蛇往左走
                value = this.X - 10
            } else {
                // 反方向
                value = this.X + 10
            }
        }

        // 移动身体
        this.moveBody()
        this.head.style.left = value + 'px'
        // 检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value: number) {
        if(this.Y == value) return
        if(value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了，抛出一个异常
            throw new Error('蛇撞墙了')
        }

        // 修改Y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if(value > this.Y) {
                // 如果新值大于X，则说明蛇在向右走，此时发生掉头，应该继续使蛇往左走
                value = this.Y - 10
            } else {
                // 反方向
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px'
        // 检查有没有撞到自己
        this.checkHeadBody()
    } 
    
    // 蛇添加身体的方法
    addBody() {
        // 向element中添加一个div   
        const div = document.createElement('div')
        this.element.appendChild(div)
        // this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        // 将后边的身体设置为前边的身体的位置
        // 遍历获取所有的身体元素 (由后到前)
        for(let i=this.bodies.length-1; i>0; i--) {
            // 获取身体前边的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft; 
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 用来检查蛇头是否撞到身体的方法
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1; i<this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断，说明蛇头撞到身体，游戏结束
                throw new Error('撞到自己了！')
            }
        }
    }
}

export default Snake