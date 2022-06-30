depth = 0
pos = 0
aim = 0

for line in open("input.txt"):
    lineParts = line.split()
    cmd = lineParts[0]
    value = int(lineParts[1])

    if cmd == "forward":
        pos += value
        depth += aim * value
    elif cmd == "down":
        aim += value
    elif cmd == "up":
        aim -= value

print(depth * pos)
