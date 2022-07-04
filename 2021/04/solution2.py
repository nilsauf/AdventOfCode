from typing import Iterable


def GetDrawingNumbersFromLine(line):
    return list(map(lambda no: int(no), line.split(",")))


def ReadNextBoardFromFile(file):
    newBoard = []
    nextLine = ""
    for cIndex in range(5):
        newBoard.append([])
        nextLine = file.readline()
        rowNumbers = list(map(lambda no: int(no), nextLine.split()))

        for rowNumber in rowNumbers:
            newBoard[cIndex].append([rowNumber, False])

    return newBoard


def ReadFile(filePath):
    with open(filePath) as inputFile:
        firstLine = inputFile.readline()
        drawingNumbers = GetDrawingNumbersFromLine(firstLine)

        boards = []
        nextLine = inputFile.readline()
        while nextLine:
            boards.append(ReadNextBoardFromFile(inputFile))
            nextLine = inputFile.readline()

    return drawingNumbers, boards


def CheckIfThisBoardWon(board):
    for row in board:
        if all(column[1] for column in row):
            return True, board

    for cIndex in range(len(board[0])):
        column = list(map(lambda row: row[cIndex], board))
        if all(row[1] for row in column):
            return True, board

    return False, []


def MarkCellsIfSameValue(board, number):
    for row in board:
        for cell in row:
            if cell[0] is number:
                cell[1] = True


def GetLastWinningBoardAndLastNumber(drawingNumbers, boards: list):
    for number in drawingNumbers:
        winningBoards = []
        for board in boards:
            MarkCellsIfSameValue(board, number)
            res, winningBoard = CheckIfThisBoardWon(board)
            if res:
                winningBoards.append(winningBoard)

        for board in winningBoards:
            boards.remove(board)

        if len(boards) == 0:
            return winningBoards[0], number

    return [], -1


def SumAllNotMarkedValues(board):
    return sum(cell[0] for row in board for cell in row if cell[1] == False)


drawingNumbers, boards = ReadFile("input.txt")
winningBoard, lastNumber = GetLastWinningBoardAndLastNumber(drawingNumbers, boards)
sumNotMarkedNumbers = SumAllNotMarkedValues(winningBoard)
print(sumNotMarkedNumbers * lastNumber)
