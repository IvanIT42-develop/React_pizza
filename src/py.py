n = int(input())
mini = 30000
for i in range(n):
    a = int(input())
    if a % 10 == 6 and a < mini:
        mini = a
print(mini)
sumi = 0
a=1 
while a !=0 :
    a= int(input())
    if a%6 ==0 and a %10==4:
        sumi+=a
print(sumi)
sum = 0
num = 0
a = int(input())
while a != 0:
    sum += a
    if (a % 2 == 0) and (a % 5 == 0):
        num += 1
    a = int(input())
print(sum)
print(num)
maxi= 30000

sum=0
k=0

for b in range(3, 10001):
    a=int(input())
    sum+=a
    if a / 7 % 2 !=0 and a<maxi:
        k +=1
print(sum/k)
sum = 0
num = 0
a = int(input())
while a != 0:
    num += 1
    if (a % 2 == 0):
        sum += a
    a = int(input())
print(num)
print(sum)
sum=0
k=0
s=0
a = int(input().split())
while a!=0:
    sum+=a
    if a>0 :
        k+=1
    if a<0:
        s+=1
print(k-s)
print(sum)

k=0
a=int(input())
while a%5==0 or a%9==0 and a!=0:
    k+=1
print(k)
# Алгоритм Евклида
def gcd_euclidean_mod(a, b):
    while b != 0:
        a, b = b, a % b
    return a

# Пример использования
print(gcd_euclidean_mod(48, 18))  # Вывод: 6
