
entered = [0]
while(entered[-1] != []):
    entered.append(input().split())
entered = entered[1:-1]
print(entered)
out = []
flatten = lambda l: [item for sublist in l for item in sublist]
# toint = lambda i: int(i)
for i in range(len(entered)):
    try:
        outme = list(zip(entered[i], entered[i+1]))
        out.append(outme)
    except IndexError:
        break
print(list(map(lambda i: int(i), flatten(flatten(out)))))