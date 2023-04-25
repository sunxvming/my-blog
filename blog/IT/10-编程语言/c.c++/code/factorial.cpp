#include <stdio.h>
#include <string.h>

#define MAX_DIGITS 100000 

int multiply(int result[], int result_size, int x) {
    int carry = 0; // 进位
    for (int i = 0; i < result_size; i++) {
        int product = result[i] * x + carry; // 乘法结果加上进位
        result[i] = product % 10; // 保存当前位数的值
        carry = product / 10; // 更新进位值
    }

    while (carry > 0) { // 处理最后一位的进位
        result[result_size] = carry % 10;
        carry /= 10;
        result_size++;
    }

    return result_size;
}

void factorial(int n, int result[], int* result_size) {
    memset(result, 0, sizeof(int) * MAX_DIGITS); // 初始化数组为0
    result[0] = 1; // 初始化结果为1
    *result_size = 1; // 初始化位数为1

    for (int i = 2; i <= n; i++) {
        *result_size = multiply(result, *result_size, i); // 计算阶乘
    }
}

int main() {
    int n;
    printf("input a number:\n");
    scanf_s("%d", &n);

    int result[MAX_DIGITS]; // 存储阶乘结果的数组
    int result_size; // 阶乘结果的位数
    factorial(n, result, &result_size);

    printf("%d's factorial is: ", n);
    for (int i = result_size - 1; i >= 0; i--) { // 倒序输出结果
        printf("%d", result[i]);
    }
    printf(", digit is: %d\n", result_size);

    return 0;
}
