increased = 0
prev = 0
for line in open("input.txt"):
    lineValue = int(line)
    if(prev > 0 and prev < lineValue):
        increased += 1
    prev = lineValue

print(increased)
