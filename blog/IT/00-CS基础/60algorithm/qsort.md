```
/* 版权所有（C） 1991-2019 自由软件资金会。
   该文件属于是GUN C语言函数库，由Douglas C. Schmidt(schmidt@ics.uci.edu)所写。
   GUN C语言函数库是自由软件；如果你拥有2.1版本及以后的GUN自由软件基金发布的GUN 小众通用公共许可证，你可以重写或者修改它。
   GUN C语言库致力于希望它是公用的，但不是没有任何授权的，甚至没有隐含的适销性或适合某一特定用途的保证。详情请看GUN 小众通用公共许可证。
   如果你没有得到GUN 小众通用公共许可证，请看 （http://www.gnu.org/licenses/）。*/
/* 在你更改这个算法之前你应该先咨询排序算法工程师Jon Bentley 和 M. Douglas McIlory；
   软件已通过测试；Vol. 23 (11), 1249-1265, 1993。*/
#include <alloca.h>
#include <limits.h>
#include <stdlib.h>
#include <string.h>
/* 按字节交换两个SIZE大小的变量 */
#define SWAP(a, b, size)                
do                \
{                \
    size_t __size = (size);                \
    char *__a = (a), *__b = (b);        \
    do                \
    {                \
        char __tmp = *__a;                \
        *__a++ = *__b;                    \
        *__b++ = __tmp;                    \
    } while (--__size > 0);                \
} while (0)
/* 1）size可以增加代码的灵活性，不再由数据类型限制，这点可以学习一下；
   2）写成宏的形式将代码直接复制到宏的适用处，免除了函数调用，对于一个经常适用的SWAP功能来说提高了执行速度 */


/* 当快速排序算法的分区大小小于4时，将会停止使用快速排序算法 */
#define MAX_THRESH 4
/* 适用栈来存储超过分区大小的数据 */
typedef struct
{
    char *lo;
    char *hi;
} stack_node;
/* 接下来的4个define宏说明了快速的内联栈操作 */
/* 栈的结点数为log(total_elements)（甚至我们可以减去log(MAX_THRESH)）；
   因为tatol_elements是size_t类型，所以我们得到log(total_elements)的上限为：(CHAR_BIT) * sizeof(size_t)，其中CHAR_BIT为每字节的位数 */
#define STACK_SIZE        (CHAR_BIT * sizeof (size_t))
#define PUSH(low, high)    ((void) ((top->lo = (low)), (top->hi = (high)), ++top))
#define POP(low, high)        ((void) (--top, (low = top->lo), (high = top->hi)))
#define STACK_NOT_EMPTY        (stack < top)
/* 1）栈为顺序栈，每个数据元素包含一个内存块的低地址和高地址；2）通过char*打破数据类型的限制，使得多种数据类型都可以使用。 */


/* 在规定大小内使用快速排序。这个实现包含了Sedgewick讨论的四个优化：
   1. 非递归，使用一个存放者指向下一个待排序的分区数据的指针的栈来保存现场。为了节省时间，要求在栈上分配最大分区数量的空间。
   假设size_t的大小为32bit整数（64bit），它只需要32 * sizeof(stack_node) == 256 byte(64bit: 1024bytes)，实际可能更少。
   2. 通过三值取中的方法选择枢轴元素。这减少了选择了一个不好的枢轴值得可能性并且较少了一些额外的比较。
   3. 快速排序只划分 TOTAL_ELEMS / MAX_THRESH 个分区，划分后的分区最多4个数据元素，使用插入排序算法进行排序。
   这样做有一个很大的优势，插入排序对于小规模的数组排序速度更快。
   4. 将两个分区中较大的分区先入栈，然后将算法作用于较小的分区。这保证了实际并不需要log (total_elems)的栈长（在这种情况下空间复杂度为O(1)）。*/
void
_quicksort (void *const pbase, size_t total_elems, size_t size, __compar_d_fn_t cmp, void *arg)
{
    char *base_ptr = (char *) pbase;
    const size_t max_thresh = MAX_THRESH * size;
    if (total_elems == 0)
        /* 待排序元素为0 */
        return;
    if (total_elems > MAX_THRESH)
    {
        char *lo = base_ptr;
        char *hi = &lo[size * (total_elems - 1)];
        stack_node stack[STACK_SIZE];
        stack_node *top = stack;
        PUSH(NULL, NULL);    /* 初始化 */
        while (STACK_NOT_EMPTY)
        {
            char *left_ptr;
            char *right_ptr;
            /* 从头元素、尾元素和中间元素中选择中间值。重新排序头元素和尾元素知道三个元素有序。 
               将中间值作为枢轴值并且在整个过程中跳过了左值和右值的比对。 */
            char *mid = lo + size * ((hi - lo) / size >> 1);
            if ((*cmp) ((void *) mid, (void *) lo, arg) < 0)
                SWAP(mid, lo, size);
            if ((*cmp) ((void *) hi, (void *) mid, arg) < 0)
                SWAP(hi, mid, size);
            else 
                goto jump_over;
            if ((*cmp) ((void *) mid, (void *) lo, arg) < 0)
                SWAP(mid, lo, size);
            jump_over:;
            left_ptr = lo + size;
            right_ptr = hi - size;
            /* 这里有个有名的快速排序上下界限问题。就像它一直运行在内层循环。主要原因是这个算法运行速度比其他真是快太多了。 */
            do
            {
                while ((*cmp) ((void *) left_ptr, (void *) mid, arg) < 0)
                    left_ptr += size;
                while ((*cmp) ((void *) mid, (void *) right_ptr, arg) < 0)
                    right_ptr += size;
                if (left_ptr < right_ptr)
                {
                    SWAP(left_ptr, right_ptr, size);
                    if (mid == left_ptr)
                        mid = right_ptr;
                    else if (mid == right_ptr)
                        mid = left_ptr;
                    left_ptr += size;
                    right_ptr += size;
                }
                else if (left_ptr == right_ptr)
                {
                    left_ptr += size;
                    right_ptr -= size;
                    break;
                }
            } while (left_ptr <= right_ptr)
            /* 设置下一个迭代对象的指针。首先判断左右两个分区的大小是否小于门槛值。如果是，那么将小于门槛值的略过。
               否则，将较大的分区压入栈中，继续排序较小的分区。 */
            if ((size_t) (right_ptr - lo) <= max_thresh)
            {
                if ((size_t) (hi - left_ptr) <= max_thresh)
                    /* 略过两个大小小于等于4的分区 */
                    POP(lo, hi);
                else
                    /* 略过大小小于等于4的左分区 */
                    lo = left_ptr;
            }
            else if ((right_ptr - lo) > (hi - left_ptr))
            {
                /* 将较大左分区的索引入栈 */
                PUSH(lo, right_ptr);
                lo = left_ptr;
            }
            else
            {
                /* 将较大的右分区索引入栈 */
                PUSH(left_ptr, hi);
                hi = right_ptr;
            }
        }
    }
    /* 一旦BASE_PTR指向的数组被快速排序算法划分出大小下于等于4的分区，划分出的小分区完全右插入排序算法进行排序。
       BASE_PTR指向待排序数组的开始地址，END_PTR指向数组的最后一个元素的起始地址（没有超过数组地址范围）。 */
#define min(x, y) ((x) < (y) ? (x) : (y))
    {
        char *const end_ptr = &base_ptr[size * (total_elems - 1)];
        char *tmp_ptr = base_ptr;
        char *thresh = min(end_ptr, base_ptr + max_thresh);
        char *run_ptr;
        /* 查找数组中最小的数据元素并且将其放在数组的首元素位置，这个操作将加速插入排序的内层循环 */
        for (run_ptr = tmp_ptr + size; run_ptr <= thresh; run_ptr += size)
            if ((*cmp) ((void *) run_ptr, (void *) tmp_ptr, arg) < 0)
                tmp_ptr = run_ptr;
        if (tmp_ptr != base_ptr)
            SWAP(tmp_ptr, base_ptr, size);
        /* 插入排序， 从数组的左边运行到右边 */
        run_ptr = base_ptr + size;
        while ((run_ptr += size) <= end_ptr)
        {
            tmp_ptr = run_ptr - size;
            while ((*cmp) ((void *) run_ptr, (void *) tmp_ptr, arg) < 0)
                tmp_ptr -= size;
            tmp_ptr += size;
            if (tmp_ptr != run_ptr)
            {
                char *trav;
                trav = run_ptr + size;
                while (--trav >= run_ptr)
                {
                    char c = *trav;
                    char *hi, *lo;
                    for (hi = lo = trav, (lo -= size) >= tmp_ptr; hi = lo)
                        *hi = *lo;
                    *hi = c;
                }
            }
        }
    }
}
```