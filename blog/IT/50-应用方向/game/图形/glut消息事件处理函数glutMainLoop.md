glut这是一套opengl的辅助库，他使我们能十分简单的设置各种消息处理函数，而且与平台无关，也就是说如果使用glut 在windows 下编译通过程序无需更改便可在linux, 和mac　os 下的编译运行，这一点是十分有用的，要知道win32api繁琐的代码走出了windows 的窗户可什么也干不了。
### GLUT的基本功能
包括窗口初始化功能、事件处理、窗口和菜单管理、回调函数注册和几何建模功能。
窗口初始化功能，它有4个函数。主要用于处理初始化并以及命令行参数，初始化显示模式，指定窗口左上角在屏幕上的位置和窗口大小，以像素为单位。
事件处理只有一个函数，它用于显示创建的窗口、处理输入的事件、触发回调函数、进入循环直到程序退出。
窗口管理包含18个函数，用于建立、销毁窗口及可能的子窗口，管理和设置窗口的属性。
在GLUT中有20个回调函数，用于响应用户事件。最重要的回调函数是glutDisplayFunc，当GLUT认为需要重新显示窗口内容时，都将执行这一函数注册的回调函数。
另外一些重要的回调函数注册函数有：函数glutRe-shapeFunc用于注册窗口大小改变这一事件发生时GLUT将调用的函数。glutKeyboardFunc和glutMouseFunc用于注册键盘和鼠标事件发生时的回调函数。函数glutMotionFunc注册鼠标移动事件的回调函数。这3个函数用于人机交互处理。在没有其他事件处理时，GLUT将调用函数glutldleFunc注册的函数，而函数glutTimerFunc则注册处理定时器事件的函数。
OpenGL绘图函数只能生成点、直线、多边形等简单的几何图元，GLUT提供了18个创建三维物体的函数。利用它们可以创建9种三维物体，如圆锥体、立方体、球体等，每一物体有线框和实体2种方式。
我们看到的以glut开头的函数都是glut库的一部分，如处理参数的，和设置窗口的，我们在这里主要讨论glut 支持的各种消息处理
一 ：窗口更新的处理函数，
① 我们知道各种窗口的操作都会引发窗口更新消息，在glut中我们通过
void glutDisplayFunc(void (*func)(void))
来设置窗口刷新的消息处理函数，其唯一的参数指定了屏幕刷新时会调用的函数
② 如果要处理窗口变化的消息我们可以通过设置下面函数来实现
void glutReshapeFunc(void (*func)(int w, int h))
这里的func为回调函数，w,h分别为改变后窗口的宽和高
       
二：对于键盘和鼠标的输入我们可以通过下面两个函数来设置
void glutKeyboardFunc(void (*func)(unsigned char key, int x, int y))
void glutMouseFunc(void (*func)(int button, int state, int x, int y))
key 为键盘按键的ASCII吗
x y 都表示鼠标的位置，
而button则为GLUT_LEFT_BUTTON或GLUT_RIGHT_BUTTON
分别表示左右按键。
state为按键的状态，若为按下则为GLUT_DOWN
当鼠标移动式我们还可以通过下面的函数来设置鼠标移动消息的处理函数
void glutMotionFunc(void (*func)(int x, int y))
X,Y仍然为鼠标的位置
三 特殊函数 用于完成循环画图（或者说是动画）
这里还有一个函数比较特殊
void glutIdleFunc(void (*func)(void)).
这里设置的是系统空闲时将会调用的函数
下面我们将看到一个完整的例子，通过输入来控制三维物体的旋转
```
#include <math.h>
#include <gl/glut.h>
#include <gl/gl.h>
#define pi 3.1415926
bool mouseisdown=false;
bool loopr=false;
int mx,my;
int ry=30;
int rx=30;
void timer(int p)
{
     ry-=5;
        glutPostRedisplay();                 //marks the current window as needing to be redisplayed.
     if (loopr)
         glutTimerFunc(200,timer,0);
}
void mouse(int button, int state, int x, int y)
{
    if(button == GLUT_LEFT_BUTTON)
     {
        if(state == GLUT_DOWN)
         {    mouseisdown=true; loopr=false;}
         else
              mouseisdown=false;
     }
     if (button== GLUT_RIGHT_BUTTON)
         if(state == GLUT_DOWN)
         {loopr=true; glutTimerFunc(200,timer,0);}
   
}
void motion(int x, int y)
{
    if(mouseisdown==true)
    {
        ry+=x-mx;
         rx+=y-my;
         mx=x;
         my=y;
         glutPostRedisplay();
    }
}
void special(int key, int x, int y)
{
    switch(key)
    {
    case GLUT_KEY_LEFT:
        ry-=5;
        glutPostRedisplay();
        break;
    case GLUT_KEY_RIGHT:
       ry+=5;
        glutPostRedisplay();
        break;
    case GLUT_KEY_UP:
        rx+=5;
        glutPostRedisplay();
        break;
    case GLUT_KEY_DOWN:
        rx-=5;
        glutPostRedisplay();
        break;
    }
}
void display()
{
       
         float red[3]={1,0,0};
         float blue[3]={0,1,0};
         float green[3]={0,0,1};
         float yellow[3]={1,1,0};
   
   
         glClearColor(1,1,1,1);
         glClear(GL_COLOR_BUFFER_BIT);
         glLoadIdentity();
         glRotatef(ry,0,1,0);
         glRotatef(rx,1,0,0);
         glColor3fv(green);
         glutWireTeapot(0.5);
        glFlush();
}
int main(int argc, char** argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode (GLUT_SINGLE| GLUT_RGBA);
    glutInitWindowSize (400, 400);
    glutInitWindowPosition(100,100);
    glutCreateWindow ("A TEAPOT");
 
    glutDisplayFunc (display);
     glutMouseFunc(mouse);
     glutMotionFunc(motion);
     glutSpecialFunc(special);
    glutMainLoop();
    return 0;
}
```
运行这个程序我们会发现一个茶壶，我们可以通过鼠标和键盘的方向键来控制它的旋转，而按下鼠标右键则可以让这个茶壶自动旋转，这里还有几个函数我们要注意一下
void glutWireTeapot(GLdouble size) 在当前的OCS坐标中心画一个以size为大小的茶壶
void glutSpecialFunc(void (*func)( int key, int x, int y))
这个函数与glutKeyboardFunc的区别在于前者是用来响应键盘上的特殊按键，如方向键和控制键等。而后者则是用来响应键盘上的字符按键
void glutTimerFunc(int delay, (void (*func)( int parameter),int parameter)
这个函数相当于win32 api 中的timer 定时器，也是在delay毫秒后 放出一个定时器消息，而这里的func 则为这个消息的处理函数， patameter为附加参数。 这里有一点要注意这个函数是一次性的， 如果要重复使用可以在func中继续调用glutTimerFunc，而且这个功能是可以叠加的，在opengl 内部将他们看成许多个不同的定时器，这也就是为什么我们在上面的例子中连续按下鼠标右键会加快旋转的速度