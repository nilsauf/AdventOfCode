from collections import namedtuple
from functools import reduce
from typing import Iterable

line = namedtuple("line", ["start", "end"])
point = namedtuple("point", ["X", "Y"])


def readLinesFromFile(path):
    with open(path) as reader:
        return tuple(map(lambda x: line(next(x), next(x)), map(lambda x: map(lambda y: point(int(y[0]), int(y[1])), map(lambda y: y.split(','), x)), map(lambda x: filter(lambda y: "," in y, x.split()), reader))))


def getIfLineIsHorizontal(line: line):
    return line.start.Y == line.end.Y


def getIfLineIsVertical(line: line):
    return line.start.X == line.end.X


def getHorizontalLines(lines):
    return tuple(filter(getIfLineIsHorizontal, lines))


def getVerticalLines(lines):
    return tuple(filter(getIfLineIsVertical, lines))


# This functions it too strict in what can be an overlapp, eg it does not see two horizontal or vertical lines overlapping in start or end point
def getIfLinesCross(first: line, second: line):
    return getIfLineIsHorizontal(first) != getIfLineIsHorizontal(second) and (first.start.X <= second.start.X <= first.end.X or first.start.X >= second.start.X >= first.end.X) and (second.start.Y <= first.start.Y <= second.end.Y or second.start.Y >= first.start.Y >= second.end.Y)


def getPointWhereLinesCross(first: line, second: line):
    horizontalLine = first if getIfLineIsHorizontal(first) else second
    verticalLine = first if horizontalLine is second else first
    return point(horizontalLine.start.Y, verticalLine.start.X)

# Check every line against every other line here
def getCrossingPoints(hLines, vLines):
    return reduce(lambda x, y: x+y, map(lambda hLine: tuple(map(lambda vLine: getPointWhereLinesCross(hLine, vLine), filter(lambda vLine: getIfLinesCross(hLine, vLine), vLines))), hLines))


def distinct(itr: Iterable):
    alreadyYielded = []
    for thing in itr:
        if alreadyYielded.__contains__(thing) == False:
            alreadyYielded.append(thing)
            yield thing


def count(itr: Iterable):
    return reduce(lambda x, y: x+1, itr, 0)


lines = readLinesFromFile("2021/05/input.txt")

hLines = getHorizontalLines(lines)
vLines = getVerticalLines(lines)
countCrossingPoints = count(distinct(getCrossingPoints(hLines, vLines)))

print(countCrossingPoints)
