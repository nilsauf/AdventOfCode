from collections import namedtuple

line = namedtuple("line", ["start", "end"])
point = namedtuple("point", ["X", "Y"])


def readLinesFromFile(path):
    with open("2021/05/input.txt") as reader:
        return tuple(map(lambda x: line(next(x), next(x)), map(lambda x: map(lambda y: point(int(y[0]), int(y[1])), map(lambda y: y.split(','), x)), map(lambda x: filter(lambda y: "," in y, x.split()), reader))))


def getVerticalAndHorizontalLines(lines):
    return tuple(filter(lambda x: x.start.X == x.end.X or x.start.Y == x.end.Y, lines))


lines = readLinesFromFile("")
vhlines = getVerticalAndHorizontalLines(lines)

print(vhlines[0])
print(vhlines[1])
