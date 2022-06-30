from bitstring import BitArray

bitlist = []

for line in open("input.txt"):
    if len(bitlist) == 0:
        for bit in line[:-1]:
            bitlist.append([0, 0])

    for index, bit in enumerate(line[:-1]):
        bitlist[index][int(bit)] += 1

gammaStr = ""
for bitCounts in bitlist:
    if bitCounts[0] > bitCounts[1]:
        gammaStr += "0"
    else:
        gammaStr += "1"

gamma = BitArray(bin=gammaStr).uint
epsilon = BitArray(bin=gammaStr).uint ^ BitArray(bin="111111111111").uint
print(gamma * epsilon)
