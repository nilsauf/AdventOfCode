depth = 0
pos = 0

for line in open("input.txt"):
    lineParts = line.split()
    cmd = lineParts[0]
    value = int(lineParts[1])

    if cmd == "forward":
        pos += value
    elif cmd == "down":
        depth += value
    elif cmd == "up":
        depth -= value

print(depth * pos)
