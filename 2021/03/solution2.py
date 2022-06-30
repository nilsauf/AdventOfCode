from bitstring import BitArray

lines = []

for line in open("input.txt"):
    lines.append((line[:-1]))


def SearchLastLine(lines, index, getBitToCheck):
    if len(lines) == 1:
        return lines[0]

    counts = [0, 0]

    for line in lines:
        counts[int(line[index])] += 1

    bitToCheck = getBitToCheck(counts[1], counts[0])

    newlines = []
    for line in lines:
        if line[index] == bitToCheck:
            newlines.append(line)

    return SearchLastLine(newlines, index + 1, getBitToCheck)


oxygenString = SearchLastLine(
    lines, 0, lambda countOne, countZero: "0" if countZero > countOne else "1")
epsilonString = SearchLastLine(
    lines, 0, lambda countOne, countZero: "1" if countZero > countOne else "0")

oxygen = BitArray(bin=oxygenString).uint
epsilon = BitArray(bin=epsilonString).uint
print(oxygen * epsilon)
